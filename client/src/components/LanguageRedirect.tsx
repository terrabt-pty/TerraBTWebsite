import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SUPPORTED_LANGUAGES } from '@/config/languages';
import { getBrowserLanguage, saveBrowserLanguage } from '@/i18n';

export default function LanguageRedirect() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);
    
    const hasLangPrefix = pathSegments.length > 0 && 
      SUPPORTED_LANGUAGES.some(lang => lang.code === pathSegments[0]);
    
    if (hasLangPrefix) {
      saveBrowserLanguage(pathSegments[0]);
    } else {
      const detectedLang = getBrowserLanguage();
      
      if (detectedLang !== 'en') {
        saveBrowserLanguage(detectedLang);
        const newPath = location === '/' ? `/${detectedLang}` : `/${detectedLang}${location}`;
        setLocation(newPath);
      }
    }
  }, []);

  return null;
}
