import { router } from 'expo-router';

import { CartView } from '@/components/features/cart/cart-view';

export default function CartScreen() {
  const handleCheckout = () => {
    router.push('/(modals)/checkout');
  };

  const handleClose = () => {
    router.back();
  };

  return <CartView onCheckout={handleCheckout} onClose={handleClose} />;
}
