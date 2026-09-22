import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { useGetRecipesQuery } from '@/store/recipes/recipes-api';
import { useRecipesFilters } from '@/hooks/use-recipes-filters';
import { useRecipes } from '@/hooks/use-recipes';
import { RecipesList } from './recipes-list';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { EmptyState } from '@/components/common/empty-state';
import { ListHeader } from '@/components/common/list-header';
import { useState } from 'react';

export interface RecipesViewProps {}

export function RecipesView({}: RecipesViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const [searchQuery, setSearchQuery] = useState('');

  const { filters } = useRecipesFilters();

  const { recipes, isFetching, error } = useRecipes();

  useGetRecipesQuery(filters);

  const handleReload = () => {
    console.info('Recipes list reload');
  };

  const handleClearFilters = () => {
    console.info('Clear recipes filters');
  };

  const handleFilterPress = () => {
    console.info('Recipes filter pressed');
  };

  const handleSortPress = () => {
    console.info('Recipes sort pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <ListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={handleFilterPress}
        onSortPress={handleSortPress}
      /> */}
      {isFetching && recipes.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : error && recipes.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={error}
            actionTitle="Reload"
            onAction={handleReload}
          />
        </View>
      ) : (
        <RecipesList
          recipes={recipes}
          ListHeaderComponent={
            <ListHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterPress={handleFilterPress}
              onSortPress={handleSortPress}
            />
          }
          ListEmptyComponent={
            <EmptyState
              iconName="magnify"
              text="No recipes found matching your criteria."
              actionTitle="Clear filters"
              onAction={handleClearFilters}
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
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
