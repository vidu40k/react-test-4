/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

fetch;

import i18n from './src/utils/i18n';
import {AppDebugger} from 'mobile-app-debugger';
import {isAppDebuggerEnabled} from './src/API';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
  includeFontPadding: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
  includeFontPadding: false,
};

if (isAppDebuggerEnabled) {
  AppDebugger.configure({
    port: 1234,
    isOverwriteConsole: true,
  });
}

AppRegistry.registerComponent(appName, () => App);
