import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

let host = 'localhost';

if (Platform.OS === 'android') {
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    host = scriptURL.split('://')[1].split(':')[0];
  }
}

const reactotron = Reactotron.configure({
  name: 'Hop and Barley',
  host: host || 'localhost',
  port: 9090,
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .use(reactotronRedux())
  .connect();

reactotron.onCustomCommand({
  command: 'dumpAsyncStorage',
  handler: async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const data = items.reduce<Record<string, any>>((acc, [key, val]) => {
      try {
        acc[key] = val ? JSON.parse(val) : val;
      } catch {
        acc[key] = val;
      }
      return acc;
    }, {});

    reactotron.display({
      name: 'ASYNC STORAGE DUMP',
      preview: `${keys.length} items`,
      value: data,
      important: true,
    });
  },
  title: 'Show AsyncStorage',
  description: 'Displays all keys and values from AsyncStorage in Timeline',
});

reactotron.onCustomCommand({
  command: 'clearAsyncStorage',
  handler: async () => {
    await AsyncStorage.clear();
    reactotron.display({
      name: 'ASYNC STORAGE',
      preview: 'Cleared',
      value: 'All AsyncStorage keys have been removed',
      important: true,
    });
  },
  title: 'Clear AsyncStorage',
  description: 'Wipes all data from AsyncStorage',
});

if (__DEV__) {
  console.tron = Reactotron;
}

export default reactotron;
