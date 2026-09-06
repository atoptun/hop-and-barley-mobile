import { IconButton } from '@/components/ui/icon-button';
import { SearchInput } from '@/components/ui/search-input';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';
import { useNavigation } from 'expo-router';
import { DrawerActions } from 'expo-router/build/react-navigation';
import { StyleSheet, View } from 'react-native';

export interface StoreHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  onSortPress: () => void;
}

export function StoreHeader({
  searchQuery,
  onSearchChange,
  onFilterPress,
  onSortPress,
}: StoreHeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const handleTogleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <IconButton iconName="menu" iconSize={24} onPress={handleTogleDrawer} />
      <SearchInput value={searchQuery} onChange={onSearchChange} />
      <IconButton iconName="filter-variant" iconSize={24} onPress={onFilterPress} />
      <IconButton iconName="swap-vertical" iconSize={24} onPress={onSortPress} />
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.three,
      padding: Spacing.four,
    },
  });
