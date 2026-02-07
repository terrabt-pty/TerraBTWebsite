import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";
import { useTranslation } from "react-i18next";

export default function EnterpriseAutomationBuildProcess() {
    const { t } = useTranslation();

    return (
        <BlogPost
            title={t('blogs.buildAutomation.title')}
            category={t('blogs.buildAutomation.category')}
            readTime={t('blogs.buildAutomation.readTime')}
            image={fioriImage}
            seoDescription={t('blogs.buildAutomation.seoDescription')}
            path="/blog/enterprise-automation-with-sap-build-process-automation"
            content={
                <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                        {t('blogs.buildAutomation.intro')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.section1Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.section1Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.section2Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.section2Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.section3Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.section3Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.section4Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.section4Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.section5Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.section5Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildAutomation.conclusionTitle')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildAutomation.conclusionContent')}
                    </p>
                </div>
            }
        />
    );
}
