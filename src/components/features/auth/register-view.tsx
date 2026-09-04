import { PasswordInput } from '@/components/ui/password-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCheckbox } from '@/components/ui/themed-checkbox';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { RegisterData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
    agreeTerms: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(data => data.agreeTerms === true, {
    message: 'You must agree to continue',
    path: ['agreeTerms'],
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
      agreeTerms: false,
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
                  errorMessage={errors.name?.message}
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
                  errorMessage={errors.email?.message}
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
                  errorMessage={errors.password?.message}
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
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="agreeTerms"
              render={({ field: { value, onChange, onBlur } }) => (
                <ThemedCheckbox
                  value={value}
                  onChange={onChange}
                  label={
                    <ThemedText variant="bodyS" color="textSecondary">
                      I&apos;ve read and agree with the{' '}
                      <ThemedText variant="actionM" color="primary">
                        Terms and Conditions
                      </ThemedText>{' '}
                      and the{' '}
                      <ThemedText variant="actionM" color="primary">
                        Privacy Policy
                      </ThemedText>
                      .
                    </ThemedText>
                  }
                  errorMessage={errors.agreeTerms?.message}
                />
              )}
            />
          </View>
          <View style={styles.actions}>
            <ThemedButton title="Register" disabled={isSubmitting} onPress={handleSubmit(submit)} />
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
