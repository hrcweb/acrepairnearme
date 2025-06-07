
import { useState, useEffect } from "react";
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
import ServiceAreaMap from "@/components/ServiceAreaMap";
import MobileNavigation from "@/components/MobileNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Business {
  id: number;
  name: string;
  rating: number;
  review_count: number;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  services: string[] | null;
  description: string | null;
  featured: boolean;
  insurance_verified: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [filters, setFilters] = useLocalStorage<SearchFilters>("searchFilters", {});
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut, subscribed, subscriptionTier, subscriptionEnd } = useAuth();
  const { toast } = useToast();
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery, selectedService, filters, businesses]);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });

      if (error) {
        toast({
          title: "Error loading businesses",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load businesses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = businesses;
    
    // Text search
    if (debouncedSearchQuery) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        business.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        business.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        business.state.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        business.zip_code.includes(debouncedSearchQuery) ||
        (business.services && business.services.some(service => 
          service.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        ))
      );
    }
    
    // Service filter
    if (selectedService) {
      filtered = filtered.filter(business =>
        business.services && business.services.some(service => 
          service.toLowerCase().includes(selectedService.toLowerCase())
        )
      );
    }

    // Apply advanced filters
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

  // Transform business data for BusinessCard component
  const transformBusinessForCard = (business: Business) => ({
    id: business.id,
    name: business.name,
    rating: business.rating,
    reviewCount: business.review_count,
    phone: business.phone || "",
    address: `${business.address}, ${business.city}, ${business.state} ${business.zip_code}`,
    services: business.services || [],
    description: business.description || "Professional service provider in your area.",
    image: "/placeholder.svg",
    sponsored: business.featured,
    verified: business.insurance_verified,
    zipCodes: [business.zip_code],
    distance: 0,
    priceRange: "moderate" as const,
    emergencyService: true,
    openNow: true,
    weekendService: true,
    extendedHours: false
  });

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
              <a href="/list-business" className="text-gray-600 hover:text-blue-600 transition-colors">List Your Business</a>
              <a href="#advertising" className="text-gray-600 hover:text-blue-600 transition-colors">Advertise</a>
              <a href="/emergency" className="text-red-600 hover:text-red-700 transition-colors font-medium">Emergency</a>
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
            <MobileNavigation />
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
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Loading businesses...</p>
                </div>
              ) : filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={transformBusinessForCard(business)} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No businesses found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Emergency CTA */}
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Need Emergency Service?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-red-600 hover:bg-red-700 mb-2" asChild>
                    <a href="/emergency">Find Emergency Service</a>
                  </Button>
                  <p className="text-sm text-red-600 text-center">
                    24/7 contractors available
                  </p>
                </CardContent>
              </Card>

              {/* Service Area Map */}
              <ServiceAreaMap />

              {/* Add Your Business CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Own an AC Business?</CardTitle>
                  <CardDescription className="text-blue-700">
                    Get more customers with a premium listing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href="/list-business">List Your Business</a>
                  </Button>
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
                <li><a href="/emergency" className="hover:text-white transition-colors">Emergency Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Businesses</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/list-business" className="hover:text-white transition-colors">List Your Business</a></li>
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
