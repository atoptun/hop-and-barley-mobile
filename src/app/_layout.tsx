import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useToastConfig } from '@/config/toast';
import { ThemeProvider } from '@/context/theme-context';
import { persistor, store } from '@/store/store';

if (__DEV__) {
  import('@/config/reactotron');
}

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const toastConfig = useToastConfig();

  return (
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

        {/* Store filters */}
        <Stack.Screen
          name="(modals)/store-filters"
          options={{
            presentation: 'formSheet',
            headerShown: false,
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: true,
            sheetCornerRadius: 20,
          }}
        />

        {/* Store sort */}
        <Stack.Screen
          name="(modals)/store-sort"
          options={{
            presentation: 'formSheet',
            headerShown: false,
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: true,
            sheetCornerRadius: 20,
          }}
        />

        {/* Recipes filters */}
        <Stack.Screen
          name="(modals)/recipes-filters"
          options={{
            presentation: 'formSheet',
            headerShown: false,
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: true,
            sheetCornerRadius: 20,
          }}
        />

        {/* Recipes sort */}
        <Stack.Screen
          name="(modals)/recipes-sort"
          options={{
            presentation: 'formSheet',
            headerShown: false,
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: true,
            sheetCornerRadius: 20,
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

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

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
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
