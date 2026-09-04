import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import { PaginationDots } from '@/components/ui/pagination-dots';
import { ThemedImage } from '@/components/ui/themed-image';
import { OnboardingStep } from '@/types/onboarding';
import { ONBOARDING_STEPS } from '@/data/onboarding-steps';
import { useEffect, useState } from 'react';

export interface OnboardingViewProps {
  onFinish: (isSkip: boolean) => void;
}

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();
  const [curStepIndex, setCurStepIndex] = useState(0);

  const steps = ONBOARDING_STEPS;

  const handleNextPress = () => {
    if (curStepIndex < steps.length - 1) {
      setCurStepIndex(curStepIndex + 1);
      return;
    }
    onFinish(true);
  };

  const handleSkipPress = () => {
    onFinish(false);
  };

  return (
    <View style={[styles.container]}>
      <StatusBar style="inverted" />
      <View style={styles.imageContainer}>
        <ThemedImage source={steps[curStepIndex].image} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <PaginationDots total={steps.length} activeIndex={curStepIndex} />
        <ThemedText variant="h1" color="textPrimary">
          {steps[curStepIndex].title}
        </ThemedText>
        <ThemedText variant="bodyM">{steps[curStepIndex].text}</ThemedText>
        <View style={styles.actionsContainer}>
          <ThemedButton
            title={curStepIndex < steps.length - 1 ? 'Next' : 'Get started'}
            onPress={handleNextPress}
          />
          {curStepIndex < steps.length - 1 && (
            <ThemedButton
              title="Skip for now"
              variant="ghost"
              style={styles.skipButton}
              onPress={handleSkipPress}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: Spacing.three,
      backgroundColor: colors.background,
    },
    imageContainer: {
      flex: 2,
    },
    image: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      gap: Spacing.four,
      padding: Spacing.six,
    },
    actionsContainer: {
      gap: 10,
    },
    text: {
      color: colors.textPrimary,
    },
    skipButton: {
      paddingVertical: 0,
    },
  });
