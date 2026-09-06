import { View, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/ui/themed-text';
import { IconButton } from '@/components/ui/icon-button';

export interface HeaderProps {
  title: string;
  onClosePress: VoidFunction;
  titleStyle?: StyleProp<TextStyle>;
}

export function ModalHeader({ title, onClosePress, titleStyle }: HeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <IconButton
        iconName="chevron-left"
        iconColor="primary"
        iconSize={36}
        onPress={onClosePress}
        style={styles.closeButton}
      />
      <ThemedText variant="h3" color="textPrimary" style={titleStyle}>
        {title}
      </ThemedText>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.five,
      paddingHorizontal: Spacing.four,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSecondary,
    },
    closeButton: {
      position: 'absolute',
      left: Spacing.three,
    },
  });
