import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { SortOptionItem } from '@/components/ui/sort-option-item';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useRecipesFilters } from '@/hooks/use-recipes-filters';
import { RecipeSortBy, SortOrder } from '@/types/recipe';

interface SortOption {
  id: string;
  label: string;
  sortBy?: RecipeSortBy;
  order?: SortOrder;
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'default', label: 'Default', sortBy: undefined, order: undefined },
  { id: 'title-asc', label: 'Title: A to Z', sortBy: 'title', order: 'asc' },
  { id: 'title-desc', label: 'Title: Z to A', sortBy: 'title', order: 'desc' },
  { id: 'rating-desc', label: 'Rating: High to Low', sortBy: 'average_rating', order: 'desc' },
  { id: 'rating-asc', label: 'Rating: Low to High', sortBy: 'average_rating', order: 'asc' },
];

export function RecipesSortView() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { sortBy, order, setSorting } = useRecipesFilters();

  const handleSelect = (option: SortOption) => {
    setSorting(option.sortBy as any, option.order as any);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.grabber} />
        <ThemedText variant="h3">Sort Recipes</ThemedText>
      </View>

      <View style={styles.optionsList}>
        {SORT_OPTIONS.map(option => {
          const isSelected =
            option.id === 'default' ? !sortBy : sortBy === option.sortBy && order === option.order;

          return (
            <SortOptionItem
              key={option.id}
              label={option.label}
              selected={isSelected}
              onSelect={() => handleSelect(option)}
            />
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.two,
      paddingBottom: Math.max(insets.bottom, Spacing.four),
    },
    header: {
      alignItems: 'center',
      paddingBottom: Spacing.four,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSecondary ?? colors.border,
      gap: Spacing.two,
    },
    grabber: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.borderSecondary,
    },
    optionsList: {
      paddingTop: Spacing.two,
      gap: Spacing.one,
    },
  });
