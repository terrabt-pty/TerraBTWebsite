import { lazy, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface BlogDispatcherProps {
    slug: string;
}

const blogs = import.meta.glob('./**/*.tsx');

export default function BlogDispatcher({ slug }: BlogDispatcherProps) {
    const { i18n } = useTranslation();

    const LangComponent = useMemo(() => {
        const lang = i18n.language;
        const baseLang = lang.split('-')[0];

        // We consolidated folders to base languages only (e.g. 'de' instead of 'de-DE')
        const possiblePaths = [
            `./${baseLang}/${slug}.tsx`,
            `./en/${slug}.tsx`
        ];

        for (const path of possiblePaths) {
            if (blogs[path]) {
                return lazy(blogs[path] as any);
            }
        }

        // Ultimate fallback if even 'en' is missing (should not happen with our script)
        return () => <div className="min-h-screen flex items-center justify-center">Blog content not found.</div>;
    }, [i18n.language, slug]);

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LangComponent />
        </Suspense>
    );
}
