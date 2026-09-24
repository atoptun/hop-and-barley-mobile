import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { RecoveryPasswordView } from '@/components/features/auth/recovery-password-view';
import { recoveryPasswordThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { getErrorText } from '@/utils/errors';

export default function RecoveryPasswordScreen() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (email: string) => {
    console.info(`Recovery password email: ${email}`);
    try {
      await dispatch(recoveryPasswordThunk(email)).unwrap();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: getErrorText(error) || 'Something went wrong. Try later...',
      });
    }
  };

  const handleFinish = () => {
    router.replace('/(auth)/login');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <RecoveryPasswordView onSubmit={handleSubmit} onClose={handleClose} onFinish={handleFinish} />
  );
}
