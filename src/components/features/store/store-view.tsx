import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreHeader } from '@/components/features/store/store-header';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ProductList } from '@/components/features/catalog/product-list';
import { useProducts } from '@/hooks/use-products';
import { Spacing } from '@/constants/theme';
import { EmptyState } from '@/components/common/empty-state';

export interface StoreViewProps {
  onProductPress: (productId: string) => void;
  onFilterPress: () => void;
}

export function StoreView({ onProductPress, onFilterPress }: StoreViewProps) {
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
      <StoreHeader
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
          onProductPress={onProductPress}
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
