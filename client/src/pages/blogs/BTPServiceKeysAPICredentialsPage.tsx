import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPServiceKeysAPICredentialsPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Keys Are Only as Powerful as the User Behind Them | TerraBT"
        description="A service-by-service look at SAP BTP Cloud Foundry service keys: HANA Cloud, Destination, XSUAA, Connectivity, Object Store, Integration Suite. What each key contains, what it can reach, and why they are easy to lose track of. Stated plainly, with sources."
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

          <p style={{ color: "#3A9A6A", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            SAP BTP Service Keys
          </p>

          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            SAP BTP Service Keys Are Only as Powerful as the User Behind Them
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            "Service key" is SAP's name for what most of us would call an API key. It is a JSON document holding a set of credentials. You get it by running <code style={codeStyle}>cf create-service-key</code>. What sits inside it, and how far it can reach, depends entirely on which service the key belongs to. The BTP cockpit does not show all of them in one place. Below is a service-by-service breakdown of what sits inside each key and what it can reach. Every claim links to its source.
          </p>

          {/* What they are */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>Every SAP BTP Service Key Is One of Three Credential Types</h2>
            <p style={p}>
              Every service key in SAP BTP is one of three things: an OAuth <code style={codeStyle}>clientid</code> and <code style={codeStyle}>clientsecret</code> pair, a database user and password, or hyperscaler credentials like an S3 access key. Anyone with the Cloud Foundry <strong>Space Developer</strong> role can create one. That is the same role needed just to deploy an application. There is no expiry. SAP's own documentation states it directly: <em>"the secret remains valid as long as the binding or the service key exists."</em> Removing the person who created the key does not revoke it. The key keeps working.
            </p>
            <p style={smallSrc}>
              Source: <a href="https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/service-instance-secrets-5578ec4.md" target="_blank" rel="noopener noreferrer" style={a}>SAP docs, Service Instance Secrets</a>
            </p>
          </section>

          {/* Per-service breakdown */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>What Each Service Key Contains, and What It Can Reach</h2>
            <p style={{ ...p, marginBottom: "24px" }}>
              One point applies to all of them. A key can reach only whatever the identity or the grants behind it can reach. By itself, a key is not powerful. It becomes powerful when the user, the scope, or the plan behind it is broad. Most of the real risk on BTP follows this pattern. A key gets more privilege than the task needed, because that was the faster way to set it up at the time.
            </p>

            <ServiceCard
              service="SAP HANA Cloud"
              contents="JDBC URL · username · password · schema · certificate"
              unlocks="This gives a direct database connection over port 443. HANA Cloud sits on the public internet by default. There is no VPN and no Cloud Connector in between. Access is limited to whatever the bound database user has, nothing more. If that user has wide grants, the reach is wide. If it is scoped to one schema, it stays there. Teams usually bind a high-privilege user because it was the faster option at setup time."
              source={{ label: "SAP HANA Cloud, Connect via JDBC", url: "https://help.sap.com/docs/hana-cloud/sap-hana-cloud-getting-started-guide/connect-to-sap-hana-database-in-sap-hana-cloud-via-jdbc" }}
            />

            <ServiceCard
              service="SAP Destination Service"
              contents="clientid · clientsecret · destination-service URI · XSUAA token URL"
              unlocks="This one is often described incorrectly. The key by itself is only an OAuth client credential. It does not hold the passwords of your backend systems directly. It authenticates against the Destination Service REST API of that subaccount. Calling GET /destination-configuration/v1/destinations returns all destinations registered in the subaccount. If a destination stores a Basic-auth password or an OAuth client secret, the service returns that value in the response. So the key can read the stored credentials of whatever systems those destinations point to, such as S/4HANA, SuccessFactors, or a third-party API. The key itself does not store those credentials."
              source={{ label: "SAP Cloud SDK, Destinations", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations" }}
            />

            <ServiceCard
              service="SAP Authorization & Trust Management (XSUAA)"
              contents="clientid · clientsecret · OAuth URL · api URL · tenant ID · subaccount ID"
              unlocks="This depends entirely on the service plan. Check the plan before deciding a key is low risk. The application plan mints tokens only for the bound application's own scopes. Watch the apiaccess plan. SAP documents this plan for managing users, roles, and role collections through the API. With such a key, the holder can create a role collection with admin scopes and assign it to themselves. That is a direct privilege escalation inside the subaccount."
              source={{ label: "SAP Community, XSUAA REST API", url: "https://community.sap.com/t5/technology-blog-posts-by-sap/sap-btp-security-how-to-use-rest-api-of-xsuaa-to-programmatically-manage/ba-p/13540720" }}
            />

            <ServiceCard
              service="SAP Connectivity Service"
              contents="clientid · clientsecret · onpremise_proxy_host · onpremise_proxy_port · token service URL"
              unlocks="By itself this key works only from inside the CF space, because the proxy host it points to is not public. Its real use for an attacker is as a second step. With an existing foothold in a CF app, this key lets requests pass through the Cloud Connector tunnel toward on-premise systems like S/4HANA. Treat it as a path toward the internal network."
              source={{ label: "SAP Cloud SDK, On-premise Connectivity", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/on-premise" }}
            />

            <ServiceCard
              service="SAP Object Store"
              contents="access_key_id · secret_access_key · region · bucket (or Azure / GCS equivalents)"
              unlocks="These are actual hyperscaler credentials for the customer's bucket, an S3 access key or the Azure Blob or GCS equivalent, with full read, write, delete, and list access. This is typically where AI Core grounding data, Build Apps backups, and CAP uploads are kept. This object-level access through the hyperscaler API does not appear in the BTP Audit Log Service. It shows up only in the hyperscaler's own logging, and many teams do not forward that to their SOC."
              source={{ label: "SAP Object Store FAQ", url: "https://help.sap.com/docs/object-store/object-store-service-on-sap-btp/frequently-asked-questions" }}
            />

            <ServiceCard
              service="SAP Integration Suite (Cloud Integration / CPI)"
              contents="clientid · clientsecret · token URL · tenant runtime URL (or x.509 certificate variant)"
              unlocks="With the integration-flow plan, this key can invoke the iFlow endpoints it is scoped to. With the api management plan, it can do much more. It can list all deployed iFlows, download their definitions, which often contain mapping logic, hard-coded usernames, and partner endpoints, and it can deploy new ones. CPI tenants typically carry B2B, EDI, and payroll traffic between S/4HANA, SuccessFactors, banks, and Ariba. The messages passing through can carry invoices, employee data, and payment instructions. Again, the actual reach depends on the plan and the instance scope."
              source={{ label: "SAP Help, Cloud Integration Service Key Types", url: "https://help.sap.com/docs/cloud-integration/sap-cloud-integration/service-key-types" }}
            />

            <ServiceCard
              service="SAP Build Work Zone"
              contents="clientid · clientsecret · workzone tenant URL"
              unlocks="This gives access to the SCIM API for listing site users, and the content-management API for editing the launchpad. The launchpad matters because employees trust it without question. If a tile is quietly repointed to an attacker URL, that becomes a working phishing surface, inside the company's own branded portal."
              source={{ label: "SAP Help, Work Zone Solution Architecture", url: "https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/solution-architecture-and-authentication-details" }}
            />
          </section>

          {/* What makes BTP service keys easy to lose track of */}
          <section style={{ marginBottom: "40px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={hh2}>Seven Reasons SAP BTP Service Keys Go Untracked</h2>
            <ol style={{ ...p, paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys lead to other credentials.</strong> A Destination key doesn't store your backend passwords. The API behind it returns them anyway. One key can take you to many. This is not unique to SAP. An AWS key with Secrets Manager access does the same thing. On BTP, the Destination service makes this the normal pattern.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys are a step toward the on-premise network.</strong> A Connectivity key by itself works only from inside the CF space. Once there is a foothold in a CF app, it lets requests pass through the Cloud Connector tunnel toward on-premise systems. It's one step toward a breach.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They outlive the people who created them.</strong> Removing the user who made a key does nothing to the key. SAP KBA <a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer" style={a}>3220053</a> documents this related shadow-user behavior. Keys made by people who left the company two years back are still working.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>There is no rotation by default.</strong> The client-secret type stays valid until someone deletes the binding or the key. The X.509 certificate type is the only exception. It comes with a 7-day validity by default and can be extended up to one year. Most teams use the client-secret type because it is simpler.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>The audit log keeps only 90 days by default.</strong> Free-plan retention on the BTP Audit Log Service is 90 days, and longer retention requires the paid premium plan. A key created early in a long campaign can have its creation event already aged out before anyone looks.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some access does not appear in the BTP Audit Log.</strong> Object-level access in Object Store goes through the hyperscaler API and shows only in the hyperscaler's logging. Direct SQL access using a HANA key shows up only in HANA's own auditing, and only if that auditing is switched on. Watching only the BTP Audit Log means missing both of these.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong style={strong}>The Space Developer role is broad.</strong> Anyone who can deploy a CF app can also create service keys for any service instance in that space. The platform treats "I need to push code" and "I need non-expiring credentials to downstream systems" as the same permission.
              </li>
            </ol>
          </section>

          {/* Real incidents */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>Two Real Incidents in the SAP BTP Ecosystem</h2>

            <div style={incidentCard}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={incidentYear}>Jan – May 2024</span>
                <h3 style={incidentTitle}>SAPwned (Wiz Research)</h3>
              </div>
              <p style={{ ...p, marginBottom: "10px" }}>
                Wiz researchers found tenant-isolation flaws in SAP AI Core, a BTP service. By running normal training workloads, they were able to move sideways inside the shared Kubernetes environment and reach material belonging to other tenants. This included AWS credentials, SAP HANA Cloud credentials, and Docker Hub credentials. They also obtained cluster-admin on the AI Core cluster, plus write access to SAP's internal container registry and Artifactory. They reported it to SAP on 25 January 2024. SAP fixed it by 15 May 2024. SAP has stated that no customer data was accessed by anyone other than the researchers.
              </p>
              <p style={p}>
                No service key caused this. Credentials of one tenant were reachable from another tenant, because of a flaw in the platform itself. Service keys are one of the things sitting inside that same blast radius.
              </p>
              <p style={smallSrc}>
                Source: <a href="https://www.wiz.io/blog/sapwned-sap-ai-vulnerabilities-ai-security" target="_blank" rel="noopener noreferrer" style={a}>Wiz, SAPwned</a> · <a href="https://thehackernews.com/2024/07/sap-ai-core-vulnerabilities-expose.html" target="_blank" rel="noopener noreferrer" style={a}>The Hacker News</a>
              </p>
            </div>

            <div style={incidentCard}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={incidentYear}>April 2026</span>
                <h3 style={incidentTitle}>Mini Shai-Hulud, SAP npm supply-chain compromise</h3>
              </div>
              <p style={{ ...p, marginBottom: "10px" }}>
                In late April 2026, four SAP-related npm packages, <code style={codeStyle}>mbt</code>, <code style={codeStyle}>@cap-js/sqlite</code>, <code style={codeStyle}>@cap-js/postgres</code>, and <code style={codeStyle}>@cap-js/db-service</code>, were published with a malicious preinstall step. Any <code style={codeStyle}>npm install</code> that pulled one of these, whether directly or through a dependency, ran a credential stealer. It collected the usual developer and CI material: GitHub and npm tokens, AWS, Azure, and GCP secrets, Kubernetes tokens, GitHub Actions secrets, and saved browser passwords. It then uploaded the stolen data to GitHub repos created under the victim's own account.
              </p>
              <p style={p}>
                This attack did not target BTP service keys, and public reporting does not show BTP service-binding JSON as a notable part of what was taken. The connection to BTP is indirect. These are SAP-published packages that BTP developers use daily, so a BTP developer's own laptop or CI pipeline was a valid target. Whatever credentials were sitting in that environment, including a service key checked into a repo or exported into CI, was within reach.
              </p>
              <p style={smallSrc}>
                Source: <a href="https://www.wiz.io/blog/mini-shai-hulud-supply-chain-sap-npm" target="_blank" rel="noopener noreferrer" style={a}>Wiz, Mini Shai-Hulud SAP npm</a> · <a href="https://thehackernews.com/2026/04/sap-npm-packages-compromised-by-mini.html" target="_blank" rel="noopener noreferrer" style={a}>The Hacker News</a>
              </p>
            </div>
          </section>

          {/* Where they live */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>The BTP Cockpit Doesn't Show Service Keys in One Place</h2>
            <p style={p}>
              Service keys do not live at the Global Account level, and they do not live at the subaccount level either. They live inside specific service instances, inside specific Cloud Foundry spaces. To list every service key, an admin has to go through every Global Account, every subaccount, every CF environment, every org, every space, and every service instance, running <code style={codeStyle}>cf service-keys</code> against each one. A large BTP landscape can easily have dozens or hundreds of CF spaces. Doing this by hand takes days, and there is no native cockpit feature to speed it up.
            </p>
            <p style={p}>
              BTP xID does the same thing in one screen, by calling the BTP and Cloud Foundry APIs directly. It collects every service key, shows what is inside each one, lets you filter by subaccount or by service type, and lets you delete a key through the same APIs the moment it is no longer needed.
            </p>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              See every service key in your BTP landscape
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              Manage SAP BTP users and API credentials with BTP xID and connect your landscape in minutes.
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

// ─── styles ──────────────────────────────────────────────────────────────────
const codeStyle: React.CSSProperties = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  padding: "1px 6px",
  borderRadius: "4px",
  fontSize: "0.875em",
  color: "#0F172A",
  fontFamily: "'SF Mono', Monaco, monospace",
};
const hh2: React.CSSProperties = { color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" };
const p: React.CSSProperties = { color: "#475569", lineHeight: 1.7, marginBottom: "16px" };
const smallSrc: React.CSSProperties = { color: "#94A3B8", fontSize: "0.8125rem", margin: "8px 0 0" };
const a: React.CSSProperties = { color: "#3A9A6A", textDecoration: "none" };
const strong: React.CSSProperties = { color: "#0F172A" };
const incidentCard: React.CSSProperties = {
  marginBottom: "20px",
  padding: "22px 26px",
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  borderLeft: "4px solid #DC2626",
};
const incidentYear: React.CSSProperties = { fontSize: "0.7rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" };
const incidentTitle: React.CSSProperties = { color: "#0F172A", fontSize: "1.0625rem", fontWeight: 700, margin: 0 };

function ServiceCard({ service, contents, unlocks, source }: { service: string; contents: string; unlocks: string; source: { label: string; url: string } }) {
  return (
    <div style={{ marginBottom: "20px", padding: "22px 26px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
      <h3 style={{ color: "#0F172A", fontSize: "1.0625rem", fontWeight: 700, margin: "0 0 8px" }}>
        {service}
      </h3>
      <p style={{ margin: "0 0 10px", fontSize: "0.8125rem", color: "#64748B" }}>
        <span style={{ fontWeight: 700, color: "#0F172A" }}>Contains:</span> <code style={{ ...codeStyle, fontSize: "0.8125rem" }}>{contents}</code>
      </p>
      <p style={{ ...p, marginBottom: "10px" }}>
        <span style={{ fontWeight: 700, color: "#0F172A" }}>What it can reach:</span> {unlocks}
      </p>
      <p style={smallSrc}>
        Source: <a href={source.url} target="_blank" rel="noopener noreferrer" style={a}>{source.label}</a>
      </p>
    </div>
  );
}
