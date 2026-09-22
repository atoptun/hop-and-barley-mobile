import { useGetRecipesQuery } from '@/store/recipes/recipes-api';
import { getErrorText } from '@/utils/utils';

import { useRecipesFilters } from './use-recipes-filters';

export const useRecipes = () => {
  const { filters } = useRecipesFilters();

  return useGetRecipesQuery(filters, {
    selectFromResult: ({ data, isFetching, isError, error }) => {
      const items = data?.items ?? [];
      const hasMore = data?.hasMore ?? false;

      const errorText = isError ? getErrorText(error) : undefined;

      return {
        recipes: items,
        hasMore,
        isFetching,
        isError,
        error: errorText,
      };
    },
  });
};
