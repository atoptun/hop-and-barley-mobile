import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedLink } from '@/components/ui/themed-link';

export function LinkExamples() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedText variant="bodyM" color="textSecondary" style={styles.inlineText}>
        Not a member?{' '}
        <ThemedLink href="/" variant="actionL" color="primary">
          Register now
        </ThemedLink>
      </ThemedText>
      <ThemedLink href="/" variant="actionL" color="primary" style={styles.guestLink}>
        Continue as Guest
      </ThemedLink>
      <ThemedLink href="/" variant="actionL" color="primary" style={styles.forgotLink}>
        Forgot password?
      </ThemedLink>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.background,
    },
    inlineText: {
      textAlign: 'center',
    },
    guestLink: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    forgotLink: {
      textAlign: 'left',
    },
  });
