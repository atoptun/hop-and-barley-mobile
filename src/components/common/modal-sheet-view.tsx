import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

import { ThemedText } from '../ui/themed-text';

export interface ModalSheetViewProps extends PropsWithChildren {
  title?: string;
}

export function ModalSheetView({ title, children }: ModalSheetViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets, !!title);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.grabber} />
        {title && <ThemedText variant="h3">{title}</ThemedText>}
      </View>
      {children}
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets, hasTitle: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.two,
      paddingBottom: Math.max(insets.bottom + Spacing.four, Spacing.four),
    },
    header: {
      alignItems: 'center',
      paddingBottom: hasTitle ? Spacing.four : 0,
      borderBottomWidth: hasTitle ? 1 : 0,
      borderBottomColor: colors.borderSecondary,
      gap: Spacing.two,
    },
    grabber: {
      width: 60,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.borderSecondary,
    },
  });
