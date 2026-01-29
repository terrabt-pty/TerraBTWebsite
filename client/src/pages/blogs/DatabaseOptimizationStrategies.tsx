import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";
import { useTranslation } from "react-i18next";

export default function DatabaseOptimizationStrategies() {
  const { t } = useTranslation();

  return (
    <BlogPost
      title={t('blogs.databaseOptimization.title')}
      category={t('blogs.databaseOptimization.category')}
      readTime={t('blogs.databaseOptimization.readTime')}
      image={fioriImage}
      seoDescription={t('blogs.databaseOptimization.seoDescription')}
      path="/blog/database-optimization-strategies"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t('blogs.databaseOptimization.intro')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.section1Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.section1Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.section2Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.section2Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.section3Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.section3Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.section4Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.section4Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.section5Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.section5Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.databaseOptimization.conclusionTitle')}</h2>
          <p className="leading-relaxed">
            {t('blogs.databaseOptimization.conclusionContent')}
          </p>
        </div>
      }
    />
  );
}
