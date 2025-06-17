import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import EnhancedBusinessCard from "./EnhancedBusinessCard";

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
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [emergencyFilter, setEmergencyFilter] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Verified AC/HVAC related images from Unsplash
  const acImages = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop", // AC unit installation
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop", // HVAC equipment
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop", // Indoor AC unit
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop", // AC maintenance
    "https://images.unsplash.com/photo-1555963633-1bb0c20b54f5?w=400&h=250&fit=crop", // HVAC system
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop", // AC condenser unit
    "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=250&fit=crop", // Modern AC unit
    "https://images.unsplash.com/photo-1592928302636-c83cf0fa1a2a?w=400&h=250&fit=crop", // Professional technician
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop", // HVAC technician at work
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop", // Air conditioning repair
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop", // HVAC maintenance
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"  // Professional HVAC work
  ];

  const allServices = ["AC Repair", "Installation", "Emergency Service", "Maintenance", "Commercial HVAC", "Duct Cleaning", "Heat Pump"];

  const getRandomAcImage = (businessId: number) => {
    // Use business ID to ensure consistent image assignment
    return acImages[businessId % acImages.length];
  };

  useEffect(() => {
    let filtered = [...businesses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.services?.some(service => 
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply service filter - only filter if not "all"
    if (serviceFilter && serviceFilter !== "all") {
      filtered = filtered.filter(business =>
        business.services?.some(service => 
          service.toLowerCase().includes(serviceFilter.toLowerCase())
        )
      );
    }

    // Apply rating filter - only filter if not "all"
    if (ratingFilter && ratingFilter !== "all") {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(business => 
        (business.rating || 0) >= minRating
      );
    }

    // Apply verified filter
    if (verifiedFilter) {
      filtered = filtered.filter(business => business.insurance_verified);
    }

    // Sort: featured first, then by rating
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });

    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery, serviceFilter, ratingFilter, verifiedFilter, emergencyFilter]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search contractors, services, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className={`mt-4 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {allServices.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Minimum Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                checked={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="verified" className="text-sm">Verified Only</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emergency"
                checked={emergencyFilter}
                onChange={(e) => setEmergencyFilter(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="emergency" className="text-sm">24/7 Emergency</label>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                Search: {searchQuery} ✕
              </Badge>
            )}
            {serviceFilter && serviceFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setServiceFilter("")}>
                Service: {serviceFilter} ✕
              </Badge>
            )}
            {ratingFilter && ratingFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setRatingFilter("")}>
                Rating: {ratingFilter}+ ✕
              </Badge>
            )}
            {verifiedFilter && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setVerifiedFilter(false)}>
                Verified ✕
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {searchLocation ? `AC Contractors in ${searchLocation}` : "AC Repair Contractors"}
          <span className="text-gray-500 font-normal ml-2">({filteredBusinesses.length} found)</span>
        </h2>
      </div>

      {/* Business Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              No contractors found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or browse all contractors in the area.
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setServiceFilter("");
              setRatingFilter("");
              setVerifiedFilter(false);
              setEmergencyFilter(false);
            }}>
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedBusinessList;
