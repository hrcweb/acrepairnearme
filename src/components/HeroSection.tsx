
import { useState } from "react";
import { Search, MapPin, Shield, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustBadges from "./TrustBadges";
import QuoteRequestCTA from "./QuoteRequestCTA";

interface HeroSectionProps {
  onSearch: (location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    onSearch(searchLocation);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 sm:py-16 md:py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
        }}
      ></div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Find Top-Rated AC Repair Pros Near You
              <span className="block text-blue-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                Fast • Licensed • Trusted
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
              Connect with verified HVAC professionals in your area. Get free quotes from licensed contractors 
              specializing in AC repair, installation, and emergency services across Florida.
            </p>
            
            {/* Quick Search */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-stretch max-w-lg mb-6 sm:mb-8">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter your ZIP code or city..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 py-4 sm:py-3 w-full text-gray-900 bg-white border-0 rounded-lg text-base min-h-[52px]"
                  aria-label="Search for AC repair services by location"
                />
              </div>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-4 sm:py-3 rounded-lg text-base min-h-[52px] whitespace-nowrap"
                onClick={handleSearch}
                aria-label="Find AC repair contractors"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Contractors
              </Button>
            </div>

            {/* Trust Badges */}
            <TrustBadges variant="horizontal" showStats={true} />

            {/* Quick Stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">500+</div>
                <div className="text-sm sm:text-base text-blue-100">Verified Contractors</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">1 Hour</div>
                <div className="text-sm sm:text-base text-blue-100">Average Response Time</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">4.8★</div>
                <div className="text-sm sm:text-base text-blue-100">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Quote Form */}
          <div className="lg:pl-8">
            <QuoteRequestCTA variant="hero" className="max-w-md mx-auto lg:mx-0" />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12 sm:mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Why Choose Our Directory?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100 text-center">
            We connect you with Florida's most trusted AC professionals who are ready to solve your comfort problems.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Thoroughly Vetted</h3>
              <p className="text-sm text-blue-100">Licensed, insured, and background-checked professionals only</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Customer Verified</h3>
              <p className="text-sm text-blue-100">Real reviews from verified customers in your area</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Fast Response</h3>
              <p className="text-sm text-blue-100">Same-day service available for emergency AC repairs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
