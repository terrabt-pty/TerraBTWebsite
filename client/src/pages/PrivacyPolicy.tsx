import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEOHead
                title="Privacy Policy - BTP xID by TerraBT | SAP BTP Access & Credential Management"
                description="Privacy Policy for TerraBT and BTP xID. BTP xID connects directly to your SAP BTP tenants, we never receive or store your BTP data or credentials."
                path="/privacy-policy"
            />
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last Updated: June 18, 2026</p>

                <div className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            TerraBT ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
                        </p>
                        <p className="mt-2">
                            This policy applies to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>The TerraBT marketing website (terrabt.com and its localized versions)</li>
                            <li>The BTP xID desktop application (MacOS and Windows)</li>
                            <li>BTP xID Web (xid-web.terrabt.com)</li>
                            <li>The TerraBT License Server and accounts portal used to activate and validate BTP xID subscriptions</li>
                        </ul>
                        <p className="mt-2">
                            By using our website or any BTP xID product, you agree to the practices described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Collection of Personal Information</h2>
                        <p>
                            We prioritize your privacy. <strong>We do not collect, store, or process any personal information</strong> from visitors to our website or from your SAP BTP environments via BTP xID.
                        </p>
                        <p className="mt-2">
                            You can browse our website completely anonymously. When using BTP xID, all SAP BTP data stays on your device or browser and is never sent to TerraBT.
                        </p>
                        <p className="mt-2">
                            We do not track your browsing history, IP address, or location data for marketing purposes, nor do we sell or share any user data with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Local Storage, Preferences, and Device Data</h2>
                        <p>
                            To improve your experience, our website and BTP xID applications use local storage and local files solely for functional purposes.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                <strong>Website Language Preference:</strong> We store a small piece of data in your browser to remember which language you selected.
                            </li>
                            <li>
                                <strong>BTP xID Local Data:</strong> The desktop app stores connection history, UI preferences, and governance metadata locally on your machine (as described in the BTP xID section below). The web version uses browser storage for the current session only.
                            </li>
                        </ul>
                        <p className="mt-2">
                            All such data is stored on your device only, is not linked to your identity for our purposes, and is not transmitted to our servers for analysis (except the minimal license validation data described separately).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. BTP xID Desktop Application and Web Companion</h2>
                        <p>
                            BTP xID is a desktop application (and companion web application) that helps SAP BTP administrators discover, govern, and manage users, role collections, and API credentials across their SAP BTP landscape.
                        </p>
                        <p className="mt-2">
                            <strong>Direct connection, zero data exfiltration:</strong> BTP xID authenticates directly against SAP's own identity services using standard SAP OAuth 2.0 flows (the same mechanism used by the SAP BTP Cockpit). All communication with SAP BTP happens directly between your device/browser and SAP's infrastructure.
                        </p>
                        <p className="mt-2">
                            <strong>TerraBT never receives your BTP data.</strong> We do not collect, transmit, log, or have any access to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>SAP BTP user lists, emails, or identities</li>
                            <li>Role collections, scopes, or user assignments</li>
                            <li>Service instances, service keys, API credentials, or their secrets</li>
                            <li>Subaccount hierarchies, orgs, spaces, or any other landscape data</li>
                        </ul>
                        <p className="mt-2">
                            User lists, credential details, and all other SAP BTP information are fetched live and processed only on your local device (desktop app) or within your current browser session (BTP xID Web). Closing the application or browser tab removes the data from memory.
                        </p>
                        <p className="mt-2">
                            The applications may store the following information <strong>locally on your device only</strong>:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Connection metadata for recently accessed Global Accounts (subdomain and region) to improve the connection experience</li>
                            <li>UI state, filters, and display preferences</li>
                            <li>Custom governance metadata (e.g. owner, purpose, risk, expiry) that <em>you</em> attach to users or credentials. Where supported, this metadata is written back into your own SAP BTP CF service credential binding annotations/labels under the <code>xid.terrabt.com</code> namespace.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. License Validation and Accounts Portal</h2>
                        <p>
                            After the free trial period, BTP xID requires a paid subscription. License status is validated by contacting TerraBT's license infrastructure (accounts.terrabt.com / license services).
                        </p>
                        <p className="mt-2">
                            During license validation, the application sends only the minimal information required to check entitlement:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Your license key or a device-bound activation token</li>
                            <li>BTP xID version and operating system</li>
                            <li>A non-identifying, one-way device identifier used solely for concurrent license seat enforcement</li>
                        </ul>
                        <p className="mt-2">
                            <strong>No SAP BTP data or credentials are ever included</strong> in license validation requests or any other outbound communication to TerraBT.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. External Links</h2>
                        <p>
                            Our website may contain links to external websites (such as LinkedIn or X/Twitter). Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <p className="mt-2">Email: <a href="mailto:support@terrabt.com" className="text-primary hover:underline">support@terrabt.com</a></p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
