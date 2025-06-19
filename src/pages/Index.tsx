import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Star, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

export interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
  insurance_verified: boolean;
  license_number: string | null;
  created_at: string;
  updated_at: string;
  latitude: number | null;
  longitude: number | null;
  business_hours: any;
}

const Index = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showAllContractors, setShowAllContractors] = useState(false);

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

  // Fetch businesses from database
  const { data: businessData, isLoading, error } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      console.log('Fetching businesses from database...');
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }
      
      console.log('Fetched businesses:', data);
      return data;
    },
  });

  useEffect(() => {
    if (businessData) {
      console.log('Setting businesses data:', businessData);
      const transformedBusinesses = businessData.map(business => ({
        id: business.id,
        name: business.name,
        description: business.description,
        phone: business.phone,
        email: business.email,
        website: business.website,
        address: business.address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        services: business.services,
        rating: business.rating,
        review_count: business.review_count || 0,
        featured: business.featured || false,
        insurance_verified: business.insurance_verified || false,
        license_number: business.license_number,
        created_at: business.created_at,
        updated_at: business.updated_at,
        latitude: business.latitude,
        longitude: business.longitude,
        business_hours: business.business_hours
      }));
      setBusinesses(transformedBusinesses);
      setFilteredBusinesses(transformedBusinesses);
    }
  }, [businessData]);

  // Apply filters whenever any filter changes
  useEffect(() => {
    filterBusinesses(searchLocation, serviceFilter, sortBy);
  }, [businesses, searchLocation, serviceFilter, sortBy, showAllContractors]);

  const handleLocationFilter = (location: string) => {
    setSearchLocation(location);
    setShowAllContractors(false);
  };

  const handleBrowseAllContractors = () => {
    setShowAllContractors(true);
    setSearchLocation("");
    setServiceFilter("");
    setSortBy("name");
  };

  const handleViewAllServices = () => {
    setSearchLocation("");
    setServiceFilter("");
    setShowAllContractors(true);
  };

  const filterBusinesses = (location: string, service: string, sort: string) => {
    console.log('Filtering businesses:', { location, service, sort, showAllContractors });
    let filtered = [...businesses];

    if (!showAllContractors && location.trim()) {
      filtered = filtered.filter(business => 
        business.city.toLowerCase().includes(location.toLowerCase()) ||
        business.zip_code.includes(location.trim()) ||
        business.address.toLowerCase().includes(location.toLowerCase()) ||
        business.state.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (service && service !== "") {
      filtered = filtered.filter(business =>
        business.services?.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )
      );
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredBusinesses(filtered);
  };

  if (error) {
    console.error('Query error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO-optimized main content area */}
      <main role="main">
        <HeroSection onSearch={handleLocationFilter} />
        
        {/* Sticky CTA Bar */}
        <QuoteRequestCTA variant="sticky" />
        
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced SEO content section */}
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

        {/* Featured Listings Carousel */}
        <FeaturedListingsCarousel />

        {/* Quote Request Section */}
        <div className="container mx-auto px-4 py-16">
          <QuoteRequestCTA variant="inline" className="max-w-4xl mx-auto" />
        </div>

        {/* Enhanced content sections with more spacing */}
        <div className="container mx-auto px-4">
          <div className="mt-24 space-y-24">
            <LocalRebateFinder />
            <HeatIndexVisualization />
          </div>
          <WhyChooseUs />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
