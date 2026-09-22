import { router } from 'expo-router';

import { CheckoutView } from '@/components/features/cart/checkout-view';

export default function CheckoutScreen() {
  const handleClose = () => {
    router.back();
  };

  const handleContinue = () => {
    router.replace('/(drawer)/(tabs)/store');
  };
  return <CheckoutView onClose={handleClose} onContinue={handleContinue} />;
}
