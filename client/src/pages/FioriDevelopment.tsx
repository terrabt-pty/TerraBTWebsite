import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Smartphone, Layout, Zap, Palette, Gauge, Users } from "lucide-react";
import { Link } from "wouter";

export default function FioriDevelopment() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Layout,
      title: "Custom Fiori App Development",
      description: "Build tailored Fiori applications that perfectly match your business requirements.",
      features: [
        "SAPUI5 framework expertise",
        "Fiori Elements and Freestyle applications",
        "OData service integration",
        "Responsive design for all devices",
        "Custom controls and components"
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Create intuitive, beautiful interfaces following SAP Fiori design guidelines.",
      features: [
        "SAP Fiori design principles adherence",
        "User research and persona development",
        "Wireframing and prototyping",
        "Accessibility compliance (WCAG)",
        "Theme customization and branding"
      ]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Ensure your Fiori apps load fast and run smoothly on any device.",
      features: [
        "Code optimization and minification",
        "Lazy loading implementation",
        "Bundle size reduction",
        "Network request optimization",
        "Performance monitoring and analytics"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description: "Build Fiori apps optimized for mobile users and offline scenarios.",
      features: [
        "Responsive and adaptive design",
        "Touch-optimized interactions",
        "Mobile-specific features (camera, GPS)",
        "Offline data synchronization",
        "Progressive Web App (PWA) capabilities"
      ]
    },
    {
      icon: Gauge,
      title: "Integration & Testing",
      description: "Seamless backend integration with comprehensive testing coverage.",
      features: [
        "SAP Gateway and OData service creation",
        "Backend system integration",
        "Unit and integration testing",
        "End-to-end test automation",
        "Continuous integration/deployment (CI/CD)"
      ]
    },
    {
      icon: Users,
      title: "Training & Support",
      description: "Empower your team with knowledge and ongoing maintenance support.",
      features: [
        "Developer training workshops",
        "Best practices documentation",
        "Code review and quality assurance",
        "Ongoing maintenance and updates",
        "24/7 production support"
      ]
    }
  ];

  const benefits = [
    "Modern, intuitive interfaces that increase user adoption",
    "Faster development with reusable components and templates",
    "Cross-device compatibility ensuring seamless experience",
    "SAP-certified developers with deep Fiori expertise",
    "Reduced training costs with familiar, consistent UX"
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
              Application Development
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                SAP Fiori App
              </span>
              <br />
              <span className="text-foreground">Development Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Build modern, responsive Fiori applications that deliver exceptional user experiences across all devices. 
              From concept to deployment, we create beautiful, performant apps using SAP's latest technologies.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              Start Your Fiori Project →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Fiori Development Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              End-to-end Fiori development services from design to deployment and beyond.
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
                Why Choose TerraBT
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Fiori Experts Who Deliver Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our SAP-certified developers specialize in building enterprise-grade Fiori applications. 
                We combine technical expertise with design thinking to create apps users love.
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
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Fiori Apps Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">95%</div>
                  <div className="text-muted-foreground">User Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">30%</div>
                  <div className="text-muted-foreground">Faster Time to Market</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">100%</div>
                  <div className="text-muted-foreground">Mobile Responsive</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Limited Development Slots Available
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Build
            </span>
            <br />
            <span className="text-foreground">Your Next Fiori Application?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a beautiful, high-performing Fiori app 
            that your users will love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-get-quote"
            >
              Get a Free Quote →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-explore-services"
              >
                Explore Other Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
