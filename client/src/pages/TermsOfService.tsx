import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function TermsOfService() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEOHead
                title="Terms of Service - TerraBT | SAP BTP Consulting"
                description="Terms of Use for TerraBT website and services, governed by the laws of Australia."
                path="/terms-of-service"
            />
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Use</h1>
                <p className="text-muted-foreground mb-8">Last Updated: January 30, 2026</p>

                <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Use ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TerraBT ("we," "us," or "our"), concerning your access to and use of the TerraBT website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                        </p>
                        <p className="mt-2">
                            We are registered in Australia and have our registered office in New South Wales. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Australia, foreign jurisdictions, and international conventions.
                        </p>
                        <p className="mt-2">
                            The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Australian Consumer Law</h2>
                        <p>
                            Nothing in these Terms Of Use is intended to exclude, restrict, or modify any rights that you may have under the Australian Consumer Law (ACL) set out in Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth). If the ACL applies to you as a consumer, our liability to you for failure to comply with a consumer guarantee in respect of the supply of goods or services is limited to the extent permitted by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Limitations of Liability</h2>
                        <p>
                            To the full extent permitted by law, and subject to your rights under the ACL:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                We exclude all warranties, conditions, and representations (whether express or implied) that may apply to the Site or any Content on it.
                            </li>
                            <li>
                                We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with use of, or inability to use, our Site; or use of or reliance on any content displayed on our Site.
                            </li>
                            <li>
                                In particular, we will not be liable for loss of profits, sales, business, or revenue; business interruption; loss of anticipated savings; loss of business opportunity, goodwill or reputation; or any indirect or consequential loss or damage.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and defined following the laws of New South Wales, Australia. TerraBT and yourself irrevocably consent that the courts of New South Wales, Australia shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
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
