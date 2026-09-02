import { useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedIcon } from '@/components/ui/themed-icon';

export interface ThemedImageProps extends Omit<ImageProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  showLoader?: boolean;
  borderRadius?: number;
}

const DEFAULT_BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export function ThemedImage({
  source,
  style,
  showLoader = false,
  borderRadius = 0,
  contentFit = 'cover',
  placeholder = DEFAULT_BLURHASH,
  transition = 1000,
  ...props
}: ThemedImageProps) {
  const colors = useTheme();
  const styles = createStyles(colors);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius,
          backgroundColor: colors.backgroundSecondary,
        },
        style,
      ]}
    >
      {!hasError && (
        <Image
          source={source}
          contentFit={contentFit}
          transition={transition}
          placeholder={placeholder}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
          {...props}
        />
      )}

      {loading && showLoader && !hasError && (
        <View style={styles.centerOverlay}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}

      {hasError && (
        <View style={styles.centerOverlay}>
          <ThemedIcon name="image" size={24} color="textSecondary" />
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      position: 'relative',
    },
    centerOverlay: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
