import { memo } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

import { ThemedIcon } from './themed-icon';

export interface SortOptionItemProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SortOptionItem = memo(function SortOptionItem({
  label,
  selected,
  onSelect,
  style,
}: SortOptionItemProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? colors.backgroundSecondary : 'transparent',
        },
        style,
      ]}
    >
      <ThemedText
        variant="bodyM"
        color={selected ? 'primary' : 'textPrimary'}
        style={selected ? styles.selectedLabel : undefined}
      >
        {label}
      </ThemedText>

      {selected && <ThemedIcon name="check" size={20} color="primary" />}
    </Pressable>
  );
});

const createStyles = (_colors: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.two,
      paddingHorizontal: Spacing.three,
      borderRadius: 10,
      // minHeight: 48,
    },
    selectedLabel: {
      fontWeight: '600',
    },
  });
