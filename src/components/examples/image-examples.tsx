import { Theme, useTheme } from '@/context/theme-context';
import { StyleSheet, View } from 'react-native';
import { ThemedImage } from '../ui/themed-image';

export function ImageExamples() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedImage
        source={{
          uri: 'https://cdn.mos.cms.futurecdn.net/8hV3vXffLuCwxsrMpTJNGn-1024-80.jpg.webp',
        }}
        style={styles.image}
        transition={1000}
      />
      <ThemedImage
        source={require('@/assets/images/products/product-1.png')}
        style={styles.image}
        transition={1000}
      />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      gap: 12,
      backgroundColor: colors.background,
    },
    image: {
      // flex: 1,
      width: '100%',
      height: '50%',
    },
  });
