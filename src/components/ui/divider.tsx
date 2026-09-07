import { Theme, useTheme } from '@/context/theme-context';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface DividerProps {
  marginVertical?: number;
  style?: StyleProp<ViewStyle>;
}

export function Divider({ marginVertical = 16, style }: DividerProps) {
  const { colors } = useTheme();
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
