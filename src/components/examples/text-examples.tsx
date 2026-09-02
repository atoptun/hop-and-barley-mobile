import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';

export function TextExamples() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <ThemedText variant="h1" color="textPrimary">
          Header 1
        </ThemedText>
        <ThemedText variant="h2" color="textPrimary">
          Header 2
        </ThemedText>
        <ThemedText variant="h3" color="textPrimary">
          Header 3
        </ThemedText>
        <ThemedText variant="h4" color="textPrimary">
          Header 4
        </ThemedText>
      </View>
      <View style={styles.rowContainer}>
        <ThemedText variant="bodyXl" color="textPrimary">
          Body XL
        </ThemedText>
        <ThemedText variant="bodyL" color="textPrimary">
          Body L
        </ThemedText>
        <ThemedText variant="bodyM" color="textPrimary">
          Body M
        </ThemedText>
        <ThemedText variant="bodyS" color="textPrimary">
          Body S
        </ThemedText>
        <ThemedText variant="bodyXs" color="textPrimary">
          Body XS
        </ThemedText>
      </View>
      <View style={styles.rowContainer}>
        <ThemedText variant="actionL" color="textPrimary">
          Action L
        </ThemedText>
        <ThemedText variant="actionM" color="textPrimary">
          Action M
        </ThemedText>
        <ThemedText variant="actionS" color="textPrimary">
          Action S
        </ThemedText>
      </View>
      <View style={styles.rowContainer}>
        <ThemedText variant="captionM" color="textPrimary">
          Caption M
        </ThemedText>
      </View>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 12,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: colors.textPrimary,
    },
  });
