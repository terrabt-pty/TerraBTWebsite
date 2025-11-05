import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SUPPORTED_LANGUAGES } from '@/config/languages';
import { getBrowserLanguage } from '@/i18n';

export default function LanguageRedirect() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);
    
    const hasLangPrefix = pathSegments.length > 0 && 
      SUPPORTED_LANGUAGES.some(lang => lang.code === pathSegments[0]);
    
    if (!hasLangPrefix) {
      const browserLang = getBrowserLanguage();
      
      if (browserLang !== 'en') {
        const newPath = location === '/' ? `/${browserLang}` : `/${browserLang}${location}`;
        setLocation(newPath);
      }
    }
  }, []);

  return null;
}
