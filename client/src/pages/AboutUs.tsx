import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { ArrowUpRight } from "lucide-react";
import ashHeadshot from "@assets/ash-goyal-headshot.png";

const BTP_XID_APP_URL = "https://btpxid.terrabt.com";

const TIMELINE: Array<{ period: string; title: string; body: string }> = [
  {
    period: "2007 – 2018",
    title: "Twelve Years As An Architect Inside SAP",
    body: "Across SAP SRM, SAP Trade Promotion Management and SAP Oil & Gas Upstream Operations, Ash architected products used by some of SAP's largest customers — setting up CI/CD pipelines from scratch, building a Fiori theming tool, and leading teams of up to 35 people across India and Belarus.",
  },
  {
    period: "2010",
    title: "Architected SAP's First Productive SAPUI5 App",
    body: "As architect of SAP SRM Shopping Cart NXP, Ash proposed and built the very first productive application on SAPUI5 and OData inside SAP — and personally secured SAP Board approval to adopt HTML5 as SAP's new UI standard, a bet the company was not yet making. The delivery approach he designed for that project still underpins how Fiori and SAPUI5 apps are built and shipped across SAP's product line today, including SAP S/4HANA.",
  },
  {
    period: "2019 – 2026",
    title: "Led NTT DATA's SAP BTP, Fiori & S/4HANA Practice",
    body: "Ash led NTT DATA Business Solutions' AI, Development & Integration practice for SAP BTP, Fiori and SAP S/4HANA in Australia, including delivering one of the most complex leave-management landscapes in the world for the NSW Department of Education.",
  },
  {
    period: "Today",
    title: "Founder, TerraBT",
    body: "After years of seeing the same gap at customer after customer — SAP BTP service keys and API credentials with no owner, no expiry, no audit trail — Ash wrote publicly about the compliance controls it violates, then built BTP xID to close it.",
  },
];

export default function AboutUs() {
  const { getLocalizedPath } = useLocalizedPath();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="About TerraBT | Built by a 23-Year SAP Architect"
        description="TerraBT is led by Ash Goyal, a 23+ year SAP architect who built SAP's first productive SAPUI5 application and previously led NTT DATA's SAP BTP practice. Learn why TerraBT exists and who's behind BTP xID."
        path="/about"
      />
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(circle at top left, rgba(76, 175, 80, 0.06), transparent 50%), #FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4CAF50, #3A9A6A, #1E5099)" }}>
              Built By Someone Who Lived The Problem.
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "#475569" }}>
            TerraBT is led by Ash Goyal — a 23+ year SAP architect and enterprise integration specialist who spent his career building the systems he now helps you govern.
          </p>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
            <div className="flex md:block justify-center">
              <img
                src={ashHeadshot}
                alt="Ash Goyal, Founder of TerraBT"
                className="w-40 h-40 md:w-full md:h-auto aspect-square rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">Ash Goyal</h2>
              <p className="text-sm font-semibold mb-6" style={{ color: "#3A9A6A" }}>Founder, TerraBT</p>

              <div className="space-y-4 leading-relaxed" style={{ color: "#334155" }}>
                <p>
                  From 2019 until 2026, Ash led NTT DATA Business Solutions' AI, Development &amp; Integration practice for SAP BTP, Fiori and SAP S/4HANA in Australia. Before NTT DATA, he spent over twelve years as an architect inside SAP itself, working across SAP SRM, SAP Trade Promotion Management, SAP Oil &amp; Gas Upstream Operations Management and more.
                </p>
                <p>
                  In 2010, as architect of SAP SRM Shopping Cart NXP, Ash proposed, designed and built the very first productive application on SAPUI5 and OData inside SAP — and personally secured SAP Board approval to adopt HTML5 as the company's new UI standard, a significant departure from the WebDynpro stack in use at the time. The delivery approach he designed for that project still underpins how Fiori and SAPUI5 apps are built and shipped across SAP's product line today, including SAP S/4HANA.
                </p>
                <p>
                  Across his SAP career, Ash led teams of up to 35 people spanning India and Belarus, built a Fiori theming tool from scratch, set up CI/CD pipelines for greenfield SAP products, and delivered a leave-management system for the NSW Department of Education — one of the most complex leave-management landscapes in the world.
                </p>
                <p>
                  Along the way, Ash kept running into the same governance gap at customer after customer: SAP BTP service keys and API credentials with no owner, no expiry date, and no audit trail — exactly the kind of access an ISO 27001, SOC 2 or PCI DSS audit expects to be tightly controlled. He wrote about the gap publicly, mapping it to the specific ISO 27001, NIST SP 800-53, PCI DSS, SOC 2 and SOX controls it violates. <strong>BTP xID is the tool he built to close that gap</strong> — for his own customers first, and now for yours.
                </p>
                <p>
                  Ash is based in Sydney, Australia, and has paused his studies at UNSW.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 md:py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#2D7A53" }}>The Journey</div>
            <h2 className="text-3xl md:text-4xl font-bold">From SAP Architect To Founder</h2>
          </div>

          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <div key={item.title} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8">
                <div className="text-sm font-bold" style={{ color: "#1E5099" }}>{item.period}</div>
                <div className="pb-8 border-b" style={{ borderColor: i === TIMELINE.length - 1 ? "transparent" : "#E2E8F0" }}>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION / CTA ===== */}
      <section className="py-20 md:py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why TerraBT Exists</h2>
          <p className="leading-relaxed mb-10" style={{ color: "#475569" }}>
            SAP BTP is powerful, but it wasn't built to answer "who owns this credential, and when does it expire?" or "what will this change actually do to production?" TerraBT builds the governance and change-management layer SAP BTP is missing — built by practitioners who've run these landscapes themselves, not outside observers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BTP_XID_APP_URL} target="_blank" rel="noopener noreferrer" className="btpxid-hero-cta">
              Try BTP xID Now
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={getLocalizedPath("/products/btp-xid")}
              className="inline-flex items-center gap-2 rounded-full border transition-colors"
              style={{ color: "#0F172A", borderColor: "#E2E8F0", padding: "14px 28px", fontSize: "1.0625rem", fontWeight: 700 }}
            >
              See What BTP xID Does
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
