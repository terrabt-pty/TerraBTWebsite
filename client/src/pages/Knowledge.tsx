import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

import teamImage from "@assets/generated_images/Team_collaboration_consulting_image_41a26f7b.webp";
import globalImage from "@assets/generated_images/Global_reach_world_map_bb3068a2.webp";
import aiImage from "@assets/AI_technology_integration_visual_7e9469a5_1769326356235.webp";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";
import pwaImage from "@assets/generated_images/PWA_technology_blog_image_598a891e.webp";

export default function Knowledge() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLocalizedPath();

  // All existing website blogs - expanded list from locales and additional BTP xID blogs.
  // `date` is the post's actual publish/creation date (oldest dates here come from when
  // each blog page was first added to the codebase) — it drives the sort order below and
  // is not displayed. Keep it set on every new entry so new posts sort correctly.
  const allBlogs = [
    {
      image: fioriImage,
      category: t('blog.post1.category'),
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      readTime: t('blog.post1.readTime'),
      slug: 'fiori-applications-sap-btp',
      date: '2025-11-09T00:57:29Z',
    },
    {
      image: pwaImage,
      category: t('blog.post2.category'),
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      readTime: t('blog.post2.readTime'),
      slug: 'offline-pwa-business-continuity',
      date: '2025-11-09T00:57:30Z',
    },
    {
      image: aiImage,
      category: t('blog.post3.category'),
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      readTime: t('blog.post3.readTime'),
      slug: 'ai-invoice-processing',
      date: '2025-11-09T00:57:31Z',
    },
    {
      image: globalImage,
      category: t('blog.post4.category'),
      title: t('blog.post4.title'),
      excerpt: t('blog.post4.excerpt'),
      readTime: t('blog.post4.readTime'),
      slug: 'mastering-sap-integration-suite',
      date: '2025-11-09T00:57:32Z',
    },
    {
      image: teamImage,
      category: t('blog.post5.category'),
      title: t('blog.post5.title'),
      excerpt: t('blog.post5.excerpt'),
      readTime: t('blog.post5.readTime'),
      slug: 'event-mesh-architecture-for-modern-enterprises',
      date: '2025-11-09T00:57:33Z',
    },
    {
      image: fioriImage,
      category: t('blog.post6.category'),
      title: t('blog.post6.title'),
      excerpt: t('blog.post6.excerpt'),
      readTime: t('blog.post6.readTime'),
      slug: 'database-optimization-strategies-for-sap-hana-cloud',
      date: '2025-11-09T00:57:34Z',
    },
    {
      image: globalImage,
      category: t('blog.post7.category'),
      title: t('blog.post7.title'),
      excerpt: t('blog.post7.excerpt'),
      readTime: t('blog.post7.readTime'),
      slug: 'sap-btp-architecture-best-practices',
      date: '2026-01-29T19:32:50+11:00',
    },
    {
      image: teamImage,
      category: t('blog.post8.category'),
      title: t('blog.post8.title'),
      excerpt: t('blog.post8.excerpt'),
      readTime: t('blog.post8.readTime'),
      slug: 'rapid-development-with-sap-cap',
      date: '2026-01-29T19:32:51+11:00',
    },
    {
      image: pwaImage,
      category: t('blog.post9.category'),
      title: t('blog.post9.title'),
      excerpt: t('blog.post9.excerpt'),
      readTime: t('blog.post9.readTime'),
      slug: 'low-code-revolution-with-sap-build-apps',
      date: '2026-01-29T19:32:52+11:00',
    },
    {
      image: aiImage,
      category: t('blog.post10.category'),
      title: t('blog.post10.title'),
      excerpt: t('blog.post10.excerpt'),
      readTime: t('blog.post10.readTime'),
      slug: 'enterprise-automation-with-sap-build-process-automation',
      date: '2026-01-29T19:32:53+11:00',
    },
    {
      image: fioriImage,
      category: t('blog.post11.category'),
      title: t('blog.post11.title'),
      excerpt: t('blog.post11.excerpt'),
      readTime: t('blog.post11.readTime'),
      slug: 'user-centered-innovation-with-design-thinking',
      date: '2026-01-29T19:32:54+11:00',
    },
    // Additional BTP xID focused blogs
    {
      image: globalImage,
      category: "BTP xID",
      title: "Finding Users Across the SAP BTP Landscape",
      excerpt: "How to discover every user, role, and assignment across your entire SAP BTP environment in seconds instead of hours.",
      readTime: "8 min",
      slug: 'finding-users-across-sap-btp-landscape',
      date: '2026-05-08T23:28:55+10:00',
    },
    {
      image: teamImage,
      category: "BTP xID",
      title: "Before and After BTP xID",
      excerpt: "A real-world look at how BTP access management changes when you have complete visibility across all accounts and environments.",
      readTime: "7 min",
      slug: 'before-and-after-btp-xid',
      date: '2026-05-11T19:59:40+10:00',
    },
    {
      image: pwaImage,
      category: "BTP xID",
      title: "BTP Service Keys & API Credentials",
      excerpt: "Best practices for managing, auditing and securing the long-lived credentials that power your SAP BTP integrations and automations.",
      readTime: "9 min",
      slug: 'btp-service-keys-api-credentials',
      date: '2026-05-11T22:23:38+10:00',
    },
    {
      image: aiImage,
      category: "BTP xID",
      title: "BTP Access Management",
      excerpt: "A practical guide to governing user access and API credentials across Global Accounts, Subaccounts, and Cloud Foundry environments.",
      readTime: "6 min",
      slug: 'btp-access-management',
      date: '2026-05-11T14:07:18+10:00',
    },
    {
      image: globalImage,
      category: "BTP xID",
      title: "SAP BTP Service Key Access: A Security Problem Most Offboarding Processes Miss",
      excerpt: "Service keys for inbound Integration Suite connections have no expiry and no metadata. Worse, Cloud Foundry org/space access doesn't sync with subaccount offboarding — so removed users can still read or delete production API credentials.",
      readTime: "4 min",
      slug: 'sap-btp-service-key-offboarding-risk',
      date: '2026-06-23T10:30:32+00:00',
    },
  ];

  // BTP xID blogs first, then everything else; newest first within each group.
  const sortedBlogs = [...allBlogs].sort((a, b) => {
    const aIsBtpXid = a.category === 'BTP xID';
    const bIsBtpXid = b.category === 'BTP xID';
    if (aIsBtpXid !== bIsBtpXid) return aIsBtpXid ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Knowledge Hub - TerraBT | SAP BTP Consulting"
        description="Expert insights, best practices, and guides for SAP BTP development, architecture, and access management."
        path="/knowledge"
      />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#0F172A" }}>
            {t('knowledge.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#475569" }}>
            {t('knowledge.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of guides, best practices, and insights on SAP BTP, Fiori, Integration Suite, and access governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((post, index) => (
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

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            More articles coming soon. Follow us on LinkedIn for the latest updates.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
