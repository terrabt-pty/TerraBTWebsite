import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExpertiseCard from "@/components/ExpertiseCard";
import ValueProposition from "@/components/ValueProposition";
import BlogCard from "@/components/BlogCard";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
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
  Code,
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
    {
      icon: Code,
      title: t('services.cap.title'),
      description: t('services.cap.description'),
      href: "/services/cap-development",
    },
  ];

  const blogPosts = [
    {
      image: fioriImage,
      category: t('blog.post1.category'),
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      readTime: t('blog.post1.readTime'),
      slug: 'fiori-applications-sap-btp',
    },
    {
      image: pwaImage,
      category: t('blog.post2.category'),
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      readTime: t('blog.post2.readTime'),
      slug: 'offline-pwa-business-continuity',
    },
    {
      image: aiImage,
      category: t('blog.post3.category'),
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      readTime: t('blog.post3.readTime'),
      slug: 'claude-ai-invoice-processing',
    },
    {
      image: globalImage,
      category: t('blog.post4.category'),
      title: t('blog.post4.title'),
      excerpt: t('blog.post4.excerpt'),
      readTime: t('blog.post4.readTime'),
      slug: 'mastering-integration-suite',
    },
    {
      image: teamImage,
      category: t('blog.post5.category'),
      title: t('blog.post5.title'),
      excerpt: t('blog.post5.excerpt'),
      readTime: t('blog.post5.readTime'),
      slug: 'event-mesh-architecture',
    },
    {
      image: fioriImage,
      category: t('blog.post6.category'),
      title: t('blog.post6.title'),
      excerpt: t('blog.post6.excerpt'),
      readTime: t('blog.post6.readTime'),
      slug: 'database-optimization-strategies',
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
      <SEOHead 
        title="TerraBT - SAP BTP Consulting | 100% Specialized SAP Business Technology Platform"
        description={t('hero.subtitle')}
        path="/"
      />
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
                slug={post.slug}
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
