import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from './config/languages';

import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';
import amTranslations from './locales/am.json';

const getBaseLanguage = (code: string): string => {
  return code.split('-')[0];
};

const getTimezoneRegion = (): string | null => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.startsWith('Asia/Tokyo') || timezone.startsWith('Japan')) {
      return 'ja-JP';
    }
    if (timezone.startsWith('Europe/Berlin') || timezone.startsWith('Europe/Vienna') || timezone.startsWith('Europe/Zurich')) {
      return 'de-DE';
    }
    if (timezone.startsWith('Europe/Paris')) {
      return 'fr-FR';
    }
    if (timezone.startsWith('Europe/London')) {
      return 'en-GB';
    }
    if (timezone.startsWith('Asia/Singapore')) {
      return 'en-SG';
    }
    if (timezone.startsWith('Africa/Addis_Ababa')) {
      return 'am-ET';
    }
  } catch {
    return null;
  }
  return null;
};

const getBrowserLanguage = (): string => {
  const storedLang = localStorage.getItem('terrabt-language');
  if (storedLang) {
    const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === storedLang);
    if (isSupported) {
      return storedLang;
    }
  }
  
  const browserLanguages = navigator.languages || [navigator.language || (navigator as any).userLanguage];
  
  for (const browserLang of browserLanguages) {
    const normalizedBrowserLang = browserLang.toLowerCase();
    
    const exactMatch = SUPPORTED_LANGUAGES.find(
      lang => lang.code.toLowerCase() === normalizedBrowserLang
    );
    if (exactMatch) {
      return exactMatch.code;
    }
    
    const baseLang = getBaseLanguage(normalizedBrowserLang);
    const baseMatch = SUPPORTED_LANGUAGES.find(
      lang => getBaseLanguage(lang.code).toLowerCase() === baseLang
    );
    if (baseMatch) {
      return baseMatch.code;
    }
  }
  
  const timezoneRegion = getTimezoneRegion();
  if (timezoneRegion) {
    const tzMatch = SUPPORTED_LANGUAGES.find(lang => lang.code === timezoneRegion);
    if (tzMatch) {
      return tzMatch.code;
    }
  }
  
  return 'en';
};

const saveBrowserLanguage = (lang: string): void => {
  localStorage.setItem('terrabt-language', lang);
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

export { getBrowserLanguage, getBaseLanguage, saveBrowserLanguage };

const baseTranslations: { [key: string]: any } = {
  'en': enTranslations,
  'ja': jaTranslations,
  'am': amTranslations,
};

const resources: { [key: string]: { translation: any } } = {};

SUPPORTED_LANGUAGES.forEach(lang => {
  const baseLang = getBaseLanguage(lang.code);
  
  if (baseTranslations[lang.code]) {
    resources[lang.code] = { translation: baseTranslations[lang.code] };
  } else if (baseTranslations[baseLang]) {
    resources[lang.code] = { translation: baseTranslations[baseLang] };
  } else {
    resources[lang.code] = { translation: enTranslations };
  }
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromPath(),
    fallbackLng: (code) => {
      const baseLang = getBaseLanguage(code);
      return baseLang !== code ? [baseLang, 'en'] : ['en'];
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
