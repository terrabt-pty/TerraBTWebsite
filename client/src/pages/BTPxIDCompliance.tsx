import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

// English-only page, matching the blog-page pattern. Compliance clause text is
// kept verbatim-precise and is not machine-translated.

interface MappingRow {
  control: string;
  requires: string;
  btpNative: string;
  xidAdds: string;
}

interface StandardSection {
  id: string;
  name: string;
  intro: string;
  rows: MappingRow[];
}

const STANDARDS: StandardSection[] = [
  {
    id: "sox",
    name: "Sarbanes-Oxley (SOX) — IT General Controls",
    intro:
      "SOX ITGC audits cover systems that affect financial reporting. Where SAP BTP integrations reach financial data, the service keys granting that access fall under user access management and change management controls.",
    rows: [
      {
        control: "User access management (ITGC)",
        requires:
          "Access to systems affecting financial reporting must be authorized, reviewed periodically, and removed or adjusted when people leave or change roles.",
        btpNative:
          "Service keys have no owner field, there is no cross-account view of who holds access, and keys created by a user remain valid after that user is removed.",
        xidAdds:
          "An owner is recorded on every credential. One view shows users and credentials across all global accounts, subaccounts, and Cloud Foundry orgs and spaces. When a person leaves, their credentials can be found by owner, rotated, and reassigned.",
      },
      {
        control: "Change management (ITGC)",
        requires:
          "Changes to production access paths must be traceable to a purpose and a responsible party.",
        btpNative:
          "A key can be created in any subaccount or Cloud Foundry space with no record of what it is for or who is responsible for it.",
        xidAdds:
          "Purpose and responsible party are recorded with each credential and are visible centrally.",
      },
    ],
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022 — Annex A",
    intro:
      "ISO 27001 covers access control, asset management, and cryptography. Three Annex A controls are directly affected by how SAP BTP handles service keys.",
    rows: [
      {
        control: "A.5.15 — Access control",
        requires:
          "Access to information and associated assets must be restricted based on business and security requirements, and must be reviewable.",
        btpNative:
          "Keys do not expire and carry no owner or purpose metadata, so the access they grant cannot be justified against a business requirement or reviewed against one.",
        xidAdds:
          "Owner, purpose, and expiry are recorded per credential, making an access review against business need possible.",
      },
      {
        control: "A.8.20 — Networks security",
        requires:
          "Networks and network services must be secured, managed, and controlled to protect data in transit.",
        btpNative:
          "A service key grants direct API access that can bypass gateway-level controls such as source-IP restrictions, and BTP offers no inventory of which keys exist where.",
        xidAdds:
          "BTP xID is not a gateway and does not add network controls itself. It provides the credential inventory across all accounts, so you know which keys exist and can identify the ones bypassing your network controls.",
      },
      {
        control: "A.8.24 — Use of cryptography",
        requires:
          "Cryptographic keys and secrets must be managed through their full lifecycle, including rotation, regeneration, and retirement.",
        btpNative:
          "There is no expiration, no built-in rotation function, and no record of when a key was last changed.",
        xidAdds:
          "Expiry dates, one-click rotation, and a last-rotated record on every credential.",
      },
    ],
  },
  {
    id: "nist80053",
    name: "NIST SP 800-53 — Access Control & Identification",
    intro:
      "NIST SP 800-53 is the reference control catalog for US federal systems and widely adopted in large enterprises. The Identification and Authentication (IA) and Access Control (AC) families apply to non-human accounts such as service keys.",
    rows: [
      {
        control: "IA-4 — Identifier management",
        requires:
          "Non-human system accounts must be uniquely identified and managed like any other account.",
        btpNative:
          "A service key carries no metadata identifying its owner, its function, or the system that uses it.",
        xidAdds:
          "Owner, purpose, and consuming-system metadata on every credential, so each key is an identifiable, accountable system account.",
      },
      {
        control: "IA-5 — Authenticator management",
        requires:
          "Authenticators must be changed or refreshed at defined intervals, and when personnel with access to them leave.",
        btpNative:
          "Keys are static and never expire. Nothing enforces or records a refresh.",
        xidAdds:
          "Expiry dates define the interval, rotation runs in one click, and the rotation record proves it happened.",
      },
      {
        control: "AC-2 — Account management",
        requires:
          "Accounts must be created under control and audited regularly.",
        btpNative:
          "Cloud Foundry space-level permissions allow key creation independently of subaccount administrators, outside the view of centralized IAM teams.",
        xidAdds:
          "Every credential in every org and space appears in one central view, regardless of where it was created.",
      },
    ],
  },
  {
    id: "pcidss",
    name: "PCI DSS 4.0 — Requirement 8",
    intro:
      "If integration flows process, store, or transmit cardholder data — for example an e-commerce integration connecting to an SAP backend — the service keys on that path fall under PCI DSS requirement 8.",
    rows: [
      {
        control: "8.3.10.1 — Secret change interval",
        requires:
          "Passwords and secrets must be changed at least every 90 days, or the system must use dynamic authentication.",
        btpNative:
          "Service keys are static and non-expiring. Nothing enforces a change interval and nothing records whether one was followed.",
        xidAdds:
          "Expiry dates and rotation records make a 90-day cycle definable, executable, and auditable.",
      },
      {
        control: "8.6 — System and application accounts",
        requires:
          "System-to-system credentials must be tightly controlled, assigned to specific owners, and reviewed regularly.",
        btpNative:
          "There is no owner assignment and no review view across accounts.",
        xidAdds:
          "Owner assignment on every credential and a cross-account view for periodic review.",
      },
    ],
  },
  {
    id: "soc2",
    name: "SOC 2 Type II — Trust Services Criteria",
    intro:
      "A SOC 2 Type II audit verifies operational effectiveness of controls over a 6-to-12-month period. Two criteria groups are directly affected by service key handling.",
    rows: [
      {
        control: "CC6.1 / CC6.2 — Logical access",
        requires:
          "Logical access is provisioned and removed under control. Departed personnel must not retain access.",
        btpNative:
          "Keys created by a departed user keep working, and no record links people to the keys they created or had access to.",
        xidAdds:
          "Owner metadata links every key to an accountable person. A leaver event becomes a query by owner, followed by rotation and reassignment.",
      },
      {
        control: "CC7.1 — Monitoring of controls",
        requires:
          "Infrastructure and access paths must be monitored so that new or changed access points are visible to the control environment.",
        btpNative:
          "A Cloud Foundry Space Developer can create a new access point — a service key — without any centralized visibility or link to a change request.",
        xidAdds:
          "Every credential in every org and space is visible in one central view, so keys created anywhere in the landscape no longer sit outside review.",
      },
    ],
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

export default function BTPxIDCompliance() {
  return (
    <>
      <SEOHead
        title="SAP BTP Service Keys: Compliance Control Mapping — ISO 27001, SOC 2, PCI DSS, NIST 800-53, SOX | TerraBT"
        description="Control-by-control mapping of SAP BTP service key gaps to ISO/IEC 27001:2022 (A.5.15, A.8.20, A.8.24), NIST SP 800-53 (IA-4, IA-5, AC-2), PCI DSS 4.0 (8.3.10.1, 8.6), SOC 2 (CC6.1, CC6.2, CC7.1), and SOX ITGC — and what BTP xID adds for each."
        path="/products/btp-xid/compliance"
      />
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navigation />
        <article style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px" }}>
            <a
              href="/products/btp-xid"
              style={{ color: "#3A9A6A", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              ← Back to BTP xID
            </a>
          </nav>

          {/* Eyebrow */}
          <p style={{ color: "#3A9A6A", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Compliance Mapping
          </p>

          {/* Title */}
          <h1 style={{ color: "#0F172A", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            SAP BTP Service Keys: Control-by-Control Compliance Mapping
          </h1>

          {/* Lead */}
          <p style={{ color: "#475569", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "24px" }}>
            SAP BTP service keys have no owner field, no expiration date, no purpose field, no record
            of the consuming system, and no rotation history. This page maps those facts to the specific
            controls they affect in ISO/IEC 27001:2022, NIST SP 800-53, PCI DSS 4.0, SOC 2, and SOX ITGC —
            and states what BTP xID adds for each.
          </p>
          <p style={{ color: "#64748B", fontSize: "0.9375rem", lineHeight: 1.7, marginBottom: "48px", borderBottom: "1px solid #E2E8F0", paddingBottom: "32px" }}>
            BTP xID is not a certification and does not make a landscape compliant by itself. It provides
            the records these frameworks require you to demonstrate: owner, purpose, expiry, rotation
            history, and cross-account visibility of users and credentials.
          </p>

          {STANDARDS.map((std) => (
            <section key={std.id} id={std.id} style={{ marginBottom: "56px" }}>
              <h2 style={{ color: "#0F172A", fontSize: "1.375rem", fontWeight: 700, marginBottom: "10px" }}>
                {std.name}
              </h2>
              <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px" }}>
                {std.intro}
              </p>
              <div style={{ overflowX: "auto", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                <table style={{ width: "100%", minWidth: "720px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ ...cellHead, width: "20%" }}>Control</th>
                      <th style={{ ...cellHead, width: "27%" }}>What it requires</th>
                      <th style={{ ...cellHead, width: "26%" }}>What SAP BTP provides natively</th>
                      <th style={{ ...cellHead, width: "27%" }}>What BTP xID adds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {std.rows.map((row) => (
                      <tr key={row.control}>
                        <td style={{ ...cellBody, fontWeight: 600, color: "#0F172A" }}>{row.control}</td>
                        <td style={cellBody}>{row.requires}</td>
                        <td style={cellBody}>{row.btpNative}</td>
                        <td style={cellBody}>{row.xidAdds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* Closing CTA */}
          <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "32px" }}>
            <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.7, marginBottom: "16px" }}>
              BTP xID runs against your existing landscape. Governance metadata is stored on the
              credential itself, in your own accounts.
            </p>
            <a
              href="/products/btp-xid"
              style={{ color: "#3A9A6A", fontSize: "0.9375rem", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Learn more about BTP xID →
            </a>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}
