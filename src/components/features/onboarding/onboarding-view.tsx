import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import { PaginationDots } from '@/components/ui/pagination-dots';
import { ThemedImage } from '@/components/ui/themed-image';
import { ONBOARDING_STEPS } from '@/data/onboarding-steps';
import { useState } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = Math.round(SCREEN_HEIGHT * 0.5);

export interface OnboardingViewProps {
  onFinish: (isSkip: boolean) => void;
}

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);
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
      {/* <View style={styles.imageContainer}>
      </View> */}
      <ThemedImage source={steps[curStepIndex].image} transition={300} style={styles.image} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PaginationDots total={steps.length} activeIndex={curStepIndex} />
        <ThemedText variant="h1" color="textPrimary">
          {steps[curStepIndex].title}
        </ThemedText>
        <ThemedText variant="bodyM">{steps[curStepIndex].text}</ThemedText>
      </ScrollView>
      <View style={styles.actions}>
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
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    imageContainer: {
      // flex: 2,
      height: IMAGE_HEIGHT,
    },
    image: {
      // flex: 1,
      width: '100%',
      height: IMAGE_HEIGHT,
    },
    scrollContainer: {
      flex: 1,
      paddingTop: Spacing.six,
    },
    scrollContent: {
      flexGrow: 1,
      gap: Spacing.four,
      paddingHorizontal: Spacing.six,
      paddingBottom: Spacing.six,
    },
    actions: {
      gap: 10,
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.four,
      paddingBottom: Math.max(Spacing.six, insets.bottom + Spacing.four),
    },
    skipButton: {
      paddingVertical: 0,
    },
  });
