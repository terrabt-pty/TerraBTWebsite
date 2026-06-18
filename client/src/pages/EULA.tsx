import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function EULA() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEOHead
                title="End User License Agreement - BTP xID by TerraBT | SAP BTP Access & Credential Management"
                description="End User License Agreement (EULA) for the BTP xID desktop application and BTP xID Web. Governed by the laws of Australia."
                path="/eula"
            />
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">End User License Agreement</h1>
                <p className="text-muted-foreground mb-8">Last Updated: June 18, 2026</p>

                <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Agreement and Scope</h2>
                        <p>
                            This End User License Agreement ("EULA") is a legal agreement between you (either an individual or a single entity) and TerraBT Pty Ltd ("TerraBT", "we", "us", or "our") for the BTP xID desktop application (MacOS and Windows) and the BTP xID Web application at xid-web.terrabt.com (collectively, the "Software").
                        </p>
                        <p className="mt-2">
                            By installing, accessing, or using the Software, you agree to be bound by the terms of this EULA. If you do not agree to the terms of this EULA, do not install or use the Software.
                        </p>
                        <p className="mt-2">
                            This EULA applies specifically to the Software. For use of the TerraBT website and accounts portal, please refer to our <a href="/terms-of-service">Terms of Service</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. License Grant</h2>
                        <p>
                            TerraBT grants you a limited, non-exclusive, non-transferable, revocable license to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Install and use the BTP xID desktop application on devices you own or control; and</li>
                            <li>Access and use BTP xID Web</li>
                        </ul>
                        <p className="mt-2">
                            solely for your internal business purposes of managing users, role collections, service keys, and API credentials within SAP BTP Global Accounts and environments for which you have authorization.
                        </p>
                        <p className="mt-2">
                            The Software is licensed, not sold. Your rights are subject to your compliance with this EULA and payment of any applicable subscription fees.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Permitted Use</h2>
                        <p>
                            You may use the Software to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>View and search users, roles, and credentials across your SAP BTP landscape;</li>
                            <li>Manage user access and role assignments;</li>
                            <li>Create, rotate, and delete service keys and API credentials;</li>
                            <li>Apply custom governance metadata to credentials and users (stored in your own SAP BTP environment where supported).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Restrictions</h2>
                        <p>
                            You may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Copy, modify, reverse engineer, decompile, disassemble, or create derivative works of the Software, except to the extent expressly permitted by applicable law;</li>
                            <li>Rent, lease, lend, sell, sublicense, assign, distribute, publish, or otherwise transfer the Software or any rights under this EULA;</li>
                            <li>Use the Software for any purpose other than managing authorized SAP BTP environments;</li>
                            <li>Use the Software in any manner that violates applicable law or the rights of any third party;</li>
                            <li>Remove or alter any proprietary notices or labels on the Software;</li>
                            <li>Use the Software to provide services to third parties on a hosted or service bureau basis without prior written consent from TerraBT.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Subscription, Updates, and Termination</h2>
                        <p>
                            The Software requires a valid subscription for full functionality after any trial period. Your license is tied to an active subscription term.
                        </p>
                        <p className="mt-2">
                            TerraBT may provide updates, patches, or new versions. These are subject to the same terms as the original Software unless accompanied by a separate license.
                        </p>
                        <p className="mt-2">
                            Upon expiration, non-renewal, or termination of your subscription, the Software (or certain features) will cease to function. You must uninstall the desktop application and cease use of BTP xID Web upon termination of your rights.
                        </p>
                        <p className="mt-2">
                            TerraBT may terminate this EULA immediately if you breach any term. Upon termination, you must destroy all copies of the Software in your possession.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. No Warranty</h2>
                        <p>
                            THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                        </p>
                        <p className="mt-2">
                            TerraBT does not warrant that the Software will be uninterrupted, error-free, or free of viruses. You are solely responsible for any results obtained from use of the Software and for the security of your SAP BTP environments.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, TerraBT shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to the use or inability to use the Software, even if advised of the possibility of such damages.
                        </p>
                        <p className="mt-2">
                            Your sole remedy for dissatisfaction with the Software is to stop using it. Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.
                        </p>
                        <p className="mt-2">
                            See also our <a href="/limited-liability">Limited Liability Policy</a> and <a href="/privacy-policy">Privacy Policy</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Data and Privacy</h2>
                        <p>
                            The Software connects directly to your SAP BTP environments using SAP's standard authentication. TerraBT does not receive, store, or have access to your SAP BTP credentials, user data, or landscape information.
                        </p>
                        <p className="mt-2">
                            Any data collected by the Software (such as usage analytics or crash reports when enabled) is governed by our Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                        <p>
                            This EULA shall be governed by and construed in accordance with the laws of New South Wales, Australia. You irrevocably consent to the exclusive jurisdiction of the courts of New South Wales, Australia for any dispute arising under this EULA.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                        <p>
                            If you have questions about this End User License Agreement, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <p>Email: <a href="mailto:support@terrabt.com" className="text-primary hover:underline">support@terrabt.com</a></p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
