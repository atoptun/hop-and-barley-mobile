import { router } from 'expo-router';

import { ProfileView } from '@/components/features/profile/profile-view';

export default function ProfileScreen() {
  const handleClose = () => {
    router.back();
  };

  return <ProfileView onClose={handleClose} />;
}
