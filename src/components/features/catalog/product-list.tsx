import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

import { ProductCard } from '@/components/features/catalog/product-card';
import { Divider } from '@/components/ui/divider';
import { ProductCardItem } from '@/types/product';

export interface ProductListProps {
  products: ProductCardItem[];
  onProductPress?: (slug: string) => void;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
}

export function ProductList({
  products,
  onProductPress,
  ListHeaderComponent,
  ListEmptyComponent,
}: ProductListProps) {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ProductCardItem>) => {
      const isLastItem = index === products.length - 1;

      return (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOutLeft.duration(200)}
          layout={LinearTransition.springify().damping(16).stiffness(120)}
          style={styles.animatedRow}
        >
          <ProductCard product={item} onPress={onProductPress} />

          {!isLastItem && (
            <View style={styles.separatorWrapper}>
              <Divider marginVertical={16} />
            </View>
          )}
        </Animated.View>
      );
    },
    [onProductPress, products.length]
  );

  const keyExtractor = useCallback((item: ProductCardItem) => item.slug, []);

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
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
  animatedRow: {
    overflow: 'hidden',
  },
  separatorWrapper: {
    width: '100%',
  },
});
