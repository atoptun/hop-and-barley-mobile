import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EdgeInsets,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export interface SafeKeyboardViewProps {
  children: ReactNode;
  useSafeArea?: boolean;
  statusBarStyle?: StatusBarStyle;

  safeAreaProps?: SafeAreaViewProps & ViewProps;
  keyboardViewProps?: KeyboardAvoidingViewProps;
  scrollContainerProps?: ScrollViewProps;

  scrollContentStyles?: StyleProp<ViewStyle>;
}

export function SafeKeyboardView({
  children,
  useSafeArea = true,
  statusBarStyle = 'auto',

  safeAreaProps,
  keyboardViewProps,
  scrollContainerProps,

  scrollContentStyles,
}: SafeKeyboardViewProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets);

  const { style: safeAreaStyles, ...restSafeAreaProps } = safeAreaProps || {};
  const { style: keyboardViewStyles, ...restKeyboardProps } = keyboardViewProps || {};
  const {
    style: scrollContainerStyles,
    contentContainerStyle: scrollContentCustomStyle,
    ...restScrollProps
  } = scrollContainerProps || {};

  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container {...restSafeAreaProps} style={[styles.safeArea, safeAreaStyles]}>
      <StatusBar style={statusBarStyle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        {...restKeyboardProps}
        style={[styles.keyboardView, keyboardViewStyles]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...restScrollProps}
          style={[styles.scrollContainer, scrollContainerStyles]}
          contentContainerStyle={[
            styles.scrollContent,
            styles.bottom,
            scrollContentCustomStyle,
            scrollContentStyles,
          ]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const createStyles = (colors: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
      paddingBottom: Spacing.four,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: Spacing.six,
    },
    bottom: {
      paddingBottom: Math.max(Spacing.six, insets.bottom + Spacing.four),
    },
  });
