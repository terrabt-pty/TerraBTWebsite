import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEOHead({ title, description, path = '' }: SEOHeadProps) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const currentLang = i18n.language;
    const baseUrl = window.location.origin;
    
    document.documentElement.lang = currentLang;
    
    if (title) {
      document.title = title;
    }
    
    let existingDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (!existingDescription) {
        existingDescription = document.createElement('meta');
        existingDescription.setAttribute('name', 'description');
        document.head.appendChild(existingDescription);
      }
      existingDescription.setAttribute('content', description);
    }
    
    let existingAlternateEn = document.querySelector('link[hreflang="en"]');
    if (!existingAlternateEn) {
      existingAlternateEn = document.createElement('link');
      existingAlternateEn.setAttribute('rel', 'alternate');
      existingAlternateEn.setAttribute('hreflang', 'en');
      document.head.appendChild(existingAlternateEn);
    }
    existingAlternateEn.setAttribute('href', `${baseUrl}${path}`);
    
    let existingAlternateJa = document.querySelector('link[hreflang="ja"]');
    if (!existingAlternateJa) {
      existingAlternateJa = document.createElement('link');
      existingAlternateJa.setAttribute('rel', 'alternate');
      existingAlternateJa.setAttribute('hreflang', 'ja');
      document.head.appendChild(existingAlternateJa);
    }
    existingAlternateJa.setAttribute('href', `${baseUrl}/ja${path}`);
    
    let existingAlternateDefault = document.querySelector('link[hreflang="x-default"]');
    if (!existingAlternateDefault) {
      existingAlternateDefault = document.createElement('link');
      existingAlternateDefault.setAttribute('rel', 'alternate');
      existingAlternateDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(existingAlternateDefault);
    }
    existingAlternateDefault.setAttribute('href', `${baseUrl}${path}`);
    
  }, [i18n.language, title, description, path]);
  
  return null;
}
