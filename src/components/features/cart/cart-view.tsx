import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalHeader } from '@/components/common/modal-header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItemsList, selectCartTotalPrice } from '@/store/cart/cart-selectors';
import { ProductList } from '../catalog/product-list';

export interface CartViewProps {
  onCheckout?: VoidFunction;
  onClose?: VoidFunction;
}

export function CartView({ onCheckout, onClose }: CartViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItemsList);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModalHeader title="Cart" onClosePress={onClose} />
      <View style={styles.content}>
        <ProductList products={cartItems} />
      </View>
      <View style={styles.footer}>
        <View style={styles.total}>
          <ThemedText variant="bodyM" color="textSecondary">
            Total
          </ThemedText>
          <ThemedText variant="h3" color="textPrimary">{`$ ${totalPrice.toFixed(2)}`}</ThemedText>
        </View>
        <ThemedButton title="Checkout" onPress={onCheckout} disabled={cartItems.length === 0} />
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
      // padding: Spacing.six,
    },
    footer: {
      gap: Spacing.four,
      paddingTop: Spacing.three,
      paddingHorizontal: Spacing.six,
      paddingBottom: Math.max(Spacing.six, insets.bottom + Spacing.four),
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
