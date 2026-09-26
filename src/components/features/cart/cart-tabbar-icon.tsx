import { ColorValue, StyleSheet, View } from 'react-native';

import { ThemedIcon } from '@/components/ui/themed-icon';
import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';
import { selectCartItemsCount } from '@/store/cart/cart-selectors';
import { useAppSelector } from '@/store/hooks';

export interface CartTabBarIconProps {
  color: ColorValue;
  focused: boolean;
}

export function CartTabBarIcon({ color, focused }: CartTabBarIconProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const total = useAppSelector(selectCartItemsCount);

  return (
    <View style={styles.container}>
      <ThemedIcon name={focused ? 'cart' : 'cart-outline'} customColor={color} />
      {total > 0 && (
        <View style={styles.number}>
          <ThemedText color="textBlack">{total}</ThemedText>
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
    },
    number: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: -3,
      right: -10,
      minWidth: 20,
      minHeight: 18,
      paddingHorizontal: 3,
      borderRadius: 10,
      backgroundColor: colors.starActive,
    },
  });
