/**
 * Optimized Cloudflare Worker for TerraBT
 * Supports both URL paths and SPA query-string paths (GitHub Pages pattern)
 * Includes fix for URL-encoded characters in search queries.
 */
export default {
  async fetch(request, env, ctx) {
    // Geo-blocking logic for Australia and New Zealand
    const country = request.cf?.country;
    const clientIP = request.headers.get("CF-Connecting-IP");

    // Check for "Magic Link" access token to bypass geo-blocking
    const url = new URL(request.url);
    const accessToken = url.searchParams.get("access_token");
    const cookieHeader = request.headers.get("Cookie") || "";

    // Define your secret token here
    const SECRET_ACCESS_TOKEN = "TerraBT-Mobile-Access";

    // Check if the user has the bypass cookie
    const hasBypassCookie = cookieHeader.includes(`terrabt_bypass=${SECRET_ACCESS_TOKEN}`);

    // Check if the request is from AU or NZ
    if ((country === 'AU' || country === 'NZ') && !hasBypassCookie && accessToken !== SECRET_ACCESS_TOKEN) {
      const allowedIPs = ['210.50.179.69'];

      // If the IP is not in the allowed list, block the request
      if (!allowedIPs.includes(clientIP)) {
        return new Response('', {
          status: 403,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    // If the user provided the correct access token in the URL, we need to set the cookie
    // We will do this by wrapping the final response later, but we need to know if we should set it.
    let shouldSetBypassCookie = false;
    if (accessToken === SECRET_ACCESS_TOKEN) {
      shouldSetBypassCookie = true;
    }

    // Security Check: Block access to the worker source code if someone tries to fetch it directly
    // url is already defined above
    if (url.pathname.includes('/worker/') || url.pathname.endsWith('worker.js') || url.pathname.endsWith('index.js')) {
      // Allow main.tsx or other client assets, but block worker/index.js specifically if it matches
      if (url.pathname.includes('worker')) {
        return new Response('', {
          status: 403,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    let response = await fetch(request);

    // SPA Fallback: If 404 and not an asset, serve index.html
    // This fixes issues where deep links (like /ar-EG/) return 404s to bots because the static host
    // doesn't have a directory for them.
    if (response.status === 404 && request.method === 'GET') {
      const pathname = new URL(request.url).pathname;
      // List of file extensions that should definitely return 404 if missing
      const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|xml|txt|md|woff|woff2|ttf|otf|map)$/i.test(pathname);

      if (!isAsset) {
        // Try serving index.html
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        const indexResponse = await fetch(indexRequest);

        // Only use the fallback if it actually exists
        if (indexResponse.status === 200) {
          response = indexResponse;
        }
      }
    }

    let matchedCode = "en-US";
    let status = "Fallback";

    // 1. Check URL Path
    let segments = url.pathname.split("/").filter(Boolean);

    // 2. Check Query String (for SPA patterns)
    if (segments.length === 0 && url.search) {
      // Decode URI component to handle encoded segments like %2F (forward slash)
      const decodedSearch = decodeURIComponent(url.search);
      const searchPath = decodedSearch.replace(/^[?]/, "").replace(/^[\/]/, "");
      segments = searchPath.split("/").filter(Boolean);
    }

    if (segments.length > 0) {
      const detectedSegment = segments[0];
      // Basic validation: Is it a language code? 
      // Accepts: en, en-US, en-gb, zh-Hans, etc. (2-3 chars, optional hyphen and region)
      // Rejects: services, blog, api, etc. if they don't match strict language patterns usually, 
      // but 'blog' is 4 chars. 'services' is 8.
      // Strict regex: 2-3 letters, optionally followed by dash and 2-4 alphanumeric characters
      const langRegex = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,4})?$/;

      // We also need to filter out common reserved words that might match the regex but aren't languages
      // though 2-3 chars is tight. 'api', 'app' might match.
      // Ideally we still validate against a list, but user explicitly asked to "get rid of language map".
      // We will trust the URL structure if it looks like a language code.

      if (langRegex.test(detectedSegment)) {
        matchedCode = detectedSegment; // Keep capitalization as requested
        status = "Success";
      }
    }

    // SEO Translations Data
    const SEO_DATA = {
      "af": {
        "title": "TerraBT - 100% SAP BTP Spesialisering",
        "description": "Gespesialiseerde konsultasie wat toonaangewende SAP Business Technology Platform implementerings wêreldwyd lewer",
        "keywords": "SAP BTP konsultasie, SAP Business Technology Platform, Fiori ontwikkeling, BTP argitektuur, SAP integrasie suite, AI faktuuur verwerking, PWA apps, event mesh, SAP konsultasie",
        "locale": "af"
      },
      "am": {
        "title": "TerraBT - 100% SAP BTP ልዩ ባለሙያነት",
        "description": "ዓለም አቀፍ የSAP Business Technology Platform ትግበራዎችን የሚያቀርብ ልዩ የማማከር አገልግሎት",
        "keywords": "SAP BTP ምክክር, SAP Business Technology Platform, Fiori ልማት, BTP አርክቴክቸር, SAP የግንኙነት ስብስብ, AI ደረሰኝ ማቀናበር, PWA መተግበሪያዎች, event mesh, SAP ምክክር",
        "locale": "am"
      },
      "ar": {
        "title": "TerraBT - متخصصون بنسبة 100% في SAP BTP",
        "description": "استشارات متخصصة تقدم أحدث تطبيقات SAP Business Technology Platform في جميع أنحاء العالم",
        "keywords": "استشارات SAP BTP, SAP Business Technology Platform, تطوير Fiori, هندسة BTP, مجموعة تكامل SAP, معالجة الفواتير بالذكاء الاصطناعي, تطبيقات PWA, شبكة الأحداث, استشارات SAP",
        "locale": "ar"
      },
      "bg": {
        "title": "TerraBT - 100% специализация в SAP BTP",
        "description": "Специализирано консултиране за внедряване на SAP Business Technology Platform по целия свят",
        "keywords": "SAP BTP консултиране, SAP Business Technology Platform, Fiori разработка, BTP архитектура, SAP интеграционен пакет, AI обработка на фактури, PWA приложения, event mesh, SAP консултиране",
        "locale": "bg"
      },
      "cs": {
        "title": "TerraBT - 100% fokus na SAP BTP",
        "description": "Specializovaný konclulting pro implementace řešení SAP Business Technology Platform po celém světě",
        "keywords": "SAP BTP konzultace, SAP Business Technology Platform, vývoj Fiori, architektura BTP, SAP Integration Suite, zpracování faktur AI, aplikace PWA, event mesh, konzultace SAP",
        "locale": "cs"
      },
      "da": {
        "title": "TerraBT - 100% SAP BTP-specialisering",
        "description": "Specialiseret rådgivning i SAP Business Technology Platform implementeringer",
        "keywords": "SAP BTP rådgivning, SAP Business Technology Platform, Fiori udvikling, BTP arkitektur, SAP integration suite, AI fakturabehandling, PWA apps, event mesh, SAP rådgivning",
        "locale": "da"
      },
      "de": {
        "title": "TerraBT - 100% SAP BTP-Spezialisierung",
        "description": "Spezialisierte Beratung für modernste SAP Business Technology Platform-Implementierungen weltweit",
        "keywords": "SAP BTP Beratung, SAP Business Technology Platform, Fiori Entwicklung, BTP Architektur, SAP Integration Suite, KI Rechnungsverarbeitung, PWA Apps, Event Mesh, SAP Beratung",
        "locale": "de"
      },
      "el": {
        "title": "TerraBT - 100% Εξειδίκευση SAP BTP",
        "description": "Εξειδικευμένες συμβουλευτικές υπηρεσίες για υλοποιήσεις SAP Business Technology Platform",
        "keywords": "Συμβουλευτική SAP BTP, SAP Business Technology Platform, ανάπτυξη Fiori, αρχιτεκτονική BTP, σουίτα ενοποίησης SAP, επεξεργασία τιμολογίων AI, εφαρμογές PWA, event mesh, συμβουλευτική SAP",
        "locale": "el"
      },
      "en": {
        "title": "TerraBT - SAP BTP Consulting Experts | 100% BTP Focused Solutions",
        "description": "TerraBT specializes exclusively in SAP BTP consulting services worldwide. Expert solutions in Fiori development, BTP architecture, PWA apps, AI-powered invoice processing, and integration suite. Serving underserved markets globally.",
        "keywords": "SAP BTP consulting, SAP Business Technology Platform, Fiori development, BTP architecture, SAP integration suite, AI invoice processing, PWA apps, event mesh, SAP consulting",
        "locale": "en"
      },
      "es": {
        "title": "TerraBT - 100% Especialización en SAP BTP",
        "description": "Consultoría especializada en implementaciones SAP Business Technology Platform",
        "keywords": "consultoría SAP BTP, SAP Business Technology Platform, desarrollo Fiori, arquitectura BTP, suite de integración SAP, procesamiento de facturas con IA, aplicaciones PWA, event mesh, consultoría SAP",
        "locale": "es"
      },
      "et": {
        "title": "TerraBT - 100% SAP BTP spetsialiseerumine",
        "description": "Spetsialiseeritud nõustamine SAP Business Technology Platform juurutustes",
        "keywords": "SAP BTP konsultatsioon, SAP Business Technology Platform, Fiori arendus, BTP arhitektuur, SAP integratsioonikomplekt, AI arvete töötlemine, PWA rakendused, event mesh, SAP konsultatsioon",
        "locale": "et"
      },
      "fi": {
        "title": "TerraBT - 100 % keskittyminen SAP BTP -alustaan",
        "description": "Erikoistunutta konsultointia huipputason SAP Business Technology Platform -toteutuksiin maailmanlaajuisesti",
        "keywords": "SAP BTP konsultointi, SAP Business Technology Platform, Fiori kehitys, BTP arkkitehtuuri, SAP integraatiopaketti, tekoäly laskujen käsittely, PWA sovellukset, event mesh, SAP konsultointi",
        "locale": "fi"
      },
      "fr": {
        "title": "TerraBT - Spécialisation 100% SAP BTP",
        "description": "Conseil spécialisé livrant des implémentations de plateforme SAP Business Technology Platform de pointe dans le monde entier",
        "keywords": "conseil SAP BTP, SAP Business Technology Platform, développement Fiori, architecture BTP, suite d'intégration SAP, traitement des factures par IA, applications PWA, event mesh, conseil SAP",
        "locale": "fr"
      },
      "he": {
        "title": "TerraBT - 100% התמחות ב-SAP BTP",
        "description": "ייעוץ מומחה ליישום פתרונות SAP Business Technology Platform מתקדמים ברחבי העולם",
        "keywords": "ייעוץ SAP BTP, SAP Business Technology Platform, פיתוח Fiori, ארכיטקטורת BTP, חבילת אינטגרציה SAP, עיבוד חשבוניות AI, אפליקציות PWA, event mesh, ייעוץ SAP",
        "locale": "he"
      },
      "hr": {
        "title": "TerraBT - 100% specijalizacija SAP BTP-a",
        "description": "Specijalizirano savjetovanje za implementacije SAP Business Technology Platform",
        "keywords": "SAP BTP savjetovanje, SAP Business Technology Platform, Fiori razvoj, BTP arhitektura, SAP integracijski paket, AI obrada računa, PWA aplikacije, event mesh, SAP savjetovanje",
        "locale": "hr"
      },
      "hu": {
        "title": "TerraBT - 100% SAP BTP Specializáció",
        "description": "Specializált tanácsadás SAP Business Technology Platform implementációkban",
        "keywords": "SAP BTP tanácsadás, SAP Business Technology Platform, Fiori fejlesztés, BTP architektúra, SAP integrációs csomag, AI számlafeldolgozás, PWA alkalmazások, event mesh, SAP tanácsadás",
        "locale": "hu"
      },
      "it": {
        "title": "TerraBT - Specializzazione SAP BTP al 100%",
        "description": "Consulenza specializzata in implementazioni SAP Business Technology Platform",
        "keywords": "consulenza SAP BTP, SAP Business Technology Platform, sviluppo Fiori, architettura BTP, suite di integrazione SAP, elaborazione fatture AI, app PWA, event mesh, consulenza SAP",
        "locale": "it"
      },
      "ja": {
        "title": "TerraBT - 100% SAP BTP専門",
        "description": "世界中で最先端のSAP Business Technology Platform実装を提供する専門コンサルティング",
        "keywords": "SAP BTP コンサルティング, SAP Business Technology Platform, Fiori 開発, BTP アーキテクチャ, SAP 統合スイート, AI 請求書処理, PWA アプリ, イベントメッシュ, SAP コンサルティング",
        "locale": "ja"
      },
      "ko": {
        "title": "TerraBT - 100% SAP BTP 전문화",
        "description": "SAP Business Technology Platform 구현 전문 컨설팅",
        "keywords": "SAP BTP 컨설팅, SAP Business Technology Platform, Fiori 개발, BTP 아키텍처, SAP 통합 제품군, AI 송장 처리, PWA 앱, 이벤트 메쉬, SAP 컨설팅",
        "locale": "ko"
      },
      "lt": {
        "title": "TerraBT - 100% specializacija SAP BTP",
        "description": "Specializuotas konsultavimas diegiant pažangiausius SAP Business Technology Platform sprendimus visame pasaulyje",
        "keywords": "SAP BTP konsultacijos, SAP Business Technology Platform, Fiori kūrimas, BTP architektūra, SAP integracijos paketas, AI sąskaitų faktūrų apdorojimas, PWA programos, event mesh, SAP konsultacijos",
        "locale": "lt"
      },
      "lv": {
        "title": "TerraBT - 100% specializācija SAP BTP",
        "description": "Specializētas konsultācijas modernāko SAP Business Technology Platform risinājumu ieviešanai visā pasaulē",
        "keywords": "SAP BTP konsultācijas, SAP Business Technology Platform, Fiori izstrāde, BTP arhitektūra, SAP integrācijas komplekts, AI rēķinu apstrāde, PWA lietotnes, event mesh, SAP konsultācijas",
        "locale": "lv"
      },
      "nb": {
        "title": "TerraBT - 100% SAP BTP-spesialisering",
        "description": "Spesialisert rådgivning i SAP Business Technology Platform implementeringer",
        "keywords": "SAP BTP rådgivning, SAP Business Technology Platform, Fiori utvikling, BTP arkitektur, SAP integrasjonspakke, AI fakturabehandling, PWA apper, event mesh, SAP rådgivning",
        "locale": "nb"
      },
      "nl": {
        "title": "TerraBT - 100% SAP BTP-specialisatie",
        "description": "Gespecialiseerde consulting voor SAP Business Technology Platform implementaties",
        "keywords": "SAP BTP consulting, SAP Business Technology Platform, Fiori ontwikkeling, BTP architectuur, SAP integratie suite, AI factuurverwerking, PWA apps, event mesh, SAP consulting",
        "locale": "nl"
      },
      "pl": {
        "title": "TerraBT - 100% koncentracji na SAP BTP",
        "description": "Specjalistyczne doradztwo dostarczające najnowocześniejsze wdrożenia SAP Business Technology Platform na całym świecie",
        "keywords": "konsulting SAP BTP, SAP Business Technology Platform, rozwój Fiori, architektura BTP, pakiet integracji SAP, przetwarzanie faktur AI, aplikacje PWA, event mesh, konsulting SAP",
        "locale": "pl"
      },
      "pt": {
        "title": "TerraBT - Especialização 100% SAP BTP",
        "description": "Consultoria especializada em implementações SAP Business Technology Platform",
        "keywords": "consultoria SAP BTP, SAP Business Technology Platform, desenvolvimento Fiori, arquitetura BTP, suíte de integração SAP, processamento de faturas com IA, apps PWA, event mesh, consultoria SAP",
        "locale": "pt"
      },
      "ro": {
        "title": "TerraBT - 100% Specializare SAP BTP",
        "description": "Consultanță specializată în implementări SAP Business Technology Platform",
        "keywords": "consultanță SAP BTP, SAP Business Technology Platform, dezvoltare Fiori, arhitectură BTP, suită de integrare SAP, procesare facturi AI, aplicații PWA, event mesh, consultanță SAP",
        "locale": "ro"
      },
      "ru": {
        "title": "TerraBT - 100% фокус на SAP BTP",
        "description": "Специализированный консалтинг по внедрению передовых решений на базе SAP Business Technology Platform по всему миру",
        "keywords": "консалтинг SAP BTP, SAP Business Technology Platform, разработка Fiori, архитектура BTP, интеграционный пакет SAP, обработка счетов с ИИ, PWA приложения, event mesh, консалтинг SAP",
        "locale": "ru"
      },
      "sk": {
        "title": "TerraBT - 100% zameranie na SAP BTP",
        "description": "Špecializované poradenstvo poskytujúce špičkové implementácie SAP Business Technology Platform po celom svete",
        "keywords": "SAP BTP poradenstvo, SAP Business Technology Platform, vývoj Fiori, architektúra BTP, SAP integračný balík, spracovanie faktúr AI, PWA aplikácie, event mesh, SAP poradenstvo",
        "locale": "sk"
      },
      "sl": {
        "title": "TerraBT - 100 % fokus na SAP BTP",
        "description": "Specializirano svetovanje za implementacije SAP Business Technology Platform po vsem svetu",
        "keywords": "SAP BTP svetovanje, SAP Business Technology Platform, razvoj Fiori, arhitektura BTP, SAP integracijski paket, obdelava računov z umetno inteligenco, PWA aplikacije, event mesh, SAP svetovanje",
        "locale": "sl"
      },
      "sv": {
        "title": "TerraBT - 100 % fokus på SAP BTP",
        "description": "Specialiserad rådgivning som levererar banbrytande implementeringar av SAP Business Technology Platform världen över",
        "keywords": "SAP BTP konsultation, SAP Business Technology Platform, Fiori utveckling, BTP arkitektur, SAP integrationssvit, AI fakturahantering, PWA appar, event mesh, SAP konsultation",
        "locale": "sv"
      },
      "sw": {
        "title": "TerraBT - Ujuzi Maalum 100% wa SAP BTP",
        "description": "Ushauri wa kipekee unaoletea utekelezaji wa hali ya juu wa SAP Business Technology Platform duniani kote",
        "keywords": "Ushauri wa SAP BTP, SAP Business Technology Platform, maendeleo ya Fiori, usanifu wa BTP, seti ya ujumuishaji wa SAP, uchakataji wa ankara wa AI, programu za PWA, matundu ya tukio, ushauri wa SAP",
        "locale": "sw"
      },
      "tr": {
        "title": "TerraBT - %100 SAP BTP Uzmanlığı",
        "description": "Dünya çapında en son teknoloji SAP İş Teknolojisi Platformu (BTP) uygulamaları sunan uzman danışmanlık",
        "keywords": "SAP BTP danışmanlığı, SAP Business Technology Platform, Fiori geliştirme, BTP mimarisi, SAP entegrasyon paketi, YZ fatura işleme, PWA uygulamaları, event mesh, SAP danışmanlığı",
        "locale": "tr"
      },
      "uk": {
        "title": "TerraBT - 100% фокус на SAP BTP",
        "description": "Спеціалізований консалтинг із впровадження передових рішень SAP Business Technology Platform по всьому світу",
        "keywords": "консалтинг SAP BTP, SAP Business Technology Platform, розробка Fiori, архітектура BTP, інтеграційний пакет SAP, обробка рахунків зі ШІ, PWA додатки, event mesh, консалтинг SAP",
        "locale": "uk"
      },
      "zh": {
        "title": "TerraBT - 100%的SAP BTP专业化",
        "description": "专业咨询提供前沿的SAP Business Technology Platform实施",
        "keywords": "SAP BTP 咨询, SAP Business Technology Platform, Fiori 开发, BTP 架构, SAP 集成套件, AI 发票处理, PWA 应用, event mesh, SAP 咨询",
        "locale": "zh"
      }
    };

    // Helper to get SEO data with fallback
    const getSeoData = (langCode) => {
      // Try exact match
      if (SEO_DATA[langCode]) return SEO_DATA[langCode];
      // Try base language (e.g. ar-EG -> ar)
      const base = langCode.split('-')[0];
      if (SEO_DATA[base]) return SEO_DATA[base];
      // Fallback
      return SEO_DATA['en'];
    };

    const seoData = getSeoData(matchedCode);

    // Rewriters
    class HeadInjector {
      constructor(country, lang, urlObject) {
        this.country = country;
        this.lang = lang;
        this.url = urlObject;
      }

      element(element) {
        // 1. Inject Geo/Lang Scripts
        element.append(
          `<script>
             window.GEO_COUNTRY = "${this.country || 'UNKNOWN'}";
             window.DETECTED_LANGUAGE = "${this.lang || 'en-US'}";
           </script>`,
          { html: true }
        );

        // 2. Calculate Base Path (removing language prefix if present)
        const pathname = this.url.pathname;
        const segments = pathname.split('/').filter(Boolean);
        const firstSegment = segments[0];

        let basePath = pathname;
        // Check if the path starts with the current detected language
        // We use a simple check against the lang code, but we need to be careful with 'en-US' vs 'en' etc.
        // If this.lang is 'en-US' (default), the URL likely doesn't have it, or it might (if explicitly requested).
        // If we found a lang code in the URL logic above (matchedCode), use that knowledge.
        // Re-deriving it here for safety:

        const langRegex = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,4})?$/;
        if (firstSegment && langRegex.test(firstSegment)) {
          // It's a language prefix, remove it to get base path
          // But check if it matches our supported languages roughly (or is just a valid lang code)
          basePath = '/' + segments.slice(1).join('/');
        } else {
          // No language prefix, so it's the root or a direct page like /services
          if (basePath === '/') basePath = ''; // normalize root
          if (!basePath.startsWith('/')) basePath = '/' + basePath;
        }

        const origin = this.url.origin;

        // 3. Helper to build URL
        const buildUrl = (langCode) => {
          // Check if lang is default (assuming 'en' or 'en-US' is default and sits at root)
          // The logic in client is: if (lang === 'en') prefix = ''
          const prefix = (langCode === 'en' || langCode === 'en-US') ? '' : `/${langCode}`;
          return `${origin}${prefix}${basePath}`;
        };

        // 4. Canonical Tag (Self-referencing)
        // We use the DETECTED language (this.lang) to form the canonical
        // If this.lang is 'en-US', we treat it as 'en' for the URL structure if that's the convention
        // The client code maps 'en' to '' (root).
        // matchedCode from main logic is what we want.

        // We need to know if the CURRENT URL is the canonical one.
        // Ideally we just point to the version corresponding to this.lang.
        // Note: this.lang passed to constructor comes from 'matchedCode' which is normalized.

        const currentLangCode = this.lang.startsWith('en') ? 'en' : this.lang;
        const canonicalUrl = buildUrl(currentLangCode);

        element.append(
          `<link rel="canonical" href="${canonicalUrl}" />`,
          { html: true }
        );

        // 5. Hreflang Tags
        // Iterate over SEO_DATA keys
        // SEO_DATA keys are like 'en', 'ja', 'ar', 'af'...
        Object.keys(SEO_DATA).forEach(langCode => {
          const href = buildUrl(langCode);
          element.append(
            `<link rel="alternate" hreflang="${langCode}" href="${href}" />`,
            { html: true }
          );
        });

        // 6. x-default Tag
        // Points to the default language version (en)
        const defaultUrl = buildUrl('en');
        element.append(
          `<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
          { html: true }
        );
      }
    }

    class HtmlLangInjector {
      constructor(lang) {
        this.lang = lang;
      }
      element(element) {
        element.setAttribute("lang", this.lang);
        // Also set dir="rtl" for Arabic
        if (this.lang.startsWith('ar') || this.lang.startsWith('he')) {
          element.setAttribute("dir", "rtl");
        } else {
          element.setAttribute("dir", "ltr");
        }
      }
    }

    class TitleRewriter {
      constructor(title) {
        this.title = title;
      }
      element(element) {
        element.setInnerContent(this.title);
      }
    }

    class MetaDescriptionRewriter {
      constructor(description) {
        this.description = description;
      }
      element(element) {
        element.setAttribute("content", this.description);
      }
    }

    class MetaKeywordsRewriter {
      constructor(keywords) {
        this.keywords = keywords;
      }
      element(element) {
        element.setAttribute("content", this.keywords);
      }
    }

    class JsonLdRewriter {
      constructor(seoData, langCode) {
        this.seoData = seoData;
        this.langCode = langCode;
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
            "email": "contact@terrabt.com",
            "description": this.seoData.description,
            "areaServed": "Worldwide",
            "knowsLanguage": ["en", "ja", "ar", this.langCode], // Explicitly include current lang
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
            "inLanguage": ["en", "ja", "ar", this.langCode]
          };
          element.setInnerContent(JSON.stringify(webSchema), { html: true });
        }

        // 3. ProfessionalService Schema
        if (this.counter === 3) {
          const serviceSchema = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "TerraBT",
            "description": this.seoData.description,
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
                    "description": this.seoData.title // Use title as brief desc key
                  }
                }
              ]
            }
          };
          element.setInnerContent(JSON.stringify(serviceSchema), { html: true });
        }
      }
    }

    const contentType = response.headers.get("content-type");

    // Only inject into HTML pages
    let finalResponse = response;
    if (contentType && contentType.includes("text/html")) {
      finalResponse = new HTMLRewriter()
        .on("head", new HeadInjector(country, matchedCode, url))
        .on("html", new HtmlLangInjector(matchedCode))
        .on("title", new TitleRewriter(seoData.title))
        .on('meta[name="description"]', new MetaDescriptionRewriter(seoData.description))
        .on('meta[name="keywords"]', new MetaKeywordsRewriter(seoData.keywords))
        .on('script[type="application/ld+json"]', new JsonLdRewriter(seoData, matchedCode))
        .transform(response);
    }

    // Clone response to be able to modify headers (HTMLRewriter response allows header mutation, standard fetch response might be immutable)
    // However, HTMLRewriter.transform returns a new response that we can just use.
    // If we didn't use HTMLRewriter, we need to handle the headers on the original response.

    // We need to ensure we preserve the headers logic from the original code
    const newHeaders = new Headers(finalResponse.headers);
    newHeaders.set("Content-Language", matchedCode);
    newHeaders.set("X-Language-Matched", matchedCode);
    newHeaders.set("X-Language-Match-Status", status);
    newHeaders.set("X-Content-Signal", "search=yes,ai-train=yes");

    if (shouldSetBypassCookie) {
      // Set a persistent cookie for 30 days
      newHeaders.append("Set-Cookie", `terrabt_bypass=${SECRET_ACCESS_TOKEN}; Path=/; Max-Age=2592000; Secure; HttpOnly; SameSite=Lax`);
    }

    return new Response(finalResponse.body, {
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: newHeaders
    });
  }
};