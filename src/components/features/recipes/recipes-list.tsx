import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import { RecipeCard } from '@/components/features/recipes/recipe-card';
import { Divider } from '@/components/ui/divider';
import { BeerRecipe } from '@/types/recipe';

export interface RecipesListProps {
  recipes: BeerRecipe[];
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
}

export function RecipesList({
  recipes,
  ListHeaderComponent,
  ListEmptyComponent,
}: RecipesListProps) {
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

  return (
    <FlatList
      data={recipes}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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
  separatorWrapper: {
    width: '100%',
  },
});
