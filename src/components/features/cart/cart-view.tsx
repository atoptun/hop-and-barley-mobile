import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalHeader } from '@/components/common/modal-header';

export interface CartViewProps {
  onCheckout?: VoidFunction;
  onClose?: VoidFunction;
}

export function CartView({ onCheckout, onClose }: CartViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const totalPrice = 40;
  const isCartEmpty = false;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModalHeader title="Cart" onClosePress={onClose} />
      <View style={styles.content}>
        <ThemedText variant="h3">CartView</ThemedText>
      </View>
      <View style={styles.footer}>
        <View style={styles.total}>
          <ThemedText variant="bodyM" color="textSecondary">
            Total
          </ThemedText>
          <ThemedText variant="h3" color="textPrimary">{`$ ${totalPrice.toFixed(2)}`}</ThemedText>
        </View>
        <ThemedButton title="Checkout" onPress={onCheckout} disabled={isCartEmpty} />
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
    total: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.two,
    },
    text: {
      color: colors.textPrimary,
    },
  });
