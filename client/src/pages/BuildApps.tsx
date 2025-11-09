import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/ServiceHero";
import ServiceFeature from "@/components/ServiceFeature";
import SEOHead from "@/components/SEOHead";
import { Code, Zap, Users, Layout, Smartphone, Cloud, Workflow, Layers } from "lucide-react";

export default function BuildApps() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${t('services.buildApps.title')} - TerraBT`}
        description={t('services.buildApps.description')}
      />
      <Navigation />
      
      <ServiceHero
        title={t('services.buildApps.title')}
        description={t('services.buildApps.description')}
        icon={<Layout className="h-12 w-12" />}
      />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              No-Code/Low-Code Application Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Empower citizen developers and professional developers alike to create enterprise-grade applications rapidly with SAP Build Apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceFeature
              icon={<Code className="h-6 w-6" />}
              title="Visual Development"
              description="Build applications using intuitive drag-and-drop interfaces without writing code, accelerating development timelines."
            />
            <ServiceFeature
              icon={<Smartphone className="h-6 w-6" />}
              title="Cross-Platform Apps"
              description="Create applications that work seamlessly across web, iOS, and Android from a single development environment."
            />
            <ServiceFeature
              icon={<Cloud className="h-6 w-6" />}
              title="Cloud-Native Integration"
              description="Seamlessly integrate with SAP BTP services, backend systems, and third-party APIs for comprehensive functionality."
            />
            <ServiceFeature
              icon={<Zap className="h-6 w-6" />}
              title="Rapid Prototyping"
              description="Quickly create functional prototypes and MVPs to validate ideas and gather user feedback early in the development cycle."
            />
            <ServiceFeature
              icon={<Users className="h-6 w-6" />}
              title="Citizen Development"
              description="Enable business users to create their own applications while maintaining IT governance and security standards."
            />
            <ServiceFeature
              icon={<Workflow className="h-6 w-6" />}
              title="Pre-Built Templates"
              description="Leverage extensive library of pre-built templates and components to accelerate application development."
            />
            <ServiceFeature
              icon={<Layers className="h-6 w-6" />}
              title="Custom Extensions"
              description="Extend standard SAP applications with custom functionality tailored to your unique business requirements."
            />
            <ServiceFeature
              icon={<Code className="h-6 w-6" />}
              title="Professional Development"
              description="Pro-code capabilities for developers who need advanced customization and complex business logic implementation."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
              Our SAP Build Apps Implementation Approach
            </h2>
            
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Requirements Analysis</h3>
                <p className="text-muted-foreground">
                  We work closely with your stakeholders to understand business requirements, user needs, and integration points with existing systems.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Application Design</h3>
                <p className="text-muted-foreground">
                  Create intuitive user interfaces and experiences using SAP Build Apps' design capabilities, ensuring consistency with your brand and user expectations.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Development & Integration</h3>
                <p className="text-muted-foreground">
                  Build applications using visual development tools, integrate with backend systems, and implement business logic to meet your requirements.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Testing & Deployment</h3>
                <p className="text-muted-foreground">
                  Conduct thorough testing across devices and platforms, then deploy to production with proper governance and version control.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border hover-elevate transition-all">
                <h3 className="text-xl font-semibold mb-3 text-foreground">Training & Enablement</h3>
                <p className="text-muted-foreground">
                  Empower your team with training on SAP Build Apps, enabling citizen developers to create their own solutions while maintaining best practices.
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
