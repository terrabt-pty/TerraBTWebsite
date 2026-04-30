import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import claudeCliIcon from "@assets/claude-cli-icon.png";
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
  Eye,
  MessageSquare,
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";

/* ===================================================================
   Claude CLI Conversation Backup & Viewer — Product Landing Page
   Visual identity: green/teal accents (same family as BTP xID)
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
    return "arm64";
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
  labelKey: string;
  descKey: string;
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
    labelKey: "claudeCliProduct.downloadOptions.macArm64Label",
    descKey:  "claudeCliProduct.downloadOptions.macArm64Desc",
    os: "mac",
    arch: "arm64",
  },
  {
    id: "mac-x64",
    labelKey: "claudeCliProduct.downloadOptions.macX64Label",
    descKey:  "claudeCliProduct.downloadOptions.macX64Desc",
    os: "mac",
    arch: "x64",
  },
  {
    id: "win-installer",
    labelKey: "claudeCliProduct.downloadOptions.winInstallerLabel",
    descKey:  "claudeCliProduct.downloadOptions.winInstallerDesc",
    os: "windows",
    arch: "x64",
  },
  {
    id: "win-portable",
    labelKey: "claudeCliProduct.downloadOptions.winPortableLabel",
    descKey:  "claudeCliProduct.downloadOptions.winPortableDesc",
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

const VALUE_PROP_DOTS = ["#5AC765", "#4CAF50", "#2A7088", "#E8A838", "#5AC765", "#1E5099", "#4CAF50"];

const FEATURE_DEFS: Array<{
  Icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  key: string;
}> = [
  { Icon: ArrowDownToLine, colorClass: "ccv-fi-green",  key: "deltaBackup" },
  { Icon: MessageSquare,   colorClass: "ccv-fi-blue",   key: "browse"      },
  { Icon: Search,          colorClass: "ccv-fi-teal",   key: "search"      },
  { Icon: Filter,          colorClass: "ccv-fi-green",  key: "filtering"   },
  { Icon: FileJson,        colorClass: "ccv-fi-blue",   key: "export"      },
  { Icon: Sun,             colorClass: "ccv-fi-teal",   key: "themes"      },
];

export default function ClaudeCliProduct() {
  const { t } = useTranslation();
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [showSmartScreenNotice, setShowSmartScreenNotice] = useState(false);
  const [cardRound, setCardRound] = useState(0);
  const [cardsFading, setCardsFading] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const { getLocalizedPath } = useLocalizedPath();

  const VALUE_PROPS = VALUE_PROP_DOTS.map((dot, i) => ({
    text: t(`claudeCliProduct.valueProps.${i}`),
    dot,
  }));

  const FEATURES = FEATURE_DEFS.map(({ Icon, colorClass, key }) => ({
    Icon,
    colorClass,
    title: t(`claudeCliProduct.features.${key}.title`),
    description: t(`claudeCliProduct.features.${key}.description`),
  }));

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
  const primaryDownloadLabel = t(primaryDownload.labelKey);
  const primaryDownloadDesc = t(primaryDownload.descKey);
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
        description={t('claudeCliProduct.meta.description')}
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
              <img src={claudeCliIcon} alt={t('claudeCliProduct.hero.appIconAlt')} className="ccv-app-icon" />
            </div>

            <h1 className="ccv-title" data-testid="text-ccv-hero-title">
              {t('claudeCliProduct.hero.title1')}
              <br />
              <span className="ccv-highlight">{t('claudeCliProduct.hero.title2')}</span>
              <br />
              <span className="ccv-highlight">{t('claudeCliProduct.hero.title3')}</span>
            </h1>

            <p className="ccv-subtitle">
              {t('claudeCliProduct.hero.description')}
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
                      {t('claudeCliProduct.download.primaryButton', { label: primaryDownloadLabel })}
                    </span>
                    <span className="ccv-download-btn-desc">
                      {primaryDownloadDesc} · v{versionInfo!.version}
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
                    <span className="ccv-download-btn-title">{t('claudeCliProduct.download.loading')}</span>
                    <span className="ccv-download-btn-desc">{primaryDownloadDesc}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => { setShowAllDownloads(true); scrollToSection("#download"); }}
                className="ccv-download-other"
                data-testid="link-ccv-hero-show-all"
              >
                {t('claudeCliProduct.hero.showAll')}
              </button>
            </div>
          </div>

          <div className="ccv-visual" aria-hidden="true">
            <div className="ccv-icon-showcase">
              <div className="ccv-window-frame" data-testid="visual-ccv-window">
                <div className="ccv-window-bar">
                  <span className="ccv-window-dot ccv-window-dot-r" />
                  <span className="ccv-window-dot ccv-window-dot-y" />
                  <span className="ccv-window-dot ccv-window-dot-g" />
                  <span className="ccv-window-title">{t('claudeCliProduct.mockup.windowTitle')}</span>
                </div>
                <div className="ccv-window-body">
                  <div className="ccv-window-sidebar">
                    <div className="ccv-window-search">
                      <Search className="ccv-window-search-icon" />
                      <span className="ccv-window-search-text">{t('claudeCliProduct.mockup.searchPlaceholder')}</span>
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
                      <div className="ccv-window-msg-meta">{t('claudeCliProduct.mockup.userLabel')}</div>
                      <div className="ccv-window-msg-line ccv-w-90" />
                      <div className="ccv-window-msg-line ccv-w-70" />
                    </div>
                    <div className="ccv-window-msg ccv-window-msg-assistant">
                      <div className="ccv-window-msg-meta ccv-window-msg-meta-claude">{t('claudeCliProduct.mockup.claudeLabel')}</div>
                      <div className="ccv-window-msg-line ccv-w-95" />
                      <div className="ccv-window-msg-line ccv-w-85" />
                      <div className="ccv-window-msg-line ccv-w-60" />
                    </div>
                    <div className="ccv-window-msg ccv-window-msg-tool">
                      <div className="ccv-window-msg-meta ccv-window-msg-meta-tool">{t('claudeCliProduct.mockup.toolLabel')}</div>
                      <div className="ccv-window-msg-line ccv-w-50" />
                    </div>
                  </div>
                </div>
              </div>

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
          <div className="ccv-features-label">{t('claudeCliProduct.features.label')}</div>
          <h2 className="ccv-features-title">
            {t('claudeCliProduct.features.title1')}
            <br />
            {t('claudeCliProduct.features.title2')}
          </h2>
          <p className="ccv-features-sub">
            {t('claudeCliProduct.features.subtitle')}
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="ccv-howitworks" data-testid="section-ccv-howitworks">
        <div className="ccv-howitworks-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">{t('claudeCliProduct.howitworks.label')}</div>
            <h2 className="ccv-features-title">
              {t('claudeCliProduct.howitworks.title')}
            </h2>
          </div>

          <div className="ccv-steps">
            <div className="ccv-step">
              <div className="ccv-step-num">1</div>
              <h3>{t('claudeCliProduct.howitworks.step1.title')}</h3>
              <p>{t('claudeCliProduct.howitworks.step1.description')}</p>
            </div>
            <div className="ccv-step">
              <div className="ccv-step-num">2</div>
              <h3>{t('claudeCliProduct.howitworks.step2.title')}</h3>
              <p>{t('claudeCliProduct.howitworks.step2.description')}</p>
            </div>
            <div className="ccv-step">
              <div className="ccv-step-num">3</div>
              <h3>{t('claudeCliProduct.howitworks.step3.title')}</h3>
              <p>{t('claudeCliProduct.howitworks.step3.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="ccv-trust" data-testid="section-ccv-trust">
        <div className="ccv-trust-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">{t('claudeCliProduct.trust.label')}</div>
            <h2 className="ccv-features-title">
              {t('claudeCliProduct.trust.title')}
            </h2>
            <p className="ccv-features-sub">
              {t('claudeCliProduct.trust.subtitle')}
            </p>
          </div>

          <div className="ccv-trust-grid">
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">🔒</div>
              <h3>{t('claudeCliProduct.trust.local.title')}</h3>
              <p>{t('claudeCliProduct.trust.local.description')}</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">📡</div>
              <h3>{t('claudeCliProduct.trust.telemetry.title')}</h3>
              <p>{t('claudeCliProduct.trust.telemetry.description')}</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">
                <Eye className="h-5 w-5" />
              </div>
              <h3>{t('claudeCliProduct.trust.control.title')}</h3>
              <p>{t('claudeCliProduct.trust.control.description')}</p>
            </div>
            <div className="ccv-trust-card">
              <div className="ccv-trust-icon">
                <Eye className="h-5 w-5" style={{ display: "none" }} />
                🌙
              </div>
              <h3>{t('claudeCliProduct.trust.darkMode.title')}</h3>
              <p>{t('claudeCliProduct.trust.darkMode.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD ===== */}
      <section className="ccv-download" id="download" data-testid="section-ccv-download">
        <div className="ccv-download-inner">
          <div className="ccv-features-header">
            <div className="ccv-features-label">{t('claudeCliProduct.download.label')}</div>
            <h2 className="ccv-features-title">
              {t('claudeCliProduct.download.title')}
            </h2>
            <p className="ccv-features-sub">
              {t('claudeCliProduct.download.subtitle')}
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
                    {t('claudeCliProduct.download.primaryButton', { label: primaryDownloadLabel })}
                  </span>
                  <span className="ccv-download-btn-desc">
                    {primaryDownloadDesc} · v{versionInfo!.version}
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
                  <span className="ccv-download-btn-title">{t('claudeCliProduct.download.loading')}</span>
                  <span className="ccv-download-btn-desc">{primaryDownloadDesc}</span>
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
              {showAllDownloads ? t('claudeCliProduct.download.hideAll') : t('claudeCliProduct.download.showAll')}
            </button>
          </div>

          {/* All download options */}
          {showAllDownloads && (
            <div className="ccv-download-grid" data-testid="grid-ccv-all-downloads">
              {ALL_DOWNLOADS.map((dl) => {
                const url = versionInfo ? getDownloadUrl(dl.id, versionInfo) : null;
                const DlIcon = DL_ICONS[dl.id];
                const dlLabel = t(dl.labelKey);
                const dlDesc = t(dl.descKey);
                return url ? (
                  <a
                    key={dl.id}
                    href={url}
                    className="ccv-download-option"
                    data-testid={`link-ccv-download-${dl.id}`}
                  >
                    <div>
                      <div className="ccv-download-option-label">{dlLabel}</div>
                      <div className="ccv-download-option-desc">{dlDesc}</div>
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
                      <div className="ccv-download-option-label">{dlLabel}</div>
                      <div className="ccv-download-option-desc">{dlDesc}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Windows SmartScreen notice — glass modal overlay */}
          {showSmartScreenNotice && (
            <div className="ccv-smartscreen-overlay" data-testid="notice-ccv-smartscreen" onClick={() => setShowSmartScreenNotice(false)}>
              <div className="ccv-smartscreen-modal" onClick={(e) => e.stopPropagation()}>
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
                  {t('claudeCliProduct.smartscreen.title')}
                </div>
                <p>{t('claudeCliProduct.smartscreen.description')}</p>
                <ol>
                  <li>
                    <Trans
                      i18nKey="claudeCliProduct.smartscreen.step1"
                      components={{ 1: <strong /> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey="claudeCliProduct.smartscreen.step2"
                      components={{ 1: <strong /> }}
                    />
                  </li>
                </ol>
              </div>
            </div>
          )}

          <div className="ccv-download-info">
            <p>
              {versionInfo
                ? t('claudeCliProduct.download.versionLine', { version: versionInfo.version })
                : t('claudeCliProduct.download.loading')}
            </p>
            <p>
              {t('claudeCliProduct.download.legal')}{" "}
              <a href={getLocalizedPath("/terms-of-service")} data-testid="link-ccv-terms">{t('claudeCliProduct.download.termsOfService')}</a>{" "}
              {t('claudeCliProduct.download.and')}{" "}
              <a href={getLocalizedPath("/privacy-policy")} data-testid="link-ccv-privacy">{t('claudeCliProduct.download.privacyPolicy')}</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
