import { CustomDrawerContent } from '@/components/common/custom-drawer';
import { ThemedIcon } from '@/components/ui/themed-icon';
import { useTheme } from '@/context/theme-context';
import { logoutThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/hooks';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Alert } from 'react-native';

export default function DrawerLayout() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await dispatch(logoutThunk()).unwrap();
        },
      },
    ]);
  };
  return (
    <Drawer
      drawerContent={props => (
        <CustomDrawerContent
          onLoginPress={() => {
            router.push('/(auth)/login');
          }}
          onLogouPress={handleLogout}
          {...props}
        />
      )}
      screenOptions={{
        headerShown: false,
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
