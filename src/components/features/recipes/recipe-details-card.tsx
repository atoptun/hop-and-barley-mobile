import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { BeerRecipe, BeerRecipeIngredient } from '@/types/recipe';
import { ThemedImage } from '@/components/ui/themed-image';
import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/ui/themed-text';
import { RatingBadge } from '@/components/common/rating-badge';
import { MetricBadge } from './metric-badge';
import { router } from 'expo-router';
import { ImageGallery } from '@/components/common/image-gallery';

export interface RecipeDetailsCardProps {
  recipe: BeerRecipe;
}

export function RecipeDetailsCard({ recipe }: RecipeDetailsCardProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!recipe) return null;

  const handleIngredientPress = (slug: string) => {
    router.push({
      pathname: '/product/[slug]',
      params: { slug },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.gallery}>
        <ImageGallery images={recipe.gallery} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText variant="bodyS" color="textSecondary" numberOfLines={1}>
            {recipe.style}
          </ThemedText>
          <RatingBadge raiting={recipe.average_rating} />
        </View>

        <ThemedText variant="h2" color="textPrimary" numberOfLines={2}>
          {recipe.title}
        </ThemedText>

        {/* Metrics */}
        <View style={styles.metricsRow}>
          <MetricBadge label="ABV" value={recipe.abv} style={styles.metric} />
          <View style={styles.metricDivider} />
          <MetricBadge label="IBU" value={recipe.ibu.toFixed(0)} style={styles.metric} />
          <View style={styles.metricDivider} />
          <MetricBadge label="DIFF" value={recipe.difficulty} style={styles.metric} />
        </View>

        <ThemedText variant="bodyS" color="textSecondary">
          {recipe.full_description}
        </ThemedText>

        {recipe.ingredients.length > 0 && (
          <View style={styles.sectionWrapper}>
            <ThemedText variant="actionM">Ingredients</ThemedText>
            <View style={styles.sectionList}>
              {recipe.ingredients.map(item => (
                <IngredientItem
                  key={item.slug.toString()}
                  item={item}
                  onPress={handleIngredientPress}
                  styles={styles}
                />
              ))}
            </View>
          </View>
        )}

        {recipe.instructions.length > 0 && (
          <View style={styles.sectionWrapper}>
            <ThemedText variant="actionM">Instruction</ThemedText>
            <View style={styles.sectionList}>
              {recipe.instructions.map((item, index) => (
                <InstructionItem key={index} index={index} text={item} styles={styles} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

interface IngredientItemProps {
  item: BeerRecipeIngredient;
  onPress: (slug: string) => void;
  styles: RecipeStyles;
}

function IngredientItem({ item, onPress, styles }: IngredientItemProps) {
  const imagePath = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(item.slug)}
      style={({ pressed }) => [styles.ingredientItem, { opacity: pressed ? 0.85 : 1 }]}
    >
      <ThemedImage source={imagePath} style={styles.ingredientImage} />
      <View style={styles.ingredientMeta}>
        <ThemedText variant="h4">{item.name}</ThemedText>
        <ThemedText variant="bodyM">{item.amount}</ThemedText>
      </View>
    </Pressable>
  );
}

interface InstructionItemProps {
  index: number;
  text: string;
  styles: RecipeStyles;
}

function InstructionItem({ index, text, styles }: InstructionItemProps) {
  return (
    <View style={styles.instructionItem}>
      <View style={styles.stepCircle}>
        <ThemedText variant="bodyM" color="textOnPrimary">
          {index + 1}
        </ThemedText>
      </View>
      <View style={styles.stepText}>
        <ThemedText variant="bodyM">{text}</ThemedText>
      </View>
    </View>
  );
}

type RecipeStyles = ReturnType<typeof createStyles>;

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gallery: {
      flex: 1,
      width: '100%',
      height: 350,
    },
    content: {
      padding: Spacing.six,
      gap: Spacing.four,
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
    sectionWrapper: {
      gap: 8,
    },
    sectionList: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    ingredientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderBottomWidth: 1,
    },
    ingredientImage: {
      width: 44,
      height: 44,
      borderRadius: 6,
    },
    ingredientMeta: {
      flex: 1,
    },
    instructionItem: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
      padding: 12,
    },
    stepCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: colors.backgroundSecondary,
    },
    stepText: {
      flex: 1,
    },
  });
