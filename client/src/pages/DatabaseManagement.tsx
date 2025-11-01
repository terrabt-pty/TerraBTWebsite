import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Database, LineChart, Lock, Zap, HardDrive, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function DatabaseManagement() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Database,
      title: "Database Design & Modeling",
      description: "Efficient database schema design optimized for SAP BTP applications.",
      features: [
        "SAP HANA Cloud database design",
        "PostgreSQL and SAP ASE configuration",
        "Entity-relationship modeling",
        "Normalization and denormalization strategies",
        "Indexing and partitioning strategies"
      ]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Maximize database performance for lightning-fast query execution.",
      features: [
        "Query optimization and tuning",
        "Index analysis and recommendations",
        "Execution plan optimization",
        "Memory and cache configuration",
        "Performance monitoring and profiling"
      ]
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description: "Protect your data with enterprise-grade security measures.",
      features: [
        "Data encryption at rest and in transit",
        "Row-level and column-level security",
        "Audit trail implementation",
        "GDPR and compliance requirements",
        "Backup encryption and secure storage"
      ]
    },
    {
      icon: RefreshCw,
      title: "Backup & Recovery",
      description: "Comprehensive disaster recovery and business continuity planning.",
      features: [
        "Automated backup scheduling",
        "Point-in-time recovery capabilities",
        "Disaster recovery procedures",
        "High availability configuration",
        "Multi-region replication"
      ]
    },
    {
      icon: HardDrive,
      title: "Data Migration",
      description: "Seamless data migration from legacy systems to SAP BTP.",
      features: [
        "Data extraction and transformation",
        "Migration strategy and planning",
        "Zero-downtime migration techniques",
        "Data validation and verification",
        "Rollback procedures and testing"
      ]
    },
    {
      icon: LineChart,
      title: "Monitoring & Maintenance",
      description: "Proactive monitoring and maintenance for optimal database health.",
      features: [
        "Real-time performance monitoring",
        "Automated alerting and notifications",
        "Health check and diagnostics",
        "Capacity planning and forecasting",
        "Patch management and updates"
      ]
    }
  ];

  const benefits = [
    "Up to 10x faster query performance with optimization",
    "99.99% uptime with high availability configuration",
    "Reduced storage costs through efficient design",
    "Compliance-ready with built-in security features",
    "24/7 monitoring and expert support"
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
              Data Management
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                SAP BTP Database
              </span>
              <br />
              <span className="text-foreground">Management Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Efficient database design, optimization, and management for high-performance SAP BTP applications. 
              Expert services for SAP HANA Cloud, PostgreSQL, and SAP ASE databases.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-optimize-database"
            >
              Optimize Your Database →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Database Management Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From design to optimization, security to recovery - comprehensive database expertise.
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
                Database Excellence
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Performance, Security, Reliability
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our database specialists bring deep expertise in SAP BTP database technologies. 
                We ensure your data is fast, secure, and always available when you need it.
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
                  <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
                  <div className="text-muted-foreground">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">10x</div>
                  <div className="text-muted-foreground">Performance Improvement</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Data Security</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">24/7</div>
                  <div className="text-muted-foreground">Expert Monitoring</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Optimize Your Database Performance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Maximize
            </span>
            <br />
            <span className="text-foreground">Your Database Performance?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a free database health check and discover optimization opportunities 
            that could transform your application performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-free-assessment"
            >
              Get Free Database Assessment →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-all-services"
              >
                Explore All Services
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
