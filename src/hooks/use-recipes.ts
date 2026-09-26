import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetRecipesQuery } from '@/store/recipes/recipes-api';
import { nextPage, resetPage, setIsRefreshing } from '@/store/recipes/recipes-filter-slice';
import { RootState } from '@/store/store';
import { BeerRecipesFilters } from '@/types/recipe';
import { getErrorText } from '@/utils/errors';

export const useRecipes = () => {
  const dispatch = useAppDispatch();
  const { page, limit, applyedSearch, sortBy, order, difficulty, isRefreshing } = useAppSelector(
    (state: RootState) => state.recipesFilter
  );

  // Create params for MockAPI
  const queryParams: BeerRecipesFilters = useMemo(() => {
    const params: Record<string, any> = {
      page: page,
      limit: limit,
    };
    if (applyedSearch) params.search = applyedSearch;
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = order ?? 'asc';
    }
    if (difficulty) params.difficulty = difficulty;

    return params as BeerRecipesFilters;
  }, [page, limit, applyedSearch, sortBy, order, difficulty]);

  const queryResult = useGetRecipesQuery(queryParams, {
    selectFromResult: ({ data, isFetching, isLoading, isError, error }) => ({
      recipes: data?.items ?? [],
      hasMore: data?.hasMore ?? false,
      isFetching,
      isLoading,
      isError,
      errorText: isError ? getErrorText(error) : undefined,
    }),
  });

  const { recipes, hasMore, isFetching, isLoading, errorText } = queryResult;

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) dispatch(nextPage());
  }, [isFetching, hasMore, dispatch]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    dispatch(resetPage());
    try {
      await queryResult.refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, queryResult]);

  const isInitialLoading = isLoading || (isFetching && recipes.length === 0 && !isRefreshing);
  const isLoadingMore = isFetching && recipes.length > 0 && page > 1;
  const isFilterFetching = isFetching && !isLoadingMore && !isRefreshing;

  return {
    // data
    recipes,
    hasMore,
    error: errorText,
    //states
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    isFilterFetching,
    // actions
    loadMore,
    refresh,
  };
};
