import { useTranslation } from "react-i18next";
import { Globe2, Users, Search, Wrench, Layers, KeyRound } from "lucide-react";
import type { LucideProps } from "lucide-react";

type FeatureConfig = {
  Icon: React.ComponentType<LucideProps>;
  colorClass: string;
  stroke: string;
};

const FEATURES: FeatureConfig[] = [
  { Icon: Globe2,    colorClass: "btpxid-fi-green", stroke: "#4CAF50" },
  { Icon: Users,     colorClass: "btpxid-fi-blue",  stroke: "#3B7FD4" },
  { Icon: Search,    colorClass: "btpxid-fi-teal",  stroke: "#2A9099" },
  { Icon: Wrench,    colorClass: "btpxid-fi-green", stroke: "#4CAF50" },
  { Icon: Layers,    colorClass: "btpxid-fi-blue",  stroke: "#3B7FD4" },
  { Icon: KeyRound,  colorClass: "btpxid-fi-teal",  stroke: "#2A9099" },
];

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
        {FEATURES.map(({ Icon, colorClass, stroke }, i) => (
          <div key={i} className="btpxid-feature-card">
            <div className={`btpxid-feature-icon ${colorClass}`}>
              <Icon size={20} strokeWidth={1.5} stroke={stroke} fill="none" />
            </div>
            <h3>{t(`btpxidProduct.features.${i}.title`)}</h3>
            <p>{t(`btpxidProduct.features.${i}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
