import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedRadioButton } from '@/components/ui/themed-radio-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useRecipesFilters } from '@/hooks/use-recipes-filters';
import { Difficulty } from '@/types/recipe';

const DIFFICULTY_OPTIONS: { label: string; value: Difficulty | undefined }[] = [
  { label: 'All Difficulties', value: undefined },
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

export function RecipesFiltersView() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { difficulty, setDifficulty, resetFilters } = useRecipesFilters();

  const [draft, setDraft] = useState<Difficulty | undefined>(difficulty);

  const handleApply = () => {
    setDifficulty(draft);
    router.back();
  };

  const handleReset = () => {
    resetFilters();
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsList}>
          <ThemedText variant="h3" style={styles.sectionTitle}>
            Difficulty
          </ThemedText>
          {DIFFICULTY_OPTIONS.map(option => (
            <ThemedRadioButton
              key={option.label}
              label={option.label}
              selected={draft === option.value}
              onSelect={() => setDraft(option.value)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <ThemedButton title="Reset" variant="outline" style={styles.button} onPress={handleReset} />
        <ThemedButton title="Apply" variant="primary" style={styles.button} onPress={handleApply} />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Spacing.six,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: Spacing.six,
    },
    contentContainer: {
      gap: Spacing.four,
    },
    sectionTitle: {
      marginBottom: Spacing.two,
    },
    optionsList: {
      gap: Spacing.two,
    },
    actions: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.three,
      paddingBottom: Math.max(insets.bottom + Spacing.four, Spacing.four),
      gap: 48,
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
    },
    button: {
      flex: 1,
    },
  });
