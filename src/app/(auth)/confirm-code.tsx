import { ConfirmCodeView } from '@/components/features/auth/confirm-code-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

type ConfirmRouteParams = {
  email?: string;
};

export default function AuthConfirmScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<ConfirmRouteParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerifyCode = async (code: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // TODO: API request check code
      console.log('Verifying code:', code, 'for:', email);

      if (code !== '0000') {
        throw new Error('Wrong code');
      }

      // Success
      router.replace('/(tabs)/store');
    } catch {
      setErrorMessage('Invalid confirmation code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // TODO: API request resend code
      console.log('Resending code to:', email);
    } catch {
      setErrorMessage('Failed to resend code. Please try again later.');
    }
  };

  return (
    <ConfirmCodeView
      email={Array.isArray(email) ? email[0] : email}
      onSubmit={handleVerifyCode}
      onResend={handleResendCode}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
}
