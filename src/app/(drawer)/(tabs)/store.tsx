import { router } from 'expo-router';

import { StoreView } from '@/components/features/catalog/store-view';

export default function StoreScreen() {
  const handleFilterPress = () => {
    router.push('/(modals)/filters');
  };

  return <StoreView onFilterPress={handleFilterPress} />;
}
