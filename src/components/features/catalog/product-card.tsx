import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ImageSource } from 'expo-image';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCounter } from '@/components/ui/themed-counter';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';

export interface ProductCardProps {
  title: string;
  subtitle?: string;
  price: number;
  currency?: string;
  image: string | number | ImageSource;
  quantity?: number;
  onPress?: () => void;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ProductCard({
  title,
  subtitle,
  price,
  currency = '€',
  image,
  quantity = 0,
  onPress,
  onAdd,
  onIncrement,
  onDecrement,
  style,
}: ProductCardProps) {
  const colors = useTheme();
  const styles = createStyles(colors);

  const formattedPrice = `${currency} ${price.toFixed(2)}`;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
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
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />

      {/* Content part */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="h5" color="textPrimary" numberOfLines={1}>
            {title}
          </ThemedText>
          {Boolean(subtitle) && (
            <ThemedText variant="bodyS" color="textSecondary" numberOfLines={1}>
              {subtitle}
            </ThemedText>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/*Actions */}
          {quantity === 0 ? (
            <ThemedButton title="Add" iconName="plus" onPress={onAdd} style={styles.addButton} />
          ) : (
            <ThemedCounter
              quantity={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
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
