
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface SearchFilters {
  distance?: string;
  priceRange?: string;
  businessHours?: string;
  emergencyService?: boolean;
  minRating?: number;
}

interface SearchFiltersProps {
  onLocationChange: (location: string) => void;
  onServiceChange: (service: string) => void;
  onSortChange: (sort: string) => void;
}

const SearchFiltersComponent = ({ onLocationChange, onServiceChange, onSortChange }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0" align="start">
            <Card className="border-0 shadow-none">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Service Filter */}
                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select onValueChange={onServiceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Services</SelectItem>
                      <SelectItem value="repair">AC Repair</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="emergency">Emergency Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select onValueChange={onSortChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="reviews">Review Count</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Distance Filter */}
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <Select 
                    value={filters.distance || ""} 
                    onValueChange={(value) => updateFilter('distance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Select 
                    value={filters.priceRange || ""} 
                    onValueChange={(value) => updateFilter('priceRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">$ Budget-friendly</SelectItem>
                      <SelectItem value="moderate">$$ Moderate</SelectItem>
                      <SelectItem value="premium">$$$ Premium</SelectItem>
                      <SelectItem value="luxury">$$$$ Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Hours Filter */}
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select 
                    value={filters.businessHours || ""} 
                    onValueChange={(value) => updateFilter('businessHours', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open-now">Open Now</SelectItem>
                      <SelectItem value="weekends">Weekend Service</SelectItem>
                      <SelectItem value="extended">Extended Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emergency Service Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="emergency"
                    checked={filters.emergencyService || false}
                    onCheckedChange={(checked) => updateFilter('emergencyService', checked)}
                  />
                  <Label htmlFor="emergency">24/7 Emergency Service</Label>
                </div>

                {/* Minimum Rating Filter */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Select 
                    value={filters.minRating?.toString() || ""} 
                    onValueChange={(value) => updateFilter('minRating', parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                      <SelectItem value="3.0">3.0+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.distance && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Within {filters.distance} miles</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter('distance')}
              />
            </Badge>
          )}
          {filters.priceRange && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.priceRange === 'budget' ? '$' : filters.priceRange === 'moderate' ? '$$' : filters.priceRange === 'premium' ? '$$$' : '$$$$'}</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter('priceRange')}
              />
            </Badge>
          )}
          {filters.businessHours && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.businessHours === 'open-now' ? 'Open Now' : filters.businessHours === 'weekends' ? 'Weekend Service' : 'Extended Hours'}</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter('businessHours')}
              />
            </Badge>
          )}
          {filters.emergencyService && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>24/7 Emergency</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter('emergencyService')}
              />
            </Badge>
          )}
          {filters.minRating && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.minRating}+ stars</span>
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter('minRating')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFiltersComponent;
