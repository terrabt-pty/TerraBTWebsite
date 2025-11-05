import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExpertiseCard from "@/components/ExpertiseCard";
import ValueProposition from "@/components/ValueProposition";
import BlogCard from "@/components/BlogCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Layers,
  Lightbulb,
  Wifi,
  Database,
  Brain,
  GitBranch,
  Zap,
} from "lucide-react";

import teamImage from "@assets/generated_images/Team_collaboration_consulting_image_41a26f7b.png";
import globalImage from "@assets/generated_images/Global_reach_world_map_bb3068a2.png";
import aiImage from "@assets/generated_images/AI_technology_integration_visual_7e9469a5.png";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";
import pwaImage from "@assets/generated_images/PWA_technology_blog_image_598a891e.png";

export default function Home() {
  const { t } = useTranslation();
  
  const expertiseAreas = [
    {
      icon: Smartphone,
      title: t('services.fiori.title'),
      description: t('services.fiori.description'),
      href: "/services/fiori-development",
    },
    {
      icon: Layers,
      title: t('services.architecture.title'),
      description: t('services.architecture.description'),
      href: "/services/btp-architecture",
    },
    {
      icon: Lightbulb,
      title: t('services.designThinking.title'),
      description: t('services.designThinking.description'),
      href: "/services/design-thinking",
    },
    {
      icon: Wifi,
      title: t('services.pwa.title'),
      description: t('services.pwa.description'),
      href: "/services/offline-pwa",
    },
    {
      icon: Database,
      title: t('services.database.title'),
      description: t('services.database.description'),
      href: "/services/database-management",
    },
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      href: "/services/claude-ai",
    },
    {
      icon: GitBranch,
      title: t('services.integration.title'),
      description: t('services.integration.description'),
      href: "/services/integration-suite",
    },
    {
      icon: Zap,
      title: t('services.eventMesh.title'),
      description: t('services.eventMesh.description'),
      href: "/services/event-mesh",
    },
  ];

  const blogPosts = [
    {
      image: fioriImage,
      category: "Development",
      title: "Building Modern Fiori Applications with SAP BTP",
      excerpt:
        "Learn how to create responsive, user-friendly Fiori applications that leverage the full power of SAP Business Technology Platform for enhanced user experiences.",
      readTime: "5 min",
    },
    {
      image: pwaImage,
      category: "Technology",
      title: "Offline PWA: Ensuring Business Continuity Anywhere",
      excerpt:
        "Discover how Progressive Web Apps with offline capabilities can keep your business operations running smoothly even without internet connectivity.",
      readTime: "7 min",
    },
    {
      image: aiImage,
      category: "AI & Automation",
      title: "Claude AI for Intelligent Invoice Processing",
      excerpt:
        "Explore how Claude AI integration with SAP BTP transforms invoice processing with unprecedented accuracy and efficiency for your business.",
      readTime: "6 min",
    },
    {
      image: globalImage,
      category: "Integration",
      title: "Mastering SAP BTP Integration Suite",
      excerpt:
        "A comprehensive guide to connecting your enterprise systems using SAP BTP Integration Suite for seamless data flow and business processes.",
      readTime: "8 min",
    },
    {
      image: teamImage,
      category: "Architecture",
      title: "Event Mesh Architecture for Real-Time Business",
      excerpt:
        "Implementing event-driven architecture with SAP Event Mesh to create responsive, scalable solutions for modern business requirements.",
      readTime: "6 min",
    },
    {
      image: fioriImage,
      category: "Best Practices",
      title: "BTP Database Optimization Strategies",
      excerpt:
        "Essential strategies for optimizing your SAP BTP database performance to ensure fast, reliable access to your business-critical data.",
      readTime: "5 min",
    },
  ];

  const scrollToKnowledge = () => {
    const element = document.querySelector("#knowledge");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      <section id="services" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t('services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard
                key={index}
                icon={area.icon}
                title={area.title}
                description={area.description}
                href={area.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gradient-to-b from-trust/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <ValueProposition
            image={teamImage}
            badge={t('value.specialization.badge')}
            title={t('value.specialization.title')}
            description={t('value.specialization.description')}
            points={[
              t('value.specialization.point1'),
              t('value.specialization.point2'),
              t('value.specialization.point3'),
            ]}
          />

          <ValueProposition
            image={globalImage}
            badge={t('value.global.badge')}
            title={t('value.global.title')}
            description={t('value.global.description')}
            points={[
              t('value.global.point1'),
              t('value.global.point2'),
              t('value.global.point3'),
            ]}
            imageOnRight
          />

          <ValueProposition
            image={aiImage}
            badge={t('value.ai.badge')}
            title={t('value.ai.title')}
            description={t('value.ai.description')}
            points={[
              t('value.ai.point1'),
              t('value.ai.point2'),
              t('value.ai.point3'),
            ]}
          />
        </div>
      </section>

      <section id="knowledge" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t('knowledge.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('knowledge.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                image={post.image}
                category={post.category}
                title={post.title}
                excerpt={post.excerpt}
                readTime={post.readTime}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-trust text-trust-foreground hover:bg-trust"
              onClick={scrollToKnowledge}
              data-testid="button-view-all-articles"
            >
              Explore Knowledge Hub
            </Button>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
