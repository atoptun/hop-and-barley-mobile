import { useCallback } from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { Divider } from '@/components/ui/divider';
import { ProductListItem } from './product-list-item';
import { Product } from '@/types/product';

export interface ProductItemData extends Product {
  quantity: number;
}

export interface ProductListProps {
  products: ProductItemData[];
  onProductPress?: (id: string) => void;
  onAdd?: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
}

const ITEM_HEIGHT = 100;
const SEPARATOR_MARGIN = 16;
const TOTAL_ROW_HEIGHT = ITEM_HEIGHT + SEPARATOR_MARGIN * 2;

export function ProductList({
  products,
  onProductPress,
  onAdd,
  onIncrement,
  onDecrement,
  ListHeaderComponent,
  ListEmptyComponent,
}: ProductListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ProductItemData>) => (
      <ProductListItem
        title={item.title}
        subtitle={item.subtitle}
        price={item.price}
        currency={item.currency ?? '€'}
        image={item.image}
        quantity={item.quantity}
        onPress={onProductPress ? () => onProductPress(item.id) : undefined}
        onAdd={onAdd ? () => onAdd(item.id) : undefined}
        onIncrement={onIncrement ? () => onIncrement(item.id) : undefined}
        onDecrement={onDecrement ? () => onDecrement(item.id) : undefined}
      />
    ),
    [onProductPress, onAdd, onIncrement, onDecrement]
  );

  const keyExtractor = useCallback((item: ProductItemData) => item.id, []);

  const renderSeparator = useCallback(() => <Divider marginVertical={SEPARATOR_MARGIN} />, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: TOTAL_ROW_HEIGHT,
      offset: TOTAL_ROW_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
