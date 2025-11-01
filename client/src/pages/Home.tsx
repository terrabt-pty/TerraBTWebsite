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
  const expertiseAreas = [
    {
      icon: Smartphone,
      title: "Fiori App Development",
      description:
        "Build modern, responsive Fiori applications that deliver exceptional user experiences across all devices.",
    },
    {
      icon: Layers,
      title: "BTP Architecture & Design",
      description:
        "Strategic architecture planning and design for scalable SAP BTP solutions tailored to your business needs.",
    },
    {
      icon: Lightbulb,
      title: "Design Thinking",
      description:
        "User-centered design approach to create innovative solutions that solve real business challenges.",
    },
    {
      icon: Wifi,
      title: "Offline PWA Apps",
      description:
        "Progressive web applications with offline capabilities ensuring seamless user experience anywhere.",
    },
    {
      icon: Database,
      title: "SAP BTP Database Management",
      description:
        "Efficient database design, optimization, and management for high-performance BTP applications.",
    },
    {
      icon: Brain,
      title: "Claude AI Invoice Processing",
      description:
        "Intelligent invoice processing automation powered by Claude AI for accurate, efficient operations.",
    },
    {
      icon: GitBranch,
      title: "SAP BTP Integration Suite",
      description:
        "Seamless integration solutions connecting your SAP systems with cloud and on-premise applications.",
    },
    {
      icon: Zap,
      title: "Event Mesh",
      description:
        "Real-time event-driven architecture implementation for responsive, scalable business processes.",
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
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive SAP BTP solutions tailored to transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard
                key={index}
                icon={area.icon}
                title={area.title}
                description={area.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <ValueProposition
            image={teamImage}
            badge="Our Focus"
            title="100% SAP BTP Specialization"
            description="Unlike generalist consulting firms, we exclusively focus on SAP Business Technology Platform, ensuring deep expertise and cutting-edge solutions for your business."
            points={[
              "Dedicated team of certified SAP BTP experts",
              "Up-to-date with latest BTP features and best practices",
              "Proven track record across multiple industries",
            ]}
          />

          <ValueProposition
            image={globalImage}
            badge="Global Reach"
            title="Serving Underserved Markets Worldwide"
            description="We bring SAP BTP expertise to markets where local specialized consulting is limited, providing world-class solutions regardless of your location."
            points={[
              "Remote consulting capabilities across all time zones",
              "Multilingual support for international teams",
              "Understanding of regional business requirements",
            ]}
            imageOnRight
          />

          <ValueProposition
            image={aiImage}
            badge="Modern Technology"
            title="AI-Powered Innovation"
            description="Leveraging cutting-edge AI technology like Claude to enhance SAP BTP solutions, bringing automation and intelligence to your business processes."
            points={[
              "Claude AI integration for intelligent automation",
              "Machine learning-powered insights and analytics",
              "Future-proof solutions with modern technology stack",
            ]}
          />
        </div>
      </section>

      <section id="knowledge" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Knowledge Hub
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert insights and best practices for SAP BTP
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
              variant="outline"
              size="lg"
              onClick={scrollToKnowledge}
              data-testid="button-view-all-articles"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
