import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AddToCartCounter } from '@/components/common/add-to-cart-counter';
import { RatingBadge } from '@/components/common/rating-badge';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useCartProduct } from '@/hooks/use-cart-product';
import { ProductCardItem } from '@/types/product';

export interface ProductCardProps {
  product: ProductCardItem;
  onPress?: (slug: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const ProductCard = memo(function ProductCard({
  product,
  onPress,
  style,
}: ProductCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { itemQuantity, addToCart, incQuantity, decQuantity } = useCartProduct(product);

  const handlePress = () => {
    if (onPress) {
      onPress(product.slug);
    } else {
      router.push({
        pathname: '/product/[slug]',
        params: { slug: product.slug },
      });
    }
  };

  const price = Math.max(1, itemQuantity) * product.price;
  const formattedPrice = `$ ${price.toFixed(2)}`;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      {/* Image */}
      <ThemedImage
        source={typeof product.image === 'string' ? { uri: product.image } : product.image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      {/* Content part */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText variant="h4" color="textPrimary" numberOfLines={1}>
              {product.name}
            </ThemedText>
            <RatingBadge raiting={product.average_rating} variant="h4" />
          </View>
          {Boolean(product.price_tag) && (
            <ThemedText variant="bodyS" color="textSecondary" numberOfLines={1}>
              {product.price_tag}
            </ThemedText>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/*Actions */}
          <AddToCartCounter
            quantity={itemQuantity}
            stock={product.stock}
            size="sm"
            onAdd={addToCart}
            onIncrement={incQuantity}
            onDecrement={decQuantity}
          />

          {/* Price */}
          <ThemedText variant="h3" color="textPrimary">
            {formattedPrice}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
});

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    card: {
      width: '100%',
      minHeight: 100,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      overflow: 'hidden',
      // elevation: 2,
      backgroundColor: colors.background,
    },
    image: {
      width: 90,
      height: 100,
      borderRadius: 16,
      backgroundColor: colors.backgroundSecondary,
    },
    content: {
      flex: 1,
      height: 100,
      gap: 8,
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingLeft: 16,
    },
    header: {
      gap: 4,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: Spacing.two,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addButton: {
      minHeight: 32,
      paddingVertical: 4,
      paddingHorizontal: 16,
    },
  });
