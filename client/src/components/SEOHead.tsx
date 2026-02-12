import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/config/languages';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEOHead({ title, description, path = '' }: SEOHeadProps) {
  const { i18n, t } = useTranslation();

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

    // Set text direction
    const isRtl = fullLangCode.startsWith('ar') || fullLangCode.startsWith('he');
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

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

    // Canonical Tag Logic
    const canonicalPath = path || '';
    const canonicalUrl = `${baseUrl}${currentLang === 'en' ? '' : `/${currentLang}`}${canonicalPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Hreflang Tags Logic
    const existingAlternates = document.querySelectorAll('link[hreflang]');
    existingAlternates.forEach(link => link.remove());

    SUPPORTED_LANGUAGES.forEach(language => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', language.code);

      // For English (default), no language prefix. For others, append /code
      const prefix = language.code === 'en' ? '' : `/${language.code}`;
      link.setAttribute('href', `${baseUrl}${prefix}${path}`);

      document.head.appendChild(link);
    });

    // x-default Hreflang Logic
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    // x-default should point to the English version (or whatever your default is)
    xDefaultLink.setAttribute('href', `${baseUrl}${path}`);
    document.head.appendChild(xDefaultLink);


    // Update Structured Data (JSON-LD)
    const updateStructuredData = () => {
      // Remove existing JSON-LD scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      const metaDescription = description || t('meta.home.description');
      const langCode = i18n.language;

      // 1. Organization Schema
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TerraBT",
        "alternateName": "TerraBT SAP BTP Consulting",
        "url": "https://www.terrabt.com",
        "email": "contact@terrabt.com",
        "description": metaDescription,
        "areaServed": "Worldwide",
        "knowsLanguage": ["en", "ja", "ar", langCode],
        "serviceType": [
          "SAP BTP Architecture", "SAP Fiori Development", "SAP CAP Development",
          "SAP Build Apps", "SAP Build Process Automation", "AI Invoice Processing",
          "SAP Integration Suite", "SAP Event Mesh", "Offline PWA Applications",
          "SAP Database Management", "Design Thinking Workshops"
        ],
        "sameAs": [
          "https://linkedin.com/company/terrabt",
          "https://x.com/TerraBTinc",
          "https://facebook.com/terrabt",
          "https://instagram.com/terrabt"
        ]
      };

      // 2. WebSite Schema
      const webSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TerraBT",
        "url": "https://www.terrabt.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.terrabt.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": ["en", "ja", "ar", langCode]
      };

      // 3. ProfessionalService Schema
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "TerraBT",
        "description": metaDescription,
        "url": "https://www.terrabt.com",
        "email": "contact@terrabt.com",
        "priceRange": "$$$$",
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 0,
            "longitude": 0
          },
          "geoRadius": "20000 km"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SAP BTP Consulting Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SAP BTP Architecture & Design",
                "description": title || t('meta.home.title')
              }
            }
          ]
        }
      };

      // Helper to inject script
      const injectScript = (data: any) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        document.head.appendChild(script);
      };

      injectScript(orgSchema);
      injectScript(webSchema);
      injectScript(serviceSchema);
    };

    updateStructuredData();



  }, [i18n.language, title, description, path]);

  return null;
}
