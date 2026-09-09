import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';
import { ThemedIcon } from '@/components/ui/themed-icon';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';

export interface ErrorLoadProps {
  error?: string;
  onReloadPress?: VoidFunction;
}

export function ErrorLoad({
  error = 'Something went wrong.\nTry later...',
  onReloadPress,
}: ErrorLoadProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedIcon name="alert-octagon-outline" color="primary" size={86} />
      <ThemedText variant="bodyM" color="textPrimary" style={styles.textCenter}>
        {error}
      </ThemedText>
      <ThemedButton title="Reload" onPress={onReloadPress} style={styles.button} />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      gap: Spacing.six,
      backgroundColor: colors.background,
    },
    textCenter: {
      textAlign: 'center',
    },
    button: {
      width: '50%',
    },
  });
