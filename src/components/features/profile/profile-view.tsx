import { ThemedText } from '@/components/ui/themed-text';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalHeader } from '@/components/common/modal-header';

export interface ProfileViewProps {
  onClose?: VoidFunction;
}

export function ProfileView({ onClose }: ProfileViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ModalHeader title="Profile" onClosePress={onClose} />
      <View style={styles.content}>
        <ThemedText variant="h3">Profile view</ThemedText>
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
    footer: {
      gap: Spacing.four,
      paddingTop: Spacing.three,
      paddingHorizontal: Spacing.six,
      paddingBottom: Math.min(Spacing.six, insets.bottom),
    },
    text: {
      color: colors.textPrimary,
    },
  });
