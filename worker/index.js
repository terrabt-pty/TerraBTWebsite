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

    const response = await fetch(request);

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

    // Use HTMLRewriter to inject the country code into the HTML
    // This allows the client-side React code to know the user's location
    // without needing an additional API call.
    class CountryInjector {
      constructor(country) {
        this.country = country;
      }
      element(element) {
        element.append(`<script>window.GEO_COUNTRY = "${this.country || 'UNKNOWN'}";</script>`, { html: true });
      }
    }

    const contentType = response.headers.get("content-type");

    // Only inject into HTML pages
    let finalResponse = response;
    if (contentType && contentType.includes("text/html")) {
      finalResponse = new HTMLRewriter()
        .on("head", new CountryInjector(country))
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