import { ThemedText } from '@/components/ui/themed-text';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';

export function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
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
          labelStyle={{ color: '#D32F2F' }}
          onPress={() => {
            // logout
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 10,
  },
  footer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
});
