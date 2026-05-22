/**
 * Optimized Cloudflare Worker for TerraBT
 * Supports both URL paths and SPA query-string paths (GitHub Pages pattern)
 * Includes fix for URL-encoded characters in search queries.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Pass through updates.terrabt.com (downloads) and accounts.terrabt.com (app login/registration)
    // without HTML rewriting.
    if (url.hostname === 'updates.terrabt.com' || url.hostname === 'accounts.terrabt.com') {
      return fetch(request);
    }

    const country = request.cf?.country;
    const cookieHeader = request.headers.get("Cookie") || "";

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

    // Language detection — layered priority:
    //   1. ?lang= query param   (explicit, used by emails)
    //   2. URL path prefix       (e.g. /de/products/)
    //   3. terrabt_lang cookie   (returning user)
    //   4. Accept-Language       (parsed with q values)
    //   5. CF-IPCountry          (country → language map)
    //   6. en-US fallback
    let matchedCode = "en-US";
    let status = "Fallback";

    const SUPPORTED_LANGS = new Set([
      "en","de","fr","es","it","pt","nl","sv","da","nb","fi","pl","cs","hu","ro","sk","sl","hr",
      "bg","uk","ru","lt","lv","et","el","tr","zh","ko","ja","ar","he","af","sw","am"
    ]);

    // Map a candidate code (e.g. "de-CH", "zh-Hans") to a supported code
    const matchSupported = (code) => {
      if (!code) return null;
      const lower = code.toLowerCase();
      if (SUPPORTED_LANGS.has(lower)) return lower;
      const base = lower.split("-")[0];
      if (SUPPORTED_LANGS.has(base)) return base;
      return null;
    };

    // 1. ?lang= query param
    const langParam = url.searchParams.get("lang");
    const langFromParam = matchSupported(langParam);
    if (langFromParam) {
      matchedCode = langFromParam;
      status = "url-param";
    }

    // 2. URL path prefix (existing logic, kept for back-compat)
    if (status === "Fallback") {
      let segments = url.pathname.split("/").filter(Boolean);
      if (segments.length === 0 && url.search) {
        const decodedSearch = decodeURIComponent(url.search);
        const searchPath = decodedSearch.replace(/^[?]/, "").replace(/^[\/]/, "");
        segments = searchPath.split("/").filter(Boolean);
      }
      if (segments.length > 0) {
        const langRegex = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,4})?$/;
        if (langRegex.test(segments[0])) {
          const fromPath = matchSupported(segments[0]);
          if (fromPath) {
            matchedCode = fromPath;
            status = "url-path";
          }
        }
      }
    }

    // 3. terrabt_lang cookie
    if (status === "Fallback") {
      const cookieMatch = cookieHeader.match(/(?:^|;\s*)terrabt_lang=([^;]+)/);
      const fromCookie = matchSupported(cookieMatch?.[1]);
      if (fromCookie) {
        matchedCode = fromCookie;
        status = "cookie";
      }
    }

    // 4. Accept-Language header (parsed with quality values)
    if (status === "Fallback") {
      const acceptLang = request.headers.get("Accept-Language") || "";
      const candidates = acceptLang
        .split(",")
        .map((part) => {
          const [tag, ...params] = part.trim().split(";");
          const q = params.find((p) => p.trim().startsWith("q="));
          const quality = q ? parseFloat(q.split("=")[1]) : 1.0;
          return { tag: tag.trim(), q: isNaN(quality) ? 1.0 : quality };
        })
        .filter((c) => c.tag && c.tag !== "*")
        .sort((a, b) => b.q - a.q);

      for (const c of candidates) {
        const m = matchSupported(c.tag);
        if (m) { matchedCode = m; status = "accept-language"; break; }
      }
    }

    // 5. CF-IPCountry → language map
    if (status === "Fallback") {
      const COUNTRY_LANG = {
        DE: "de", AT: "de", CH: "de", LI: "de",
        FR: "fr", BE: "fr", LU: "fr", MC: "fr",
        ES: "es", AR: "es", MX: "es", CL: "es", CO: "es", PE: "es", VE: "es", UY: "es",
        IT: "it", SM: "it", VA: "it",
        PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
        NL: "nl",
        SE: "sv",
        DK: "da",
        NO: "nb",
        FI: "fi",
        PL: "pl",
        CZ: "cs",
        HU: "hu",
        RO: "ro", MD: "ro",
        SK: "sk",
        SI: "sl",
        HR: "hr",
        BG: "bg",
        UA: "uk",
        RU: "ru", BY: "ru",
        LT: "lt",
        LV: "lv",
        EE: "et",
        GR: "el", CY: "el",
        TR: "tr",
        CN: "zh", TW: "zh", HK: "zh", SG: "zh",
        KR: "ko", KP: "ko",
        JP: "ja",
        SA: "ar", AE: "ar", EG: "ar", IQ: "ar", JO: "ar", LB: "ar", LY: "ar",
        MA: "ar", OM: "ar", QA: "ar", SY: "ar", TN: "ar", YE: "ar", DZ: "ar", BH: "ar", KW: "ar",
        IL: "he",
        ZA: "af", NA: "af",
        KE: "sw", TZ: "sw", UG: "sw",
        ET: "am", ER: "am",
      };
      const fromCountry = matchSupported(COUNTRY_LANG[country]);
      if (fromCountry) {
        matchedCode = fromCountry;
        status = "country";
      }
    }

    // SEO Translations Data
    const SEO_DATA = {
      "af": {
        "title": "BTP xID | SAP BTP API Kredensiale & Toegangbestuur",
        "description": "BTP xID is 'n skermtoepassing vir volledige SAP BTP API kredensiale en gebruikerbestuur. Beheer elke gebruiker, rol en API kredensiale oor Globale Rekeninge, sub-rekeninge en Cloud Foundry-omgewings op een plek.",
        "keywords": "SAP BTP API kredensiaalbeheer, BTP xID, SAP BTP gebruikersbeheer, dienssleutels SAP BTP, Cloud Foundry toegangsbeheer, SAP BTP toegangsbestuur",
        "locale": "af"
      },
      "am": {
        "title": "BTP xID | SAP BTP API ምስጋና እና መዳረሽ አስተዳደር",
        "description": "BTP xID ለሙሉ SAP BTP API ምስጋና እና ተጠቃሚ አስተዳደር የስራ ገጽ ትግበራ ነው። እያንዳንዱን ተጠቃሚ፣ ሚና እና API ምስጋናን በአለም ሀገር ሂሳቦች፣ ንዑስ ሂሳቦች እና Cloud Foundry ከባቢያት ላይ ከአንድ ቦታ ያስተዳድሩ።",
        "keywords": "SAP BTP API ምስጋናን አስተዳደር፣ BTP xID፣ SAP BTP ተጠቃሚ አስተዳደር፣ ድርጅት ቁልፎች SAP BTP፣ Cloud Foundry መዳረሽ አስተዳደር፣ SAP BTP መዳረሽ አስተዳደር",
        "locale": "am"
      },
      "ar": {
        "title": "BTP xID | إدارة بيانات اعتماد API وإدارة الوصول SAP BTP",
        "description": "BTP xID هو تطبيق سطح المكتب لإدارة بيانات اعتماد API والمستخدم الكاملة SAP BTP. تحكم في كل مستخدم وأدوار وبيانات اعتماد API عبر الحسابات العامة والحسابات الفرعية وبيئات Cloud Foundry من مكان واحد.",
        "keywords": "إدارة بيانات اعتماد API SAP BTP، BTP xID، إدارة المستخدمين SAP BTP، مفاتيح الخدمة SAP BTP، إدارة وصول Cloud Foundry، إدارة الوصول SAP BTP",
        "locale": "ar"
      },
      "bg": {
        "title": "BTP xID | Управление на API учетни данни и достъп SAP BTP",
        "description": "BTP xID е настолно приложение за пълно управление на API учетни данни и потребители SAP BTP. Управлявайте всеки потребител, роля и API учетни данни в глобални сметки, подсметки и среди Cloud Foundry от едно място.",
        "keywords": "SAP BTP управление на API учетни данни, BTP xID, SAP BTP управление на потребители, ключове на услуги SAP BTP, управление на достъп Cloud Foundry, управление на достъп SAP BTP",
        "locale": "bg"
      },
      "cs": {
        "title": "BTP xID | Správa přihlašovacích údajů API SAP BTP a správa přístupu",
        "description": "BTP xID je desktopová aplikace pro úplnou správu přihlašovacích údajů API a uživatelů SAP BTP. Spravujte každého uživatele, roli a přihlašovací údaje API v globálních účtech, dílčích účtech a prostředích Cloud Foundry na jednom místě.",
        "keywords": "Správa přihlašovacích údajů API SAP BTP, BTP xID, Správa uživatelů SAP BTP, klíče služeb SAP BTP, Správa přístupu Cloud Foundry, Správa přístupu SAP BTP",
        "locale": "cs"
      },
      "da": {
        "title": "BTP xID | SAP BTP API Legitimationsoplysninger & Adgangsstyring",
        "description": "BTP xID er en desktopapplikation til fuldstændig SAP BTP API-legitimationsoplysninger og brugerstyring. Styr hver bruger, rolle og API-legitimationsoplysninger på tværs af globale konti, underkonti og Cloud Foundry-miljøer fra ét sted.",
        "keywords": "SAP BTP API-legitimationsstyring, BTP xID, SAP BTP-brugerstyring, servicenøgler SAP BTP, Cloud Foundry-adgangsstyring, SAP BTP-adgangsstyring",
        "locale": "da"
      },
      "de": {
        "title": "BTP xID | SAP BTP API Anmeldedaten & Zugriffsverwaltung",
        "description": "BTP xID ist eine Desktop-Anwendung für vollständige SAP BTP API-Anmeldedaten und Benutzerverwaltung. Verwalten Sie jeden Benutzer, jede Rolle und jede API-Anmeldedaten über globale Konten, Unterkonten und Cloud Foundry-Umgebungen von einem Ort aus.",
        "keywords": "SAP BTP API-Anmeldedatenverwaltung, BTP xID, SAP BTP-Benutzerverwaltung, Service-Schlüssel SAP BTP, Cloud Foundry-Zugriffsverwaltung, SAP BTP-Zugriffsverwaltung",
        "locale": "de"
      },
      "el": {
        "title": "BTP xID | Διαχείριση διαπιστευτηρίων API SAP BTP και έλεγχος πρόσβασης",
        "description": "BTP xID είναι μια εφαρμογή επιφάνειας εργασίας για πλήρη διαχείριση διαπιστευτηρίων API και χρηστών SAP BTP. Ελέγξτε κάθε χρήστη, ρόλο και διαπιστευτήρια API σε παγκόσμιους λογαριασμούς, δευτερεύοντες λογαριασμούς και περιβάλλοντα Cloud Foundry από ένα σημείο.",
        "keywords": "Διαχείριση διαπιστευτηρίων API SAP BTP, BTP xID, Διαχείριση χρηστών SAP BTP, κλειδιά υπηρεσίας SAP BTP, Διαχείριση πρόσβασης Cloud Foundry, Έλεγχος πρόσβασης SAP BTP",
        "locale": "el"
      },
      "en": {
        "title": "BTP xID | SAP BTP API Credential & Access Management",
        "description": "BTP xID is a desktop app for complete SAP BTP API credential and user management. Govern every user, role, and API credential across Global Accounts, sub-accounts, and Cloud Foundry environments from one place.",
        "keywords": "SAP BTP API credential management, BTP xID, SAP BTP user management, service keys SAP BTP, Cloud Foundry access management, SAP BTP API keys, BTP access governance",
        "locale": "en"
      },
      "es": {
        "title": "BTP xID | Gestión de credenciales API de SAP BTP y control de acceso",
        "description": "BTP xID es una aplicación de escritorio para la gestión completa de credenciales API y usuarios de SAP BTP. Administre cada usuario, rol y credencial API en cuentas globales, subcuentas y entornos de Cloud Foundry desde un único lugar.",
        "keywords": "Gestión de credenciales API de SAP BTP, BTP xID, Gestión de usuarios de SAP BTP, claves de servicio de SAP BTP, Gestión de acceso de Cloud Foundry, Control de acceso de SAP BTP",
        "locale": "es"
      },
      "et": {
        "title": "BTP xID | SAP BTP API identimisteabete ja juurdepääsukontrolli haldus",
        "description": "BTP xID on töölauallikas SAP BTP API identimisteabete ja kasutajate täielikuks haldamiseks. Hallake kõiki kasutajaid, rolle ja API identimisteabeid globaalsete kontode, alamkontode ja Cloud Foundry keskkondade lõikes ühest kohast.",
        "keywords": "SAP BTP API identimisteabete haldus, BTP xID, SAP BTP kasutajate haldus, teenuste võtmed SAP BTP, Cloud Foundry juurdepääsukontrolli, SAP BTP juurdepääsukontrolli",
        "locale": "et"
      },
      "fi": {
        "title": "BTP xID | SAP BTP API tunnistetiedot ja pääsynhallinta",
        "description": "BTP xID on työpöytäsovellus SAP BTP API tunnistetietojen ja käyttäjien täydelliselle hallinnalle. Hallitse jokaista käyttäjää, roolia ja API tunnistetietoja globaalien tilien, alitilien ja Cloud Foundry ympäristöjen välillä yhdestä paikasta.",
        "keywords": "SAP BTP API tunnistetietojen hallinta, BTP xID, SAP BTP käyttäjähallinta, palveluavaimet SAP BTP, Cloud Foundry pääsynhallinta, SAP BTP pääsynhallinta",
        "locale": "fi"
      },
      "fr": {
        "title": "BTP xID | Gestion des identifiants API SAP BTP et contrôle d'accès",
        "description": "BTP xID est une application de bureau pour la gestion complète des identifiants API et des utilisateurs SAP BTP. Gérez tous les utilisateurs, rôles et identifiants API sur les comptes mondiaux, les sous-comptes et les environnements Cloud Foundry à partir d'un seul endroit.",
        "keywords": "Gestion des identifiants API SAP BTP, BTP xID, Gestion des utilisateurs SAP BTP, clés de service SAP BTP, Gestion de l'accès Cloud Foundry, Contrôle d'accès SAP BTP",
        "locale": "fr"
      },
      "he": {
        "title": "BTP xID | ניהול אישורי API של SAP BTP ובקרת גישה",
        "description": "BTP xID היא יישומת שולחן עבודה לניהול מלא של אישורי API ויוזרים של SAP BTP. נהל כל יוזר, תפקיד ואישור API בחשבונות גלובליים, חשבונות משנה וסביבות Cloud Foundry ממקום אחד.",
        "keywords": "ניהול אישורי API של SAP BTP, BTP xID, ניהול יוזרים של SAP BTP, מפתחות שירות של SAP BTP, ניהול גישה של Cloud Foundry, בקרת גישה של SAP BTP",
        "locale": "he"
      },
      "hr": {
        "title": "BTP xID | Upravljanje API akreditivima SAP BTP i kontrola pristupa",
        "description": "BTP xID je stolna aplikacija za kompletan SAP BTP API upravljanje akreditivima i korisnicima. Upravljajte svakim korisnikom, ulogom i API akreditivima preko globalnih računa, podrачuna i Cloud Foundry okruženja s jednog mjesta.",
        "keywords": "SAP BTP upravljanje API akreditivima, BTP xID, SAP BTP upravljanje korisnicima, ključevi usluge SAP BTP, Cloud Foundry kontrola pristupa, SAP BTP kontrola pristupa",
        "locale": "hr"
      },
      "hu": {
        "title": "BTP xID | SAP BTP API hitelesítési adatok és hozzáférés-vezérlés",
        "description": "BTP xID egy asztali alkalmazás az SAP BTP API hitelesítési adatok és felhasználók teljes kezeléséhez. Kezelje az összes felhasználót, szerepet és API hitelesítési adatokat globális fiókok, alfiókok és Cloud Foundry környezetek között egy helyről.",
        "keywords": "SAP BTP API hitelesítési adatok kezelése, BTP xID, SAP BTP felhasználókezelés, szolgáltatás kulcsok SAP BTP, Cloud Foundry hozzáférés-vezérlés, SAP BTP hozzáférés-vezérlés",
        "locale": "hu"
      },
      "it": {
        "title": "BTP xID | Gestione delle credenziali API SAP BTP e controllo degli accessi",
        "description": "BTP xID è un'applicazione desktop per la gestione completa delle credenziali API e degli utenti SAP BTP. Gestisci ogni utente, ruolo e credenziale API su account globali, account secondari e ambienti Cloud Foundry da un'unica posizione.",
        "keywords": "Gestione delle credenziali API SAP BTP, BTP xID, Gestione degli utenti SAP BTP, chiavi di servizio SAP BTP, Controllo degli accessi Cloud Foundry, Controllo degli accessi SAP BTP",
        "locale": "it"
      },
      "ja": {
        "title": "BTP xID | SAP BTP API 認証情報とアクセス管理",
        "description": "BTP xID は、SAP BTP API の認証情報とユーザーの完全な管理用デスクトップアプリケーションです。グローバルアカウント、サブアカウント、Cloud Foundry 環境全体の、すべてのユーザー、ロール、API 認証情報を 1 か所から管理します。",
        "keywords": "SAP BTP API 認証情報管理、BTP xID、SAP BTP ユーザー管理、サービスキー SAP BTP、Cloud Foundry アクセス管理、SAP BTP アクセス管理",
        "locale": "ja"
      },
      "ko": {
        "title": "BTP xID | SAP BTP API 자격 증명 및 액세스 관리",
        "description": "BTP xID는 SAP BTP API 자격 증명 및 사용자를 완벽하게 관리하기 위한 데스크탑 애플리케이션입니다. 한 곳에서 글로벌 계정, 하위 계정 및 Cloud Foundry 환경 전반에 걸쳐 모든 사용자, 역할 및 API 자격 증명을 관리합니다.",
        "keywords": "SAP BTP API 자격 증명 관리, BTP xID, SAP BTP 사용자 관리, 서비스 키 SAP BTP, Cloud Foundry 액세스 관리, SAP BTP 액세스 관리",
        "locale": "ko"
      },
      "lt": {
        "title": "BTP xID | SAP BTP API kredencialai ir prieigos valdymas",
        "description": "BTP xID yra darbalaukio programa, skirta SAP BTP API kredencialų ir vartotojų pilnam valdymui. Valdykite kiekvieną vartotoją, vaidmenį ir API kredencialus visame globaliųjų sąskaitų, posąskaitų ir Cloud Foundry aplinkų diapazone iš vienos vietos.",
        "keywords": "SAP BTP API kredencialų valdymas, BTP xID, SAP BTP vartotojų valdymas, tarnybos raktai SAP BTP, Cloud Foundry prieigos valdymas, SAP BTP prieigos valdymas",
        "locale": "lt"
      },
      "lv": {
        "title": "BTP xID | SAP BTP API akreditācija un piekļuves pārvaldība",
        "description": "BTP xID ir darbvirsmas lietojumprogramma SAP BTP API akreditācijas un lietotāju pilnai pārvaldībai. Pārvaldiet katru lietotāju, lomu un API akreditāciju globālajos kontos, apakškontos un Cloud Foundry vidēs no vienas vietas.",
        "keywords": "SAP BTP API akreditācijas pārvaldība, BTP xID, SAP BTP lietotāju pārvaldība, pakalpojumu atslēgas SAP BTP, Cloud Foundry piekļuves pārvaldība, SAP BTP piekļuves pārvaldība",
        "locale": "lv"
      },
      "nb": {
        "title": "BTP xID | SAP BTP API Legitimasjon & Tilgangskontroll",
        "description": "BTP xID er et skrivebordsprogram for fullstendig SAP BTP API-legitimasjon og brukerstyring. Styr hver bruker, rolle og API-legitimasjon på tvers av globale konti, underkonti og Cloud Foundry-miljøer fra ett sted.",
        "keywords": "SAP BTP API-legitimasjonsstyring, BTP xID, SAP BTP-brukerstyring, tjenestenøkler SAP BTP, Cloud Foundry-tilgangskontroll, SAP BTP-tilgangskontroll",
        "locale": "nb"
      },
      "nl": {
        "title": "BTP xID | SAP BTP API Referenties & Toegangsbeheer",
        "description": "BTP xID is een desktoptoepassing voor volledig SAP BTP API-referenties en gebruikersbeheer. Beheer elke gebruiker, rol en API-referentie op globale rekeningen, subrekeningen en Cloud Foundry-omgevingen vanaf één locatie.",
        "keywords": "SAP BTP API-referentiebeheer, BTP xID, SAP BTP-gebruikersbeheer, servicesleutels SAP BTP, Cloud Foundry-toegangsbeheer, SAP BTP-toegangsbeheer",
        "locale": "nl"
      },
      "pl": {
        "title": "BTP xID | Zarządzanie poświadczeniami API SAP BTP i kontrola dostępu",
        "description": "BTP xID to aplikacja komputerowa do pełnego zarządzania poświadczeniami API i użytkownikami SAP BTP. Zarządzaj każdym użytkownikiem, rolą i poświadczeniami API na kontach globalnych, kontach podrzędnych i środowiskach Cloud Foundry z jednego miejsca.",
        "keywords": "Zarządzanie poświadczeniami API SAP BTP, BTP xID, Zarządzanie użytkownikami SAP BTP, klucze usług SAP BTP, Kontrola dostępu Cloud Foundry, Kontrola dostępu SAP BTP",
        "locale": "pl"
      },
      "pt": {
        "title": "BTP xID | Gerenciamento de credenciais API SAP BTP e controle de acesso",
        "description": "BTP xID é um aplicativo de desktop para gerenciamento completo de credenciais de API e usuários SAP BTP. Gerencie cada usuário, função e credencial de API em contas globais, subcontas e ambientes Cloud Foundry a partir de um único local.",
        "keywords": "Gerenciamento de credenciais API SAP BTP, BTP xID, Gerenciamento de usuários SAP BTP, chaves de serviço SAP BTP, Controle de acesso Cloud Foundry, Controle de acesso SAP BTP",
        "locale": "pt"
      },
      "ro": {
        "title": "BTP xID | Gestionarea acreditărilor API SAP BTP și controlul accesului",
        "description": "BTP xID este o aplicație desktop pentru gestionarea completă a acreditărilor API și utilizatorilor SAP BTP. Gestionați fiecare utilizator, rol și acreditare API în conturi globale, subconturi și medii Cloud Foundry dintr-un singur loc.",
        "keywords": "Gestionarea acreditărilor API SAP BTP, BTP xID, Gestionarea utilizatorilor SAP BTP, chei de serviciu SAP BTP, Controlul accesului Cloud Foundry, Controlul accesului SAP BTP",
        "locale": "ro"
      },
      "ru": {
        "title": "BTP xID | Управление учетными данными API SAP BTP и контроль доступа",
        "description": "BTP xID — это настольное приложение для полного управления учетными данными API и пользователями SAP BTP. Управляйте каждым пользователем, ролью и учетными данными API в глобальных счетах, подсчетах и средах Cloud Foundry из одного места.",
        "keywords": "Управление учетными данными API SAP BTP, BTP xID, Управление пользователями SAP BTP, ключи сервисов SAP BTP, Контроль доступа Cloud Foundry, Управление доступом SAP BTP",
        "locale": "ru"
      },
      "sk": {
        "title": "BTP xID | Správa poverení API SAP BTP a riadenie prístupu",
        "description": "BTP xID je desktopová aplikácia na úplnú správu poverení API a používateľov SAP BTP. Spravujte každého používateľa, rolu a poverenie API v globálnych účtoch, podúčtoch a prostrediach Cloud Foundry na jednom mieste.",
        "keywords": "Správa poverení API SAP BTP, BTP xID, Správa používateľov SAP BTP, servisné kľúče SAP BTP, Riadenie prístupu Cloud Foundry, Riadenie prístupu SAP BTP",
        "locale": "sk"
      },
      "sl": {
        "title": "BTP xID | Upravljanje poverilnic API SAP BTP in nadzor dostopa",
        "description": "BTP xID je namizna aplikacija za popolno upravljanje poverilnic API in uporabnikov SAP BTP. Upravljajte vsakega uporabnika, vlogo in poverilnico API v globalnih računih, podračunih in okoljih Cloud Foundry na enem mestu.",
        "keywords": "Upravljanje poverilnic API SAP BTP, BTP xID, Upravljanje uporabnikov SAP BTP, ključi storitve SAP BTP, Nadzor dostopa Cloud Foundry, Nadzor dostopa SAP BTP",
        "locale": "sl"
      },
      "sv": {
        "title": "BTP xID | SAP BTP API Autentiseringsuppgifter & Åtkomstkontroll",
        "description": "BTP xID är en skrivbordsapplikation för fullständig SAP BTP API-autentiseringsuppgifter och användarhantering. Styr alla användare, roller och API-autentiseringsuppgifter i globala konton, underkonton och Cloud Foundry-miljöer från ett ställe.",
        "keywords": "SAP BTP API-autentiseringsuppgiftshantering, BTP xID, SAP BTP-användarhantering, tjänstenycklar SAP BTP, Cloud Foundry-åtkomstkontroll, SAP BTP-åtkomstkontroll",
        "locale": "sv"
      },
      "sw": {
        "title": "BTP xID | Usimamizi wa API Akaunti ya SAP BTP na Kudhibiti Kuingilia",
        "description": "BTP xID ni programu ya kompyuta kwa ajili ya usimamizi kamili wa API akaunti na watumiaji wa SAP BTP. Simamia kila mtumiaji, jukumu na API akaunti katika akaunti za kimataifa, akaunti ndogo na mazingira ya Cloud Foundry kutoka mahali pamoja.",
        "keywords": "Usimamizi wa API Akaunti ya SAP BTP, BTP xID, Usimamizi wa Watumiaji wa SAP BTP, funguo za huduma SAP BTP, Kudhibiti Kuingilia kwa Cloud Foundry, Kudhibiti Kuingilia kwa SAP BTP",
        "locale": "sw"
      },
      "tr": {
        "title": "BTP xID | SAP BTP API Kimlik Bilgileri ve Erişim Yönetimi",
        "description": "BTP xID, SAP BTP API kimlik bilgileri ve kullanıcı yönetiminin tam olması için bir masaüstü uygulamasıdır. Küresel hesaplar, alt hesaplar ve Cloud Foundry ortamları arasında her kullanıcı, rol ve API kimlik bilgisini tek bir yerden yönetin.",
        "keywords": "SAP BTP API kimlik bilgileri yönetimi, BTP xID, SAP BTP kullanıcı yönetimi, SAP BTP hizmet anahtarları, Cloud Foundry erişim yönetimi, SAP BTP erişim yönetimi",
        "locale": "tr"
      },
      "uk": {
        "title": "BTP xID | Управління обліковими даними API SAP BTP та контроль доступу",
        "description": "BTP xID — це настільна програма для повного управління обліковими даними API та користувачами SAP BTP. Керуйте кожним користувачем, роллю та обліковими даними API в глобальних рахунках, субрахунках та середовищах Cloud Foundry з одного місця.",
        "keywords": "Управління обліковими даними API SAP BTP, BTP xID, Управління користувачами SAP BTP, ключи служб SAP BTP, Контроль доступу Cloud Foundry, Управління доступом SAP BTP",
        "locale": "uk"
      },
      "zh": {
        "title": "BTP xID | SAP BTP API 凭证和访问权限管理",
        "description": "BTP xID 是一个桌面应用程序，用于完整的 SAP BTP API 凭证和用户管理。在全球账户、子账户和 Cloud Foundry 环境中从一处管理每个用户、角色和 API 凭证。",
        "keywords": "SAP BTP API 凭证管理、BTP xID、SAP BTP 用户管理、SAP BTP 服务密钥、Cloud Foundry 访问权限管理、SAP BTP 访问权限管理",
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
      constructor(country, lang, urlObject, source) {
        this.country = country;
        this.lang = lang;
        this.url = urlObject;
        this.source = source;
      }

      element(element) {
        // 1. Inject Geo/Lang Scripts
        element.append(
          `<script>
             window.GEO_COUNTRY = "${this.country || 'UNKNOWN'}";
             window.DETECTED_LANGUAGE = "${this.lang || 'en-US'}";
             window.LANG_SOURCE = "${this.source || 'fallback'}";
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

        // 4. Canonical Tag — always the language-neutral (English) URL
        // This ensures Google indexes and shows www.terrabt.com/ not www.terrabt.com/de/
        // regardless of which language variant is being served.
        const canonicalUrl = buildUrl('en');

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
            "email": "support@terrabt.com",
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
        .on("head", new HeadInjector(country, matchedCode, url, status))
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

    // Persist explicit ?lang= choice as a cookie so future visits skip detection.
    // Not HttpOnly — the React app needs to read/update it on language switch.
    if (status === "url-param" && langFromParam) {
      newHeaders.append("Set-Cookie", `terrabt_lang=${langFromParam}; Path=/; Max-Age=31536000; Secure; SameSite=Lax`);
    }

    return new Response(finalResponse.body, {
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: newHeaders
    });
  }
};