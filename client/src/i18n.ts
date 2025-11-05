import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from './config/languages';

import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  const langCode = browserLang.split('-')[0];
  const fullLangCode = browserLang;
  
  const exactMatch = SUPPORTED_LANGUAGES.find(lang => lang.code === fullLangCode);
  if (exactMatch) {
    return exactMatch.code;
  }
  
  const partialMatch = SUPPORTED_LANGUAGES.find(lang => lang.code.startsWith(langCode));
  if (partialMatch) {
    return partialMatch.code;
  }
  
  return 'en';
};

const getLanguageFromPath = () => {
  const path = window.location.pathname;
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length > 0) {
    const potentialLang = pathSegments[0];
    const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === potentialLang);
    if (isSupported) {
      return potentialLang;
    }
  }
  
  return getBrowserLanguage();
};

export { getBrowserLanguage };

const resources: { [key: string]: { translation: any } } = {
  en: { translation: enTranslations },
  ja: { translation: jaTranslations },
};

SUPPORTED_LANGUAGES.forEach(lang => {
  if (!resources[lang.code]) {
    resources[lang.code] = { translation: enTranslations };
  }
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromPath(),
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
