import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/config/languages';

export function useLocalizedPath() {
  const { i18n } = useTranslation();
  
  const getLocalizedPath = (path: string): string => {
    const currentLang = i18n.language;
    
    if (currentLang === 'en') {
      return path;
    }
    
    const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === currentLang);
    if (!isSupported) {
      return path;
    }
    
    if (path === '/') {
      return `/${currentLang}`;
    }
    
    return `/${currentLang}${path}`;
  };
  
  return { getLocalizedPath };
}

export function useCurrentLanguage() {
  const { i18n } = useTranslation();
  return i18n.language;
}
