import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

const getLanguageFromPath = () => {
  const path = window.location.pathname;
  if (path.startsWith('/ja')) {
    return 'ja';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ja: {
        translation: jaTranslations
      }
    },
    lng: getLanguageFromPath(),
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
