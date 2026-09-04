import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function AuthConfirmScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ThemedText variant="h1">Confirm screen</ThemedText>
      <ThemedButton
        title="Comfirm"
        onPress={() => {
          router.replace('/(tabs)/store');
        }}
      />
    </View>
  );
}
