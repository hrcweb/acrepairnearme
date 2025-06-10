
import { useState } from "react";
import { Search, MapPin, Shield, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      
      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Professional AC Repair Near Me
          <span className="block text-blue-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
            Commercial & Residential HVAC Services in Florida
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed px-2">
          Find licensed, verified HVAC professionals for AC repair near me, commercial AC repair, 
          and emergency heating and air conditioning repair services. Get instant quotes from top-rated contractors.
        </p>
        
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter city, ZIP code, or area for AC repair near me..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-4 sm:py-3 w-full text-gray-900 bg-white border-0 rounded-lg text-base min-h-[52px]"
              aria-label="Search for AC repair services by location"
            />
          </div>
          <Button 
            size="lg" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-4 sm:py-3 rounded-lg text-base min-h-[52px]"
            onClick={handleSearch}
            aria-label="Find AC repair contractors"
          >
            <Search className="w-5 h-5 mr-2" />
            Find AC Repair Near Me
          </Button>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-2">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">500+</div>
            <div className="text-sm sm:text-base text-blue-100">Verified AC Repair Contractors</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">24/7</div>
            <div className="text-sm sm:text-base text-blue-100">Emergency AC & Heating Service</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-200">4.8★</div>
            <div className="text-sm sm:text-base text-blue-100">Average Customer Rating</div>
          </div>
        </div>

        {/* Beat the Heat Section */}
        <div className="mt-12 sm:mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 mx-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Beat the Heat with Professional AC Service</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100">
            Don't let extreme heat put your family at risk. Find qualified, licensed AC contractors in your area.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Licensed & Verified</h3>
              <p className="text-sm text-blue-100">All contractors are licensed, insured, and background-checked</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">Top-Rated Service</h3>
              <p className="text-sm text-blue-100">Read reviews from real customers in your neighborhood</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-4 sm:p-6">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2 text-base sm:text-lg">24/7 Emergency</h3>
              <p className="text-sm text-blue-100">Emergency AC repair available when you need it most</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
