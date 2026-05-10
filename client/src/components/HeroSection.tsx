import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();
  const isANZ = window.GEO_COUNTRY === 'AU' || window.GEO_COUNTRY === 'NZ';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(76, 175, 80, 0.06), transparent 50%), #FFFFFF",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight break-words">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4CAF50, #3A9A6A, #1E5099)",
              }}
            >
              {t('hero.title')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            {t('hero.subtitle')}
          </p>

          {!isANZ && <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 h-12 hero-cta-gradient"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-get-started"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base px-8 h-12"
              style={{
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
              }}
              onClick={() => scrollToSection("#services")}
              data-testid="button-view-services"
            >
              {t('hero.learn')}
            </Button>
          </div>}

        </div>
      </div>
    </section>
  );
}
