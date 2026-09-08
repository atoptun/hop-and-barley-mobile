import { ProductDetailsView } from '@/components/features/modals/product-details-view';
import { useLocalSearchParams, router } from 'expo-router';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleClose = () => {
    router.back();
  };

  return <ProductDetailsView productId={id} onClose={handleClose} />;
}
