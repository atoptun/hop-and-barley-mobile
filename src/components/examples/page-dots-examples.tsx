import { PaginationDots } from '@/components/ui/pagination-dots';
import { Theme, useTheme } from '@/context/theme-context';
import { StyleSheet, View } from 'react-native';

export function PageDotsExamples() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Pagination Dots Examples</Text> */}
      <PaginationDots total={5} activeIndex={0} />
      <PaginationDots total={5} activeIndex={1} />
      <PaginationDots total={5} activeIndex={2} />
      <PaginationDots total={5} activeIndex={3} />
      <PaginationDots total={5} activeIndex={4} />

      <PaginationDots total={5} activeIndex={0} size={15} />
      <PaginationDots total={5} activeIndex={1} size={15} />
      <PaginationDots total={5} activeIndex={2} size={15} />
      <PaginationDots total={5} activeIndex={3} size={15} />
      <PaginationDots total={5} activeIndex={4} size={15} />

      <PaginationDots total={5} activeIndex={0} size={15} gap={20} />
      <PaginationDots total={5} activeIndex={1} size={15} gap={20} />
      <PaginationDots total={5} activeIndex={2} size={15} gap={20} />
      <PaginationDots total={5} activeIndex={3} size={15} gap={20} />
      <PaginationDots total={5} activeIndex={4} size={15} gap={20} />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 12,
    },
    text: {
      color: colors.textPrimary,
    },
  });
