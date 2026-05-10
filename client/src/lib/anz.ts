const BYPASS_TOKEN = "TerraBT-Mobile-Access";

function hasBypass(): boolean {
  if (typeof window === "undefined") return false;
  // 1. URL parameter
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("access_token") === BYPASS_TOKEN) return true;
  } catch {}
  // 2. Cookie set by Worker on previous visit with the URL parameter
  if (typeof document !== "undefined" && document.cookie.includes(`terrabt_bypass=${BYPASS_TOKEN}`)) return true;
  return false;
}

export function isANZ(): boolean {
  if (hasBypass()) return false;
  if (typeof window === "undefined") return false;
  return window.GEO_COUNTRY === "AU" || window.GEO_COUNTRY === "NZ";
}
