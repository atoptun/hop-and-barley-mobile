import { Pressable, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedIcon } from './themed-icon';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface ThemedCheckboxProps {
  value?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  supportText?: string;
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  containerStyle?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
}

const SIZE_CONFIG: Record<
  CheckboxSize,
  { boxSize: number; borderRadius: number; iconSize: number }
> = {
  sm: { boxSize: 18, borderRadius: 5, iconSize: 12 },
  md: { boxSize: 22, borderRadius: 7, iconSize: 15 },
  lg: { boxSize: 28, borderRadius: 9, iconSize: 19 },
};

export function ThemedCheckbox({
  value = false,
  onChange,
  label,
  supportText,
  errorMessage,
  isError = false,
  disabled = false,
  size = 'md',
  containerStyle,
  checkboxStyle,
}: ThemedCheckboxProps) {
  const { colors } = useTheme();

  const hasError = Boolean(isError || errorMessage);
  const { boxSize, borderRadius, iconSize } = SIZE_CONFIG[size];

  const handlePress = () => {
    if (disabled) return;
    onChange?.(!value);
  };

  const getBorderColor = () => {
    if (disabled) return colors.borderSecondary;
    if (hasError) return colors.error;
    if (value) return colors.primary;
    return colors.borderSecondary;
  };

  const getBackgroundColor = () => {
    if (disabled && value) return colors.borderSecondary;
    if (value) return colors.primary;
    if (disabled) return colors.backgroundSecondary;
    return colors.background;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value, disabled }}
        disabled={disabled}
        onPress={handlePress}
        hitSlop={8}
        style={styles.pressableRow}
      >
        <View
          style={[
            styles.box,
            {
              width: boxSize,
              height: boxSize,
              borderRadius,
              borderColor: getBorderColor(),
              backgroundColor: getBackgroundColor(),
              borderWidth: value ? 0 : 1.5,
            },
            checkboxStyle,
          ]}
        >
          {value && (
            <ThemedIcon
              name="check"
              size={iconSize}
              customColor={disabled ? colors.textSecondary : '#FFFFFF'}
            />
          )}
        </View>

        {Boolean(label) && (
          <View style={styles.labelContainer}>
            {typeof label === 'string' ? (
              <ThemedText variant="bodyM" color={disabled ? 'textSecondary' : 'textPrimary'}>
                {label}
              </ThemedText>
            ) : (
              label
            )}
          </View>
        )}
      </Pressable>

      {hasError && Boolean(errorMessage) ? (
        <ThemedText variant="bodyS" color="error" style={styles.helperText}>
          {errorMessage}
        </ThemedText>
      ) : supportText ? (
        <ThemedText variant="bodyS" color="textSecondary" style={styles.helperText}>
          {supportText}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  pressableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  labelContainer: {
    flex: 1,
    marginLeft: 12,
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
