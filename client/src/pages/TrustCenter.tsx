import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// English-only page, matching the Compliance/blog-page pattern — security
// and legal-adjacent text is kept verbatim-precise and is not machine-translated.
//
// Every factual claim on this page is backed by something verified directly
// against the running code/infrastructure, not marketing language:
//   - The "nothing stored" architecture claims come from the actual
//     BTPxID server session-cookie implementation
//     (server/src/btp/session-cookie.ts, server/src/cf/cf-session-cookie.ts).
//   - The Snyk rows are real Snyk CLI results run against the current
//     state of each repo on 2026-10-01 — not illustrative placeholders.
//   - The Semgrep, OWASP ZAP and Dependabot rows come from the internal
//     compliance program's controls register (github.com/terrabt-pty/Compliance,
//     CONTROLS.md rows 5.4, 7.1, 7.2, 8.4), and the npm audit row from the
//     license platform's infra-hardening log (P3-T17). Those sources record
//     the outcome but not finding counts, so none are shown. Add counts or
//     exact dates here only from a real re-run.
//   - The SOC 2 line describes the actual, current state of the internal
//     compliance program (github.com/terrabt-pty/Compliance): governance,
//     risk assessment, and most control domains done; third-party audit
//     engagement not yet started. Do not change this to "certified" or
//     "complete" without that actually being true.

interface ScanRow {
  scope: string;
  tool: string;
  date: string;
  issuesFound: string;
  status: string;
}

const SCAN_ROWS: ScanRow[] = [
  {
    scope: "BTP xID — client + server (all dependencies)",
    tool: "Snyk (dependency vulnerability scan)",
    date: "2026-10-01",
    issuesFound: "0",
    status: "Clean",
  },
  {
    scope: "TerraBT License Platform — client + server + worker",
    tool: "Snyk (dependency vulnerability scan)",
    date: "2026-10-01",
    issuesFound: "0",
    status: "Clean",
  },
  {
    scope: "TerraBT website",
    tool: "Snyk (dependency vulnerability scan)",
    date: "2026-10-01",
    issuesFound: "3 (1 High, 2 Medium — transitive, via a charting library's lodash dependency)",
    status: "Fix identified (library upgrade); scheduled, not yet applied",
  },
  {
    scope: "TerraBT product source code",
    tool: "Semgrep (open-source static analysis, including a check for committed secrets)",
    date: "Q3 2026",
    issuesFound: "Findings were remediated; no committed secrets found",
    status: "Resolved. Self-performed; not yet an automated CI gate",
  },
  {
    scope: "TerraBT test and production environments (web applications)",
    tool: "OWASP ZAP (open-source dynamic scan, full active scan)",
    date: "Q3 2026",
    issuesFound: "Findings were resolved down to warning-level only",
    status: "Resolved. Self-performed; to be repeated on a defined schedule",
  },
  {
    scope: "BTP xID and TerraBT License Platform repositories",
    tool: "GitHub Dependabot (continuous alerts and automatic security fix pull requests)",
    date: "Q3 2026 (enabled)",
    issuesFound: "Ongoing: alerts are raised as new advisories are published",
    status: "Enabled on both product repositories",
  },
  {
    scope: "TerraBT License Platform — server + client",
    tool: "npm audit (open-source package advisory check)",
    date: "2026-04-17",
    issuesFound: "0 critical or high; one moderate issue fixed",
    status: "Clean at the time of the run (Snyk re-scan above is more recent)",
  },
  {
    scope: "Independent third-party penetration test",
    tool: "—",
    date: "—",
    issuesFound: "Not yet performed",
    status: "Planned as part of the SOC 2 program",
  },
];

const cellHead: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 14px",
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#475569",
  background: "#F8FAFC",
  borderBottom: "1px solid #E2E8F0",
  verticalAlign: "top",
};

const cellBody: React.CSSProperties = {
  padding: "14px",
  fontSize: "0.9rem",
  lineHeight: 1.6,
  color: "#334155",
  borderBottom: "1px solid #E2E8F0",
  verticalAlign: "top",
};

const factCard: React.CSSProperties = {
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  padding: "20px 24px",
  background: "#F8FAFC",
};

