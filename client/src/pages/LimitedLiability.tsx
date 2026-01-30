import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function LimitedLiability() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEOHead
                title="Limited Liability Policy - TerraBT | SAP BTP Consulting"
                description="Limited Liability Disclaimer for TerraBT services and website content."
                path="/limited-liability"
            />
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Limited Liability Disclaimer</h1>
                <p className="text-muted-foreground mb-8">Last Updated: January 30, 2026</p>

                <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. General Disclaimer</h2>
                        <p>
                            The information provided on the TerraBT website is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Professional Advice Disclaimer</h2>
                        <p>
                            The Site cannot and does not contain specific professional advice. The SAP BTP (Business Technology Platform) information is provided for general educational and informational purposes only and is not a substitute for professional advice.
                        </p>
                        <p className="mt-2">
                            Before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of specific professional advice through this website alone. The use or reliance of any information contained on the Site is solely at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by applicable law, in no event shall TerraBT, its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this service.
                        </p>
                        <p className="mt-2">
                            Under no circumstances will TerraBT be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the service or your account or the information contained therein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Technology Disclaimer</h2>
                        <p>
                            SAP and SAP Business Technology Platform are trademarks or registered trademarks of SAP SE or its affiliates in Germany and in several other countries. TerraBT is an independent consulting entity and is not affiliated with, endorsed by, or sponsored by SAP SE.
                        </p>
                        <p className="mt-2">
                            Any mention of third-party trademarks is for identification and reference regarding compatibility and expertise only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Limited Liability Disclaimer, please contact us at:
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
