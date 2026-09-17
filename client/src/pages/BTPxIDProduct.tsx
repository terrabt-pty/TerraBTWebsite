import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
  CheckCircle,
  Globe,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import btpxidIcon from "@assets/btp-xid-icon.png";
import userLookupImg from "@assets/UserSearchScreenshot.png";
import securityInsightsImg from "@assets/SecurityInsightsScreenshot.png";
import credentialDetailImg from "@assets/CredentialDetailScreenshot.png";


const XID_WEB_URL = "https://btpxid.terrabt.com";

const HERO_SCREENSHOTS = [
  {
    src: userLookupImg,
    alt: "BTP xID User Lookup showing one user found across Global Account, Subaccount, Cloud Foundry Org and Space",
  },
  {
    src: securityInsightsImg,
    alt: "BTP xID Security Insights showing a governance score, coverage metrics, and prioritized recommendations",
  },
  {
    src: credentialDetailImg,
    alt: "BTP xID API Credentials list with a credential detail panel showing governance fields like owner, risk level, expiry and rotation frequency",
  },
];

// FAQ structured data, factual statements about SAP BTP service key gaps.
// Rendered as JSON-LD so search and AI engines can cite the answers directly.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do SAP BTP service keys expire?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SAP BTP service keys have no expiration date and remain valid until they are explicitly deleted. Compliance frameworks such as PCI DSS 4.0 (requirement 8.3.10.1) and ISO/IEC 27001:2022 (control A.8.24) require credentials to be managed through a defined lifecycle, so teams must add expiry and rotation tracking themselves. BTP xID adds an expiry date and rotation record to every credential.",
      },
    },
    {
      "@type": "Question",
      name: "Does SAP BTP record who owns a service key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SAP BTP has no owner field on a service key. The platform does not store who owns a key, what it is used for, or which system consumes it. BTP xID adds owner, responsible party, and purpose fields to every credential, stored as metadata on the credential itself in your own landscape.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to SAP BTP service keys when an employee leaves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The keys keep working. Removing a user from a subaccount does not delete or rotate the service keys they created, and SAP BTP does not record who created a key. Security standards such as NIST SP 800-53 IA-5 and PCI DSS 8.6 require rotating a credential and reassigning its ownership when a person with access to its secret leaves. BTP xID records an owner on every credential, so a leaver event becomes a query followed by rotation and reassignment.",
      },
    },
    {
      "@type": "Question",
      name: "How do you review all users and service keys across an SAP BTP landscape?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Natively, only by visiting each global account, subaccount, Cloud Foundry org, and space individually. SAP BTP has no single cross-account view. BTP xID provides one view of all users and API credentials across the entire landscape, including reverse search by user.",
      },
    },
    {
      "@type": "Question",
      name: "Which compliance controls are affected by SAP BTP service key gaps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The missing owner, expiry, purpose, and rotation records on SAP BTP service keys affect ISO/IEC 27001:2022 controls A.5.15 and A.8.24, NIST SP 800-53 controls IA-4, IA-5, and AC-2, PCI DSS 4.0 requirements 8.3.10.1 and 8.6, SOC 2 Trust Services Criteria CC6.1, CC6.2, and CC7.1, and SOX IT General Controls for access management.",
      },
    },
  ],
};

interface GapItem {
  title: string;
  desc: string;
}

interface StandardCard {
  name: string;
  clauses: string;
  text: string;
}

interface CloseItem {
  gap: string;
  fix: string;
}

interface LandscapeStep {
  title: string;
  desc: string;
}

