import { useMemo } from 'react';

export const useRecipesFilters = () => {
  const filters = useMemo(() => {
    const result = {
      page: 1,
      limit: 10,
    };
    return result;
  }, []);

  return { filters };
};
