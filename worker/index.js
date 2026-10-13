/**
 * Optimized Cloudflare Worker for TerraBT
 * Supports both URL paths and SPA query-string paths (GitHub Pages pattern)
 * Includes fix for URL-encoded characters in search queries.
 */

// The site officially supports English only now. The /:lang routes, their
// page components, and all translated strings still exist in the app and
// in SEO_DATA below — nothing was deleted — but they're no longer reachable
// at a public URL: any request whose first path segment is one of these
// codes is redirected straight to its English equivalent before it ever
// reaches origin. This list mirrors client/src/config/languages.ts.
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
]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Pass through updates.terrabt.com (downloads) and accounts.terrabt.com (app login/registration)
    // without HTML rewriting.
    if (url.hostname === 'updates.terrabt.com' || url.hostname === 'accounts.terrabt.com') {
      return fetch(request);
    }

    // Redirect any language-prefixed path (/de-DE/..., /ja-JP, etc.) to its
    // English equivalent — permanent, so search engines drop the old URL and
    // consolidate on the English one instead of leaving it disallowed/stuck.
    const pathSegments = url.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && LANGUAGE_PATH_CODES.has(pathSegments[0])) {
      const rest = pathSegments.slice(1).join('/');
      const target = new URL('/' + rest, url.origin);
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }

    const country = request.cf?.country;

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

    // English-only now — no runtime language detection. Any request that
    // could have resolved to a different language (a /:lang path, or a
    // ?lang= param) was already redirected to its English equivalent above,
    // so there's nothing left to detect. SEO_DATA's other-language entries
    // below are kept (not deleted) but getSeoData always resolves to 'en'.
    const matchedCode = "en-US";
    const status = "english-only";

    // SEO Translations Data
    const SEO_DATA = {
      "af": {
        "title": "BTP xID | SAP BTP Diensbestuur: Eienaar, Verval, Rotasie | TerraBT",
        "description": "SAP BTP-diensleutels het geen eienaar, geen vervaldatum en geen rekord van doel nie. BTP xID voeg eienaar, doel, vervaldatum en rotasie-opsporing by elke kredensiaal en gee een oorsig van gebruikers en sleutels oor jou landskap, bewys vir ISO 27001, SOC 2, PCI DSS, NIST 800-53 en SOX-oudits.",
        "keywords": "SAP BTP diensleutelbestuur, BTP xID, SAP BTP kredensiaalrotasie, SAP BTP nakomingsbewys, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry toegangsbestuur",
        "locale": "af"
      },
      "am": {
        "title": "BTP xID | የ SAP BTP አገልግሎት ቁልፍ አስተዳደር: ባለቤት፣ ማብቂያ፣ ሽክርክሪት | TerraBT",
        "description": "የ SAP BTP አገልግሎት ቁልፎች ባለቤት የላቸውም፣ የማብቂያ ቀን የላቸውም፣ እና የዓላማ መዝገብ የላቸውም። BTP xID ለእያንዳንዱ ምስክር ወረቀት ባለቤት፣ ዓላማ፣ ማብቂያ እና የሽክርክሪት ክትትል ይጨምራል እንዲሁም በመልክዓ ምድርዎ ውስጥ ያሉ ተጠቃሚዎችን እና ቁልፎችን በአንድ እይታ ያሳያል, ለ ISO 27001፣ SOC 2፣ PCI DSS፣ NIST 800-53 እና SOX ኦዲቶች ማስረጃ።",
        "keywords": "SAP BTP አገልግሎት ቁልፍ አስተዳደር, BTP xID, SAP BTP ምስክር ወረቀት ሽክርክሪት, SAP BTP የተገዢነት ማስረጃ, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry መዳረሻ አስተዳደር",
        "locale": "am"
      },
      "ar": {
        "title": "BTP xID | إدارة مفاتيح خدمة SAP BTP: المالك، الانتهاء، التدوير | TerraBT",
        "description": "مفاتيح خدمة SAP BTP ليس لها مالك، ولا تاريخ انتهاء، ولا سجل للغرض. يضيف BTP xID المالك والغرض وتاريخ الانتهاء وتتبع التدوير لكل بيانات اعتماد، ويوفر رؤية واحدة للمستخدمين والمفاتيح عبر بيئتك, دليل لعمليات تدقيق ISO 27001 وSOC 2 وPCI DSS وNIST 800-53 وSOX.",
        "keywords": "إدارة مفاتيح خدمة SAP BTP، BTP xID، تدوير بيانات اعتماد SAP BTP، دليل امتثال SAP BTP، ISO 27001 SAP BTP، SOC 2 SAP BTP، PCI DSS SAP BTP، NIST 800-53 SAP BTP، SOX ITGC SAP BTP، إدارة الوصول Cloud Foundry",
        "locale": "ar"
      },
      "bg": {
        "title": "BTP xID | Управление на служебни ключове на SAP BTP: Собственик, Изтичане, Ротация | TerraBT",
        "description": "Служебните ключове на SAP BTP нямат собственик, дата на изтичане или запис на предназначението. BTP xID добавя собственик, предназначение, дата на изтичане и проследяване на ротацията към всяко удостоверение и предоставя единен изглед на потребителите и ключовете в целия ви ландшафт, доказателство за одити по ISO 27001, SOC 2, PCI DSS, NIST 800-53 и SOX.",
        "keywords": "управление на служебни ключове SAP BTP, BTP xID, ротация на удостоверения SAP BTP, доказателство за съответствие SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, управление на достъпа Cloud Foundry",
        "locale": "bg"
      },
      "cs": {
        "title": "BTP xID | Správa servisních klíčů SAP BTP: Vlastník, Platnost, Rotace | TerraBT",
        "description": "Servisní klíče SAP BTP nemají vlastníka, datum vypršení platnosti ani záznam o účelu. BTP xID přidává vlastníka, účel, datum vypršení platnosti a sledování rotace ke každému přihlašovacímu údaji a poskytuje jednotný přehled uživatelů a klíčů napříč vaším prostředím, důkaz pro audity ISO 27001, SOC 2, PCI DSS, NIST 800-53 a SOX.",
        "keywords": "správa servisních klíčů SAP BTP, BTP xID, rotace přihlašovacích údajů SAP BTP, důkaz o souladu SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, správa přístupu Cloud Foundry",
        "locale": "cs"
      },
      "da": {
        "title": "BTP xID | SAP BTP Servicenøgle-styring: Ejer, Udløb, Rotation | TerraBT",
        "description": "SAP BTP-servicenøgler har ingen ejer, ingen udløbsdato og ingen registrering af formål. BTP xID tilføjer ejer, formål, udløbsdato og rotationssporing til hver legitimationsoplysning og giver ét overblik over brugere og nøgler på tværs af dit landskab, dokumentation til ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- og SOX-revisioner.",
        "keywords": "SAP BTP servicenøgle-styring, BTP xID, SAP BTP legitimationsrotation, SAP BTP compliance-dokumentation, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry adgangsstyring",
        "locale": "da"
      },
      "de": {
        "title": "BTP xID | SAP BTP Service-Key-Governance: Besitzer, Ablauf, Rotation | TerraBT",
        "description": "SAP BTP-Service-Keys haben keinen Besitzer, kein Ablaufdatum und keine Aufzeichnung des Verwendungszwecks. BTP xID fügt jedem Credential einen Besitzer, Zweck, Ablaufdatum und eine Rotationsverfolgung hinzu und bietet eine zentrale Übersicht über Benutzer und Keys in Ihrer gesamten Landschaft, Nachweis für ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- und SOX-Audits.",
        "keywords": "SAP BTP Service-Key-Governance, BTP xID, SAP BTP Credential-Rotation, SAP BTP Compliance-Nachweis, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry Zugriffsverwaltung",
        "locale": "de"
      },
      "el": {
        "title": "BTP xID | Διακυβέρνηση Κλειδιών Υπηρεσίας SAP BTP: Κάτοχος, Λήξη, Εναλλαγή | TerraBT",
        "description": "Τα κλειδιά υπηρεσίας SAP BTP δεν έχουν κάτοχο, ημερομηνία λήξης ή καταγραφή σκοπού. Το BTP xID προσθέτει κάτοχο, σκοπό, ημερομηνία λήξης και παρακολούθηση εναλλαγής σε κάθε διαπιστευτήριο και παρέχει ενιαία προβολή χρηστών και κλειδιών σε όλο το τοπίο σας, αποδεικτικά στοιχεία για ελέγχους ISO 27001, SOC 2, PCI DSS, NIST 800-53 και SOX.",
        "keywords": "διακυβέρνηση κλειδιών υπηρεσίας SAP BTP, BTP xID, εναλλαγή διαπιστευτηρίων SAP BTP, αποδεικτικά συμμόρφωσης SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, διαχείριση πρόσβασης Cloud Foundry",
        "locale": "el"
      },
      "en": {
        "title": "BTP xID | SAP BTP Service Key Governance: Owner, Expiry, Rotation | TerraBT",
        "description": "SAP BTP service keys have no owner, no expiry date, and no record of purpose. BTP xID adds owner, purpose, expiry, and rotation tracking to every credential and one view of users and keys across your landscape, evidence for ISO 27001, SOC 2, PCI DSS, NIST 800-53, and SOX audits.",
        "keywords": "SAP BTP service key governance, BTP xID, SAP BTP credential rotation, SAP BTP compliance evidence, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry access governance",
        "locale": "en"
      },
      "es": {
        "title": "BTP xID | Gobernanza de Claves de Servicio de SAP BTP: Propietario, Caducidad, Rotación | TerraBT",
        "description": "Las claves de servicio de SAP BTP no tienen propietario, fecha de caducidad ni registro de su finalidad. BTP xID añade propietario, finalidad, fecha de caducidad y seguimiento de rotación a cada credencial, y ofrece una vista única de usuarios y claves en todo su panorama, evidencia para auditorías de ISO 27001, SOC 2, PCI DSS, NIST 800-53 y SOX.",
        "keywords": "gobernanza de claves de servicio SAP BTP, BTP xID, rotación de credenciales SAP BTP, evidencia de cumplimiento SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, gestión de acceso Cloud Foundry",
        "locale": "es"
      },
      "et": {
        "title": "BTP xID | SAP BTP teenusevõtmete haldus: omanik, aegumine, rotatsioon | TerraBT",
        "description": "SAP BTP teenusevõtmetel pole omanikku, aegumiskuupäeva ega kasutuseesmärgi kirjet. BTP xID lisab igale mandaadile omaniku, eesmärgi, aegumiskuupäeva ja rotatsiooni jälgimise ning pakub ühte vaadet kasutajatele ja võtmetele kogu teie maastikul, tõendid ISO 27001, SOC 2, PCI DSS, NIST 800-53 ja SOX auditite jaoks.",
        "keywords": "SAP BTP teenusevõtmete haldus, BTP xID, SAP BTP mandaadi rotatsioon, SAP BTP vastavustõend, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry juurdepääsuhaldus",
        "locale": "et"
      },
      "fi": {
        "title": "BTP xID | SAP BTP-palveluavainten hallinta: Omistaja, Vanheneminen, Kierrätys | TerraBT",
        "description": "SAP BTP -palveluavaimilla ei ole omistajaa, vanhenemispäivää eikä tietoa käyttötarkoituksesta. BTP xID lisää omistajan, käyttötarkoituksen, vanhenemispäivän ja kierrätysseurannan jokaiselle tunnistetiedolle ja tarjoaa yhden näkymän käyttäjiin ja avaimiin koko ympäristössäsi, todisteet ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- ja SOX-auditointeja varten.",
        "keywords": "SAP BTP -palveluavainten hallinta, BTP xID, SAP BTP tunnistetietojen kierrätys, SAP BTP vaatimustenmukaisuustodiste, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry pääsynhallinta",
        "locale": "fi"
      },
      "fr": {
        "title": "BTP xID | Gouvernance des Clés de Service SAP BTP: Propriétaire, Expiration, Rotation | TerraBT",
        "description": "Les clés de service SAP BTP n'ont ni propriétaire, ni date d'expiration, ni enregistrement de leur finalité. BTP xID ajoute un propriétaire, une finalité, une date d'expiration et un suivi de rotation à chaque identifiant, et offre une vue unique des utilisateurs et des clés sur l'ensemble de votre paysage, des preuves pour les audits ISO 27001, SOC 2, PCI DSS, NIST 800-53 et SOX.",
        "keywords": "gouvernance des clés de service SAP BTP, BTP xID, rotation des identifiants SAP BTP, preuve de conformité SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, gestion des accès Cloud Foundry",
        "locale": "fr"
      },
      "he": {
        "title": "BTP xID | ניהול מפתחות שירות של SAP BTP: בעלים, תפוגה, רוטציה | TerraBT",
        "description": "למפתחות שירות של SAP BTP אין בעלים, אין תאריך תפוגה ואין תיעוד של המטרה. BTP xID מוסיף בעלים, מטרה, תאריך תפוגה ומעקב רוטציה לכל אישור, ומספק תצוגה אחת של משתמשים ומפתחות בכל הנוף שלך, הוכחה לביקורות ISO 27001, SOC 2, PCI DSS, NIST 800-53 ו-SOX.",
        "keywords": "ניהול מפתחות שירות SAP BTP, BTP xID, רוטציית אישורים SAP BTP, הוכחת ציות SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, ניהול גישה Cloud Foundry",
        "locale": "he"
      },
      "hr": {
        "title": "BTP xID | Upravljanje servisnim ključevima SAP BTP: Vlasnik, Isteklost, Rotacija | TerraBT",
        "description": "Servisni ključevi SAP BTP nemaju vlasnika, datum isteka ni zapis o namjeni. BTP xID dodaje vlasnika, namjenu, datum isteka i praćenje rotacije svakoj vjerodajnici te pruža jedinstven prikaz korisnika i ključeva u cijelom vašem okruženju, dokaz za revizije ISO 27001, SOC 2, PCI DSS, NIST 800-53 i SOX.",
        "keywords": "upravljanje servisnim ključevima SAP BTP, BTP xID, rotacija vjerodajnica SAP BTP, dokaz usklađenosti SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, upravljanje pristupom Cloud Foundry",
        "locale": "hr"
      },
      "hu": {
        "title": "BTP xID | SAP BTP szolgáltatáskulcs-felügyelet: Tulajdonos, Lejárat, Rotáció | TerraBT",
        "description": "A SAP BTP szolgáltatáskulcsoknak nincs tulajdonosuk, lejárati dátumuk vagy céljukra vonatkozó nyilvántartásuk. A BTP xID minden hitelesítő adathoz hozzáad egy tulajdonost, célt, lejárati dátumot és rotációkövetést, és egyetlen áttekintést nyújt a felhasználókról és kulcsokról a teljes környezetében, bizonyíték az ISO 27001, SOC 2, PCI DSS, NIST 800-53 és SOX auditokhoz.",
        "keywords": "SAP BTP szolgáltatáskulcs-felügyelet, BTP xID, SAP BTP hitelesítő adat rotáció, SAP BTP megfelelőségi bizonyíték, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry hozzáférés-felügyelet",
        "locale": "hu"
      },
      "it": {
        "title": "BTP xID | Governance delle Chiavi di Servizio SAP BTP: Proprietario, Scadenza, Rotazione | TerraBT",
        "description": "Le chiavi di servizio SAP BTP non hanno un proprietario, una data di scadenza o una registrazione dello scopo. BTP xID aggiunge proprietario, scopo, data di scadenza e tracciamento della rotazione a ogni credenziale, offrendo una vista unica di utenti e chiavi in tutto il tuo panorama, prove per gli audit ISO 27001, SOC 2, PCI DSS, NIST 800-53 e SOX.",
        "keywords": "governance delle chiavi di servizio SAP BTP, BTP xID, rotazione delle credenziali SAP BTP, prova di conformità SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, gestione degli accessi Cloud Foundry",
        "locale": "it"
      },
      "ja": {
        "title": "BTP xID | SAP BTP サービスキーガバナンス: 所有者、有効期限、ローテーション | TerraBT",
        "description": "SAP BTP のサービスキーには所有者も有効期限も用途の記録もありません。BTP xID はすべての認証情報に所有者、用途、有効期限、ローテーション追跡を追加し、ランドスケープ全体のユーザーとキーを一元的に可視化します, ISO 27001、SOC 2、PCI DSS、NIST 800-53、SOX 監査のためのエビデンスとなります。",
        "keywords": "SAP BTP サービスキーガバナンス, BTP xID, SAP BTP 認証情報ローテーション, SAP BTP コンプライアンスエビデンス, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry アクセス管理",
        "locale": "ja"
      },
      "ko": {
        "title": "BTP xID | SAP BTP 서비스 키 거버넌스: 소유자, 만료, 교체 | TerraBT",
        "description": "SAP BTP 서비스 키에는 소유자, 만료일, 용도 기록이 없습니다. BTP xID는 모든 자격 증명에 소유자, 용도, 만료일, 교체 추적 기능을 추가하고 전체 랜드스케이프에서 사용자와 키를 하나의 화면으로 볼 수 있게 해줍니다, ISO 27001, SOC 2, PCI DSS, NIST 800-53, SOX 감사를 위한 증거 자료입니다.",
        "keywords": "SAP BTP 서비스 키 거버넌스, BTP xID, SAP BTP 자격 증명 교체, SAP BTP 컴플라이언스 증거, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry 액세스 관리",
        "locale": "ko"
      },
      "lt": {
        "title": "BTP xID | SAP BTP paslaugų raktų valdymas: Savininkas, Galiojimas, Rotacija | TerraBT",
        "description": "SAP BTP paslaugų raktai neturi savininko, galiojimo pabaigos datos ar paskirties įrašo. BTP xID prie kiekvieno kredencialo prideda savininką, paskirtį, galiojimo pabaigos datą ir rotacijos sekimą bei pateikia vieną vartotojų ir raktų vaizdą visoje jūsų aplinkoje, įrodymus ISO 27001, SOC 2, PCI DSS, NIST 800-53 ir SOX auditams.",
        "keywords": "SAP BTP paslaugų raktų valdymas, BTP xID, SAP BTP kredencialų rotacija, SAP BTP atitikties įrodymas, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry prieigos valdymas",
        "locale": "lt"
      },
      "lv": {
        "title": "BTP xID | SAP BTP pakalpojumu atslēgu pārvaldība: Īpašnieks, Derīgums, Rotācija | TerraBT",
        "description": "SAP BTP pakalpojumu atslēgām nav īpašnieka, derīguma termiņa vai izmantošanas mērķa ieraksta. BTP xID pievieno īpašnieku, mērķi, derīguma termiņu un rotācijas izsekošanu katrai akreditācijai un nodrošina vienotu lietotāju un atslēgu skatu visā jūsu vidē, pierādījumus ISO 27001, SOC 2, PCI DSS, NIST 800-53 un SOX auditiem.",
        "keywords": "SAP BTP pakalpojumu atslēgu pārvaldība, BTP xID, SAP BTP akreditācijas rotācija, SAP BTP atbilstības pierādījums, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry piekļuves pārvaldība",
        "locale": "lv"
      },
      "nb": {
        "title": "BTP xID | SAP BTP Tjenestenøkkel-styring: Eier, Utløp, Rotasjon | TerraBT",
        "description": "SAP BTP-tjenestenøkler har ingen eier, ingen utløpsdato og ingen registrering av formål. BTP xID legger til eier, formål, utløpsdato og rotasjonssporing til hver legitimasjon, og gir ett samlet overblikk over brukere og nøkler i hele landskapet ditt, dokumentasjon for ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- og SOX-revisjoner.",
        "keywords": "SAP BTP tjenestenøkkel-styring, BTP xID, SAP BTP legitimasjonsrotasjon, SAP BTP samsvarsdokumentasjon, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry tilgangsstyring",
        "locale": "nb"
      },
      "nl": {
        "title": "BTP xID | SAP BTP Servicesleutelbeheer: Eigenaar, Vervaldatum, Rotatie | TerraBT",
        "description": "SAP BTP-servicesleutels hebben geen eigenaar, geen vervaldatum en geen registratie van het doel. BTP xID voegt een eigenaar, doel, vervaldatum en rotatietracking toe aan elke credential en biedt één overzicht van gebruikers en sleutels in uw hele landschap, bewijs voor ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- en SOX-audits.",
        "keywords": "SAP BTP servicesleutelbeheer, BTP xID, SAP BTP credentialrotatie, SAP BTP compliancebewijs, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry toegangsbeheer",
        "locale": "nl"
      },
      "pl": {
        "title": "BTP xID | Zarządzanie kluczami usług SAP BTP: Właściciel, Wygaśnięcie, Rotacja | TerraBT",
        "description": "Klucze usług SAP BTP nie mają właściciela, daty wygaśnięcia ani zapisu przeznaczenia. BTP xID dodaje właściciela, przeznaczenie, datę wygaśnięcia i śledzenie rotacji do każdego poświadczenia oraz zapewnia jeden widok użytkowników i kluczy w całym środowisku, dowody na potrzeby audytów ISO 27001, SOC 2, PCI DSS, NIST 800-53 i SOX.",
        "keywords": "zarządzanie kluczami usług SAP BTP, BTP xID, rotacja poświadczeń SAP BTP, dowód zgodności SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, zarządzanie dostępem Cloud Foundry",
        "locale": "pl"
      },
      "pt": {
        "title": "BTP xID | Governança de Chaves de Serviço SAP BTP: Proprietário, Expiração, Rotação | TerraBT",
        "description": "As chaves de serviço SAP BTP não têm proprietário, data de expiração nem registro de finalidade. O BTP xID adiciona proprietário, finalidade, data de expiração e rastreamento de rotação a cada credencial, oferecendo uma visão única de usuários e chaves em todo o seu ambiente, evidências para auditorias ISO 27001, SOC 2, PCI DSS, NIST 800-53 e SOX.",
        "keywords": "governança de chaves de serviço SAP BTP, BTP xID, rotação de credenciais SAP BTP, evidência de conformidade SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, gestão de acesso Cloud Foundry",
        "locale": "pt"
      },
      "ro": {
        "title": "BTP xID | Guvernanța Cheilor de Serviciu SAP BTP: Proprietar, Expirare, Rotație | TerraBT",
        "description": "Cheile de serviciu SAP BTP nu au proprietar, dată de expirare sau înregistrare a scopului. BTP xID adaugă proprietar, scop, dată de expirare și urmărire a rotației pentru fiecare acreditare și oferă o vizualizare unică a utilizatorilor și cheilor în întregul peisaj, dovezi pentru auditurile ISO 27001, SOC 2, PCI DSS, NIST 800-53 și SOX.",
        "keywords": "guvernanța cheilor de serviciu SAP BTP, BTP xID, rotația acreditărilor SAP BTP, dovada conformității SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, gestionarea accesului Cloud Foundry",
        "locale": "ro"
      },
      "ru": {
        "title": "BTP xID | Управление сервисными ключами SAP BTP: Владелец, Истечение, Ротация | TerraBT",
        "description": "Сервисные ключи SAP BTP не имеют владельца, срока действия и записи о назначении. BTP xID добавляет владельца, назначение, срок действия и отслеживание ротации для каждого учётного данных, а также предоставляет единый обзор пользователей и ключей во всём вашем ландшафте, доказательства для аудитов ISO 27001, SOC 2, PCI DSS, NIST 800-53 и SOX.",
        "keywords": "управление сервисными ключами SAP BTP, BTP xID, ротация учётных данных SAP BTP, доказательство соответствия SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, управление доступом Cloud Foundry",
        "locale": "ru"
      },
      "sk": {
        "title": "BTP xID | Správa servisných kľúčov SAP BTP: Vlastník, Platnosť, Rotácia | TerraBT",
        "description": "Servisné kľúče SAP BTP nemajú vlastníka, dátum vypršania platnosti ani záznam o účele. BTP xID pridáva vlastníka, účel, dátum vypršania platnosti a sledovanie rotácie ku každému poverovaciemu údaju a poskytuje jednotný prehľad používateľov a kľúčov v celom vašom prostredí, dôkazy pre audity ISO 27001, SOC 2, PCI DSS, NIST 800-53 a SOX.",
        "keywords": "správa servisných kľúčov SAP BTP, BTP xID, rotácia poverovacích údajov SAP BTP, dôkaz o súlade SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, správa prístupu Cloud Foundry",
        "locale": "sk"
      },
      "sl": {
        "title": "BTP xID | Upravljanje servisnih ključev SAP BTP: Lastnik, Potek, Rotacija | TerraBT",
        "description": "Servisni ključi SAP BTP nimajo lastnika, datuma poteka ali zapisa namena. BTP xID doda lastnika, namen, datum poteka in sledenje rotaciji vsakemu poverilnici ter zagotavlja enoten pregled uporabnikov in ključev v celotnem okolju, dokaze za revizije ISO 27001, SOC 2, PCI DSS, NIST 800-53 in SOX.",
        "keywords": "upravljanje servisnih ključev SAP BTP, BTP xID, rotacija poverilnic SAP BTP, dokazilo o skladnosti SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, upravljanje dostopa Cloud Foundry",
        "locale": "sl"
      },
      "sv": {
        "title": "BTP xID | SAP BTP Tjänstenyckelstyrning: Ägare, Utgång, Rotation | TerraBT",
        "description": "SAP BTP-tjänstenycklar har ingen ägare, inget utgångsdatum och ingen registrering av syfte. BTP xID lägger till ägare, syfte, utgångsdatum och rotationsspårning till varje autentiseringsuppgift och ger en enda vy över användare och nycklar i hela din miljö, bevis för ISO 27001-, SOC 2-, PCI DSS-, NIST 800-53- och SOX-revisioner.",
        "keywords": "SAP BTP tjänstenyckelstyrning, BTP xID, SAP BTP autentiseringsrotation, SAP BTP efterlevnadsbevis, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry åtkomststyrning",
        "locale": "sv"
      },
      "sw": {
        "title": "BTP xID | Usimamizi wa Funguo za Huduma za SAP BTP: Mmiliki, Muda wa Kuisha, Mzunguko | TerraBT",
        "description": "Funguo za huduma za SAP BTP hazina mmiliki, tarehe ya kuisha, au rekodi ya madhumuni. BTP xID inaongeza mmiliki, madhumuni, tarehe ya kuisha, na ufuatiliaji wa mzunguko kwa kila kitambulisho na kutoa mtazamo mmoja wa watumiaji na funguo katika mazingira yako yote, ushahidi kwa ukaguzi wa ISO 27001, SOC 2, PCI DSS, NIST 800-53, na SOX.",
        "keywords": "usimamizi wa funguo za huduma SAP BTP, BTP xID, mzunguko wa vitambulisho SAP BTP, ushahidi wa uzingatiaji SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, usimamizi wa ufikiaji Cloud Foundry",
        "locale": "sw"
      },
      "tr": {
        "title": "BTP xID | SAP BTP Servis Anahtarı Yönetişimi: Sahip, Son Kullanma, Rotasyon | TerraBT",
        "description": "SAP BTP servis anahtarlarının sahibi, son kullanma tarihi veya amaç kaydı yoktur. BTP xID her kimlik bilgisine sahip, amaç, son kullanma tarihi ve rotasyon takibi ekler ve tüm ortamınızdaki kullanıcıların ve anahtarların tek bir görünümünü sunar, ISO 27001, SOC 2, PCI DSS, NIST 800-53 ve SOX denetimleri için kanıt.",
        "keywords": "SAP BTP servis anahtarı yönetişimi, BTP xID, SAP BTP kimlik bilgisi rotasyonu, SAP BTP uyumluluk kanıtı, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry erişim yönetimi",
        "locale": "tr"
      },
      "uk": {
        "title": "BTP xID | Управління сервісними ключами SAP BTP: Власник, Термін дії, Ротація | TerraBT",
        "description": "Сервісні ключі SAP BTP не мають власника, терміну дії чи запису призначення. BTP xID додає власника, призначення, термін дії та відстеження ротації до кожного облікового даного і надає єдиний огляд користувачів і ключів у всьому вашому ландшафті, докази для аудитів ISO 27001, SOC 2, PCI DSS, NIST 800-53 та SOX.",
        "keywords": "управління сервісними ключами SAP BTP, BTP xID, ротація облікових даних SAP BTP, доказ відповідності SAP BTP, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, управління доступом Cloud Foundry",
        "locale": "uk"
      },
      "zh": {
        "title": "BTP xID | SAP BTP 服务密钥治理: 所有者、到期、轮换 | TerraBT",
        "description": "SAP BTP 服务密钥没有所有者、没有到期日期，也没有用途记录。BTP xID 为每个凭证添加所有者、用途、到期日期和轮换跟踪，并在整个环境中提供用户和密钥的统一视图, 为 ISO 27001、SOC 2、PCI DSS、NIST 800-53 和 SOX 审计提供证据。",
        "keywords": "SAP BTP 服务密钥治理, BTP xID, SAP BTP 凭证轮换, SAP BTP 合规证据, ISO 27001 SAP BTP, SOC 2 SAP BTP, PCI DSS SAP BTP, NIST 800-53 SAP BTP, SOX ITGC SAP BTP, Cloud Foundry 访问管理",
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

        // 4. Canonical Tag, always the language-neutral (English) URL
        // This ensures Google indexes and shows www.terrabt.com/ not www.terrabt.com/de/
        // regardless of which language variant is being served.
        const canonicalUrl = buildUrl('en');

        element.append(
          `<link rel="canonical" href="${canonicalUrl}" />`,
          { html: true }
        );

        // 5. Hreflang Tag — English only now. SEO_DATA still holds every
        // other language's translated copy (kept, not deleted), but it's no
        // longer advertised as a reachable alternate: those paths redirect
        // here instead of serving a page, so they shouldn't be hreflang'd.
        element.append(
          `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`,
          { html: true }
        );

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

    return new Response(finalResponse.body, {
      status: finalResponse.status,
      statusText: finalResponse.statusText,
      headers: newHeaders
    });
  }
};