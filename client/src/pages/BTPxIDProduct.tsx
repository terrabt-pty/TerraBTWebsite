import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "wouter";
import { trackDownload } from "@/lib/trackDownload";
import Navigation from "@/components/Navigation";
import BTPxIDFeatures from "@/components/BTPxIDFeatures";
import BTPxIDShowcase from "@/components/BTPxIDShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Download,
  CheckCircle,
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";
import btpxidIcon from "@assets/btp-xid-icon.png";
import userLookupImg from "@assets/UserSearchScreenshot.webp";


const R2_BASE = "https://updates.terrabt.com/btp-xid";

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="BTP xID - SAP BTP User Management | TerraBT"
        description="A desktop app for SAP BTP user management. Manage users across global accounts, sub-accounts, CF orgs, and spaces from one place. Available for Windows and MacOS."
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
          </div>

          {/* Screenshot — full-width block below text */}
          <div className="btpxid-hero-visual">
            <div className="btpxid-hero-screenshot-frame">
              <img
                src={userLookupImg}
                alt="BTP xID User Lookup showing one user found across Global Account, Subaccount, Cloud Foundry Org and Space"
                className="btpxid-hero-screenshot-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== IAS COMPLEMENT ===== */}
<section className="btpxid-ias" id="services">
  <div className="btpxid-ias-inner">
    <div className="btpxid-showcase-header">
      <div className="btpxid-features-label">SAP IAS &amp; BTP xID</div>
      <h2 className="btpxid-showcase-title">
        IAS secures identity.<br />BTP xID governs access.
      </h2>
      <p className="btpxid-showcase-sub">
        SAP IAS authenticates users and can assign BTP sub-account role collections at login via SAML group mapping. But CF Org and Space roles sit in a completely separate authorization system — IAS has no effect on them. And because IAS role assignments are session-based, they're invisible in the BTP cockpit — you can't audit who has what. BTP xID fills both gaps, and works with or without IAS.
      </p>
    </div>

    <div className="btpxid-ias-columns">
      {/* IAS column */}
      <div className="btpxid-ias-col btpxid-ias-col-ias">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-ias">SAP IAS</span>
          <h3 className="btpxid-ias-col-title">Identity &amp; Authentication</h3>
        </div>
        <ul className="btpxid-ias-list">
          {[
            "Federated SSO — authenticates users via your corporate IdP (SAML / OIDC proxy)",
            "Assigns BTP sub-account role collections at login via SAML group mapping",
            "MFA and risk-based authentication policies",
            "Role assignments via IAS are invisible in the BTP cockpit — not auditable from the Users screen",
          ].map((item) => (
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
          <span className="btpxid-ias-badge btpxid-ias-badge-xid">BTP xID</span>
          <h3 className="btpxid-ias-col-title">Access Governance</h3>
        </div>
        <ul className="btpxid-ias-list">
          {[
            "CF Org and Space role management — IAS group mapping has zero effect here; these live in CF UAA, not XSUAA",
            "Landscape-wide access visibility — see every role a user holds across all sub-accounts, orgs, and spaces in one view",
            "Bulk cross-account operations — assign or revoke access across every sub-account simultaneously",
            "Global Account and Directory role management — IAS group mapping does not work at GA or Directory level",
            "Complete offboarding in one action — role collections and CF org/space memberships, across every account",
            "Works without IAS — for BTP landscapes running SAP ID Service or any other IdP, no IAS required",
          ].map((item) => (
            <li key={item} className="btpxid-ias-list-item btpxid-ias-list-item-xid">
              <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="rgba(58,154,106,0.12)"/>
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#3A9A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Footer callout */}
    <div className="btpxid-ias-footer">
      Whether your BTP landscape has IAS deployed or not, BTP xID gives you centralised access governance across every account, org, and space — with a single view of who has access to what, and the ability to act on it.
    </div>
    <div style={{ textAlign: "center", marginTop: "16px" }}>
      <a
        href="/blog/btp-access-management"
        style={{ color: "#3A9A6A", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
      >
        Read the full breakdown: BTP access management with and without IAS →
      </a>
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

      {/* ===== FEATURES ===== */}
      <BTPxIDFeatures />

      {/* ===== SAP NOTE 3249765 ===== */}
      <section className="btpxid-sapnote">
        <div className="btpxid-sapnote-inner">
          <div className="btpxid-sapnote-header">
            <h2 className="btpxid-sapnote-title">Add Org Manager in One Button Click</h2>
            <p className="btpxid-sapnote-sub">
              When your Cloud Foundry Org Manager is unavailable, SAP Note 3249765 documents the recovery process — and it requires navigating a service update wizard, hand-crafting a JSON payload, and then running the whole thing again with <code className="btpxid-inline-code">{"{}"}</code> to clean up, or future updates will fail. With BTP xID, you do it in a single click.
            </p>
          </div>

          <div className="btpxid-sapnote-grid">
            <div className="btpxid-sapnote-card btpxid-sapnote-manual">
              <div className="btpxid-sapnote-card-label">Before BTP xID</div>
              <ol className="btpxid-sapnote-steps">
                <li>Go to Services → Instances and Subscriptions</li>
                <li>Find the Cloud Foundry Runtime entry</li>
                <li>Open the ··· menu and click Update</li>
                <li>Click through the wizard to the Parameters screen</li>
                <li>Construct and paste a JSON payload with the user's email and ID</li>
                <li>Submit and wait for the update to complete</li>
                <li>Repeat with <code className="btpxid-inline-code">{"{}"}</code> to clear the config or all future updates will error</li>
              </ol>
            </div>

            <div className="btpxid-sapnote-card btpxid-sapnote-xid">
              <div className="btpxid-sapnote-card-label">With BTP xID</div>
              <div className="btpxid-sapnote-oneclick">
                <div className="btpxid-sapnote-oneclick-logo-wrap">
                  <img src={btpxidIcon} alt="BTP xID" className="btpxid-sapnote-oneclick-icon" />
                  <span className="btpxid-sapnote-step-count">1 step</span>
                </div>
                <div className="btpxid-sapnote-oneclick-text">
                  <strong>Select the user. Assign Org Manager. Done.</strong>
                  <p>No JSON, no service update wizard, no cleanup step. BTP xID handles the Cloud Foundry API calls behind the scenes — the same operations the SAP note walks you through manually, in a single action.</p>
                </div>
              </div>
              <p className="btpxid-sapnote-xid-note">
                Works for both default SAP IDS and custom IdP origins. Add or remove Org Managers across all your Cloud Foundry orgs from one place, without touching a service instance.
              </p>
              <a
                href="https://me.sap.com/notes/3249765"
                target="_blank"
                rel="noopener noreferrer"
                className="btpxid-sapnote-ref"
              >
                Reference: SAP Note 3249765 — How to add an Org Manager to a Cloud Foundry org →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCREENSHOT SHOWCASE ===== */}
      <BTPxIDShowcase />


      {/* ===== PRICING ===== */}

      {/* ===== DOWNLOAD ===== */}
      <section className="btpxid-download" id="download">
        <div className="btpxid-download-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.download.label')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.download.title')}
            </h2>
            <p className="btpxid-showcase-sub">
              {t('btpxidProduct.download.subtitle')}
            </p>
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
              <a href={getLocalizedPath("/terms-of-service")}>{t('btpxidProduct.download.termsOfService')}</a>{" "}
              {t('btpxidProduct.download.and')}{" "}
              <a href={getLocalizedPath("/privacy-policy")}>{t('btpxidProduct.download.privacyPolicy')}</a>
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}
