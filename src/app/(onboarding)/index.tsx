import { OnboardingView } from '@/components/features/onboarding/onboarding-view';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  const handleOnFinish = (isSkip: boolean) => {
    if (!isSkip) {
      // TODO: save the flag in settings
    }
    router.replace('/(auth)/login');
  };

  return <OnboardingView onFinish={handleOnFinish} />;
}
