import { ThemedText } from '@/components/ui/themed-text';
import { Theme, useTheme } from '@/context/theme-context';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';

export function CustomDrawerContent(props: any) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <View style={styles.profileHeader}>
        <ThemedText variant="h3">Lucas Scott</ThemedText>
        <ThemedText variant="bodyS" color="textSecondary">
          lucasscott3@email.com
        </ThemedText>
      </View>

      {/* Routes */}
      <DrawerItemList {...props} />

      {/* Footer */}
      <View style={styles.footer}>
        <DrawerItem
          label="Log out"
          labelStyle={{ color: colors.error }}
          onPress={() => {
            // logout
          }}
        />
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
    footer: {
      marginTop: 'auto',
      borderTopWidth: 1,
      borderTopColor: colors.borderSecondary,
      paddingTop: 10,
    },
  });
