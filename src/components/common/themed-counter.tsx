import { Theme, useTheme } from '@/context/theme-context';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedIcon } from '@/components/ui/themed-icon';
import { ThemedText } from '@/components/ui/themed-text';
import { TypographyVariant } from '@/constants/typography';

type Size = 'sm' | 'md' | 'lg';

export interface ThemedCounterProps {
  quantity?: number;
  size?: Size;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function ThemedCounter({
  quantity = 0,
  size = 'sm',
  onIncrement,
  onDecrement,
}: ThemedCounterProps) {
  const { colors } = useTheme();

  const buttonSize = size === 'sm' ? 24 : size === 'md' ? 32 : 42;
  const iconSize = buttonSize - 8;
  const textSize: TypographyVariant = size === 'sm' ? 'bodyM' : size === 'md' ? 'bodyL' : 'bodyXl';

  const styles = createStyles(colors, buttonSize);

  return (
    <View style={styles.counterContainer}>
      <Pressable
        onPress={onDecrement}
        hitSlop={8}
        style={({ pressed }) => [styles.circleButton, pressed && styles.buttonPressed]}
      >
        <ThemedIcon name="minus" size={iconSize} color="primary" />
      </Pressable>

      <ThemedText variant={textSize} color="textPrimary" style={styles.counterValue}>
        {quantity}
      </ThemedText>

      <Pressable
        onPress={onIncrement}
        hitSlop={8}
        style={({ pressed }) => [styles.circleButton, pressed && styles.buttonPressed]}
      >
        <ThemedIcon name="plus" size={iconSize} color="primary" />
      </Pressable>
    </View>
  );
}

const createStyles = (colors: Theme, buttonSize: number) =>
  StyleSheet.create({
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    circleButton: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
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
