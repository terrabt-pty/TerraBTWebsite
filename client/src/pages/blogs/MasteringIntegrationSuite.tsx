import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";
import { useTranslation } from "react-i18next";

export default function MasteringIntegrationSuite() {
  const { t } = useTranslation();

  return (
    <BlogPost
      title={t('blogs.integrationSuite.title')}
      category={t('blogs.integrationSuite.category')}
      readTime={t('blogs.integrationSuite.readTime')}
      image={fioriImage}
      seoDescription={t('blogs.integrationSuite.seoDescription')}
      path="/blog/mastering-integration-suite"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t('blogs.integrationSuite.intro')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section1Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section1Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section2Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section2Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section3Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section3Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section4Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section4Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section5Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section5Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.section6Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.section6Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.integrationSuite.conclusionTitle')}</h2>
          <p className="leading-relaxed">
            {t('blogs.integrationSuite.conclusionContent')}
          </p>
        </div>
      }
    />
  );
}
