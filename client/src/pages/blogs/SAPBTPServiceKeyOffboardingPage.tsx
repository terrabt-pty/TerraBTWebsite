import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function SAPBTPServiceKeyOffboardingPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Key Access: A Security Problem Most Offboarding Processes Miss | TerraBT"
        description="SAP BTP service keys for inbound Integration Suite connections have no expiry and no metadata by default. Cloud Foundry org and space access doesn't sync with subaccount offboarding, so removed users can still read or delete production API credentials."
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
            SAP BTP Service Key Access: A Security Problem Most Offboarding Processes Miss
          </h1>

          {/* Lead */}
          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            Most SAP BTP security conversations focus on role collections and identity providers. There's a more basic problem underneath: Cloud Foundry access doesn't sync with subaccount offboarding. Production API credentials stay exposed long after someone's removed. This usually gets found in a security review, not before.
          </p>

          {/* Section: The gap */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Two access layers, one gap</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP Integration Suite exposes inbound endpoints over HTTP or AS2. External systems authenticate with service keys: OAuth credentials created at the Cloud Foundry space level. By default they have no expiry and no metadata, no created-by, no last-used timestamp. Open the service key list in the cockpit and you can't tell who created a key, when, or whether anyone still needs it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The bigger issue is what happens during offboarding. BTP has two access layers that don't talk to each other. <strong style={{ color: "#0F172A" }}>Subaccount membership</strong> is what gets cleaned up when someone leaves. <strong style={{ color: "#0F172A" }}>Cloud Foundry org and space membership</strong> is managed separately and isn't visible from the subaccount Members view. A standard offboarding process doesn't check it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Remove someone from the subaccount and their CF role doesn't change. They still have access to every service key in that space. They don't need the cockpit either, the CF CLI is available by default, and a few commands is enough to list, read, or delete any service key in the space.
            </p>
          </section>

          {/* Section: Why this matters */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Why this matters</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Inbound integration endpoints carry real traffic: orders from logistics partners, inventory updates, payment confirmations. Deleting the service keys behind them doesn't take a hack, just CF space access. The integration goes down immediately, and the cause isn't obvious unless you know to check CF membership.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              An ex-employee removed from the subaccount but not the CF org still has what they need to do this.
            </p>
          </section>

          {/* Section: IAS doesn't help + what to check */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>IAS doesn't cover this</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              SAP IAS doesn't fix this. IAS handles authentication, not CF access. Removing a user in IAS doesn't touch their CF org or space membership. That's a separate step most offboarding checklists skip. SAP's Identity Provisioning Service can automate CF role removal, but it's a separate system you have to set up and maintain on top of IAS.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              If you run Integration Suite in production, check your CF org and space members separately from your subaccount list. They're not the same list. Add CF membership removal as an explicit step in offboarding. Audit your existing service keys too. If nobody knows what a key is for or when it was last rotated, it has no expiry and nobody's tracking it.
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
              If this sounds familiar, take a look. BTP xID shows SAP BTP users and API credentials across your landscape.
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
