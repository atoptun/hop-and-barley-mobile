import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href={'/'}>Go to Home screen</Link>
      </View>
    </>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    button: {
      color: colors.textPrimary,
      backgroundColor: colors.errorBg,
    },
  });
