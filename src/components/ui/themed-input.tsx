import { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Pressable,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';
import { Typography } from '@/constants/typography';

export interface ThemedInputProps extends Omit<TextInputProps, 'style'> {
  title?: string;
  supportText?: string;
  errorMessage?: string;
  isError?: boolean;
  unit?: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export function ThemedInput({
  title,
  supportText,
  errorMessage,
  isError = false,
  unit,
  icon,
  onIconPress,
  editable = true,
  value,
  containerStyle,
  inputContainerStyle,
  onFocus,
  onBlur,
  placeholderTextColor,
  ...props
}: ThemedInputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(isError || errorMessage);
  const isDisabled = editable === false;

  const getBorderColor = () => {
    if (isDisabled) return colors.borderSecondary;
    if (hasError) return colors.error;
    if (isFocused) return colors.primary;
    return colors.borderSecondary;
  };

  const getBackgroundColor = () => {
    if (isDisabled) return colors.backgroundSecondary;
    return colors.background;
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* 1. Title / Label */}
      {Boolean(title) && (
        <ThemedText
          variant="h5"
          color={isDisabled ? 'textSecondary' : 'textPrimary'}
          style={styles.label}
        >
          {title}
        </ThemedText>
      )}

      {/* 2. Input field */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            borderWidth: isFocused || hasError ? 1.5 : 1,
          },
          inputContainerStyle,
        ]}
      >
        {/* Unit (€, $) */}
        {Boolean(unit) && (
          <ThemedText
            variant="bodyL"
            color={isDisabled ? 'textSecondary' : 'textSecondary'}
            style={styles.unit}
          >
            {unit}
          </ThemedText>
        )}

        <TextInput
          editable={editable}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor ?? colors.textSecondary}
          style={[
            styles.input,
            Typography.bodyL,
            {
              color: isDisabled ? colors.textSecondary : colors.textPrimary,
            },
          ]}
          {...props}
        />

        {/* Icon */}
        {Boolean(icon) && (
          <Pressable
            onPress={onIconPress}
            disabled={!onIconPress || isDisabled}
            style={styles.iconButton}
            hitSlop={8}
          >
            {icon}
          </Pressable>
        )}
      </View>

      {/* 3. Support text/Error */}
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
  label: {
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  unit: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 12,
  },
  iconButton: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 4,
  },
});
