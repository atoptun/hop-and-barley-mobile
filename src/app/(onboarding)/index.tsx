import { router } from 'expo-router';

import { OnboardingView } from '@/components/features/onboarding/onboarding-view';
import { appSettings } from '@/services/storage/app-settings';

export default function OnboardingScreen() {
  const handleOnFinish = async () => {
    await appSettings.onboarding.set(true);
    router.replace('/(auth)/login');
  };

  return <OnboardingView onFinish={handleOnFinish} />;
}
