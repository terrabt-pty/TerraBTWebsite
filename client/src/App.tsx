import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import BTPArchitecture from "@/pages/BTPArchitecture";
import FioriDevelopment from "@/pages/FioriDevelopment";
import DesignThinking from "@/pages/DesignThinking";
import OfflinePWA from "@/pages/OfflinePWA";
import DatabaseManagement from "@/pages/DatabaseManagement";
import ClaudeAI from "@/pages/ClaudeAI";
import IntegrationSuite from "@/pages/IntegrationSuite";
import EventMesh from "@/pages/EventMesh";
import NotFound from "@/pages/not-found";

function LanguageSync() {
  const [location] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = location.startsWith('/ja') ? 'ja' : 'en';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [location, i18n]);

  return null;
}

function Router() {
  return (
    <Switch>
      {/* English routes */}
      <Route path="/" component={Home} />
      <Route path="/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/services/fiori-development" component={FioriDevelopment} />
      <Route path="/services/design-thinking" component={DesignThinking} />
      <Route path="/services/offline-pwa" component={OfflinePWA} />
      <Route path="/services/database-management" component={DatabaseManagement} />
      <Route path="/services/claude-ai" component={ClaudeAI} />
      <Route path="/services/integration-suite" component={IntegrationSuite} />
      <Route path="/services/event-mesh" component={EventMesh} />
      
      {/* Japanese routes */}
      <Route path="/ja" component={Home} />
      <Route path="/ja/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/ja/services/fiori-development" component={FioriDevelopment} />
      <Route path="/ja/services/design-thinking" component={DesignThinking} />
      <Route path="/ja/services/offline-pwa" component={OfflinePWA} />
      <Route path="/ja/services/database-management" component={DatabaseManagement} />
      <Route path="/ja/services/claude-ai" component={ClaudeAI} />
      <Route path="/ja/services/integration-suite" component={IntegrationSuite} />
      <Route path="/ja/services/event-mesh" component={EventMesh} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageSync />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
