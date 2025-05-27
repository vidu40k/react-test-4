import 'react-native-gesture-handler';
import {NativeModules, LogBox} from 'react-native';
import store from 'appRedux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {ENV} from 'types/index';
import ErrorBoundary from './src/components/ErrorLayer/ErrorBoundary';
import ErrorScreen from './src/components/ErrorLayer/ErrorScreen';
import AppWithNavigationState from './src/navigation/AppWithNavigationState';

enableScreens();

const persistor = persistStore(store);

export const env: ENV = NativeModules.RNConfig.env;

LogBox.ignoreLogs(['RNConfig']); // Ignore log notification from RNConfig

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <AppWithNavigationState />
        </ErrorBoundary>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
