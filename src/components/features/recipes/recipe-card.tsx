import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { RatingBadge } from '@/components/common/rating-badge';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';
import { BeerRecipeCardItem } from '@/types/recipe';

import { MetricBadge } from './metric-badge';

export interface RecipeCardProps {
  recipe: BeerRecipeCardItem;
  onPress?: (slug: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const RecipeCard = memo(function RecipeCard({ recipe, onPress, style }: RecipeCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handlePress = () => {
    if (onPress) {
      onPress(recipe.slug);
    } else {
      router.push({
        pathname: '/recipe/[slug]',
        params: { slug: recipe.slug },
      });
    }
  };

  const imagePath =
    typeof recipe.gallery[0] === 'string' ? { uri: recipe.gallery[0] } : recipe.gallery[0];

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
      <ThemedImage source={imagePath} style={styles.image} contentFit="cover" transition={200} />

      {/* Content part */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="bodyS" color="textSecondary" numberOfLines={1}>
            {recipe.style}
          </ThemedText>
          <RatingBadge raiting={recipe.average_rating} />
        </View>

        <ThemedText variant="h4" color="textPrimary" numberOfLines={2}>
          {recipe.title}
        </ThemedText>

        <ThemedText variant="bodyS" color="textSecondary" numberOfLines={2}>
          {recipe.short_description}
        </ThemedText>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <MetricBadge label="ABV" value={recipe.abv} style={styles.metric} />
          <View style={styles.metricDivider} />
          <MetricBadge label="IBU" value={recipe.ibu.toFixed(0)} style={styles.metric} />
          <View style={styles.metricDivider} />
          <MetricBadge label="DIFF" value={recipe.difficulty} style={styles.metric} />
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
      height: '100%',
      borderRadius: 16,
      backgroundColor: colors.backgroundSecondary,
    },
    content: {
      flex: 1,
      // height: 100,
      gap: 8,
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingLeft: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    metricsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
    metric: {
      flex: 1,
      alignItems: 'center',
      maxWidth: 100,
      backgroundColor: colors.primaryContainer,
      borderRadius: 6,
    },
    metricDivider: {
      width: 1,
      height: 16,
      backgroundColor: colors.border,
    },
  });
