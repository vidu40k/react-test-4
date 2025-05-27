import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import {en, ru} from './locales/';

let lang = 'ru';
const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  lang = locales[0].languageCode;
}

export const resources = {
  en,
  ru,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'ru',
  lng: lang,
  debug: true,
  resources: resources,
  ns: ['main', 'errors'],
  defaultNS: 'main',
});

export default i18n;
