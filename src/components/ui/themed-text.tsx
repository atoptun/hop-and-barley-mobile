import { Typography, TypographyVariant } from '@/constants/typography';
import { ThemeColors, useTheme } from '@/context/theme-context';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ThemeColors;
}

export function ThemedText({
  variant = 'bodyM',
  color = 'textPrimary',
  style,
  children,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  return (
    <Text style={[Typography[variant], { color: colors[color] }, style]} {...props}>
      {children}
    </Text>
  );
}
