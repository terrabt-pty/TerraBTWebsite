import { CheckCircle, Circle } from "lucide-react";
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

type StatusTone = "complete" | "planned";

interface ScanRow {
  scope: string;
  tool: string;
  date: string;
  issuesFound: string;
  status: string;
  tone: StatusTone;
}

const SCAN_ROWS: ScanRow[] = [
  {
    scope: "BTP xID, client and server (all dependencies)",
    tool: "Snyk (dependency vulnerability scan)",
    date: "2026-10-01",
    issuesFound: "0",
    status: "Clean",
    tone: "complete",
  },
  {
    scope: "TerraBT License Platform, client, server and worker",
    tool: "Snyk (dependency vulnerability scan)",
    date: "2026-10-01",
    issuesFound: "0",
    status: "Clean",
    tone: "complete",
  },
  {
    scope: "TerraBT product source code",
    tool: "Semgrep (open-source static analysis, including a check for committed secrets)",
    date: "Q3 2026",
    issuesFound: "Findings were remediated. No committed secrets found.",
    status: "Resolved. Self-performed. Not yet an automated CI gate.",
    tone: "complete",
  },
  {
    scope: "TerraBT test and production environments (web applications)",
    tool: "OWASP ZAP (open-source dynamic scan, full active scan)",
    date: "Q3 2026",
    issuesFound: "Findings were resolved down to warning-level only.",
    status: "Resolved. Self-performed. To be repeated on a defined schedule.",
    tone: "complete",
  },
  {
    scope: "BTP xID and TerraBT License Platform repositories",
    tool: "GitHub Dependabot (continuous alerts and automatic security fix pull requests)",
    date: "Q3 2026 (enabled)",
    issuesFound: "Ongoing. Alerts are raised as new advisories are published.",
    status: "Enabled on both product repositories",
    tone: "complete",
  },
  {
    scope: "TerraBT License Platform, server and client",
    tool: "npm audit (open-source package advisory check)",
    date: "2026-04-17",
    issuesFound: "0 critical or high. One moderate issue fixed.",
    status: "Clean at the time of the run. The Snyk re-scan above is more recent.",
    tone: "complete",
  },
  {
    scope: "Independent third-party penetration test",
    tool: "—",
    date: "—",
    issuesFound: "Not yet performed",
    status: "Planned as part of the SOC 2 program",
    tone: "planned",
  },
];

const cellHead: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 14px",
  fontSize: "0.8125rem",
  fontWeight: 700,
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

const prose: React.CSSProperties = {
  color: "#334155",
  fontSize: "1rem",
  lineHeight: 1.75,
};

function StatusBadge({ status, tone }: { status: string; tone: StatusTone }) {
  const isComplete = tone === "complete";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: "8px",
        color: isComplete ? "#166534" : "#475569",
        background: isComplete ? "#ECFDF5" : "#F8FAFC",
        border: isComplete ? "1px solid #86EFAC" : "1px solid #E2E8F0",
        borderRadius: "9999px",
        padding: "4px 10px",
        fontSize: "0.8125rem",
        fontWeight: 600,
        lineHeight: 1.45,
      }}
    >
      {isComplete ? (
        <CheckCircle
          aria-hidden="true"
          style={{ width: 14, height: 14, marginTop: 2, flexShrink: 0, color: "#16A34A" }}
        />
      ) : (
        <Circle
          aria-hidden="true"
          style={{ width: 14, height: 14, marginTop: 2, flexShrink: 0, color: "#94A3B8" }}
        />
      )}
      {status}
    </span>
  );
}

