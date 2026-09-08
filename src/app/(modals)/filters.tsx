import { FiltersView } from '@/components/features/modals/filters-view';
import { router } from 'expo-router';

export default function FiltersScreen() {
  const handleClose = () => {
    router.back();
  };

  return <FiltersView onClose={handleClose} />;
}
