import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { ThemeColors } from '@/constants/theme';
import { TypographyVariant } from '@/constants/typography';

export interface RatingBadgeProps {
  raiting: number;
  variant?: TypographyVariant;
  color?: ThemeColors;
}

export function RatingBadge({
  raiting,
  variant = 'actionM',
  color = 'textPrimary',
}: RatingBadgeProps) {
  if (!raiting) return null;

  return (
    <View style={styles.container}>
      <ThemedText variant={variant} color="starActive">
        ★
      </ThemedText>
      <ThemedText variant={variant} color={color}>
        {raiting.toFixed(1)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
