import { ErrorLoad } from '@/components/common/error-load';
import { ThemedCounter } from '@/components/common/themed-counter';
import { ProductDetailsCard } from '@/components/features/catalog/product-details-card';
import { IconButton } from '@/components/ui/icon-button';
import { ThemedButton } from '@/components/ui/themed-button';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useProductDetails } from '@/hooks/use-product-details';
import { selectItemQuantity } from '@/store/cart/cart-selectors';
import { addToCart, decQuantity, incQuantity, removeFromCart } from '@/store/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ProductDetailsViewProps {
  slug: string;
  onClose: VoidFunction;
}

export function ProductDetailsView({ slug, onClose }: ProductDetailsViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { product, isLoading, error } = useProductDetails(slug);

  const quantity = useAppSelector(selectItemQuantity(product?.slug));

  const styles = createStyles(colors, insets);

  const handleAdd = () => {
    if (!product || (product.stock ?? 0) <= 0) return;
    dispatch(addToCart(product!));
  };

  const handleIncrement = () => {
    if (!product) return;
    if (quantity >= (product.stock ?? 0)) {
      //  show limit message
      return;
    }
    dispatch(incQuantity(product.slug));
  };

  const handleDecrement = () => {
    if (!product) return;
    if (quantity > 1) {
      dispatch(decQuantity(product.slug));
    } else {
      dispatch(removeFromCart(product.slug));
    }
  };

  const handleReload = () => {
    console.info('Reload product');
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
          <ErrorLoad error={error} onReloadPress={handleReload} />
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
            {quantity === 0 ? (
              <ThemedButton
                title="Add to cart"
                variant="primary"
                disabled={(product.stock ?? 0) === 0}
                iconName={'plus'}
                iconSize={22}
                style={styles.button}
                onPress={handleAdd}
              />
            ) : (
              <ThemedCounter
                quantity={quantity}
                size="lg"
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            )}
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
      left: Spacing.six,
      top: insets.top,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.three,
      paddingBottom: Math.max(insets.bottom, insets.bottom + Spacing.four),
      gap: 48,
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
    },
  });
