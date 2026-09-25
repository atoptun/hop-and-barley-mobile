import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOutLeft, LinearTransition } from 'react-native-reanimated';

import { ListFooterLoader } from '@/components/common/list-footer-loader';
import { ProductCard } from '@/components/features/catalog/product-card';
import { Divider } from '@/components/ui/divider';
import { useTheme } from '@/context/theme-context';
import { ProductCardItem } from '@/types/product';

export interface ProductListProps {
  products: ProductCardItem[];
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  onProductPress?: (slug: string) => void;
  onLoadMore?: VoidFunction;
  onRefresh?: VoidFunction;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
}

export function ProductList({
  products,
  ListHeaderComponent,
  ListEmptyComponent,
  onProductPress,
  onLoadMore,
  onRefresh,
  isRefreshing = false,
  isLoadingMore = false,
}: ProductListProps) {
  const { colors } = useTheme();

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

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return <ListFooterLoader />;
  }, [isLoadingMore]);

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={renderFooter}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        )
      }
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
