import { baseApi } from '@/store/api/base-api';
import { Product, ProductsFilters } from '@/types/product';
import { updateProduct } from '@/utils/product';

interface ProductsApiList {
  items: Product[];
  hasMore: boolean;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductsApiList, ProductsFilters>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const result = await baseQuery({ url: '/products', params: arg });

        // console.info('queryFn', result);

        if (result.error) {
          const status = result.error.status;

          // mockapi.io returns error 404 if no filter result
          if (status === 404) {
            return { data: { items: [], hasMore: false } };
          }

          return result;
        }

        const products = result.data as Product[];
        const isValidData = products && Array.isArray(products);

        if (!isValidData) {
          console.error('Products API returned wrong data', result.data);
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Malformed response structure received from API',
              data: result.data,
            },
          };
        }

        return {
          data: {
            items: products.map(p => updateProduct(p)),
            hasMore: products.length === arg.limit,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...filters } = queryArgs;
        return filters;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          currentCache.items = newItems.items;
          currentCache.hasMore = newItems.hasMore;
          return;
        }

        const existingIds = new Set(currentCache.items.map(item => item.slug));
        const uniqueIncoming = newItems.items.filter(item => !existingIds.has(item.slug));

        currentCache.items.push(...uniqueIncoming);
        currentCache.hasMore = newItems.hasMore;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getProductBySlug: builder.query<Product, string>({
      query: slug => `/products/${slug}`,
      transformResponse: (response: Product) => updateProduct(response),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery } = productsApi;
