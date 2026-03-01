import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import BTPxIDFeatures from "@/components/BTPxIDFeatures";
import BTPxIDShowcase from "@/components/BTPxIDShowcase";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  ArrowRight,
  Download,
  Apple,
  Monitor,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import btpxidIcon from "@assets/btp-xid-icon.png";

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
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  unknown: "your platform",
};

const OS_ICONS: Record<OSType, typeof Apple> = {
  mac: Apple,
  windows: Monitor,
  linux: Monitor,
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
    label: "macOS (Apple Silicon)",
    description: "DMG for M1, M2, M3, M4 Macs",
    fileName: "BTP-xID-mac-arm64.dmg",
    os: "mac",
    arch: "arm64",
  },
  {
    label: "macOS (Intel)",
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
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">(
    "annual"
  );
  const [showAllDownloads, setShowAllDownloads] = useState(false);
  const { getLocalizedPath } = useLocalizedPath();

  useEffect(() => {
    setOS(detectOS());
    setArch(detectArch());
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
            <div className="btpxid-badge">
              <span className="btpxid-badge-dot" />
              The World's First SAP BTP User Management App
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

            <div className="btpxid-trust-bar">
              <div className="btpxid-trust-item">
                <span className="btpxid-trust-number">1st</span>
                <span className="btpxid-trust-label">
                  SAP BTP User Management App
                </span>
              </div>
              <div className="btpxid-trust-divider" />
              <div className="btpxid-trust-item">
                <span className="btpxid-trust-number">100%</span>
                <span className="btpxid-trust-label">SAP BTP Specialized</span>
              </div>
              <div className="btpxid-trust-divider" />
              <div className="btpxid-trust-item">
                <span className="btpxid-trust-number">3</span>
                <span className="btpxid-trust-label">
                  Platforms Supported
                </span>
              </div>
            </div>
          </div>

          <div className="btpxid-visual">
            <div className="btpxid-icon-showcase">
              <img
                src={btpxidIcon}
                alt="BTP xID App Icon"
                className="btpxid-icon-main"
                width={200}
                height={200}
              />
              <div className="btpxid-float-card btpxid-fc-1">
                <span
                  className="btpxid-dot"
                  style={{ background: "#4CAF50" }}
                />
                Global Account · 3 subs
              </div>
              <div className="btpxid-float-card btpxid-fc-2">
                <span
                  className="btpxid-dot"
                  style={{ background: "#1E5099" }}
                />
                CF Org · Production
              </div>
              <div className="btpxid-float-card btpxid-fc-3">
                <span
                  className="btpxid-dot"
                  style={{ background: "#2A7088" }}
                />
                12 Service Users
              </div>
              <div className="btpxid-float-card btpxid-fc-4">
                <span
                  className="btpxid-dot"
                  style={{ background: "#E8A838" }}
                />
                Reverse Search
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <BTPxIDFeatures />

      {/* ===== SCREENSHOT SHOWCASE ===== */}
      <BTPxIDShowcase />

      {/* ===== PRICING ===== */}
      <section className="btpxid-pricing" id="pricing">
        <div className="btpxid-pricing-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">Pricing</div>
            <h2 className="btpxid-showcase-title">
              Simple, transparent pricing
            </h2>
            <p className="btpxid-showcase-sub">
              Start with a free trial. Upgrade when you're ready.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="btpxid-billing-toggle">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`btpxid-billing-btn ${billingInterval === "monthly" ? "btpxid-billing-active" : ""}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval("annual")}
              className={`btpxid-billing-btn ${billingInterval === "annual" ? "btpxid-billing-active" : ""}`}
            >
              Annual
              <span className="btpxid-save-badge">Save 17%</span>
            </button>
          </div>

          <div className="btpxid-pricing-grid">
            {/* Pro Plan */}
            <div className="btpxid-plan-card">
              <div className="btpxid-plan-header">
                <h3 className="btpxid-plan-name">Pro</h3>
                <p className="btpxid-plan-desc">
                  For teams managing up to 10 BTP accounts
                </p>
              </div>
              <div className="btpxid-plan-price">
                <span className="btpxid-price-amount">
                  ${billingInterval === "monthly" ? "99" : "990"}
                </span>
                <span className="btpxid-price-period">
                  AUD / {billingInterval === "monthly" ? "month" : "year"}
                </span>
              </div>
              <ul className="btpxid-plan-features">
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>SAP BTP User Management</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Up to 10 BTP accounts</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Bulk user provisioning</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Audit log & reporting</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Email support</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection("#download")}
                className="btpxid-plan-btn"
              >
                Start Free Trial
              </button>
            </div>

            {/* Advanced Plan */}
            <div className="btpxid-plan-card btpxid-plan-featured">
              <div className="btpxid-plan-popular">Most Popular</div>
              <div className="btpxid-plan-header">
                <h3 className="btpxid-plan-name">Advanced</h3>
                <p className="btpxid-plan-desc">
                  For enterprises with unlimited BTP accounts
                </p>
              </div>
              <div className="btpxid-plan-price">
                <span className="btpxid-price-amount">
                  ${billingInterval === "monthly" ? "199" : "1,990"}
                </span>
                <span className="btpxid-price-period">
                  AUD / {billingInterval === "monthly" ? "month" : "year"}
                </span>
              </div>
              <ul className="btpxid-plan-features">
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Everything in Pro, plus:</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>SAP BTP Backup & Restore</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Unlimited BTP accounts</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Scheduled automation</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Emergency access console</span>
                </li>
                <li>
                  <CheckCircle className="h-4 w-4" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection("#download")}
                className="btpxid-plan-btn btpxid-plan-btn-primary"
              >
                Start Free Trial
              </button>
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
              {ALL_DOWNLOADS.map((dl) => (
                <button
                  key={dl.fileName}
                  onClick={() => {
                    /* TODO: actual download URL */
                  }}
                  className="btpxid-download-option"
                >
                  <div>
                    <div className="btpxid-download-option-label">
                      {dl.label}
                    </div>
                    <div className="btpxid-download-option-desc">
                      {dl.description}
                    </div>
                  </div>
                  <Download className="h-4 w-4 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          <div className="btpxid-download-info">
            <p>
              Version 1.0.0 · Requires macOS 12+, Windows 10+, or Ubuntu 20.04+
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
