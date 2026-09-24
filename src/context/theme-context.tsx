import * as SystemUI from 'expo-system-ui';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';

import { ColorKey, Colors, Theme, ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { appSettings } from '@/services/storage/app-settings';

export type { ColorKey, Theme, ThemeColors };

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  colors: Theme;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceScheme = useColorScheme();
  const [themeMode, setModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      const saved = await appSettings.themeMode.get();
      setModeState(saved);
      setIsReady(true);
    }

    void loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setModeState(mode);
    await appSettings.themeMode.set(mode);
  };

  const activeScheme = themeMode === 'system' ? deviceScheme : themeMode;
  const theme: 'light' | 'dark' = activeScheme === 'dark' ? 'dark' : 'light';
  const colors = Colors[theme];
  const isDark = theme === 'dark';

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);

    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
    }
  }, [isDark, colors.background]);

  if (!isReady) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        colors,
        isDark,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { colors: context.colors, isDart: context.isDark };
}

export function useThemeController() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeController must be used within a ThemeProvider');
  }
  return {
    themeMode: context.themeMode,
    isDark: context.isDark,
    setThemeMode: context.setThemeMode,
  };
}
