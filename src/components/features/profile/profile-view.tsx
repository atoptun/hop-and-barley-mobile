import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';

export interface ProfileViewProps {}

export function ProfileView({}: ProfileViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileView</Text>
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
