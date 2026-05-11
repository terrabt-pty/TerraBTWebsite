import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPServiceKeysAPICredentialsPage() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Keys: What Each Key Unlocks and Why It Matters | TerraBT"
        description="A service-by-service breakdown of SAP BTP Cloud Foundry service keys: HANA Cloud, Destination, XSUAA, Connectivity, Object Store, Integration Suite. What each key contains, what an attacker holding one can reach, and why BTP service keys are uniquely dangerous in a Fortune 500 landscape."
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
            What each SAP BTP service key actually unlocks
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            "Service key" is SAP's term for what the rest of the world calls an API key: a JSON blob containing credentials, returned by <code style={codeStyle}>cf create-service-key</code>. The contents differ per service, the danger differs per service, and the BTP cockpit aggregates none of it. This is a service-by-service look at what's actually inside, and what an attacker holding one can reach.
          </p>

          {/* What they are */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>The mechanics, in one paragraph</h2>
            <p style={p}>
              Every service key in SAP BTP is one of three things: an OAuth <code style={codeStyle}>clientid</code> + <code style={codeStyle}>clientsecret</code> pair, a database user and password, or hyperscaler-native credentials (S3 access key, Azure key, etc.). They are created by anyone holding the Cloud Foundry <strong>Space Developer</strong> role — the same role required to deploy an application. SAP's own documentation confirms: <em>"the secret remains valid as long as the binding or the service key exists."</em> There is no expiry by default, and no automatic revocation when the user who created it is removed from the platform.
            </p>
            <p style={smallSrc}>
              Source: <a href="https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/service-instance-secrets-5578ec4.md" target="_blank" rel="noopener noreferrer" style={a}>SAP docs — Service Instance Secrets</a>
            </p>
          </section>

          {/* Per-service breakdown */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>What each service key contains, and what it unlocks</h2>

            <ServiceCard
              service="SAP HANA Cloud"
              contents="JDBC URL · username · plaintext password · schema · certificate"
              unlocks="Direct database connection over port 443, public on the internet — no VPN, no Cloud Connector. Whatever grants the bound user has are now the attacker's. If the binding uses a DBADMIN-derived role, that is effectively root on the HANA tenant: customer PII, financial postings, ML features, every schema the user can read."
              source={{ label: "SAP HANA Cloud — Connect via JDBC", url: "https://help.sap.com/docs/hana-cloud/sap-hana-cloud-getting-started-guide/connect-to-sap-hana-database-in-sap-hana-cloud-via-jdbc" }}
            />

            <ServiceCard
              service="SAP Destination Service"
              contents="clientid · clientsecret · destination-service URI · XSUAA token URL"
              unlocks="The full Destination Service REST API for the sub-account. The attacker calls GET /destination-configuration/v1/destinations and receives the configuration of every destination the customer has registered — S/4HANA, SuccessFactors, Ariba, third-party APIs — including the stored Basic-auth passwords, OAuth client secrets, and Cloud-Connector ProxyAuthorization headers in plain readable form. A single Destination key is a credential vault dump of every backend system the BTP apps can call."
              source={{ label: "SAP Cloud SDK — Destinations", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations" }}
            />

            <ServiceCard
              service="SAP Authorization & Trust Management (XSUAA)"
              contents="clientid · clientsecret · OAuth URL · api URL · tenant ID · subaccount ID"
              unlocks="Depends on the service plan. The application plan grants token-minting for the bound app's scopes. The apiaccess plan is the dangerous one — SAP's own community documentation describes it as the way to programmatically manage roles, role collections, and users. A leaked apiaccess key lets an attacker mint themselves a token, create a role collection containing admin scopes, and grant themselves that collection — a full privilege escalation inside the sub-account."
              source={{ label: "SAP Community — XSUAA REST API", url: "https://community.sap.com/t5/technology-blog-posts-by-sap/sap-btp-security-how-to-use-rest-api-of-xsuaa-to-programmatically-manage/ba-p/13540720" }}
            />

            <ServiceCard
              service="SAP Connectivity Service"
              contents="clientid · clientsecret · onpremise_proxy_host · onpremise_proxy_port · token service URL"
              unlocks="The Cloud Connector tunnel. The proxy is reachable from inside the CF space, but combined with a compromised app or a Destination key, the attacker routes arbitrary HTTP requests through the Cloud Connector tunnel into the on-premise network. Cloud SDK documentation describes the flow plainly: the connectivity service brokers requests that pass via the Cloud Connector to on-premise S/4HANA. A leaked Connectivity key is a passage past the corporate firewall."
              source={{ label: "SAP Cloud SDK — On-premise Connectivity", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/on-premise" }}
            />

            <ServiceCard
              service="SAP Object Store"
              contents="access_key_id · secret_access_key · region · bucket (or Azure / GCS equivalents)"
              unlocks="Real hyperscaler IAM credentials behind the scenes — direct S3 (or Azure Blob, GCS) API access to the customer's bucket. Read, write, delete, list. Object Store is where SAP AI Core grounding data, SAP Build Apps backups, and CAP app uploads typically land. The kicker: object-level access through the hyperscaler API does not show in the BTP Audit Log Service. Detection requires the hyperscaler's own logging, which many customers do not pipe to their SOC."
              source={{ label: "SAP Object Store FAQ", url: "https://help.sap.com/docs/object-store/object-store-service-on-sap-btp/frequently-asked-questions" }}
            />

            <ServiceCard
              service="SAP Integration Suite (Cloud Integration / CPI)"
              contents="clientid · clientsecret · token URL · tenant runtime URL (or x.509 certificate variant)"
              unlocks="With the integration-flow plan: ability to invoke any deployed iFlow endpoint the instance is scoped to. With the api management plan: list every deployed iFlow, download its full definition (revealing mapping logic, hard-coded usernames, partner endpoints), and deploy new ones — including a malicious iFlow that exfiltrates every message passing through. CPI tenants typically broker B2B / EDI / payroll between S/4HANA, SuccessFactors, banks and Ariba; the message contents in flight include invoices, employee PII, and payment instructions."
              source={{ label: "SAP Help — Cloud Integration Service Key Types", url: "https://help.sap.com/docs/cloud-integration/sap-cloud-integration/service-key-types" }}
            />

            <ServiceCard
              service="SAP Build Work Zone"
              contents="clientid · clientsecret · workzone tenant URL"
              unlocks="The SCIM API (enumerate site users) and the content-management API (modify the launchpad). The launchpad is high-value for credential phishing because users implicitly trust the corporate portal — an attacker can change a tile to point at an attacker-controlled URL and harvest credentials from inside the customer's own branded UI."
              source={{ label: "SAP Help — Work Zone Solution Architecture", url: "https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/solution-architecture-and-authentication-details" }}
            />
          </section>

          {/* What makes BTP service keys uniquely dangerous */}
          <section style={{ marginBottom: "40px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={hh2}>What makes BTP service keys uniquely dangerous</h2>
            <ol style={{ ...p, paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They are credential bundles, not single credentials.</strong> A Destination key contains, by design, the credentials for every other system in the sub-account. This is a force multiplier no AWS or Azure access key offers.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They route past the corporate firewall.</strong> A Connectivity key paired with any CF app gives an attacker a tunnel through the Cloud Connector into the on-premise data centre.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They outlive the people.</strong> Removing the user who created them has zero effect on the key. SAP KBA <a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer" style={a}>3220053</a> documents the related shadow-user behaviour — keys created by employees who left two years ago remain fully functional.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>The rotation default is "never."</strong> SAP's published recommendation is 90 days, but the technical default is open-ended. Only X.509 service keys have built-in expiry (7 days default), and most customers use client-secret because it's the path of least resistance.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Audit retention is 90 days by default.</strong> A key created and used in month 1 of a year-long campaign has its creation event aged out of the BTP Audit Log before the customer notices. Premium retention is a separate paid SKU.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Detection is asymmetric.</strong> HANA Cloud SQL access and Object Store object-level access are not captured by the BTP Audit Log Service. An attacker holding a HANA service key can <code style={codeStyle}>SELECT *</code> for months and the BTP audit log shows nothing.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong style={strong}>The Space Developer role is over-broad.</strong> Anyone who can deploy a CF app can also create service keys for any service instance in that space. The platform conflates "I need to push code" with "I need permanent extractable credentials to every downstream system."
              </li>
            </ol>
          </section>

          {/* Real incidents */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>Two documented incidents that hit SAP BTP directly</h2>

            <div style={incidentCard}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={incidentYear}>Jan – May 2024</span>
                <h3 style={incidentTitle}>SAPwned (Wiz Research)</h3>
              </div>
              <p style={{ ...p, marginBottom: "10px" }}>
                Wiz researchers exploited a tenant-isolation failure in SAP AI Core (a BTP service) to extract customer service-key material from neighbouring tenants. The report describes obtaining other customers' AWS credentials (for S3 data access), SAP HANA Cloud credentials (for Data Lake access), and Docker Hub credentials — plus cluster admin on the AI Core Kubernetes cluster, write access to SAP's internal container registry, and write access to SAP's Artifactory. SAP confirmed and patched between January and May 2024.
              </p>
              <p style={p}>
                The lesson for a BTP CISO: a single leaked BTP service key, paired with a tenant-isolation bug in any BTP-managed service, can leak <em>other</em> customers' service keys. This is a risk vector that has no AWS or GCP equivalent.
              </p>
              <p style={smallSrc}>
                Source: <a href="https://www.wiz.io/blog/sapwned-sap-ai-vulnerabilities-ai-security" target="_blank" rel="noopener noreferrer" style={a}>Wiz — SAPwned</a> · <a href="https://www.securityweek.com/sap-ai-core-vulnerabilities-allowed-service-takeover-customer-data-access/" target="_blank" rel="noopener noreferrer" style={a}>SecurityWeek</a>
              </p>
            </div>

            <div style={incidentCard}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span style={incidentYear}>April 2026</span>
                <h3 style={incidentTitle}>Mini Shai-Hulud — SAP npm supply-chain compromise</h3>
              </div>
              <p style={{ ...p, marginBottom: "10px" }}>
                A worm embedded in four official SAP npm packages (<code style={codeStyle}>mbt</code>, <code style={codeStyle}>@cap-js/sqlite</code>, <code style={codeStyle}>@cap-js/postgres</code>, <code style={codeStyle}>@cap-js/db-service</code>) executed a hidden preinstall script that read in-memory secrets from CI environments — GitHub Actions secrets, AWS credential files, Azure Key Vault references, GCP Secret Manager, and Kubernetes service-account JSON. Stolen credentials were uploaded to over 1,200 public GitHub repositories. A significant portion of the stolen tokens were BTP service-binding JSON.
              </p>
              <p style={p}>
                The lesson: BTP service keys do not just leak through your own developers' mistakes. They leak through the SAP-published packages your developers depend on.
              </p>
              <p style={smallSrc}>
                Source: <a href="https://www.wiz.io/blog/mini-shai-hulud-supply-chain-sap-npm" target="_blank" rel="noopener noreferrer" style={a}>Wiz — Mini Shai-Hulud SAP npm</a> · <a href="https://www.bleepingcomputer.com/news/security/official-sap-npm-packages-compromised-to-steal-credentials/" target="_blank" rel="noopener noreferrer" style={a}>BleepingComputer</a>
              </p>
            </div>
          </section>

          {/* Where they live */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>And the BTP cockpit shows you none of them in one place</h2>
            <p style={p}>
              Service keys do not live at the Global Account level. They do not live at the sub-account level. They live inside specific service instances, inside specific Cloud Foundry spaces. To inventory every service key, an admin must open every Global Account, every sub-account, every CF environment, every org, every space, every service instance — and run <code style={codeStyle}>cf service-keys</code> against each one. A Fortune 500 BTP landscape typically has hundreds of CF spaces; the inventory exercise is a multi-day project that no native cockpit feature accelerates.
            </p>
            <p style={p}>
              BTP xID does this in one screen, by calling the BTP and Cloud Foundry APIs directly. It aggregates every service key, surfaces the contents, lets you filter by sub-account or service type, and lets you delete keys instantly through the same APIs.
            </p>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#F8FAFC", borderRadius: "12px", padding: "40px 24px", border: "1px solid #E2E8F0" }}>
            <p style={{ color: "#0F172A", fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px" }}>
              See every service key in your BTP landscape
            </p>
            <p style={{ color: "#475569", fontSize: "0.9375rem", marginBottom: "24px" }}>
              Download BTP xID and connect your landscape in minutes.
            </p>
            <a
              href="/"
              style={{ display: "inline-block", background: "linear-gradient(135deg, #4CAF50, #3A9A6A, #1E5099)", color: "#FFFFFF", padding: "12px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none" }}
            >
              Download BTP xID
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
        <span style={{ fontWeight: 700, color: "#0F172A" }}>What it unlocks:</span> {unlocks}
      </p>
      <p style={smallSrc}>
        Source: <a href={source.url} target="_blank" rel="noopener noreferrer" style={a}>{source.label}</a>
      </p>
    </div>
  );
}
