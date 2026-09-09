import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme, useThemeController, ThemeMode } from '@/context/theme-context';
import { Theme } from '@/constants/theme';
import { ThemedText } from '@/components/ui/themed-text';

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
      <ThemedText variant="actionL" color="textPrimary" style={styles.title}>
        Appearance
      </ThemedText>
      <View style={styles.toggleRow}>
        {MODES.map(item => {
          const isSelected = themeMode === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => setThemeMode(item.value)}
              style={[styles.optionButton, isSelected && styles.optionButtonActive]}
            >
              <ThemedText
                variant={isSelected ? 'actionS' : 'bodyS'}
                color={isSelected ? 'textOnPrimary' : 'textSecondary'}
              >
                {item.label}
              </ThemedText>
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
      paddingVertical: 8,
    },
    title: {
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
  });
