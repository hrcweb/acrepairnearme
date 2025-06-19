
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Business } from "@/pages/Index";

interface LocationSummaryCardProps {
  filteredBusinesses: Business[];
  searchLocation: string;
  showAllContractors: boolean;
}

const LocationSummaryCard = ({ filteredBusinesses, searchLocation, showAllContractors }: LocationSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          {showAllContractors ? "All AC Repair Contractors" : `AC Repair Services in ${searchLocation}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{filteredBusinesses.length}</div>
            <div className="text-sm text-gray-600">Verified Contractors</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {filteredBusinesses.length > 0 
                ? (filteredBusinesses.reduce((sum, b) => sum + (b.rating || 0), 0) / filteredBusinesses.length).toFixed(1)
                : "0.0"
              }★
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-600">24/7</div>
            <div className="text-sm text-gray-600">Emergency Service</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSummaryCard;
