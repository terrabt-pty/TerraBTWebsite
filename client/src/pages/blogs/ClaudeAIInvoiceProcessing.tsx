import { useTranslation } from "react-i18next";
import BlogPost from "@/pages/BlogPost";
import aiImage from "@assets/AI_technology_integration_visual_7e9469a5_1769326356235.png";

export default function ClaudeAIInvoiceProcessing() {
  const { t } = useTranslation();
  
  return (
    <BlogPost
      title={t("blogs.claudeAI.title")}
      category={t("blogs.claudeAI.category")}
      readTime={t("blogs.claudeAI.readTime")}
      image={aiImage}
      seoDescription={t("blogs.claudeAI.seoDescription")}
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {t("blogs.claudeAI.intro")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.section1Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.section1Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.section2Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.section2Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.section3Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.section3Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.section4Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.section4Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.section5Title")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.section5Content")}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{t("blogs.claudeAI.conclusionTitle")}</h2>
          <p className="leading-relaxed">
            {t("blogs.claudeAI.conclusionContent")}
          </p>
        </div>
      }
    />
  );
}
