import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Download,
  ArrowDownToLine,
  Search,
  Filter,
  FileJson,
  Sun,
  Moon,
  Eye,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";

/* ===================================================================
   Claude CLI Conversation Backup & Viewer — Product Landing Page

   A purpose-built desktop app to back up, browse, search, and export
   your Claude CLI conversations. Designed to feel calm, considered,
   and trustworthy — the user is handing us their conversation history,
   so every visual cue should reassure rather than alarm.

   Visual identity: green/teal accents (same family as BTP xID)
   to evoke the AI/Claude family of tools — distinct yet harmonious
   with the rest of the TerraBT product family.
   =================================================================== */

const R2_BASE = "https://updates.terrabt.com/claudecli-backup-tool";
const VERSION_JSON_URL = `${R2_BASE}/version.json`;

interface VersionInfo {
  version: string;
  mac: { arm64: string; x64: string };
  win: { x64: string; portable: string };
}

type OSType = "mac" | "windows" | "unknown";

function detectOS(): OSType {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  return "unknown";
}

function detectArch(): "arm64" | "x64" {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("arm") || ua.includes("aarch64")) return "arm64";
  if (
    typeof navigator !== "undefined" &&
    // @ts-expect-error userAgentData is not in all browsers
    navigator.userAgentData?.platform === "macOS"
  ) {
    return "arm64"; // Most modern Macs are Apple Silicon
  }
  return "x64";
}

const OS_ICONS: Record<OSType, React.ComponentType<{ className?: string }>> = {
  mac: FaApple,
  windows: FaWindows,
  unknown: Download,
};

interface DownloadOption {
  id: "mac-arm64" | "mac-x64" | "win-installer" | "win-portable";
  label: string;
  desc: string;
  os: OSType;
  arch?: string;
}

const DL_ICONS: Record<DownloadOption["id"], React.ComponentType<{ className?: string }>> = {
  "mac-arm64":     FaApple,
  "mac-x64":       FaApple,
  "win-installer": FaWindows,
  "win-portable":  FaWindows,
};

const ALL_DOWNLOADS: DownloadOption[] = [
  {
    id: "mac-arm64",
    label: "macOS — Apple Silicon",
    desc: "DMG · for M1, M2, M3 and newer Macs",
    os: "mac",
    arch: "arm64",
  },
  {
    id: "mac-x64",
    label: "macOS — Intel",
    desc: "DMG · for older Intel-based Macs",
    os: "mac",
    arch: "x64",
  },
  {
    id: "win-installer",
    label: "Windows — Installer",
    desc: "NSIS installer · recommended for most users",
    os: "windows",
    arch: "x64",
  },
  {
    id: "win-portable",
    label: "Windows — Portable",
    desc: "Single .exe · no installation required",
    os: "windows",
    arch: "x64",
  },
];

function getDownloadUrl(id: DownloadOption["id"], v: VersionInfo): string {
  const map: Record<DownloadOption["id"], string> = {
    "mac-arm64":     `${R2_BASE}/${v.mac.arm64}`,
    "mac-x64":       `${R2_BASE}/${v.mac.x64}`,
    "win-installer": `${R2_BASE}/${v.win.x64}`,
    "win-portable":  `${R2_BASE}/${v.win.portable}`,
  };
  return map[id];
}

function getPrimaryDownload(os: OSType, arch: string): DownloadOption {
  if (os === "mac") {
    return (
      ALL_DOWNLOADS.find((d) => d.os === "mac" && d.arch === arch) ??
      ALL_DOWNLOADS[0]
    );
  }
  if (os === "windows") {
    return ALL_DOWNLOADS.find((d) => d.id === "win-installer")!;
  }
  return ALL_DOWNLOADS[0];
}

