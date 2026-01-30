import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEOHead
                title="Privacy Policy - TerraBT | SAP BTP Consulting"
                description="Privacy Policy for TerraBT. We value your privacy and do not collect personal data."
                path="/privacy-policy"
            />
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last Updated: January 30, 2026</p>

                <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            TerraBT ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
                        </p>
                        <p className="mt-2">
                            This policy applies to your use of the TerraBT website. By using our website, you agree to the practices described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Collection of Personal Information</h2>
                        <p>
                            We prioritize your privacy. <strong>We do not collect, store, or process any personal information</strong> from visitors to our website. You can browse our site completely anonymously.
                        </p>
                        <p className="mt-2">
                            We do not track your browsing history, IP address, or location data for marketing purposes, nor do we sell or share any user data with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Local Storage and Preferences</h2>
                        <p>
                            To improve your experience, our website uses local storage (a technology similar to cookies) solely for the purpose of remembering your preferred language settings.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                <strong>Language Preference:</strong> We store a small piece of data in your browser to remember which language you selected (e.g., 'en', 'ja', 'sw'). This ensures that the website remains in your chosen language when you navigate between pages or return to the site later.
                            </li>
                        </ul>
                        <p className="mt-2">
                            This data is stored on your device only, is not linked to your identity, and is not transmitted to our servers for analysis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. External Links</h2>
                        <p>
                            Our website may contain links to external websites (such as LinkedIn or X/Twitter). Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <p className="mt-2">Email: <a href="mailto:contact@terrabt.com" className="text-primary hover:underline">contact@terrabt.com</a></p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
