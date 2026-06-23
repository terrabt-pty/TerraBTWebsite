import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "wouter";
import { trackDownload } from "@/lib/trackDownload";
import Navigation from "@/components/Navigation";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Download,
  CheckCircle,
  Globe,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";
import btpxidIcon from "@assets/btp-xid-icon.png";
import userLookupImg from "@assets/UserSearchScreenshot.png";
import securityInsightsImg from "@assets/SecurityInsightsScreenshot.png";
import credentialDetailImg from "@assets/CredentialDetailScreenshot.png";


const R2_BASE = "https://updates.terrabt.com/btp-xid";
const XID_WEB_URL = "https://xid-web.terrabt.com";

const HERO_SCREENSHOTS = [
  {
    src: userLookupImg,
    alt: "BTP xID User Lookup showing one user found across Global Account, Subaccount, Cloud Foundry Org and Space",
  },
  {
    src: securityInsightsImg,
    alt: "BTP xID Security Insights showing a governance score, coverage metrics, and prioritized recommendations",
  },
  {
    src: credentialDetailImg,
    alt: "BTP xID API Credentials list with a credential detail panel showing governance fields like owner, risk level, expiry and rotation frequency",
  },
];

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

const DL_ICONS: Record<DownloadOption["id"], React.ComponentType<{ className?: string }>> = {
  "mac-arm64":     FaApple,
  "mac-x64":       FaApple,
  "win-installer": FaWindows,
  "win-portable":  FaWindows,
};

interface DownloadOption {
  id: "mac-arm64" | "mac-x64" | "win-installer" | "win-portable";
  labelKey: string;
  descKey: string;
  os: OSType;
  arch?: string;
}

