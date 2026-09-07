import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalHeader } from '../../ui/modal-header';

export interface FiltersViewProps {
  onClose: VoidFunction;
}

export function FiltersView({ onClose }: FiltersViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const styles = createStyles(colors, insets);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModalHeader title="Filters" onClosePress={onClose} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="h1">Filters screen</ThemedText>
      </ScrollView>
      <View style={styles.actions}>
        <ThemedButton
          title="Reset"
          variant="outline"
          style={styles.button}
          onPress={() => {
            console.info('Reset filters');
          }}
        />
        <ThemedButton
          title="Apply"
          variant="primary"
          style={styles.button}
          onPress={() => {
            console.info('Apply filters');
            onClose();
          }}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: Spacing.six,
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
      gap: 48,
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary ?? '#E2E8F0',
    },
    button: {
      flex: 1,
    },
  });
