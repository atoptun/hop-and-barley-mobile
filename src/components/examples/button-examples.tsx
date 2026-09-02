import { View, StyleSheet } from 'react-native';
import { useTheme, Theme } from '@/context/theme-context';
import { ThemedButton } from '@/components/ui/themed-button';

export function ButtonExamples() {
  const colors = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <ThemedButton title="Primary" variant="primary" />
        <ThemedButton title="Outline" variant="outline" />
        <ThemedButton title="Ghost" variant="ghost" />
      </View>

      <View style={styles.rowContainer}>
        <ThemedButton
          title="Primary fullwidth"
          variant="primary"
          fullWidth
          onPress={() => {
            console.info('Press Primary fullwidth');
          }}
          onLongPress={() => {
            console.info('Long press Primary fullwidth');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Outline fullwidth"
          variant="outline"
          fullWidth
          onPress={() => {
            console.info('Press Outline fullwidth');
          }}
          onLongPress={() => {
            console.info('Long press Outline fullwidth');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Ghost fullwidth"
          variant="ghost"
          fullWidth
          onPress={() => {
            console.info('Press Ghost fullwidth');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Primary fullwidth"
          variant="primary"
          loading
          fullWidth
          onPress={() => {
            console.info('Press loading');
          }}
        />
        <ThemedButton
          title="Primary disabled"
          variant="primary"
          disabled
          fullWidth
          onPress={() => {
            console.info('Press disabled');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Outline loading"
          variant="outline"
          loading
          fullWidth
          onPress={() => {
            console.info('Press loading');
          }}
        />
        <ThemedButton
          title="Outline disabled"
          variant="outline"
          disabled
          fullWidth
          onPress={() => {
            console.info('Press disabled');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Ghost loading"
          variant="ghost"
          loading
          fullWidth
          onPress={() => {
            console.info('Press loading');
          }}
        />
        <ThemedButton
          title="Ghost disabled"
          variant="ghost"
          disabled
          fullWidth
          onPress={() => {
            console.info('Press disabled');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton title="Reset" variant="outline" fullWidth onPress={() => {}} />
        <ThemedButton title="Apply" variant="primary" fullWidth onPress={() => {}} />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Outline Icon"
          variant="outline"
          fullWidth
          iconName="plus"
          iconPosition="left"
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
        <ThemedButton
          title="Primary Icon"
          variant="primary"
          fullWidth
          iconName="plus"
          iconPosition="left"
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Outline Icon"
          variant="outline"
          fullWidth
          iconName="plus"
          iconPosition="right"
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
        <ThemedButton
          title="Primary Icon"
          variant="primary"
          fullWidth
          iconName="plus"
          iconPosition="right"
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
      </View>
      <View style={styles.rowContainer}>
        <ThemedButton
          title="Outline Icon"
          variant="outline"
          fullWidth
          disabled
          iconName="shopping-cart"
          iconPosition="left"
          iconSize={20}
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
        <ThemedButton
          title="Primary Icon"
          variant="primary"
          fullWidth
          disabled
          iconName="shopping-cart"
          iconPosition="left"
          iconSize={20}
          onPress={() => {
            console.info('Pressed Icon button ');
          }}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: Theme) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: colors.textPrimary,
    },
    button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: colors.warning,
    },
  });
