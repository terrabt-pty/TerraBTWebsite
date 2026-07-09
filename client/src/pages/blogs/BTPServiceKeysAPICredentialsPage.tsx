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
            What is actually inside an SAP BTP service key
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            See, "service key" is just SAP's name for what most of us would call an API key. It is one JSON document holding some credentials, and you get it by running <code style={codeStyle}>cf create-service-key</code>. Now what is there inside it, and how far it can reach, that depends fully on which service the key belongs to. And the BTP cockpit will not show you all of them in one place, which is the whole problem only. So in this post I am going service by service, telling you plainly what sits inside each key and what it can touch. Wherever I make a claim, the source link is given in that same section.
          </p>

          {/* What they are */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>The mechanics, in one paragraph</h2>
            <p style={p}>
              Every service key in SAP BTP is one of three things only. Either an OAuth <code style={codeStyle}>clientid</code> and <code style={codeStyle}>clientsecret</code> pair, or a database user and password, or hyperscaler credentials like an S3 access key. Now the important part. Anybody who is having the Cloud Foundry <strong>Space Developer</strong> role can create one of these, and that is the same role a person needs just to deploy an application. There is no expiry by default. SAP's own documentation says it clearly, <em>"the secret remains valid as long as the binding or the service key exists."</em> And even if you remove the person who created the key, still the key keeps working. It does not get revoked.
            </p>
            <p style={smallSrc}>
              Source: <a href="https://github.com/SAP-docs/btp-cloud-platform/blob/main/docs/50-administration-and-ops/service-instance-secrets-5578ec4.md" target="_blank" rel="noopener noreferrer" style={a}>SAP docs, Service Instance Secrets</a>
            </p>
          </section>

          {/* Per-service breakdown */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={hh2}>What each service key contains, and what it can reach</h2>
            <p style={{ ...p, marginBottom: "24px" }}>
              One thing is common for all of them, so let me say it once here itself. A key can reach only whatever the identity or the grants behind it can reach. By itself, a key is not powerful. It becomes powerful when the user, the scope or the plan behind it is a broad one. Honestly, most of the real risk you will see on BTP is like this only. Some key which got much more privilege than the actual task needed, simply because that was the fast way to set it up at that time.
            </p>

            <ServiceCard
              service="SAP HANA Cloud"
              contents="JDBC URL · username · password · schema · certificate"
              unlocks="This gives you one direct database connection over port 443. HANA Cloud is sitting on the public internet by default, so there is no VPN and no Cloud Connector coming in between. Whatever access the bound database user is having, exactly that much you get, nothing more. If that user is having wide grants, then the reach is also wide. If it is scoped to one schema only, then it stays there only. So the real problem is usually not the key itself. The problem is that teams bind one high-privilege user because at setup time it was the faster option."
              source={{ label: "SAP HANA Cloud, Connect via JDBC", url: "https://help.sap.com/docs/hana-cloud/sap-hana-cloud-getting-started-guide/connect-to-sap-hana-database-in-sap-hana-cloud-via-jdbc" }}
            />

            <ServiceCard
              service="SAP Destination Service"
              contents="clientid · clientsecret · destination-service URI · XSUAA token URL"
              unlocks="Here people describe it wrongly many times, so let me be careful. The key by itself is only an OAuth client credential. It is not holding the passwords of your backend systems. What it does is, it authenticates against the Destination Service REST API of that subaccount. When you call GET /destination-configuration/v1/destinations, the API returns all the destinations that the subaccount has registered. And if some destination is storing a Basic-auth password or an OAuth client secret, then the service returns that value also in the response. So the key is giving you a way to read the stored credentials of whichever systems those destinations are pointing to, like S/4HANA, SuccessFactors or some third-party API. But the key is not keeping those credentials inside itself."
              source={{ label: "SAP Cloud SDK, Destinations", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations" }}
            />

            <ServiceCard
              service="SAP Authorization & Trust Management (XSUAA)"
              contents="clientid · clientsecret · OAuth URL · api URL · tenant ID · subaccount ID"
              unlocks="This one depends fully on the service plan, so kindly check the plan before deciding it is a low-risk key. The application plan will let you mint tokens only for the bound application's own scopes. But the apiaccess plan, that is the one you have to watch. It is the plan that SAP itself documents for managing users, roles and role collections through the API. With such a key, the holder can create one role collection having admin scopes and then assign the same to himself. That is straightaway a privilege escalation inside the subaccount."
              source={{ label: "SAP Community, XSUAA REST API", url: "https://community.sap.com/t5/technology-blog-posts-by-sap/sap-btp-security-how-to-use-rest-api-of-xsuaa-to-programmatically-manage/ba-p/13540720" }}
            />

            <ServiceCard
              service="SAP Connectivity Service"
              contents="clientid · clientsecret · onpremise_proxy_host · onpremise_proxy_port · token service URL"
              unlocks="By itself this key works only from inside the CF space, because the proxy host it is pointing to is not public. Its real use for an attacker is as a second step. If he is already having some foothold in a CF app, then using this key he can send requests through the Cloud Connector tunnel towards on-premise systems like S/4HANA. So understand it as a path leading towards the internal network, not as an open door on its own."
              source={{ label: "SAP Cloud SDK, On-premise Connectivity", url: "https://sap.github.io/cloud-sdk/docs/js/features/connectivity/on-premise" }}
            />

            <ServiceCard
              service="SAP Object Store"
              contents="access_key_id · secret_access_key · region · bucket (or Azure / GCS equivalents)"
              unlocks="These are actual hyperscaler credentials. Means an S3 access key, or the Azure Blob or GCS equivalent, for the customer's bucket. Read, write, delete, list, all of it. Normally this is the place where AI Core grounding data, Build Apps backups and CAP uploads are kept. One point you should note. This object-level access happening through the hyperscaler API does not come in the BTP Audit Log Service at all. It will show up only in the hyperscaler's own logging, and many teams are not forwarding that to their SOC."
              source={{ label: "SAP Object Store FAQ", url: "https://help.sap.com/docs/object-store/object-store-service-on-sap-btp/frequently-asked-questions" }}
            />

            <ServiceCard
              service="SAP Integration Suite (Cloud Integration / CPI)"
              contents="clientid · clientsecret · token URL · tenant runtime URL (or x.509 certificate variant)"
              unlocks="With the integration-flow plan, this key can invoke the iFlow endpoints that it is scoped to. With the api management plan, it can do much more. It can list all the deployed iFlows, download their definitions, which many times are containing the mapping logic, hard-coded usernames and partner endpoints, and it can also deploy new ones. CPI tenants normally carry B2B, EDI and payroll traffic between S/4HANA, SuccessFactors, banks and Ariba, so the messages going through can have invoices, employee data and payment instructions inside them. Again the same thing, the actual reach is depending on the plan and the instance scope."
              source={{ label: "SAP Help, Cloud Integration Service Key Types", url: "https://help.sap.com/docs/cloud-integration/sap-cloud-integration/service-key-types" }}
            />

            <ServiceCard
              service="SAP Build Work Zone"
              contents="clientid · clientsecret · workzone tenant URL"
              unlocks="This gives access to the SCIM API for listing the site users, and the content-management API for editing the launchpad. The launchpad is important because employees are trusting it blindly. If one tile is quietly repointed to some attacker URL, that itself becomes a working phishing surface, and that too inside the company's own branded portal."
              source={{ label: "SAP Help, Work Zone Solution Architecture", url: "https://help.sap.com/docs/build-work-zone-advanced-edition/sap-build-work-zone-advanced-edition/solution-architecture-and-authentication-details" }}
            />
          </section>

          {/* What makes BTP service keys easy to lose track of */}
          <section style={{ marginBottom: "40px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={hh2}>A few reasons these keys are easy to lose track of</h2>
            <ol style={{ ...p, paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys are leading you to other credentials.</strong> A Destination key is not holding your backend passwords, but the API behind it will return them. So one key can take you to many. This is not something special to SAP only. Even an AWS key having Secrets Manager access does the same thing. But on BTP, the Destination service makes this the normal pattern, not a misconfiguration.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some keys are a step towards the on-premise network.</strong> A Connectivity key by itself works only from inside the CF space. But once there is a foothold in a CF app, it lets requests pass through the Cloud Connector tunnel towards on-premise systems. It is one step, not an open door, but still it counts as one step.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>They outlive the people who created them.</strong> If you remove the user who made a key, it does nothing to the key. SAP KBA <a href="https://userapps.support.sap.com/sap/support/knowledge/en/3220053" target="_blank" rel="noopener noreferrer" style={a}>3220053</a> covers this related shadow-user behaviour. Keys made by people who left the company two years back are also still working.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>There is no rotation by default.</strong> The client-secret type stays valid until somebody deletes the binding or the key. The X.509 certificate type is the only exception. It comes with a 7-day validity by default, and you can extend it up to one year. But most teams are using the client-secret type only, because it is simpler.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>The audit log keeps only 90 days by default.</strong> The BTP Audit Log Service keeps the data for 90 days on the free plan. For longer retention you need the premium paid plan. So a key that was created early in a long campaign can have its creation event already aged out before anybody looks.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong style={strong}>Some access is not coming in the BTP Audit Log at all.</strong> Object-level access in Object Store goes through the hyperscaler API and shows only in the hyperscaler's logging. Direct SQL access using a HANA key is logged by HANA's own auditing, that too only if it is switched on, not by the BTP Audit Log. So if you are watching only the BTP Audit Log, you will not see either of these.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong style={strong}>The Space Developer role is a broad one.</strong> Anybody who can deploy a CF app can also create service keys for any service instance in that space. The platform is treating "I need to push code" and "I need non-expiring credentials to downstream systems" as one and the same permission.
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
                Wiz researchers found some tenant-isolation flaws in SAP AI Core, which is a BTP service. By just running normal training workloads, they were able to move sideways inside the shared Kubernetes environment and reach the material belonging to other tenants. This included AWS credentials, SAP HANA Cloud credentials and Docker Hub credentials. On top of that, they got cluster-admin on the AI Core cluster, and write access to SAP's internal container registry and Artifactory also. They reported it to SAP on 25 January 2024, and SAP fixed it by 15 May 2024. SAP has stated that no customer data was accessed by anybody other than the researchers.
              </p>
              <p style={p}>
                Now understand one thing. No service key caused this. The real point is that credentials of one tenant were reachable from another tenant, only because of a flaw in the platform itself. And service keys are one of the things sitting inside that same blast radius.
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
                In late April 2026, four SAP-related npm packages, that is <code style={codeStyle}>mbt</code>, <code style={codeStyle}>@cap-js/sqlite</code>, <code style={codeStyle}>@cap-js/postgres</code> and <code style={codeStyle}>@cap-js/db-service</code>, were published with one malicious preinstall step inside. Any <code style={codeStyle}>npm install</code> that pulled one of these, whether directly or through some dependency, ran a credential stealer. It collected the usual developer and CI material, means GitHub and npm tokens, AWS, Azure and GCP secrets, Kubernetes tokens, GitHub Actions secrets, and even the saved browser passwords. Then it uploaded all this stolen data to GitHub repos that it created under the victim's own account.
              </p>
              <p style={p}>
                But let me be clear on one point. This attack did not target BTP service keys, and the public reporting is also not showing BTP service-binding JSON as any notable part of what was taken. The connection to BTP is indirect. These are SAP-published packages that BTP developers are using daily, so a BTP developer's own laptop or CI pipeline was a valid target. And whatever credentials were sitting in that environment, including some service key checked into a repo or exported into CI, all of that was within reach.
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
              Service keys are not living at the Global Account level, and they are not living at the subaccount level also. They live inside specific service instances, inside specific Cloud Foundry spaces. So to list every service key, an admin has to go through every Global Account, every subaccount, every CF environment, every org, every space and every service instance, and run <code style={codeStyle}>cf service-keys</code> against each one. A large BTP landscape can easily have dozens or hundreds of CF spaces, so doing all this by hand takes days together, and there is no native cockpit feature to speed it up.
            </p>
            <p style={p}>
              BTP xID does the same thing in one single screen, by directly calling the BTP and Cloud Foundry APIs. It collects every service key, shows you what is inside each one, lets you filter by subaccount or by service type, and lets you delete a key through the same APIs the moment it is no longer needed.
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
