import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as SecureStore from "expo-secure-store";
import { Colors, Theme, ThemeColors, ColorKey } from "@/constants/theme";

export type { Theme, ThemeColors, ColorKey };

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: "light" | "dark";
  themeMode: ThemeMode;
  colors: Theme;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "settings-theme_mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const deviceScheme = useColorScheme();
  const [themeMode, setModeState] = useState<ThemeMode>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY).then((saved: string | null) => {
      if (saved === "light" || saved === "dark" || saved === "system") {
        setModeState(saved);
      }
      setIsReady(true);
    });
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setModeState(mode);
    await SecureStore.setItemAsync(STORAGE_KEY, mode);
  };

  const activeScheme = themeMode === "system" ? deviceScheme : themeMode;
  const theme: "light" | "dark" = activeScheme === "dark" ? "dark" : "light";
  const colors = Colors[theme];

  if (!isReady) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        colors,
        isDark: theme === "dark",
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.colors;
}

export function useThemeController() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeController must be used within a ThemeProvider");
  }
  return {
    themeMode: context.themeMode,
    isDark: context.isDark,
    setThemeMode: context.setThemeMode,
  };
}
