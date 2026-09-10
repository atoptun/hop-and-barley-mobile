import { ThemeSelector } from '@/components/common/theme-selector';
import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';
import { selectUser } from '@/store/auth/selectors';
import { router } from 'expo-router';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const user = useSelector(selectUser);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <View style={styles.profileHeader}>
        <ThemedText variant="h3">{user?.name || 'Guest'}</ThemedText>
        {user && (
          <ThemedText variant="bodyS" color="textSecondary">
            {user?.email || ''}
          </ThemedText>
        )}
      </View>

      {/* Routes */}
      <View style={styles.routes}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.themeSelector}>
          <ThemeSelector />
        </View>

        {user ? (
          <DrawerItem
            label="Log out"
            labelStyle={{ color: colors.error }}
            onPress={() => {
              // logout
            }}
          />
        ) : (
          <DrawerItem
            label="Log in"
            labelStyle={{ color: colors.primary }}
            onPress={() => {
              router.push('/(auth)/login');
            }}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileHeader: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderSecondary,
      marginBottom: 10,
    },
    login: {
      marginLeft: 20,
    },
    routes: {
      flex: 1,
    },
    footer: {
      marginTop: 'auto',
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
      paddingTop: 12,
      paddingBottom: 8,
    },
    themeSelector: {
      paddingHorizontal: 16,
      marginBottom: 4,
    },
  });
