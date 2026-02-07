import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";
import { useTranslation } from "react-i18next";

export default function UserCenteredInnovationDesignThinking() {
    const { t } = useTranslation();

    return (
        <BlogPost
            title={t('blogs.designThinking.title')}
            category={t('blogs.designThinking.category')}
            readTime={t('blogs.designThinking.readTime')}
            image={fioriImage}
            seoDescription={t('blogs.designThinking.seoDescription')}
            path="/blog/user-centered-innovation-with-design-thinking"
            content={
                <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                        {t('blogs.designThinking.intro')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.section1Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.section1Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.section2Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.section2Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.section3Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.section3Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.section4Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.section4Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.section5Title')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.section5Content')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">{t('blogs.designThinking.conclusionTitle')}</h2>
                    <p className="leading-relaxed">
                        {t('blogs.designThinking.conclusionContent')}
                    </p>
                </div>
            }
        />
    );
}
