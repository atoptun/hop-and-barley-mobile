import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/common/empty-state';
import { ModalSafeView } from '@/components/common/modal-safe-view';
import { ProductList } from '@/components/features/catalog/product-list';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useCart } from '@/hooks/use-cart';

export function CartView() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { cartItems, totalPrice, checkout } = useCart();

  const handleCheckout = () => {
    if (checkout()) {
      router.push('/(modals)/checkout');
    }
  };

  return (
    <ModalSafeView title="Cart" contentStyle={styles.content}>
      <ProductList
        products={cartItems}
        animatedCards
        ListEmptyComponent={<EmptyState iconName="cart-outline" text="Your cart is empty" />}
      />
      <View style={styles.footer}>
        <View style={styles.total}>
          <ThemedText variant="bodyM" color="textSecondary">
            Total
          </ThemedText>
          <ThemedText variant="h3" color="textPrimary">{`$ ${totalPrice.toFixed(2)}`}</ThemedText>
        </View>
        <ThemedButton title="Checkout" onPress={handleCheckout} disabled={cartItems.length === 0} />
      </View>
    </ModalSafeView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      // paddingHorizontal: Spacing.six,
    },
    footer: {
      gap: Spacing.four,
      paddingTop: Spacing.three,
      paddingHorizontal: Spacing.six,
      paddingBottom: Spacing.four,
    },
    total: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.three,
      paddingVertical: Spacing.two,
    },
  });
