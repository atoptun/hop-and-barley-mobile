import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ModalSheetView } from '@/components/common/modal-sheet-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedRadioButton } from '@/components/ui/themed-radio-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useProductsFilters } from '@/hooks/use-products-filters';
import { ProductsFieldsConditions } from '@/types/product';

const CATEGORIES: { label: string; value: string | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Yeast', value: 'yeast' },
  { label: 'Hops', value: 'hops' },
  { label: 'Adjuncts', value: 'adjuncts' },
  { label: 'Malts', value: 'malts' },
];

export interface StoreFiltersViewProps {
  onClose?: VoidFunction;
}

export function StoreFiltersView({ onClose }: StoreFiltersViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { fieldsConditions, setFieldsConditions, resetFilters } = useProductsFilters();
  const [draft, setDraft] = useState<ProductsFieldsConditions>(fieldsConditions);

  const handleApplyFilters = () => {
    setFieldsConditions(draft);
    onClose?.();
  };

  const handleResetFilters = () => {
    resetFilters();
    onClose?.();
  };

  return (
    <ModalSheetView title="Products filters">
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsList}>
          <ThemedText variant="h3" style={styles.sectionTitle}>
            Difficulty
          </ThemedText>
          {CATEGORIES.map(option => (
            <ThemedRadioButton
              key={option.label}
              label={option.label}
              selected={draft.category_slug === option.value}
              onSelect={() => setDraft(prev => ({ ...prev, category_slug: option.value }))}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <ThemedButton
          title="Reset"
          variant="outline"
          style={styles.button}
          onPress={handleResetFilters}
        />
        <ThemedButton
          title="Apply"
          variant="primary"
          style={styles.button}
          onPress={handleApplyFilters}
        />
      </View>
    </ModalSheetView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: Spacing.six,
    },
    contentContainer: {
      gap: Spacing.four,
    },
    sectionTitle: {
      marginBottom: Spacing.two,
    },
    optionsList: {
      gap: Spacing.two,
    },
    actions: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.three,
      // paddingBottom: Math.max(insets.bottom + Spacing.four, Spacing.four),
      gap: 48,
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
    },
    button: {
      flex: 1,
    },
  });
