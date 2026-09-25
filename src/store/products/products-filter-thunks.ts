import { AppDispatch } from '@/store/store';

import { applySearch, setSearch } from './products-filter-slice';

let searchTimer: ReturnType<typeof setTimeout> | null = null;

export const handleSearchChange = (text: string) => (dispatch: AppDispatch) => {
  dispatch(setSearch(text));

  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  searchTimer = setTimeout(() => {
    dispatch(applySearch(text.trim()));
  }, 400);
};
