import { RegisterView } from '@/components/features/auth/register-view';
import { registerThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { RegisterData } from '@/types/auth';
import { hasErrorMessage } from '@/utils/utils';
import { router } from 'expo-router';

export default function AuthRegsterScreen() {
  const dispatch = useAppDispatch();

  const handleRegister = async (data: RegisterData) => {
    console.info(`Refister: data ${JSON.stringify(data)}`);
    try {
      await dispatch(registerThunk(data)).unwrap();
      // toast.success('Nice to see you');
      router.replace('/store');

      // TODO: after implementation confirmation
      // router.push({ pathname: '/(auth)/confirm-code', params: { email: data.email } });
    } catch (error) {
      if (hasErrorMessage(error)) {
        // toast.error('Something went wrong...');
      }
      throw error;
    }
  };

  const handleGuest = () => {
    router.replace('/store');
  };

  return <RegisterView onRegister={handleRegister} onGuest={handleGuest} />;
}
