import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
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
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";
import btpxidIcon from "@assets/btp-xid-icon.png";
import securityInsightsImg from "@assets/SecurityInsightsScreenshot.png";


const R2_BASE = "https://updates.terrabt.com/btp-xid";
const XID_WEB_URL = "https://xid-web.terrabt.com";

const HERO_SCREENSHOT = {
  src: securityInsightsImg,
  alt: "BTP xID Security Insights showing a governance score, coverage metrics, and prioritized recommendations",
};

// FAQ structured data — factual statements about SAP BTP service key gaps.
// Rendered as JSON-LD so search and AI engines can cite the answers directly.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do SAP BTP service keys expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SAP BTP service keys have no expiration date and remain valid until they are explicitly deleted. Compliance frameworks such as PCI DSS 4.0 (requirement 8.3.10.1) and ISO/IEC 27001:2022 (control A.8.24) require credentials to be managed through a defined lifecycle, so teams must add expiry and rotation tracking themselves. BTP xID adds an expiry date and rotation record to every credential.",
      },
    },
    {
      "@type": "Question",
      name: "Does SAP BTP record who owns a service key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SAP BTP has no owner field on a service key. The platform does not store who owns a key, what it is used for, or which system consumes it. BTP xID adds owner, responsible party, and purpose fields to every credential, stored as metadata on the credential itself in your own landscape.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to SAP BTP service keys when an employee leaves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The keys keep working. Removing a user from a subaccount does not delete or rotate the service keys they created, and SAP BTP does not record who created a key. Security standards such as NIST SP 800-53 IA-5 and PCI DSS 8.6 require rotating a credential and reassigning its ownership when a person with access to its secret leaves. BTP xID records an owner on every credential, so a leaver event becomes a query followed by rotation and reassignment.",
      },
    },
    {
      "@type": "Question",
      name: "How do you review all users and service keys across an SAP BTP landscape?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Natively, only by visiting each global account, subaccount, Cloud Foundry org, and space individually — SAP BTP has no single cross-account view. BTP xID provides one view of all users and API credentials across the entire landscape, including reverse search by user.",
      },
    },
    {
      "@type": "Question",
      name: "Which compliance controls are affected by SAP BTP service key gaps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The missing owner, expiry, purpose, and rotation records on SAP BTP service keys affect ISO/IEC 27001:2022 controls A.5.15 and A.8.24, NIST SP 800-53 controls IA-4, IA-5, and AC-2, PCI DSS 4.0 requirements 8.3.10.1 and 8.6, SOC 2 Trust Services Criteria CC6.1, CC6.2, and CC7.1, and SOX IT General Controls for access management.",
      },
    },
  ],
};

interface GapItem {
  title: string;
  desc: string;
}

interface StandardCard {
  name: string;
  clauses: string;
  text: string;
}

