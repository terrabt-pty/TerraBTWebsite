import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Code, Zap, Users, Layout, Smartphone, Cloud, Workflow, Layers } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function BuildApps() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Code,
      key: "visual"
    },
    {
      icon: Smartphone,
      key: "crossPlatform"
    },
    {
      icon: Cloud,
      key: "cloudNative"
    },
    {
      icon: Zap,
      key: "rapid"
    },
    {
      icon: Users,
      key: "citizen"
    },
    {
      icon: Layers,
      key: "proCode"
    }
  ];

  const benefitKeys = [0, 1, 2, 3, 4];
  const implementationSteps = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${t('services.buildApps.title')} - TerraBT`}
        description={t('services.buildApps.description')}
      />
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-1/10 via-primary/5 to-trust/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={getLocalizedPath("/")}>
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.backToHome')}
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-6" data-testid="badge-category">
              {t('buildAppsPage.badge')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-1 via-primary to-trust bg-clip-text text-transparent">
                {t('buildAppsPage.title')}
              </span>
              <br />
              <span className="text-foreground">{t('buildAppsPage.subtitle')}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('buildAppsPage.description')}
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              {t('buildAppsPage.cta')}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('buildAppsPage.servicesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('buildAppsPage.servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const featureData = t(`buildAppsPage.features.${feature.key}`, { returnObjects: true }) as { title: string; description: string; items: string[] };
              return (
                <Card 
                  key={index} 
                  className="p-8 hover-elevate transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                  data-testid={`card-feature-${feature.key}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {featureData.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {featureData.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {featureData.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t('buildAppsPage.whyChooseTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('buildAppsPage.whyChooseDescription')}
              </p>
              <ul className="space-y-4">
                {benefitKeys.map((index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{t(`buildAppsPage.benefits.${index}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">{t('buildAppsPage.implementationTitle')}</h3>
              <div className="space-y-6">
                {implementationSteps.map((step) => {
                  const stepData = t(`buildAppsPage.implementation.step${step}`, { returnObjects: true }) as { title: string; description: string };
                  return (
                    <div key={step}>
                      <h4 className="font-semibold text-foreground mb-2">{stepData.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {stepData.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