/* --- Floating value-prop messages — cycled in the hero visual --- */
const VALUE_PROPS: Array<{ text: string; dot: string }> = [
  { text: "Smart delta backup", dot: "#5AC765" },
  { text: "Search every conversation", dot: "#4CAF50" },
  { text: "Filter by message type", dot: "#2A7088" },
  { text: "Works offline · 100% local", dot: "#E8A838" },
  { text: "Export as Markdown", dot: "#5AC765" },
  { text: "Light & dark themes", dot: "#1E5099" },
  { text: "Works offline · 100% local", dot: "#4CAF50" },
];

const FEATURES: Array<{
  Icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  title: string;
  description: string;
}> = [
  {
    Icon: ArrowDownToLine,
    colorClass: "ccv-fi-green",
    title: "One-touch delta backup",
    description:
      "Smart incremental sync. New conversations get a full copy; existing ones only append the new messages. Backups stay fast and your disk stays light.",
  },
  {
    Icon: MessageSquare,
    colorClass: "ccv-fi-blue",
    title: "Browse live projects",
    description:
      "See every active Claude CLI conversation in real time, organised by project. No more digging through hidden folders.",
  },
  {
    Icon: Search,
    colorClass: "ccv-fi-teal",
    title: "Powerful search",
    description:
      "Find that one thing you said three weeks ago. Search within a single conversation or across every conversation you have ever had — instantly.",
  },
  {
    Icon: Filter,
    colorClass: "ccv-fi-green",
    title: "Message filtering",
    description:
      "Toggle visibility of User, Claude, Thinking, Tool Use, and Tool Result messages. See exactly what you need, hide the rest.",
  },
  {
    Icon: FileJson,
    colorClass: "ccv-fi-blue",
    title: "Export & copy",
    description:
      "Save any conversation as formatted JSON for archiving, sharing, or pipelines. Copy single messages or whole threads to the clipboard.",
  },
  {
    Icon: Sun,
    colorClass: "ccv-fi-teal",
    title: "Light & dark themes",
    description:
      "Switch between light and full dark mode at any time. Comfortable to read at 9am or at midnight, on any monitor.",
  },
];

