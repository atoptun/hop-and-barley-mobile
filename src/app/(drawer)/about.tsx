import { StyleSheet } from 'react-native';

import { ModalSafeView } from '@/components/common/modal-safe-view';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export default function AboutScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ModalSafeView title="About us" contentStyle={styles.content}>
      <ThemedText variant="h3">About screen</ThemedText>
    </ModalSafeView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      padding: Spacing.six,
    },
  });
