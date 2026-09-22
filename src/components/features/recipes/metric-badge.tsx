import { ThemedText } from '@/components/ui/themed-text';
import { StyleProp, View, ViewStyle } from 'react-native';

interface MetricBadgeProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export function MetricBadge({ label, value, style }: MetricBadgeProps) {
  return (
    <View style={style}>
      <ThemedText variant="actionM" color="textSecondary">
        {label}
      </ThemedText>
      <ThemedText variant="bodyM" color="textPrimary">
        {value}
      </ThemedText>
    </View>
  );
}
