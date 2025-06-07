
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BusinessList from "@/components/BusinessList";
import SearchFilters from "@/components/SearchFilters";
import HeroSection from "@/components/HeroSection";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import LocalRebateFinder from "@/components/LocalRebateFinder";
import HeatIndexVisualization from "@/components/HeatIndexVisualization";
import Footer from "@/components/Footer";

export interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website?: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
  insurance_verified: boolean;
  license_number?: string | null;
  created_at: string;
  updated_at: string;
  latitude?: number | null;
  longitude?: number | null;
  business_hours?: any;
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

  const handleLocationFilter = (location: string) => {
    setSearchLocation(location);
    filterBusinesses(location, serviceFilter, sortBy);
  };

  const handleServiceFilter = (service: string) => {
    setServiceFilter(service);
    filterBusinesses(searchLocation, service, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterBusinesses(searchLocation, serviceFilter, sort);
  };

  const filterBusinesses = (location: string, service: string, sort: string) => {
    let filtered = [...businesses];

    if (location) {
      filtered = filtered.filter(business => 
        business.city.toLowerCase().includes(location.toLowerCase()) ||
        business.zip_code.includes(location)
      );
    }

    if (service) {
      filtered = filtered.filter(business =>
        business.services?.some(s => 
          s.toLowerCase().includes(service.toLowerCase())
        )
      );
    }

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

    setFilteredBusinesses(filtered);
  };

  const handleSearch = () => {
    console.log('Search triggered');
  };

  const handleAreaSelect = (area: any) => {
    setSearchLocation(area.city);
    filterBusinesses(area.city, serviceFilter, sortBy);
  };

  if (error) {
    console.error('Query error:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onSearch={handleSearch} />
      
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
            <ServiceAreaMap onAreaSelect={handleAreaSelect} />
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
