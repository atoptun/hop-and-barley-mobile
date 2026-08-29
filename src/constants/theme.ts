/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Palette = {
  // Highlight Light
  green900: '#31572C',
  green800: '#517C4B',
  green600: '#7CA075',
  green300: '#AEC4AC',
  green100: '#E0E6DD',

  // Highlight Dark
  greenDarkBase: '#7EB076',
  greenDarkPressed: '#5C9154',
  greenDarkContainer: '#1B3318',

  // Neutrals Dark
  neutralDark1: '#1A1D1A',
  neutralDark2: '#242824',
  neutralDark3: '#444943',
  neutralDark5: '#A2A6A1',

  // Neutrals Light
  neutralLight1: '#E2E6E1',
  neutralLight2: '#F0F2EF',
  neutralLight3: '#F9FAF8',
  white: '#FFFFFF',

  // Stars
  gold: '#FFC107',
  silver: '#F0F2EF',

  // Statuses
  successDark: '#0E8A5D',
  successLight: '#E0F4E8',
  warningDark: '#E86339',
  warningLight: '#FFF4E4',
  errorDark: '#ED3241',
  errorLight: '#FFE2E5',
} as const;

export const Colors = {
  light: {
    // Primary CTA & Highlights
    primary: Palette.green900,
    primaryPressed: Palette.green800,
    primaryContainer: Palette.green100,

    // Backgrounds & Surfaces
    background: Palette.neutralLight3,
    surface: Palette.white,
    surfaceSecondary: Palette.neutralLight2,
    border: Palette.neutralLight1,

    // Text & Icons
    textPrimary: Palette.neutralDark1,
    textSecondary: Palette.neutralDark3,
    textOnPrimary: Palette.white,
    textDisabled: Palette.neutralDark5,

    // Stars
    starActive: Palette.gold,
    starNotActive: Palette.silver,

    // Statuses
    success: Palette.successDark,
    successBg: Palette.successLight,
    warning: Palette.warningDark,
    warningBg: Palette.warningLight,
    error: Palette.errorDark,
    errorBg: Palette.errorLight,
  },
  dark: {
    // Primary CTA & Highlights
    primary: Palette.greenDarkBase,
    primaryPressed: Palette.greenDarkPressed,
    primaryContainer: Palette.greenDarkContainer,

    // Backgrounds & Surfaces
    background: Palette.neutralDark1,
    surface: Palette.neutralDark2,
    surfaceSecondary: Palette.neutralDark3,
    border: Palette.neutralDark3,

    // Text & Icons
    textPrimary: Palette.neutralLight2,
    textSecondary: Palette.neutralDark5,
    textOnPrimary: Palette.neutralDark1,
    textDisabled: Palette.neutralDark3,

    // Stars
    starActive: Palette.gold,
    starNotActive: Palette.silver,

    // Statuses
    success: Palette.successDark,
    successBg: Palette.neutralDark2,
    warning: Palette.warningDark,
    warningBg: Palette.neutralDark2,
    error: Palette.errorDark,
    errorBg: Palette.neutralDark2,
  },
} as const;

export type Theme = typeof Colors.light | typeof Colors.dark;

export type ThemeColors = keyof typeof Colors.light & keyof typeof Colors.dark;
export type ColorKey = ThemeColors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
