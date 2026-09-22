import { ImageSource } from 'expo-image';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Carousel, CarouselRef, Pagination } from 'react-native-reanimated-carousel';

import { Theme, useTheme } from '@/context/theme-context';

import { ThemedImage } from '../ui/themed-image';

export interface ImageGalleryProps {
  images: (string | number | ImageSource)[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const ref = useRef<CarouselRef>(null);
  const progress = useSharedValue(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        progress={progress}
        style={styles.carousel}
        data={images}
        renderItem={({ item }) => (
          <ThemedImage
            source={typeof item === 'string' ? { uri: item } : item}
            style={styles.image}
          />
        )}
      />

      <Pagination
        count={images.length}
        progress={progress}
        containerStyle={{ gap: 8, justifyContent: 'center', marginTop: 12 }}
        dotStyle={{ width: 8, height: 8, backgroundColor: colors.backgroundSecondary }}
        activeDotStyle={{ width: 20, backgroundColor: colors.primaryPressed }}
        onPress={index => ref.current?.scrollTo({ index })}
        getItemAccessibilityLabel={(index, count) => `Featured item ${index + 1} of ${count}`}
      />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    carousel: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
  });
