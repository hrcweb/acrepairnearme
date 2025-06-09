
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

  const scrollToSearch = () => {
    // Scroll to the main search area and trigger search
    const searchElement = document.querySelector('input[placeholder*="Enter city"]');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
      (searchElement as HTMLInputElement).focus();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
        }}
      ></div>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Professional AC Repair Near Me
          <span className="block text-blue-200">Commercial & Residential HVAC Services in Florida</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Find licensed, verified HVAC professionals for AC repair near me, commercial AC repair, 
          and emergency heating and air conditioning repair services. Get instant quotes from top-rated contractors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-8">
          <div className="relative flex-1 w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter city, ZIP code, or area for AC repair near me..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-3 w-full text-gray-900 bg-white border-0 rounded-l-lg sm:rounded-r-none"
              aria-label="Search for AC repair services by location"
            />
          </div>
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-r-lg sm:rounded-l-none"
            onClick={handleSearch}
            aria-label="Find AC repair contractors"
          >
            <Search className="w-5 h-5 mr-2" />
            Find AC Repair Near Me
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">500+</div>
            <div className="text-blue-100">Verified AC Repair Contractors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">24/7</div>
            <div className="text-blue-100">Emergency AC & Heating Service</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">4.8★</div>
            <div className="text-blue-100">Average Customer Rating</div>
          </div>
        </div>

        {/* Beat the Heat Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Beat the Heat with Professional AC Service</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't let extreme heat put your family at risk. Find qualified, licensed AC contractors in your area.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Licensed & Verified</h3>
              <p className="text-sm text-blue-100">All contractors are licensed, insured, and background-checked</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">Top-Rated Service</h3>
              <p className="text-sm text-blue-100">Read reviews from real customers in your neighborhood</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-3 text-blue-200" />
              <h3 className="font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-sm text-blue-100">Emergency AC repair available when you need it most</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3"
            onClick={scrollToSearch}
          >
            Find AC Contractors Near You
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
