import { useTranslation } from "react-i18next";
import usersImg from "@assets/btpxid-screenshot-users.png";

export default function BTPxIDShowcase() {
  const { t } = useTranslation();

  return (
    <section className="btpxid-showcase">
      <div className="btpxid-showcase-inner">
        <div className="btpxid-showcase-header">
          <div className="btpxid-features-label">{t('btpxidProduct.showcase.label')}</div>
          <h2 className="btpxid-showcase-title">
            {t('btpxidProduct.showcase.title1')}<br />
            {t('btpxidProduct.showcase.title2')}
          </h2>
          <p className="btpxid-showcase-sub">
            {t('btpxidProduct.showcase.subtitle')}
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
