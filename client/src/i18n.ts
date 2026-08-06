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

// Helper: read terrabt_lang cookie (set by Worker or by saveBrowserLanguage)
const getCookieLang = (): string | null => {
  const m = document.cookie.match(/(?:^|;\s*)terrabt_lang=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
};

const matchSupported = (code: string | null | undefined): string | null => {
  if (!code) return null;
  const lower = code.toLowerCase();
  const exact = SUPPORTED_LANGUAGES.find(l => l.code.toLowerCase() === lower);
  if (exact) return exact.code;
  const base = getBaseLanguage(lower);
  const baseMatch = SUPPORTED_LANGUAGES.find(l => getBaseLanguage(l.code).toLowerCase() === base);
  return baseMatch ? baseMatch.code : null;
};

declare global {
  interface Window { DETECTED_LANGUAGE?: string; LANG_SOURCE?: string; }
}

const getBrowserLanguage = (): string => {
  // 1. Cookie (set by Worker on ?lang= or by user choice in app)
  const cookieLang = matchSupported(getCookieLang());
  if (cookieLang) return cookieLang;

  // 2. Worker-detected language (already considered URL/Accept-Language/country)
  const detected = matchSupported(typeof window !== 'undefined' ? window.DETECTED_LANGUAGE : null);
  if (detected) return detected;

  // 3. Legacy localStorage (back-compat for users who picked a language before cookies)
  const storedLang = matchSupported(localStorage.getItem('terrabt-language'));
  if (storedLang) return storedLang;

  // 4. Browser navigator.languages, defensive parse
  const browserLanguages = navigator.languages || [navigator.language || (navigator as any).userLanguage];
  for (const browserLang of browserLanguages) {
    const m = matchSupported(browserLang);
    if (m) return m;
  }

  // 5. Timezone hint
  const tzRegion = getTimezoneRegion();
  if (tzRegion) {
    const tzMatch = matchSupported(tzRegion);
    if (tzMatch) return tzMatch;
  }

  return 'en';
};

const saveBrowserLanguage = (lang: string): void => {
  localStorage.setItem('terrabt-language', lang);
  // Also set a year-long first-party cookie so the Worker and future visits see it
  document.cookie = `terrabt_lang=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; Secure; SameSite=Lax`;
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
