/**
 * Cloudflare Worker for TerraBT (terrabt.com, www.terrabt.com, updates.terrabt.com)
 *
 * - Redirects any old language-prefixed URL (/de-DE/..., /ja-JP, ...) to its English equivalent.
 * - Serves index.html for unknown, non-asset paths (SPA fallback on GitHub Pages).
 * - Rewrites the HTML head for SEO: lang, title, description, keywords, canonical,
 *   hreflang and JSON-LD. The site is English only, so there is no language detection.
 *
 * The translated SEO copy and the language detection were removed when the site went
 * English only. They are in git history, before the commit that introduced this file.
 */

// Language codes that used to be public URL prefixes. Any request whose first path
// segment is one of these is redirected to the English URL. Mirrors the retired list
// in client/src/config/languages.ts.
const LANGUAGE_PATH_CODES = new Set([
  "en-GB", "de-DE", "de-AT", "de-CH", "fr-FR", "fr-CH", "es-ES", "it-IT", "nl-NL", "pt-PT",
  "sv-SE", "da-DK", "nb-NO", "fi-FI",
  "pl-PL", "cs-CZ", "hu-HU", "ro-RO", "sk-SK", "sl-SI", "hr-HR", "bg-BG", "uk-UA", "ru-RU", "lt-LT", "lv-LV", "et-EE",
  "el-GR",
  "nl-BE", "fr-BE",
  "en-US", "en-CA", "fr-CA",
  "es-MX", "es-AR", "es-CO", "es-CL", "es-PE", "es-GT", "es-CR", "pt-BR",
  "zh-CN", "zh-TW", "ja-JP", "ko-KR",
  "en-SG", "en-MY", "en-ID", "en-PH", "en-TH", "en-VN",
  "en-IN", "en-PK", "en-BD", "en-LK",
  "ar-AE", "ar-SA", "ar-EG", "en-AE", "en-SA", "he-IL", "tr-TR",
  "am-ET", "en-KE", "sw-KE", "en-ZA", "af-ZA", "en-NG", "en-GH", "en-UG", "en-TZ", "sw-TZ", "en-ZM", "en-ZW", "en-RW", "fr-RW", "en-NA",
  "ar-MA", "ar-TN", "ar-DZ", "fr-SN", "fr-CI", "fr-CM", "fr-GA", "pt-AO", "pt-MZ",
  // Bare language codes. The old hreflang tags and sitemap pointed at these (/fr/, /de/, ...).
  "af", "am", "ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "he", "hr", "hu", "it",
  "ja", "ko", "lt", "lv", "nb", "nl", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "sw", "tr", "uk", "zh",
]);

const SITE_LANGUAGE = "en-US";

const SEO = {
  title: "BTP xID | SAP BTP Service Key Governance: Owner, Expiry, Rotation | TerraBT",
  description: "SAP BTP service keys have no owner, no expiry date, and no record of purpose. BTP xID adds owner, purpose, expiry, and rotation tracking to every credential and one view of users and keys across your landscape, evidence for ISO 27001, SOC 2, PCI DSS, NIST 800-53, and SOX audits.",
  keywords: "SAP BTP service key governance, BTP xID, SAP BTP credential rotation, SAP BTP compliance evidence, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry access governance",
};

class HeadInjector {
  constructor(urlObject) {
    this.url = urlObject;
  }

  element(element) {
    // The client reads window.DETECTED_LANGUAGE (client/src/i18n.ts).
    element.append(
      `<script>window.DETECTED_LANGUAGE = "${SITE_LANGUAGE}";</script>`,
      { html: true }
    );

    // Canonical and hreflang are always the English URL of the page being served.
    const canonicalUrl = `${this.url.origin}${this.url.pathname}`;
    element.append(
      `<link rel="canonical" href="${canonicalUrl}" />` +
      `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />` +
      `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`,
      { html: true }
    );
  }
}

class AttributeSetter {
  constructor(attributes) {
    this.attributes = attributes;
  }

  element(element) {
    for (const [name, value] of Object.entries(this.attributes)) {
      element.setAttribute(name, value);
    }
  }
}

class TitleRewriter {
  element(element) {
    element.setInnerContent(SEO.title);
  }
}

class JsonLdRewriter {
  constructor() {
    this.counter = 0;
  }

  element(element) {
    this.counter++;

    // 1. Organization Schema
    if (this.counter === 1) {
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TerraBT",
        "alternateName": "TerraBT SAP BTP Consulting",
        "url": "https://www.terrabt.com",
        "email": "support@terrabt.com",
        "description": SEO.description,
        "areaServed": "Worldwide",
        "knowsLanguage": ["en"],
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
      element.setInnerContent(JSON.stringify(orgSchema), { html: true });
    }

    // 2. WebSite Schema
    if (this.counter === 2) {
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
        "inLanguage": ["en"]
      };
      element.setInnerContent(JSON.stringify(webSchema), { html: true });
    }

    // 3. ProfessionalService Schema
    if (this.counter === 3) {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "TerraBT",
        "description": SEO.description,
        "url": "https://www.terrabt.com",
        "email": "support@terrabt.com",
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
                "description": SEO.title // Use title as brief desc key
              }
            }
          ]
        }
      };
      element.setInnerContent(JSON.stringify(serviceSchema), { html: true });
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Pass through updates.terrabt.com (downloads) and accounts.terrabt.com (app login/registration)
    // without HTML rewriting.
    if (url.hostname === 'updates.terrabt.com' || url.hostname === 'accounts.terrabt.com') {
      return fetch(request);
    }

    // Redirect any language-prefixed path (/de-DE/..., /ja-JP, etc.) to its
    // English equivalent. Permanent, so search engines drop the old URL and
    // consolidate on the English one.
    const pathSegments = url.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && LANGUAGE_PATH_CODES.has(pathSegments[0])) {
      const rest = pathSegments.slice(1).join('/');
      const target = new URL('/' + rest, url.origin);
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }

    // Block access to the worker source code if someone tries to fetch it directly.
    if (url.pathname.includes('worker')) {
      return new Response('', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    let response = await fetch(request);

    // SPA Fallback: If 404 and not an asset, serve index.html.
    // Deep links return 404 from the static host because it has no directory for them.
    if (response.status === 404 && request.method === 'GET') {
      // File extensions that should definitely return 404 if missing.
      const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|xml|txt|md|woff|woff2|ttf|otf|map)$/i.test(url.pathname);

      if (!isAsset) {
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        const indexResponse = await fetch(indexRequest);

        // Only use the fallback if it actually exists.
        if (indexResponse.status === 200) {
          response = indexResponse;
        }
      }
    }

    // Only rewrite HTML pages.
    const contentType = response.headers.get("content-type");
    let finalResponse = response;
    if (contentType && contentType.includes("text/html")) {
      finalResponse = new HTMLRewriter()
        .on("head", new HeadInjector(url))
        .on("html", new AttributeSetter({ lang: SITE_LANGUAGE, dir: "ltr" }))
        .on("title", new TitleRewriter())
        .on('meta[name="description"]', new AttributeSetter({ content: SEO.description }))
        .on('meta[name="keywords"]', new AttributeSetter({ content: SEO.keywords }))
        .on('script[type="application/ld+json"]', new JsonLdRewriter())
        .transform(response);
    }

    // The response headers of a fetch() response can be immutable, so copy them.
    const newHeaders = new Headers(finalResponse.headers);
    newHeaders.set("Content-Language", SITE_LANGUAGE);
    newHeaders.set("X-Content-Signal", "search=yes,ai-train=yes");

    return new Response(finalResponse.body, {
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: newHeaders
    });
  }
};
