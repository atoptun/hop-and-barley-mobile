import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedButton } from '@/components/ui/themed-button';
import { ProductDetailsCard } from '../catalog/product-details-card';
import { useProductDetails } from '@/hooks/use-product-details';
import { IconButton } from '@/components/ui/icon-button';

export interface ProductDetailsViewProps {
  productId: string;
  onClose: VoidFunction;
}

export function ProductDetailsView({ productId, onClose }: ProductDetailsViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const { product, isLoading, error } = useProductDetails(productId);

  const styles = createStyles(colors, insets);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <ModalHeader title="" onClosePress={onClose} /> */}
      <IconButton
        iconName="close"
        iconColor="primary"
        onPress={onClose}
        style={styles.closeButton}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && <ActivityIndicator />}
        {error && (
          <ThemedText style={styles.error}>
            Something went wrong{'\n'} ({error}).
          </ThemedText>
        )}
        {product && <ProductDetailsCard product={product!} />}
      </ScrollView>
      <View style={styles.actions}>
        <ThemedButton
          title="Add to cart"
          variant="primary"
          disabled={!product}
          iconName={'plus'}
          iconSize={22}
          style={styles.button}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: insets.top,
      position: 'relative',
      backgroundColor: colors.background,
    },
    closeButton: {
      position: 'absolute',
      left: Spacing.six,
      top: insets.top,
      backgroundColor: colors.backgroundSecondary,
      zIndex: 100,
    },
    error: {
      alignSelf: 'center',
      paddingTop: insets.top + Spacing.six,
    },
    content: {
      flex: 1,
      // padding: Spacing.six,
    },
    contentContainer: {
      gap: Spacing.four,
    },
    actions: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: Spacing.six,
      paddingTop: Spacing.three,
      paddingBottom: Math.max(insets.bottom, Spacing.four),
      // gap: 48,
      // borderTopWidth: 1,
      // borderTopColor: colors.borderSecondary ?? '#E2E8F0',
    },
    button: {
      flex: 1,
    },
  });
