import { useTranslation } from "react-i18next";
import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";

export default function FioriApplicationsSAPBTP() {
  const { t } = useTranslation();
  
  return (
    <BlogPost
      title={t("blogs.fiori.title")}
      category={t("blogs.fiori.category")}
      readTime={t("blogs.fiori.readTime")}
      image={fioriImage}
      seoDescription={t("blogs.fiori.seoDescription")}
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t("blogs.fiori.intro")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.section1Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.section1Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.section2Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.section2Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.section3Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.section3Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.section4Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.section4Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.section5Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.section5Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.fiori.conclusionTitle")}</h2>
          <p className="leading-relaxed">
            {t("blogs.fiori.conclusionContent")}
          </p>
        </div>
      }
    />
  );
}
