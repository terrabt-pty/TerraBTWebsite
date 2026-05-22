import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPAccessManagementPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Access Management: With IAS, Without IAS, and What Neither Covers | TerraBT"
        description="A technical breakdown of what SAP IAS handles in BTP, where it stops, and how BTP xID fills the Cloud Foundry, API credential, and cross-landscape governance gap."
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
            SAP BTP Access Management
          </p>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            BTP Access Management: With IAS, Without IAS, and What Neither Covers
          </h1>

          {/* Lead */}
          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            SAP BTP has a layered access model that confuses even experienced admins. IAS handles authentication. IPS handles provisioning. The BTP cockpit handles role collections. CF UAA handles org and space memberships. None of these systems talk to each other in a way that gives you a single, consistent view of who has access to what — or lets you act on that view at scale.
          </p>

          {/* Section: What IAS is */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What SAP IAS Actually Does</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              SAP Identity Authentication Service (IAS) is an authentication broker, not an authorization engine. Its job is to federate authentication between your corporate identity provider (Azure AD, Okta, or another SAML/OIDC-compatible IdP) and your BTP subaccounts. Instead of configuring a direct trust between each subaccount and your corporate IdP, you configure that trust once in IAS, and IAS acts as a proxy for all subaccounts pointing to it.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              On top of authentication, IAS can pass group membership as SAML claims. Each BTP subaccount can map those group claims to role collections — so when a user in the "BTP-Admin" group logs into a subaccount, that subaccount's trust configuration can automatically assign the "Subaccount Administrator" role collection. This is the closest IAS gets to access management: group-to-role-collection mapping, configured per subaccount.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              SAP Identity Provisioning Service (IPS), a companion service, can go further — pre-provisioning users into subaccounts and assigning role collections without requiring a first login. But IPS requires a separate target system configuration per subaccount. Fifty subaccounts means fifty IPS target configurations to maintain.
            </p>
          </section>

          {/* Section: The CF gap */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>The Cloud Foundry Gap IAS Cannot Cross</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Here is the part that catches most BTP administrators off guard: IAS group-to-role-collection mapping has <strong style={{ color: "#0F172A" }}>zero effect on Cloud Foundry org and space roles</strong>.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP has two separate authorization systems that coexist within a subaccount but do not share configuration:
            </p>
            <ul style={{ color: "#475569", lineHeight: 1.9, paddingLeft: "24px", marginBottom: "16px" }}>
              <li><strong style={{ color: "#0F172A" }}>XSUAA (BTP role collections)</strong> — managed via the BTP cockpit under Security → Role Collections. This is where IAS group mapping applies.</li>
              <li><strong style={{ color: "#0F172A" }}>CF UAA (CF org and space roles)</strong> — managed separately under Cloud Foundry → Organizations and Spaces. Org Manager, Org Auditor, Space Manager, Space Developer, Space Auditor — none of these are role collections. IAS does not touch this system.</li>
            </ul>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              SAP's own documentation lists exactly two ways to assign CF org and space roles: the BTP cockpit UI and the cf CLI. IAS is not mentioned. The community has noted this explicitly: <em>"IAS limitations are restricted to BTP cockpit role collections and cannot extend to CF roles such as space developer."</em>
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              IPS does have a "Platform Members (Cloud Foundry)" connector that can technically assign CF roles — but it requires one separate IPS target system per CF org, and group names must embed the CF org and space GUIDs directly (e.g., <code style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "1px 6px", borderRadius: "4px", fontSize: "0.875em" }}>abc123-guid OrgManager</code>). In any landscape with more than a handful of subaccounts, maintaining these IPS configurations becomes operationally unsustainable.
            </p>
          </section>

          {/* Section: Landscape visibility */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>No Native Tool Gives You a Landscape-Wide View</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Even if your IAS and IPS setup is perfect, there is no native SAP tool that answers: <em>"Show me everything this user can access across my entire BTP landscape."</em>
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The BTP cockpit is subaccount-scoped. To see a user's role collections in subaccount A and subaccount B, you navigate to each one separately. CF org memberships are visible under a different section of the cockpit, separate from the Security → Role Collections view. Global Account role assignments are at a third level. Directory roles are at a fourth. These four levels — Global Account, Directory, Subaccount (XSUAA), and Cloud Foundry — have no unified view.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              This makes offboarding particularly risky. When a user leaves, an administrator must manually revoke role collections from every subaccount, remove CF org memberships from every org, remove CF space memberships from every space, and remove the user from IAS. In a landscape with thirty subaccounts across five Global Accounts, this is not a five-minute task — and it is error-prone enough that many organisations leave dormant access in place.
            </p>
          </section>

          {/* Section: Without IAS */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>If You Don't Have IAS — You're Not Alone</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Many BTP customers — particularly those with older installations, smaller IT teams, or BTP environments set up before IAS became the standard recommendation — run entirely on SAP ID Service (the default SAP identity provider) with no IAS deployment at all. Some will never adopt IAS, whether due to budget constraints, organisational complexity, or simply because the existing setup works for their needs.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              For these customers, BTP xID functions as a standalone access governance layer. There is no IAS prerequisite. BTP xID connects directly to the BTP APIs and the Cloud Foundry API — the same APIs the cockpit uses — and provides a unified management interface regardless of which identity provider authenticates your users.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>
              If you are in this situation, BTP xID effectively replaces the need to set up and maintain IPS target configurations for access management. You get landscape-wide visibility, bulk operations, and CF org/space management through a single interface — without configuring a single IPS system or maintaining a group naming convention.
            </p>
          </section>

          {/* Section: What BTP xID provides */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What BTP xID Provides</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP xID connects to BTP's platform APIs and the Cloud Foundry API to give administrators a single interface that spans all four levels of the BTP access model — Global Account, Directory, Subaccount, and Cloud Foundry org and space — and surfaces every API credential across all of them.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              {[
                { title: "CF Org & Space Management", body: "Assign and revoke Org Manager, Org Auditor, Space Manager, Space Developer, and Space Auditor roles directly — no GUID-based group naming, no separate IPS target per org." },
                { title: "Landscape-Wide Visibility", body: "See every role a user holds across all subaccounts, Global Accounts, directories, CF orgs, and CF spaces in one view. Reverse lookup: start from any resource and see who has access." },
                { title: "Bulk Operations", body: "Add or remove a user across multiple subaccounts in a single action. Onboard a team across your entire landscape without repeating the same steps for each account." },
                { title: "Complete Offboarding", body: "Remove all BTP access — role collections and CF memberships — across every account and org in one action. Reduces the risk of dormant access after a user departure." },
                { title: "API Credential Visibility", body: "List and revoke every API credential across your landscape — including Global Account-level credentials not visible in the BTP cockpit. One screen, complete picture." },
              ].map(({ title, body }) => (
                <div key={title} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "20px" }}>
                  <p style={{ color: "#0F172A", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "8px" }}>{title}</p>
                  <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              Ready to see it for yourself?
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              Manage SAP BTP users and API credentials with BTP xID and connect your BTP landscape in minutes — works with or without IAS.
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
