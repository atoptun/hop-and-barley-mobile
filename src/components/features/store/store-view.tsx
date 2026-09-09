import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreHeader } from '@/components/features/store/store-header';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ProductList } from '@/components/features/catalog/product-list';
import { useProducts } from '@/hooks/use-products';
import { Spacing } from '@/constants/theme';
import { ErrorLoad } from '@/components/common/error-load';

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
          <ErrorLoad error={error} onReloadPress={handleReload} />
        </View>
      ) : (
        <ProductList products={products} onProductPress={onProductPress} />
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
