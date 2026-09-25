import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters as resetFiltersAction,
  setSorting as setSortingAction,
} from '@/store/products/products-filter-slice';
import { handleSearchChange } from '@/store/products/products-filter-thunks';
import { ProductsSortBy, SortOrder } from '@/types/product';

export const useProductsFilters = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(state => state.productsFilter.search);
  const sortBy = useAppSelector(state => state.productsFilter.sortBy);
  const order = useAppSelector(state => state.productsFilter.order);

  const setSearch = useCallback(
    (text: string) => {
      dispatch(handleSearchChange(text));
    },
    [dispatch]
  );

  const setSorting = useCallback(
    (sortBy: ProductsSortBy, order: SortOrder = 'asc') => {
      dispatch(setSortingAction({ sortBy, order }));
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
    // actions
    setSearch,
    setSorting,
    resetFilters,
  };
};
