import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { ModalHeader } from '@/components/common/modal-header';
import { OverlayLoader } from '@/components/common/overlay-loader';
import { SafeKeyboardView } from '@/components/common/safe-keyboard-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { selectAuthIsLoading } from '@/store/auth/auth-selectors';
import { useAppSelector } from '@/store/hooks';

const recoverySchema = z.object({
  email: z.email('Please enter a valid email address'),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

export interface RecoveryPasswordViewProps {
  onSubmit: (email: string) => Promise<void>;
  onClose?: VoidFunction;
  onFinish?: VoidFunction;
}

export function RecoveryPasswordView({ onSubmit, onClose, onFinish }: RecoveryPasswordViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const authIsLoading = useAppSelector(selectAuthIsLoading);

  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const showLoader = authIsLoading || isSubmitting;

  const submit = async ({ email }: RecoveryFormValues) => {
    try {
      await onSubmit(email);
      setSubmittedEmail(email);
      setIsSuccess(true);
    } catch {
      // silent
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
      return;
    }
    onClose?.();
  };

  return (
    <SafeKeyboardView
      safeAreaProps={{ style: { position: 'relative' } }}
      scrollContentStyles={styles.container}
    >
      <ModalHeader title="Recovery password" onClosePress={onClose} />

      {!isSuccess ? (
        <View style={styles.content}>
          <ThemedText variant="bodyS" color="textSecondary">
            Enter your email and we send you a letter with instructions.
          </ThemedText>
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <ThemedInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  title="Email Address"
                  placeholder="name@email.com"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </View>
          <View style={styles.actions}>
            <ThemedButton title="Sent" disabled={isSubmitting} onPress={handleSubmit(submit)} />
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.successMessageBlock}>
            <ThemedText variant="bodyM" color="textPrimary">
              We have sent instructions to restore your password to:
            </ThemedText>
            <ThemedText variant="actionL" color="primary">
              {submittedEmail}
            </ThemedText>
            <ThemedText variant="bodyS" color="textSecondary" style={styles.noteText}>
              If you don&apos;t receive an email within a few minutes, check your spam folder.
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <ThemedButton title="Back to Login" onPress={handleFinish} />
          </View>
        </View>
      )}

      {showLoader && <OverlayLoader />}
    </SafeKeyboardView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 0,
    },
    content: {
      gap: Spacing.six,
      paddingHorizontal: Spacing.six,
    },
    header: {
      gap: Spacing.two,
    },
    form: {
      gap: Spacing.four,
    },
    actions: {
      gap: Spacing.three,
    },
    successMessageBlock: {
      gap: Spacing.two,
    },
    noteText: {
      marginTop: Spacing.two,
    },
  });
