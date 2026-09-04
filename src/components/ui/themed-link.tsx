import { StyleSheet, TextStyle } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { ThemeColors } from '@/context/theme-context';
import { TypographyVariant } from '@/constants/typography';
import { ThemedText } from '@/components/ui/themed-text';

export interface ThemedLinkProps extends Omit<LinkProps, 'style'> {
  variant?: TypographyVariant;
  color?: ThemeColors;
  style?: TextStyle;
  children: React.ReactNode;
}

export function ThemedLink({
  href,
  variant = 'actionL',
  color = 'primary',
  style,
  children,
  ...props
}: ThemedLinkProps) {
  return (
    <Link href={href} asChild>
      <ThemedText variant={variant} color={color} style={StyleSheet.flatten([styles.link, style])}>
        {children}
      </ThemedText>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    // textAlign: 'center',
  },
});
