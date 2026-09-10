import { ThemeProvider } from '@/context/theme-context';
import { persistor, store } from '@/store/store';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
      console.error('Font loading error', fontError);
    }
  }, [fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(auth)" />

              <Stack.Screen name="(drawer)" />

              {/* Cart */}
              <Stack.Screen
                name="(modals)/cart"
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_left',
                }}
              />
              {/* Product details */}
              <Stack.Screen
                name="(modals)/product/[slug]"
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
                  animation: 'slide_from_left',
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
          </GestureHandlerRootView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
