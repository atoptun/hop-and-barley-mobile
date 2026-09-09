import { CheckoutView } from '@/components/features/cart/checkout-view';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const handleClose = () => {
    router.back();
  };

  const handleContinue = () => {
    router.replace('/(drawer)/(tabs)/store');
  };
  return <CheckoutView onClose={handleClose} onContinue={handleContinue} />;
}
