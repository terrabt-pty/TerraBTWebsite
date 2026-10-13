// Disabled: the site is English-only now. This used to detect the visitor's
// preferred language (cookie/Worker-detected/browser) and redirect them to
// the matching /:lang URL. Kept as a file (not deleted, per the decision to
// keep translations/pages intact) in case multi-language support is ever
// turned back on, but it intentionally does nothing while that decision
// stands — the Cloudflare Worker also redirects any /:lang path straight to
// its English equivalent, so this component has nothing left to do anyway.
export default function LanguageRedirect() {
  return null;
}
