import { Link, LinkProps } from 'expo-router';
import React, { MouseEvent } from 'react';
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, TextStyle } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { TypographyVariant } from '@/constants/typography';
import { ThemeColors } from '@/context/theme-context';

export type ThemedLinkProps = {
  variant?: TypographyVariant;
  color?: ThemeColors;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress?: (e: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void;
  href?: LinkProps['href'];
} & Omit<LinkProps, 'style' | 'href' | 'onPress'>;

export function ThemedLink({
  href,
  onPress,
  variant = 'actionM',
  color = 'primary',
  style,
  children,
  ...props
}: ThemedLinkProps) {
  const content = (
    <ThemedText variant={variant} color={color} style={StyleSheet.flatten(style)}>
      {children}
    </ThemedText>
  );

  const handlePress = (event: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  if (onPress && !href) {
    return (
      <Pressable onPress={handlePress} hitSlop={8}>
        {content}
      </Pressable>
    );
  }

  if (href) {
    return (
      <Link href={href} onPress={handlePress} asChild {...props}>
        {content}
      </Link>
    );
  }

  return content;
}
