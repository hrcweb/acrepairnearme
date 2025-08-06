
import React, { useState, useEffect, useMemo, useCallback } from "react";
import EnhancedBusinessCard from "./EnhancedBusinessCard";
import { getBusinessesByCity } from "@/data/sampleBusinesses";
import BusinessListHeader from "./business-list/BusinessListHeader";
import BusinessListFilters from "./business-list/BusinessListFilters";
import SampleDataNotice from "./business-list/SampleDataNotice";
import EmptyBusinessList from "./business-list/EmptyBusinessList";

interface Business {
  id: number;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string | null;
  email: string | null;
  website?: string | null;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
  insurance_verified: boolean;
  license_number: string | null;
  created_at: string;
}

interface ImprovedBusinessListProps {
  businesses: Business[];
  isLoading?: boolean;
  searchLocation?: string;
}

const ImprovedBusinessList: React.FC<ImprovedBusinessListProps> = ({ 
  businesses, 
  isLoading = false, 
  searchLocation = ""
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [emergencyFilter, setEmergencyFilter] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // AC/HVAC related images from Unsplash
  const acImages = useMemo(() => [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1555963633-1bb0c20b54f5?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1592928302636-c83cf0fa1a2a?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop"
  ], []);

  const allServices = useMemo(() => [
    "AC Repair", "Installation", "Emergency Service", "Maintenance", "Commercial HVAC", "Duct Cleaning", "Heat Pump"
  ], []);

  const getRandomAcImage = useCallback((businessId: number) => {
    return acImages[businessId % acImages.length];
  }, [acImages]);

  // Determine which businesses to show
  const { allBusinesses, usingSampleData } = useMemo(() => {
    console.log('ImprovedBusinessList: Determining business data source');
    
    if (businesses.length > 0) {
      console.log('Using real database businesses:', businesses.length);
      return { allBusinesses: businesses, usingSampleData: false };
    }
    
    if (searchLocation) {
      const sampleForLocation = getBusinessesByCity(searchLocation);
      const convertedSample = sampleForLocation.map((business, index) => ({
        id: 2000 + index,
        name: business.name,
        description: business.description,
        address: business.address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        phone: business.phone,
        email: business.email,
        website: business.website,
        services: business.services,
        rating: business.rating,
        review_count: business.review_count,
        featured: business.featured,
        insurance_verified: business.insurance_verified,
        license_number: business.license_number,
        created_at: new Date().toISOString()
      }));
      
      console.log('Using sample businesses for location:', searchLocation, convertedSample.length);
      return { allBusinesses: convertedSample, usingSampleData: true };
    }
    
    return { allBusinesses: [], usingSampleData: false };
  }, [businesses, searchLocation]);

  // Apply filters
  const filteredBusinesses = useMemo(() => {
    console.log('Applying filters to businesses:', allBusinesses.length);
    
    let filtered = [...allBusinesses];

    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services?.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (serviceFilter && serviceFilter !== "all") {
      filtered = filtered.filter(business =>
        business.services?.some(service => 
          service.toLowerCase().includes(serviceFilter.toLowerCase())
        )
      );
    }

    if (ratingFilter && ratingFilter !== "all") {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(business => 
        (business.rating || 0) >= minRating
      );
    }

    if (verifiedFilter) {
      filtered = filtered.filter(business => business.insurance_verified);
    }

    // Sort: featured first, then by rating
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });

    console.log('Filtered businesses result:', filtered.length);
    return filtered;
  }, [allBusinesses, searchQuery, serviceFilter, ratingFilter, verifiedFilter]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setServiceFilter("");
    setRatingFilter("");
    setVerifiedFilter(false);
    setEmergencyFilter(false);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse w-full max-w-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {usingSampleData && searchLocation && (
        <SampleDataNotice searchLocation={searchLocation} />
      )}

      <BusinessListFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        verifiedFilter={verifiedFilter}
        setVerifiedFilter={setVerifiedFilter}
        emergencyFilter={emergencyFilter}
        setEmergencyFilter={setEmergencyFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        allServices={allServices}
        onClearFilters={handleClearFilters}
      />

      <BusinessListHeader 
        searchLocation={searchLocation}
        filteredCount={filteredBusinesses.length}
      />

      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-7xl mx-auto">
          {filteredBusinesses.map((business) => (
            <EnhancedBusinessCard
              key={business.id}
              business={business}
              imageUrl={getRandomAcImage(business.id)}
              showPricing={true}
            />
          ))}
        </div>
      ) : (
        <EmptyBusinessList onClearFilters={handleClearFilters} />
      )}
    </div>
  );
};

export default ImprovedBusinessList;
