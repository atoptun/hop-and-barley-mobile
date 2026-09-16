import { StoreView } from '@/components/features/store/store-view';
import { router } from 'expo-router';

export default function StoreScreen() {
  const handleFilterPress = () => {
    router.push('/(modals)/filters');
  };

  return <StoreView onFilterPress={handleFilterPress} />;
}
