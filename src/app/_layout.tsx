import { ThemeProvider } from '@/context/theme-context';
import { persistor, store } from '@/store/store';
import { SplashScreen, Stack } from 'expo-router';
import { StrictMode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';

if (__DEV__) {
  import('@/config/reactotron');
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter_400Regular: require('@/assets/fonts/Inter-Regular.ttf'),
    Inter_500Medium: require('@/assets/fonts/Inter-Medium.ttf'),
    Inter_600SemiBold: require('@/assets/fonts/Inter-SemiBold.ttf'),
    Inter_700Bold: require('@/assets/fonts/Inter-Bold.ttf'),
    Inter_800ExtraBold: require('@/assets/fonts/Inter-ExtraBold.ttf'),
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
    <StrictMode>
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
                    animation: 'slide_from_right',
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
            </GestureHandlerRootView>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
