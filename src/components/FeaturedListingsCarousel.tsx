
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LazyImage from "./LazyImage";

interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
}

const FeaturedListingsCarousel = () => {
  // Memoize the sample businesses to prevent recreation on every render
  const sampleBusinesses = useMemo<Business[]>(() => [
    {
      id: 1,
      name: "Cool Breeze HVAC Services",
      description: "Expert AC repair and installation with 24/7 emergency service",
      phone: "(305) 555-0123",
      address: "1234 Main St",
      city: "Miami",
      state: "FL",
      services: ["AC Repair", "Installation", "Emergency Service"],
      rating: 4.9,
      review_count: 127,
      featured: true
    },
    {
      id: 2,
      name: "Arctic Air Solutions",
      description: "Commercial and residential HVAC specialists serving Orlando",
      phone: "(407) 555-0456",
      address: "5678 Orange Ave",
      city: "Orlando",
      state: "FL",
      services: ["Commercial HVAC", "Duct Cleaning", "Maintenance"],
      rating: 4.8,
      review_count: 89,
      featured: true
    },
    {
      id: 3,
      name: "Sunshine Climate Control",
      description: "Trusted HVAC contractors with over 20 years experience",
      phone: "(813) 555-0789",
      address: "9101 Bay St",
      city: "Tampa",
      state: "FL",
      services: ["Heat Pump", "AC Repair", "Installation"],
      rating: 4.7,
      review_count: 156,
      featured: true
    },
    {
      id: 4,
      name: "Coastal Air Conditioning",
      description: "Professional AC repair and maintenance for Fort Lauderdale",
      phone: "(954) 555-0321",
      address: "2468 Beach Blvd",
      city: "Fort Lauderdale",
      state: "FL",
      services: ["AC Repair", "Preventive Maintenance", "Emergency Service"],
      rating: 4.9,
      review_count: 203,
      featured: true
    },
    {
      id: 5,
      name: "Precision HVAC Experts",
      description: "Energy-efficient solutions and expert installations",
      phone: "(904) 555-0654",
      address: "3579 River Rd",
      city: "Jacksonville",
      state: "FL",
      services: ["Energy Efficiency", "Installation", "Repair"],
      rating: 4.6,
      review_count: 78,
      featured: true
    },
    {
      id: 6,
      name: "Tropical Air Systems",
      description: "Reliable HVAC services for residential and commercial clients",
      phone: "(239) 555-0987",
      address: "1357 Palm Way",
      city: "Naples",
      state: "FL",
      services: ["Residential HVAC", "Commercial Service", "Duct Work"],
      rating: 4.8,
      review_count: 134,
      featured: true
    }
  ], []);

  // Memoize the query function to prevent recreation on every render
  const queryFn = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('featured', true)
        .order('rating', { ascending: false })
        .limit(8);
      
      if (error) {
        console.log('Using sample data due to database error:', error);
        return sampleBusinesses;
      }
      
      // Filter out any non-HVAC businesses from database results
      const hvacBusinesses = data?.filter(business => {
        const businessName = business.name.toLowerCase();
        const businessDescription = business.description?.toLowerCase() || '';
        const businessServices = business.services || [];
        
        // Check if it's HVAC/AC related
        const hvacKeywords = ['hvac', 'ac', 'air conditioning', 'heating', 'cooling', 'climate', 'refrigeration'];
        const isHvacBusiness = hvacKeywords.some(keyword => 
          businessName.includes(keyword) || 
          businessDescription.includes(keyword) ||
          businessServices.some((service: string) => service.toLowerCase().includes(keyword))
        );
        
        // Exclude jewelry and other non-HVAC businesses
        const nonHvacKeywords = ['jewelry', 'appraisal', 'diamond', 'gold', 'silver', 'watch', 'ring'];
        const isNonHvacBusiness = nonHvacKeywords.some(keyword => 
          businessName.includes(keyword) || 
          businessDescription.includes(keyword)
        );
        
        return isHvacBusiness && !isNonHvacBusiness;
      }) || [];
      
      // If no HVAC businesses in database, use sample data
      return hvacBusinesses.length > 0 ? hvacBusinesses as Business[] : sampleBusinesses;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return sampleBusinesses;
    }
  }, [sampleBusinesses]);

  const { data: featuredBusinesses, isLoading } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Memoize the AC images array to prevent recreation on every render
  const acImages = useMemo(() => [
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
  ], []);

  // Memoize the scroll function to prevent recreation on every render
  const scrollToLocationSelector = useCallback(() => {
    const element = document.getElementById('location-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize the getRandomAcImage function to prevent recreation on every render
  const getRandomAcImage = useCallback((businessId: number) => {
    // Use business ID to ensure consistent image assignment
    return acImages[businessId % acImages.length];
  }, [acImages]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured AC Repair Contractors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Top-rated HVAC professionals in your area
            </p>
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredBusinesses || featuredBusinesses.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured AC Repair Contractors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated HVAC professionals in Florida with verified reviews and instant quotes
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredBusinesses.map((business, index) => (
              <CarouselItem key={business.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Business Image */}
                  <div className="relative h-48 overflow-hidden">
                    <LazyImage
                      src={getRandomAcImage(business.id)}
                      alt={`${business.name} - AC Repair and HVAC Services`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                      {business.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {business.rating?.toFixed(1) || "5.0"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({business.review_count} reviews)
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">{business.city}, {business.state}</span>
                    </div>

                    {/* Services */}
                    {business.services && business.services.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {business.services.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {business.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{business.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {business.phone && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          asChild
                        >
                          <a href={`tel:${business.phone}`}>
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </a>
                        </Button>
                      )}
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/business/${business.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToLocationSelector}
          >
            Browse All Contractors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
