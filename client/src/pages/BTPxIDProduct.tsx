import { useState, useEffect } from "react";
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

const VALUE_PROPS = [
  { text: "Only BTP user mgmt app you'll ever need", dot: "#4CAF50" },
  { text: "Ex-employee still has access?",   dot: "#E8A838" },
  { text: "Over-privileged users — exposed", dot: "#E8A838" },
  { text: "One app. Every user. All scopes", dot: "#4CAF50" },
  { text: "Ghost accounts — made visible",   dot: "#E8A838" },
  { text: "Know who has what — before audits", dot: "#2A7088" },
  { text: "SAP OAuth — nothing stored",      dot: "#4CAF50" },
];

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

const OS_LABELS: Record<OSType, string> = {
  mac: "MacOS",
  windows: "Windows",
  unknown: "your platform",
};

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
  label: string;
  description: string;
  os: OSType;
  arch?: string;
}

const ALL_DOWNLOADS: DownloadOption[] = [
  {
    id: "mac-arm64",
    label: "MacOS Apple Silicon",
    description: "DMG for M1, M2, M3, M4 Macs",
    os: "mac",
    arch: "arm64",
  },
  {
    id: "mac-x64",
    label: "MacOS Intel",
    description: "DMG for Intel-based Macs",
    os: "mac",
    arch: "x64",
  },
  {
    id: "win-installer",
    label: "Windows Installer",
    description: "NSIS installer for Windows 10/11",
    os: "windows",
    arch: "x64",
  },
  {
    id: "win-portable",
    label: "Windows Portable",
    description: "No installation required",
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
    isFeatured: true, featuredLabel: "Full Access",
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
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [cardRound, setCardRound] = useState(0);
  const [cardsFading, setCardsFading] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [packages, setPackages] = useState<PricingPackage[]>(FALLBACK_PACKAGES);
  const { getLocalizedPath } = useLocalizedPath();

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
        title="BTP xID — SAP BTP User Management | TerraBT"
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
              One app.
              <br />
              Every <span className="btpxid-highlight">user</span>.
              <br />
              All <span className="btpxid-highlight">accounts</span>.
            </h1>

            <p className="btpxid-subtitle">
              Manage users across global accounts, sub-accounts, Cloud Foundry
              orgs and spaces — all from a single pane of glass. Reverse search
              any user instantly.
            </p>

            <div className="btpxid-hero-dl">
              {primaryDownloadUrl ? (
                <a href={primaryDownloadUrl} className="btpxid-download-btn">
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="btpxid-download-btn-text">
                    <span className="btpxid-download-btn-title">Download for {primaryDownload.label}</span>
                    <span className="btpxid-download-btn-desc">{primaryDownload.description} · v{versionInfo!.version}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </a>
              ) : (
                <button disabled className="btpxid-download-btn" style={{ opacity: 0.7 }}>
                  <PrimaryIcon className="h-6 w-6" />
                  <div className="btpxid-download-btn-text">
                    <span className="btpxid-download-btn-title">Loading...</span>
                    <span className="btpxid-download-btn-desc">{primaryDownload.description}</span>
                  </div>
                  <Download className="h-5 w-5" />
                </button>
              )}

              <button
                onClick={() => { setShowAllDownloads(true); scrollToSection("#download"); }}
                className="btpxid-download-other"
              >
                Show all download options
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
                  SAP OAuth · No credentials stored
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
            <div className="btpxid-features-label">Security</div>
            <h2 className="btpxid-showcase-title">
              Built for admins who take security seriously.
            </h2>
            <p className="btpxid-showcase-sub">
              BTP xID connects to your SAP BTP landscape using standard SAP APIs and SAP's own authentication.
              We never see, store, or touch your credentials — ever.
            </p>
          </div>
          <div className="btpxid-security-grid">
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🔒</div>
              <h3>No credentials stored</h3>
              <p>BTP xID never stores your SAP BTP passwords, tokens, or service keys. Authentication flows directly through SAP's own OAuth infrastructure — not through our servers.</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🖥️</div>
              <h3>Your data stays on your machine</h3>
              <p>This is a local desktop app. Your user lists, session data, and account details never leave your machine. TerraBT has no visibility into your BTP landscape.</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">🔑</div>
              <h3>SAP authentication</h3>
              <p>Log in with your existing SAP identity. BTP xID uses the same secure API channels SAP provides to every platform administrator — no new accounts, no new passwords.</p>
            </div>
            <div className="btpxid-security-card">
              <div className="btpxid-security-icon">👁️</div>
              <h3>See what SAP Cockpit hides</h3>
              <p>Ghost IDs, shadow users, and orphaned accounts accumulate silently across subaccounts. BTP xID surfaces every user across every scope — including the ones your standard cockpit view misses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="btpxid-pricing" id="pricing">
        <div className="btpxid-pricing-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">Pricing</div>
            <h2 className="btpxid-showcase-title">
              Simple, transparent pricing
            </h2>
            <p className="btpxid-showcase-sub">
              Start free for 90 days. No credit card required.
            </p>
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
                <div className="btpxid-plan-price">
                  {pkg.contactEmail ? (
                    <span className="btpxid-price-amount btpxid-price-contact">Custom</span>
                  ) : (
                    <>
                      <span className="btpxid-price-amount">
                        ${Math.round(pkg.displayPriceMonthly / 100)}
                      </span>
                      {pkg.pricePeriodLabel && (
                        <span className="btpxid-price-period">{pkg.pricePeriodLabel}</span>
                      )}
                    </>
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
                    {pkg.ctaLabel || "Contact Sales"}
                  </a>
                ) : pkg.ctaUrl?.startsWith("#") ? (
                  <button
                    onClick={() => scrollToSection(pkg.ctaUrl!)}
                    className={`btpxid-plan-btn${pkg.isFeatured ? " btpxid-plan-btn-primary" : ""}`}
                  >
                    {pkg.ctaLabel || "Get Started"}
                  </button>
                ) : (
                  <a
                    href={pkg.ctaUrl || "#"}
                    className={`btpxid-plan-btn${pkg.isFeatured ? " btpxid-plan-btn-primary" : ""}`}
                  >
                    {pkg.ctaLabel || "Get Started"}
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
            <div className="btpxid-features-label">Download</div>
            <h2 className="btpxid-showcase-title">
              Ready to get started?
            </h2>
            <p className="btpxid-showcase-sub">
              Download BTP xID for free. No credit card required. Choose your
              plan later.
            </p>
          </div>

          {/* Primary OS download */}
          <div className="btpxid-download-primary">
            {primaryDownloadUrl ? (
              <a href={primaryDownloadUrl} className="btpxid-download-btn">
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">
                    Download for {primaryDownload.label}
                  </span>
                  <span className="btpxid-download-btn-desc">
                    {primaryDownload.description} · v{versionInfo!.version}
                  </span>
                </div>
                <Download className="h-5 w-5" />
              </a>
            ) : (
              <button disabled className="btpxid-download-btn" style={{ opacity: 0.7 }}>
                <PrimaryIcon className="h-6 w-6" />
                <div className="btpxid-download-btn-text">
                  <span className="btpxid-download-btn-title">Loading...</span>
                  <span className="btpxid-download-btn-desc">
                    {primaryDownload.description}
                  </span>
                </div>
                <Download className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => setShowAllDownloads(!showAllDownloads)}
              className="btpxid-download-other"
            >
              {showAllDownloads ? "Hide" : "Show"} all download options
            </button>
          </div>

          {/* All download options */}
          {showAllDownloads && (
            <div className="btpxid-download-grid">
              {ALL_DOWNLOADS.map((dl) => {
                const url = versionInfo ? getDownloadUrl(dl.id, versionInfo) : null;
                const DlIcon = DL_ICONS[dl.id];
                return url ? (
                  <a key={dl.id} href={url} className="btpxid-download-option">
                    <div>
                      <div className="btpxid-download-option-label">{dl.label}</div>
                      <div className="btpxid-download-option-desc">{dl.description}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </a>
                ) : (
                  <button key={dl.id} disabled className="btpxid-download-option" style={{ opacity: 0.7 }}>
                    <div>
                      <div className="btpxid-download-option-label">{dl.label}</div>
                      <div className="btpxid-download-option-desc">{dl.description}</div>
                    </div>
                    <DlIcon className="h-4 w-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="btpxid-download-info">
            <p>
              {versionInfo ? `Version ${versionInfo.version}` : "Loading version..."} · Requires MacOS 12+ or Windows 10+
            </p>
            <p>
              By downloading, you agree to the{" "}
              <a href="/terms-of-service">Terms of Service</a> and{" "}
              <a href="/privacy-policy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