export default function TrustCenter() {
  return (
    <>
      <SEOHead
        title="Trust Center: Security, Data Handling & SOC 2 Status | TerraBT"
        description="How TerraBT handles your SAP BTP credentials and session data, real security test results, and current SOC 2 compliance program status."
        path="/trust"
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navigation />
        <article style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Eyebrow */}
          <p style={{ color: "#3A9A6A", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Trust Center
          </p>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Security & Data Handling
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "40px" }}>
            BTP xID connects to your own SAP BTP and Cloud Foundry environment. The question we hear
            most from new customers is simple: can TerraBT see, keep, or lose our credentials? Here is
            the honest answer, with the specifics behind it.
          </p>

          {/* Core fact */}
          <section style={{ marginBottom: "48px" }}>
            <div style={factCard}>
              <h2 style={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
                We do not store your BTP credentials, sessions, or tokens on our servers.
              </h2>
              <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.75, marginBottom: "12px" }}>
                When you sign in to a BTP global account or a Cloud Foundry org through BTP xID, the
                resulting session token is encrypted and written only into a browser cookie — scoped to
                that one region, httpOnly so client-side scripts can never read it, with no persistent
                expiry. Our server decrypts it only for the duration of the single request it's handling,
                and never writes it to a database, a log file, or disk.
              </p>
              <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.75, marginBottom: "12px" }}>
                There is no server-side session store. If our server restarts, every session ends and
                every user has to sign back in — that's a deliberate trade-off, not an oversight: it
                means there is nothing sitting in our infrastructure for an attacker to steal, because
                the credential was never kept anywhere but your own browser's cookie jar in the first
                place.
              </p>
              <p style={{ color: "#334155", fontSize: "1rem", lineHeight: 1.75 }}>
                The same applies to the governance data BTP xID adds to your service keys and users
                (owner, purpose, expiry, rotation history): it's written directly into your own Cloud
                Foundry environment's resource metadata, in your account, not duplicated into a
                TerraBT-owned database.
              </p>
            </div>
          </section>

          {/* Scan results table */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.375rem", fontWeight: 700, marginBottom: "10px" }}>
              Security Testing
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px" }}>
              Real results, not a claim of a clean bill of health we can't back up. This table is
              updated as scans are re-run; it is not a one-time snapshot left to go stale.
            </p>
            <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
              <table style={{ width: "100%", minWidth: "720px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...cellHead, width: "28%" }}>Scope</th>
                    <th style={{ ...cellHead, width: "18%" }}>Test</th>
                    <th style={{ ...cellHead, width: "12%" }}>Date</th>
                    <th style={{ ...cellHead, width: "22%" }}>Issues Found</th>
                    <th style={{ ...cellHead, width: "20%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SCAN_ROWS.map((row) => (
                    <tr key={row.scope}>
                      <td style={{ ...cellBody, fontWeight: 600, color: "#0F172A" }}>{row.scope}</td>
                      <td style={cellBody}>{row.tool}</td>
                      <td style={cellBody}>{row.date}</td>
                      <td style={cellBody}>{row.issuesFound}</td>
                      <td style={cellBody}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "16px" }}>
              Dependency scanning covers known vulnerabilities in third-party packages, Semgrep reviews
              our own code, and ZAP probes the running applications. All of this testing was performed
              by TerraBT itself, so it does not replace an independent penetration test, which is listed
              above as a planned, not-yet-complete step.
            </p>
          </section>

          {/* SOC 2 status */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.375rem", fontWeight: 700, marginBottom: "10px" }}>
              SOC 2 — Program In Progress
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "12px" }}>
              TerraBT is actively building toward SOC 2 Type I certification. Governance ownership, a
              structured risk assessment, an asset inventory, and the majority of required control
              domains (access control, encryption, incident response planning, vendor risk, and more)
              are in place internally. What remains before certification is real: an independent
              penetration test and the formal audit engagement itself with a licensed CPA firm — neither
              has started yet.
            </p>
            <p style={{ color: "#64748B", fontSize: "0.9375rem", lineHeight: 1.7 }}>
              We won't claim "SOC 2 compliant" or "certified" until an accredited auditor has actually
              issued that report — only they can make that call. If you need specifics on which controls
              map to which SOC 2 criteria, see the{" "}
              <a
                href="/products/btp-xid/compliance"
                style={{ color: "#3A9A6A", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                BTP xID compliance control mapping
              </a>{" "}
              page.
            </p>
          </section>

          {/* Closing CTA */}
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "32px" }}>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
              Questions about any of this — architecture, a specific control, or anything above — are
              welcome. Contact us through the usual channels and we'll answer directly, not with a canned
              security FAQ.
            </p>
            <a
              href="/"
              style={{ color: "#3A9A6A", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              ← Back to TerraBT
            </a>
            <p style={{ color: "#94A3B8", fontSize: "0.8125rem", marginTop: "20px" }}>
              TerraBT Pty Ltd · ABN 56 692 065 222
            </p>
            <p style={{ color: "#94A3B8", fontSize: "0.8125rem" }}>
              Built in Australia with ❤️
            </p>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
