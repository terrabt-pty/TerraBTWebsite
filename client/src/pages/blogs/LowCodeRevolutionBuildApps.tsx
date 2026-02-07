import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";
import { useTranslation } from "react-i18next";

export default function LowCodeRevolutionBuildApps() {
    const { t } = useTranslation();

    return (
        <BlogPost
            title={t('blogs.buildApps.title')}
            category={t('blogs.buildApps.category')}
            readTime={t('blogs.buildApps.readTime')}
            image={fioriImage}
            seoDescription={t('blogs.buildApps.seoDescription')}
            path="/blog/low-code-revolution-with-sap-build-apps"
            content={
                <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                        {t('blogs.buildApps.intro')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.section1Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.section1Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.section2Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.section2Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.section3Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.section3Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.section4Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.section4Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.section5Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.section5Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.buildApps.conclusionTitle')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.buildApps.conclusionContent')}
                    </p>
                </div>
            }
        />
    );
}
