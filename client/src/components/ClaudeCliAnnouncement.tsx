import { Link } from "wouter";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function ClaudeCliAnnouncement() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <Link
      href={getLocalizedPath("/products/claude-cli")}
      className="ccv-announce block"
    >
      {/* Confetti particles */}
      <div className="ccv-confetti" aria-hidden="true">
        <span className="ccv-particle ccv-p1" />
        <span className="ccv-particle ccv-p2" />
        <span className="ccv-particle ccv-p3" />
        <span className="ccv-particle ccv-p4" />
        <span className="ccv-particle ccv-p5" />
        <span className="ccv-particle ccv-p6" />
        <span className="ccv-particle ccv-p7" />
        <span className="ccv-particle ccv-p8" />
        <span className="ccv-particle ccv-p9" />
        <span className="ccv-particle ccv-p10" />
        <span className="ccv-particle ccv-p11" />
        <span className="ccv-particle ccv-p12" />
      </div>

      <div className="ccv-announce-inner">
        <div className="ccv-announce-content">
          <div className="ccv-announce-new-badge">
            <Sparkles className="h-3 w-3" />
            <span>{t('claudeCliAnnouncement.badge')}</span>
          </div>

          <div className="ccv-announce-text">
            <h2 className="ccv-announce-title">
              {t('claudeCliAnnouncement.introducing')}{" "}
              <span className="ccv-announce-brand ccv-shimmer">
                {t('claudeCliAnnouncement.productName')}
              </span>
            </h2>
            <p className="ccv-announce-desc">
              {t('claudeCliAnnouncement.description')}
            </p>
          </div>

          <div className="ccv-announce-cta">
            <Sparkles className="h-4 w-4" />
            <span>{t('claudeCliAnnouncement.cta')}</span>
            <ArrowRight className="h-4 w-4 ccv-arrow-bounce" />
          </div>
        </div>

        <div className="ccv-announce-preview">
          <div className="ccv-announce-mockup">
            <div className="ccv-mockup-bar">
              <span className="ccv-dot ccv-dot-red" />
              <span className="ccv-dot ccv-dot-yellow" />
              <span className="ccv-dot ccv-dot-green" />
              <span className="ccv-mockup-title">{t('claudeCliAnnouncement.mockup.title')}</span>
            </div>
            <div className="ccv-mockup-body">
              <div className="ccv-mockup-search">
                <span className="ccv-mockup-search-icon">⌕</span>
                <span className="ccv-mockup-search-text">{t('claudeCliAnnouncement.mockup.searchPlaceholder')}</span>
              </div>
              <div className="ccv-mockup-list">
                <div className="ccv-mockup-item ccv-item-active">
                  <MessageSquare className="h-3.5 w-3.5 ccv-item-icon" />
                  <div className="ccv-item-lines">
                    <div className="ccv-line ccv-line-short" />
                    <div className="ccv-line ccv-line-long" />
                  </div>
                </div>
                <div className="ccv-mockup-item">
                  <MessageSquare className="h-3.5 w-3.5 ccv-item-icon" />
                  <div className="ccv-item-lines">
                    <div className="ccv-line ccv-line-medium" />
                    <div className="ccv-line ccv-line-short" />
                  </div>
                </div>
                <div className="ccv-mockup-item">
                  <MessageSquare className="h-3.5 w-3.5 ccv-item-icon" />
                  <div className="ccv-item-lines">
                    <div className="ccv-line ccv-line-long" />
                    <div className="ccv-line ccv-line-medium" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
