import { RegisterView } from '@/components/features/auth/register-view';
import { RegisterData } from '@/types/auth';
import { useRouter } from 'expo-router';

export default function AuthRegsterScreen() {
  const router = useRouter();

  const handleRegister = async (data: RegisterData) => {
    // TODO: handle register
    console.info(`Refister: data ${JSON.stringify(data)}`);

    router.push({ pathname: '/(auth)/confirm-code', params: { email: data.email } });
  };

  const handleGuest = () => {
    router.replace('/(tabs)/store');
  };

  return <RegisterView onRegister={handleRegister} onGuest={handleGuest} />;
}
