import { useTranslation } from "react-i18next";
import BlogPost from "@/pages/BlogPost";
import pwaImage from "@assets/generated_images/PWA_technology_blog_image_598a891e.webp";

export default function OfflinePWABusinessContinuity() {
  const { t } = useTranslation();

  return (
    <BlogPost
      title={t("blogs.pwa.title")}
      category={t("blogs.pwa.category")}
      readTime={t("blogs.pwa.readTime")}
      image={pwaImage}
      seoDescription={t("blogs.pwa.seoDescription")}
      path="/blog/offline-pwa-business-continuity"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t("blogs.pwa.intro")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.section1Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.section1Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.section2Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.section2Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.section3Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.section3Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.section4Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.section4Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.section5Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.section5Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.pwa.conclusionTitle")}</h2>
          <p className="leading-relaxed">
            {t("blogs.pwa.conclusionContent")}
          </p>
        </div>
      }
    />
  );
}
