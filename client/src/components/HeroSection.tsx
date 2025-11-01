import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Target } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_background_with_tech_patterns_69d4428f.png";

export default function HeroSection() {
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
            variant="secondary"
            className="text-sm font-semibold px-4 py-2"
            data-testid="badge-specialization"
          >
            SAP BTP Specialized Consulting
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Transform Your Business
            </span>
            <br />
            <span className="text-foreground">with SAP BTP Excellence</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            100% focused on SAP Business Technology Platform. Expert consulting
            in architecture, development, and AI-powered solutions serving
            markets worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 h-12"
              onClick={() => scrollToSection("#contact")}
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 h-12 bg-background/50 backdrop-blur"
              onClick={() => scrollToSection("#services")}
              data-testid="button-view-services"
            >
              View Services
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground font-medium" data-testid="text-countries">
                Serving 40+ Countries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground font-medium" data-testid="text-focus">
                100% SAP BTP Focused
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
