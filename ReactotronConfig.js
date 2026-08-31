import { NativeModules, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

let host = 'localhost';

if (Platform.OS === 'android') {
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    host = scriptURL.split('://')[1].split(':')[0];
  }
}

Reactotron.configure({
  name: 'Hop and Barley',
  host: host || 'localhost',
  port: 9090,
})
  .useReactNative()
  .connect();
