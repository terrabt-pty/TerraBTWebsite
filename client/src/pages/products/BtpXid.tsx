import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  Download,
  ArrowLeft,
  Check,
  Monitor,
  Users,
  Search,
  Shield,
  Key,
  RefreshCw,
  Star,
  Building2,
  Zap,
} from "lucide-react";
import userListImg from "@assets/BTP_xID_User_List_1772336098799.png";

type OS = "windows" | "macos-silicon" | "macos-intel";

interface DownloadOption {
  id: OS;
  label: string;
  sublabel: string;
}

const downloadOptions: DownloadOption[] = [
  { id: "windows", label: "Windows", sublabel: "Windows 10 / 11" },
  { id: "macos-silicon", label: "macOS Apple Silicon", sublabel: "M1, M2, M3, M4" },
  { id: "macos-intel", label: "macOS Intel", sublabel: "Intel x64" },
];

const R2_BASE = "https://updates.terrabt.com/btp-xid";

interface VersionInfo {
  version: string;
  mac: { arm64: string; x64: string };
  win: { x64: string };
}

function buildDownloadUrl(os: OS, v: VersionInfo): string {
  switch (os) {
    case "macos-silicon": return `${R2_BASE}/${encodeURIComponent(v.mac.arm64)}`;
    case "macos-intel":   return `${R2_BASE}/${encodeURIComponent(v.mac.x64)}`;
    case "windows":       return `${R2_BASE}/${encodeURIComponent(v.win.x64)}`;
  }
}

const screenshots = [
  { src: userListImg, caption: "User List — hierarchical view across Global Account → Subaccount → CF Org → CF Space" },
];

const features = [
  {
    icon: Monitor,
    title: "Full Landscape Overview",
    description: "Dashboard showing all Global Accounts and CF Environments at a glance with live connection status.",
  },
  {
    icon: Users,
    title: "Hierarchical User Management",
    description: "Manage users across Global Account → Subaccount → CF Org → CF Space in a single unified tree view.",
  },
  {
    icon: Search,
    title: "Instant User Lookup",
    description: "Find any user across your entire BTP landscape in seconds — including ghost accounts.",
  },
  {
    icon: Shield,
    title: "Role Management",
    description: "Assign and remove role collections and CF roles per scope with confirmation dialogs for destructive actions.",
  },
  {
    icon: Key,
    title: "Service Key Management",
    description: "View, rotate, disable, and delete service keys and API credentials across all subaccounts.",
  },
  {
    icon: RefreshCw,
    title: "Live Streaming Updates",
    description: "Users appear as they're discovered — no waiting for full dataset loads.",
  },
];

const SUBSCRIBE_URL = "https://accounts.terrabt.com/auth/login";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  seats: string;
  trial?: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "",
    seats: "1 seat",
    trial: "90-day trial",
    features: [
      "User management (GA, Subaccount, CF Org, CF Space)",
      "Single Global Account",
      "Reverse Lookup",
      "Mass Add / Edit of Users",
      "API User Management",
      "Assign users across multiple accounts in one click",
      "Reverse Role search — show users by role",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Basic",
    price: "$200",
    period: "/month",
    seats: "1 seat",
    features: [
      "User management (GA, Subaccount, CF Org, CF Space)",
      "Single Global Account",
      "Reverse Lookup",
      "Assign users across multiple accounts in one click",
    ],
    cta: "Subscribe",
  },
  {
    name: "Premium",
    price: "$2,000",
    period: "/month",
    seats: "2 seats",
    highlight: true,
    badge: "Most Popular",
    features: [
      "User management (GA, Subaccount, CF Org, CF Space)",
      "Multiple Global Accounts",
      "Reverse Lookup",
      "Search users by Role & remove from all users",
      "Assign a role to multiple users",
      "Mass Addition of Users across multiple accounts",
      "Mass Removal of Users across multiple accounts",
      "Export User List to Excel",
      "Reactivation of User",
      "Centralized Audit Logs",
      "Time-based Auto Removal of User",
      "Time-based Auto Deactivation of User",
      "Time-Based Auto Assignment of Roles",
      "Time-Based Auto Revocation of Roles",
      "Clean up By Last Login",
      "Clean up By No Roles",
    ],
    cta: "Subscribe",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    seats: "Unlimited seats",
    badge: "Contact Us",
    features: [
      "Everything in Premium",
      "IAS Integration",
      "Company SSO Login",
      "Emergency Deactivation of Complete Tenant",
      "Enterprise Support",
    ],
    cta: "Contact Sales",
  },
];

function detectOS(): OS {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) {
    // Apple Silicon Macs report "arm" architecture via userAgentData in Chrome/Edge.
    // Safari doesn't support userAgentData, so fall back to Intel as safe default
    // (Silicon Macs can run Intel builds via Rosetta — the user can switch manually).
    const nav = navigator as any;
    const arch = nav.userAgentData?.platform === "macOS"
      ? undefined  // can't detect arch synchronously; user switches if needed
      : undefined;
    if (arch) return "macos-silicon";
    // Heuristic: M-series Macs on Chrome report no CPU in UA string
    if (!ua.includes("intel")) return "macos-silicon";
    return "macos-intel";
  }
  return "windows";
}

