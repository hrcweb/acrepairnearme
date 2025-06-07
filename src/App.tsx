import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import BusinessDetail from "./pages/BusinessDetail";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import ListBusiness from "./pages/ListBusiness";
import Emergency from "./pages/Emergency";
import Admin from "./pages/Admin";
import BackOffice from "./pages/BackOffice";

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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/business/:id" element={<BusinessDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/list-business" element={<ListBusiness />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/back-office" element={<BackOffice />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
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
