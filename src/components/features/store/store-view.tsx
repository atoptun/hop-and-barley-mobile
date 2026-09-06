import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreHeader } from './store-header';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ProductList } from '@/components/features/catalog/product-list';
import { useProducts } from '@/hooks/use-products';

export interface StoreViewProps {
  onProductPress: (productId: string) => void;
  onFilterPress: () => void;
}

export function StoreView({ onProductPress, onFilterPress }: StoreViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  const { products, isLoading, error } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSortPress = () => {};

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      <StoreHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={onFilterPress}
        onSortPress={handleSortPress}
      />
      <ProductList products={products} onProductPress={onProductPress} />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      color: colors.textPrimary,
    },
  });
