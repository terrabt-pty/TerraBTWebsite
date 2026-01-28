import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from './config/languages';

import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';
import amTranslations from './locales/am.json';
import deTranslations from './locales/de.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import nlTranslations from './locales/nl.json';
import ptTranslations from './locales/pt.json';
import svTranslations from './locales/sv.json';
import daTranslations from './locales/da.json';
import nbTranslations from './locales/nb.json';
import fiTranslations from './locales/fi.json';
import plTranslations from './locales/pl.json';
import csTranslations from './locales/cs.json';
import huTranslations from './locales/hu.json';
import roTranslations from './locales/ro.json';
import skTranslations from './locales/sk.json';
import slTranslations from './locales/sl.json';
import hrTranslations from './locales/hr.json';
import bgTranslations from './locales/bg.json';
import ukTranslations from './locales/uk.json';
import ruTranslations from './locales/ru.json';
import ltTranslations from './locales/lt.json';
import lvTranslations from './locales/lv.json';
import etTranslations from './locales/et.json';
import elTranslations from './locales/el.json';
import trTranslations from './locales/tr.json';
import zhTranslations from './locales/zh.json';
import koTranslations from './locales/ko.json';
import arTranslations from './locales/ar.json';
import heTranslations from './locales/he.json';

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
  // Check localStorage first for user preference
  const storedLang = localStorage.getItem('terrabt-language');
  if (storedLang) {
    const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === storedLang);
    if (isSupported) {
      return storedLang;
    }
  }
  
  // Get browser languages
  const browserLanguages = navigator.languages || [navigator.language || (navigator as any).userLanguage];
  
  for (const browserLang of browserLanguages) {
    const normalizedBrowserLang = browserLang.toLowerCase();
    
    // First try exact match
    const exactMatch = SUPPORTED_LANGUAGES.find(
      lang => lang.code.toLowerCase() === normalizedBrowserLang
    );
    if (exactMatch) {
      return exactMatch.code;
    }
    
    // Then try base language match - but prefer English variants for 'en' base
    const baseLang = getBaseLanguage(normalizedBrowserLang);
    
    // For English, always return 'en' (international) as the default
    if (baseLang === 'en') {
      return 'en';
    }
    
    const baseMatch = SUPPORTED_LANGUAGES.find(
      lang => getBaseLanguage(lang.code).toLowerCase() === baseLang
    );
    if (baseMatch) {
      return baseMatch.code;
    }
  }
  
  // Check timezone as fallback
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
  'de': deTranslations,
  'fr': frTranslations,
  'es': esTranslations,
  'it': itTranslations,
  'nl': nlTranslations,
  'pt': ptTranslations,
  'sv': svTranslations,
  'da': daTranslations,
  'nb': nbTranslations,
  'fi': fiTranslations,
  'pl': plTranslations,
  'cs': csTranslations,
  'hu': huTranslations,
  'ro': roTranslations,
  'sk': skTranslations,
  'sl': slTranslations,
  'hr': hrTranslations,
  'bg': bgTranslations,
  'uk': ukTranslations,
  'ru': ruTranslations,
  'lt': ltTranslations,
  'lv': lvTranslations,
  'et': etTranslations,
  'el': elTranslations,
  'tr': trTranslations,
  'zh': zhTranslations,
  'ko': koTranslations,
  'ar': arTranslations,
  'he': heTranslations,
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
