import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/config/languages';

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

    // Get the full language-region code from SUPPORTED_LANGUAGES if it exists
    const fullLangCode = SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.code || currentLang;

    // Standardize lang code for HTML (e.g., en-US)
    const htmlLang = fullLangCode.includes('-') ? fullLangCode : (fullLangCode === 'en' ? 'en-US' : fullLangCode);
    document.documentElement.lang = htmlLang;

    // Update og:locale meta tag (format: en_US)
    const ogLocale = htmlLang.replace('-', '_');
    let metaOgLocale = document.querySelector('meta[property="og:locale"]');
    if (!metaOgLocale) {
      metaOgLocale = document.createElement('meta');
      metaOgLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(metaOgLocale);
    }
    metaOgLocale.setAttribute('content', ogLocale);

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

    const existingAlternates = document.querySelectorAll('link[hreflang]');
    existingAlternates.forEach(link => link.remove());

    SUPPORTED_LANGUAGES.forEach(language => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', language.code);

      const prefix = language.code === 'en' ? '' : `/${language.code}`;
      link.setAttribute('href', `${baseUrl}${prefix}${path}`);

      document.head.appendChild(link);
    });

    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${baseUrl}${path}`);
    document.head.appendChild(defaultLink);

  }, [i18n.language, title, description, path]);

  return null;
}
