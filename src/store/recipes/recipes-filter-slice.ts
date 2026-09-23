import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Difficulty, RecipeSortBy, SortOrder } from '@/types/recipe';

export interface RecipesFilterState {
  page: number;
  limit: number;
  search: string;
  applyedSearch: string;
  sortBy?: RecipeSortBy;
  order?: SortOrder;
  difficulty?: Difficulty;
  isRefreshing: boolean;
}

const RECIPES_PER_PAGE = 10;

const initialState: RecipesFilterState = {
  page: 1,
  limit: RECIPES_PER_PAGE,
  search: '',
  applyedSearch: '',
  sortBy: undefined,
  order: undefined,
  difficulty: undefined,
  isRefreshing: false,
};

export const recipesFilterSlice = createSlice({
  name: 'recipesFilter',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    applySearch: (state, action: PayloadAction<string>) => {
      state.applyedSearch = action.payload;
      state.page = 1;
    },
    setSorting: (state, action: PayloadAction<{ sortBy: RecipeSortBy; order: SortOrder }>) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.page = 1;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty | undefined>) => {
      state.difficulty = action.payload;
      state.page = 1;
    },
    nextPage: state => {
      state.page += 1;
    },
    resetPage: state => {
      state.page = 1;
    },
    resetFilters: () => initialState,
    setIsRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const {
  setSearch,
  applySearch,
  setSorting,
  setDifficulty,
  nextPage,
  resetPage,
  resetFilters,
  setIsRefreshing,
} = recipesFilterSlice.actions;

export const recipesFilterReducer = recipesFilterSlice.reducer;
