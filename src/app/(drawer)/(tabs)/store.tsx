import { router } from 'expo-router';

import { StoreView } from '@/components/features/store/store-view';

export default function StoreScreen() {
  const handleFilterPress = () => {
    router.push('/store-filters');
  };

  const handleSortPress = () => {
    router.push('/store-sort');
  };

  return <StoreView onFilterPress={handleFilterPress} onSortPress={handleSortPress} />;
}
