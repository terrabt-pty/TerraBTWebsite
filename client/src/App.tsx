import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/btp-architecture" component={BTPArchitecture} />
      <Route path="/services/fiori-development" component={FioriDevelopment} />
      <Route path="/services/design-thinking" component={DesignThinking} />
      <Route path="/services/offline-pwa" component={OfflinePWA} />
      <Route path="/services/database-management" component={DatabaseManagement} />
      <Route path="/services/claude-ai" component={ClaudeAI} />
      <Route path="/services/integration-suite" component={IntegrationSuite} />
      <Route path="/services/event-mesh" component={EventMesh} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
