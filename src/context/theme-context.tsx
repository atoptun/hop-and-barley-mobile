import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SystemUI from 'expo-system-ui';
import { Colors, Theme, ThemeColors, ColorKey } from '@/constants/theme';
import { Platform, StatusBar } from 'react-native';

export type { Theme, ThemeColors, ColorKey };

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  colors: Theme;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = 'settings:theme_mode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceScheme = useColorScheme();
  const [themeMode, setModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!ignore && (saved === 'light' || saved === 'dark' || saved === 'system')) {
          setModeState(saved);
        }
      } catch (error) {
        console.warn('Failed to load theme from storage', error);
      } finally {
        if (!ignore) {
          setIsReady(true);
        }
      }
    }

    loadTheme();

    return () => {
      ignore = true;
    };
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setModeState(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to save theme to storage', error);
    }
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
  return { colors: context.colors };
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
