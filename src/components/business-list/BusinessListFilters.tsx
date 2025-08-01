
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface BusinessListFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  serviceFilter: string;
  setServiceFilter: (filter: string) => void;
  ratingFilter: string;
  setRatingFilter: (filter: string) => void;
  verifiedFilter: boolean;
  setVerifiedFilter: (filter: boolean) => void;
  emergencyFilter: boolean;
  setEmergencyFilter: (filter: boolean) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  allServices: string[];
  onClearFilters: () => void;
}

const BusinessListFilters: React.FC<BusinessListFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  serviceFilter,
  setServiceFilter,
  ratingFilter,
  setRatingFilter,
  verifiedFilter,
  setVerifiedFilter,
  emergencyFilter,
  setEmergencyFilter,
  showFilters,
  setShowFilters,
  allServices,
  onClearFilters
}) => {
  return (
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
          {(searchQuery || serviceFilter || ratingFilter || verifiedFilter) && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessListFilters;
