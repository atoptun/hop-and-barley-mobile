import { CustomDrawerContent } from '@/components/features/drawer/custom-drawer';
import { ThemedIcon } from '@/components/ui/themed-icon';
import { useTheme } from '@/context/theme-context';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Shop $ Catalog',
          title: 'Store',
          drawerIcon: ({ color, size }) => (
            <ThemedIcon name="shopping-outline" size={size} customColor={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: 'My orders',
          title: 'Orders',
          drawerIcon: ({ color, size }) => (
            <ThemedIcon name="package-variant-closed-check" size={size} customColor={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'About us',
          title: 'About us',
          drawerIcon: ({ color, size }) => (
            <ThemedIcon name="information-outline" size={size} customColor={color} />
          ),
        }}
      />
    </Drawer>
  );
}
