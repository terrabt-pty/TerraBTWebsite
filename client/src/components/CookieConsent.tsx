import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { X, Cookie } from "lucide-react";
import { initializeGA } from "@/lib/googleAnalytics";

declare global {
    interface Window {
        GEO_COUNTRY?: string;
    }
}

// List of EEA countries + UK + Switzerland
const GDPR_COUNTRIES = [
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
    "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
    "GB", "CH", "NO", "IS", "LI"
];

export default function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. Check if user has already made a choice
        const sensitivityChoice = localStorage.getItem("cookie-consent");

        if (sensitivityChoice === "accepted") {
            initializeGA();
            return;
        }

        if (sensitivityChoice === "declined") {
            return;
        }

        // 2. If no choice yet, determine Country
        // window.GEO_COUNTRY is injected by the Cloudflare Worker
        // For local development, we can force a region via URL or default to 'US' (hidden)
        const urlParams = new URLSearchParams(window.location.search);
        const testGeo = urlParams.get("test_geo");
        const country = testGeo || window.GEO_COUNTRY || "UNKNOWN";

        // 3. Apply logic based on Location
        if (GDPR_COUNTRIES.includes(country)) {
            // In EU/UK -> Show Banner, Wait for Consent (Strict GDPR)
            setIsVisible(true);
        } else {
            // Outside EU (US, AU, etc) -> Implied Consent
            // We load GA immediately, user can still opt-out via other means if we built them,
            // but standard practice for non-GDPR is opt-out, not opt-in.
            // Since we don't have a settings menu yet, we just load it.
            initializeGA();
        }
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
                            {t('cookie.description', 'We use cookies to enhance your browsing experience and analyze our traffic. In accordance with GDPR, we only load analytics cookies with your explicit consent.')}
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
                        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                    >
                        {t('cookie.accept', 'Accept Cookies')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
