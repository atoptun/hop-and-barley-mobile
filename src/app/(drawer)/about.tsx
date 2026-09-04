import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';

export interface AboutScreenProps {}

export default function AboutScreen({}: AboutScreenProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>AboutScreen</Text>
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
