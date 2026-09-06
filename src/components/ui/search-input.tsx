import { Theme, useTheme } from '@/context/theme-context';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedIcon } from './themed-icon';

export interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ThemedIcon name="magnify" size={24} color="textPrimary" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input]}
        returnKeyType="search"
      />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // height: 44,
      borderRadius: 22,
      paddingHorizontal: 14,
    },
    searchIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: 16,
      paddingVertical: 0,
      color: colors.textPrimary,
    },
  });
