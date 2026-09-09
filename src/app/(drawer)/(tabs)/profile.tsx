import { ProfileView } from '@/components/features/profile/profile-view';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleClose = () => {
    router.back();
  };

  return <ProfileView onClose={handleClose} />;
}
