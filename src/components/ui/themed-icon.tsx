import { ThemeColors, useTheme } from '@/context/theme-context';
// import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ColorValue } from 'react-native';

// type FeatherIconName = React.ComponentProps<typeof Feather>['name'];
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type IconName = MaterialIconName;

interface ThemedIconProps {
  name: IconName;
  size?: number;
  color?: ThemeColors;
  customColor?: ColorValue;
}

// const mcIcons = ['store'];

export function ThemedIcon({ name, size = 24, color, customColor }: ThemedIconProps) {
  const { colors } = useTheme();
  const iconColor = customColor ?? (color ? colors[color] : colors.textPrimary);

  // if (mcIcons.includes(name)) {
  const iconName = name as MaterialIconName;
  return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
  // }

  // const iconName = name as FeatherIconName;
  // return <Feather name={iconName} size={size} color={iconColor} />;
}
