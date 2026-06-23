import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function SAPBTPServiceKeyOffboardingPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Key Access: A Security Problem Most Offboarding Processes Miss | TerraBT"
        description="SAP BTP service keys for inbound Integration Suite connections have no expiry and no metadata. Worse, Cloud Foundry org/space access doesn't sync with subaccount offboarding — so removed users can still read or delete production API credentials."
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
            Most SAP BTP security conversations focus on role collections and identity providers. But there's a simpler problem underneath: Cloud Foundry access doesn't sync with subaccount offboarding, and that gap leaves production API credentials exposed long after someone's officially "removed." This usually surfaces in a security review, not before.
          </p>

          {/* Section: The gap */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Two access layers, one gap</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              When BTP Integration Suite exposes inbound endpoints (HTTP, AS2) to external systems, those systems authenticate with service keys: OAuth credentials created at the Cloud Foundry space level. By default these have no expiry and no metadata — no created-by, no last-used, nothing. Open the service key list in the cockpit and you can't tell who created a key, when, or whether anyone still needs it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The bigger issue is what happens during offboarding. BTP has two access layers that don't talk to each other: <strong style={{ color: "#0F172A" }}>subaccount membership</strong>, which is what gets cleaned up when someone leaves, and <strong style={{ color: "#0F172A" }}>Cloud Foundry org/space membership</strong>, managed separately and not even visible from the subaccount Members view. A standard offboarding has no reason to check it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Remove someone from the subaccount and their CF role stays untouched. With it, they retain full access to every service key in that space — no cockpit needed, just the CF CLI, available by default. A few commands is all it takes to list, read, or delete any service key in the space.
            </p>
          </section>

          {/* Section: Why this matters */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Why this matters beyond compliance checkboxes</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Inbound integration endpoints carry business-critical traffic: orders from logistics partners, inventory updates, payment confirmations. Deleting the service keys behind them doesn't take a hack — just CF space access. The integration goes down immediately, and the cause isn't obvious to anyone who doesn't know to look at CF membership.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              A disgruntled ex-employee removed from the subaccount but not the CF org has everything they need to do this.
            </p>
          </section>

          {/* Section: IAS doesn't help + what to check */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>IAS doesn't close this, so check it yourself</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Centralising identity through SAP IAS doesn't fix this — IAS handles authentication, not CF access. Removing a user there does nothing to their CF org or space membership; that's a separate, manual step most offboarding checklists skip. SAP's Identity Provisioning Service can automate it, but the architecture still treats CF access as a distinct concern, and your process needs to as well.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              If you run Integration Suite in production: review your CF org/space members independently of your subaccount list — they're not the same list. Make CF membership removal an explicit offboarding step. And audit your existing service keys — if nobody knows what one is for or when it was last rotated, it's an unmanaged credential with no expiry.
            </p>
          </section>

          {/* Closing context */}
          <section style={{ marginBottom: "48px" }}>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              TerraBT is built to give teams visibility and control over API credential management in SAP BTP — tracking service keys, flagging stale credentials, and surfacing the CF access layer alongside subaccount membership instead of hiding it in a separate CLI.
            </p>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              See your CF access layer alongside subaccount membership
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              If any of the above sounds familiar in your environment, it's worth a look. Manage SAP BTP users and API credentials with BTP xID and connect your landscape in minutes.
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
