
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
  const [selectedTier, setSelectedTier] = useState<string>('free');

  // Enhanced SEO optimization
  useEffect(() => {
    // Update title and meta description
    document.title = "List Your AC Repair Business | Join Florida's Top HVAC Directory - AC Repair Near Me";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'List your AC repair business in Florida\'s premier HVAC directory. Get more customers, featured listings, analytics & priority support. Join 2,500+ verified contractors. Free basic listing!'
      );
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 
        'list ac repair business, hvac contractor directory, commercial ac repair listing, florida hvac directory, ac repair marketing, hvac lead generation'
      );
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'List Your AC Repair Business | Join Florida\'s Top HVAC Directory');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Get more customers for your AC repair business. Featured listings, analytics, priority support. Join 2,500+ verified contractors in Florida\'s top HVAC directory.');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }

    // Add business listing structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "List Your AC Repair Business",
      "description": "Join Florida's premier AC repair and HVAC contractor directory to get more customers",
      "url": window.location.href,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://acrepairnearme.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "List Your Business"
          }
        ]
      },
      "mainEntity": {
        "@type": "Service",
        "name": "Business Directory Listing",
        "description": "Professional HVAC contractor directory listing service",
        "provider": {
          "@type": "Organization",
          "name": "AC Repair Near Me Pro",
          "url": "https://acrepairnearme.pro"
        },
        "areaServed": {
          "@type": "State",
          "name": "Florida"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"List Your AC Repair Business"')) {
          script.remove();
        }
      });
    };
  }, []);

  const handleGetStarted = (tier: string = 'free') => {
    setSelectedTier(tier);
    setShowForm(true);
  };

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
          <BusinessListingForm initialTier={selectedTier} />
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
          <PricingSection onGetStartedFree={() => handleGetStarted('free')} />
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
