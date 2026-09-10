import { LoginView } from '@/components/features/auth/login-view';
import { loginThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { LoginData } from '@/types/auth';
import { hasErrorMessage } from '@/utils/utils';
import { router } from 'expo-router';

export default function AuthLoginScreen() {
  const dispatch = useAppDispatch();
  const handleLogin = async (creds: LoginData) => {
    // TODO: handle login
    try {
      await dispatch(loginThunk(creds)).unwrap();
      // show success message
      router.replace('/store');
    } catch (error) {
      if (hasErrorMessage(error)) {
        // show error message
        // console.info('err', error);
      }
      throw error;
    }
  };

  const handleGuest = () => {
    router.replace('/store');
  };

  return <LoginView onLogin={handleLogin} onGuest={handleGuest} />;
}
