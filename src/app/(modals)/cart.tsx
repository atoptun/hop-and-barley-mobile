import { CartView } from '@/components/features/cart/cart-view';
import { router } from 'expo-router';

export default function CartScreen() {
  const handleCheckout = () => {
    router.push('/(modals)/checkout');
  };

  const handleClose = () => {
    router.back();
  };

  return <CartView onCheckout={handleCheckout} onClose={handleClose} />;
}
