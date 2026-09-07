import { useTheme } from '@/context/theme-context';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ThemedInput, ThemedInputProps } from './themed-input';

export type PasswordInputProps = Omit<
  ThemedInputProps,
  'secureTextEntry' | 'icon' | 'onIconPress' | 'unit'
>;

export function PasswordInput({
  title = 'Password',
  placeholder = 'Enter password',
  ...props
}: PasswordInputProps) {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <ThemedInput
      title={title}
      placeholder={placeholder}
      secureTextEntry={!isPasswordVisible}
      autoCapitalize="none"
      autoCorrect={false}
      icon={
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={20}
          color={colors.borderSecondary}
        />
      }
      onIconPress={toggleVisibility}
      {...props}
    />
  );
}
