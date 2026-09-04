import { PasswordInput } from '@/components/ui/password-input';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedInput } from '@/components/ui/themed-input';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { LoginData } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginViewProps {
  onLogin: (data: LoginData) => Promise<void>;
  onGuest: VoidFunction;
}

export function LoginView({ onLogin, onGuest }: LoginViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    await onLogin({ email, password });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <ThemedImage source={require('@/assets/images/login.jpg')} style={styles.image} />

        <View style={styles.content}>
          <ThemedText variant="h1">Welcome!</ThemedText>
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <ThemedInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Email Address"
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
                  placeholder="Password"
                  title=""
                  errorMessage={value && errors.password?.message}
                />
              )}
            />
            <ThemedLink variant="actionM" href={'/(auth)/recovery-password'} style={{}}>
              Forgot password?
            </ThemedLink>
          </View>

          <View style={styles.actions}>
            <ThemedButton title="Login" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
            <ThemedText variant="bodyS" color="textSecondary" style={{ textAlign: 'center' }}>
              Not a member?{' '}
              <ThemedLink variant="actionM" href={'/(auth)/register'}>
                Register now
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
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    image: {
      height: '100%',
    },
    content: {
      // flex: 1,
      gap: Spacing.six,
      padding: Spacing.six,
      paddingTop: Spacing.ten,
    },
    form: {
      gap: Spacing.four,
    },
    actions: {
      gap: Spacing.four,
    },
  });
