import { View, StyleSheet, StyleProp, TextStyle, ViewProps } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/ui/themed-text';
import { IconButton } from '@/components/ui/icon-button';

export interface HeaderProps extends ViewProps {
  title: string;
  onClosePress?: VoidFunction;
  titleStyle?: StyleProp<TextStyle>;
}

export function ModalHeader({ title, onClosePress, titleStyle, ...props }: HeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { style: viewStyle, ...restViewProps } = props;

  const handleClose = () => {
    if (onClosePress) {
      onClosePress();
    }
  };

  return (
    <View style={[styles.container, viewStyle]} {...restViewProps}>
      <IconButton
        iconName="chevron-left"
        iconColor="primary"
        iconSize={36}
        onPress={handleClose}
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
      // borderBottomWidth: 1,
      // borderBottomColor: colors.borderSecondary,
    },
    closeButton: {
      position: 'absolute',
      left: Spacing.three,
    },
  });
