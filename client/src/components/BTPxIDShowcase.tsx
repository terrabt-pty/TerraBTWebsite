import usersImg from "@assets/btpxid-screenshot-users.png";

export default function BTPxIDShowcase() {
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
            The only desktop app purpose-built for SAP BTP user management —
            view every user across global accounts, sub-accounts, CF orgs, and CF spaces in one unified list.
          </p>
        </div>

        {/* Screenshot */}
        <div className="btpxid-screenshot-wrap">
          <img
            src={usersImg}
            alt="BTP xID — User Management"
            className="btpxid-screenshot"
          />
        </div>
      </div>
    </section>
  );
}
