import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";
import { useTranslation } from "react-i18next";

export default function EventMeshArchitecture() {
  const { t } = useTranslation();

  return (
    <BlogPost
      title={t('blogs.eventMesh.title')}
      category={t('blogs.eventMesh.category')}
      readTime={t('blogs.eventMesh.readTime')}
      image={fioriImage}
      seoDescription={t('blogs.eventMesh.seoDescription')}
      path="/blog/event-mesh-architecture"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t('blogs.eventMesh.intro')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section1Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section1Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section2Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section2Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section3Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section3Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section4Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section4Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section5Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section5Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.section6Title')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.section6Content')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.eventMesh.conclusionTitle')}</h2>
          <p className="leading-relaxed">
            {t('blogs.eventMesh.conclusionContent')}
          </p>
        </div>
      }
    />
  );
}
