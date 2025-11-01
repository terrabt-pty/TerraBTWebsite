import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, GitBranch, Cloud, Puzzle, Zap, Shield, BarChart } from "lucide-react";
import { Link } from "wouter";

export default function IntegrationSuite() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Cloud,
      title: "Cloud Integration (CPI)",
      description: "Connect cloud and on-premise systems with robust integration flows.",
      features: [
        "Integration flow design and development",
        "Pre-built integration content utilization",
        "Message mapping and transformation",
        "Error handling and monitoring",
        "Security artifact management"
      ]
    },
    {
      icon: Puzzle,
      title: "API Management",
      description: "Design, publish, and manage APIs with comprehensive lifecycle support.",
      features: [
        "API proxy creation and configuration",
        "Policy enforcement (security, rate limiting)",
        "API portal and developer documentation",
        "Analytics and usage monitoring",
        "Monetization and quota management"
      ]
    },
    {
      icon: GitBranch,
      title: "Open Connectors",
      description: "Pre-built connectors for rapid integration with third-party systems.",
      features: [
        "150+ pre-built connectors",
        "Custom connector development",
        "Authentication and authorization",
        "Data transformation and normalization",
        "Event-based integration"
      ]
    },
    {
      icon: Zap,
      title: "Integration Advisor",
      description: "Accelerate integration development with AI-powered recommendations.",
      features: [
        "Automated mapping suggestions",
        "Message implementation guides (MIGs)",
        "B2B integration scenario templates",
        "Interface mapping proposals",
        "Best practice recommendations"
      ]
    },
    {
      icon: Shield,
      title: "Security & Governance",
      description: "Enterprise-grade security and governance for all integrations.",
      features: [
        "OAuth and SAML authentication",
        "Certificate and key management",
        "Transport-level encryption (TLS/SSL)",
        "Message-level encryption",
        "Audit logging and compliance"
      ]
    },
    {
      icon: BarChart,
      title: "Monitoring & Operations",
      description: "Comprehensive monitoring and operational excellence.",
      features: [
        "Real-time message monitoring",
        "Performance metrics and KPIs",
        "Alerting and notification setup",
        "Log analysis and troubleshooting",
        "Capacity planning and optimization"
      ]
    }
  ];

  const benefits = [
    "Faster integration with pre-built content and accelerators",
    "Reduced integration costs with cloud-native platform",
    "Enterprise-grade reliability and scalability",
    "Single platform for all integration needs",
    "24/7 expert support and monitoring"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-5/10 via-trust/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-trust/10 text-trust border-trust/30 mb-6" data-testid="badge-category">
              Integration & Connectivity
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                SAP BTP Integration Suite
              </span>
              <br />
              <span className="text-foreground">Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Seamless integration solutions connecting your SAP systems with cloud and on-premise applications. 
              Expert implementation of Cloud Integration, API Management, Open Connectors, and Integration Advisor.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-integrate"
            >
              Connect Your Systems →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Integration Suite Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From Cloud Integration to API Management - comprehensive integration services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/15 to-trust/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
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
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">
                Integration Excellence
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Seamless System Connectivity
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                SAP BTP Integration Suite provides everything you need to connect your enterprise. 
                Our experts ensure your integrations are reliable, secure, and scalable.
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
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Pre-Built Connectors</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">99.9%</div>
                  <div className="text-muted-foreground">Integration Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <div className="text-muted-foreground">Faster Implementation</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">24/7</div>
                  <div className="text-muted-foreground">Monitoring & Support</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Connect Your Enterprise Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Unify
            </span>
            <br />
            <span className="text-foreground">Your Business Systems?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your integration requirements and create a comprehensive solution 
            that connects all your critical business systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-integration-consultation"
            >
              Get Integration Consultation →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-view-all"
              >
                View All Services
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
