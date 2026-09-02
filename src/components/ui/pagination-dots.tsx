import { useTheme } from '@/context/theme-context';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  size?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

export function PaginationDots({
  total,
  activeIndex,
  size = 10,
  gap = 12,
  style,
}: PaginationDotsProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { gap }, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <View
            key={index}
            style={[
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: isActive ? colors.primary : colors.textPrimary,
                opacity: isActive ? 1 : 0.1,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
