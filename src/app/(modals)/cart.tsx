import { CartView } from '@/components/features/cart/cart-view';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/(modals)/checkout');
  };

  const handleClose = () => {
    router.back();
  };

  return <CartView onCheckout={handleCheckout} onClose={handleClose} />;
}
