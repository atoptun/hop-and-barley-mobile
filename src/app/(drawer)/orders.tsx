import { StyleSheet } from 'react-native';

import { ModalSafeView } from '@/components/common/modal-safe-view';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export default function OrdersScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ModalSafeView title="Orders" contentStyle={styles.content}>
      <ThemedText variant="h3">Orders screen</ThemedText>
    </ModalSafeView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      padding: Spacing.six,
    },
  });
