import Feather from '@expo/vector-icons/Feather';
import { useTheme, ThemeColors } from '@/context/theme-context';

export type IconName = React.ComponentProps<typeof Feather>['name'];

interface ThemedIconProps {
  name: IconName;
  size?: number;
  color?: ThemeColors;
  customColor?: string;
}

export function ThemedIcon({ name, size = 24, color, customColor }: ThemedIconProps) {
  const colors = useTheme();
  const iconColor = customColor ?? (color ? colors[color] : colors.textPrimary);

  return <Feather name={name} size={size} color={iconColor} />;
}
