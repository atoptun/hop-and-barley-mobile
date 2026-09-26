import { router } from 'expo-router';
import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { EdgeInsets, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme, useTheme } from '@/context/theme-context';

import { ModalHeader } from './modal-header';

export interface ModalViewProps extends PropsWithChildren {
  title: string;
  onClose?: VoidFunction;
  contentStyle?: StyleProp<ViewStyle>;
}

export function ModalSafeView({ title, onClose, children, contentStyle }: ModalViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <ModalHeader title={title} onClosePress={handleClose} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
  });