export default function TrustCenter() {
  return (
    <>
      <SEOHead
        title="Trust Center: Security, Data Handling and SOC 2 Status | TerraBT"
        description="How TerraBT handles SAP BTP credentials and session data, security test results, and the current status of the SOC 2 program."
        path="/trust"
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navigation />
        <article style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
          <p style={{ color: "#3A9A6A", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.04em", marginBottom: "12px" }}>
            Trust Center
          </p>

          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Security and Data Handling
          </h1>

          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "40px" }}>
            BTP xID connects to the customer&apos;s SAP BTP and Cloud Foundry environment. This page
            describes how TerraBT handles BTP credentials and session data, the security tests that
            have been run, and the current status of the SOC 2 program.
          </p>

          <section style={{ marginBottom: "48px" }}>
            <div style={factCard}>
              <h2 style={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
                BTP Credentials and Session Data
              </h2>
              <p style={{ ...prose, marginBottom: "12px" }}>
                TerraBT does not store BTP credentials, sessions, or tokens on its servers.
              </p>
              <p style={{ ...prose, marginBottom: "12px" }}>
                When a user signs in to a BTP Global Account or a Cloud Foundry organisation through
                BTP xID, the session token is encrypted and written to a browser cookie. The cookie is
                scoped to that region, marked httpOnly so that client-side scripts cannot read it, and
                has no persistent expiry. The TerraBT server decrypts the token only for the duration of
                the request being handled. The token is held in memory for that request only.
              </p>
              <p style={{ ...prose, marginBottom: "12px" }}>
                There is no server-side session store. If the TerraBT server restarts, every session
                ends and users sign in again. The credential remains in the user&apos;s browser cookie
                jar.
              </p>
              <p style={prose}>
                Governance data that BTP xID adds to service keys and users (owner, purpose, expiry,
                rotation history) is written into the customer&apos;s Cloud Foundry resource metadata,
                in that customer&apos;s account.
              </p>
            </div>
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.375rem", fontWeight: 700, marginBottom: "10px" }}>
              Security Testing
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px" }}>
              The table below records security tests that have been run against TerraBT products and
              environments. It is updated when scans are repeated.
            </p>
            <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
              <table style={{ width: "100%", minWidth: "720px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...cellHead, width: "26%" }}>Scope</th>
                    <th style={{ ...cellHead, width: "16%" }}>Test</th>
                    <th style={{ ...cellHead, width: "12%" }}>Date</th>
                    <th style={{ ...cellHead, width: "20%" }}>Issues Found</th>
                    <th style={{ ...cellHead, width: "26%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SCAN_ROWS.map((row) => (
                    <tr key={row.scope}>
                      <td style={{ ...cellBody, fontWeight: 600, color: "#0F172A" }}>{row.scope}</td>
                      <td style={cellBody}>{row.tool}</td>
                      <td style={cellBody}>{row.date}</td>
                      <td style={cellBody}>{row.issuesFound}</td>
                      <td style={cellBody}>
                        <StatusBadge status={row.status} tone={row.tone} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: "#64748B", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "16px" }}>
              Snyk and npm audit inspect third-party packages. Semgrep reviews TerraBT source code.
              OWASP ZAP tests the running web applications. These tests were performed by TerraBT. An
              independent third-party penetration test has not been completed.
            </p>
          </section>

          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ color: "#0F172A", fontSize: "1.375rem", fontWeight: 700, marginBottom: "10px" }}>
              SOC 2 Type I Program Status
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "12px" }}>
              TerraBT is working toward SOC 2 Type I certification. Governance ownership, a structured
              risk assessment, an asset inventory, and most required control domains (access control,
              encryption, incident response planning, and vendor risk) are in place internally. Two
              items remain before certification: an independent penetration test, and a formal audit
              engagement with a licensed CPA firm. Neither has started.
            </p>
            <p style={{ color: "#64748B", fontSize: "0.9375rem", lineHeight: 1.7 }}>
              TerraBT will describe itself as SOC 2 certified only after an accredited auditor issues
              that report. Control-to-criteria mapping is on the{" "}
              <a
                href="/products/btp-xid/compliance"
                style={{ color: "#3A9A6A", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                BTP xID compliance page
              </a>
              .
            </p>
          </section>

          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "32px" }}>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
              Questions about architecture, a specific control, or the material on this page may be
              sent through the usual contact channels.
            </p>
            <a
              href="/"
              style={{ color: "#3A9A6A", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Back to TerraBT
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
