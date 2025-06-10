
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  const { data: featuredBusinesses, isLoading } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('featured', true)
        .order('rating', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data as Business[];
    },
  });

  // Placeholder images for businesses
  const businessImages = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
  ];

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
                      src={businessImages[index % businessImages.length]}
                      alt={`${business.name} - HVAC Services`}
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
          <Button variant="outline" size="lg" asChild>
            <Link to="#location-selector">
              Browse All Contractors
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingsCarousel;
