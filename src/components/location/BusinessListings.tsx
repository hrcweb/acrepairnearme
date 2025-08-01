
import React from "react";
import { Business } from "@/hooks/useBusinessData";
import BusinessCard from "@/components/BusinessCard";

interface BusinessListingsProps {
  businesses: Business[];
  cityName: string;
  databaseBusinesses: Business[];
  sampleBusinesses: any[];
}

const BusinessListings = ({ businesses, cityName, databaseBusinesses, sampleBusinesses }: BusinessListingsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Top-Rated AC Repair Contractors in {cityName}
        </h2>
      </div>
      
      {/* Sample Data Notice */}
      {databaseBusinesses.length === 0 && sampleBusinesses.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3 mb-8">
          <div className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0">ℹ️</div>
          <div>
            <p className="text-blue-800 font-medium">Sample Listings</p>
            <p className="text-blue-700 text-sm">
              These are example contractors to show you the types of services available in {cityName}. 
              We're actively adding real contractor listings for your area.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid gap-6">
        {businesses.map((business) => (
          <BusinessCard 
            key={business.id} 
            business={{
              ...business,
              reviewCount: business.review_count,
              services: business.services || [],
              verified: business.insurance_verified
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessListings;
