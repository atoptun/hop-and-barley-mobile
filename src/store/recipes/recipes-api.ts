import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BeerRecipe, BeerRecipesFilters } from '@/types/recipe';
import { updateRecipe } from '@/utils/recipe';

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

console.info(baseUrl);

interface RecipesApiList {
  items: BeerRecipe[];
  hasMore: boolean;
}

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  refetchOnReconnect: true,
  keepUnusedDataFor: 10,
  endpoints: builder => ({
    getRecipes: builder.query<RecipesApiList, BeerRecipesFilters>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const result = await baseQuery({ url: '/recipes', params: arg });

        // console.info('queryFn', result);

        if (result.error) {
          const status = result.error.status;

          // mockapi.io returns error 404 if no filter result
          if (status === 404) {
            return { data: { items: [], hasMore: false } };
          }

          return result;
        }

        const recipes = result.data as BeerRecipe[];
        const isValidData = recipes && Array.isArray(recipes);

        if (!isValidData) {
          console.error('Recipes API returned wrong data', result.data);
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
            items: recipes.map(p => updateRecipe(p)),
            hasMore: recipes.length === arg.limit,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...filters } = queryArgs;
        return filters;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;

        const existingIds = new Set(currentCache.items.map(item => item.slug));
        const uniqueIncoming = newItems.items.filter(item => !existingIds.has(item.slug));

        currentCache.items.push(...uniqueIncoming);
        currentCache.hasMore = newItems.hasMore;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getRecipeBySlug: builder.query<BeerRecipe, string>({
      query: slug => `/recipes/${slug}`,
      transformResponse: (response: BeerRecipe) => updateRecipe(response),
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeBySlugQuery } = recipesApi;
