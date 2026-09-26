import { StyleSheet, View } from 'react-native';

import { RatingBadge } from '@/components/common/rating-badge';
import { ProductsTechSpecs } from '@/components/features/catalog/products-tech-specs';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { Product } from '@/types/product';

export interface ProductDetaulsCardProps {
  product: Product;
}

export function ProductDetailsCard({ product }: ProductDetaulsCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!product) return null;

  const price = `$ ${product.price.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <ThemedImage
        source={typeof product.image === 'string' ? { uri: product.image } : product.image}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText variant="h2">{product.name}</ThemedText>
            <RatingBadge raiting={product.average_rating} variant="h3" />
          </View>
          <View style={styles.priceBox}>
            <ThemedText variant="h3">{price}</ThemedText>
            <View style={styles.priceTag}>
              <ThemedText>{product.price_tag}</ThemedText>
            </View>
          </View>
        </View>
        <View>
          <ThemedText variant="bodyS" color="textSecondary">
            {product.description}
          </ThemedText>
        </View>
        {product.technical_specifications && (
          <ProductsTechSpecs techSpecs={product.technical_specifications} />
        )}
      </View>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      width: '100%',
      height: 300,
    },
    content: {
      padding: Spacing.six,
      gap: Spacing.six,
    },
    header: {
      gap: Spacing.two,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: Spacing.two,
    },
    priceBox: {
      flexDirection: 'row',
      gap: Spacing.two,
    },
    priceTag: {
      paddingHorizontal: Spacing.two,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 8,
    },
  });
