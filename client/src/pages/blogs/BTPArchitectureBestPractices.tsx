import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";
import { useTranslation } from "react-i18next";

export default function BTPArchitectureBestPractices() {
    const { t } = useTranslation();

    return (
        <BlogPost
            title={t('blogs.btpArchitecture.title')}
            category={t('blogs.btpArchitecture.category')}
            readTime={t('blogs.btpArchitecture.readTime')}
            image={fioriImage}
            seoDescription={t('blogs.btpArchitecture.seoDescription')}
            path="/blog/btp-architecture-best-practices"
            content={
                <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                        {t('blogs.btpArchitecture.intro')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.section1Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.section1Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.section2Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.section2Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.section3Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.section3Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.section4Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.section4Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.section5Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.section5Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.btpArchitecture.conclusionTitle')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.btpArchitecture.conclusionContent')}
                    </p>
                </div>
            }
        />
    );
}
