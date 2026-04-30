import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import BTPxIDFeatures from "@/components/BTPxIDFeatures";
import BTPxIDShowcase from "@/components/BTPxIDShowcase";
import SecurityShield from "@/components/SecurityShield";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Download,
  CheckCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { FaApple, FaWindows } from "react-icons/fa6";
import btpxidIcon from "@assets/btp-xid-icon.png";
import userListImg from "@assets/BTP_xID_User_List_1772336098799.png";

const VALUE_PROP_DOTS = ["#4CAF50", "#E8A838", "#E8A838", "#4CAF50", "#E8A838", "#2A7088", "#4CAF50"];

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

interface PricingPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  displayPriceMonthly: number;
  displayPriceAnnual: number;
  displayCurrency: string;
  isFeatured: boolean;
  featuredLabel: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  contactEmail: string | null;
  pricePeriodLabel: string | null;
}

const FALLBACK_PACKAGES: PricingPackage[] = [
  {
    id: "free",
    name: "Free",
    description: "Try BTP xID free for 90 days — no credit card required",
    features: [
      "User management across Global Account, Subaccount, CF Org, CF Space and directories",
      "Single Global Account",
      "Reverse Lookup",
      "Mass add & edit users",
      "Service Key Management",
      "Assign users across multiple accounts in one click",
    ],
    displayPriceMonthly: 0, displayPriceAnnual: 0, displayCurrency: "AUD",
    isFeatured: false, featuredLabel: null,
    ctaLabel: "Start Free Trial", ctaUrl: "#download",
    contactEmail: null, pricePeriodLabel: "/ 90 days",
  },
  {
    id: "basic",
    name: "Basic",
    description: "Ongoing access for SAP BTP administrators",
    features: [
      "User management across Global Account, Subaccount, CF Org, CF Space and directories",
      "Single Global Account",
      "Reverse Lookup",
      "Mass add & edit users",
      "Service Key Management",
      "Assign users across multiple accounts in one click",
    ],
    displayPriceMonthly: 20000, displayPriceAnnual: 200000, displayCurrency: "AUD",
    isFeatured: true, featuredLabel: null,
    ctaLabel: "Subscribe", ctaUrl: "https://accounts.terrabt.com/auth/login",
    contactEmail: null, pricePeriodLabel: "/ month",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large-scale SAP BTP deployments",
    features: [
      "Everything in Basic",
      "Multiple Global Accounts",
      "Dedicated support & onboarding",
      "Custom integrations",
      "SLA guarantees",
      "Volume licensing",
    ],
    displayPriceMonthly: 0, displayPriceAnnual: 0, displayCurrency: "AUD",
    isFeatured: false, featuredLabel: null,
    ctaLabel: "Contact Sales", ctaUrl: null,
    contactEmail: "sales@terrabt.com", pricePeriodLabel: null,
  },
];

