import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceFeature from "@/components/ServiceFeature";
import SEOHead from "@/components/SEOHead";
import { Bot, Workflow, Zap, FileCheck, TrendingUp, Shield, Clock, RefreshCw } from "lucide-react";

export default function BuildAutomation() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${t('services.buildAutomation.title')} - TerraBT`}
        description={t('services.buildAutomation.description')}
      />
      <Navigation />
      
      <ServiceHero
        title={t('services.buildAutomation.title')}
        description={t('services.buildAutomation.description')}
        icon={<Bot className="h-12 w-12" />}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Intelligent Business Process Automation
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform repetitive tasks and complex workflows with SAP Build Process Automation's intelligent automation capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceFeature
              icon={<Workflow className="h-6 w-6" />}
              title="Workflow Automation"
              description="Design and automate complex business workflows with visual modeling tools, reducing manual effort and errors."
            />
            <ServiceFeature
              icon={<Bot className="h-6 w-6" />}
              title="Robotic Process Automation"
              description="Automate repetitive desktop tasks with intelligent bots that interact with applications just like human users."
            />
            <ServiceFeature
              icon={<Zap className="h-6 w-6" />}
              title="Intelligent Document Processing"
              description="Extract and process information from documents automatically using AI and machine learning capabilities."
            />
            <ServiceFeature
              icon={<FileCheck className="h-6 w-6" />}
              title="Approval Workflows"
              description="Streamline approval processes with automated routing, notifications, and decision management."
            />
            <ServiceFeature
              icon={<TrendingUp className="h-6 w-6" />}
              title="Process Analytics"
              description="Gain insights into process performance with built-in analytics and reporting capabilities."
            />
            <ServiceFeature
              icon={<Shield className="h-6 w-6" />}
              title="Governance & Compliance"
              description="Ensure compliance with business rules and regulations through automated controls and audit trails."
            />
            <ServiceFeature
              icon={<Clock className="h-6 w-6" />}
              title="Event-Driven Automation"
              description="Trigger automated processes based on business events and system triggers for real-time responsiveness."
            />
            <ServiceFeature
              icon={<RefreshCw className="h-6 w-6" />}
              title="Integration Hub"
              description="Connect seamlessly with SAP and third-party systems using pre-built connectors and integration capabilities."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
              Our Process Automation Implementation
            </h2>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Process Discovery & Analysis</h3>
                <p className="text-muted-foreground">
                  Identify automation opportunities by analyzing existing processes, quantifying potential benefits, and prioritizing use cases based on ROI.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Solution Design</h3>
                <p className="text-muted-foreground">
                  Design automated workflows and bot solutions that optimize processes while maintaining business logic and compliance requirements.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Development & Configuration</h3>
                <p className="text-muted-foreground">
                  Build automation solutions using SAP Build Process Automation's visual tools, configure integrations, and implement intelligent document processing.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Testing & Validation</h3>
                <p className="text-muted-foreground">
                  Thoroughly test automated processes across different scenarios, validate business rules, and ensure exception handling works correctly.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Deployment & Monitoring</h3>
                <p className="text-muted-foreground">
                  Deploy automation solutions to production, establish monitoring and alerting, and continuously optimize based on performance metrics.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Center of Excellence</h3>
                <p className="text-muted-foreground">
                  Help establish automation governance, best practices, and a Center of Excellence to scale automation initiatives across your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
