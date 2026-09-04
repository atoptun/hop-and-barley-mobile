import { ThemedText } from '@/components/ui/themed-text';
import { useRoute, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function ProductDetailsScreen() {
  const route = useRoute();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ThemedText variant="h1">Product screen</ThemedText>
    </View>
  );
}
