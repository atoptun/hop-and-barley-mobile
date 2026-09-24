import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { RegisterView } from '@/components/features/auth/register-view';
import { appSettings } from '@/services/storage/app-settings';
import { registerThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { RegisterData } from '@/types/auth';
import { getErrorText } from '@/utils/errors';

export default function AuthRegsterScreen() {
  const dispatch = useAppDispatch();

  const handleRegister = async (data: RegisterData) => {
    console.info(`Refister: data ${JSON.stringify(data)}`);
    try {
      await dispatch(registerThunk(data)).unwrap();
      router.push({ pathname: '/(auth)/confirm-code', params: { email: data.email } });
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

  return <RegisterView onRegister={handleRegister} onGuest={handleGuest} />;
}
