import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.png";
import { useTranslation } from "react-i18next";

export default function RapidDevelopmentCAP() {
    const { t } = useTranslation();

    return (
        <BlogPost
            title={t('blogs.capDevelopment.title')}
            category={t('blogs.capDevelopment.category')}
            readTime={t('blogs.capDevelopment.readTime')}
            image={fioriImage}
            seoDescription={t('blogs.capDevelopment.seoDescription')}
            path="/blog/rapid-development-with-sap-cap"
            content={
                <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                        {t('blogs.capDevelopment.intro')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.section1Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.section1Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.section2Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.section2Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.section3Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.section3Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.section4Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.section4Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.section5Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.section5Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.capDevelopment.conclusionTitle')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.capDevelopment.conclusionContent')}
                    </p>
                </div>
            }
        />
    );
}
