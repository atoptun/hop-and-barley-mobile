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
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      {/* <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
      </Stack> */}
      <Stack screenOptions={{ title: 'Home', headerShown: true }} />
    </ThemeProvider>
  );
}
