import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function BTPServiceKeysAPICredentialsPage() {
  return (
    <>
      <SEOHead
        title="Service Keys Are API Keys: The SAP BTP Visibility Problem | TerraBT"
        description="In SAP BTP, service keys are functionally API keys — long-lived OAuth credentials. They sit at the bottom of a nested hierarchy (Global Account → Sub-account → CF Org → CF Space) and are not aggregated in any cockpit view. Real-world breaches show what that means."
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
            Service Keys in SAP BTP
          </p>

          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Service keys are API keys. SAP just calls them something different.
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            If you ask a SAP BTP administrator what a service key is, they'll explain it as a credential bound to a service instance. If you ask a security architect what an API key is, they'll describe the same thing. The terminology is different. The risk is identical. And in BTP today, there is no single screen that shows you all of them.
          </p>

          {/* Section: What service keys are */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What a service key actually is</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              When a developer in a Cloud Foundry space runs <code style={codeStyle}>cf create-service-key</code> against a HANA Cloud instance, BTP returns a JSON blob. Inside that blob: an OAuth <code style={codeStyle}>clientid</code>, an OAuth <code style={codeStyle}>clientsecret</code>, a JDBC URL, a username and a plaintext password. Any process holding that JSON can authenticate to your HANA database as long as the credentials remain valid.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              For a Destination service, the same operation returns endpoint URLs and credentials for your on-premise systems. For XSUAA, OAuth credentials that can mint tokens for any role bound to the instance. For the Object Store, S3-compatible access keys.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: 0 }}>
              SAP's own Cloud SDK guidance acknowledges the risk: <em>"the use of clientsecret has an inherent risk of these credentials being leaked, especially as they are not frequently rotated. Leaking these credentials into the hands of an attacker can cause a lot of harm and stay long unnoticed."</em>
            </p>
          </section>

          {/* Section: Where they live */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>Where they live — and why you can't see them all</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              Service keys do not live at the Global Account level. They do not live at the sub-account level. They live inside specific service instances, inside specific Cloud Foundry spaces. To find every service key your organisation has issued, an admin must:
            </p>
            <ol style={{ color: "#475569", lineHeight: 1.9, paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Open each <strong style={{ color: "#0F172A" }}>Global Account</strong></li>
              <li>Open each <strong style={{ color: "#0F172A" }}>Sub-account</strong> within it (typically dozens, often more)</li>
              <li>Open the <strong style={{ color: "#0F172A" }}>Cloud Foundry environment</strong> for each sub-account</li>
              <li>Open each <strong style={{ color: "#0F172A" }}>CF Org</strong>, then each <strong style={{ color: "#0F172A" }}>CF Space</strong> (an enterprise can easily have hundreds of spaces)</li>
              <li>Open each <strong style={{ color: "#0F172A" }}>service instance</strong> in that space, and list its keys</li>
            </ol>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              The BTP cockpit does not aggregate this. The cockpit's user view does not show it. Standard access reviews do not surface it. In an enterprise BTP landscape with a hundred CF spaces, asking "show me every service key in production" is a multi-day exercise — and it relies on the admin remembering every space they have ever opened.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, margin: 0 }}>
              BTP xID does this in one screen. That is the gap it was built to close.
            </p>
          </section>

          {/* Section: Why this matters */}
          <section style={{ marginBottom: "48px", background: "#F8FAFC", borderRadius: "12px", padding: "32px", border: "1px solid #E2E8F0" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>The orphaned credential problem</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              When a developer leaves the company, their corporate identity is disabled. Their IAS account is removed. Their CF role assignments may eventually be cleaned up. But the service keys they created continue to authenticate against your HANA databases and bound services until someone explicitly deletes them.
            </p>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: 0 }}>
              The 2025 Verizon Data Breach Investigations Report attributes <strong style={{ color: "#0F172A" }}>22% of all breaches to stolen credentials</strong> as the initial access vector, and finds that <strong style={{ color: "#0F172A" }}>43% of cloud secrets exposed in public repositories are high-privilege, long-lived credentials</strong> — exactly the profile of a BTP service key. The examples below show what happens when those credentials are not tracked.
            </p>
          </section>

          {/* Section: Real-world examples */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px" }}>Six breaches caused by long-lived API credentials</h2>

            <BreachItem year="2017 (breach 2016)" title="Uber — AWS access key committed to GitHub" body="Attackers used a credential-spraying script against GitHub and found valid developer credentials at Uber. From a private repo they extracted an AWS access key, accessed an S3 bucket, and exfiltrated data on 57 million riders and 7 million drivers. The company paid the attackers $100,000 disguised as a bug bounty and concealed the breach for over a year. Final cost: $148 million multi-state settlement and the criminal conviction of the CSO for obstruction." source="https://techcrunch.com/2017/11/21/uber-data-breach-from-2016-affected-57-million-riders-and-drivers/" sourceLabel="TechCrunch" />

            <BreachItem year="2022" title="Toyota — hardcoded key public for five years" body="A subcontractor pushed source code containing a data-server access key to a public GitHub repository in December 2017. It went undiscovered until September 2022 — almost five years of public exposure. 296,019 customer email addresses and management numbers were potentially accessed during that window. Toyota could not rule out exfiltration because the key was live the entire time, with no monitoring." source="https://www.bleepingcomputer.com/news/security/toyota-discloses-data-leak-after-access-key-exposed-on-github/" sourceLabel="BleepingComputer" />

            <BreachItem year="2021" title="Codecov — supply-chain credential theft" body="Attackers exploited a flaw in Codecov's Docker image build process to extract the credential needed to modify the Bash Uploader script. They added one line that exfiltrated every CI environment variable — AWS keys, GitHub tokens, GCP service-account JSON — from every customer build to an attacker-controlled server. Undetected for two months. Codecov had roughly 29,000 customers; HashiCorp, Twilio, Rapid7 and Confluent publicly disclosed downstream compromises." source="https://about.codecov.io/apr-2021-post-mortem/" sourceLabel="Codecov post-mortem" />

            <BreachItem year="2023" title="Microsoft Storm-0558 — orphaned signing key" body="A Microsoft signing system crashed in April 2021. A race condition caused the cryptographic key material to be inadvertently included in the crash dump. The key was never rotated. Two years later, the Chinese threat actor Storm-0558 acquired it and used it to forge authentication tokens against Exchange Online, breaching approximately 25 organisations including the US Department of State (60,000 emails exfiltrated) and the Department of Commerce. The US Cyber Safety Review Board called the incident 'preventable' and demanded Microsoft overhaul its security culture." source="https://www.microsoft.com/en-us/security/blog/2023/07/14/analysis-of-storm-0558-techniques-for-unauthorized-email-access/" sourceLabel="Microsoft MSRC" />

            <BreachItem year="2023" title="Microsoft AI Research — 38 TB exposed via SAS token" body="Microsoft AI researchers published open-source training data on GitHub, sharing an Azure Storage SAS token alongside it. The token was misconfigured to grant full-control access to the entire storage account, not just the intended folder. It never expired. Discovered by Wiz researchers three years later, in June 2023. Exposed 38 TB of internal data: disk backups of two employees' workstations, 30,000+ internal Teams messages, private SSH and GPG keys, Microsoft service passwords, and Azure storage keys." source="https://www.wiz.io/blog/38-terabytes-of-private-data-accidentally-exposed-by-microsoft-ai-researchers" sourceLabel="Wiz Research" />

            <BreachItem year="2024" title="Sisense — secret store cascade" body="Attackers compromised Sisense's self-hosted GitLab instance, found a token in the repository, and used it to access a customer secret store on S3 containing access tokens, API keys, database passwords and TLS certificates for over 2,000 enterprise customers — including Verizon, Nasdaq and Air Canada. CISA issued a named-vendor advisory (April 11, 2024) urging every Sisense customer to rotate every credential they had ever exposed to the platform." source="https://www.cisa.gov/news-events/alerts/2024/04/11/compromise-sisense-customer-data" sourceLabel="CISA Advisory" />
          </section>

          {/* What BTP xID does */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>What BTP xID does about it</h2>
            <p style={{ color: "#475569", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP xID connects directly to the BTP and Cloud Foundry APIs and enumerates every service key in your landscape — across every Global Account, every Sub-account, every CF Org, every CF Space — into one screen.
            </p>
            <ul style={{ color: "#475569", lineHeight: 1.9, paddingLeft: "24px", marginBottom: "16px" }}>
              <li><strong style={{ color: "#0F172A" }}>See them all.</strong> One auditable view. Filter by sub-account, by service type, by space, by age.</li>
              <li><strong style={{ color: "#0F172A" }}>See what they contain.</strong> View the full credential JSON without re-navigating the cockpit.</li>
              <li><strong style={{ color: "#0F172A" }}>Revoke instantly.</strong> Delete keys directly through the CF V3 API. No manual per-space cleanup.</li>
              <li><strong style={{ color: "#0F172A" }}>Find the orphans.</strong> Cross-reference service keys with current users — surface keys whose creators are no longer with the company.</li>
            </ul>
            <p style={{ color: "#475569", lineHeight: 1.7, margin: 0 }}>
              That is the visibility your access reviews have been missing.
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

const codeStyle: React.CSSProperties = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  padding: "1px 6px",
  borderRadius: "4px",
  fontSize: "0.875em",
  color: "#0F172A",
  fontFamily: "'SF Mono', Monaco, monospace",
};

function BreachItem({ year, title, body, source, sourceLabel }: { year: string; title: string; body: string; source: string; sourceLabel: string }) {
  return (
    <div style={{ marginBottom: "24px", padding: "20px 24px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{year}</span>
        <h3 style={{ color: "#0F172A", fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>{title}</h3>
      </div>
      <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "0.9375rem", margin: "0 0 10px" }}>
        {body}
      </p>
      <p style={{ fontSize: "0.75rem", margin: 0 }}>
        Source: <a href={source} target="_blank" rel="noopener noreferrer" style={{ color: "#3A9A6A", textDecoration: "none" }}>{sourceLabel}</a>
      </p>
    </div>
  );
}
