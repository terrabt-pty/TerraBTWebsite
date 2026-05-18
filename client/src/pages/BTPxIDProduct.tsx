import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "wouter";
import { trackDownload } from "@/lib/trackDownload";
import Navigation from "@/components/Navigation";
import BTPxIDFeatures from "@/components/BTPxIDFeatures";
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

      {/* ===== API CREDENTIALS — a single view across every level ===== */}
      <section className="btpxid-why" style={{ background: "#FFFFFF" }}>
        <div className="btpxid-why-inner">
          <div className="btpxid-why-header">
            <h2 className="btpxid-why-title">
              Every <span className="btpxid-why-accent">API Credential</span> and Every User in your BTP landscape — one view
            </h2>
            <p className="btpxid-why-question">
              SAP BTP issues API credentials at multiple levels — Global Account, Sub-account, and across every Cloud Foundry org and space. Today each level is managed through a different SAP screen. BTP xID brings them together in one auditable view.
            </p>
          </div>

          <div className="btpxid-why-grid">
            <div className="btpxid-why-card btpxid-why-problem">
              <div className="btpxid-why-card-label">In SAP BTP today</div>
              <p>
                Sub-account API credentials are presented inside the service instance they're bound to. Global Account-level API credentials are managed through the BTP CLI. Each surface works well — BTP xID is the single app that consolidates both.
              </p>
            </div>

            <div className="btpxid-why-card btpxid-why-solution">
              <div className="btpxid-why-card-label">With BTP xID</div>
              <p>
                One screen. Every API credential across your landscape — <strong>including the Global Account-level credentials managed via the BTP CLI</strong>. Filter, audit, revoke.
              </p>
              <p>
                Surface every API credential in your landscape — including the ones only visible via the BTP CLI. Filter, audit, revoke. Hand your auditor a single export instead of a week's work.
              </p>
            </div>
          </div>

          <div className="btpxid-why-cta">
            <a href="/blog/btp-service-keys-api-credentials" className="btpxid-why-link">
              The full breakdown: every BTP service, what its key contains, what it unlocks →
            </a>
          </div>
        </div>
      </section>

      {/* ===== IAS COMPLEMENT ===== */}
<section className="btpxid-ias" id="services">
  <div className="btpxid-ias-inner">
    <div className="btpxid-showcase-header">
      <div className="btpxid-features-label">Works With SAP IAS</div>
      <h2 className="btpxid-showcase-title">
        IAS secures identity.<br />BTP xID governs access.
      </h2>
      <p className="btpxid-showcase-sub">
        SAP IAS handles authentication. BTP xID handles what comes after — who can access what, across every account, org, and space in your BTP landscape.
      </p>
    </div>

    <div className="btpxid-ias-columns">
      {/* IAS column */}
      <div className="btpxid-ias-col btpxid-ias-col-ias">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-ias">SAP IAS</span>
          <h3 className="btpxid-ias-col-title">Identity, Authentication &amp; Partial Access Governance</h3>
        </div>
        <ul className="btpxid-ias-list">
          {[
            "Single sign-on & multi-factor authentication",
            "Corporate IdP federation (SAML / OIDC)",
            "User provisioning via SCIM",
            "Risk-based authentication policies",
            "Authentication audit logs",
            "User and role assignment at SAP BTP Global and Sub-account level",
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
          <h3 className="btpxid-ias-col-title">Full Access Governance</h3>
        </div>
        <ul className="btpxid-ias-list">
          {[
            "Service API Credential Management across every Global Account, Sub-account, Cloud Foundry Org and Space — list, audit and revoke OAuth credentials in one place",
            "User Management & Role assignment across multiple Global Accounts, Sub-accounts, Directories, Cloud Foundry Orgs and Cloud Foundry Spaces in a single unified interface",
            "Bulk user management across your entire BTP landscape",
            "Landscape-wide visibility: who has access to what, across every account",
            "Governance for custom IdP users — not just SAP ID Service accounts",
          ].map((item) => (
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
      Whether you have IAS or not, BTP xID gives you one place to see and manage all BTP access — users, roles, and API credentials across Global Accounts, sub-accounts, CF Orgs and Spaces.
    </div>
  </div>
</section>

      {/* ===== THREE CONSIDERATIONS AT SCALE ===== */}
      <section className="btpxid-risks">
        <div className="btpxid-risks-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">Three steps to secure your API credentials in SAP BTP</div>
            <h2 className="btpxid-showcase-title">
              What every SAP BTP admin<br />needs to know about API credentials.
            </h2>
          </div>

          <div className="btpxid-risks-grid">
            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">1. Secure access to CF Orgs and Spaces</div>
              <p className="btpxid-risk-card-body">
                API credentials in SAP BTP live at the Cloud Foundry space level. We verified this ourselves: we removed a user from a sub-account entirely, confirmed their BTP cockpit access was gone — then logged into CF via the CLI with the same credentials. We had full access to every API credential in every org and space we previously held roles in.
              </p>
              <p className="btpxid-risk-card-body" style={{ marginTop: "8px" }}>
                BTP xID removes the user and their role assignments across every org and space as part of offboarding — closing the gap between sub-account removal and actual access termination.
              </p>
            </div>

            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">2. Audit, revoke and track API credentials across the landscape</div>
              <p className="btpxid-risk-card-body">
                API credentials don't expire by default. Anyone who has ever viewed, generated or worked with a credential has effectively seen its secret. When team members change roles or leave, those credentials need to be revoked and new ones issued — but without a landscape-wide inventory, most teams don't even know which credentials exist, let alone who created them.
              </p>
              <p className="btpxid-risk-card-body" style={{ marginTop: "8px" }}>
                SAP recommends rotating credentials every 90 days, but provides no native view across the entire landscape. BTP xID surfaces every credential — across every sub-account, CF org and space — so you can audit, revoke and track them from one place.
              </p>
              <p className="btpxid-risk-card-source">
                Reference: <a href="https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/service-instance-secrets-5578ec4.md" target="_blank" rel="noopener noreferrer">SAP — Service Instance Secrets</a>
              </p>
            </div>

            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">3. Find and remove ghost API credentials</div>
              <p className="btpxid-risk-card-body">
                Global Account-level API credentials exist in SAP BTP and are not visible anywhere in the BTP cockpit. They can only be retrieved via the BTP CLI — which means most teams don't know they exist. BTP xID surfaces these hidden credentials alongside all others, giving you a complete picture of what has access to your landscape.
              </p>
            </div>
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




      {/* ===== ROADMAP ===== */}
      <section className="btpxid-roadmap">
        <div className="btpxid-roadmap-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">On the roadmap</div>
            <h2 className="btpxid-showcase-title">
              Capabilities we are bringing next.
            </h2>
            <p className="btpxid-showcase-sub">
              These are capabilities we are exploring. Nothing here is a commitment — priorities shift, and some of these may not ship. We share them because they reflect where we think this product can go.
            </p>
          </div>

          <div className="btpxid-roadmap-grid">
            <div className="btpxid-roadmap-card">
              <span className="btpxid-roadmap-card-badge">Coming</span>
              <p className="btpxid-roadmap-card-title">Time-bound role assignments</p>
              <p className="btpxid-roadmap-card-body">
                Give a contractor a Space Developer role for 30 days, and BTP xID revokes it automatically when the period ends. No follow-up tickets, no expired-access reviews. The validity-date controls BTP itself does not offer.
              </p>
            </div>
            <div className="btpxid-roadmap-card">
              <span className="btpxid-roadmap-card-badge">Coming</span>
              <p className="btpxid-roadmap-card-title">Emergency firefighter IDs</p>
              <p className="btpxid-roadmap-card-body">
                Provision break-glass access with a hard expiration. The pattern your GRC team already uses for S/4HANA, brought natively to BTP — with logging and automatic revocation.
              </p>
            </div>
            <div className="btpxid-roadmap-card">
              <span className="btpxid-roadmap-card-badge">Coming</span>
              <p className="btpxid-roadmap-card-title">Role and role collection authoring</p>
              <p className="btpxid-roadmap-card-body">
                Create and edit BTP role collections directly from BTP xID. One workflow for design, assignment, and review — instead of the BTP cockpit's role-template-then-collection split.
              </p>
            </div>
            <div className="btpxid-roadmap-card">
              <span className="btpxid-roadmap-card-badge">Coming</span>
              <p className="btpxid-roadmap-card-title">Continuous access reviews</p>
              <p className="btpxid-roadmap-card-body">
                Surface dormant accounts, unused role collections, and stale API credentials for your quarterly review — without your team building a single SQL query or PowerShell script.
              </p>
            </div>
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
            <p className="btpxid-showcase-sub">
              {t('btpxidProduct.download.subtitle')}
            </p>
          </div>

          {/* Trust strip — answers the first three CISO questions */}
          <div className="btpxid-trust-strip">
            <div className="btpxid-trust-item">
              <span className="btpxid-trust-icon">●</span>
              <div>
                <strong>Runs locally</strong>
                <span>on macOS &amp; Windows — no data leaves your machine</span>
              </div>
            </div>
            <div className="btpxid-trust-item">
              <span className="btpxid-trust-icon">●</span>
              <div>
                <strong>Direct to BTP APIs</strong>
                <span>no proxy, no relay, no third-party cloud</span>
              </div>
            </div>
            <div className="btpxid-trust-item">
              <span className="btpxid-trust-icon">●</span>
              <div>
                <strong>Your credentials, your auth</strong>
                <span>signs in with your existing BTP login</span>
              </div>
            </div>
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
