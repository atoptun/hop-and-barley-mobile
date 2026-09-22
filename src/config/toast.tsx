import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

import { useTheme } from '@/context/theme-context';

export function useToastConfig(): ToastConfig {
  const { colors } = useTheme();

  return {
    success: props => (
      <BaseToast
        {...props}
        style={[
          styles.toast,
          {
            backgroundColor: colors.successBg,
            borderLeftColor: colors.success,
          },
        ]}
        contentContainerStyle={styles.content}
        text1Style={[styles.text1, { color: colors.textPrimary }]}
        text2Style={[styles.text2, { color: colors.textSecondary }]}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        style={[
          styles.toast,
          {
            backgroundColor: colors.errorBg,
            borderLeftColor: colors.error,
          },
        ]}
        contentContainerStyle={styles.content}
        text1Style={[styles.text1, { color: colors.textPrimary }]}
        text2Style={[styles.text2, { color: colors.textSecondary }]}
      />
    ),
  };
}

const styles = StyleSheet.create({
  toast: {
    width: '90%',
    minHeight: 60,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: '600',
  },
  text2: {
    fontSize: 13,
  },
});
