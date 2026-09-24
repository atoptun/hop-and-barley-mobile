import { Href, Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

import { appSettings } from '@/services/storage/app-settings';
import { selectAuthUser } from '@/store/auth/auth-selectors';
import { restoreSessionThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function EntryScreen() {
  const dispatch = useAppDispatch();
  const [target, setTarget] = useState<Href | null>(null);
  const user = useAppSelector(selectAuthUser);

  useEffect(() => {
    async function prepareApp() {
      try {
        const hasOnboarded = await appSettings.onboarding.get();
        // const hasOnboarded = false;

        if (!hasOnboarded) {
          setTarget('/(onboarding)');
          return;
        }

        await dispatch(restoreSessionThunk()).unwrap();

        const needAuth = !user || !(await appSettings.guestMode.get());
        // const needAuth = true;

        if (needAuth) {
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
  }, [dispatch, user]);

  if (!target) return null;

  return <Redirect href={target} />;
}
