import { useState } from 'react';
import { ThemedInput, ThemedInputProps } from '@/components/ui/themed-input';
import { ThemedIcon } from '@/components/ui/themed-icon';

export type PasswordInputProps = Omit<
  ThemedInputProps,
  'secureTextEntry' | 'icon' | 'onIconPress' | 'unit'
>;

export function PasswordInput({
  title = 'Password',
  placeholder = 'Enter password',
  ...props
}: PasswordInputProps) {
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
        <ThemedIcon
          name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="borderSecondary"
        />
      }
      onIconPress={toggleVisibility}
      {...props}
    />
  );
}
