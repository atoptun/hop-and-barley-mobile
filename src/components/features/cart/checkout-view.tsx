import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ModalHeader } from '../modals/modal-header';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { Spacing } from '@/constants/theme';

export interface CheckoutViewProps {
  onContinue?: VoidFunction;
  onClose?: VoidFunction;
}

export function CheckoutView({ onClose, onContinue }: CheckoutViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModalHeader title="Checkout" onClosePress={onClose} />
      <View style={styles.content}>
        <ThemedText variant="h3">Checkout view</ThemedText>
      </View>
      <View style={styles.footer}>
        <ThemedButton title="Continue" onPress={onContinue} />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: Spacing.six,
    },
    footer: {
      gap: Spacing.four,
      paddingTop: Spacing.three,
      paddingHorizontal: Spacing.six,
      paddingBottom: Math.min(Spacing.six, insets.bottom),
    },
    text: {
      color: colors.textPrimary,
    },
  });
