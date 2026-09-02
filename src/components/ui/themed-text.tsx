import { Text, TextProps } from 'react-native';
import { useTheme, ThemeColors } from '@/context/theme-context';
import { Typography, TypographyVariant } from '@/constants/typography';

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
  const colors = useTheme();

  return (
    <Text style={[Typography[variant], { color: colors[color] }, style]} {...props}>
      {children}
    </Text>
  );
}
