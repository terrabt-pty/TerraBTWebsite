import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Lightbulb, Users, Target, Rocket, TestTube, RefreshCw } from "lucide-react";
import { Link } from "wouter";

export default function DesignThinking() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Users,
      title: "User Research & Empathy",
      description: "Deep understanding of your users' needs, pain points, and motivations.",
      features: [
        "User interviews and stakeholder engagement",
        "Persona development and journey mapping",
        "Contextual inquiry and observation",
        "Pain point and opportunity identification",
        "Empathy mapping workshops"
      ]
    },
    {
      icon: Target,
      title: "Problem Definition",
      description: "Clearly define the right problems to solve for maximum business impact.",
      features: [
        "Problem statement formulation",
        "Design challenge framing",
        "Opportunity area identification",
        "Success criteria definition",
        "Stakeholder alignment sessions"
      ]
    },
    {
      icon: Lightbulb,
      title: "Ideation Workshops",
      description: "Generate innovative solutions through structured creative sessions.",
      features: [
        "Facilitated brainstorming sessions",
        "SCAMPER and lateral thinking techniques",
        "Collaborative ideation workshops",
        "Idea prioritization and selection",
        "Concept development and refinement"
      ]
    },
    {
      icon: TestTube,
      title: "Prototyping",
      description: "Rapidly create tangible representations of ideas for validation.",
      features: [
        "Low-fidelity wireframes and sketches",
        "Interactive clickable prototypes",
        "High-fidelity mockups",
        "Proof of concept development",
        "MVP (Minimum Viable Product) design"
      ]
    },
    {
      icon: RefreshCw,
      title: "Testing & Iteration",
      description: "Validate solutions with real users and continuously improve.",
      features: [
        "Usability testing sessions",
        "A/B testing and experimentation",
        "User feedback collection and analysis",
        "Iterative design refinement",
        "Validation against success criteria"
      ]
    },
    {
      icon: Rocket,
      title: "Implementation Support",
      description: "Guide your team from validated concept to successful launch.",
      features: [
        "Technical feasibility assessment",
        "Implementation roadmap creation",
        "Agile sprint planning",
        "Development team collaboration",
        "Post-launch monitoring and optimization"
      ]
    }
  ];

  const benefits = [
    "Reduce risk by validating ideas before heavy investment",
    "Faster innovation with structured problem-solving approach",
    "Higher user adoption through user-centered solutions",
    "Cross-functional team alignment and engagement",
    "Measurable business outcomes and ROI"
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
              Innovation & Strategy
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                Design Thinking
              </span>
              <br />
              <span className="text-foreground">for SAP BTP Innovation</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              User-centered design approach to create innovative SAP BTP solutions that solve real business challenges. 
              We help you discover the right problems to solve and build solutions users love.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-workshop"
            >
              Schedule a Design Workshop →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Design Thinking Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven methodology for innovation and problem-solving in SAP BTP projects.
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
                Why Design Thinking Matters
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Innovation That Creates Real Value
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Design Thinking transforms how you approach SAP BTP projects. By focusing on user needs 
                and rapid iteration, we help you build solutions that deliver measurable business value.
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
                  <div className="text-4xl font-bold text-primary mb-2">3x</div>
                  <div className="text-muted-foreground">Faster Problem Resolution</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">75%</div>
                  <div className="text-muted-foreground">Reduced Development Waste</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">90%</div>
                  <div className="text-muted-foreground">Stakeholder Satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">100%</div>
                  <div className="text-muted-foreground">User-Centered Approach</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Transform Your Innovation Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Innovate
            </span>
            <br />
            <span className="text-foreground">with Design Thinking?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our facilitated Design Thinking workshop and discover innovative solutions 
            to your most challenging SAP BTP problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-book-workshop"
            >
              Book a Workshop →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-learn-more"
              >
                Learn More About Our Services
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
