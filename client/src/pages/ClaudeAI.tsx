import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Brain, FileText, Zap, TrendingUp, Shield, Workflow } from "lucide-react";
import { Link } from "wouter";

export default function ClaudeAI() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: Brain,
      title: "Intelligent Data Extraction",
      description: "Advanced AI-powered extraction of invoice data with unprecedented accuracy.",
      features: [
        "Multi-format invoice processing (PDF, images, scans)",
        "Automatic field detection and extraction",
        "Header and line item recognition",
        "Table and complex layout understanding",
        "Handwritten text recognition"
      ]
    },
    {
      icon: Workflow,
      title: "SAP BTP Integration",
      description: "Seamless integration with SAP BTP services and backend systems.",
      features: [
        "Direct integration with SAP S/4HANA",
        "SAP Document Management Service connection",
        "Workflow automation triggers",
        "Real-time data validation",
        "Custom business rule implementation"
      ]
    },
    {
      icon: Zap,
      title: "Automated Processing",
      description: "End-to-end automation reducing manual intervention to near zero.",
      features: [
        "Intelligent routing and classification",
        "Auto-approval for low-risk invoices",
        "Exception handling workflows",
        "Duplicate detection and prevention",
        "Three-way matching automation"
      ]
    },
    {
      icon: Shield,
      title: "Validation & Compliance",
      description: "Ensure accuracy and regulatory compliance in every transaction.",
      features: [
        "Multi-level validation rules",
        "Tax calculation verification",
        "Compliance checking (VAT, GST)",
        "Audit trail and logging",
        "Data privacy and security (GDPR compliant)"
      ]
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Gain valuable insights from your invoice processing data.",
      features: [
        "Processing metrics and KPIs",
        "Accuracy and error rate tracking",
        "Cost savings analysis",
        "Supplier performance analytics",
        "Predictive cash flow insights"
      ]
    },
    {
      icon: FileText,
      title: "Training & Optimization",
      description: "Continuous improvement through AI learning and system optimization.",
      features: [
        "Custom model training for your invoices",
        "Continuous learning from corrections",
        "Template-based processing optimization",
        "Feedback loop implementation",
        "Regular accuracy improvements"
      ]
    }
  ];

  const benefits = [
    "95%+ accuracy rate reducing manual corrections",
    "80% faster invoice processing time",
    "70% reduction in processing costs",
    "Near-zero data entry errors",
    "Real-time processing status visibility"
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
              AI & Automation
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-chart-5 via-chart-3 to-primary bg-clip-text text-transparent">
                Claude AI
              </span>
              <br />
              <span className="text-foreground">Invoice Processing</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Intelligent invoice processing automation powered by Claude AI for accurate, efficient operations. 
              Transform your accounts payable process with cutting-edge AI technology integrated with SAP BTP.
            </p>

            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-automate-invoices"
            >
              Automate Your Invoices →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              AI-Powered Invoice Automation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage Claude AI's advanced capabilities for intelligent invoice processing and automation.
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
                The Power of Claude AI
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Transform Your Invoice Processing
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Claude AI brings human-level understanding to invoice processing. Handle complex layouts, 
                multiple languages, and edge cases that traditional OCR systems struggle with.
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
                  <div className="text-4xl font-bold text-primary mb-2">95%+</div>
                  <div className="text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">80%</div>
                  <div className="text-muted-foreground">Time Reduction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">70%</div>
                  <div className="text-muted-foreground">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-trust mb-2">24/7</div>
                  <div className="text-muted-foreground">Processing Availability</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-trust/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-urgency/10 text-urgency border-urgency/30 mb-6">
            ⚡ Start Automating Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-chart-4 via-primary to-urgency bg-clip-text text-transparent">
              Ready to Eliminate
            </span>
            <br />
            <span className="text-foreground">Manual Invoice Processing?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how Claude AI can revolutionize your accounts payable process with 
            intelligent automation and unprecedented accuracy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="bg-urgency text-urgency-foreground hover:bg-urgency shadow-lg shadow-urgency/20"
              data-testid="button-demo"
            >
              Request a Demo →
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-trust text-trust-foreground hover:bg-trust"
                data-testid="button-other-services"
              >
                See Other AI Solutions
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
