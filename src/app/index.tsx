import { useTheme, Theme } from '@/context/theme-context';
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
        {'\n'}
        <Text>Test</Text>
      </Text>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    text: {
      color: colors.textPrimary,
    },
  });
