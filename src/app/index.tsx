import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

type TargetRoute = '/(onboarding)' | '/(auth)/login' | '/(tabs)/store';

export default function EntryScreen() {
  const [target, setTarget] = useState<TargetRoute | null>(null);

  useEffect(() => {
    async function prepareApp() {
      try {
        // TODO: check onboarded settings
        const hasOnboarded = false;

        if (!hasOnboarded) {
          setTarget('/(onboarding)');
          return;
        }

        // TODO: check auth token
        const hasAuthToken = false;

        if (!hasAuthToken) {
          setTarget('/(auth)/login');
        } else {
          setTarget('/(tabs)/store');
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
