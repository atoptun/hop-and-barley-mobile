import { Theme, useTheme } from '@/context/theme-context';
import { StyleSheet, View } from 'react-native';
import { ProductList, ProductItemData } from '@/components/features/catalog/product-list';
import { useCallback, useState } from 'react';

const BASE_PRODUCTS: Omit<ProductItemData, 'id'>[] = [
  {
    title: 'Imperial Organic Yeast A07',
    subtitle: 'per pouch',
    price: 12.0,
    currency: '€',
    image: require('@/assets/images/products/product-1.png'),
    quantity: 1,
  },
  {
    title: 'Saaz Hops',
    subtitle: 'per 100g',
    price: 15.0,
    currency: '€',
    image: require('@/assets/images/products/product-2.png'),
    quantity: 1,
  },
  {
    title: 'West Coast IPA - All-Grain Kit',
    subtitle: 'for 5 Gallons',
    price: 20.0,
    currency: '€',
    image: require('@/assets/images/products/product-3.png'),
    quantity: 1,
  },
];

const MOCK_PRODUCTS: ProductItemData[] = Array.from({ length: 30 }, (_, index) => {
  const baseItem = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  const id = String(index + 1);

  return {
    ...baseItem,
    id,
    title: `${baseItem.title} #${id}`,
  };
});

export function ProductListExamples() {
  const colors = useTheme();
  const styles = createStyles(colors);

  const [items, setItems] = useState<ProductItemData[]>(MOCK_PRODUCTS);

  const handleIncrement = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  const handleDecrement = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  }, []);

  const handleProductPress = useCallback((id: string) => {
    console.info(`Product '${id}' pressed`);
  }, []);

  return (
    <View style={styles.container}>
      <ProductList
        products={items}
        onProductPress={handleProductPress}
        onAdd={handleIncrement}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
  });
