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

export default function BuildApps() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Code,
      title: "Visual Development",
      description: "Build applications using intuitive drag-and-drop interfaces without writing code.",
      items: [
        "Drag-and-drop UI designer",
        "Pre-built components and templates",
        "Visual data binding",
        "Logic flow designer",
        "Real-time preview"
      ]
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Apps",
      description: "Create applications that work seamlessly across all platforms.",
      items: [
        "Web application deployment",
        "Native iOS applications",
        "Native Android applications",
        "Responsive design support",
        "Offline capabilities"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud-Native Integration",
      description: "Seamlessly integrate with SAP BTP services and external systems.",
      items: [
        "SAP BTP service integration",
        "Backend system connectivity",
        "Third-party API integration",
        "Authentication and authorization",
        "Data service consumption"
      ]
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Quickly create functional prototypes and MVPs.",
      items: [
        "Quick app generation",
        "Template-based development",
        "Iterative design process",
        "User feedback collection",
        "Fast deployment cycles"
      ]
    },
    {
      icon: Users,
      title: "Citizen Development",
      description: "Enable business users to create their own applications.",
      items: [
        "No-code development tools",
        "Governance and compliance",
        "IT oversight capabilities",
        "Reusable components library",
        "Collaboration features"
      ]
    },
    {
      icon: Layers,
      title: "Pro-Code Extensions",
      description: "Advanced customization for professional developers.",
      items: [
        "Custom JavaScript functions",
        "Advanced logic implementation",
        "Custom component creation",
        "API integration code",
        "Complex business rules"
      ]
    }
  ];

  const benefits = [
    "70% faster application development",
    "Reduced development costs",
    "Empowered citizen developers",
    "Consistent enterprise standards",
    "Seamless SAP BTP integration"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${t('services.buildApps.title')} - TerraBT`}
        description={t('services.buildApps.description')}
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
              Low-Code Development
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-1 via-primary to-trust bg-clip-text text-transparent">
                SAP Build Apps
              </span>
              <br />
              <span className="text-foreground">Development Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Create professional enterprise applications rapidly with SAP Build Apps' no-code/low-code platform. 
              Empower both citizen developers and professional developers to build sophisticated solutions.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              Start Your Build Apps Project →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              No-Code/Low-Code Application Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Accelerate digital transformation with visual development tools that democratize application creation.
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
                Why Choose SAP Build Apps?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                SAP Build Apps enables organizations to rapidly create enterprise-grade applications that integrate seamlessly with SAP systems and beyond.
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
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Implementation Approach</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Requirements Analysis</h4>
                  <p className="text-muted-foreground text-sm">
                    Understand business needs and identify the right use cases for Build Apps.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Application Design</h4>
                  <p className="text-muted-foreground text-sm">
                    Create intuitive user interfaces aligned with your brand and user expectations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Development & Integration</h4>
                  <p className="text-muted-foreground text-sm">
                    Build applications and integrate with backend systems and data sources.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">4. Testing & Deployment</h4>
                  <p className="text-muted-foreground text-sm">
                    Ensure quality across platforms and deploy with proper governance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">5. Training & Enablement</h4>
                  <p className="text-muted-foreground text-sm">
                    Empower your team to create and maintain applications independently.
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
