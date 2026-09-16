import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { ThemedIcon } from '@/components/ui/themed-icon';
import { ThemedText } from '@/components/ui/themed-text';
import { useTheme, Theme } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';
import { TypographyVariant } from '@/constants/typography';

export type CounterSize = 'sm' | 'md' | 'lg';

export interface AddToCartCounterProps {
  quantity: number;
  stock?: number;
  size?: CounterSize;
  btnAddTitle?: string;
  btnSoldOutTitle?: string;
  fullWidth?: boolean;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  style?: ViewStyle;
}

interface SizeConfig {
  height: number;
  btnWidth: number;
  iconSize: number;
  textVariant: TypographyVariant;
  buttonPaddingH: number;
  gap: number;
  minWidthValue: number;
}

const SIZE_CONFIGS: Record<CounterSize, SizeConfig> = {
  sm: {
    height: 32,
    btnWidth: 28,
    iconSize: 16,
    textVariant: 'bodyM',
    buttonPaddingH: Spacing.three,
    gap: Spacing.two,
    minWidthValue: 18,
  },
  md: {
    height: 36,
    btnWidth: 32,
    iconSize: 18,
    textVariant: 'bodyL',
    buttonPaddingH: Spacing.four,
    gap: Spacing.two,
    minWidthValue: 24,
  },
  lg: {
    height: 48,
    btnWidth: 44,
    iconSize: 22,
    textVariant: 'h4',
    buttonPaddingH: Spacing.six,
    gap: Spacing.four,
    minWidthValue: 36,
  },
};

export function AddToCartCounter({
  quantity,
  stock = 1,
  size = 'md',
  btnAddTitle = 'Add',
  btnSoldOutTitle = 'Sold out',
  fullWidth = false,
  onAdd,
  onIncrement,
  onDecrement,
  style,
}: AddToCartCounterProps) {
  const { colors } = useTheme();
  const config = SIZE_CONFIGS[size];
  const styles = createStyles(colors, config, fullWidth);

  const isOutOfStock = stock <= 0;

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(18).stiffness(140)}
      style={[styles.wrapper, style]}
    >
      {quantity === 0 ? (
        <Animated.View
          key="button"
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={fullWidth && styles.fullWidth}
        >
          <Pressable
            disabled={isOutOfStock}
            onPress={onAdd}
            style={({ pressed }) => [
              styles.button,
              isOutOfStock && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
          >
            <ThemedIcon name="plus" size={config.iconSize} color="background" />
            <ThemedText variant={config.textVariant} style={styles.buttonText}>
              {isOutOfStock ? btnSoldOutTitle : btnAddTitle}
            </ThemedText>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View
          key="counter"
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={styles.counterRow}
        >
          <Pressable
            hitSlop={8}
            onPress={onDecrement}
            style={({ pressed }) => [styles.circleBtn, pressed && styles.buttonPressed]}
          >
            <ThemedIcon name="minus" size={config.iconSize} color="textOnPrimary" />
          </Pressable>

          <View style={styles.counterValueBox}>
            <Animated.View
              key={quantity}
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(100)}
            >
              <ThemedText variant={config.textVariant} color="textPrimary" style={styles.valueText}>
                {quantity}
              </ThemedText>
            </Animated.View>
          </View>

          <Pressable
            hitSlop={8}
            disabled={quantity >= stock}
            onPress={onIncrement}
            style={({ pressed }) => [
              styles.circleBtn,
              quantity >= stock && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
          >
            <ThemedIcon name="plus" size={config.iconSize} color="textOnPrimary" />
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const createStyles = (colors: Theme, config: SizeConfig, fullWidth: boolean) =>
  StyleSheet.create({
    wrapper: {
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: config.height,
    },
    fullWidth: {
      width: '100%',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8, //config.height / 2,
      paddingHorizontal: config.buttonPaddingH,
      gap: config.gap,
      height: config.height,
      minWidth: fullWidth ? undefined : 76,
    },
    buttonText: {
      color: colors.background,
      fontWeight: '600',
    },
    buttonDisabled: {
      opacity: 0.4,
    },
    buttonPressed: {
      opacity: 0.8,
    },
    counterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: config.gap,
      height: config.height,
    },
    circleBtn: {
      width: config.btnWidth,
      height: config.btnWidth,
      borderRadius: config.btnWidth / 2,
      backgroundColor: colors.primary, //backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterValueBox: {
      minWidth: config.minWidthValue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueText: {
      textAlign: 'center',
    },
  });
