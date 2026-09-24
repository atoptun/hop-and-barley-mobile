import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

import { ConfirmCodeView } from '@/components/features/auth/confirm-code-view';
import { resendCodeThunk, verifyCodeThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { getErrorText } from '@/utils/errors';

type ConfirmRouteParams = {
  email?: string;
};

export default function AuthConfirmScreen() {
  const { email } = useLocalSearchParams<ConfirmRouteParams>();

  const dispatch = useAppDispatch();

  const handleVerifyCode = async (code: string) => {
    try {
      await dispatch(verifyCodeThunk(code)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Registration saccessful',
      });
      router.replace('/store');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: getErrorText(error) || 'Something went wrong. Try later...',
      });
    }
  };

  const handleResendCode = async () => {
    try {
      await dispatch(resendCodeThunk()).unwrap();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: getErrorText(error) || 'Something went wrong. Try later...',
      });
    }
  };

  return (
    <ConfirmCodeView
      email={Array.isArray(email) ? email[0] : email}
      onSubmit={handleVerifyCode}
      onResend={handleResendCode}
    />
  );
}
