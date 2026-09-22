import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedText } from '../ui/themed-text';

export interface RatingBadgeProps {
  raiting: number;
}

export function RatingBadge({ raiting }: RatingBadgeProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.star}>★</ThemedText>
      <ThemedText variant="actionM" color="textPrimary">
        {raiting.toFixed(1)}
      </ThemedText>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    star: {
      color: colors.starActive,
      fontSize: 12,
      marginRight: 2,
    },
  });
