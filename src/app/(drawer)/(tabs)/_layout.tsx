import { router, Tabs } from 'expo-router';

import { CartTabBarIcon } from '@/components/features/cart/cart-tabbar-icon';
import { ThemedIcon } from '@/components/ui/themed-icon';
import { useTheme } from '@/context/theme-context';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      // tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="store"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
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
          headerTransparent: true,

          tabBarIcon: ({ color, focused }) => {
            return <ThemedIcon name={focused ? 'store' : 'store-outline'} customColor={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <ThemedIcon
                name={focused ? 'book-open-variant' : 'book-open-variant-outline'}
                customColor={color}
                size={size}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="cart-tab"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => {
            return <CartTabBarIcon focused={focused} color={color} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            router.push('/(modals)/cart');
          },
        }}
      />
    </Tabs>
  );
}
