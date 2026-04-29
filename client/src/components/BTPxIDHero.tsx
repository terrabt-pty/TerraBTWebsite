import { ArrowRight, Play } from "lucide-react";
import btpxidIcon from "@assets/btp-xid-icon.png";

export default function BTPxIDHero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="btpxid-hero" id="home">
      {/* Animated background grid */}
      <div className="btpxid-grid" />

      {/* Gradient orbs */}
      <div className="btpxid-orb btpxid-orb-1" />
      <div className="btpxid-orb btpxid-orb-2" />
      <div className="btpxid-orb btpxid-orb-3" />

      <div className="btpxid-hero-inner">
        {/* Left: Content */}
        <div className="btpxid-hero-content">
          <div className="btpxid-badge">
            <span className="btpxid-badge-dot" />
            Now Available for SAP BTP
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
              onClick={() => scrollToSection("#contact")}
              className="btpxid-btn-primary"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("#features")}
              className="btpxid-btn-secondary"
            >
              <Play className="h-4 w-4" />
              <span>See Features</span>
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
              <span className="btpxid-trust-label">SAP BTP Focused</span>
            </div>
          </div>
        </div>

        {/* Right: App icon showcase */}
        <div className="btpxid-visual">
          <div className="btpxid-icon-showcase">
            <img
              src={btpxidIcon}
              alt="BTP xID App Icon"
              className="btpxid-icon-main"
              width={200}
              height={200}
            />

            {/* Floating context cards */}
            <div className="btpxid-float-card btpxid-fc-1">
              <span
                className="btpxid-dot"
                style={{ background: "#4CAF50" }}
              />
              Global Accounts
            </div>
            <div className="btpxid-float-card btpxid-fc-2">
              <span
                className="btpxid-dot"
                style={{ background: "#1E5099" }}
              />
              Subaccounts & CF Spaces
            </div>
            <div className="btpxid-float-card btpxid-fc-3">
              <span
                className="btpxid-dot"
                style={{ background: "#2A7088" }}
              />
              Bulk Operations
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
  );
}
