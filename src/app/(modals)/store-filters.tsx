import { router } from 'expo-router';

import { StoreFiltersView } from '@/components/features/store/store-filters-view';

export default function StoreFiltersModal() {
  const handleClose = () => {
    router.back();
  };

  return <StoreFiltersView onClose={handleClose} />;
}
