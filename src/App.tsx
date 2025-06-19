
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import Index from "./pages/Index";
import BusinessDetail from "./pages/BusinessDetail";
import BusinessDetailDynamic from "./pages/BusinessDetailDynamic";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import ListBusiness from "./pages/ListBusiness";
import Emergency from "./pages/Emergency";
import Admin from "./pages/Admin";
import BackOffice from "./pages/BackOffice";
import ContactSupport from "./pages/ContactSupport";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContractorGuidelines from "./pages/ContractorGuidelines";
import SuccessStories from "./pages/SuccessStories";
import EnterpriseWelcome from "./pages/EnterpriseWelcome";
import About from "./pages/About";
import Advertising from "./pages/Advertising";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <BreadcrumbNavigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/business/:id" element={<BusinessDetailDynamic />} />
              <Route path="/business-static/:id" element={<BusinessDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/list-business" element={<ListBusiness />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/back-office" element={<BackOffice />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/enterprise-welcome" element={<EnterpriseWelcome />} />
              <Route path="/contact-support" element={<ContactSupport />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contractor-guidelines" element={<ContractorGuidelines />} />
              <Route path="/about" element={<About />} />
              <Route path="/advertising" element={<Advertising />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
