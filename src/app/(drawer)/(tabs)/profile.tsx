import { ProfileView } from '@/components/features/profile/profile-view';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <ProfileView onClose={handleClose} />;
}
