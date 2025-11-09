import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Target } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_background_with_tech_patterns_69d4428f.png";

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
          <Badge
            className="text-sm font-semibold px-4 py-2 bg-urgency/10 text-urgency border-urgency/30"
            data-testid="badge-specialization"
          >
            🚀 100% SAP BTP Specialized Consulting
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
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
              className="w-full sm:w-auto text-base px-8 h-12 shadow-lg shadow-primary/20"
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground" data-testid="text-countries">
                {t('value.global.point1')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-trust/10 flex items-center justify-center">
                <Target className="h-4 w-4 text-trust" />
              </div>
              <span className="font-semibold text-foreground" data-testid="text-focus">
                {t('value.specialization.title')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
