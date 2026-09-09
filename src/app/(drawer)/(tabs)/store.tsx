import { StoreView } from '@/components/features/store/store-view';
import { router } from 'expo-router';

export default function StoreScreen() {
  const handleProductPress = (productSlug: string) => {
    router.push({ pathname: '/(modals)/product/[slug]', params: { slug: productSlug } });
  };

  const handleFilterPress = () => {
    router.push('/(modals)/filters');
  };

  return <StoreView onProductPress={handleProductPress} onFilterPress={handleFilterPress} />;
}
