import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { LoginView } from '@/components/features/auth/login-view';
import { appSettings } from '@/services/storage/app-settings';
import { loginThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { LoginData } from '@/types/auth';
import { getErrorText } from '@/utils/errors';

export default function AuthLoginScreen() {
  const dispatch = useAppDispatch();

  const handleLogin = async (creds: LoginData) => {
    try {
      await dispatch(loginThunk(creds)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Authorization saccessful',
      });
      router.replace('/store');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: getErrorText(error) || 'Something went wrong. Try later...',
      });
      throw error;
    }
  };

  const handleGuest = async () => {
    await appSettings.guestMode.set(true);
    router.replace('/store');
  };

  return <LoginView onLogin={handleLogin} onGuest={handleGuest} />;
}
