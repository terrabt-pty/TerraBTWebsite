import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SUPPORTED_LANGUAGES } from "@/config/languages";
import LanguageRedirect from "@/components/LanguageRedirect";
import Home from "@/pages/Home";
import BTPArchitecture from "@/pages/BTPArchitecture";
import FioriDevelopment from "@/pages/FioriDevelopment";
import DesignThinking from "@/pages/DesignThinking";
import OfflinePWA from "@/pages/OfflinePWA";
import DatabaseManagement from "@/pages/DatabaseManagement";
import ClaudeAI from "@/pages/ClaudeAI";
import IntegrationSuite from "@/pages/IntegrationSuite";
import EventMesh from "@/pages/EventMesh";
import CAPDevelopment from "@/pages/CAPDevelopment";
import NotFound from "@/pages/not-found";

function LanguageSync() {
  const [location] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);
    let detectedLang = 'en';
    
    if (pathSegments.length > 0) {
      const potentialLang = pathSegments[0];
      const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === potentialLang);
      if (isSupported) {
        detectedLang = potentialLang;
      }
    }
    
    if (i18n.language !== detectedLang) {
      i18n.changeLanguage(detectedLang);
    }
  }, [location, i18n]);

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
      <Route path="/services/claude-ai" component={ClaudeAI} />
      <Route path="/services/integration-suite" component={IntegrationSuite} />
      <Route path="/services/event-mesh" component={EventMesh} />
      <Route path="/services/cap-development" component={CAPDevelopment} />
      
      {/* Localized routes for all supported languages */}
      <Route path="/:lang" component={Home} />
      <Route path="/:lang/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/:lang/services/fiori-development" component={FioriDevelopment} />
      <Route path="/:lang/services/design-thinking" component={DesignThinking} />
      <Route path="/:lang/services/offline-pwa" component={OfflinePWA} />
      <Route path="/:lang/services/database-management" component={DatabaseManagement} />
      <Route path="/:lang/services/claude-ai" component={ClaudeAI} />
      <Route path="/:lang/services/integration-suite" component={IntegrationSuite} />
      <Route path="/:lang/services/event-mesh" component={EventMesh} />
      <Route path="/:lang/services/cap-development" component={CAPDevelopment} />
      
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
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
