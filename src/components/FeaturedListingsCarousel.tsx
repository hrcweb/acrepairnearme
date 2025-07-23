
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFeaturedBusinesses } from "@/components/carousel/useFeaturedBusinesses";
import { getRandomAcImage } from "@/components/carousel/businessImages";
import FeaturedBusinessCard from "@/components/carousel/FeaturedBusinessCard";

const FeaturedListingsCarousel = () => {
  const { data: featuredBusinesses, isLoading } = useFeaturedBusinesses();

  const scrollToLocationSelector = useCallback(() => {
    const element = document.getElementById('location-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
    <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50" data-testid="featured-listings">
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
            {featuredBusinesses.map((business) => (
              <CarouselItem key={business.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <FeaturedBusinessCard 
                  business={business} 
                  imageUrl={getRandomAcImage(business.id)} 
                />
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
