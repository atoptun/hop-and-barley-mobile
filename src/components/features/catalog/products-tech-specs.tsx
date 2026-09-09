import { StyleSheet, Pressable } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedText } from '@/components/ui/themed-text';
import { useState } from 'react';
import { Spacing } from '@/constants/theme';
import { ThemedIcon } from '@/components/ui/themed-icon';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export interface ProductsTechSpecsProps {
  techSpecs: Record<string, string>;
}

export function ProductsTechSpecs({ techSpecs }: ProductsTechSpecsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const progress = useDerivedValue(() => {
    return withTiming(isOpen ? 1 : 0, { duration: 250 });
  }, [isOpen]);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 180}deg` }],
    };
  });

  const rows = Object.entries(techSpecs ?? {});

  if (rows.length === 0) return null;

  return (
    <Animated.View layout={LinearTransition.duration(250)} style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => {
          setIsOpen(prev => !prev);
        }}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <ThemedText variant="h4" color="textPrimary">
          Technical Specifications
        </ThemedText>
        <Animated.View style={iconAnimatedStyle}>
          <ThemedIcon name="chevron-down" color="primary" size={24} />
        </Animated.View>
      </Pressable>
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
          style={styles.content}
        >
          {rows.map(([name, value], index) => (
            <TechSpecRow key={`${name}-${index}`} name={name} value={value} />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
}

interface TechSpecRowProps {
  name: string;
  value: string;
}

function TechSpecRow({ name, value }: TechSpecRowProps) {
  return (
    <ThemedText variant="actionM" color="textPrimary">
      {name}: <ThemedText variant="bodyS">{value}</ThemedText>
    </ThemedText>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.six,
      paddingVertical: Spacing.two,
    },
    content: {
      gap: Spacing.one,
      paddingHorizontal: Spacing.two,
      paddingBottom: Spacing.two,
    },
  });
