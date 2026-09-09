import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme, useThemeController, ThemeMode } from '@/context/theme-context';
import { Theme } from '@/constants/theme';

const MODES: { label: string; value: ThemeMode }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export const ThemeSelector = () => {
  const { themeMode, setThemeMode } = useThemeController();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Appearance</Text>
      <View style={styles.toggleRow}>
        {MODES.map(item => {
          const isSelected = themeMode === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => setThemeMode(item.value)}
              style={[styles.optionButton, isSelected && styles.optionButtonActive]}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginVertical: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 12,
    },
    toggleRow: {
      flexDirection: 'row',
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 8,
      padding: 4,
    },
    optionButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 6,
    },
    optionButtonActive: {
      backgroundColor: colors.primary,
    },
    optionText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    optionTextActive: {
      color: colors.textOnPrimary,
      fontWeight: '600',
    },
  });
