import { Theme, useTheme } from '@/context/theme-context';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedIcon } from './themed-icon';
import { ThemedText } from './themed-text';

export interface ThemedCounterProps {
  quantity?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function ThemedCounter({ quantity = 0, onIncrement, onDecrement }: ThemedCounterProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.counterContainer}>
      <Pressable
        onPress={onDecrement}
        hitSlop={8}
        style={({ pressed }) => [styles.circleButton, pressed && styles.buttonPressed]}
      >
        <ThemedIcon name="minus" size={14} color="primary" />
      </Pressable>

      <ThemedText variant="bodyM" color="textPrimary" style={styles.counterValue}>
        {quantity}
      </ThemedText>

      <Pressable
        onPress={onIncrement}
        hitSlop={8}
        style={({ pressed }) => [styles.circleButton, pressed && styles.buttonPressed]}
      >
        <ThemedIcon name="plus" size={14} color="primary" />
      </Pressable>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    circleButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPressed: {
      opacity: 0.7,
    },
    counterValue: {
      minWidth: 16,
      textAlign: 'center',
    },
  });
