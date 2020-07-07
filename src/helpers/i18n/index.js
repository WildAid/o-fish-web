import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en/translation';

const i18nOptions = {
  interpolation: { escapeValue: false },
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en
    }
  }
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init(i18nOptions);

export default i18next;
