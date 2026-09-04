import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedButton } from '@/components/ui/themed-button';

const recoverySchema = z.object({
  email: z.email('Please enter a valid email address'),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

export interface RecoveryPasswordViewProps {
  onSubmit: (email: string) => Promise<void>;
}

export function RecoveryPasswordView({ onSubmit }: RecoveryPasswordViewProps) {
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
    <SafeAreaView style={styles.saveArea}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText variant="h3">Recovery password</ThemedText>
            <ThemedText variant="bodyS" color="textSecondary">
              Enter your email and we send you a letter with instructions.
            </ThemedText>
          </View>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    saveArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: Spacing.six,
      gap: Spacing.six,
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
