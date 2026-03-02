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
  ArrowRight,
  Download,
  CheckCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { FaApple, FaWindows, FaLinux } from "react-icons/fa6";
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

type OSType = "mac" | "windows" | "linux" | "unknown";

function detectOS(): OSType {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

function detectArch(): "arm64" | "x64" {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("arm") || ua.includes("aarch64")) return "arm64";
  // Apple Silicon Macs report as Intel in user agent but we can check platform
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
  linux: "Linux",
  unknown: "your platform",
};

const OS_ICONS: Record<OSType, React.ComponentType<{ className?: string }>> = {
  mac: FaApple,
  windows: FaWindows,
  linux: FaLinux,
  unknown: Download,
};

interface DownloadOption {
  label: string;
  description: string;
  fileName: string;
  os: OSType;
  arch?: string;
}

const ALL_DOWNLOADS: DownloadOption[] = [
  {
    label: "MacOS (Apple Silicon)",
    description: "DMG for M1, M2, M3, M4 Macs",
    fileName: "BTP-xID-mac-arm64.dmg",
    os: "mac",
    arch: "arm64",
  },
  {
    label: "MacOS (Intel)",
    description: "DMG for Intel-based Macs",
    fileName: "BTP-xID-mac-x64.dmg",
    os: "mac",
    arch: "x64",
  },
  {
    label: "Windows Installer",
    description: "NSIS installer for Windows 10/11",
    fileName: "BTP-xID-Setup.exe",
    os: "windows",
    arch: "x64",
  },
  {
    label: "Windows Portable",
    description: "No installation required",
    fileName: "BTP-xID-Portable.exe",
    os: "windows",
    arch: "x64",
  },
  {
    label: "Linux AppImage",
    description: "Runs on most Linux distributions",
    fileName: "BTP-xID.AppImage",
    os: "linux",
    arch: "x64",
  },
  {
    label: "Linux DEB",
    description: "For Ubuntu, Debian, and derivatives",
    fileName: "BTP-xID.deb",
    os: "linux",
    arch: "x64",
  },
];

function getPrimaryDownload(os: OSType, arch: string): DownloadOption {
  if (os === "mac") {
    return (
      ALL_DOWNLOADS.find((d) => d.os === "mac" && d.arch === arch) ??
      ALL_DOWNLOADS[0]
    );
  }
  if (os === "windows") {
    return ALL_DOWNLOADS.find((d) => d.os === "windows" && !d.fileName.includes("Portable"))!;
  }
  if (os === "linux") {
    return ALL_DOWNLOADS.find((d) => d.os === "linux" && d.fileName.includes("AppImage"))!;
  }
  return ALL_DOWNLOADS[0];
}

export default function BTPxIDProduct() {
  const [os, setOS] = useState<OSType>("unknown");
  const [arch, setArch] = useState<"arm64" | "x64">("arm64");
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const [cardRound, setCardRound] = useState(0);
  const [cardsFading, setCardsFading] = useState(false);
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

  const primaryDownload = getPrimaryDownload(os, arch);
  const PrimaryIcon = OS_ICONS[os];

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
        description="The world's first desktop app for SAP BTP user management. Manage users across global accounts, sub-accounts, CF orgs, and spaces from one place."
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

            <div className="btpxid-actions">
              <button
                onClick={() => {
                  /* TODO: actual download URL */
                }}
                className="btpxid-btn-primary"
              >
                <Download className="h-4 w-4" />
                <span>Download for {OS_LABELS[os]}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#pricing")}
                className="btpxid-btn-secondary"
              >
                <span>View Pricing</span>
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
            {/* Free Plan */}
            <div className="btpxid-plan-card">
              <div className="btpxid-plan-header">
                <h3 className="btpxid-plan-name">Free</h3>
                <p className="btpxid-plan-desc">
                  Try BTP xID free for 90 days — no credit card required
                </p>
              </div>
              <div className="btpxid-plan-price">
                <span className="btpxid-price-amount">$0</span>
                <span className="btpxid-price-period">/ 90 days</span>
              </div>
              <ul className="btpxid-plan-features">
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>User management across Global Account, Subaccount, CF Org, CF Space and directories</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Single Global Account</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Reverse Lookup</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Mass add & edit users</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Service Key Management</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Assign users across multiple accounts in one click</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection("#download")}
                className="btpxid-plan-btn"
              >
                Start Free Trial
              </button>
            </div>

            {/* Basic Plan */}
            <div className="btpxid-plan-card btpxid-plan-featured">
              <div className="btpxid-plan-popular">Full Access</div>
              <div className="btpxid-plan-header">
                <h3 className="btpxid-plan-name">Basic</h3>
                <p className="btpxid-plan-desc">
                  Ongoing access for SAP BTP administrators
                </p>
              </div>
              <div className="btpxid-plan-price">
                <span className="btpxid-price-amount">$200</span>
                <span className="btpxid-price-period">/ month</span>
              </div>
              <ul className="btpxid-plan-features">
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>User management across Global Account, Subaccount, CF Org, CF Space and directories</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Single Global Account</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Reverse Lookup</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Mass add & edit users</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Service Key Management</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Assign users across multiple accounts in one click</span>
                </li>
              </ul>
              <a
                href="https://accounts.terrabt.com/auth/login"
              >
                <button className="btpxid-plan-btn btpxid-plan-btn-primary">
                  Subscribe
                </button>
              </a>
            </div>
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
            <button
              onClick={() => {
                /* TODO: actual download URL */
              }}
              className="btpxid-download-btn"
            >
              <PrimaryIcon className="h-6 w-6" />
              <div className="btpxid-download-btn-text">
                <span className="btpxid-download-btn-title">
                  Download for {primaryDownload.label}
                </span>
                <span className="btpxid-download-btn-desc">
                  {primaryDownload.description}
                </span>
              </div>
              <Download className="h-5 w-5" />
            </button>

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
                const PlatformIcon = OS_ICONS[dl.os];
                return (
                  <button
                    key={dl.fileName}
                    onClick={() => {
                      /* TODO: actual download URL */
                    }}
                    className="btpxid-download-option"
                  >
                    <PlatformIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 text-left">
                      <div className="btpxid-download-option-label">
                        {dl.label}
                      </div>
                      <div className="btpxid-download-option-desc">
                        {dl.description}
                      </div>
                    </div>
                    <Download className="h-4 w-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="btpxid-download-info">
            <p>
              Version 1.0.0 · Requires MacOS 12+, Windows 10+, or Ubuntu 20.04+
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
