import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Cookie } from "lucide-react";
import { initializeGA } from "@/lib/googleAnalytics";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

export default function CookieConsent() {
    const { t } = useTranslation();
    const { getLocalizedPath } = useLocalizedPath();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const choice = localStorage.getItem("cookie-consent");
        if (choice === "accepted") {
            initializeGA();
            return;
        }
        if (choice === "declined") {
            return;
        }
        setIsVisible(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
        initializeGA();
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t shadow-lg animate-in slide-in-from-bottom-full duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-primary/10 rounded-full mt-1 hidden md:block">
                        <Cookie className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">
                            {t('cookie.title', 'We value your privacy')}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                            {t('cookie.description', 'We use cookies to enhance your browsing experience. We never sell your data to anyone.')}{' '}
                            <a href={getLocalizedPath('/privacy-policy')} className="underline hover:no-underline">{t('cookie.privacyLink', 'Learn more in our privacy policy.')}</a>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        onClick={handleDecline}
                        className="w-full md:w-auto whitespace-nowrap"
                    >
                        {t('cookie.decline', 'Decline')}
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="w-full md:w-auto btpxid-btn-primary whitespace-nowrap"
                    >
                        {t('cookie.accept', 'Accept Cookies')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
