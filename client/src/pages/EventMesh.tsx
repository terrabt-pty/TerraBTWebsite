import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Zap, Network, Activity, Lock, Globe, BarChart } from "lucide-react";
import { Link } from "wouter";

export default function EventMesh() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Network,
      title: "Event Mesh Architecture",
      description: "Design and implement enterprise-wide event-driven architecture.",
      features: [
        "Event mesh topology design",
        "Multi-region event distribution",
        "Event broker configuration",
        "Message routing strategies",
        "Topic and queue design patterns"
      ]
    },
    {
      icon: Zap,
      title: "Real-Time Event Processing",
      description: "Process and react to business events in real-time.",
      features: [
        "Event streaming implementation",
        "Complex event processing (CEP)",
        "Event filtering and transformation",
        "Event aggregation and correlation",
        "Low-latency event delivery"
      ]
    },
    {
      icon: Activity,
      title: "Event-Driven Integrations",
      description: "Connect systems through asynchronous event-based communication.",
      features: [
        "Publisher/subscriber patterns",
        "Event-driven microservices",
        "Webhook and callback integration",
        "Event replay and recovery",
        "Dead letter queue management"
      ]
    },
    {
      icon: Lock,
      title: "Security & Governance",
      description: "Secure event transmission with comprehensive governance.",
      features: [
        "Event encryption in transit",
        "Access control and authorization",
        "Event schema validation",
        "Compliance and audit logging",
        "Data privacy controls"
      ]
    },
    {
      icon: Globe,
      title: "Multi-Cloud & Hybrid",
      description: "Event mesh across cloud providers and on-premise systems.",
      features: [
        "Cross-cloud event distribution",
        "Hybrid cloud connectivity",
        "Multi-region redundancy",
        "Geographic event routing",
        "Cloud-agnostic architecture"
      ]
    },
    {
      icon: BarChart,
      title: "Monitoring & Analytics",
      description: "Comprehensive visibility into your event-driven ecosystem.",
      features: [
        "Real-time event monitoring",
        "Performance metrics and SLAs",
        "Event flow visualization",
        "Bottleneck identification",
        "Predictive capacity planning"
      ]
    }
  ];

  const benefits = [
    "Decouple systems for greater flexibility and scalability",
    "Real-time business insights and immediate reaction",
    "Improved system resilience and fault tolerance",
    "Reduced point-to-point integrations complexity",
    "Support for modern event-driven architectures"
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
              Event-Driven Architecture
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                SAP Event Mesh
              </span>
              <br />
              <span className="text-foreground">Implementation Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real-time event-driven architecture implementation for responsive, scalable business processes. 
              Build distributed systems that react instantly to business events with SAP Event Mesh.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-implement-events"
            >
              Build Event-Driven Architecture →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Complete Event Mesh Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From architecture design to implementation - build responsive event-driven systems.
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
                Event-Driven Excellence
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Real-Time Business Responsiveness
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Event Mesh enables your business to react instantly to events as they happen. 
                Build loosely coupled, highly scalable systems that adapt to changing business needs.
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
                  <div className="text-4xl font-bold text-primary mb-2">&lt;100ms</div>
                  <div className="text-muted-foreground">Event Delivery Latency</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">1M+</div>
                  <div className="text-muted-foreground">Events Per Second</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">99.99%</div>
                  <div className="text-muted-foreground">Event Delivery Guarantee</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">Global</div>
                  <div className="text-muted-foreground">Multi-Region Distribution</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Build Real-Time Systems
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Implement
            </span>
            <br />
            <span className="text-foreground">Event-Driven Architecture?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your business with real-time event processing. Let's discuss how Event Mesh 
            can power your next-generation applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-event-consultation"
            >
              Schedule Event Mesh Consultation →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-explore"
              >
                Explore All Technologies
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
