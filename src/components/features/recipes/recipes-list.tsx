import { ReactElement, useCallback } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { ListFooterLoader } from '@/components/common/list-footer-loader';
import { RecipeCard } from '@/components/features/recipes/recipe-card';
import { Divider } from '@/components/ui/divider';
import { useTheme } from '@/context/theme-context';
import { BeerRecipe } from '@/types/recipe';

export interface RecipesListProps {
  recipes: BeerRecipe[];
  ListHeaderComponent?: ReactElement;
  ListEmptyComponent?: ReactElement;
  onLoadMore?: VoidFunction;
  onRefresh?: VoidFunction;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function RecipesList({
  recipes,
  ListHeaderComponent,
  ListEmptyComponent,
  onLoadMore,
  onRefresh,
  isRefreshing = false,
  isLoadingMore = false,
  style,
}: RecipesListProps) {
  const { colors } = useTheme();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<BeerRecipe>) => {
      const isLastItem = index === recipes.length - 1;

      return (
        <View>
          <RecipeCard recipe={item} />
          {!isLastItem && (
            <View style={styles.separatorWrapper}>
              <Divider marginVertical={16} />
            </View>
          )}
        </View>
      );
    },
    [recipes.length]
  );

  const keyExtractor = useCallback((item: BeerRecipe) => item.slug, []);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return <ListFooterLoader />;
  }, [isLoadingMore]);

  return (
    <FlatList
      data={recipes}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[styles.list, style]}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={renderFooter}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
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
  list: {},
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  separatorWrapper: {
    width: '100%',
  },
});
