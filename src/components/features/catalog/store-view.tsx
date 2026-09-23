import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/empty-state';
import { ListHeader } from '@/components/common/list-header';
import { ProductList } from '@/components/features/catalog/product-list';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useProducts } from '@/hooks/use-products';

export interface StoreViewProps {
  onFilterPress: () => void;
}

export function StoreView({ onFilterPress }: StoreViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { products, isLoading, error } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSortPress = () => {};

  const handleReload = () => {
    //refetch
    console.info('Reload store');
  };

  const handleClearFilters = () => {
    console.info('Clear filters');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={onFilterPress}
        onSortPress={handleSortPress}
      />
      {isLoading && products.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error && products.length === 0 ? (
        <View style={styles.center}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={error}
            actionTitle="Reload"
            onAction={handleReload}
          />
        </View>
      ) : (
        <ProductList
          products={products}
          ListEmptyComponent={
            <EmptyState
              iconName="magnify"
              text="No products found matching your criteria."
              actionTitle="Clear filters"
              onAction={handleClearFilters}
            />
          }
        />
      )}
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.six,
    },
    text: {
      color: colors.textPrimary,
    },
  });
