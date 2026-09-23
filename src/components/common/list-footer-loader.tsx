import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@/context/theme-context';

interface ListFooterLoaderProps {
  size?: number | 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

export function ListFooterLoader({ size = 'small', style }: ListFooterLoaderProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
