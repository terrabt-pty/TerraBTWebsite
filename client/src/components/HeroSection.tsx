import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/TerraBT Page Background_1762664523373.webp";

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight break-words">
            <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 h-12 shadow-lg shadow-primary/20 hero-cta-gradient"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-get-started"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base px-8 h-12 bg-trust text-trust-foreground hover:bg-trust"
              onClick={() => scrollToSection("#services")}
              data-testid="button-view-services"
            >
              {t('hero.learn')}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
