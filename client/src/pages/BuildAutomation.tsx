import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Bot, Workflow, Zap, FileCheck, TrendingUp, Shield, Clock, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function BuildAutomation() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Workflow,
      title: t('buildAutomationPage.features.workflow.title'),
      description: t('buildAutomationPage.features.workflow.description'),
      items: [
        t('buildAutomationPage.features.workflow.items.0'),
        t('buildAutomationPage.features.workflow.items.1'),
        t('buildAutomationPage.features.workflow.items.2'),
        t('buildAutomationPage.features.workflow.items.3'),
        t('buildAutomationPage.features.workflow.items.4')
      ]
    },
    {
      icon: Bot,
      title: t('buildAutomationPage.features.rpa.title'),
      description: t('buildAutomationPage.features.rpa.description'),
      items: [
        t('buildAutomationPage.features.rpa.items.0'),
        t('buildAutomationPage.features.rpa.items.1'),
        t('buildAutomationPage.features.rpa.items.2'),
        t('buildAutomationPage.features.rpa.items.3'),
        t('buildAutomationPage.features.rpa.items.4')
      ]
    },
    {
      icon: Zap,
      title: t('buildAutomationPage.features.document.title'),
      description: t('buildAutomationPage.features.document.description'),
      items: [
        t('buildAutomationPage.features.document.items.0'),
        t('buildAutomationPage.features.document.items.1'),
        t('buildAutomationPage.features.document.items.2'),
        t('buildAutomationPage.features.document.items.3'),
        t('buildAutomationPage.features.document.items.4')
      ]
    },
    {
      icon: FileCheck,
      title: t('buildAutomationPage.features.approval.title'),
      description: t('buildAutomationPage.features.approval.description'),
      items: [
        t('buildAutomationPage.features.approval.items.0'),
        t('buildAutomationPage.features.approval.items.1'),
        t('buildAutomationPage.features.approval.items.2'),
        t('buildAutomationPage.features.approval.items.3'),
        t('buildAutomationPage.features.approval.items.4')
      ]
    },
    {
      icon: TrendingUp,
      title: t('buildAutomationPage.features.analytics.title'),
      description: t('buildAutomationPage.features.analytics.description'),
      items: [
        t('buildAutomationPage.features.analytics.items.0'),
        t('buildAutomationPage.features.analytics.items.1'),
        t('buildAutomationPage.features.analytics.items.2'),
        t('buildAutomationPage.features.analytics.items.3'),
        t('buildAutomationPage.features.analytics.items.4')
      ]
    },
    {
      icon: Shield,
      title: t('buildAutomationPage.features.governance.title'),
      description: t('buildAutomationPage.features.governance.description'),
      items: [
        t('buildAutomationPage.features.governance.items.0'),
        t('buildAutomationPage.features.governance.items.1'),
        t('buildAutomationPage.features.governance.items.2'),
        t('buildAutomationPage.features.governance.items.3'),
        t('buildAutomationPage.features.governance.items.4')
      ]
    }
  ];

  const benefits = [
    t('buildAutomationPage.benefits.0'),
    t('buildAutomationPage.benefits.1'),
    t('buildAutomationPage.benefits.2'),
    t('buildAutomationPage.benefits.3'),
    t('buildAutomationPage.benefits.4')
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${t('services.buildAutomation.title')} - TerraBT`}
        description={t('services.buildAutomation.description')}
      />
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-1/10 via-primary/5 to-trust/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.backToHome')}
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-6" data-testid="badge-category">
              {t('buildAutomationPage.badge')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-1 via-primary to-trust bg-clip-text text-transparent">
                {t('buildAutomationPage.title')}
              </span>
              <br />
              <span className="text-foreground">{t('buildAutomationPage.subtitle')}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('buildAutomationPage.description')}
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              {t('buildAutomationPage.cta')}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('buildAutomationPage.servicesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('buildAutomationPage.servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t('buildAutomationPage.whyChooseTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('buildAutomationPage.whyChooseDescription')}
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">{t('buildAutomationPage.implementationTitle')}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step1.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step1.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step2.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step2.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step3.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step3.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step4.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step4.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step5.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step5.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('buildAutomationPage.implementation.step6.title')}</h4>
                  <p className="text-muted-foreground text-sm">
                    {t('buildAutomationPage.implementation.step6.description')}
                  </p>
                </div>
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
