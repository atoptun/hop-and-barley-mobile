import { LoginView } from '@/components/features/auth/login-view';
import { LoginData } from '@/types/auth';
import { useRouter } from 'expo-router';

export default function AuthLoginScreen() {
  const router = useRouter();

  const handleLogin = async (data: LoginData) => {
    // TODO: handle login
    console.info(`Login data: ${JSON.stringify(data)}`);

    router.replace('/store');
  };

  const handleGuest = () => {
    router.replace('/store');
  };

  return <LoginView onLogin={handleLogin} onGuest={handleGuest} />;
}
