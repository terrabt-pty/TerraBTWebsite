import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// GitHub Pages only serves files that physically exist on disk, there is no
// server-side rewrite for a client-side-routed SPA. Every route (and every
// language-prefixed variant of it) must exist as a real index.html so the
// origin returns 200 for it directly, instead of relying on the 404.html
// redirect trick (which returns a real 404 status to crawlers first).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');
const LANGUAGES_FILE = path.join(__dirname, '../client/src/config/languages.ts');
const APP_FILE = path.join(__dirname, '../client/src/App.tsx');

// Routes are derived directly from App.tsx's <Route> declarations rather than
// hardcoded here, so this list can never drift out of sync the way
// generate-sitemap.js's hardcoded copy did (it was missing 6 real routes,
// including /blog/finding-users-across-sap-btp-landscape).
function getRoutes() {
    const content = fs.readFileSync(APP_FILE, 'utf8');
    const regex = /<Route path="([^"]+)"/g;
    const routes = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        const route = match[1];
        if (route.includes(':')) continue; // skip dynamic-param routes
        routes.push(route === '/' ? '' : route);
    }
    return routes;
}

function getLanguages() {
    const content = fs.readFileSync(LANGUAGES_FILE, 'utf8');
    const regex = /code:\s*['"]([a-zA-Z-]+)['"]/g;
    const languages = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        languages.push(match[1]);
    }
    return languages;
}

function prerenderRoutes() {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    const languages = getLanguages();
    const routes = getRoutes();

    let written = 0;
    languages.forEach((lang) => {
        const prefix = lang === 'en' ? '' : `/${lang}`;
        routes.forEach((route) => {
            const routeDir = path.join(DIST_DIR, prefix.slice(1), route.slice(1));
            // Root ("" route, "en" language) already has dist/index.html, skip it.
            if (routeDir === DIST_DIR) return;
            fs.mkdirSync(routeDir, { recursive: true });
            fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
            written++;
        });
    });

    console.log(`Pre-rendered ${written} route/language combinations (${languages.length} languages x ${routes.length} routes) into dist/`);
}

prerenderRoutes();
