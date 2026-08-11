import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function SAPBTPServiceKeyOffboardingPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Keys Outlive Subaccount Offboarding | TerraBT"
        description="SAP BTP service keys for inbound Integration Suite connections have no expiry and no metadata. Cloud Foundry org and space access doesn't sync with subaccount offboarding, so removed users can still read or delete production API credentials."
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navigation />
        <article style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px" }}>
            <a
              href="/"
              style={{ color: "#3A9A6A", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              ← Back to BTP xID
            </a>
          </nav>

          {/* Eyebrow */}
          <p style={{ color: "#3A9A6A", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            SAP BTP Offboarding Risk
          </p>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            SAP BTP Service Keys Outlive Subaccount Offboarding
          </h1>

          {/* Lead */}
          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            Most SAP BTP security conversations focus on role collections and identity providers. Cloud Foundry access doesn't sync with subaccount offboarding, so production API credentials stay exposed long after someone leaves, since most teams don't catch it until a security review flags it.
          </p>

          {/* Section: The gap */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Cloud Foundry Access Doesn't Follow Subaccount Offboarding</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP Integration Suite exposes inbound endpoints over HTTP or AS2, and external systems authenticate against them with service keys, which are OAuth credentials created at the Cloud Foundry space level. They have no expiry, no metadata, no created-by field, and no last-used timestamp. The service key list in the cockpit doesn't show who created a key, when, or whether anyone still needs it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Offboarding doesn't touch Cloud Foundry access. BTP treats <strong style={{ color: "#0F172A" }}>subaccount membership</strong> and <strong style={{ color: "#0F172A" }}>Cloud Foundry org and space membership</strong> as two separate systems, with no sync between them. Removing someone from the subaccount clears their subaccount access, but their CF org and space roles stay untouched, and the subaccount Members view never shows CF membership at all. A standard offboarding process built around that Members view misses it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Removing someone from the subaccount doesn't change their CF role, so they keep access to every service key in that space. They don't need the cockpit. The CF CLI is available by default, and cf service-keys, cf service-key, and cf delete-service-key are enough to list, read, or delete any key in the space.
            </p>
          </section>

          {/* Section: Deleted keys break live integrations */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>A Deleted Service Key Breaks the Integration Immediately</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Inbound integration endpoints carry real traffic, including orders from logistics partners and inventory updates. Deleting the service keys behind them doesn't take a hack, since it just takes CF space access. The integration goes down immediately, and the cause isn't obvious unless you already know to check CF membership.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              An ex-employee removed from the subaccount, but still in the CF org, keeps everything they need to do this.
            </p>
          </section>

          {/* Section: IAS doesn't help + what to check */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>IAS Doesn't Cover This</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              SAP IAS doesn't fix this, as it only handles authentication, and removing a user in IAS doesn't touch their CF org or space membership. That's a separate step most offboarding checklists skip. SAP's Identity Provisioning Service can automate CF role removal, but it's a separate system you have to set up and maintain on top of IAS.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              If you run Integration Suite in production, check your CF org and space members separately from your subaccount list, since they're not the same list. Add CF membership removal as an explicit step in offboarding. Audit your existing service keys too, because if nobody knows what a key is for or when it was last rotated, it has no expiry and nobody's tracking it.
            </p>
          </section>

          {/* Closing context */}
          <section style={{ marginBottom: "48px" }}>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              TerraBT tracks service keys across a BTP landscape, flags ones that look stale, and shows CF access next to subaccount membership instead of in a separate CLI.
            </p>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              See CF access next to subaccount membership
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              If this sounds familiar, look at BTP xID. It shows SAP BTP users and API credentials across your landscape.
            </p>
            <a
              href="/"
              style={{ display: "inline-block", background: "linear-gradient(135deg, #4CAF50, #3A9A6A, #1E5099)", color: "#FFFFFF", padding: "12px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}
            >
              Manage SAP BTP users and API credentials with BTP xID
            </a>
          </section>

        </article>
        <Footer />
      </div>
    </>
  );
}
