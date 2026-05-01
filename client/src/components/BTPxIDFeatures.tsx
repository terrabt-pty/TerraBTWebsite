import { useTranslation } from "react-i18next";

const FEATURE_ICONS = ["🌐", "👤", "🔍", "⚙️", "🛡️", "🔐"];
const FEATURE_COLORS = ["btpxid-fi-green", "btpxid-fi-blue", "btpxid-fi-teal", "btpxid-fi-green", "btpxid-fi-blue", "btpxid-fi-teal"];

export default function BTPxIDFeatures() {
  const { t } = useTranslation();

  return (
    <section className="btpxid-features" id="features">
      <div className="btpxid-features-header">
        <div className="btpxid-features-label">{t('btpxidProduct.features.label')}</div>
        <h2 className="btpxid-features-title">
          {t('btpxidProduct.features.title1')}
          <br />
          {t('btpxidProduct.features.title2')}
        </h2>
        <p className="btpxid-features-sub">
          {t('btpxidProduct.features.subtitle')}
        </p>
      </div>

      <div className="btpxid-features-grid">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="btpxid-feature-card">
            <div className={`btpxid-feature-icon ${FEATURE_COLORS[i]}`}>
              {FEATURE_ICONS[i]}
            </div>
            <h3>{t(`btpxidProduct.features.${i}.title`)}</h3>
            <p>{t(`btpxidProduct.features.${i}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
