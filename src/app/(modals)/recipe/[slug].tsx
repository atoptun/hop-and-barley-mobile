import { router, useLocalSearchParams } from 'expo-router';

import { RecipeDetailView } from '@/components/features/recipes/recipe-detail-view';

export default function RecipeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const handleClose = () => {
    router.back();
  };

  return <RecipeDetailView slug={slug} onClose={handleClose} />;
}
