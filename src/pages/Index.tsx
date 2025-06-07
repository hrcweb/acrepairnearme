
import { useState } from "react";
import { Search, MapPin, Phone, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BusinessCard from "@/components/BusinessCard";
import PricingSection from "@/components/PricingSection";
import HeroSection from "@/components/HeroSection";
import LocalRebateFinder from "@/components/LocalRebateFinder";
import HeatIndexVisualization from "@/components/HeatIndexVisualization";
import SubscriptionButton from "@/components/SubscriptionButton";
import ManageSubscriptionButton from "@/components/ManageSubscriptionButton";
import AdvertisementButton from "@/components/AdvertisementButton";
import SearchFiltersComponent, { SearchFilters } from "@/components/SearchFilters";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for businesses with additional filter properties
const businesses = [
  {
    id: 1,
    name: "Cool Breeze AC Repair",
    rating: 4.8,
    reviewCount: 127,
    phone: "(305) 555-0123",
    address: "123 Ocean Drive, Miami, FL 33139",
    services: ["AC Repair", "Installation", "Maintenance"],
    description: "Professional AC repair and installation services in Miami. 24/7 emergency service available.",
    image: "/placeholder.svg",
    sponsored: true,
    verified: true,
    zipCodes: ["33139", "33140", "33141"],
    distance: 2.5,
    priceRange: "moderate",
    emergencyService: true,
    openNow: true,
    weekendService: true,
    extendedHours: false
  },
  {
    id: 2,
    name: "Florida Comfort Solutions",
    rating: 4.6,
    reviewCount: 89,
    phone: "(407) 555-0456",
    address: "456 Colonial Dr, Orlando, FL 32804",
    services: ["HVAC Repair", "Duct Cleaning", "Energy Audits"],
    description: "Comprehensive HVAC services for Central Florida. Licensed and insured professionals.",
    image: "/placeholder.svg",
    sponsored: false,
    verified: true,
    zipCodes: ["32804", "32805", "32806"],
    distance: 8.1,
    priceRange: "budget",
    emergencyService: false,
    openNow: false,
    weekendService: true,
    extendedHours: true
  },
  {
    id: 3,
    name: "Sunshine AC & Heating",
    rating: 4.9,
    reviewCount: 203,
    phone: "(813) 555-0789",
    address: "789 Tampa Bay Blvd, Tampa, FL 33607",
    services: ["AC Repair", "Heat Pump Service", "Indoor Air Quality"],
    description: "Award-winning AC repair service in Tampa Bay area. Family-owned since 1985.",
    image: "/placeholder.svg",
    sponsored: true,
    verified: true,
    zipCodes: ["33607", "33608", "33609"],
    distance: 15.3,
    priceRange: "premium",
    emergencyService: true,
    openNow: true,
    weekendService: false,
    extendedHours: true
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const { user, signOut, subscribed, subscriptionTier, subscriptionEnd } = useAuth();

  const handleSearch = () => {
    let filtered = businesses;
    
    // Text search
    if (searchQuery) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.zipCodes.some(zip => zip.includes(searchQuery)) ||
        business.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Service filter
    if (selectedService) {
      filtered = filtered.filter(business =>
        business.services.some(service => service.toLowerCase().includes(selectedService.toLowerCase()))
      );
    }

    // Apply advanced filters
    if (filters.distance) {
      const maxDistance = parseInt(filters.distance);
      filtered = filtered.filter(business => business.distance <= maxDistance);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(business => business.priceRange === filters.priceRange);
    }

    if (filters.businessHours) {
      if (filters.businessHours === 'open-now') {
        filtered = filtered.filter(business => business.openNow);
      } else if (filters.businessHours === 'weekends') {
        filtered = filtered.filter(business => business.weekendService);
      } else if (filters.businessHours === 'extended') {
        filtered = filtered.filter(business => business.extendedHours);
      }
    }

    if (filters.emergencyService) {
      filtered = filtered.filter(business => business.emergencyService);
    }

    if (filters.minRating) {
      filtered = filtered.filter(business => business.rating >= filters.minRating);
    }
    
    setFilteredBusinesses(filtered);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/199e8012-a0ff-42e4-bcb0-b5aa38e394c5.png" 
                alt="AC Repair Near Me" 
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-6 items-center">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Find Contractors</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">List Your Business</a>
              <a href="#advertising" className="text-gray-600 hover:text-blue-600 transition-colors">Advertise</a>
              <a href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {subscribed && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {subscriptionTier} Plan
                    </Badge>
                  )}
                  <ManageSubscriptionButton />
                  <Button variant="outline" onClick={signOut}>Sign Out</Button>
                </div>
              ) : (
                <Button variant="outline" asChild>
                  <a href="/auth">Sign In</a>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Enter zip code, city, or business name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Service needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac-repair">AC Repair</SelectItem>
                    <SelectItem value="installation">AC Installation</SelectItem>
                    <SelectItem value="maintenance">AC Maintenance</SelectItem>
                    <SelectItem value="duct-cleaning">Duct Cleaning</SelectItem>
                    <SelectItem value="heat-pump">Heat Pump Service</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              
              {/* Advanced Filters */}
              <SearchFiltersComponent 
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Top AC Repair Services in Florida ({filteredBusinesses.length} results)
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Listings */}
            <div className="lg:col-span-2 space-y-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Add Your Business CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Own an AC Business?</CardTitle>
                  <CardDescription className="text-blue-700">
                    Get more customers with a premium listing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <SubscriptionButton tier="Basic" price={29} className="w-full bg-blue-600 hover:bg-blue-700">
                      List Your Business
                    </SubscriptionButton>
                  ) : (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <a href="/auth">List Your Business</a>
                    </Button>
                  )}
                  <p className="text-sm text-blue-600 mt-2 text-center">
                    Starting at $29/month
                  </p>
                </CardContent>
              </Card>

              {/* Banner Ad Space */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200" id="advertising">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-700 mb-2 font-semibold">Premium Advertisement</div>
                  <div className="h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <h3 className="font-bold text-orange-800 mb-1">Your Business Here</h3>
                      <p className="text-sm text-orange-700">Reach 10,000+ customers monthly</p>
                    </div>
                  </div>
                  <AdvertisementButton 
                    adType="banner" 
                    price={199} 
                    className="w-full bg-orange-600 hover:bg-orange-700 mb-2"
                  >
                    Get Banner Ad - $199/month
                  </AdvertisementButton>
                  <AdvertisementButton 
                    adType="sponsored" 
                    price={99} 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Get Sponsored Listing - $99/month
                  </AdvertisementButton>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a href="#" className="block text-blue-600 hover:underline">Miami-Dade County</a>
                    <a href="#" className="block text-blue-600 hover:underline">Orange County (Orlando)</a>
                    <a href="#" className="block text-blue-600 hover:underline">Hillsborough County (Tampa)</a>
                    <a href="#" className="block text-blue-600 hover:underline">Broward County</a>
                    <a href="#" className="block text-blue-600 hover:underline">Palm Beach County</a>
                    <a href="#" className="block text-blue-600 hover:underline">Pinellas County</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Heat Index Visualization */}
      <HeatIndexVisualization />

      {/* Local Rebate Finder */}
      <LocalRebateFinder />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/199e8012-a0ff-42e4-bcb0-b5aa38e394c5.png" 
                  alt="AC Repair Near Me" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400">
                Florida's premier directory for AC repair and HVAC services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Contractors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List Your Business</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advertising</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@acrepairnearme.pro</li>
                <li>(855) AC-REPAIR</li>
                <li>Florida, USA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AC Repair Near Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
