import { useEffect } from 'react';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { ThemeProvider } from '@/context/theme-context';
import { Stack, SplashScreen } from 'expo-router';

if (__DEV__) {
  import('../../ReactotronConfig');
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontError) {
      // SplashScreen.hideAsync();
      console.error('Font loading error', fontError);
    }
  }, [fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />

        {/* Product details */}
        <Stack.Screen
          name="(modals)/product/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />

        {/* Filters */}
        <Stack.Screen
          name="(modals)/filters"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />

        {/* Checkout */}
        <Stack.Screen
          name="(modals)/checkout"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
