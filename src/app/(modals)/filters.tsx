import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function FiltersScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <ThemedText variant="h1">Filters screen</ThemedText>
      <View style={{ flexDirection: 'row' }}>
        <ThemedButton
          title="Reset"
          variant="outline"
          onPress={() => {
            console.info('Reset filters');
          }}
        />
        <ThemedButton
          title="Apply"
          variant="primary"
          onPress={() => {
            console.info('Apply filters');
            router.back();
          }}
        />
      </View>
    </View>
  );
}
