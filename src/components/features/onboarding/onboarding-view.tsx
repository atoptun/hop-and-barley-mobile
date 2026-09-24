import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
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

export interface OnboardingViewProps {
  onFinish: VoidFunction;
}

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const styles = createStyles(colors, insets, isLandscape, width, height);

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
    <View style={styles.container}>
      <StatusBar style="auto" />

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
            <View style={styles.imagePane}>
              <ThemedImage
                source={item.image}
                transition={300}
                style={styles.image}
                contentFit="cover"
              />
            </View>

            <View style={styles.contentPane}>
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <ThemedText variant="h1" color="textPrimary">
                  {item.title}
                </ThemedText>
                <ThemedText variant="bodyM" color="textSecondary">
                  {item.text}
                </ThemedText>
              </ScrollView>
            </View>
          </View>
        )}
      />

      <Pagination
        count={steps.length}
        progress={progress}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        activeDotStyle={styles.dotActive}
        onPress={index => carouselRef.current?.scrollTo({ index })}
        getItemAccessibilityLabel={(index, count) => `Featured item ${index + 1} of ${count}`}
      />

      <View style={styles.actions}>
        <ThemedButton title={isLastStep ? 'Get started' : 'Next'} onPress={handleNextPress} />
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

const createStyles = (
  colors: Theme,
  insets: EdgeInsets,
  isLandscape: boolean,
  windowWidth: number,
  windowHeight: number
) => {
  const portraitImageHeight = Math.round(windowHeight * 0.6);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      position: 'relative',
    },
    carousel: {
      flex: 1,
    },
    slide: {
      flex: 1,
      flexDirection: isLandscape ? 'row' : 'column',
    },

    imagePane: {
      width: isLandscape ? '50%' : '100%',
      height: isLandscape ? '100%' : portraitImageHeight,
    },
    image: {
      width: '100%',
      height: '100%',
    },

    contentPane: isLandscape
      ? {
          flex: 1,
          width: '50%',
          paddingLeft: Spacing.four,
          paddingRight: Math.max(Spacing.six, insets.right),
          paddingTop: Math.max(Spacing.four, insets.top),
        }
      : {
          flex: 1,
          width: '100%',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: Spacing.eight,
        },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      gap: Spacing.four,
      paddingHorizontal: Spacing.six,
      paddingBottom: isLandscape ? 120 : 140,
    },

    dotsContainer: isLandscape
      ? {
          position: 'absolute',
          left: 0,
          width: '50%',
          bottom: Math.max(Spacing.four, insets.bottom + Spacing.two),
          gap: 12,
          justifyContent: 'center',
          zIndex: 10,
        }
      : {
          position: 'absolute',
          left: 0,
          right: 0,
          top: portraitImageHeight,
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

    actions: isLandscape
      ? {
          position: 'absolute',
          right: Math.max(Spacing.six, insets.right),
          bottom: Math.max(Spacing.four, insets.bottom),
          width: Math.round(windowWidth * 0.5) - Math.max(Spacing.six, insets.right) - Spacing.four,
          gap: 8,
          zIndex: 10,
        }
      : {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: Spacing.six,
          paddingTop: Spacing.two,
          paddingBottom: Math.max(Spacing.six, insets.bottom + Spacing.four),
          gap: 10,
          zIndex: 10,
        },
    skipWrapper: {
      height: 20,
      justifyContent: 'center',
    },
    skipButton: {
      textAlign: 'center',
    },
  });
};
