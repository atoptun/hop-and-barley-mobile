import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/empty-state';
import { ListHeader } from '@/components/common/list-header';
import { ProductList } from '@/components/features/catalog/product-list';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useDelayedFlag } from '@/hooks/use-delayed-flag';
import { useProducts } from '@/hooks/use-products';
import { useProductsFilters } from '@/hooks/use-products-filters';

export interface StoreViewProps {
  onFilterPress: VoidFunction;
  onSortPress: VoidFunction;
}

export function StoreView({ onFilterPress, onSortPress }: StoreViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { search, setSearch, resetFilters } = useProductsFilters();

  const {
    products,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    isFilterFetching,
    error,
    loadMore,
    refresh,
  } = useProducts();

  const showDimming = useDelayedFlag(isFilterFetching, 1000);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ListHeader
        searchQuery={search}
        onSearchChange={setSearch}
        onFilterPress={onFilterPress}
        onSortPress={onSortPress}
      />
      {isInitialLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error && products.length === 0 ? (
        <View style={styles.center}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={error}
            actionTitle="Reload"
            onAction={refresh}
          />
        </View>
      ) : (
        <ProductList
          products={products}
          style={{ opacity: showDimming ? 0.6 : 1 }}
          isLoadingMore={isLoadingMore}
          isRefreshing={isRefreshing}
          onLoadMore={loadMore}
          onRefresh={refresh}
          ListEmptyComponent={
            <EmptyState
              iconName="magnify"
              text="No products found matching your criteria."
              actionTitle="Clear filters"
              onAction={resetFilters}
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
      position: 'relative',
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
