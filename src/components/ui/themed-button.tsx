import { IconName, ThemedIcon } from '@/components/ui/themed-icon';
import { TypographyVariant } from '@/constants/typography';
import { useTheme } from '@/context/theme-context';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ThemedText } from './themed-text';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ThemedButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  iconName?: IconName | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  loading?: boolean;
  fullWidth?: boolean; // need row container
  style?: StyleProp<ViewStyle>;
}

export function ThemedButton({
  title,
  variant = 'primary',
  iconName = null,
  iconPosition = 'left',
  iconSize = 12,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}: ThemedButtonProps) {
  const { colors } = useTheme();

  const textVariant: TypographyVariant = 'actionM';

  const getVariantContainerStyle = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: pressed ? colors.backgroundSecondary : 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: pressed ? colors.backgroundSecondary : 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          opacity: pressed ? 0.85 : 1,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'primary') return 'textOnPrimary';
    return 'primary';
  };

  const icon = iconName && <ThemedIcon name={iconName} size={iconSize} color={getTextColor()} />;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        getVariantContainerStyle(pressed),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && <View>{icon}</View>}
          <ThemedText variant={textVariant} color={getTextColor()}>
            {title}
          </ThemedText>
          {icon && iconPosition === 'right' && <View>{icon}</View>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 40,
  },
  fullWidth: {
    // width: '100%',
    flex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
