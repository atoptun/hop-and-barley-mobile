import { FiltersView } from '@/components/features/modals/filters-view';
import { useRouter } from 'expo-router';

export default function FiltersScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <FiltersView onClose={handleClose} />;
}
