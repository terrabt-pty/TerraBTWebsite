import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import userListImg from "@assets/BTP_xID_User_List_1772336098799.png";
import dashboardImg from "@assets/BTP_xID_Dashboard_1772336098798.png";
import connectionsImg from "@assets/BTP_xID_Connections_1772336098798.png";
import securityInsightsImg from "@assets/SecurityInsightsScreenshot.png";
import credentialDetailImg from "@assets/CredentialDetailScreenshot.png";

// Screenshots the banner preview rotates through, so the homepage shows more of
// the app than a single static image.
const SCREENSHOTS = [userListImg, dashboardImg, connectionsImg, securityInsightsImg, credentialDetailImg];
const ROTATE_INTERVAL_MS = 3500;

export default function BTPxIDAnnouncement() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Respect users who prefer reduced motion — leave the first screenshot in place.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % SCREENSHOTS.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Link
      href={getLocalizedPath("/products/btp-xid")}
      className="btpxid-announce block"
    >
      {/* Confetti particles */}
      <div className="btpxid-confetti" aria-hidden="true">
        <span className="btpxid-particle btpxid-p1" />
        <span className="btpxid-particle btpxid-p2" />
        <span className="btpxid-particle btpxid-p3" />
        <span className="btpxid-particle btpxid-p4" />
        <span className="btpxid-particle btpxid-p5" />
        <span className="btpxid-particle btpxid-p6" />
        <span className="btpxid-particle btpxid-p7" />
        <span className="btpxid-particle btpxid-p8" />
        <span className="btpxid-particle btpxid-p9" />
        <span className="btpxid-particle btpxid-p10" />
        <span className="btpxid-particle btpxid-p11" />
        <span className="btpxid-particle btpxid-p12" />
      </div>

      <div className="btpxid-announce-inner">
        <div className="btpxid-announce-content">
          <div className="btpxid-announce-new-badge">
            <Sparkles className="h-3 w-3" />
            <span>{t('btpxidAnnouncement.badge')}</span>
          </div>

          <div className="btpxid-announce-text">
            <h2 className="btpxid-announce-title">
              {t('btpxidAnnouncement.introducing')}{" "}
              <span className="btpxid-announce-brand btpxid-shimmer">
                BTP{" "}
                <span className="btpxid-x">x</span>
                <span className="btpxid-id">ID</span>
              </span>
            </h2>
            <p className="btpxid-announce-desc">
              {t('btpxidAnnouncement.description')}
            </p>
          </div>

          <div className="btpxid-announce-cta">
            <Sparkles className="h-4 w-4" />
            <span>{t('btpxidAnnouncement.cta')}</span>
            <ArrowRight className="h-4 w-4 btpxid-arrow-bounce" />
          </div>
        </div>

        <div className="btpxid-announce-preview">
          <div className="btpxid-announce-carousel" aria-hidden="true">
            {SCREENSHOTS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={t('btpxidAnnouncement.imageAlt')}
                className={`btpxid-announce-carousel-img${i === activeIndex ? " is-active" : ""}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
