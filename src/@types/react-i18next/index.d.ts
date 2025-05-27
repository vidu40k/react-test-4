import 'react-i18next';
import {resources} from '../../utils/i18n';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'main';
    resources: typeof resources['en'];
  }
}