export default function ClaudeCliProduct() {
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [showSmartScreenNotice, setShowSmartScreenNotice] = useState(false);
  const [cardRound, setCardRound] = useState(0);
  const [cardsFading, setCardsFading] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const { getLocalizedPath } = useLocalizedPath();

  useEffect(() => {
    setOS(detectOS());
    setArch(detectArch());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardsFading(true);
      setTimeout(() => {
        setCardRound((r) => r + 1);
        setCardsFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(VERSION_JSON_URL)
      .then((r) => r.json())
      .then((data: VersionInfo) => setVersionInfo(data))
      .catch(() => { /* stays null — buttons remain in loading state */ });
  }, []);

  const primaryDownload = getPrimaryDownload(os, arch);
  const PrimaryIcon = OS_ICONS[os];
  const primaryDownloadUrl = versionInfo ? getDownloadUrl(primaryDownload.id, versionInfo) : null;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Claude CLI Backup & Viewer — Desktop app by TerraBT"
        description="A desktop app to back up, view, search, and export your Claude CLI conversations. Smart delta sync, powerful search, message filtering, Markdown export. macOS and Windows."
        path="/products/claude-cli"
      />
      <Navigation />

      {/* ===== HERO WITH DOWNLOAD ===== */}
      <section className="ccv-hero" id="home" data-testid="section-ccv-hero">
        <div className="ccv-grid" />
        <div className="ccv-orb ccv-orb-1" />
        <div className="ccv-orb ccv-orb-2" />
        <div className="ccv-orb ccv-orb-3" />

        <div className="ccv-hero-inner">
          <div className="ccv-hero-content">
            <div className="ccv-app-icon-wrap">
              <div className="ccv-app-icon" aria-hidden="true">
                <Sparkles className="ccv-app-icon-glyph" />
              </div>
            </div>


            <h1 className="ccv-title" data-testid="text-ccv-hero-title">
              Your Claude CLI conversations,
              <br />
              <span className="ccv-highlight">backed up</span>
              <br />
              <span className="ccv-highlight">and searchable.</span>
            </h1>

            <p className="ccv-subtitle">
              A calm, local-first desktop app that quietly backs up every Claude CLI
              conversation, then lets you search, filter, and export them whenever
              you need to find something.
            </p>

            <div className="ccv-hero-dl">
              {primaryDownloadUrl ? (
                <a
                  href={primaryDownloadUrl}
                  className="ccv-download-btn"
                  data-testid="link-ccv-hero-download"
                  onClick={() => { if (os === "windows") setShowSmartScreenNotice(true); }}
                >
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="ccv-download-btn-text">
                    <span className="ccv-download-btn-title">
                      Download for {primaryDownload.label}
                    </span>
                    <span className="ccv-download-btn-desc">
                      {primaryDownload.desc} · v{versionInfo!.version}
                    </span>
                  </div>
                  <Download className="h-5 w-5" />
                </a>
              ) : (
                <button
                  disabled
                  className="ccv-download-btn"
                  style={{ opacity: 0.7 }}
                  data-testid="button-ccv-hero-download-loading"
                >
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="ccv-download-btn-text">
                    <span className="ccv-download-btn-title">Preparing download…</span>
                    <span className="ccv-download-btn-desc">{primaryDownload.desc}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => { setShowAllDownloads(true); scrollToSection("#download"); }}
                className="ccv-download-other"
                data-testid="link-ccv-hero-show-all"
              >
                See all downloads (macOS Intel, Windows Portable)
              </button>
            </div>
          </div>

          <div className="ccv-visual" aria-hidden="true">
            <div className="ccv-icon-showcase">
              {/* CSS-only mock window — a calm, abstract preview while no screenshot exists */}
              <div className="ccv-window-frame" data-testid="visual-ccv-window">
                <div className="ccv-window-bar">
                  <span className="ccv-window-dot ccv-window-dot-r" />
                  <span className="ccv-window-dot ccv-window-dot-y" />
                  <span className="ccv-window-dot ccv-window-dot-g" />
                  <span className="ccv-window-title">Claude CLI Backup</span>
                </div>
                <div className="ccv-window-body">
                  <div className="ccv-window-sidebar">
                    <div className="ccv-window-search">
                      <Search className="ccv-window-search-icon" />
                      <span className="ccv-window-search-text">Search conversations…</span>
                    </div>
                    <div className="ccv-window-list">
                      <div className="ccv-window-list-item ccv-window-list-active">
                        <span className="ccv-window-bullet" />
                        <span className="ccv-window-line ccv-w-80" />
                      </div>
                      <div className="ccv-window-list-item">
                        <span className="ccv-window-bullet ccv-window-bullet-mute" />
                        <span className="ccv-window-line ccv-w-65" />
                      </div>
                      <div className="ccv-window-list-item">
                        <span className="ccv-window-bullet ccv-window-bullet-mute" />
                        <span className="ccv-window-line ccv-w-72" />
                      </div>
                      <div className="ccv-window-list-item">
                        <span className="ccv-window-bullet ccv-window-bullet-mute" />
                        <span className="ccv-window-line ccv-w-50" />
                      </div>
                    </div>
                  </div>
                  <div className="ccv-window-main">
                    <div className="ccv-window-msg ccv-window-msg-user">
                      <div className="ccv-window-msg-meta">You</div>
                      <div className="ccv-window-msg-line ccv-w-90" />
                      <div className="ccv-window-msg-line ccv-w-70" />
                    </div>
                    <div className="ccv-window-msg ccv-window-msg-assistant">
                      <div className="ccv-window-msg-meta ccv-window-msg-meta-claude">Claude</div>
                      <div className="ccv-window-msg-line ccv-w-95" />
                      <div className="ccv-window-msg-line ccv-w-85" />
                      <div className="ccv-window-msg-line ccv-w-60" />
                    </div>
                    <div className="ccv-window-msg ccv-window-msg-tool">
                      <div className="ccv-window-msg-meta ccv-window-msg-meta-tool">Tool use</div>
                      <div className="ccv-window-msg-line ccv-w-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating value-prop cards — cycle through all messages */}
              {[0, 2, 4, 6].map((offset, i) => {
                const prop = VALUE_PROPS[(cardRound + offset) % VALUE_PROPS.length];
                return (
                  <div
                    key={i}
                    className={`ccv-float-card ccv-fc-${i + 1}`}
                    style={{ opacity: cardsFading ? 0 : 1, transition: "opacity 0.3s ease" }}
                  >
                    <span className="ccv-dot" style={{ background: prop.dot }} />
                    {prop.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="ccv-features" id="features" data-testid="section-ccv-features">
        <div className="ccv-features-header">
          <div className="ccv-features-label">What it does</div>
          <h2 className="ccv-features-title">
            Quietly thorough.
            <br />
            Surprisingly fast.
          </h2>
          <p className="ccv-features-sub">
            Six small features that, together, mean you never lose a Claude CLI
            conversation again.
          </p>
        </div>

        <div className="ccv-features-grid">
          {FEATURES.map(({ Icon, colorClass, title, description }) => (
            <div
              key={title}
              className="ccv-feature-card"
              data-testid={`card-ccv-feature-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <div className={`ccv-feature-icon ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS — three calm steps ===== */}
      <section className="ccv-howitworks" data-testid="section-ccv-howitworks">
        <div className="ccv-howitworks-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">How it works</div>
            <h2 className="ccv-features-title">
              Three steps. That's the whole thing.
            </h2>
          </div>

          <div className="ccv-steps">
            <div className="ccv-step">
              <div className="ccv-step-num">1</div>
              <h3>Install &amp; open</h3>
              <p>
                Download once, install in seconds. The app finds your Claude CLI
                conversations automatically — no setup, no configuration.
              </p>
            </div>
            <div className="ccv-step">
              <div className="ccv-step-num">2</div>
              <h3>Back up with one click</h3>
              <p>
                Press the backup button. Smart delta sync only copies what's new,
                so the second backup is dramatically faster than the first.
              </p>
            </div>
            <div className="ccv-step">
              <div className="ccv-step-num">3</div>
              <h3>Search, filter, export</h3>
              <p>
                Browse, search across everything, filter by message type, and
                export anything you want as Markdown or copy to your clipboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST / WHY YOU CAN TRUST IT ===== */}
      <section className="ccv-trust" data-testid="section-ccv-trust">
        <div className="ccv-trust-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">Built with care</div>
            <h2 className="ccv-features-title">
              Local-first. Private by default.
            </h2>
            <p className="ccv-features-sub">
              Your conversations never leave your computer unless you choose to
              export them. The app does not phone home, does not collect telemetry,
              and works without an internet connection.
            </p>
          </div>

          <div className="ccv-trust-grid">
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">🔒</div>
              <h3>100% local</h3>
              <p>All backups live on your machine, in a folder you choose. Nothing is uploaded anywhere.</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">📡</div>
              <h3>No telemetry</h3>
              <p>The app does not track usage, doesn't collect analytics, and doesn't need an account to work.</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">
                <Eye className="h-5 w-5" />
              </div>
              <h3>You stay in control</h3>
              <p>Open backups in any text editor. The format is standard JSON — your data, in your hands, forever.</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">
                <Moon className="h-5 w-5" />
              </div>
              <h3>Made for late nights</h3>
              <p>Full dark mode that won't tire your eyes when you're searching at 1am for that thing you said last week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD ===== */}
      <section className="ccv-download" id="download" data-testid="section-ccv-download">
        <div className="ccv-download-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">Download</div>
            <h2 className="ccv-features-title">
              Get the app.
            </h2>
            <p className="ccv-features-sub">
              Available on macOS and Windows. No account required.
            </p>
          </div>

          {/* Primary OS download */}
          <div className="ccv-download-primary">
            {primaryDownloadUrl ? (
              <a
                href={primaryDownloadUrl}
                className="ccv-download-btn"
                onClick={() => { if (os === "windows") setShowSmartScreenNotice(true); }}
                data-testid="link-ccv-download-primary"
              >
                <PrimaryIcon className="h-6 w-6" />
                <div className="ccv-download-btn-text">
                  <span className="ccv-download-btn-title">
                    Download for {primaryDownload.label}
                  </span>
                  <span className="ccv-download-btn-desc">
                    {primaryDownload.desc} · v{versionInfo!.version}
                  </span>
                </div>
                <Download className="h-5 w-5" />
              </a>
            ) : (
              <button
                disabled
                className="ccv-download-btn"
                style={{ opacity: 0.7 }}
                data-testid="button-ccv-download-loading"
              >
                <PrimaryIcon className="h-6 w-6" />
                <div className="ccv-download-btn-text">
                  <span className="ccv-download-btn-title">Preparing download…</span>
                  <span className="ccv-download-btn-desc">{primaryDownload.desc}</span>
                </div>
                <Download className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => {
                const next = !showAllDownloads;
                setShowAllDownloads(next);
                if (next && os === "windows") setShowSmartScreenNotice(true);
              }}
              className="ccv-download-other"
              data-testid="button-ccv-toggle-all"
            >
              {showAllDownloads ? "Hide other downloads" : "Show all downloads"}
            </button>
          </div>

          {/* All download options */}
          {showAllDownloads && (
            <div className="ccv-download-grid" data-testid="grid-ccv-all-downloads">
              {ALL_DOWNLOADS.map((dl) => {
                const url = versionInfo ? getDownloadUrl(dl.id, versionInfo) : null;
                const DlIcon = DL_ICONS[dl.id];
                return url ? (
                  <a
                    key={dl.id}
                    href={url}
                    className="ccv-download-option"
                    data-testid={`link-ccv-download-${dl.id}`}
                  >
                    <div>
                      <div className="ccv-download-option-label">{dl.label}</div>
                      <div className="ccv-download-option-desc">{dl.desc}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </a>
                ) : (
                  <button
                    key={dl.id}
                    disabled
                    className="ccv-download-option"
                    style={{ opacity: 0.7 }}
                    data-testid={`button-ccv-download-${dl.id}-loading`}
                  >
                    <div>
                      <div className="ccv-download-option-label">{dl.label}</div>
                      <div className="ccv-download-option-desc">{dl.desc}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Windows SmartScreen notice — same calm, reassuring pattern as BTP xID */}
          {showSmartScreenNotice && (
            <div className="ccv-smartscreen-notice" data-testid="notice-ccv-smartscreen">
              <button
                className="ccv-smartscreen-notice-close"
                onClick={() => setShowSmartScreenNotice(false)}
                aria-label="Dismiss notice"
                data-testid="button-ccv-smartscreen-close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="ccv-smartscreen-notice-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                A quick note for Windows users
              </div>
              <p>
                Windows SmartScreen may show a warning the first time you open the
                app. This is normal for new desktop apps — the certificate just
                hasn't built up reputation yet. To proceed safely:
              </p>
              <ol>
                <li>Click <strong>More info</strong> on the SmartScreen prompt.</li>
                <li>Then click <strong>Run anyway</strong> to launch the app.</li>
              </ol>
            </div>
          )}

          <div className="ccv-download-info">
            <p>
              {versionInfo
                ? `Current version: v${versionInfo.version} · macOS 11+ and Windows 10+`
                : "Loading version information…"}
            </p>
            <p>
              By downloading you agree to our{" "}
              <a href={getLocalizedPath("/terms-of-service")} data-testid="link-ccv-terms">Terms of Service</a>{" "}
              and{" "}
              <a href={getLocalizedPath("/privacy-policy")} data-testid="link-ccv-privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
