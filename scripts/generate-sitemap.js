const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.terrabt.com';
const LANGUAGES_FILE = path.join(__dirname, '../client/src/config/languages.ts');
const OUTPUT_FILE = path.join(__dirname, '../client/public/sitemap.xml');

// Routes (extracted from App.tsx)
const ROUTES = [
    "", // Home
    "/services/btp-architecture",
    "/services/fiori-development",
    "/services/design-thinking",
    "/services/offline-pwa",
    "/services/database-management",
    "/services/ai",
    "/services/integration-suite",
    "/services/event-mesh",
    "/services/cap-development",
    "/services/build-apps",
    "/services/build-automation",
    "/blog/fiori-applications-sap-btp",
    "/blog/offline-pwa-business-continuity",
    "/blog/ai-invoice-processing",
    "/blog/mastering-integration-suite",
    "/blog/event-mesh-architecture",
    "/blog/database-optimization-strategies",
    "/blog/btp-architecture-best-practices",
    "/blog/rapid-development-with-sap-cap",
    "/blog/low-code-revolution-with-sap-build-apps",
    "/blog/enterprise-automation-with-sap-build-process-automation",
    "/blog/user-centered-innovation-with-design-thinking"
];

// Helper to read languages
function getLanguages() {
    const content = fs.readFileSync(LANGUAGES_FILE, 'utf8');
    // Regex to match objects in the array: { code: 'en-GB', ... }
    // This is a simple regex assumption that the file structure is consistent
    const regex = /code:\s*['"]([a-zA-Z-]+)['"]/g;
    const languages = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        languages.push(match[1]);
    }
    return languages;
}

function generateSitemap() {
    const languages = getLanguages();
    console.log(`Found ${languages.length} languages.`);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    ROUTES.forEach(route => {
        // For each route, we create an entry for every language version of that route

        // 1. First, define the set of all variants for this route to use in xhtml:link
        const alternateLinks = languages.map(lang => {
            const prefix = lang === 'en' ? '' : `/${lang}`;
            // Ensure strictly no double slashes, but route starts with / (except empty string for home?)
            // Route "" -> prefix only
            // Route "/foo" -> prefix + "/foo"
            const url = `${BASE_URL}${prefix}${route}`;
            return { lang, url };
        });

        // Add x-default link (pointing to international/english usually, or a specific page)
        // Using 'en' (root) as x-default
        const xDefaultUrl = `${BASE_URL}${route}`;

        // 2. Now generate the <url> block for each language variant
        languages.forEach(currentLang => {
            const currentPrefix = currentLang === 'en' ? '' : `/${currentLang}`;
            const currentUrl = `${BASE_URL}${currentPrefix}${route}`;

            xml += '  <url>\n';
            xml += `    <loc>${currentUrl}</loc>\n`;

            // Add alternate links for ALL languages
            alternateLinks.forEach(link => {
                xml += `    <xhtml:link rel="alternate" hreflang="${link.lang}" href="${link.url}"/>\n`;
            });

            // Add x-default
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}"/>\n`;

            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>1.0</priority>\n';
            xml += '  </url>\n';
        });
    });

    xml += '</urlset>';

    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`Sitemap generated at ${OUTPUT_FILE}`);
}

generateSitemap();
