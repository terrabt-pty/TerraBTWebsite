import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPServiceKeysAPICredentialsPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Keys: What Each Key Contains and What It Can Reach | TerraBT"
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
            What each SAP BTP service key actually contains
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            "Service key" is SAP's name for what most people call an API key. It is a JSON document that holds credentials, produced by <code style={codeStyle}>cf create-service-key</code>. What it contains and how far it can reach depends on which service it belongs to. The BTP cockpit does not list them in one place. This post goes service by service and says what is inside each key and what it can reach. Sources are linked in each part.
          </p>

          {/* What they are */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>The mechanics, in one paragraph</h2>
            <p style={p}>
              Every service key in SAP BTP is one of three things. An OAuth <code style={codeStyle}>clientid</code> and <code style={codeStyle}>clientsecret</code> pair, a database user and password, or hyperscaler credentials like an S3 access key. Anyone with the Cloud Foundry <strong>Space Developer</strong> role can create one, and that is the same role a person needs to deploy an app. There is no expiry by default. SAP's docs say <em>"the secret remains valid as long as the binding or the service key exists."</em> Deleting the user who made the key does not revoke it.
            </p>
            <p style={smallSrc}>
              Source: <a href="https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/service-instance-secrets-5578ec4.md" target="_blank" rel="noopener noreferrer" style={a}>SAP docs, Service Instance Secrets</a>
            </p>
          </section>

          {/* Per-service breakdown */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>What each service key contains, and what it can reach</h2>
            <p style={{ ...p, marginBottom: "24px" }}>
              One thing applies to all of them, so I will say it once here. A key can reach whatever the identity or grants behind it can reach. A key is not powerful on its own. It is powerful when the user, scope or plan behind it is broad. A lot of the real risk on BTP is keys that got more privilege than the task needed, because that was the quick way to set it up.
            </p>

            <ServiceCard
              service="SAP HANA Cloud"
              contents="JDBC URL · username · password · schema · certificate"
              unlocks="A direct database connection over port 443. HANA Cloud is on the public internet by default, so there is no VPN or Cloud Connector in the way. You get exactly the access the bound database user has. If that user has wide grants, the reach is wide. If it is scoped to one schema, it stays there. The problem is usually not the key. It is that teams bind a high-privilege user because it was faster at setup time."
              source={{ label: "SAP HANA Cloud, Connect via JDBC", url: "https://help.sap.com/docs/hana-cloud/sap-hana-cloud-getting-started-guide/connect-to-sap-hana-database-in-sap-hana-cloud-via-jdbc" }}
            />

            <ServiceCard
              service="SAP Destination Service"
              contents="clientid · clientsecret · destination-service URI · XSUAA token URL"
              unlocks="The key is only an OAuth client credential. It does not contain the passwords of your backend systems. It authenticates against the Destination Service REST API for that subaccount. Calling GET /destination-configuration/v1/destinations returns the destinations the subaccount has registered. If a destination stores a Basic-auth password or an OAuth client secret, the service returns that value in the response. So the key lets you read the stored credentials of the systems those destinations point to, like S/4HANA, SuccessFactors or third-party APIs. It does not hold those credentials itself."
              source={{ label: "SAP Cloud SDK, Destinations", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations" }}
            />

            <ServiceCard
              service="SAP Authorization & Trust Management (XSUAA)"
              contents="clientid · clientsecret · OAuth URL · api URL · tenant ID · subaccount ID"
              unlocks="This depends on the service plan, so check the plan before you decide it is low risk. The application plan lets you mint tokens for the bound app's own scopes. The apiaccess plan is the one to watch. It is the plan SAP documents for managing users, roles and role collections through the API. With that plan, the holder can create a role collection with admin scopes and assign it. That is a privilege escalation inside the subaccount."
              source={{ label: "SAP Community, XSUAA REST API", url: "https://community.sap.com/t5/technology-blog-posts-by-sap/sap-btp-security-how-to-use-rest-api-of-xsuaa-to-programmatically-manage/ba-p/13540720" }}
            />

            <ServiceCard
              service="SAP Connectivity Service"
              contents="clientid · clientsecret · onpremise_proxy_host · onpremise_proxy_port · token service URL"
              unlocks="On its own this key only works from inside the CF space, because the proxy host it points to is not public. Its use to an attacker is as a second step. Paired with a foothold in a CF app, it lets requests go through the Cloud Connector tunnel toward on-premise systems like S/4HANA. It is a path toward the internal network, not an open door by itself."
              source={{ label: "SAP Cloud SDK, On-premise Connectivity", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/on-premise" }}
            />

            <ServiceCard
              service="SAP Object Store"
              contents="access_key_id · secret_access_key · region · bucket (or Azure / GCS equivalents)"
              unlocks="These are real hyperscaler credentials. An S3 access key, or the Azure Blob or GCS equivalent, for the customer's bucket. Read, write, delete, list. This is usually where AI Core grounding data, Build Apps backups and CAP uploads sit. One thing to know: object-level access through the hyperscaler API is not recorded in the BTP Audit Log Service. It only shows in the hyperscaler's own logging, which a lot of teams do not forward to their SOC."
              source={{ label: "SAP Object Store FAQ", url: "https://help.sap.com/docs/object-store/object-store-service-on-sap-btp/frequently-asked-questions" }}
            />

            <ServiceCard
              service="SAP Integration Suite (Cloud Integration / CPI)"
              contents="clientid · clientsecret · token URL · tenant runtime URL (or x.509 certificate variant)"
              unlocks="With the integration-flow plan, the key can invoke the iFlow endpoints it is scoped to. With the api management plan, it can list the deployed iFlows, download their definitions, which often contain mapping logic, hard-coded usernames and partner endpoints, and deploy new ones. CPI tenants usually carry B2B, EDI and payroll traffic between S/4HANA, SuccessFactors, banks and Ariba, so the messages passing through can include invoices, employee data and payment instructions. Again, the actual reach depends on the plan and the instance scope."
              source={{ label: "SAP Help, Cloud Integration Service Key Types", url: "https://help.sap.com/docs/cloud-integration/sap-cloud-integration/service-key-types" }}
            />

            <ServiceCard
              service="SAP Build Work Zone"
              contents="clientid · clientsecret · workzone tenant URL"
              unlocks="Access to the SCIM API for listing site users and the content-management API for editing the launchpad. The launchpad matters because employees trust it. A tile repointed to an attacker URL is a working phishing surface inside the company's own branded portal."
              source={{ label: "SAP Help, Work Zone Solution Architecture", url: "https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/solution-architecture-and-authentication-details" }}
            />
          </section>

          {/* What makes BTP service keys easy to lose track of */}
          <section style={{ marginBottom: "40px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={hh2}>A few things that make these keys easy to lose track of</h2>
            <ol style={{ ...p, paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys lead to other credentials.</strong> A Destination key does not hold your backend passwords, but the API it authenticates against will return them. So one key can lead to many. This is not special to SAP. An AWS key with Secrets Manager access does the same. But on BTP the Destination service makes it the normal pattern, not a misconfiguration.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys are a step toward the on-premise network.</strong> A Connectivity key on its own only works from inside the CF space. With a foothold in a CF app, it lets requests pass through the Cloud Connector tunnel toward on-premise systems. It is a step, not an open door, but it counts as one.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They outlive the people who created them.</strong> Removing the user who made a key does nothing to the key. SAP KBA <a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer" style={a}>3220053</a> covers the related shadow-user behaviour. Keys made by people who left two years ago can still work.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>There is no rotation by default.</strong> The client-secret type stays valid until someone deletes the binding or the key. The X.509 certificate type is the exception. It defaults to a 7-day validity and can be extended up to a year. Most teams use the client-secret type because it is simpler.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>The audit log keeps 90 days by default.</strong> The BTP Audit Log Service keeps data for 90 days on the free plan. Longer retention needs the premium paid plan. A key created early in a longer campaign can have its creation event age out before anyone looks.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some access does not show in the BTP Audit Log at all.</strong> Object-level access in Object Store goes through the hyperscaler API and shows only in the hyperscaler's logging. Direct SQL access with a HANA key is logged by HANA's own auditing if it is switched on, not by the BTP Audit Log. If you only watch the BTP Audit Log, you will not see either.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong style={strong}>The Space Developer role is broad.</strong> Anyone who can deploy a CF app can also create service keys for any service instance in that space. The platform treats "I need to push code" and "I need non-expiring credentials to downstream systems" as the same permission.
              </li>
            </ol>
          </section>

          {/* Real incidents */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>Two real incidents that touched SAP BTP</h2>

            <div style={incidentCard}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={incidentYear}>Jan – May 2024</span>
                <h3 style={incidentTitle}>SAPwned (Wiz Research)</h3>
              </div>
              <p style={{ ...p, marginBottom: "10px" }}>
                Wiz researchers found tenant-isolation flaws in SAP AI Core, which is a BTP service. By running normal training workloads, they moved laterally inside the shared Kubernetes environment and reached other tenants' material. That included AWS credentials, SAP HANA Cloud credentials and Docker Hub credentials. They also got cluster-admin on the AI Core cluster and write access to SAP's internal container registry and Artifactory. They reported it to SAP on 25 January 2024 and SAP fixed it by 15 May 2024. SAP said no customer data was accessed by anyone other than the researchers.
              </p>
              <p style={p}>
                A service key did not cause this. The point is that credentials from one tenant were reachable from another tenant because of a flaw in the platform. Service keys are one of the things inside that blast radius.
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
                In late April 2026, four SAP-related npm packages, <code style={codeStyle}>mbt</code>, <code style={codeStyle}>@cap-js/sqlite</code>, <code style={codeStyle}>@cap-js/postgres</code> and <code style={codeStyle}>@cap-js/db-service</code>, were published with a malicious preinstall step. Any <code style={codeStyle}>npm install</code> that pulled one of these, directly or through a dependency, ran a credential stealer. It collected the usual developer and CI material: GitHub and npm tokens, AWS, Azure and GCP secrets, Kubernetes tokens, GitHub Actions secrets and saved browser passwords. It uploaded the stolen data to GitHub repos it created under the victim's own account.
              </p>
              <p style={p}>
                One thing to be clear about. This attack did not target BTP service keys, and the public reporting does not show BTP service-binding JSON as a notable part of what was taken. The link to BTP is indirect. These are SAP-published packages that BTP developers use, so a BTP developer's laptop or CI pipeline was a valid target. Whatever credentials happened to be in that environment, including a service key checked into a repo or exported into CI, were in reach.
              </p>
              <p style={smallSrc}>
                Source: <a href="https://www.wiz.io/blog/mini-shai-hulud-supply-chain-sap-npm" target="_blank" rel="noopener noreferrer" style={a}>Wiz, Mini Shai-Hulud SAP npm</a> · <a href="https://thehackernews.com/2026/04/sap-npm-packages-compromised-by-mini.html" target="_blank" rel="noopener noreferrer" style={a}>The Hacker News</a>
              </p>
            </div>
          </section>

          {/* Where they live */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>And the BTP cockpit does not show them in one place</h2>
            <p style={p}>
              Service keys do not live at the Global Account level, and they do not live at the subaccount level. They live inside specific service instances, inside specific Cloud Foundry spaces. To list every service key, an admin has to go through every Global Account, every subaccount, every CF environment, every org, every space and every service instance, and run <code style={codeStyle}>cf service-keys</code> against each one. A large BTP landscape can have dozens or hundreds of CF spaces, so doing this by hand takes days, and no native cockpit feature speeds it up.
            </p>
            <p style={p}>
              BTP xID does this in one screen by calling the BTP and Cloud Foundry APIs directly. It collects every service key, shows what each one contains, lets you filter by subaccount or service type, and lets you delete a key through the same APIs when it is no longer needed.
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
