import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const BASE_URL = 'https://www.terrabt.com';
const OUTPUT_FILE = path.join(__dirname, '../client/public/sitemap.xml');

// Routes (extracted from App.tsx)
const ROUTES = [
    "", // Home

    // Products
    "/products",
    "/products/btp-xid",
    "/products/claude-cli",

    // Services
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

    // Legal
    "/terms-of-service",
    "/privacy-policy",
    "/limited-liability",

    // Blog
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
    "/blog/user-centered-innovation-with-design-thinking",
];

// English-only now. The site used to publish a sitemap entry (plus hreflang
// alternates to every other language) for every route x language
// combination. Other languages' pages still exist — they're just no longer
// advertised to Google as separate indexable URLs, since they now redirect
// straight back to the English page (see worker/index.js).
function generateSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    ROUTES.forEach(route => {
        const url = `${BASE_URL}${route}`;

        xml += '  <url>\n';
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${url}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>1.0</priority>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`Sitemap generated at ${OUTPUT_FILE} (${ROUTES.length} English-only URLs).`);
}

generateSitemap();
