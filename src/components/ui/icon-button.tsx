import { StyleSheet, Pressable } from 'react-native';
import { ThemeColors } from '@/context/theme-context';
import { ThemedIcon, IconName } from '@/components/ui/themed-icon';

export interface IconButtonProps {
  iconName: IconName;
  iconSize?: number;
  iconColor?: ThemeColors;
  onPress: VoidFunction;
}

export function IconButton({
  iconName,
  iconSize = 22,
  iconColor = 'primary',
  onPress,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.button}>
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
