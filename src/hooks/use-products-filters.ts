import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetFilters as resetFiltersAction,
  setFieldsConditions as setFieldsConditionsAction,
  setSorting as setSortingAction,
} from '@/store/products/products-filter-slice';
import { handleSearchChange } from '@/store/products/products-filter-thunks';
import { ProductsFieldsConditions, ProductsSortBy, SortOrder } from '@/types/product';

export const useProductsFilters = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(state => state.productsFilter.search);
  const sortBy = useAppSelector(state => state.productsFilter.sortBy);
  const order = useAppSelector(state => state.productsFilter.order);
  const fieldsConditions = useAppSelector(state => state.productsFilter.fieldsConditions);

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

  const setFieldsConditions = useCallback(
    (conditions: ProductsFieldsConditions) => {
      dispatch(setFieldsConditionsAction(conditions));
    },
    [dispatch]
  );

  return {
    // data
    search,
    sortBy,
    order,
    fieldsConditions,
    // actions
    setSearch,
    setSorting,
    resetFilters,
    setFieldsConditions,
  };
};
