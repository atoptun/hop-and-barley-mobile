import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ModalSafeView } from '@/components/common/modal-safe-view';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useCart } from '@/hooks/use-cart';

export function CheckoutView() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { totalPrice, finishCheckout } = useCart();

  const handleCheckout = () => {
    if (finishCheckout()) {
      router.replace('/(drawer)/(tabs)/store');
    }
  };

  return (
    <ModalSafeView title="Checkout" contentStyle={styles.content}>
      <View style={styles.content}>
        <ThemedText variant="bodyM">All product will be removed from cart</ThemedText>
      </View>
      <View style={styles.total}>
        <ThemedText variant="bodyM" color="textSecondary">
          Total
        </ThemedText>
        <ThemedText variant="h3" color="textPrimary">{`$ ${totalPrice.toFixed(2)}`}</ThemedText>
      </View>
      <View style={styles.footer}>
        <ThemedButton title="Continue" onPress={handleCheckout} />
      </View>
    </ModalSafeView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: Spacing.six,
    },
    total: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.two,
    },
    footer: {
      gap: Spacing.four,
      paddingTop: Spacing.three,
      // paddingHorizontal: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });
