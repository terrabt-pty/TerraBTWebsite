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
      <div className="btpxid-features-label">Works With SAP IAS</div>
      <h2 className="btpxid-showcase-title">
        IAS secures identity.<br />BTP xID governs access.
      </h2>
      <p className="btpxid-showcase-sub">
        SAP Identity Authentication Service controls who can authenticate. BTP xID controls what they can access across your BTP landscape — the access governance layer IAS was never designed to provide.
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
            "Close the ghost-access gap — remove a user from IAS and their Cloud Foundry Org and Space memberships stay active. BTP xID removes them in one action",
            "Find and revoke service keys across the landscape — OAuth credentials created by developers don't expire and aren't visible in the cockpit's user view",
            "User Management & Role assignment across multiple Global Accounts, Sub-accounts, Directories, Cloud Foundry Orgs and Cloud Foundry Spaces in a single unified interface",
            "Cloud Foundry Org & Space manager assignments",
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
        </ul>
      </div>
    </div>

    {/* Footer callout */}
    <div className="btpxid-ias-footer">
      SAP publishes a knowledge base entry (<a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer" style={{ color: "#3A9A6A", textDecoration: "none" }}>KB 3220053</a>) confirming users remain in BTP subaccounts after IDP deletion. The cockpit doesn't show their CF role assignments. The service keys they created keep working. <strong>BTP xID is built to find them.</strong>
    </div>
  </div>
</section>

      {/* ===== CISO ANCHOR — WHAT YOU MIGHT BE MISSING ===== */}
      <section className="btpxid-risks">
        <div className="btpxid-risks-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">What you might be missing right now</div>
            <h2 className="btpxid-showcase-title">
              Three things SAP itself documents,<br />that your cockpit doesn't show you.
            </h2>
          </div>

          <div className="btpxid-risks-grid">
            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">Ghost users in BTP</div>
              <p className="btpxid-risk-card-body">
                When a user is deleted from your identity provider, their record can remain in your BTP subaccounts with their Cloud Foundry role assignments intact. SAP confirms this behaviour in its own knowledge base.
              </p>
              <p className="btpxid-risk-card-source">
                Source: <a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer">SAP KB 3220053</a>
              </p>
            </div>

            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">Long-lived service keys</div>
              <p className="btpxid-risk-card-body">
                Any Space Developer can create an OAuth service key against HANA Cloud, a Destination, or any other bound service. By default these credentials do not expire and are not visible in subaccount-level user audits. 43% of high-privilege cloud secrets exposed in 2025 fit exactly this profile.
              </p>
              <p className="btpxid-risk-card-source">
                Source: Verizon DBIR 2025
              </p>
            </div>

            <div className="btpxid-risk-card">
              <div className="btpxid-risk-card-label">A Space Developer reads every credential bound to that space</div>
              <p className="btpxid-risk-card-body">
                The Space Developer role grants direct access to environment variables containing plaintext credentials for every bound service — HANA Cloud, Destinations, Object Store — plus SSH access to every running application in that space. One mistaken role assignment is one mistake too many.
              </p>
              <p className="btpxid-risk-card-source">
                Source: <a href="https://help.sap.com/docs/btp/sap-business-technology-platform/about-roles-in-cloud-foundry-environment" target="_blank" rel="noopener noreferrer">SAP role documentation</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== API KEYS — SERVICE KEYS ARE API KEYS ===== */}
      <section className="btpxid-keys">
        <div className="btpxid-keys-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">Service keys are API keys</div>
            <h2 className="btpxid-showcase-title">
              Find every API key.<br />In one place. Finally.
            </h2>
            <p className="btpxid-showcase-sub">
              SAP calls them "service keys". Functionally they are long-lived OAuth API credentials your developers create against HANA Cloud, Destinations, the Connectivity Service, XSUAA, and every other bound service. They do not expire. They are not visible in the BTP cockpit's user view. Until BTP xID, there was no way in SAP BTP to see them all in one screen.
            </p>
          </div>

          <div className="btpxid-keys-compare">
            {/* LEFT — BTP today, nested */}
            <div className="btpxid-keys-col btpxid-keys-col-before">
              <div className="btpxid-keys-col-header">
                <span className="btpxid-keys-badge btpxid-keys-badge-before">BTP today</span>
                <h3 className="btpxid-keys-col-title">Buried under nesting</h3>
              </div>
              <div className="btpxid-keys-tree">
                <div className="btpxid-keys-tree-node" style={{ paddingLeft: "0" }}>
                  <span className="btpxid-keys-tree-bullet" />
                  <span className="btpxid-keys-tree-label">Global Account</span>
                  <span className="btpxid-keys-tree-count">1</span>
                </div>
                <div className="btpxid-keys-tree-node" style={{ paddingLeft: "24px" }}>
                  <span className="btpxid-keys-tree-bullet" />
                  <span className="btpxid-keys-tree-label">Sub-accounts</span>
                  <span className="btpxid-keys-tree-count">× 20</span>
                </div>
                <div className="btpxid-keys-tree-node" style={{ paddingLeft: "48px" }}>
                  <span className="btpxid-keys-tree-bullet" />
                  <span className="btpxid-keys-tree-label">Cloud Foundry Orgs</span>
                  <span className="btpxid-keys-tree-count">× 60+</span>
                </div>
                <div className="btpxid-keys-tree-node" style={{ paddingLeft: "72px" }}>
                  <span className="btpxid-keys-tree-bullet" />
                  <span className="btpxid-keys-tree-label">Cloud Foundry Spaces</span>
                  <span className="btpxid-keys-tree-count">× 300+</span>
                </div>
                <div className="btpxid-keys-tree-node btpxid-keys-tree-node-leaf" style={{ paddingLeft: "96px" }}>
                  <span className="btpxid-keys-tree-bullet btpxid-keys-tree-bullet-leaf" />
                  <span className="btpxid-keys-tree-label"><strong>Service Keys</strong> (API keys)</span>
                  <span className="btpxid-keys-tree-count btpxid-keys-tree-count-leaf">× thousands</span>
                </div>
              </div>
              <p className="btpxid-keys-col-footer">
                Click through every branch. One. By. One.<br />
                And there is no native view that aggregates them.
              </p>
            </div>

            {/* RIGHT — BTP xID flat */}
            <div className="btpxid-keys-col btpxid-keys-col-after">
              <div className="btpxid-keys-col-header">
                <span className="btpxid-keys-badge btpxid-keys-badge-after">With BTP xID</span>
                <h3 className="btpxid-keys-col-title">One auditable screen</h3>
              </div>
              <div className="btpxid-keys-list">
                <div className="btpxid-keys-list-header">
                  <span>Service Key</span>
                  <span>Sub-account</span>
                  <span>Space</span>
                </div>
                {[
                  ["hana-prod-admin", "prod-eu10", "billing"],
                  ["destination-uat", "uat-eu10", "integration"],
                  ["xsuaa-admin", "prod-us10", "workzone"],
                  ["connectivity-onprem", "prod-eu10", "shared"],
                  ["objectstore-backups", "prod-eu10", "archive"],
                ].map(([key, sub, space]) => (
                  <div key={key} className="btpxid-keys-list-row">
                    <span className="btpxid-keys-mono">{key}</span>
                    <span>{sub}</span>
                    <span>{space}</span>
                  </div>
                ))}
                <div className="btpxid-keys-list-more">
                  + thousands more across your landscape
                </div>
              </div>
              <p className="btpxid-keys-col-footer">
                Every service key, every account, every space.<br />
                Filter, audit, rotate, revoke.
              </p>
            </div>
          </div>

          {/* What each BTP service key actually unlocks */}
          <div className="btpxid-keys-breaches">
            <p className="btpxid-keys-breaches-intro">
              What a single leaked BTP service key actually unlocks:
            </p>
            <div className="btpxid-keys-breaches-grid">
              <div className="btpxid-keys-breach-card">
                <div className="btpxid-keys-breach-year">HANA Cloud service key</div>
                <div className="btpxid-keys-breach-title">Direct database access</div>
                <p className="btpxid-keys-breach-body">
                  A HANA Cloud service key contains a JDBC URL, a database username and a plaintext password. Anyone holding the key can connect directly to the database as that user. No additional authentication. Full read access to whatever the user's grants allow — customer PII, financial records, any schema the binding can reach.
                </p>
              </div>
              <div className="btpxid-keys-breach-card">
                <div className="btpxid-keys-breach-year">Destination service key</div>
                <div className="btpxid-keys-breach-title">Your backend SAP systems</div>
                <p className="btpxid-keys-breach-body">
                  The Destination service stores credentials for backend systems — S/4HANA, ECC, third-party APIs. A leaked Destination service key lets the holder call any configured destination using the credentials your team already stored there. They never need to authenticate to your backend systems directly.
                </p>
              </div>
              <div className="btpxid-keys-breach-card">
                <div className="btpxid-keys-breach-year">Connectivity service key</div>
                <div className="btpxid-keys-breach-title">A passage into your network</div>
                <p className="btpxid-keys-breach-body">
                  The Connectivity service tunnels BTP traffic into your on-premise network via the Cloud Connector. A leaked Connectivity service key effectively grants the holder a route into your corporate network — for any system the Cloud Connector is configured to expose.
                </p>
              </div>
            </div>
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, marginTop: "2rem", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" }}>
              These keys are created by Space Developers. They do not expire by default. They are not visible in the BTP cockpit's user view. And when the developer who created them leaves your company, the keys keep working.
            </p>
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <a href="/blog/btp-service-keys-api-credentials" style={{ color: "#3A9A6A", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
                Read the full story: service keys, API keys, and the BTP visibility problem →
              </a>
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

      {/* ===== ROADMAP — capabilities BTP doesn't have, that we are building ===== */}
      <section className="btpxid-roadmap">
        <div className="btpxid-roadmap-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">On the roadmap</div>
            <h2 className="btpxid-showcase-title">
              Built for what BTP doesn't have yet.
            </h2>
            <p className="btpxid-showcase-sub">
              The capabilities below are on our near-term roadmap. They reflect the requests our enterprise customers raise most often — and the gaps SAP BTP itself does not yet address.
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
                Surface dormant accounts, unused role collections, and stale service keys for your quarterly review — without your team building a single SQL query or PowerShell script.
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