export default function Products() {
  const { getLocalizedPath } = useLocalizedPath();
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

  useEffect(() => {
    setSelectedOS(detectOS());
  }, []);

  useEffect(() => {
    fetch(`${R2_BASE}/version.json`)
      .then((r) => r.json())
      .then((data: VersionInfo) => setVersionInfo(data))
      .catch(() => { /* version stays null — download button disabled */ });
  }, []);

  const selectedDownload = downloadOptions.find((o) => o.id === selectedOS)!;
  const downloadUrl = versionInfo ? buildDownloadUrl(selectedOS, versionInfo) : null;;


  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="BTP xID — SAP BTP User Management Desktop App | TerraBT Products"
        description="BTP xID is a desktop application that gives IT administrators a single interface to manage users across an entire SAP BTP landscape. Available for Windows and macOS."
        path="/products/btp-xid"
      />
      <Navigation />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href={getLocalizedPath("/products")}>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-products">
            <ArrowLeft className="h-4 w-4" />
            All Products
          </button>
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" data-testid="badge-product-category">Desktop App</Badge>
              <Badge variant="outline" data-testid="badge-product-status">Beta</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="text-product-name">
              BTP <span className="text-primary">xID</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6" data-testid="text-product-tagline">
              SAP BTP user management — minus the twelve browser tabs.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed" data-testid="text-product-description">
              BTP xID gives IT administrators a single desktop interface to manage users across
              an entire SAP BTP landscape — multiple global accounts, subaccounts, Cloud Foundry
              orgs, and spaces — without switching tabs or running CLI commands manually.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-download"
              >
                <Download className="h-5 w-5" />
                Download Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-pricing"
              >
                View Plans
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free 90-day trial · No credit card required
            </p>
          </div>

          {/* Screenshot preview */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border bg-card">
              <img
                src={screenshots[0].src}
                alt={screenshots[0].caption}
                className="w-full h-auto"
                data-testid="img-hero-screenshot"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-white text-sm" data-testid="text-screenshot-caption">
                  {screenshots[0].caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" data-testid="text-features-heading">Everything in One Place</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stop juggling SAP BTP Cockpit tabs. BTP xID puts your entire user management workflow into a single desktop app.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} data-testid={`card-feature-${f.title.replace(/\s+/g, '-').toLowerCase()}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10 text-primary flex-shrink-0">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" data-testid="text-pricing-heading">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">
              Start free. Upgrade as your BTP landscape grows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${tier.highlight ? "border-primary shadow-lg" : ""}`}
                data-testid={`card-pricing-${tier.name.toLowerCase()}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge
                      className={tier.highlight ? "bg-primary text-primary-foreground" : ""}
                      variant={tier.highlight ? "default" : "secondary"}
                      data-testid={`badge-tier-${tier.name.toLowerCase()}`}
                    >
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4 pt-8">
                  <div className="flex items-center gap-2 mb-2">
                    {tier.name === "Free" && <Star className="h-4 w-4 text-muted-foreground" />}
                    {tier.name === "Basic" && <Zap className="h-4 w-4 text-muted-foreground" />}
                    {tier.name === "Premium" && <Shield className="h-4 w-4 text-primary" />}
                    {tier.name === "Enterprise" && <Building2 className="h-4 w-4 text-muted-foreground" />}
                    <h3 className="font-semibold text-lg">{tier.name}</h3>
                  </div>
                  <div className="mt-1">
                    <span className="text-3xl font-bold" data-testid={`text-price-${tier.name.toLowerCase()}`}>{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground text-sm">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tier.seats}</p>
                  {tier.trial && (
                    <Badge variant="outline" className="w-fit mt-1 text-xs">
                      {tier.trial}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col flex-1 gap-4">
                  <ul className="space-y-2 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={SUBSCRIBE_URL}
                    data-testid={`button-subscribe-${tier.name.toLowerCase()}`}
                  >
                    <Button
                      className="w-full"
                      variant={tier.highlight ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Manage your subscription and account at any time</p>
            <a href={SUBSCRIBE_URL} data-testid="link-manage-account">
              <Button variant="outline" size="sm">
                Manage Account at accounts.terrabt.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3" data-testid="text-download-heading">Download BTP xID</h2>
          <p className="text-muted-foreground mb-10">
            Install the desktop app, then log in through the app — authentication is handled securely via accounts.terrabt.com.
          </p>

          {/* OS selector */}
          <div className="grid grid-cols-2 gap-3 mb-8" data-testid="os-selector">
            {downloadOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOS(option.id)}
                className={`flex flex-col items-center gap-1 px-4 py-3 rounded-md border text-sm font-medium transition-all ${
                  selectedOS === option.id
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border text-muted-foreground hover-elevate"
                }`}
                data-testid={`button-os-${option.id}`}
              >
                <span className="font-semibold">{option.label}</span>
                <span className="text-xs font-normal text-muted-foreground">{option.sublabel}</span>
                {selectedOS === option.id && (
                  <Badge variant="secondary" className="text-xs mt-1">Selected</Badge>
                )}
              </button>
            ))}
          </div>

          {downloadUrl ? (
            <a href={downloadUrl} data-testid="button-download-main">
              <Button size="lg" className="gap-2 w-full sm:w-auto px-12">
                <Download className="h-5 w-5" />
                Download for {selectedDownload.label}
              </Button>
            </a>
          ) : (
            <Button size="lg" className="gap-2 w-full sm:w-auto px-12" disabled>
              <Download className="h-5 w-5" />
              {versionInfo === null ? "Loading..." : "Download for " + selectedDownload.label}
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            {versionInfo ? `v${versionInfo.version} · ` : ""}{selectedDownload.sublabel} · Free 90-day trial
          </p>

          <div className="mt-10 p-4 rounded-md bg-muted/50 border text-left text-sm text-muted-foreground" data-testid="card-install-info">
            <p className="font-medium text-foreground mb-2">How it works</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Download and install BTP xID on your desktop</li>
              <li>Open the app and click <strong>Login</strong></li>
              <li>You'll be authenticated securely via <strong>accounts.terrabt.com</strong></li>
              <li>Connect your SAP BTP Global Account subdomain</li>
              <li>Start managing users across your entire landscape</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
