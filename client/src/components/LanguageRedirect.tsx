import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SUPPORTED_LANGUAGES } from '@/config/languages';
import { getBrowserLanguage, saveBrowserLanguage } from '@/i18n';

export default function LanguageRedirect() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);

    // Strip a language prefix from the URL, if present, to get the underlying
    // content path. No prefix means the default/English content path. Only an
    // exact SUPPORTED_LANGUAGES code counts as a prefix (matches how
    // LanguageSwitcher and SEOHead's hreflang alternates build these URLs —
    // always the full code, e.g. de-DE, never a bare base code like de).
    const first = pathSegments[0];
    const matchedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === first);
    const currentLang = matchedLang ? matchedLang.code : 'en';
    const basePath = matchedLang
      ? (pathSegments.length > 1 ? '/' + pathSegments.slice(1).join('/') : '/')
      : location;

    // Detect the user's preferred language — respects an explicit prior choice
    // (cookie), Worker-side detection, and browser settings, in that priority
    // order (see getBrowserLanguage in i18n.ts).
    const desiredLang = getBrowserLanguage();

    if (currentLang === desiredLang) {
      saveBrowserLanguage(desiredLang);
      return;
    }

    // The URL's language — e.g. whatever Google decided to show in search
    // results, or a bare link with no language prefix — doesn't match the
    // user's preferred language. Redirect to the version in their language.
    saveBrowserLanguage(desiredLang);

    const newPath = desiredLang === 'en'
      ? basePath
      : (basePath === '/' ? `/${desiredLang}` : `/${desiredLang}${basePath}`);

    const search = window.location.search;
    const hash = window.location.hash;
    const targetFull = `${newPath}${search}${hash}`;
    const currentFull = `${location}${search}${hash}`;

    if (targetFull !== currentFull) {
      setLocation(targetFull);
    }
  }, [location, setLocation]);

  return null;
}
