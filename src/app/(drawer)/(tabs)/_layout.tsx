import { ThemedIcon } from '@/components/ui/themed-icon';
import { useTheme } from '@/context/theme-context';
import { Tabs, router } from 'expo-router';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      initialRouteName="store"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background, // або colors.backgroundSecondary
          borderTopColor: colors.borderSecondary ?? '#2C2C2E',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, focused }) => {
            return <ThemedIcon name={focused ? 'store' : 'store-outline'} customColor={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="cart-tab"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => {
            return <ThemedIcon name={focused ? 'cart' : 'cart-outline'} customColor={color} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            router.push('/(modals)/cart');
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            return (
              <ThemedIcon name={focused ? 'account' : 'account-outline'} customColor={color} />
            );
          },
        }}
      />
    </Tabs>
  );
}
