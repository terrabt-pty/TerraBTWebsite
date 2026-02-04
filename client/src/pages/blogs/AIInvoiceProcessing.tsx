import { useTranslation } from "react-i18next";
import BlogPost from "@/pages/BlogPost";
import aiImage from "@assets/AI_technology_integration_visual_7e9469a5_1769326356235.png";

export default function AIInvoiceProcessing() {
  const { t } = useTranslation();

  return (
    <BlogPost
      title={t("blogs.ai.title")}
      category={t("blogs.ai.category")}
      readTime={t("blogs.ai.readTime")}
      image={aiImage}
      seoDescription={t("blogs.ai.seoDescription")}
      path="/blog/ai-invoice-processing"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t("blogs.ai.intro")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.section1Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.section1Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.section2Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.section2Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.section3Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.section3Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.section4Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.section4Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.section5Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.section5Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.ai.conclusionTitle")}</h2>
          <p className="leading-relaxed">
            {t("blogs.ai.conclusionContent")}
          </p>
        </div>
      }
    />
  );
}
