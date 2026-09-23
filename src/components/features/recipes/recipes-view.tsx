import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/common/empty-state';
import { ListHeader } from '@/components/common/list-header';
import { Theme, useTheme } from '@/context/theme-context';
import { useRecipes } from '@/hooks/use-recipes';
import { useRecipesFilters } from '@/hooks/use-recipes-filters';

import { RecipesList } from './recipes-list';

export function RecipesView() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { search, setSearch, resetFilters } = useRecipesFilters();

  const { recipes, error, isInitialLoading, isLoadingMore, isRefreshing, loadMore, refresh } =
    useRecipes();

  const handleFilterPress = () => {
    router.push('/recipes-filters');
  };

  const handleSortPress = () => {
    router.push('/recipes-sort');
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ListHeader
        searchQuery={search}
        onSearchChange={setSearch}
        onFilterPress={handleFilterPress}
        onSortPress={handleSortPress}
      />
      {isInitialLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : error && recipes.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={error}
            actionTitle="Reload"
            onAction={refresh}
          />
        </View>
      ) : (
        <RecipesList
          recipes={recipes}
          onLoadMore={loadMore}
          onRefresh={refresh}
          isRefreshing={isRefreshing}
          isLoadingMore={isLoadingMore}
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