const ALL_DOWNLOADS: DownloadOption[] = [
  {
    id: "mac-arm64",
    labelKey: "btpxidProduct.downloadOptions.macArm64Label",
    descKey: "btpxidProduct.downloadOptions.macArm64Desc",
    os: "mac",
    arch: "arm64",
  },
  {
    id: "mac-x64",
    labelKey: "btpxidProduct.downloadOptions.macX64Label",
    descKey: "btpxidProduct.downloadOptions.macX64Desc",
    os: "mac",
    arch: "x64",
  },
  {
    id: "win-installer",
    labelKey: "btpxidProduct.downloadOptions.winInstallerLabel",
    descKey: "btpxidProduct.downloadOptions.winInstallerDesc",
    os: "windows",
    arch: "x64",
  },
  {
    id: "win-portable",
    labelKey: "btpxidProduct.downloadOptions.winPortableLabel",
    descKey: "btpxidProduct.downloadOptions.winPortableDesc",
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


export default function BTPxIDProduct() {
  const { t, i18n } = useTranslation();
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(true);
  const [showSmartScreenNotice, setShowSmartScreenNotice] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { getLocalizedPath } = useLocalizedPath();

  // ?portal=test routes to accounts-test for internal testing without real payments
  const portalBase = new URLSearchParams(window.location.search).get("portal") === "test"
    ? "https://accounts-test.terrabt.com"
    : "https://accounts.terrabt.com";

  useEffect(() => {
    setOS(detectOS());
    setArch(detectArch());
  }, []);

  useEffect(() => {
    fetch(`${R2_BASE}/version.json`)
      .then((r) => r.json())
      .then((data: VersionInfo) => setVersionInfo(data))
      .catch(() => { /* stays null — buttons remain in loading state */ });
  }, []);

  // Auto-advance the hero screenshot carousel.
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % HERO_SCREENSHOTS.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide(((index % HERO_SCREENSHOTS.length) + HERO_SCREENSHOTS.length) % HERO_SCREENSHOTS.length);
  };

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
        title="BTP xID | SAP BTP API Credential & Access Management by TerraBT"
        description="BTP xID is a desktop app for complete SAP BTP API credential and user management. Govern every user, role, and API credential across Global Accounts, sub-accounts, and Cloud Foundry environments from one place."
        path="/products/btp-xid"
      />
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="btpxid-hero" id="home">
        <div className="btpxid-hero-inner">
          {/* Text block — centered, stacked */}
          <div className="btpxid-hero-content">
            {/* Wordmark */}
            <div className="btpxid-hero-wordmark">
              <img src={btpxidIcon} alt="BTP xID icon" className="btpxid-hero-wordmark-icon" />
              <span className="btpxid-hero-wordmark-text">
                <span className="btpxid-hero-wordmark-btp">BTP</span>
                <span className="btpxid-hero-wordmark-xid"> xID</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="btpxid-hero-tagline">{t('btpxidProduct.hero.tagline')}</p>

            {/* Headline */}
            <h1 className="btpxid-hero-title">{t('btpxidProduct.hero.title')}</h1>

            {/* Description */}
            <p className="btpxid-hero-desc">{t('btpxidProduct.hero.description')}</p>

            {/* Two ways to use BTP xID — desktop app or web app */}
            <div className="btpxid-choice">
              <p className="btpxid-choice-intro">{t('btpxidProduct.hero.choiceIntro')}</p>
              <div className="btpxid-choice-grid">
                <a
                  href={XID_WEB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btpxid-choice-card btpxid-choice-card-web"
                >
                  <span className="btpxid-choice-icon">
                    <Globe className="h-6 w-6" />
                  </span>
                  <span className="btpxid-choice-body">
                    <span className="btpxid-choice-title">{t('btpxidProduct.hero.choiceWebTitle')}</span>
                    <span className="btpxid-choice-desc">{t('btpxidProduct.hero.choiceWebDesc')}</span>
                  </span>
                  <span className="btpxid-choice-platforms">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection("#download")}
                  className="btpxid-choice-card btpxid-choice-card-desktop"
                >
                  <span className="btpxid-choice-icon">
                    <Download className="h-6 w-6" />
                  </span>
                  <span className="btpxid-choice-body">
                    <span className="btpxid-choice-title">{t('btpxidProduct.hero.choiceDesktopTitle')}</span>
                    <span className="btpxid-choice-desc">{t('btpxidProduct.hero.choiceDesktopDesc')}</span>
                  </span>
                  <span className="btpxid-choice-platforms">
                    <FaApple className="h-4 w-4" aria-hidden="true" />
                    <FaWindows className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Screenshot carousel — full-width block below text */}
          <div className="btpxid-hero-visual">
            <div className="btpxid-hero-carousel">
              <div className="btpxid-hero-screenshot-frame">
                <div
                  className="btpxid-hero-carousel-track"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {HERO_SCREENSHOTS.map((slide) => (
                    <div className="btpxid-hero-carousel-slide" key={slide.src}>
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="btpxid-hero-screenshot-img"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btpxid-hero-carousel-arrow btpxid-hero-carousel-arrow-prev"
                onClick={() => goToSlide(activeSlide - 1)}
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="btpxid-hero-carousel-arrow btpxid-hero-carousel-arrow-next"
                onClick={() => goToSlide(activeSlide + 1)}
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="btpxid-hero-carousel-dots">
                {HERO_SCREENSHOTS.map((slide, i) => (
                  <button
                    type="button"
                    key={slide.src}
                    className={`btpxid-hero-carousel-dot ${i === activeSlide ? "is-active" : ""}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    aria-current={i === activeSlide}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== API CREDENTIALS — a single view across every level ===== */}
      <section className="btpxid-why" style={{ background: "#FFFFFF" }}>
        <div className="btpxid-why-inner">
          <div className="btpxid-why-header">
            <h2 className="btpxid-why-title">
              {t('btpxidProduct.apiCredentials.title')}
            </h2>
            <p className="btpxid-why-question">
              {t('btpxidProduct.apiCredentials.subtitle')}
            </p>
          </div>

          <div className="btpxid-why-grid">
            <div className="btpxid-why-card btpxid-why-problem">
              <div className="btpxid-why-card-label">{t('btpxidProduct.apiCredentials.todayLabel')}</div>
              <p>{t('btpxidProduct.apiCredentials.todayText')}</p>
            </div>

            <div className="btpxid-why-card btpxid-why-solution">
              <div className="btpxid-why-card-label">{t('btpxidProduct.apiCredentials.xidLabel')}</div>
              <p>{t('btpxidProduct.apiCredentials.xidText1')}</p>
              <p>{t('btpxidProduct.apiCredentials.xidText2')}</p>
            </div>
          </div>

          <div className="btpxid-why-cta">
            <a href="/blog/btp-service-keys-api-credentials" className="btpxid-why-link">
              {t('btpxidProduct.apiCredentials.readMore')}
            </a>
          </div>
        </div>
      </section>

      {/* ===== IAS COMPLEMENT ===== */}
<section className="btpxid-ias" id="services">
  <div className="btpxid-ias-inner">
    <div className="btpxid-showcase-header">
      <div className="btpxid-features-label">{t('btpxidProduct.ias.label')}</div>
      <h2 className="btpxid-showcase-title">
        {t('btpxidProduct.ias.title1')}<br />{t('btpxidProduct.ias.title2')}
      </h2>
      <p className="btpxid-showcase-sub">
        {t('btpxidProduct.ias.subtitle')}
      </p>
    </div>

    <div className="btpxid-ias-columns">
      {/* IAS column */}
      <div className="btpxid-ias-col btpxid-ias-col-ias">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-ias">{t('btpxidProduct.ias.iasBadge')}</span>
          <h3 className="btpxid-ias-col-title">{t('btpxidProduct.ias.iasTitle')}</h3>
        </div>
        <ul className="btpxid-ias-list">
          {(t('btpxidProduct.ias.iasItems', { returnObjects: true }) as string[]).map((item) => (
            <li key={item} className="btpxid-ias-list-item btpxid-ias-list-item-ias">
              <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#E2E8F0"/>
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plus divider */}
      <div className="btpxid-ias-plus">
        <div className="btpxid-ias-plus-line" />
        <span className="btpxid-ias-plus-sign">+</span>
        <div className="btpxid-ias-plus-line" />
      </div>

      {/* BTP xID column */}
      <div className="btpxid-ias-col btpxid-ias-col-xid">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-xid">{t('btpxidProduct.ias.xidBadge')}</span>
          <h3 className="btpxid-ias-col-title">{t('btpxidProduct.ias.xidTitle')}</h3>
        </div>
        <ul className="btpxid-ias-list">
          {(t('btpxidProduct.ias.xidItems', { returnObjects: true }) as string[]).map((item) => (
            <li key={item} className="btpxid-ias-list-item btpxid-ias-list-item-xid">
              <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="rgba(58,154,106,0.12)"/>
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#3A9A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
          <li className="btpxid-ias-list-item btpxid-ias-list-item-xid">
            <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="rgba(58,154,106,0.12)"/>
              <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#3A9A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Cloud Foundry Org &amp; Space manager assignments — including Org Manager force-add in one click, without service update wizards or JSON payloads (<a href="https://me.sap.com/notes/3249765" target="_blank" rel="noopener noreferrer" style={{ color: "#3A9A6A", textDecoration: "none" }}>SAP Note 3249765</a>)</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer callout */}
    <div className="btpxid-ias-footer">
      {t('btpxidProduct.ias.footer')}
    </div>
  </div>
</section>

      {/* ===== WHY BTP xID — THE LANDSCAPE-WIDE LOOKUP STORY ===== */}
      <section className="btpxid-why">
        <div className="btpxid-why-inner">
          <div className="btpxid-why-header">
            <h2 className="btpxid-why-title">
              <Trans
                i18nKey="btpxidProduct.why.title"
                components={{ accent: <span className="btpxid-why-accent" /> }}
              />
            </h2>
            <p className="btpxid-why-question">{t('btpxidProduct.why.question')}</p>
          </div>

          <div className="btpxid-why-grid">
            <div className="btpxid-why-card btpxid-why-problem">
              <div className="btpxid-why-card-label">{t('btpxidProduct.why.problemLabel')}</div>
              <p>{t('btpxidProduct.why.problem')}</p>
              <p>{t('btpxidProduct.why.iasNote')}</p>
            </div>

            <div className="btpxid-why-card btpxid-why-solution">
              <div className="btpxid-why-card-label">{t('btpxidProduct.why.solutionLabel')}</div>
              <p>
                <Trans
                  i18nKey="btpxidProduct.why.solution"
                  components={{ b: <strong /> }}
                />
              </p>
              <p>{t('btpxidProduct.why.solutionExtra')}</p>
            </div>
          </div>

          <div className="btpxid-why-cta">
            <Link href={getLocalizedPath("/blog/finding-users-across-sap-btp-landscape")} className="btpxid-why-link">
              {t('btpxidProduct.why.readMore')} →
            </Link>
          </div>
        </div>
      </section>






      {/* ===== DOWNLOAD ===== */}
      <section className="btpxid-download" id="download">
        <div className="btpxid-download-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.download.label')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.download.title')}
            </h2>
          </div>

          {/* Primary OS download */}
          <div className="btpxid-download-primary">
            {primaryDownloadUrl ? (
              <a
                href={primaryDownloadUrl}
                className="btpxid-download-btn"
                onClick={() => { trackDownload('btp-xid', versionInfo!.version, primaryDownload.id); if (os === "windows") setShowSmartScreenNotice(true); }}
              >
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">
                    {t('btpxidProduct.download.primaryButton', { label: primaryDownloadLabel })}
                  </span>
                  <span className="btpxid-download-btn-desc">
                    {primaryDownloadDesc} · v{versionInfo!.version}
                  </span>
                </div>
                <Download className="h-5 w-5" />
              </a>
            ) : (
              <button disabled className="btpxid-download-btn" style={{ opacity: 0.7 }}>
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">{t('btpxidProduct.download.loading')}</span>
                  <span className="btpxid-download-btn-desc">
                    {primaryDownloadDesc}
                  </span>
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
              className="btpxid-download-other"
            >
              {showAllDownloads ? t('btpxidProduct.download.hideAll') : t('btpxidProduct.download.showAll')}
            </button>

            <div className="btpxid-download-web">
              <span className="btpxid-download-web-text">{t('btpxidProduct.download.webPrompt')}</span>
              <a
                href={XID_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btpxid-download-web-link"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span>{t('btpxidProduct.download.webLink')}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* All download options */}
          {showAllDownloads && (
            <div className="btpxid-download-grid">
              {ALL_DOWNLOADS.map((dl) => {
                const url = versionInfo ? getDownloadUrl(dl.id, versionInfo) : null;
                const DlIcon = DL_ICONS[dl.id];
                const dlLabel = t(dl.labelKey);
                const dlDesc = t(dl.descKey);
                return url ? (
                  <a key={dl.id} href={url} className="btpxid-download-option" onClick={() => trackDownload('btp-xid', versionInfo!.version, dl.id)}>
                    <div>
                      <div className="btpxid-download-option-label">{dlLabel}</div>
                      <div className="btpxid-download-option-desc">{dlDesc}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </a>
                ) : (
                  <button key={dl.id} disabled className="btpxid-download-option" style={{ opacity: 0.7 }}>
                    <div>
                      <div className="btpxid-download-option-label">{dlLabel}</div>
                      <div className="btpxid-download-option-desc">{dlDesc}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Windows SmartScreen notice — glass modal overlay */}
          {showSmartScreenNotice && (
            <div className="btpxid-smartscreen-overlay" onClick={() => setShowSmartScreenNotice(false)}>
              <div className="btpxid-smartscreen-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btpxid-smartscreen-notice-close"
                  onClick={() => setShowSmartScreenNotice(false)}
                  aria-label="Dismiss"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div className="btpxid-smartscreen-notice-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {t('btpxidProduct.download.smartscreen.title')}
                </div>
                <p>
                  {t('btpxidProduct.download.smartscreen.description')}
                </p>
                <ol>
                  <li>
                    <Trans
                      i18nKey="btpxidProduct.download.smartscreen.step1"
                      components={{ 1: <strong /> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey="btpxidProduct.download.smartscreen.step2"
                      components={{ 1: <strong /> }}
                    />
                  </li>
                </ol>
              </div>
            </div>
          )}

          <div className="btpxid-download-info">
            <p>
              {versionInfo
                ? t('btpxidProduct.download.versionLine', { version: versionInfo.version })
                : t('btpxidProduct.download.loading')}
            </p>
            <p>
              {t('btpxidProduct.download.legal')}{" "}
              <a href={getLocalizedPath("/terms-of-service")}>{t('btpxidProduct.download.termsOfService')}</a>
              {", "}
              <a href={getLocalizedPath("/eula")}>{t('btpxidProduct.download.eula')}</a>
              {", "}
              <a href={getLocalizedPath("/privacy-policy")}>{t('btpxidProduct.download.privacyPolicy')}</a>
              {", and "}
              <a href={getLocalizedPath("/limited-liability")}>{t('btpxidProduct.download.liabilityPolicy')}</a>.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}
