import { IconButton } from '@/components/ui/icon-button';
import { ThemedButton } from '@/components/ui/themed-button';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useProductDetails } from '@/hooks/use-product-details';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductDetailsCard } from '../catalog/product-details-card';
import { useState } from 'react';
import { ThemedCounter } from '@/components/ui/themed-counter';
import { ErrorLoad } from '@/components/ui/error-load';

export interface ProductDetailsViewProps {
  slug: string;
  onClose: VoidFunction;
}

export function ProductDetailsView({ slug, onClose }: ProductDetailsViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [quantity, setQuantity] = useState(0);

  const { product, isLoading, error } = useProductDetails(slug);

  const styles = createStyles(colors, insets);

  const handleAdd = (slug: string) => {
    console.info('Add product to cart: ', slug);
    if (product?.stock! > 0) {
      setQuantity(1);
    }
  };
  const handleIncrement = (slug: string) => {
    console.info('Inc product in cart: ', slug);
    if (quantity < product?.stock!) {
      setQuantity(prev => prev + 1);
    }
  };
  const handleDecrement = (slug: string) => {
    console.info('Dec product in cart: ', slug);
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
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
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <ProductDetailsCard product={product!} />
        </ScrollView>
      )}
      {product && (
        <View style={styles.actions}>
          {quantity === 0 ? (
            <ThemedButton
              title="Add to cart"
              variant="primary"
              disabled={!product}
              iconName={'plus'}
              iconSize={22}
              style={styles.button}
              onPress={() => {
                handleAdd(product?.slug!);
              }}
            />
          ) : (
            <ThemedCounter
              quantity={quantity}
              onIncrement={() => handleIncrement(product?.slug!)}
              onDecrement={() => handleDecrement(product?.slug!)}
            />
          )}
        </View>
      )}
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
      // gap: 48,
      // borderTopWidth: 1,
      // borderTopColor: colors.borderSecondary ?? '#E2E8F0',
    },
    button: {
      flex: 1,
    },
  });
