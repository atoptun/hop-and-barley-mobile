import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

import { appSettings } from '@/services/storage/app-settings';

type TargetRoute = '/(onboarding)' | '/(auth)/login' | '/store';

export default function EntryScreen() {
  const [target, setTarget] = useState<TargetRoute | null>(null);

  useEffect(() => {
    async function prepareApp() {
      try {
        const hasOnboarded = await appSettings.onboarding.get();
        // const hasOnboarded = false;

        if (!hasOnboarded) {
          setTarget('/(onboarding)');
          return;
        }

        // TODO: check auth token
        const hasAuthToken = true;

        if (!hasAuthToken) {
          setTarget('/(auth)/login');
        } else {
          setTarget('/store');
        }
      } catch {
        setTarget('/(onboarding)');
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  if (!target) return null;

  return <Redirect href={target} />;
}
