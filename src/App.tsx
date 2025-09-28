import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NGODashboard from "./pages/NGODashboard";
import VerificationFlow from "./pages/VerificationFlow";
import ProjectSubmission from "./pages/ProjectSubmission";
import VerificationManagement from "./pages/VerificationManagement";
import CommunityVerification from "./pages/CommunityVerification";
import InvestorMarketplace from "./pages/InvestorMarketplace";
import ProjectDetail from "./pages/ProjectDetail";
import InvestorPortfolio from "./pages/InvestorPortfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/ngo/submit-project" element={<ProjectSubmission />} />
          <Route path="/ngo/verification-management" element={<VerificationManagement />} />
          <Route path="/ngo/verification" element={<VerificationFlow />} />
          <Route path="/investor" element={<InvestorMarketplace />} />
          <Route path="/investor/project/:id" element={<ProjectDetail />} />
          <Route path="/investor/portfolio" element={<InvestorPortfolio />} />
          <Route path="/community-verification" element={<CommunityVerification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
