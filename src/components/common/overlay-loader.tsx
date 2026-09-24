import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export function OverlayLoader() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.overlay,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    },
    loaderBox: {
      padding: Spacing.five,
      borderRadius: 16,
      backgroundColor: colors.backgroundSecondary,
    },
  });
