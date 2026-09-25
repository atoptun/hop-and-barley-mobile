import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetProductsQuery } from '@/store/products/products-api';
import { nextPage, resetPage, setRefreshing } from '@/store/products/products-filter-slice';
import { ProductsFilters } from '@/types/product';
import { getErrorText } from '@/utils/errors';

export function useProducts() {
  const dispatch = useAppDispatch();

  const { page, limit, applyedSearch, sortBy, order, isRefreshing } = useAppSelector(
    state => state.productsFilter
  );

  const queryParams: ProductsFilters = useMemo(() => {
    const params: ProductsFilters = {
      page,
      limit,
    };
    if (applyedSearch) params.search = applyedSearch;
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order ?? 'asc';
    }

    return params;
  }, [page, limit, applyedSearch, sortBy, order]);

  const { data, isLoading, isFetching, isError, error, refetch } = useGetProductsQuery(queryParams);

  const products = data?.items ?? [];
  const hasMore = data?.hasMore ?? false;
  const errorText = isError ? getErrorText(error) : undefined;

  const isInitialLoading = isLoading || (isFetching && products.length === 0 && !isRefreshing);
  const isLoadingMore = isFetching && products.length > 0 && page > 1;

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) dispatch(nextPage());
  }, [isFetching, hasMore, dispatch]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(resetPage());
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch, dispatch]);

  return {
    // data
    products,
    hasMore,
    error: errorText,
    // state
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    // actions
    loadMore,
    refresh,
  };
}
