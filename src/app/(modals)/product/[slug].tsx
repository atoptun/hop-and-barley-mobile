import { ProductDetailsView } from '@/components/features/catalog/product-details-view';
import { router, useLocalSearchParams } from 'expo-router';

export default function ProductDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const handleClose = () => {
    router.back();
  };

  return <ProductDetailsView slug={slug} onClose={handleClose} />;
}
