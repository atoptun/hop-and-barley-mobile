import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';

export default function OrdersScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedText variant="h1">OrdersScreen</ThemedText>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
