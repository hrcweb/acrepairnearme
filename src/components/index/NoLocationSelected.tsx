
import React from "react";
import { MapPin, Shield, Star, Clock } from "lucide-react";

const NoLocationSelected = () => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Find AC Repair Contractors Near You
        </h3>
        <p className="text-gray-500 mb-6">
          Choose a county and city from the location selector to discover licensed AC repair and HVAC contractors in your area.
        </p>
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>Licensed & Insured Professionals</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Verified Customer Reviews</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
            <Clock className="w-5 h-5 text-green-500" />
            <span>24/7 Emergency Service Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoLocationSelected;
