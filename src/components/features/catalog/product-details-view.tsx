import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddToCartCounter } from '@/components/common/add-to-cart-counter';
import { EmptyState } from '@/components/common/empty-state';
import { ProductDetailsCard } from '@/components/features/catalog/product-details-card';
import { IconButton } from '@/components/ui/icon-button';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useCartProduct } from '@/hooks/use-cart-product';
import { useGetProductBySlugQuery } from '@/store/products/products-api';
import { getErrorText } from '@/utils/errors';

export interface ProductDetailsViewProps {
  slug: string;
  onClose: VoidFunction;
}

export function ProductDetailsView({ slug, onClose }: ProductDetailsViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { data: product, isLoading, isFetching, error, refetch } = useGetProductBySlugQuery(slug);

  const errorText = getErrorText(error);

  const { itemQuantity, addToCart, incQuantity, decQuantity } = useCartProduct(product);

  const handleReload = () => {
    console.info('Reload product');
    refetch();
  };

  const showLoader = isLoading || (isFetching && !product);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <IconButton
        iconName="close"
        iconColor="primary"
        onPress={onClose}
        style={styles.closeButton}
      />
      {showLoader ? (
        <View style={styles.centered}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : errorText ? (
        <View style={styles.centered}>
          <EmptyState
            iconName="alert-octagon-outline"
            text={errorText}
            actionTitle="Reload"
            onAction={handleReload}
          />
        </View>
      ) : product ? (
        <>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <ProductDetailsCard product={product!} />
          </ScrollView>
          <View style={styles.actions}>
            <AddToCartCounter
              quantity={itemQuantity}
              stock={product.stock}
              size="lg"
              fullWidth={true}
              btnAddTitle="Add to cart"
              onAdd={addToCart}
              onIncrement={incQuantity}
              onDecrement={decQuantity}
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
    button: {
      flex: 1,
      paddingVertical: 10,
    },
  });
