import { ProductDetailsView } from '@/components/features/modals/product-details-view';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleClose = () => {
    router.back();
  };

  return <ProductDetailsView productId={id} onClose={handleClose} />;
}
