import { memo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export interface ThemedRadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: VoidFunction;
  description?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ThemedRadioButton = memo(function ThemedRadioButton({
  label,
  selected,
  onSelect,
  description,
  disabled = false,
  style,
}: ThemedRadioButtonProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
      onPress={onSelect}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 },
        style,
      ]}
    >
      <View style={styles.textContainer}>
        <ThemedText
          variant="bodyM"
          color={selected ? 'textPrimary' : 'textSecondary'}
          style={selected ? styles.selectedLabel : undefined}
        >
          {label}
        </ThemedText>

        {description && (
          <ThemedText variant="bodyS" color="textSecondary" style={styles.description}>
            {description}
          </ThemedText>
        )}
      </View>

      <View
        style={[styles.outerCircle, { borderColor: selected ? colors.primary : colors.border }]}
      >
        {selected && <View style={[styles.innerCircle, { backgroundColor: colors.primary }]} />}
      </View>
    </Pressable>
  );
});

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.one,
      gap: Spacing.four,
    },
    textContainer: {
      flex: 1,
    },
    selectedLabel: {
      fontWeight: '600',
    },
    description: {
      marginTop: 2,
    },
    outerCircle: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
  });
