import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedInput } from '@/components/ui/themed-input';
import { useState } from 'react';
import { ThemedIcon } from '../ui/themed-icon';
import { PasswordInput } from '../ui/password-input';

export function InputExamples() {
  const colors = useTheme();
  const styles = createStyles(colors);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [price, setPrice] = useState('150');

  return (
    <View style={styles.container}>
      {/* 1. Empty Placeholder (Default) */}
      <ThemedInput title="Title" placeholder="Placeholder" />
      {/* 2. Currency field  */}
      <ThemedInput
        title="Price"
        unit="€"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {/* 3. Password Input */}
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        supportText="Must be at least 8 characters"
      />
      {/* 4. Password input */}
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        supportText="Must be at least 8 characters"
      />
      {/* 5. Error state */}
      <ThemedInput
        title="Email"
        value="invalid-email"
        errorMessage="Please enter a valid email address"
      />
      {/* 5. Disabled state */}
      <ThemedInput title="Account ID" value="USR-948201" editable={false} />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 12,
      width: '100%',
      backgroundColor: colors.background,
    },
  });
