
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/list-business/HeroSection";
import BenefitsSection from "@/components/list-business/BenefitsSection";
import HowItWorksSection from "@/components/list-business/HowItWorksSection";
import TrustIndicatorsSection from "@/components/list-business/TrustIndicatorsSection";
import SEOContentSection from "@/components/list-business/SEOContentSection";
import BusinessListingForm from "@/components/BusinessListingForm";

const ListBusiness = () => {
  const [showForm, setShowForm] = useState(false);

  // SEO optimization
  useEffect(() => {
    document.title = "List Your AC Repair Business | Join Florida's Top HVAC Directory";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'List your AC repair business in Florida\'s premier HVAC directory. Get more customers for commercial AC repair and heating services. Join 2,500+ verified contractors today!'
      );
    }

    // Add business listing structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "List Your AC Repair Business",
      "description": "Join Florida's premier AC repair and HVAC contractor directory",
      "url": window.location.href,
      "mainEntity": {
        "@type": "Service",
        "name": "Business Directory Listing",
        "provider": {
          "@type": "Organization",
          "name": "AC Repair Near Me Pro"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"List Your AC Repair Business"')) {
          script.remove();
        }
      });
    };
  }, []);

  if (showForm) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowForm(false)}
                className="flex items-center space-x-2 text-blue-600 hover:underline"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Plans</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AC</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <BusinessListingForm />
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
            </div>
          </div>
        </div>
      </header>

      <HeroSection />

      <main className="container mx-auto px-4 py-8">
        {/* Pricing Section with ID anchor */}
        <div id="pricing">
          <PricingSection onGetStartedFree={() => setShowForm(true)} />
        </div>

        <BenefitsSection />
        <HowItWorksSection />
        <TrustIndicatorsSection />
        <SEOContentSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default ListBusiness;
