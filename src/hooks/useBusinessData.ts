
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useBusinessData = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  
  const { data: businessData, isLoading, error } = useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      console.log('useBusinessData: Fetching businesses from database...');
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }
      
      console.log('useBusinessData: Fetched businesses:', data?.length || 0);
      return data;
    },
  });

  useEffect(() => {
    if (businessData) {
      console.log('useBusinessData: Processing business data:', businessData.length);
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

  const applyFilters = useMemo(() => (
    searchLocation: string,
    serviceFilter: string,
    showAllContractors: boolean
  ) => {
    console.log('useBusinessData: Applying filters', { 
      searchLocation, 
      serviceFilter, 
      showAllContractors,
      businessesCount: businesses.length 
    });
    
    let filtered = [...businesses];

    if (!showAllContractors && searchLocation.trim()) {
      filtered = filtered.filter(business => 
        business.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
        business.zip_code.includes(searchLocation.trim()) ||
        business.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
        business.state.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (serviceFilter && serviceFilter !== "") {
      filtered = filtered.filter(business =>
        business.services?.some(s => 
          s.toLowerCase().includes(serviceFilter.toLowerCase())
        )
      );
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    console.log('useBusinessData: Filtered businesses result:', filtered.length);
    setFilteredBusinesses(filtered);
  }, [businesses]);

  return {
    businesses,
    filteredBusinesses,
    isLoading,
    error,
    applyFilters
  };
};
