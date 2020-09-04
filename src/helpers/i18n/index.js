import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en/translation';
import fr from './fr/translation';

let lang = navigator.language || navigator.userLanguage;

if (!(lang.includes('fr') || lang.includes('es'))) {
  lang = 'en';
}

const i18nOptions = {
  interpolation: { escapeValue: false },
  lng: lang,
  fallbackLng: lang,
  resources: {
    en: {
      translation: en
    },
    fr: {
      translation: fr
    }
  }
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init(i18nOptions);

export default i18next;
