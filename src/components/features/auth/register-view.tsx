import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { Spacing } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedLink } from '@/components/ui/themed-link';
import { z } from 'zod';
import { RegisterData } from '@/types/auth';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '@/components/ui/password-input';

const registerSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 8 characters'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterViewProps {
  onRegister: (data: RegisterData) => Promise<void>;
  onGuest: VoidFunction;
}

export function RegisterView({ onRegister, onGuest }: RegisterViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const submit = async ({ name, email, password, confirmPassword }: RegisterFormValues) => {
    await onRegister({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText variant="h3">Sign up</ThemedText>
            <ThemedText variant="bodyS" color="textSecondary">
              Create an account to get started{' '}
            </ThemedText>
          </View>
          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange, onBlur } }) => (
                <ThemedInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  title="Name"
                  placeholder="Name"
                  autoCapitalize="words"
                  autoCorrect={false}
                  keyboardType="default"
                  errorMessage={value && errors.name?.message}
                />
              )}
            />
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
                  errorMessage={value && errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  title="Password"
                  placeholder="Create a password"
                  errorMessage={value && errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange, onBlur } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  title=""
                  placeholder="Confirm password"
                  errorMessage={value && errors.confirmPassword?.message}
                />
              )}
            />
          </View>
          <View style={styles.actions}>
            <ThemedButton title="Register" onPress={handleSubmit(submit)} />
            <ThemedText variant="bodyS" color="textSecondary" style={{ textAlign: 'center' }}>
              I already have account.{' '}
              <ThemedLink variant="actionM" href={'/(auth)/login'}>
                Log in
              </ThemedLink>
            </ThemedText>
            <ThemedButton
              title="Continue as Guest"
              variant="ghost"
              onPress={() => {
                onGuest();
              }}
              style={{ paddingVertical: 0 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      gap: Spacing.six,
      padding: Spacing.six,
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
