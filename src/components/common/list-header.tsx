import { useNavigation } from 'expo-router';
import { DrawerActions } from 'expo-router/build/react-navigation';
import { StyleSheet, View } from 'react-native';

import { SearchInput } from '@/components/common/search-input';
import { IconButton } from '@/components/ui/icon-button';
import { Spacing } from '@/constants/theme';
import { Theme, useTheme } from '@/context/theme-context';

export interface ListHeaderProps {
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  onFilterPress?: () => void;
  onSortPress?: () => void;
}

export function ListHeader({
  searchQuery = '',
  onSearchChange,
  onFilterPress,
  onSortPress,
}: ListHeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const handleTogleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <IconButton iconName="menu" iconSize={24} onPress={handleTogleDrawer} />
      {onSearchChange && <SearchInput value={searchQuery} onChange={onSearchChange} />}
      {onFilterPress && (
        <IconButton iconName="filter-variant" iconSize={24} onPress={onFilterPress} />
      )}
      {onSortPress && <IconButton iconName="swap-vertical" iconSize={24} onPress={onSortPress} />}
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.three,
      // padding: Spacing.four,
      paddingBottom: Spacing.four,
    },
  });
