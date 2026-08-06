const TRACK_URL = "https://accounts.terrabt.com/api/downloads/track";

export function trackDownload(app: string, version: string, platform: string): void {
  fetch(TRACK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app, version, platform }),
  }).catch(() => {
    // fire-and-forget, never block or surface tracking failures
  });
}
