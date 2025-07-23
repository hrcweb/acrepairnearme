
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { FLORIDA_CITIES } from "@/data/cities";

interface SEOContentProps {
  onBrowseAll: () => void;
  onViewAll: () => void;
}

const SEOContent = ({ onBrowseAll, onViewAll }: SEOContentProps) => {
  // Get popular cities for linking
  const popularCities = FLORIDA_CITIES
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 12);

  const handleBrowseAll = () => {
    // Scroll to the location selector section
    const locationSelector = document.getElementById('location-selector');
    if (locationSelector) {
      locationSelector.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to the county selector if location selector isn't found
      const countySelector = document.querySelector('[data-testid="county-selector"]');
      if (countySelector) {
        countySelector.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Call the original callback if provided
    if (onBrowseAll) {
      onBrowseAll();
    }
  };

  const handleViewAll = () => {
    // Scroll to the featured listings section
    const featuredSection = document.querySelector('[data-testid="featured-listings"]');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to the county selector
      const countySelector = document.querySelector('[data-testid="county-selector"]');
      if (countySelector) {
        countySelector.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Call the original callback if provided
    if (onViewAll) {
      onViewAll();
    }
  };

  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        How Our AC Repair Directory Works
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
        We've simplified finding reliable AC repair contractors. Our platform connects you with 
        pre-screened, licensed professionals who specialize in residential and commercial HVAC services. 
        Get free quotes, compare reviews, and hire with confidence - all in one place.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Tell Us Your Needs</h3>
          <p className="text-gray-600">Submit your location and service requirements through our simple form</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Get Matched</h3>
          <p className="text-gray-600">We connect you with up to 3 qualified contractors in your area</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Compare & Hire</h3>
          <p className="text-gray-600">Review quotes, read reviews, and choose the best contractor for your job</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button 
          onClick={handleBrowseAll}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
        >
          Browse All Contractors
        </Button>
        <Button 
          onClick={handleViewAll}
          variant="outline"
          className="px-6 py-3 text-lg"
        >
          View All AC Repair Services
        </Button>
      </div>

      {/* Location-specific links for SEO */}
      <div className="bg-gray-50 rounded-lg p-8 mt-12">
        <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-blue-600 mr-2" />
          AC Repair Services by City
        </h3>
        <p className="text-gray-600 mb-6">
          Find qualified AC repair contractors in your specific Florida city. We serve all major metropolitan areas 
          with licensed, insured HVAC professionals available for emergency repairs and routine maintenance.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {popularCities.map(city => (
            <Link
              key={city.slug}
              to={`/ac-repair-${city.slug}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-2 px-3 bg-white rounded border transition-colors text-center"
            >
              AC Repair {city.name}
            </Link>
          ))}
        </div>
        
        <p className="text-sm text-gray-500">
          Don't see your city? We serve all of Florida with 24/7 emergency AC repair services. 
          <Button 
            variant="link" 
            className="text-blue-600 hover:text-blue-800 p-0 ml-1"
            onClick={handleBrowseAll}
          >
            View all available contractors
          </Button>
        </p>
      </div>
    </section>
  );
};

export default SEOContent;
