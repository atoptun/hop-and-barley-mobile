import { StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { ThemeColors } from '@/context/theme-context';
import { ThemedIcon, IconName } from '@/components/ui/themed-icon';

export interface IconButtonProps {
  iconName: IconName;
  iconSize?: number;
  iconColor?: ThemeColors;
  onPress: VoidFunction;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  iconName,
  iconSize = 24,
  iconColor = 'primary',
  onPress,
  style,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={[styles.button, style]}>
      <ThemedIcon name={iconName} size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
