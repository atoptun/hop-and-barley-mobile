import { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { useTheme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  isError?: boolean;
  autoFocus?: boolean;
}

export function OtpInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  isError = false,
  autoFocus = true,
}: OtpInputProps) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  const codeDigits = Array.from({ length }, (_, index) => value[index] || '');

  return (
    <Pressable onPress={handlePress} disabled={disabled} style={styles.container}>
      {/* Hidden real input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={text => {
          const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
          onChange(cleaned);
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode" // iOS autofill from SMS
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        maxLength={length}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
        caretHidden
      />

      <View style={styles.cellsRow}>
        {codeDigits.map((digit, index) => {
          const isCurrent = isFocused && index === value.length;
          const isLastAndFull = isFocused && index === length - 1 && value.length === length;
          const isActive = isCurrent || isLastAndFull;

          const borderColor = isError
            ? colors.error
            : isActive
              ? colors.primary
              : colors.borderSecondary;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                {
                  borderColor,
                  backgroundColor: colors.background,
                  borderWidth: isActive || isError ? 1.5 : 1,
                },
              ]}
            >
              {digit ? (
                <ThemedText variant="h2" style={styles.digitText}>
                  {digit}
                </ThemedText>
              ) : isActive ? (
                <View style={[styles.cursor, { backgroundColor: colors.primary }]} />
              ) : null}
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
  },
  cellsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cell: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
  },
  cursor: {
    width: 2,
    height: 24,
    borderRadius: 1,
  },
});
