import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ButtonExamples } from '@/components/examples/button-examples';
import { TextExamples } from '@/components/examples/text-examples';
import { PageDotsExamples } from '@/components/examples/page-dots-examples';
import { LinkExamples } from '@/components/examples/link-examples';
import { InputExamples } from '@/components/examples/input-examples';
import { ImageExamples } from '@/components/examples/image-examples';
import { ProductListExamples } from '@/components/examples/product-list-examples';

export default function IndexScreen() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* <TextExamples /> */}
        {/* <ButtonExamples /> */}
        {/* <PageDotsExamples /> */}
        {/* <LinkExamples /> */}
        {/* <InputExamples /> */}
        {/* <ImageExamples /> */}
        <ProductListExamples />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
      padding: 24,
    },
  });
