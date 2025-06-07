
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BusinessList from "@/components/BusinessList";
import SearchFilters from "@/components/SearchFilters";
import HeroSection from "@/components/HeroSection";
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
      <HeroSection onSearch={handleHeroSearch} />
      
      <div className="container mx-auto px-4 py-8">
        <SearchFilters 
          onLocationChange={handleLocationFilter}
          onServiceChange={handleServiceFilter}
          onSortChange={handleSortChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3">
            <BusinessList 
              businesses={filteredBusinesses}
              isLoading={isLoading}
              searchLocation={searchLocation}
            />
          </div>
          
          <div className="space-y-8">
            <LocalRebateFinder />
            <HeatIndexVisualization />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
