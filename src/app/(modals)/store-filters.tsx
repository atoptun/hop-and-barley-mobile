import { router } from 'expo-router';

import { FiltersView } from '@/components/features/modals/filters-view';

export default function FiltersScreen() {
  const handleClose = () => {
    router.back();
  };

  return <FiltersView onClose={handleClose} />;
}
