import { useRouter } from 'expo-router';
import { RecoveryPasswordView } from '@/components/features/auth/recovery-password-view';

export default function RecoveryPasswordScreen() {
  const router = useRouter();

  const handleSubmit = async (email: string) => {
    // TODO: API request recovery password
    console.info(`Recovery password email: ${email}`);

    router.replace('/(auth)/login');
  };

  return <RecoveryPasswordView onSubmit={handleSubmit} />;
}
