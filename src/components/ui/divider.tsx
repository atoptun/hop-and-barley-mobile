import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';

export interface DividerProps {
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export function Divider({ marginVertical = 16, style }: DividerProps) {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View
      style={[
        styles.divider,
        {
          marginVertical,
        },
        style,
      ]}
    />
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    divider: {
      height: StyleSheet.hairlineWidth,
      width: '100%',
      backgroundColor: colors.borderSecondary,
    },
  });
