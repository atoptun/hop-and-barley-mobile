import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ModalSheetView } from '@/components/common/modal-sheet-view';
import { SortOptionItem } from '@/components/ui/sort-option-item';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useProductsFilters } from '@/hooks/use-products-filters';
import { ProductsSortBy, SortOrder } from '@/types/product';

interface SortOption {
  id: string;
  label: string;
  sortBy?: ProductsSortBy;
  order?: SortOrder;
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'default', label: 'Default', sortBy: undefined, order: undefined },
  { id: 'title-asc', label: 'Name: A to Z', sortBy: 'name', order: 'asc' },
  { id: 'title-desc', label: 'Name: Z to A', sortBy: 'name', order: 'desc' },
  { id: 'price-desc', label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  { id: 'price-asc', label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { id: 'rating-desc', label: 'Rating: High to Low', sortBy: 'average_rating', order: 'desc' },
  { id: 'rating-asc', label: 'Rating: Low to High', sortBy: 'average_rating', order: 'asc' },
];

export function StoreSortView() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { sortBy, order, setSorting } = useProductsFilters();

  const handleSelect = (option: SortOption) => {
    setSorting(option.sortBy as any, option.order as any);
    router.back();
  };

  return (
    <ModalSheetView title="Sort products">
      <ScrollView style={styles.container} contentContainerStyle={styles.optionsList}>
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
      </ScrollView>
    </ModalSheetView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    optionsList: {
      paddingTop: Spacing.two,
      gap: Spacing.one,
    },
  });
