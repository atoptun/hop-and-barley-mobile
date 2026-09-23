import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters as resetFiltersAction,
  setDifficulty as setDifficultyAction,
  setSorting as setSortingAction,
} from '@/store/recipes/recipes-filter-slice';
import { handleSearchChange } from '@/store/recipes/recipes-filter-thunks';
import { Difficulty, RecipeSortBy, SortOrder } from '@/types/recipe';

export const useRecipesFilters = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(state => state.recipesFilter.search);
  const sortBy = useAppSelector(state => state.recipesFilter.sortBy);
  const order = useAppSelector(state => state.recipesFilter.order);
  const difficulty = useAppSelector(state => state.recipesFilter.difficulty);

  const setSearch = useCallback(
    (text: string) => {
      dispatch(handleSearchChange(text));
    },
    [dispatch]
  );

  const setSorting = useCallback(
    (sortBy: RecipeSortBy, order: SortOrder = 'asc') => {
      dispatch(setSortingAction({ sortBy, order }));
    },
    [dispatch]
  );

  const setDifficulty = useCallback(
    (diff?: Difficulty) => {
      dispatch(setDifficultyAction(diff));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(resetFiltersAction());
  }, [dispatch]);

  return {
    // data
    search,
    sortBy,
    order,
    difficulty,
    // actions
    setSearch,
    setSorting,
    setDifficulty,
    resetFilters,
  };
};
