import { EmptyState } from '@/components/common/empty-state';
import { IconButton } from '@/components/ui/icon-button';
import { ThemedButton } from '@/components/ui/themed-button';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { addListToCart } from '@/store/cart/cart-slice';
import { useAppDispatch } from '@/store/hooks';
import { useGetRecipeBySlugQuery } from '@/store/recipes/recipes-api';
import { getErrorText } from '@/utils/utils';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { RecipeDetailsCard } from './recipe-details-card';

export interface RecipeDetailViewProps {
  slug: string;
  onClose: VoidFunction;
}

export function RecipeDetailView({ slug, onClose }: RecipeDetailViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const dispatch = useAppDispatch();

  const { data: recipe, isLoading, error } = useGetRecipeBySlugQuery(slug);

  const errorText = getErrorText(error);

  const handleReload = () => {
    console.info('Recipe reload');
  };

  const handleAddToCart = () => {
    if (recipe?.ingredients && recipe.ingredients.length > 0) {
      dispatch(addListToCart(recipe.ingredients));
      Toast.show({
        type: 'success',
        text1: 'All ingredients have been added to the cart.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <IconButton
        iconName="close"
        iconColor="primary"
        onPress={onClose}
        style={styles.closeButton}
      />
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={errorText}
            actionTitle="Reload"
            onAction={handleReload}
          />
        </View>
      ) : recipe ? (
        <>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <RecipeDetailsCard recipe={recipe} />
          </ScrollView>
          <View style={styles.actions}>
            <ThemedButton
              title="Add ingredients to cart"
              iconName="plus"
              onPress={handleAddToCart}
            />
          </View>
        </>
      ) : null}
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: insets.top,
      position: 'relative',
      backgroundColor: colors.background,
    },
    closeButton: {
      position: 'absolute',
      left: Spacing.four,
      top: insets.top + Spacing.four,
      backgroundColor: colors.backgroundSecondary,
      zIndex: 100,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.six,
      paddingTop: insets.top,
    },
    error: {
      alignSelf: 'center',
      paddingTop: insets.top + Spacing.six,
    },
    content: {
      flex: 1,
      // padding: Spacing.six,
    },
    contentContainer: {
      gap: Spacing.four,
    },
    actions: {
      width: '100%',
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.three,
      paddingBottom: Math.max(insets.bottom, insets.bottom + Spacing.four),
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
    },
  });
