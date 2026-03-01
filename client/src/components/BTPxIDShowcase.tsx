import { useState } from "react";
import dashboardImg from "@assets/btpxid-screenshot-dashboard.png";
import usersImg from "@assets/btpxid-screenshot-users.png";
import connectionsImg from "@assets/btpxid-screenshot-connections.png";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "See all your global accounts, sub-accounts, and Cloud Foundry environments at a glance.",
    image: dashboardImg,
  },
  {
    id: "users",
    label: "User Management",
    description: "View every user across all scopes — global accounts, sub-accounts, CF orgs, and CF spaces — in one unified list.",
    image: usersImg,
  },
  {
    id: "connections",
    label: "Connections",
    description: "Connect multiple SAP BTP global accounts and manage Cloud Foundry environments from a single interface.",
    image: connectionsImg,
  },
];

export default function BTPxIDShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const activeItem = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <section className="btpxid-showcase">
      <div className="btpxid-showcase-inner">
        <div className="btpxid-showcase-header">
          <div className="btpxid-features-label">See It In Action</div>
          <h2 className="btpxid-showcase-title">
            Built for SAP BTP admins.<br />
            By SAP BTP experts.
          </h2>
          <p className="btpxid-showcase-sub">
            The only desktop app purpose-built for SAP BTP user management. Dark sidebar, clean interface, zero cockpit tabs.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="btpxid-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btpxid-tab ${activeTab === tab.id ? "btpxid-tab-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="btpxid-showcase-desc">{activeItem.description}</p>

        {/* Screenshot */}
        <div className="btpxid-screenshot-wrap">
          <img
            src={activeItem.image}
            alt={`BTP xID — ${activeItem.label}`}
            className="btpxid-screenshot"
          />
        </div>
      </div>
    </section>
  );
}