export default function BTPxIDProduct() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const { getLocalizedPath } = useLocalizedPath();

  // Auto-advance the hero screenshot carousel.
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((i) => (i + 1) % HERO_SCREENSHOTS.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide(((index % HERO_SCREENSHOTS.length) + HERO_SCREENSHOTS.length) % HERO_SCREENSHOTS.length);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="BTP xID | SAP BTP Service Key Governance: Owner, Expiry, Rotation | TerraBT"
        description="SAP BTP service keys have no owner, no expiry date, and no record of purpose. BTP xID adds owner, purpose, expiry, and rotation tracking to every credential and one view of users and keys across your landscape, evidence for ISO 27001, SOC 2, PCI DSS, NIST 800-53, and SOX audits."
        path="/products/btp-xid"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="btpxid-hero" id="home">
        <div className="btpxid-hero-inner">
          {/* Text block, centered, stacked */}
          <div className="btpxid-hero-content">
            {/* Wordmark */}
            <div className="btpxid-hero-wordmark">
              <img src={btpxidIcon} alt="BTP xID icon" className="btpxid-hero-wordmark-icon" />
              <span className="btpxid-hero-wordmark-text">
                <span className="btpxid-hero-wordmark-btp">BTP</span>
                <span className="btpxid-hero-wordmark-xid"> xID</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="btpxid-hero-title">{t('btpxidProduct.hero.headline')}</h1>

            {/* Description */}
            <p className="btpxid-hero-desc">{t('btpxidProduct.hero.subhead')}</p>
          </div>

          {/* Screenshot carousel, full-width block below text */}
          <div className="btpxid-hero-visual">
            <div className="btpxid-hero-carousel">
              <div className="btpxid-hero-screenshot-frame">
                <div
                  className="btpxid-hero-carousel-track"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {HERO_SCREENSHOTS.map((slide) => (
                    <div className="btpxid-hero-carousel-slide" key={slide.src}>
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="btpxid-hero-screenshot-img"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btpxid-hero-carousel-arrow btpxid-hero-carousel-arrow-prev"
                onClick={() => goToSlide(activeSlide - 1)}
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="btpxid-hero-carousel-arrow btpxid-hero-carousel-arrow-next"
                onClick={() => goToSlide(activeSlide + 1)}
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="btpxid-hero-carousel-dots">
                {HERO_SCREENSHOTS.map((slide, i) => (
                  <button
                    type="button"
                    key={slide.src}
                    className={`btpxid-hero-carousel-dot ${i === activeSlide ? "is-active" : ""}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    aria-current={i === activeSlide}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GAPS: what SAP BTP does not record ===== */}
      <section className="btpxid-gaps" id="gaps">
        <div className="btpxid-gaps-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.gaps.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.gaps.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.gaps.subtitle')}</p>
          </div>

          <div className="btpxid-gaps-grid">
            {(t('btpxidProduct.gaps.items', { returnObjects: true }) as GapItem[]).map((item) => (
              <div key={item.title} className="btpxid-gap-card">
                <h3 className="btpxid-gap-title">{item.title}</h3>
                <p className="btpxid-gap-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STANDARDS: audit impact ===== */}
      <section className="btpxid-standards" id="compliance">
        <div className="btpxid-standards-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.standards.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.standards.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.standards.subtitle')}</p>
          </div>

          <div className="btpxid-standards-grid">
            {(t('btpxidProduct.standards.cards', { returnObjects: true }) as StandardCard[]).map((card) => (
              <div key={card.name} className="btpxid-standard-card">
                <div className="btpxid-standard-head">
                  <h3 className="btpxid-standard-name">{card.name}</h3>
                  <span className="btpxid-standard-clauses">{card.clauses}</span>
                </div>
                <p className="btpxid-standard-text">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="btpxid-standards-cta">
            <a href={getLocalizedPath("/products/btp-xid/compliance")} className="btpxid-standards-link">
              {t('btpxidProduct.standards.cta')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW BTP xID CLOSES EACH GAP ===== */}
      <section className="btpxid-closes" id="features">
        <div className="btpxid-closes-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.closes.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.closes.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.closes.subtitle')}</p>
          </div>

          <div className="btpxid-closes-grid">
            {(t('btpxidProduct.closes.items', { returnObjects: true }) as CloseItem[]).map((item) => (
              <div key={item.gap} className="btpxid-close-card">
                <div className="btpxid-close-check">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="btpxid-close-gap">{item.gap}</h3>
                  <p className="btpxid-close-fix">{item.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IAS COMPLEMENT ===== */}
<section className="btpxid-ias" id="services">
  <div className="btpxid-ias-inner">
    <div className="btpxid-showcase-header">
      <div className="btpxid-features-label">{t('btpxidProduct.ias.label2')}</div>
      <h2 className="btpxid-showcase-title">
        {t('btpxidProduct.ias.title1')}<br />{t('btpxidProduct.ias.title2')}
      </h2>
      <p className="btpxid-showcase-sub">
        {t('btpxidProduct.ias.subtitle')}
      </p>
    </div>

    <div className="btpxid-ias-columns">
      {/* IAS column */}
      <div className="btpxid-ias-col btpxid-ias-col-ias">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-ias">{t('btpxidProduct.ias.iasBadge')}</span>
          <h3 className="btpxid-ias-col-title">{t('btpxidProduct.ias.iasTitle')}</h3>
        </div>
        <ul className="btpxid-ias-list">
          {(t('btpxidProduct.ias.iasItems', { returnObjects: true }) as string[]).map((item) => (
            <li key={item} className="btpxid-ias-list-item btpxid-ias-list-item-ias">
              <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#E2E8F0"/>
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plus divider */}
      <div className="btpxid-ias-plus">
        <div className="btpxid-ias-plus-line" />
        <span className="btpxid-ias-plus-sign">+</span>
        <div className="btpxid-ias-plus-line" />
      </div>

      {/* BTP xID column */}
      <div className="btpxid-ias-col btpxid-ias-col-xid">
        <div className="btpxid-ias-col-header">
          <span className="btpxid-ias-badge btpxid-ias-badge-xid">{t('btpxidProduct.ias.xidBadge')}</span>
          <h3 className="btpxid-ias-col-title">{t('btpxidProduct.ias.xidTitle')}</h3>
        </div>
        <ul className="btpxid-ias-list">
          {(t('btpxidProduct.ias.xidItems', { returnObjects: true }) as string[]).map((item) => (
            <li key={item} className="btpxid-ias-list-item btpxid-ias-list-item-xid">
              <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="rgba(58,154,106,0.12)"/>
                <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#3A9A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{item}</span>
            </li>
          ))}
          <li className="btpxid-ias-list-item btpxid-ias-list-item-xid">
            <svg className="btpxid-ias-check" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="rgba(58,154,106,0.12)"/>
              <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#3A9A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Cloud Foundry Org &amp; Space manager assignments, including Org Manager force-add in one click, without service update wizards or JSON payloads (<a href="https://me.sap.com/notes/3249765" target="_blank" rel="noopener noreferrer" style={{ color: "#3A9A6A", textDecoration: "none" }}>SAP Note 3249765</a>)</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Footer callout */}
    <div className="btpxid-ias-footer">
      {t('btpxidProduct.ias.footer')}
    </div>
  </div>
</section>

      {/* ===== LANDSCAPE MANAGEMENT ===== */}
      <section className="btpxid-landscape" id="landscape">
        <div className="btpxid-landscape-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.landscape.label')}</div>
            <h2 className="btpxid-showcase-title">{t('btpxidProduct.landscape.title')}</h2>
            <p className="btpxid-showcase-sub">{t('btpxidProduct.landscape.subtitle')}</p>
          </div>

          <div className="btpxid-landscape-group">
            <h3 className="btpxid-landscape-group-title">{t('btpxidProduct.landscape.modelLabel')}</h3>
            <div className="btpxid-landscape-grid btpxid-landscape-grid-3">
              {(t('btpxidProduct.landscape.modelSteps', { returnObjects: true }) as LandscapeStep[]).map((step, i) => (
                <div key={step.title} className="btpxid-landscape-step">
                  <div className="btpxid-landscape-step-num">{i + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="btpxid-landscape-group">
            <h3 className="btpxid-landscape-group-title">{t('btpxidProduct.landscape.flowLabel')}</h3>
            <div className="btpxid-landscape-grid btpxid-landscape-grid-5">
              {(t('btpxidProduct.landscape.flowSteps', { returnObjects: true }) as LandscapeStep[]).map((step, i) => (
                <div key={step.title} className="btpxid-landscape-step">
                  <div className="btpxid-landscape-step-num">{i + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="btpxid-landscape-callout">
            <h4>{t('btpxidProduct.landscape.safetyTitle')}</h4>
            <p>{t('btpxidProduct.landscape.safetyText')}</p>
          </div>

          <p className="btpxid-landscape-ai-note">{t('btpxidProduct.landscape.aiNote')}</p>
        </div>
      </section>

      {/* ===== DOWNLOAD ===== */}
      <section className="btpxid-download" id="download">
        <div className="btpxid-download-inner">
          <div className="btpxid-showcase-header">
            <div className="btpxid-features-label">{t('btpxidProduct.download.getStartedLabel')}</div>
            <h2 className="btpxid-showcase-title">
              {t('btpxidProduct.download.getStartedTitle')}
            </h2>
          </div>

          {/* Primary CTA: the web app is the credential-governance tool this page sells */}
          <div className="btpxid-download-primary">
            <a
              href={XID_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btpxid-download-btn"
            >
              <Globe className="h-6 w-6" />
              <div className="btpxid-download-btn-text">
                <span className="btpxid-download-btn-title">
                  {t('btpxidProduct.download.webButton')}
                </span>
                <span className="btpxid-download-btn-desc">
                  {t('btpxidProduct.download.webButtonDesc')}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="btpxid-download-info">
            <p>
              {t('btpxidProduct.download.legal')}{" "}
              <a href={getLocalizedPath("/terms-of-service")}>{t('btpxidProduct.download.termsOfService')}</a>
              {", "}
              <a href={getLocalizedPath("/eula")}>{t('btpxidProduct.download.eula')}</a>
              {", "}
              <a href={getLocalizedPath("/privacy-policy")}>{t('btpxidProduct.download.privacyPolicy')}</a>
              {", and "}
              <a href={getLocalizedPath("/limited-liability")}>{t('btpxidProduct.download.liabilityPolicy')}</a>.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}
