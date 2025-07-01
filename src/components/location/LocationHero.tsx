
import React from "react";
import { CityData } from "@/data/cities";
import { Business } from "@/pages/Index";
import TrustBadges from "@/components/TrustBadges";
import QuoteRequestCTA from "@/components/QuoteRequestCTA";

interface LocationHeroProps {
  cityData: CityData;
  businesses: Business[];
}

const LocationHero = ({ cityData, businesses }: LocationHeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 sm:py-16 md:py-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              AC Repair {cityData.name} FL
              <span className="block text-blue-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                Licensed • Fast • Trusted
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
              {cityData.description} Find verified HVAC contractors in {cityData.name}, {cityData.county} 
              with 24/7 emergency service available. Get free quotes today!
            </p>
            
            <div className="flex justify-center lg:justify-start">
              <TrustBadges variant="horizontal" showStats={true} />
            </div>
            
            {/* Location Stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">{businesses.length}</div>
                <div className="text-sm sm:text-base text-blue-100">Local Contractors</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">
                  {businesses.length > 0 
                    ? (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1)
                    : "4.8"
                  }★
                </div>
                <div className="text-sm sm:text-base text-blue-100">Average Rating</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-200">24/7</div>
                <div className="text-sm sm:text-base text-blue-100">Emergency Service</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <QuoteRequestCTA variant="hero" className="max-w-md w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
