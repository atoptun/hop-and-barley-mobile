import { StoreView } from '@/components/features/store/store-view';
import { useRouter } from 'expo-router';

export default function StoreScreen() {
  const router = useRouter();

  const handleProductPress = (productId: string) => {
    router.push({ pathname: '/(modals)/product/[id]', params: { id: productId } });
  };

  const handleFilterPress = () => {
    router.push('/(modals)/filters');
  };

  return <StoreView onProductPress={handleProductPress} onFilterPress={handleFilterPress} />;
}
