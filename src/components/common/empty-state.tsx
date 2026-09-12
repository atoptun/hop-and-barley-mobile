import { View, StyleSheet } from 'react-native';
import { IconName, ThemedIcon } from '@/components/ui/themed-icon';
import { ThemedText } from '../ui/themed-text';
import { ThemedButton } from '../ui/themed-button';
import { Spacing } from '@/constants/theme';

export interface EmptyStateProps {
  iconName: IconName;
  iconSize?: number;
  text?: string;
  actionTitle?: string;
  onAction?: VoidFunction;
}

export function EmptyState({
  iconName,
  iconSize = 88,
  text,
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {iconName && <ThemedIcon name={iconName} size={iconSize} color="primary" />}
      {text && (
        <ThemedText variant="bodyM" color="textPrimary" style={styles.text}>
          {text}
        </ThemedText>
      )}
      {actionTitle && onAction && (
        <ThemedButton title={actionTitle} onPress={onAction} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.six,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    minWidth: '50%',
  },
});
