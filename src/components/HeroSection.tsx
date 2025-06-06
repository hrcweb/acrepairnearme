
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onSearch: () => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
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
          Find Top-Rated AC Repair
          <span className="block text-blue-200">Services in Florida</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Connect with licensed, verified HVAC professionals in your area. 
          Get quotes, read reviews, and book service today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
            onClick={onSearch}
          >
            <Search className="w-5 h-5 mr-2" />
            Find AC Repair Now
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">500+</div>
            <div className="text-blue-100">Verified Contractors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">24/7</div>
            <div className="text-blue-100">Emergency Service</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-200">4.8★</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
