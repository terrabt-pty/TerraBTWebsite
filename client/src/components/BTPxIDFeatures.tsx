export default function BTPxIDFeatures() {
  const features = [
    {
      icon: "🌐",
      colorClass: "btpxid-fi-green",
      title: "Multi-Global Account",
      description:
        "Connect and manage multiple global accounts simultaneously. No more switching between cockpits.",
    },
    {
      icon: "👤",
      colorClass: "btpxid-fi-blue",
      title: "Unified User View",
      description:
        "See every user across sub-accounts, CF orgs, CF spaces, and service users — all in one screen.",
    },
    {
      icon: "🔍",
      colorClass: "btpxid-fi-teal",
      title: "Reverse Search",
      description:
        "Find any user and instantly see everywhere they're added. No more guesswork.",
    },
    {
      icon: "⚙️",
      colorClass: "btpxid-fi-green",
      title: "Service User Management",
      description:
        "Manage service users alongside platform users. Full lifecycle control from one place.",
    },
    {
      icon: "🛡️",
      colorClass: "btpxid-fi-blue",
      title: "Bulk Operations",
      description:
        "Add, remove, or update users across multiple accounts and spaces in a single action.",
    },
    {
      icon: "📊",
      colorClass: "btpxid-fi-teal",
      title: "Audit & Compliance",
      description:
        "Complete visibility into who has access to what. Export reports for compliance reviews.",
    },
  ];

  return (
    <section className="btpxid-features" id="features">
      <div className="btpxid-features-header">
        <div className="btpxid-features-label">Capabilities</div>
        <h2 className="btpxid-features-title">
          Everything you need.
          <br />
          Nothing you don't.
        </h2>
        <p className="btpxid-features-sub">
          Built by SAP BTP experts who were tired of juggling cockpit tabs.
        </p>
      </div>

      <div className="btpxid-features-grid">
        {features.map((feature) => (
          <div key={feature.title} className="btpxid-feature-card">
            <div className={`btpxid-feature-icon ${feature.colorClass}`}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
