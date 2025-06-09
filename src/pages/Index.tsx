
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BusinessList from "@/components/BusinessList";
import HeroSection from "@/components/HeroSection";
import CountyTownSelector from "@/components/CountyTownSelector";
import LocalRebateFinder from "@/components/LocalRebateFinder";
import HeatIndexVisualization from "@/components/HeatIndexVisualization";
import Footer from "@/components/Footer";

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
  const [sortBy, setSortBy] = useState("rating");

  // Add SEO metadata effect
  useEffect(() => {
    document.title = "AC Repair Near Me | Commercial AC Repair Florida | 24/7 Emergency HVAC Service";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Find top-rated AC repair near me in Florida. Professional commercial AC repair, heating and air conditioning repair services. Licensed HVAC contractors available 24/7. Get quotes today!'
      );
    }

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AC Repair Near Me - Find Local HVAC Contractors",
      "description": "Directory of professional AC repair and commercial HVAC services across Florida",
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
      // Cleanup script on unmount
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
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });
      
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
  }, [businesses, searchLocation, serviceFilter, sortBy]);

  const handleLocationFilter = (location: string) => {
    console.log('Location filter changed:', location);
    setSearchLocation(location);
  };

  const handleServiceFilter = (service: string) => {
    console.log('Service filter changed:', service);
    setServiceFilter(service);
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort changed:', sort);
    setSortBy(sort);
  };

  const filterBusinesses = (location: string, service: string, sort: string) => {
    console.log('Filtering businesses:', { location, service, sort });
    let filtered = [...businesses];

    if (location.trim()) {
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

    // Sort businesses
    switch (sort) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => b.review_count - a.review_count);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    console.log('Filtered businesses:', filtered);
    setFilteredBusinesses(filtered);
  };

  const handleHeroSearch = (location: string) => {
    console.log('Hero search triggered with location:', location);
    setSearchLocation(location);
  };

  if (error) {
    console.error('Query error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO-optimized main content area */}
      <main role="main">
        <HeroSection onSearch={handleHeroSearch} />
        
        <div className="container mx-auto px-4 py-8">
          {/* SEO content section */}
          <section className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Find Trusted AC Repair Near Me & Commercial HVAC Services
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our directory connects you with licensed and verified AC repair contractors specializing in 
              residential and commercial heating and air conditioning repair near me. Whether you need 
              emergency AC repair, routine maintenance, or commercial HVAC services, find qualified 
              professionals in your area with verified reviews and instant quotes.
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <BusinessList 
                businesses={filteredBusinesses}
                isLoading={isLoading}
                searchLocation={searchLocation}
              />
            </div>
            
            <aside className="space-y-8" role="complementary">
              <LocalRebateFinder />
              <HeatIndexVisualization />
            </aside>
          </div>

          {/* Additional SEO content */}
          <section className="mt-16 bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why Choose Our AC Repair Directory?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Licensed & Verified Contractors</h4>
                <p className="text-sm">All AC repair contractors are verified for proper licensing, insurance, and credentials.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Commercial AC Repair Specialists</h4>
                <p className="text-sm">Find contractors specializing in commercial heating and air conditioning repair for businesses.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">24/7 Emergency Service</h4>
                <p className="text-sm">Access emergency AC repair services available around the clock for urgent situations.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Local Florida Coverage</h4>
                <p className="text-sm">Comprehensive coverage across Florida cities for both residential and commercial HVAC needs.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Instant Quotes & Reviews</h4>
                <p className="text-sm">Get instant quotes and read verified customer reviews before choosing your AC repair contractor.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">No Hidden Fees</h4>
                <p className="text-sm">Transparent pricing with no hidden fees. Compare quotes from multiple AC repair contractors.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
