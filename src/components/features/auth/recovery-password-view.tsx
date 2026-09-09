import { ModalHeader } from '@/components/common/modal-header';
import { SafeKeyboardView } from '@/components/common/safe-keyboard-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

const recoverySchema = z.object({
  email: z.email('Please enter a valid email address'),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

export interface RecoveryPasswordViewProps {
  onSubmit: (email: string) => Promise<void>;
  onClose?: VoidFunction;
}

export function RecoveryPasswordView({ onSubmit, onClose }: RecoveryPasswordViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

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

  const submit = async ({ email }: RecoveryFormValues) => {
    await onSubmit(email);
  };

  return (
    <SafeKeyboardView scrollContentStyles={styles.container}>
      <ModalHeader title="Recovery password" onClosePress={onClose} />
      <View style={styles.content}>
        {/* <ThemedText variant="h3">Recovery password</ThemedText> */}
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
  });
