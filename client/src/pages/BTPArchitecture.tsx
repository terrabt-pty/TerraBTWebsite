import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Layers, Shield, Server, GitBranch, Zap, Key, Users } from "lucide-react";
import { Link } from "wouter";

export default function BTPArchitecture() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Layers,
      title: "Landscape Design",
      description: "Comprehensive BTP landscape architecture tailored to your business requirements.",
      features: [
        "Multi-tier environment setup (Dev, Test, Production)",
        "Subaccount structure and organization",
        "Resource allocation and capacity planning",
        "Cloud Foundry and Kyma runtime configuration",
        "Network topology and connectivity planning"
      ]
    },
    {
      icon: Shield,
      title: "Security Architecture",
      description: "Enterprise-grade security design to protect your BTP environment and data.",
      features: [
        "Identity and access management (IAM) strategy",
        "Role-based access control (RBAC) implementation",
        "Data encryption and compliance standards",
        "Security monitoring and threat detection",
        "Audit logging and compliance reporting"
      ]
    },
    {
      icon: Server,
      title: "High Availability",
      description: "Design resilient systems with minimal downtime and maximum reliability.",
      features: [
        "Multi-region deployment strategies",
        "Disaster recovery and backup solutions",
        "Load balancing and failover mechanisms",
        "Business continuity planning",
        "Performance monitoring and optimization"
      ]
    },
    {
      icon: GitBranch,
      title: "Integration Suite Setup",
      description: "Complete Integration Suite configuration for seamless system connectivity.",
      features: [
        "Cloud Integration (CPI) setup and configuration",
        "API Management implementation",
        "Open Connectors configuration",
        "Integration Advisor utilization",
        "Pre-packaged integration content deployment"
      ]
    },
    {
      icon: Zap,
      title: "Event Mesh Setup",
      description: "Event-driven architecture implementation for real-time business processes.",
      features: [
        "Event Mesh instance provisioning",
        "Queue and topic configuration",
        "Event broker setup and management",
        "Message routing and filtering rules",
        "Event monitoring and analytics"
      ]
    },
    {
      icon: Key,
      title: "IAS Setup",
      description: "Identity Authentication Service configuration for secure user management.",
      features: [
        "IAS tenant provisioning and configuration",
        "Single Sign-On (SSO) implementation",
        "Multi-factor authentication (MFA) setup",
        "Corporate identity provider integration",
        "User provisioning and lifecycle management"
      ]
    },
    {
      icon: Users,
      title: "User Authentication & Roles",
      description: "Comprehensive user management and authorization framework.",
      features: [
        "Custom role definition and management",
        "Authorization model design",
        "User group organization",
        "Application-level security implementation",
        "Role assignment and delegation workflows"
      ]
    }
  ];

  const benefits = [
    "Reduced implementation time by 40% with proven architecture patterns",
    "Enterprise-grade security compliant with industry standards",
    "Scalable infrastructure that grows with your business",
    "24/7 monitoring and support for critical systems",
    "Expert guidance from certified SAP BTP architects"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
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
              Architecture & Design
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                SAP BTP Architecture
              </span>
              <br />
              <span className="text-foreground">& Design Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Strategic architecture planning and design for scalable, secure, and high-performing SAP BTP solutions. 
              We build enterprise-grade cloud environments tailored to your business needs.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-discuss-architecture"
            >
              Discuss Your Architecture Needs →
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive Architecture Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From initial landscape design to security implementation, we cover every aspect 
              of your SAP BTP architecture.
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

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-trust/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/30 mb-6">
                Why Choose TerraBT
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Expert Architecture That Delivers Results
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our certified SAP BTP architects bring years of experience designing 
                enterprise solutions for global organizations. We combine best practices 
                with innovation to create architectures that stand the test of time.
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
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">SAP BTP Focused</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">15+</div>
                  <div className="text-muted-foreground">Years Combined Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">40+</div>
                  <div className="text-muted-foreground">Countries Served</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Start Your Project Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Build
            </span>
            <br />
            <span className="text-foreground">Your SAP BTP Architecture?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our SAP BTP architects to discuss your 
            requirements and explore how we can help you succeed.
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

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
