import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPControlBeforeAfterPage() {
  return (
    <>
      <SEOHead
        title="Before and After BTP xID: BTP User Management and Control Compared | TerraBT"
        description="A side-by-side comparison of what it takes to manage users, roles, API credentials and Cloud Foundry access in SAP BTP — before and after BTP xID. Onboarding, auditing, offboarding, bulk changes, all compared."
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navigation />
        <article style={{ maxWidth: "820px", margin: "0 auto", padding: "40px 24px 80px" }}>

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
            BTP Access Control
          </p>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Before and After BTP xID: a real look at BTP user, API credential management and control
          </h1>

          {/* Lead */}
          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            Most BTP teams have learned to live with how the platform handles users and API credentials. Click through every sub-account. Switch between BTP cockpit and Cloud Foundry. Track API credentials across hundreds of CF spaces with no single inventory view. Keep a spreadsheet so nothing falls through the cracks. The work gets done, but it gets done slowly — and security questions about <em>who has access to what, and which credentials are still active</em> often go unanswered for hours or days.
            <br /><br />
            Here is what changes when BTP xID sits in the middle of that picture.
          </p>

          {/* ===== Onboarding ===== */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Scenario 01
            </p>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
              Onboarding a new BTP administrator
            </h2>

            <ComparisonRow
              before={{
                title: "Before BTP xID",
                body: "Open the BTP cockpit. Navigate to the first sub-account. Add the user. Assign the right role collections. Switch to the Cloud Foundry environment. Add them to each org as an Org Manager or Auditor. Click into each space. Assign Space Developer where needed. Repeat for the next sub-account. And the next. A landscape with twenty sub-accounts and three spaces each easily becomes a half-day task, with the constant risk of inconsistency between accounts."
              }}
              after={{
                title: "After BTP xID",
                body: "Open BTP xID. Select the user. Tick the accounts, orgs and spaces they need. Assign roles. Apply. The same onboarding that took half a day takes a few minutes — and the assignments are consistent across the landscape because they were configured from one place."
              }}
            />
          </section>

          {/* ===== Auditing ===== */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Scenario 02
            </p>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
              Answering "who has access to production?"
            </h2>

            <ComparisonRow
              before={{
                title: "Before BTP xID",
                body: "There is no native way to ask this question and get a complete answer. The BTP cockpit shows you what is inside each sub-account, one at a time. CF org and space memberships sit in a different view. Role collections assigned at login through IAS group mapping do not appear in the cockpit's user list at all. Most teams end up clicking through every sub-account and every space, exporting role lists into a spreadsheet, and reconciling by hand."
              }}
              after={{
                title: "After BTP xID",
                body: "Start from any user, or any environment. See the full access picture in one screen — role collections, Global Account roles, CF org and space memberships, all in one place. Answering an audit question becomes a query, not a project."
              }}
            />
          </section>

          {/* ===== Offboarding ===== */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Scenario 03
            </p>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
              Offboarding when someone leaves
            </h2>

            <ComparisonRow
              before={{
                title: "Before BTP xID",
                body: "Disable the corporate IdP account. Remove the user from IAS. Then start cleaning up everywhere they had access in BTP. Open each sub-account in turn, remove role collection assignments. Switch to Cloud Foundry. Remove org and space memberships one by one. If they had Org Manager rights anywhere, they may still have access to deployed applications through tokens that are still valid. There is no consolidated view to confirm everything has been removed, so a careful offboarding takes time, and a careless one leaves dormant access in place."
              }}
              after={{
                title: "After BTP xID",
                body: "Select the user. Remove all their access — role collections, Global Account roles, CF org and space memberships — across every account in your landscape in a single action. The picture is consistent because the action was atomic."
              }}
            />
          </section>

          {/* ===== CF Org Manager ===== */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Scenario 04
            </p>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
              Assigning a Cloud Foundry Org Manager role
            </h2>

            <ComparisonRow
              before={{
                title: "Before BTP xID",
                body: "Open Services → Instances and Subscriptions. Find the Cloud Foundry Runtime entry. Open the menu, click Update. Navigate the wizard to the Parameters screen. Construct a JSON payload by hand with the user's email and ID. Submit. Wait. Then run the whole thing again with an empty payload to clear the configuration, or all future updates will error. This is documented in SAP Note 3249765 and it is the official supported process."
              }}
              after={{
                title: "After BTP xID",
                body: "Select the user. Select Org Manager. Done. BTP xID handles the underlying API calls — no service update wizard, no JSON, no cleanup step."
              }}
            />
          </section>

          {/* ===== Bulk changes ===== */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              Scenario 05
            </p>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>
              Reorganising access for a whole team
            </h2>

            <ComparisonRow
              before={{
                title: "Before BTP xID",
                body: "A team is moving from one project to another. Twelve developers, four sub-accounts, six CF spaces. The change involves removing existing assignments and adding new ones. Done through the cockpit, this is dozens of individual actions repeated for each developer. A spreadsheet tracks who has been moved, who is still pending. The team is operational at half-speed until the migration is complete."
              }}
              after={{
                title: "After BTP xID",
                body: "Select the twelve developers. Select the target sub-accounts and spaces. Apply roles. Done. The same change that took the better part of an afternoon takes minutes — and the consistency across the team is guaranteed because the action was applied once, not twelve times."
              }}
            />
          </section>

          {/* The control story */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What changes for the people responsible for control</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The day-to-day workflow improvements matter to operations teams. The bigger change is for the people who are responsible for being able to answer questions about BTP access — security architects, compliance leads, internal auditors.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Before BTP xID, those questions land in a queue. <em>Can you confirm this contractor has been fully offboarded?</em> <em>Who currently has Org Manager rights across production?</em> <em>Did the access changes we agreed last quarter actually get applied everywhere?</em> Each of these takes a BTP admin a non-trivial amount of time to investigate. Each carries a real chance of an incomplete answer.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: 0 }}>
              After BTP xID, those questions can be answered from one screen, with the confidence that the picture is consistent across the whole landscape — because that's how the access was set up in the first place.
            </p>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              See what control looks like in practice
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              Manage SAP BTP users and API credentials with BTP xID and connect your BTP landscape in minutes.
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

// ─── Side-by-side comparison row ─────────────────────────────────────────────

function ComparisonRow({ before, after }: { before: { title: string; body: string }; after: { title: string; body: string } }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {/* Before */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "20px" }}>
        <p style={{
          display: "inline-block",
          color: "#64748B",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: "#F1F5F9",
          border: "1px solid #E2E8F0",
          borderRadius: "100px",
          padding: "3px 10px",
          marginBottom: "12px",
        }}>
          {before.title}
        </p>
        <p style={{ color: "#475569", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
          {before.body}
        </p>
      </div>
      {/* After */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(58,154,106,0.3)", borderRadius: "12px", padding: "20px" }}>
        <p style={{
          display: "inline-block",
          color: "#2D7A53",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: "rgba(58,154,106,0.1)",
          border: "1px solid rgba(58,154,106,0.25)",
          borderRadius: "100px",
          padding: "3px 10px",
          marginBottom: "12px",
        }}>
          {after.title}
        </p>
        <p style={{ color: "#334155", fontSize: "0.9375rem", lineHeight: 1.7, margin: 0 }}>
          {after.body}
        </p>
      </div>
    </div>
  );
}
