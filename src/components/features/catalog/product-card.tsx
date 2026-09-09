import { ThemedCounter } from '@/components/common/themed-counter';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';
import { Product } from '@/types/product';
import { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface ProductCardProps {
  product: Product;
  onPress?: (slug: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function ProductCard({ product, onPress, style }: ProductCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [quantity, setQuantity] = useState(0);

  const handleAdd = (slug: string) => {
    console.info('Add product to cart: ', slug);
    setQuantity(1);
  };
  const handleIncrement = (slug: string) => {
    console.info('Inc product in cart: ', slug);
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  const handleDecrement = (slug: string) => {
    console.info('Dec product in cart: ', slug);
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const formattedPrice = `$ ${product.price.toFixed(2)}`;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => (onPress ? onPress(product.slug) : undefined)}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed && onPress ? 0.92 : 1,
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
          <ThemedText variant="h5" color="textPrimary" numberOfLines={1}>
            {product.name}
          </ThemedText>
          {Boolean(product.price_tag) && (
            <ThemedText variant="bodyS" color="textSecondary" numberOfLines={1}>
              {product.price_tag}
            </ThemedText>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/*Actions */}
          {quantity === 0 ? (
            <ThemedButton
              title="Add"
              iconName="plus"
              onPress={() => handleAdd(product.slug)}
              style={styles.addButton}
            />
          ) : (
            <ThemedCounter
              quantity={quantity}
              onIncrement={() => handleIncrement(product.slug)}
              onDecrement={() => handleDecrement(product.slug)}
            />
          )}

          {/* Price */}
          <ThemedText variant="h4" color="textPrimary">
            {formattedPrice}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

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
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    header: {
      gap: 4,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    addButton: {
      minHeight: 32,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
  });
