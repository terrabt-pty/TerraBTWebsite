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
            Most SAP BTP security conversations focus on role collections, trust configurations, and identity providers. That stuff matters. But there's a more basic problem sitting underneath all of it: the way service key access works in Cloud Foundry environments creates a persistent access risk that standard offboarding processes don't close. This shows up on real projects, usually discovered during security reviews rather than before.
          </p>

          {/* Section: What service keys are */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What service keys actually are in this context</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              When companies use SAP BTP Integration Suite to expose inbound endpoints to external systems (HTTP, AS2, and similar), those third party systems need credentials to authenticate. The way this works in BTP is through service keys created on the Process Integration Runtime service instance. These are OAuth credentials: client ID, client secret, token URL. The external system uses them to get a bearer token and call your integration flow endpoints.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              These credentials are created at the Cloud Foundry space level, tied to the service instance. Anyone who holds them can call your integration endpoints directly, send data in, read data out.
            </p>
          </section>

          {/* Section: The problem with how they're managed */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>The problem with how they're managed</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Service keys for inbound connections in BTP Integration Suite have no expiry by default. There's also no metadata attached: no created-by, no created-on, no last-used timestamp. You can open the service key list in the BTP cockpit and have no way of knowing who created a given key, when, or whether it's still needed by anyone.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              That's already a compliance problem on its own. Credential rotation policies don't work if credentials have no age. Audit trails don't work if there's no trail. You're managing API credentials with no history attached to them.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              But the bigger issue is access control, specifically what happens during offboarding.
            </p>
          </section>

          {/* Section: The CF layer that catches admins off guard */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>The Cloud Foundry layer that catches admins off guard</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP has two separate user management layers that don't sync with each other.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The first is subaccount membership and role collection assignments. This is what most BTP admins think of as "user access." It's managed in the BTP cockpit and it's what gets cleaned up when someone leaves.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The second is Cloud Foundry org and space membership. This is managed separately, either through the CF section of the cockpit or via the CF CLI. CF role assignments are not visible from the subaccount Members view. An admin doing a standard offboarding has no reason to even know they need to check there.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              When you remove a user from the subaccount, their subaccount access is gone. But if they still have a CF org or space role, they retain full access to every service key in that environment. They don't need the BTP cockpit to do anything with them either. The CF CLI and CF API are available by default, and a few commands is all it takes to list, read, or delete any service key in the space.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              So someone you've removed from the subaccount, who has no cockpit access at all, can still read your inbound API credentials or delete them entirely.
            </p>
          </section>

          {/* Section: Why this matters */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Why this matters beyond compliance checkboxes</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Think about what inbound integration endpoints actually carry in a production SAP landscape. Orders coming in from third party logistics systems. Inventory updates from warehouse management. Payment confirmations from financial platforms. These flows are often business-critical.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Deleting the service keys securing those endpoints doesn't require hacking anything. It just requires CF space access. The integrations go down immediately. Depending on the business, that could mean order processing stops, inventory sync fails, or financial data stops flowing. The impact is fast and the cause isn't obvious to anyone who doesn't know to look at CF space membership.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              A disgruntled ex-employee who was removed from the subaccount but not from the CF org has everything they need to do this.
            </p>
          </section>

          {/* Section: IAS doesn't solve it */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>IAS doesn't solve it</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              A common assumption is that centralising identity management through SAP Identity Authentication Service (IAS) handles this. It doesn't. IAS has no control over Cloud Foundry user access and role management. These are separate systems. Removing a user via IAS or your corporate identity provider does not remove their CF org or space membership. You have to do that separately, and most offboarding processes don't include it because most admins don't know it's a separate step.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              SAP does provide a connector for managing CF user and role assignments automatically via Identity Provisioning Service, which is worth looking into. But even with that in place, the underlying architecture means CF access is a separate concern from subaccount access, and it needs to be treated that way explicitly.
            </p>
          </section>

          {/* Section: What you should actually check */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What you should actually check</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              If you're running BTP Integration Suite in production, particularly in regulated industries, go through your CF org and space members list independently of your subaccount member list. They are not the same list and they don't stay in sync automatically.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              For every user in your CF org or spaces, verify they still need that access and that their access level is appropriate. Check whether your offboarding process includes CF membership removal as an explicit step. If it doesn't, it should.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Also worth auditing your existing service keys: how many are there, when were they last rotated, and does anyone actually know what each one is used for. If the answer is "we're not sure" then you have unmanaged API credentials sitting in your production environment with no expiry.
            </p>
          </section>

          {/* Closing context */}
          <section style={{ marginBottom: "48px" }}>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              Managing API credentials properly across a BTP landscape is harder than it should be, especially when the credentials themselves carry no metadata and the access model spans multiple layers that don't talk to each other. TerraBT is built specifically to give teams visibility and control over API credential management in SAP BTP environments — tracking service keys, flagging stale credentials, and making the CF access layer visible alongside subaccount membership rather than hiding it in a separate CLI.
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
