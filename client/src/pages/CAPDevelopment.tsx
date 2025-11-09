import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Code, Database, Shield, Zap, FileCode, Workflow } from "lucide-react";
import { Link } from "wouter";

export default function CAPDevelopment() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Code,
      title: "Full-Stack CAP Development",
      description: "End-to-end application development using SAP Cloud Application Programming Model.",
      items: [
        "CDS modeling for domain-driven design",
        "Service implementation with Node.js or Java",
        "Entity-relationship modeling and associations",
        "Custom business logic and event handlers",
        "Annotations for UI generation"
      ]
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Seamless database management with SAP HANA and other supported databases.",
      items: [
        "SAP HANA Cloud database setup",
        "SQLite for local development",
        "PostgreSQL integration support",
        "Data migration and seeding strategies",
        "Advanced CDS views and projections"
      ]
    },
    {
      icon: Shield,
      title: "Security & Authorization",
      description: "Enterprise-grade security implementation for CAP applications.",
      items: [
        "Role-based access control (RBAC)",
        "Authorization annotations in CDS",
        "Integration with IAS/XSUAA",
        "Data protection and field-level security",
        "Audit logging configuration"
      ]
    },
    {
      icon: Zap,
      title: "API Development",
      description: "Build robust OData and REST APIs with CAP framework.",
      items: [
        "OData V4 service exposure",
        "Custom REST API endpoints",
        "Service composition and reuse",
        "API documentation generation",
        "Batch request handling"
      ]
    },
    {
      icon: FileCode,
      title: "Fiori Integration",
      description: "Connect CAP backend services with SAP Fiori frontends.",
      items: [
        "Fiori Elements application generation",
        "Custom Fiori UI5 app integration",
        "Draft handling for collaborative editing",
        "Value help and search capabilities",
        "Flexible programming model annotations"
      ]
    },
    {
      icon: Workflow,
      title: "CI/CD & Deployment",
      description: "Automated deployment pipelines for CAP applications on BTP.",
      items: [
        "Multi-target application (MTA) build",
        "Cloud Foundry deployment automation",
        "Environment-specific configurations",
        "Database schema migration automation",
        "Testing and quality assurance setup"
      ]
    }
  ];

  const benefits = [
    "Rapid development with built-in best practices",
    "Seamless SAP ecosystem integration",
    "Scalable microservices architecture",
    "Reduced development time by 50%",
    "Cloud-native and deployment-ready"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="SAP CAP Development Services - TerraBT | Cloud Application Programming"
        description="Expert SAP Cloud Application Programming Model (CAP) development services. Build modern, scalable cloud applications with our certified CAP developers."
        path="/services/cap-development"
      />
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-chart-1/10 via-primary/5 to-trust/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover-elevate" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-6" data-testid="badge-category">
              Development
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-1 via-primary to-trust bg-clip-text text-transparent">
                SAP CAP Development
              </span>
              <br />
              <span className="text-foreground">Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Build modern, cloud-native applications with SAP Cloud Application Programming Model (CAP). 
              Our expert developers create scalable, enterprise-grade solutions leveraging the full power of CAP framework.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-cap-project"
            >
              Start Your CAP Project →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive CAP Development Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From data modeling to deployment, we provide end-to-end CAP development expertise 
              for your enterprise applications.
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
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">
                Why Choose CAP
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Modern Development for SAP Ecosystem
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                SAP CAP provides a powerful framework for building enterprise applications 
                with built-in best practices, seamless SAP integration, and cloud-native capabilities.
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
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                CAP Technology Stack
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="font-medium text-foreground">CDS Modeling</span>
                  <Badge variant="outline">Core</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="font-medium text-foreground">Node.js / Java</span>
                  <Badge variant="outline">Runtime</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="font-medium text-foreground">SAP HANA Cloud</span>
                  <Badge variant="outline">Database</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="font-medium text-foreground">Fiori Elements</span>
                  <Badge variant="outline">UI</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                  <span className="font-medium text-foreground">Cloud Foundry</span>
                  <Badge variant="outline">Deployment</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Start Building Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Build Your
            </span>
            <br />
            <span className="text-foreground">CAP Application?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our CAP experts help you build modern, scalable applications on SAP BTP. 
            Schedule a free consultation to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-schedule-consultation"
            >
              Schedule Free Consultation →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-view-all-services"
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
