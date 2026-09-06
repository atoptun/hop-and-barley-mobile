import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';

export interface CartViewProps {}

export function CartView({}: CartViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CartView</Text>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      color: colors.textPrimary,
    },
  });
