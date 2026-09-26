import { StyleSheet } from 'react-native';

import { ModalSafeView } from '@/components/common/modal-safe-view';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export interface ProfileViewProps {
  onClose?: VoidFunction;
}

export function ProfileView({ onClose }: ProfileViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ModalSafeView title="Profile" contentStyle={styles.content} onClose={onClose}>
      <ThemedText variant="h3">Profile view</ThemedText>
    </ModalSafeView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: Spacing.six,
    },
  });
