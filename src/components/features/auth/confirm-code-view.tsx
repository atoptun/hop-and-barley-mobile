import { OtpInput } from '@/components/ui/otp-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ConfirmCodeViewProps {
  email: string;
  onSubmit: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
  resendTimeoutSeconds?: number;
}

const OTP_LENGTH = 4;
const DEFAULT_RESEND_TIMEOUT = 30;

export function ConfirmCodeView({
  email,
  onSubmit,
  onResend,
  isLoading = false,
  errorMessage: externalErrorMessage,
  resendTimeoutSeconds = DEFAULT_RESEND_TIMEOUT,
}: ConfirmCodeViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(resendTimeoutSeconds);
  const [localError, setLocalError] = useState('');

  const displayError = externalErrorMessage || localError;

  // Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (localError) setLocalError('');

    if (newCode.length === OTP_LENGTH) {
      onSubmit(newCode);
    }
  };

  const handleContinuePress = () => {
    if (code.length !== OTP_LENGTH) {
      setLocalError(`Please enter all ${OTP_LENGTH} digits`);
      return;
    }
    onSubmit(code);
  };

  const handleResendPress = () => {
    if (timer > 0) return;
    setTimer(resendTimeoutSeconds);
    onResend?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText variant="h3">Enter confirmation code</ThemedText>
            <ThemedText variant="bodyS" color="textSecondary">
              A {OTP_LENGTH}-digit code was sent to{'\n'}
            </ThemedText>
            <ThemedText variant="bodyS" color="primary">
              {email}
            </ThemedText>
          </View>

          <View style={styles.otpWrapper}>
            <OtpInput
              length={OTP_LENGTH}
              value={code}
              onChange={handleCodeChange}
              isError={Boolean(displayError)}
              disabled={isLoading}
            />

            {Boolean(displayError) && (
              <ThemedText variant="bodyS" color="error" style={styles.errorText}>
                {displayError}
              </ThemedText>
            )}
          </View>

          <ThemedButton
            title={timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
            variant="ghost"
            disabled={timer > 0 || isLoading}
            onPress={handleResendPress}
            style={styles.resendButton}
          />

          <ThemedButton
            title="Continue"
            onPress={handleContinuePress}
            loading={isLoading}
            disabled={code.length < OTP_LENGTH || isLoading}
            style={styles.continueButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.six,
      paddingTop: 40,
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    otpWrapper: {
      marginBottom: 32,
      alignItems: 'center',
    },
    errorText: {
      marginTop: 12,
      textAlign: 'center',
    },
    resendButton: {
      marginBottom: 24,
    },
    continueButton: {
      width: '100%',
    },
    actions: {
      gap: Spacing.three,
    },
  });
