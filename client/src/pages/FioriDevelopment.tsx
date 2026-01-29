import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone, Layout, Zap, Users, Code, Globe, Shield, BookOpen, Palette, Gauge } from "lucide-react";
import { Link } from "wouter";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function FioriDevelopment() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Layout,
      key: "customDev"
    },
    {
      icon: Palette,
      key: "uiux"
    },
    {
      icon: Zap,
      key: "performance"
    },
    {
      icon: Smartphone,
      key: "mobile"
    },
    {
      icon: Gauge,
      key: "integration"
    },
    {
      icon: Users,
      key: "support"
    }
  ];

  const benefits = [
    t('fioriDevelopment.benefits.0'),
    t('fioriDevelopment.benefits.1'),
    t('fioriDevelopment.benefits.2'),
    t('fioriDevelopment.benefits.3'),
    t('fioriDevelopment.benefits.4')
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${t('services.fiori.title')} - TerraBT`}
        description={t('services.fiori.description')}
        path="/services/fiori-development"
      />
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-5/10 via-trust/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={getLocalizedPath("/")}>
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.backToHome')}
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-trust/10 text-trust border-trust/30 mb-6" data-testid="badge-category">
              {t('fioriDevelopment.badge')}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                {t('fioriDevelopment.title')}
              </span>
              <br />
              <span className="text-foreground">{t('fioriDevelopment.subtitle')}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('fioriDevelopment.description')}
            </p>

            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              {t('fioriDevelopment.cta')}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('fioriDevelopment.servicesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('fioriDevelopment.servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const serviceData = t(`fioriDevelopment.features.${service.key}`, { returnObjects: true }) as { title: string; description: string; items: string[] };
              return (
                <Card
                  key={index}
                  className="p-8 hover-elevate transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                  data-testid={`card-service-${service.key}`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {serviceData.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {serviceData.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {serviceData.items.map((item, idx) => (
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
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">
                {t('fioriDevelopment.whyChooseBadge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t('fioriDevelopment.whyChooseTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('fioriDevelopment.whyChooseDescription')}
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-8 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{t('fioriDevelopment.statistics.appsDelivered.value')}</div>
                  <div className="text-muted-foreground">{t('fioriDevelopment.statistics.appsDelivered.label')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">{t('fioriDevelopment.statistics.satisfaction.value')}</div>
                  <div className="text-muted-foreground">{t('fioriDevelopment.statistics.satisfaction.label')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{t('fioriDevelopment.statistics.timeToMarket.value')}</div>
                  <div className="text-muted-foreground">{t('fioriDevelopment.statistics.timeToMarket.label')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">{t('fioriDevelopment.statistics.responsive.value')}</div>
                  <div className="text-muted-foreground">{t('fioriDevelopment.statistics.responsive.label')}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-primary/20 bg-gradient-to-r from-primary/5 to-trust/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className="text-primary border-primary/20">Knowledge Hub</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{t('blog.post1.title')}</h3>
                <p className="text-muted-foreground mb-4 md:mb-0 max-w-2xl">{t('blog.post1.excerpt')}</p>
              </div>
              <Link href={getLocalizedPath("/blog/fiori-applications-sap-btp")}>
                <Button variant="outline" className="shrink-0 border-primary/30 hover:bg-primary/5 group">
                  {t('blog.readMore')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            {t('fioriDevelopment.ctaSectionBadge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              {t('fioriDevelopment.ctaSectionTitle1')}
            </span>
            <br />
            <span className="text-foreground">{t('fioriDevelopment.ctaSectionTitle2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('fioriDevelopment.ctaSectionDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-get-quote"
            >
              {t('fioriDevelopment.ctaSectionButton1')}
            </Button>
            <Link href={getLocalizedPath("/")}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-explore-services"
              >
                {t('fioriDevelopment.ctaSectionButton2')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
