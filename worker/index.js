/**
 * Optimized Cloudflare Worker for TerraBT
 * Supports both URL paths and SPA query-string paths (GitHub Pages pattern)
 * Includes fix for URL-encoded characters in search queries.
 */
export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const url = new URL(request.url);
    
    const langMap = {
  "en": "en",
  "en-gb": "en-GB",
  "de-de": "de-DE",
  "de": "de-DE",
  "de-at": "de-AT",
  "de-ch": "de-CH",
  "fr-fr": "fr-FR",
  "fr": "fr-FR",
  "fr-ch": "fr-CH",
  "es-es": "es-ES",
  "es": "es-ES",
  "it-it": "it-IT",
  "it": "it-IT",
  "nl-nl": "nl-NL",
  "nl": "nl-NL",
  "pt-pt": "pt-PT",
  "pt": "pt-PT",
  "sv-se": "sv-SE",
  "sv": "sv-SE",
  "da-dk": "da-DK",
  "da": "da-DK",
  "nb-no": "nb-NO",
  "nb": "nb-NO",
  "fi-fi": "fi-FI",
  "fi": "fi-FI",
  "pl-pl": "pl-PL",
  "pl": "pl-PL",
  "cs-cz": "cs-CZ",
  "cs": "cs-CZ",
  "hu-hu": "hu-HU",
  "hu": "hu-HU",
  "ro-ro": "ro-RO",
  "ro": "ro-RO",
  "sk-sk": "sk-SK",
  "sk": "sk-SK",
  "sl-si": "sl-SI",
  "sl": "sl-SI",
  "hr-hr": "hr-HR",
  "hr": "hr-HR",
  "bg-bg": "bg-BG",
  "bg": "bg-BG",
  "uk-ua": "uk-UA",
  "uk": "uk-UA",
  "ru-ru": "ru-RU",
  "ru": "ru-RU",
  "lt-lt": "lt-LT",
  "lt": "lt-LT",
  "lv-lv": "lv-LV",
  "lv": "lv-LV",
  "et-ee": "et-EE",
  "et": "et-EE",
  "el-gr": "el-GR",
  "el": "el-GR",
  "nl-be": "nl-BE",
  "fr-be": "fr-BE",
  "en-us": "en-US",
  "en-ca": "en-CA",
  "fr-ca": "fr-CA",
  "es-mx": "es-MX",
  "es-ar": "es-AR",
  "es-co": "es-CO",
  "es-cl": "es-CL",
  "es-pe": "es-PE",
  "es-gt": "es-GT",
  "es-cr": "es-CR",
  "pt-br": "pt-BR",
  "zh-cn": "zh-CN",
  "zh": "zh-CN",
  "zh-tw": "zh-TW",
  "ja-jp": "ja-JP",
  "ja": "ja-JP",
  "ko-kr": "ko-KR",
  "ko": "ko-KR",
  "en-sg": "en-SG",
  "en-my": "en-MY",
  "en-id": "en-ID",
  "en-ph": "en-PH",
  "en-th": "en-TH",
  "en-vn": "en-VN",
  "en-in": "en-IN",
  "en-pk": "en-PK",
  "en-bd": "en-BD",
  "en-lk": "en-LK",
  "ar-ae": "ar-AE",
  "ar": "ar-AE",
  "ar-sa": "ar-SA",
  "ar-eg": "ar-EG",
  "en-ae": "en-AE",
  "en-sa": "en-SA",
  "he-il": "he-IL",
  "he": "he-IL",
  "tr-tr": "tr-TR",
  "tr": "tr-TR",
  "am-et": "am-ET",
  "am": "am-ET",
  "en-ke": "en-KE",
  "en-za": "en-ZA",
  "en-ng": "en-NG",
  "en-gh": "en-GH",
  "fr-sn": "fr-SN",
  "fr-ci": "fr-CI",
  "fr-cm": "fr-CM",
  "pt-ao": "pt-AO",
  "pt-mz": "pt-MZ"
};

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
      const detectedSegment = segments[0].toLowerCase().trim();
      if (langMap[detectedSegment]) {
        matchedCode = langMap[detectedSegment];
        status = "Success";
      }
    }

    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Language", matchedCode);
    
    // Debugging
    newHeaders.set("X-Language-Matched", matchedCode);
    newHeaders.set("X-Language-Match-Status", status);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};