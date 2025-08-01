
import { useState, useEffect, useCallback } from "react";
import ImprovedBusinessList from "@/components/ImprovedBusinessList";
import HeroSection from "@/components/HeroSection";
import CountyTownSelector from "@/components/CountyTownSelector";
import LocalRebateFinder from "@/components/LocalRebateFinder";
import HeatIndexVisualization from "@/components/HeatIndexVisualization";
import FeaturedListingsCarousel from "@/components/FeaturedListingsCarousel";
import QuoteRequestCTA from "@/components/QuoteRequestCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOContent from "@/components/index/SEOContent";
import LocationSummaryCard from "@/components/index/LocationSummaryCard";
import NoLocationSelected from "@/components/index/NoLocationSelected";
import WhyChooseUs from "@/components/index/WhyChooseUs";
import { useBusinessData, type Business } from "@/hooks/useBusinessData";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [showAllContractors, setShowAllContractors] = useState(false);

  const { businesses, filteredBusinesses, isLoading, error, applyFilters } = useBusinessData();

  // Add SEO metadata effect
  useEffect(() => {
    document.title = "Find Top-Rated AC Repair Near Me | Licensed HVAC Contractors Florida | Free Quotes";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Connect with verified AC repair contractors near you in Florida. Get free quotes from licensed, insured HVAC professionals. Emergency service available 24/7. Compare top-rated contractors today!'
      );
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AC Repair Near Me - Find Local HVAC Contractors",
      "description": "Directory of verified AC repair and HVAC contractors across Florida with free quotes and emergency service",
      "url": window.location.href,
      "mainEntity": {
        "@type": "ItemList",
        "name": "AC Repair Contractors",
        "description": "List of verified AC repair and HVAC contractors in Florida"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"AC Repair Near Me - Find Local HVAC Contractors"')) {
          script.remove();
        }
      });
    };
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters(searchLocation, serviceFilter, showAllContractors);
  }, [searchLocation, serviceFilter, showAllContractors, applyFilters]);

  const handleLocationFilter = useCallback((location: string) => {
    console.log('Index: Location filter changed to:', location);
    setSearchLocation(location);
    setShowAllContractors(false);
  }, []);

  const handleBrowseAllContractors = useCallback(() => {
    console.log('Index: Browse all contractors clicked');
    setShowAllContractors(true);
    setSearchLocation("");
    setServiceFilter("");
  }, []);

  const handleViewAllServices = useCallback(() => {
    console.log('Index: View all services clicked');
    setSearchLocation("");
    setServiceFilter("");
    setShowAllContractors(true);
  }, []);

  if (error) {
    console.error('Query error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <main role="main">
        <HeroSection onSearch={handleLocationFilter} />
        
        <QuoteRequestCTA variant="sticky" />
        
        <div className="container mx-auto px-4 py-8">
          <SEOContent 
            onBrowseAll={handleBrowseAllContractors}
            onViewAll={handleViewAllServices}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1">
              {!showAllContractors && (
                <CountyTownSelector 
                  onTownSelect={handleLocationFilter} 
                  selectedTown={searchLocation}
                />
              )}
            </div>
            
            <div className="lg:col-span-2">
              {searchLocation || showAllContractors ? (
                <div className="space-y-6">
                  <LocationSummaryCard 
                    filteredBusinesses={filteredBusinesses}
                    searchLocation={searchLocation}
                    showAllContractors={showAllContractors}
                  />
                  <ImprovedBusinessList 
                    businesses={filteredBusinesses}
                    isLoading={isLoading}
                    searchLocation={showAllContractors ? "" : searchLocation}
                  />
                </div>
              ) : (
                <NoLocationSelected />
              )}
            </div>
          </div>
        </div>

        <FeaturedListingsCarousel />

        <div className="container mx-auto px-4 py-16">
          <QuoteRequestCTA variant="inline" className="max-w-4xl mx-auto" />
        </div>

        <div className="container mx-auto px-4">
          <div className="mt-24 space-y-24">
            <LocalRebateFinder />
            <HeatIndexVisualization />
          </div>
          <WhyChooseUs />
        </div>

        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
