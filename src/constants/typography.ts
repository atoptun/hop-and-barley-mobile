import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
} as const;

export const Typography = {
  // Heading
  h1: {
    fontFamily: FontFamily.extraBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
  },
  h2: {
    fontFamily: FontFamily.extraBold,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  h3: {
    fontFamily: FontFamily.extraBold,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
  },
  h4: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  h5: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },

  // Body Regular
  bodyXl: {
    fontFamily: FontFamily.regular,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
  },
  bodyL: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyM: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodyS: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  bodyXs: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
  },

  // Action
  actionL: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  actionM: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  actionS: {
    fontFamily: FontFamily.semiBold,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
  },

  // Caption
  captionM: {
    fontFamily: FontFamily.semiBold,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600',
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof Typography;