interface CloseItem {
  gap: string;
  fix: string;
}

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
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [showSmartScreenNotice, setShowSmartScreenNotice] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
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

  const primaryDownload = getPrimaryDownload(os, arch);
  const primaryDownloadLabel = t(primaryDownload.labelKey);
  const primaryDownloadDesc = t(primaryDownload.descKey);
  const PrimaryIcon = OS_ICONS[os];
  const primaryDownloadUrl = versionInfo ? getDownloadUrl(primaryDownload.id, versionInfo) : null;

  return (
    <div className="min-h-screen">
      <SEOHead
        title="BTP xID | SAP BTP Service Key Governance — Owner, Expiry, Rotation | TerraBT"
        description="SAP BTP service keys have no owner, no expiry date, and no record of purpose. BTP xID adds owner, purpose, expiry, and rotation tracking to every credential and one view of users and keys across your landscape — evidence for ISO 27001, SOC 2, PCI DSS, NIST 800-53, and SOX audits."
        path="/products/btp-xid"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
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

            {/* Headline */}
            <h1 className="btpxid-hero-title">{t('btpxidProduct.hero.headline')}</h1>

            {/* Description */}
            <p className="btpxid-hero-desc">{t('btpxidProduct.hero.subhead')}</p>
          </div>

          {/* Screenshot — full-width block below text */}
          <div className="btpxid-hero-visual">
            <div className="btpxid-hero-carousel">
              <div className="btpxid-hero-screenshot-frame">
                <img
                  src={HERO_SCREENSHOT.src}
                  alt={HERO_SCREENSHOT.alt}
                  className="btpxid-hero-screenshot-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GAPS — what SAP BTP does not record ===== */}
      <section className="btpxid-gaps" id="gaps">
        <div className="btpxid-gaps-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.gaps.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.gaps.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.gaps.subtitle')}</p>
          </div>

          <div className="btpxid-gaps-grid">
            {(t('btpxidProduct.gaps.items', { returnObjects: true }) as GapItem[]).map((item) => (
              <div key={item.title} className="btpxid-gap-card">
                <h3 className="btpxid-gap-title">{item.title}</h3>
                <p className="btpxid-gap-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STANDARDS — audit impact ===== */}
      <section className="btpxid-standards" id="compliance">
        <div className="btpxid-standards-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.standards.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.standards.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.standards.subtitle')}</p>
          </div>

          <div className="btpxid-standards-grid">
            {(t('btpxidProduct.standards.cards', { returnObjects: true }) as StandardCard[]).map((card) => (
              <div key={card.name} className="btpxid-standard-card">
                <div className="btpxid-standard-head">
                  <h3 className="btpxid-standard-name">{card.name}</h3>
                  <span className="btpxid-standard-clauses">{card.clauses}</span>
                </div>
                <p className="btpxid-standard-text">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="btpxid-standards-cta">
            <a href={getLocalizedPath("/products/btp-xid/compliance")} className="btpxid-standards-link">
              {t('btpxidProduct.standards.cta')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW BTP xID CLOSES EACH GAP ===== */}
      <section className="btpxid-closes" id="features">
        <div className="btpxid-closes-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.closes.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.closes.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.closes.subtitle')}</p>
          </div>

          <div className="btpxid-closes-grid">
            {(t('btpxidProduct.closes.items', { returnObjects: true }) as CloseItem[]).map((item) => (
              <div key={item.gap} className="btpxid-close-card">
                <div className="btpxid-close-check">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="btpxid-close-gap">{item.gap}</h3>
                  <p className="btpxid-close-fix">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IAS COMPLEMENT ===== */}
<section className="btpxid-ias" id="services">
  <div className="btpxid-ias-inner">
    <div className="btpxid-showcase-header">
      <div className="btpxid-features-label">{t('btpxidProduct.ias.label2')}</div>
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



      {/* ===== DOWNLOAD ===== */}
      <section className="btpxid-download" id="download">
        <div className="btpxid-download-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.download.getStartedLabel')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.download.getStartedTitle')}
            </h2>
          </div>

          {/* Primary CTA — the web app is the credential-governance tool this page sells */}
          <div className="btpxid-download-primary">
            <a
              href={XID_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btpxid-download-btn"
            >
              <Globe className="h-6 w-6" />
              <div className="btpxid-download-btn-text">
                <span className="btpxid-download-btn-title">
                  {t('btpxidProduct.download.webButton')}
                </span>
                <span className="btpxid-download-btn-desc">
                  {t('btpxidProduct.download.webButtonDesc')}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5" />
            </a>

            {/* Secondary — desktop app for user management */}
            {primaryDownloadUrl ? (
              <a
                href={primaryDownloadUrl}
                className="btpxid-download-btn btpxid-download-btn-secondary"
                onClick={() => { trackDownload('btp-xid', versionInfo!.version, primaryDownload.id); if (os === "windows") setShowSmartScreenNotice(true); }}
              >
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">
                    {t('btpxidProduct.download.primaryButton', { label: primaryDownloadLabel })}
                  </span>
                  <span className="btpxid-download-btn-desc">
                    {t('btpxidProduct.download.desktopButtonDesc')}
                  </span>
                  <span className="btpxid-download-btn-desc">
                    {primaryDownloadDesc} · v{versionInfo!.version}
                  </span>
                </div>
                <Download className="h-5 w-5" />
              </a>
            ) : (
              <button disabled className="btpxid-download-btn btpxid-download-btn-secondary" style={{ opacity: 0.7 }}>
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">{t('btpxidProduct.download.loading')}</span>
                  <span className="btpxid-download-btn-desc">
                    {t('btpxidProduct.download.desktopButtonDesc')}
                  </span>
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
