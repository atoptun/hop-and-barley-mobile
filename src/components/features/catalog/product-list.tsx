import { Divider } from '@/components/ui/divider';
import { ProductCardItem } from '@/types/product';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ProductListItem } from '@/components/features/catalog/product-list-item';

export interface ProductListProps {
  products: ProductCardItem[];
  onProductPress?: (slug: string) => void;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
}

const ITEM_HEIGHT = 100;
const SEPARATOR_MARGIN = 16;
const TOTAL_ROW_HEIGHT = ITEM_HEIGHT + SEPARATOR_MARGIN * 2;

export function ProductList({
  products,
  onProductPress,
  ListHeaderComponent,
  ListEmptyComponent,
}: ProductListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ProductCardItem>) => (
      <ProductListItem
        product={item}
        onPress={onProductPress ? () => onProductPress(item.slug) : undefined}
      />
    ),
    [onProductPress]
  );

  const keyExtractor = useCallback((item: ProductCardItem) => item.slug, []);

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
