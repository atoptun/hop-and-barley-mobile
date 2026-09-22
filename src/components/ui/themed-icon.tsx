import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ColorValue } from 'react-native';

import { ThemeColors, useTheme } from '@/context/theme-context';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type IconName = MaterialIconName;

interface ThemedIconProps {
  name: IconName;
  size?: number;
  color?: ThemeColors;
  customColor?: ColorValue;
}

export function ThemedIcon({ name, size = 24, color, customColor }: ThemedIconProps) {
  const { colors } = useTheme();
  const iconColor = customColor ?? (color ? colors[color] : colors.textPrimary);

  const iconName = name as MaterialIconName;
  return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
}
