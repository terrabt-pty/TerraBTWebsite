const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGUAGES = [
  { code: 'en' },
  { code: 'en-GB' }, { code: 'de-DE' }, { code: 'de-AT' }, { code: 'de-CH' }, { code: 'fr-FR' }, { code: 'fr-CH' }, { code: 'es-ES' }, { code: 'it-IT' }, { code: 'nl-NL' }, { code: 'pt-PT' },
  { code: 'sv-SE' }, { code: 'da-DK' }, { code: 'nb-NO' }, { code: 'fi-FI' },
  { code: 'pl-PL' }, { code: 'cs-CZ' }, { code: 'hu-HU' }, { code: 'ro-RO' }, { code: 'sk-SK' }, { code: 'sl-SI' }, { code: 'hr-HR' }, { code: 'bg-BG' }, { code: 'uk-UA' }, { code: 'ru-RU' }, { code: 'lt-LT' }, { code: 'lv-LV' }, { code: 'et-EE' },
  { code: 'el-GR' },
  { code: 'nl-BE' }, { code: 'fr-BE' },
  { code: 'en-US' }, { code: 'en-CA' }, { code: 'fr-CA' },
  { code: 'es-MX' }, { code: 'es-AR' }, { code: 'es-CO' }, { code: 'es-CL' }, { code: 'es-PE' }, { code: 'es-GT' }, { code: 'es-CR' }, { code: 'pt-BR' },
  { code: 'zh-CN' }, { code: 'zh-TW' }, { code: 'ja-JP' }, { code: 'ko-KR' },
  { code: 'en-SG' }, { code: 'en-MY' }, { code: 'en-ID' }, { code: 'en-PH' }, { code: 'en-TH' }, { code: 'en-VN' },
  { code: 'en-IN' }, { code: 'en-PK' }, { code: 'en-BD' }, { code: 'en-LK' },
  { code: 'ar-AE' }, { code: 'ar-SA' }, { code: 'ar-EG' }, { code: 'en-AE' }, { code: 'en-SA' }, { code: 'he-IL' }, { code: 'tr-TR' },
  { code: 'am-ET' }, { code: 'en-KE' }, { code: 'en-ZA' }, { code: 'en-NG' }, { code: 'en-GH' }, { code: 'fr-SN' }, { code: 'fr-CI' }, { code: 'fr-CM' }, { code: 'pt-AO' }, { code: 'pt-MZ' }
];

const PAGES = [
  '',
  '/services/btp-architecture',
  '/services/fiori-development',
  '/services/design-thinking',
  '/services/offline-pwa',
  '/services/database-management',
  '/services/claude-ai',
  '/services/integration-suite',
  '/services/event-mesh',
  '/services/cap-development',
  '/services/build-apps',
  '/services/build-automation',
  '/blog/fiori-applications-sap-btp',
  '/blog/offline-pwa-business-continuity',
  '/blog/claude-ai-invoice-processing',
  '/blog/mastering-integration-suite',
  '/blog/event-mesh-architecture',
  '/blog/database-optimization-strategies',
  '/blog/btp-architecture-best-practices',
  '/blog/rapid-development-with-sap-cap',
  '/blog/low-code-revolution-with-sap-build-apps',
  '/blog/enterprise-automation-with-sap-build-process-automation',
  '/blog/user-centered-innovation-with-design-thinking'
];

const BASE_URL = 'https://www.terrabt.com';

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

PAGES.forEach(pagePath => {
  SUPPORTED_LANGUAGES.forEach(lang => {
    const langPrefix = lang.code === 'en' ? '' : `/${lang.code}`;
    const fullUrl = `${BASE_URL}${langPrefix}${pagePath}`;

    xml += `  <url>
    <loc>${fullUrl}</loc>
`;

    // Add alternate links for all languages
    SUPPORTED_LANGUAGES.forEach(altLang => {
      const altPrefix = altLang.code === 'en' ? '' : `/${altLang.code}`;
      const altUrl = `${BASE_URL}${altPrefix}${pagePath}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang.code}" href="${altUrl}"/>\n`;
    });

    // Add x-default
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${pagePath}"/>
    <changefreq>${pagePath === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${pagePath === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
  });
});

xml += '</urlset>';

const publicDir = path.join(__dirname, '../client/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log('Sitemap generated successfully!');
