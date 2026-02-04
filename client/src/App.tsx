import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SUPPORTED_LANGUAGES } from "@/config/languages";
import LanguageRedirect from "@/components/LanguageRedirect";
import { getBrowserLanguage } from "@/i18n";
import Home from "@/pages/Home";
import BTPArchitecture from "@/pages/BTPArchitecture";
import FioriDevelopment from "@/pages/FioriDevelopment";
import DesignThinking from "@/pages/DesignThinking";
import OfflinePWA from "@/pages/OfflinePWA";
import DatabaseManagement from "@/pages/DatabaseManagement";
import AIProcessing from "@/pages/AIProcessing";
import IntegrationSuite from "@/pages/IntegrationSuite";
import EventMesh from "@/pages/EventMesh";
import CAPDevelopment from "@/pages/CAPDevelopment";
import BuildApps from "@/pages/BuildApps";
import BuildAutomation from "@/pages/BuildAutomation";
import FioriApplicationsSAPBTP from "@/pages/blogs/FioriApplicationsSAPBTP";
import OfflinePWABusinessContinuity from "@/pages/blogs/OfflinePWABusinessContinuity";
import AIInvoiceProcessing from "@/pages/blogs/AIInvoiceProcessing";
import MasteringIntegrationSuite from "@/pages/blogs/MasteringIntegrationSuite";
import EventMeshArchitecture from "@/pages/blogs/EventMeshArchitecture";
import DatabaseOptimizationStrategies from "@/pages/blogs/DatabaseOptimizationStrategies";
import BTPArchitectureBestPractices from "@/pages/blogs/BTPArchitectureBestPractices";
import RapidDevelopmentCAP from "@/pages/blogs/RapidDevelopmentCAP";
import LowCodeRevolutionBuildApps from "@/pages/blogs/LowCodeRevolutionBuildApps";
import EnterpriseAutomationBuildProcess from "@/pages/blogs/EnterpriseAutomationBuildProcess";
import UserCenteredInnovationDesignThinking from "@/pages/blogs/UserCenteredInnovationDesignThinking";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LimitedLiability from "@/pages/LimitedLiability";
import NotFound from "@/pages/not-found";
import CookieConsent from "@/components/CookieConsent";

function LanguageSync() {
  const [location] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);
    let detectedLang: string | null = null;

    // First, check if there's a language in the URL path
    if (pathSegments.length > 0) {
      const potentialLang = pathSegments[0];
      const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === potentialLang);
      if (isSupported) {
        detectedLang = potentialLang;
      }
    }

    // If no language in URL, use browser language detection (which respects localStorage and browser preferences)
    if (!detectedLang) {
      detectedLang = getBrowserLanguage();
    }

    if (i18n.language !== detectedLang) {
      i18n.changeLanguage(detectedLang);
    }
  }, [location, i18n]);

  return null;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  const supportedLangCodes = SUPPORTED_LANGUAGES.map(lang => lang.code).filter(code => code !== 'en');
  const langPattern = supportedLangCodes.join('|');

  return (
    <Switch>
      {/* English routes (no prefix) */}
      <Route path="/" component={Home} />
      <Route path="/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/services/fiori-development" component={FioriDevelopment} />
      <Route path="/services/design-thinking" component={DesignThinking} />
      <Route path="/services/offline-pwa" component={OfflinePWA} />
      <Route path="/services/database-management" component={DatabaseManagement} />
      <Route path="/services/ai" component={AIProcessing} />
      <Route path="/services/integration-suite" component={IntegrationSuite} />
      <Route path="/services/event-mesh" component={EventMesh} />
      <Route path="/services/cap-development" component={CAPDevelopment} />
      <Route path="/services/build-apps" component={BuildApps} />
      <Route path="/services/build-automation" component={BuildAutomation} />

      {/* Legal Pages */}
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/limited-liability" component={LimitedLiability} />

      {/* Blog post routes */}
      <Route path="/blog/fiori-applications-sap-btp" component={FioriApplicationsSAPBTP} />
      <Route path="/blog/offline-pwa-business-continuity" component={OfflinePWABusinessContinuity} />
      <Route path="/blog/ai-invoice-processing" component={AIInvoiceProcessing} />
      <Route path="/blog/mastering-integration-suite" component={MasteringIntegrationSuite} />
      <Route path="/blog/event-mesh-architecture" component={EventMeshArchitecture} />
      <Route path="/blog/database-optimization-strategies" component={DatabaseOptimizationStrategies} />
      <Route path="/blog/btp-architecture-best-practices" component={BTPArchitectureBestPractices} />
      <Route path="/blog/rapid-development-with-sap-cap" component={RapidDevelopmentCAP} />
      <Route path="/blog/low-code-revolution-with-sap-build-apps" component={LowCodeRevolutionBuildApps} />
      <Route path="/blog/enterprise-automation-with-sap-build-process-automation" component={EnterpriseAutomationBuildProcess} />
      <Route path="/blog/user-centered-innovation-with-design-thinking" component={UserCenteredInnovationDesignThinking} />

      {/* Localized routes for all supported languages */}
      <Route path="/:lang" component={Home} />
      <Route path="/:lang/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/:lang/services/fiori-development" component={FioriDevelopment} />
      <Route path="/:lang/services/design-thinking" component={DesignThinking} />
      <Route path="/:lang/services/offline-pwa" component={OfflinePWA} />
      <Route path="/:lang/services/database-management" component={DatabaseManagement} />
      <Route path="/:lang/services/ai" component={AIProcessing} />
      <Route path="/:lang/services/integration-suite" component={IntegrationSuite} />
      <Route path="/:lang/services/event-mesh" component={EventMesh} />
      <Route path="/:lang/services/cap-development" component={CAPDevelopment} />
      <Route path="/:lang/services/build-apps" component={BuildApps} />
      <Route path="/:lang/services/build-automation" component={BuildAutomation} />

      {/* Localized blog post routes */}
      <Route path="/:lang/blog/fiori-applications-sap-btp" component={FioriApplicationsSAPBTP} />
      <Route path="/:lang/blog/offline-pwa-business-continuity" component={OfflinePWABusinessContinuity} />
      <Route path="/:lang/blog/ai-invoice-processing" component={AIInvoiceProcessing} />
      <Route path="/:lang/blog/mastering-integration-suite" component={MasteringIntegrationSuite} />
      <Route path="/:lang/blog/event-mesh-architecture" component={EventMeshArchitecture} />
      <Route path="/:lang/blog/database-optimization-strategies" component={DatabaseOptimizationStrategies} />
      <Route path="/:lang/blog/btp-architecture-best-practices" component={BTPArchitectureBestPractices} />
      <Route path="/:lang/blog/rapid-development-with-sap-cap" component={RapidDevelopmentCAP} />
      <Route path="/:lang/blog/low-code-revolution-with-sap-build-apps" component={LowCodeRevolutionBuildApps} />
      <Route path="/:lang/blog/enterprise-automation-with-sap-build-process-automation" component={EnterpriseAutomationBuildProcess} />
      <Route path="/:lang/blog/user-centered-innovation-with-design-thinking" component={UserCenteredInnovationDesignThinking} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageRedirect />
        <LanguageSync />
        <ScrollToTop />
        <Toaster />
        <CookieConsent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