export default function BTPxIDProduct() {
  const { t } = useTranslation();
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [showSmartScreenNotice, setShowSmartScreenNotice] = useState(false);
  const [cardRound, setCardRound] = useState(0);
  const [cardsFading, setCardsFading] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [packages, setPackages] = useState<PricingPackage[]>(FALLBACK_PACKAGES);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const { getLocalizedPath } = useLocalizedPath();

  const VALUE_PROPS = VALUE_PROP_DOTS.map((dot, i) => ({
    text: t(`btpxidProduct.valueProps.${i}`),
    dot,
  }));

  useEffect(() => {
    setOS(detectOS());
    setArch(detectArch());
  }, []);

  useEffect(() => {
    fetch("https://accounts.terrabt.com/api/catalog/packages?product=SAPBTPUserManagement")
      .then((r) => r.json())
      .then((products: Array<{ name: string; packages: PricingPackage[] }>) => {
        if (products.length > 0 && products[0].packages.length > 0) {
          setPackages(products[0].packages);
        }
      })
      .catch(() => { /* fallback stays */ });
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
        description="The world's first desktop app for SAP BTP user management. Manage users across global accounts, sub-accounts, CF orgs, and spaces from one place. Available for Windows and MacOS."
        path="/products/btp-xid"
      />
      <Navigation />

      {/* ===== HERO WITH DOWNLOAD ===== */}
      <section className="btpxid-hero" id="home">
        <div className="btpxid-grid" />
        <div className="btpxid-orb btpxid-orb-1" />
        <div className="btpxid-orb btpxid-orb-2" />
        <div className="btpxid-orb btpxid-orb-3" />

        <div className="btpxid-hero-inner">
          <div className="btpxid-hero-content">
            <div className="btpxid-app-icon-wrap">
              <img src={btpxidIcon} alt="BTP xID" className="btpxid-app-icon" />
            </div>
            <h1 className="btpxid-title">
              {t('btpxidProduct.hero.title1')}
              <br />
              <span className="btpxid-highlight">{t('btpxidProduct.hero.title2')}</span>
              <br />
              <span className="btpxid-highlight">{t('btpxidProduct.hero.title3')}</span>
            </h1>

            <p className="btpxid-subtitle">
              {t('btpxidProduct.hero.description')}
            </p>

            <div className="btpxid-hero-dl">
              {primaryDownloadUrl ? (
                <a
                  href={primaryDownloadUrl}
                  className="btpxid-download-btn"
                  onClick={() => { if (os === "windows") setShowSmartScreenNotice(true); }}
                >
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="btpxid-download-btn-text">
                    <span className="btpxid-download-btn-title">{t('btpxidProduct.download.primaryButton', { label: primaryDownloadLabel })}</span>
                    <span className="btpxid-download-btn-desc">{primaryDownloadDesc} · v{versionInfo!.version}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </a>
              ) : (
                <button disabled className="btpxid-download-btn" style={{ opacity: 0.7 }}>
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="btpxid-download-btn-text">
                    <span className="btpxid-download-btn-title">{t('btpxidProduct.download.loading')}</span>
                    <span className="btpxid-download-btn-desc">{primaryDownloadDesc}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => { setShowAllDownloads(true); scrollToSection("#download"); }}
                className="btpxid-download-other"
              >
                {t('btpxidProduct.download.showAll')}
              </button>
            </div>

          </div>

          <div className="btpxid-visual">
            <div className="btpxid-icon-showcase">
              {/* Product screenshot — the actual app */}
              <div className="btpxid-screenshot-frame">
                <img
                  src={userListImg}
                  alt="BTP xID — User management across all SAP BTP scopes"
                  className="btpxid-screenshot-main"
                />
                {/* Shield security trust badge overlaid on screenshot */}
                <div className="btpxid-shield-badge">
                  <Shield className="h-3 w-3" />
                  {t('btpxidProduct.hero.shieldBadge')}
                </div>
              </div>

              {/* Floating value-prop cards — cycle through all messages */}
              {[0, 2, 4, 6].map((offset, i) => {
                const prop = VALUE_PROPS[(cardRound + offset) % VALUE_PROPS.length];
                return (
                  <div
                    key={i}
                    className={`btpxid-float-card btpxid-fc-${i + 1}`}
                    style={{ opacity: cardsFading ? 0 : 1, transition: "opacity 0.3s ease" }}
                  >
                    <span className="btpxid-dot" style={{ background: prop.dot }} />
                    {prop.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <BTPxIDFeatures />

      {/* ===== SCREENSHOT SHOWCASE ===== */}
      <BTPxIDShowcase />

      {/* ===== SECURITY ===== */}
      <section className="btpxid-security">
        <div className="btpxid-security-inner">
          <div className="btpxid-showcase-header">
            <SecurityShield className="btpxid-security-shield-icon" />
            <div className="btpxid-features-label">{t('btpxidProduct.security.label')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.security.title')}
            </h2>
            <p className="btpxid-showcase-sub">
              {t('btpxidProduct.security.description')}
            </p>
          </div>
          <div className="btpxid-security-grid">
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🔒</div>
              <h3>{t('btpxidProduct.security.noCredentials.title')}</h3>
              <p>{t('btpxidProduct.security.noCredentials.description')}</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🖥️</div>
              <h3>{t('btpxidProduct.security.localData.title')}</h3>
              <p>{t('btpxidProduct.security.localData.description')}</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🔑</div>
              <h3>{t('btpxidProduct.security.sapAuth.title')}</h3>
              <p>{t('btpxidProduct.security.sapAuth.description')}</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">👁️</div>
              <h3>{t('btpxidProduct.security.hiddenData.title')}</h3>
              <p>{t('btpxidProduct.security.hiddenData.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="btpxid-pricing" id="pricing">
        <div className="btpxid-pricing-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.pricing.label')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.pricing.title')}
            </h2>
            <p className="btpxid-showcase-sub">
              {t('btpxidProduct.pricing.subtitle')}
            </p>
          </div>

          {/* Billing interval toggle */}
          <div className="btpxid-billing-toggle">
            <button
              className={`btpxid-billing-option${billingInterval === "monthly" ? " btpxid-billing-active" : ""}`}
              onClick={() => setBillingInterval("monthly")}
            >
              {t('btpxidProduct.billing.monthly')}
            </button>
            <button
              className={`btpxid-billing-option${billingInterval === "annual" ? " btpxid-billing-active" : ""}`}
              onClick={() => setBillingInterval("annual")}
            >
              {t('btpxidProduct.billing.annual')}
              <span className="btpxid-billing-save">{t('btpxidProduct.billing.save')}</span>
            </button>
          </div>

          <div className="btpxid-pricing-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`btpxid-plan-card${pkg.isFeatured ? " btpxid-plan-featured" : ""}`}
              >
                {pkg.featuredLabel && (
                  <div className="btpxid-plan-popular">{pkg.featuredLabel}</div>
                )}
                <div className="btpxid-plan-header">
                  <h3 className="btpxid-plan-name">{pkg.name}</h3>
                  <p className="btpxid-plan-desc">{pkg.description}</p>
                </div>
                <div className="btpxid-plan-price-wrap">
                  <div className="btpxid-plan-price">
                    {pkg.contactEmail ? null : pkg.displayPriceMonthly === 0 ? (
                      <span className="btpxid-price-amount">{t('btpxidProduct.pricing.free')}</span>
                    ) : (
                      <>
                        <span className="btpxid-price-amount">
                          ${billingInterval === "monthly"
                            ? Math.round(pkg.displayPriceMonthly / 100)
                            : Math.round(pkg.displayPriceAnnual / 100 / 12)}
                        </span>
                        <span className="btpxid-price-period">{t('btpxidProduct.pricing.perMonth')}</span>
                      </>
                    )}
                  </div>
                  {!pkg.contactEmail && pkg.displayPriceMonthly > 0 && billingInterval === "annual" && (
                    <div className="btpxid-price-annual-note">
                      {t('btpxidProduct.pricing.billedAnnually', { amount: Math.round(pkg.displayPriceAnnual / 100) })}
                    </div>
                  )}
                </div>
                <ul className="btpxid-plan-features">
                  {(pkg.features as string[]).map((feature, i) => (
                    <li key={i}>
                      <CheckCircle className="h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.contactEmail ? (
                  <a href={`mailto:${pkg.contactEmail}`} className="btpxid-plan-btn">
                    {pkg.ctaLabel || t('btpxidProduct.pricing.contactSales')}
                  </a>
                ) : pkg.ctaUrl?.startsWith("#") ? (
                  <button
                    onClick={() => scrollToSection(pkg.ctaUrl!)}
                    className={`btpxid-plan-btn${pkg.isFeatured ? " btpxid-plan-btn-primary" : ""}`}
                  >
                    {pkg.ctaLabel || t('btpxidProduct.pricing.getStarted')}
                  </button>
                ) : (
                  <a
                    href={pkg.ctaUrl || "#"}
                    className={`btpxid-plan-btn${pkg.isFeatured ? " btpxid-plan-btn-primary" : ""}`}
                  >
                    {pkg.ctaLabel || t('btpxidProduct.pricing.getStarted')}
                  </a>
                )}
              </div>
            ))}
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

          {/* Primary OS download */}
          <div className="btpxid-download-primary">
            {primaryDownloadUrl ? (
              <a
                href={primaryDownloadUrl}
                className="btpxid-download-btn"
                onClick={() => { if (os === "windows") setShowSmartScreenNotice(true); }}
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
                  <a key={dl.id} href={url} className="btpxid-download-option">
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

      <Footer />
    </div>
  );
}
