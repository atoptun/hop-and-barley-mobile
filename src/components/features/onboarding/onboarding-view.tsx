import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Carousel, CarouselRef, Pagination } from 'react-native-reanimated-carousel';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { runOnJS } from 'react-native-worklets';

import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedImage } from '@/components/ui/themed-image';
import { ThemedLink } from '@/components/ui/themed-link';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { ONBOARDING_STEPS } from '@/data/onboarding-steps';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = Math.round(SCREEN_HEIGHT * 0.6);

export interface OnboardingViewProps {
  onFinish: VoidFunction;
}

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const [curStepIndex, setCurStepIndex] = useState(0);
  const progress = useSharedValue<number>(0);
  const carouselRef = useRef<CarouselRef>(null);
  const hasFinishedRef = useRef(false);
  const isLastStepShared = useSharedValue<boolean>(false);

  const steps = ONBOARDING_STEPS;
  const isLastStep = curStepIndex === steps.length - 1;

  useEffect(() => {
    isLastStepShared.value = curStepIndex === steps.length - 1;
  }, [curStepIndex, steps.length, isLastStepShared]);

  const triggerFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    onFinish();
  };

  const handleNextPress = () => {
    if (!isLastStep) {
      carouselRef.current?.next();
      return;
    }
    triggerFinish();
  };

  const handleSkipPress = () => {
    triggerFinish();
  };

  return (
    <View style={[styles.container]}>
      <StatusBar style="auto" />
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          loop={false}
          data={steps}
          overscrollEnabled={true}
          progress={progress}
          style={styles.carousel}

          onConfigurePanGesture={gesture => {
            'worklet';
            gesture.onEnd(e => {
              'worklet';
              // finish after last step
              if (isLastStepShared.value && e.translationX < -100) {
                runOnJS(triggerFinish)();
              }
            });
          }}

          onSnapToItem={index => {
            setCurStepIndex(index);
          }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <ThemedImage source={item.image} transition={300} style={styles.image} />
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <ThemedText variant="h1" color="textPrimary">
                  {item.title}
                </ThemedText>
                <ThemedText variant="bodyM">{item.text}</ThemedText>
              </ScrollView>
            </View>
          )}
        />

        <Pagination
          count={steps.length}
          progress={progress}
          containerStyle={[styles.dotsContainer, { top: IMAGE_HEIGHT }]}
          dotStyle={styles.dot}
          activeDotStyle={styles.dotActive}
          onPress={index => carouselRef.current?.scrollTo({ index })}
          getItemAccessibilityLabel={(index, count) => `Featured item ${index + 1} of ${count}`}
        />
      </View>

      <View style={styles.actions}>
        <ThemedButton
          title={curStepIndex < steps.length - 1 ? 'Next' : 'Get started'}
          onPress={handleNextPress}
        />
        <View style={styles.skipWrapper}>
          {!isLastStep && (
            <ThemedLink onPress={handleSkipPress} style={styles.skipButton}>
              Skip for now
            </ThemedLink>
          )}
        </View>
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
    carouselContainer: {
      position: 'relative',
      flex: 1,
    },
    carousel: {
      flex: 1,
    },
    slide: {
      flex: 1,
    },
    image: {
      // flex: 1,
      width: '100%',
      height: IMAGE_HEIGHT,
    },
    dotsContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      gap: 16,
      justifyContent: 'center',
      paddingVertical: Spacing.two,
      zIndex: 10,
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: colors.backgroundSecondary,
    },
    dotActive: {
      width: 20,
      backgroundColor: colors.primaryPressed,
    },
    scrollContainer: {
      flex: 1,
      paddingTop: Spacing.eight,
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
    skipWrapper: {
      height: 20,
    },
    skipButton: {
      textAlign: 'center',
    },
  });
