import { StoreView } from '@/components/features/store/store-view';
import { router } from 'expo-router';

export default function StoreScreen() {
  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/(modals)/product/[id]', params: { id: productId } });
  };

  const handleFilterPress = () => {
    router.push('/(modals)/filters');
  };

  return <StoreView onProductPress={handleProductPress} onFilterPress={handleFilterPress} />;
}
