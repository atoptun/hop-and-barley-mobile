import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductsFieldsConditions, ProductsSortBy, SortOrder } from '@/types/product';

export interface ProductsFilterState {
  page: number;
  limit: number;
  search: string;
  applyedSearch: string;
  sortBy?: ProductsSortBy;
  order?: SortOrder;
  fieldsConditions: ProductsFieldsConditions;
  isRefreshing: boolean;
}

const PRODUCTS_PER_PAGE = 10;

const initialState: ProductsFilterState = {
  page: 1,
  limit: PRODUCTS_PER_PAGE,
  search: '',
  applyedSearch: '',
  sortBy: undefined,
  order: undefined,
  fieldsConditions: {},
  isRefreshing: false,
};

export const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    applySearch: (state, action: PayloadAction<string>) => {
      state.applyedSearch = action.payload;
      state.page = 1;
    },
    setSorting: (state, action: PayloadAction<{ sortBy: ProductsSortBy; order: SortOrder }>) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.page = 1;
    },
    nextPage: state => {
      state.page += 1;
    },
    resetPage: state => {
      state.page = 1;
    },
    setFieldsConditions: (state, action: PayloadAction<ProductsFieldsConditions>) => {
      state.fieldsConditions = action.payload;
    },
    resetFilters: () => initialState,
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const {
  setSearch,
  applySearch,
  setSorting,
  nextPage,
  resetPage,
  setFieldsConditions,
  resetFilters,
  setRefreshing,
} = productsFilterSlice.actions;

export const productsFilterReducer = productsFilterSlice.reducer;
