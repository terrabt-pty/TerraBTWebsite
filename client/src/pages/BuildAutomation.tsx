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
      title: "Workflow Automation",
      description: "Design and automate complex business workflows with visual modeling tools.",
      items: [
        "Visual workflow designer",
        "Business rule management",
        "Conditional branching logic",
        "Multi-step approvals",
        "Process orchestration"
      ]
    },
    {
      icon: Bot,
      title: "Robotic Process Automation",
      description: "Automate repetitive desktop tasks with intelligent bots.",
      items: [
        "Desktop automation bots",
        "UI interaction recording",
        "Screen scraping capabilities",
        "Excel automation",
        "System integration bots"
      ]
    },
    {
      icon: Zap,
      title: "Intelligent Document Processing",
      description: "Extract and process information from documents automatically.",
      items: [
        "AI-powered data extraction",
        "Multi-format document support",
        "Template-based extraction",
        "Machine learning models",
        "Validation and verification"
      ]
    },
    {
      icon: FileCheck,
      title: "Approval Workflows",
      description: "Streamline approval processes with automated routing.",
      items: [
        "Multi-level approvals",
        "Parallel and sequential routing",
        "Deadline management",
        "Escalation handling",
        "Mobile approval support"
      ]
    },
    {
      icon: TrendingUp,
      title: "Process Analytics",
      description: "Gain insights into process performance with built-in analytics.",
      items: [
        "Process performance metrics",
        "Bottleneck identification",
        "Real-time dashboards",
        "Historical trend analysis",
        "ROI calculation"
      ]
    },
    {
      icon: Shield,
      title: "Governance & Compliance",
      description: "Ensure compliance through automated controls and audit trails.",
      items: [
        "Complete audit logging",
        "Compliance rule enforcement",
        "Version control",
        "Access control management",
        "Regulatory compliance"
      ]
    }
  ];

  const benefits = [
    "90% reduction in manual processing time",
    "Near-zero error rates in automated processes",
    "Significant cost savings in operations",
    "Improved compliance and audit capability",
    "Enhanced employee productivity"
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
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl">
            <Badge className="bg-primary/10 text-primary border-primary/30 mb-6" data-testid="badge-category">
              Process Automation
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-1 via-primary to-trust bg-clip-text text-transparent">
                SAP Build Process Automation
              </span>
              <br />
              <span className="text-foreground">Services</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform repetitive tasks and complex workflows with intelligent automation. 
              Combine RPA, workflow, and AI to streamline business processes and drive operational excellence.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-start-project"
            >
              Start Your Automation Journey →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Intelligent Business Process Automation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage the power of intelligent automation to eliminate manual work and accelerate business processes.
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
                Why Automate with SAP Build?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                SAP Build Process Automation combines workflow, RPA, and AI capabilities to deliver comprehensive process automation solutions.
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
                  <h4 className="font-semibold text-foreground mb-2">1. Process Discovery</h4>
                  <p className="text-muted-foreground text-sm">
                    Identify automation opportunities and quantify potential benefits.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Solution Design</h4>
                  <p className="text-muted-foreground text-sm">
                    Design optimal automation architecture combining workflow, RPA, and AI.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Development & Configuration</h4>
                  <p className="text-muted-foreground text-sm">
                    Build automation solutions with visual tools and intelligent capabilities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">4. Testing & Validation</h4>
                  <p className="text-muted-foreground text-sm">
                    Ensure reliability across scenarios and validate business rules.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">5. Deployment & Monitoring</h4>
                  <p className="text-muted-foreground text-sm">
                    Deploy to production and establish continuous monitoring and optimization.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">6. Center of Excellence</h4>
                  <p className="text-muted-foreground text-sm">
                    Establish governance and scale automation across the organization.
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
