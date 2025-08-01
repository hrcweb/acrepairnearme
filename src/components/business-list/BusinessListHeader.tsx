
import React from "react";
import { MapPin } from "lucide-react";

interface BusinessListHeaderProps {
  searchLocation?: string;
  filteredCount: number;
}

const BusinessListHeader: React.FC<BusinessListHeaderProps> = ({
  searchLocation,
  filteredCount
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">
        {searchLocation ? `AC Contractors in ${searchLocation}` : "AC Repair Contractors"}
        <span className="text-gray-500 font-normal ml-2">({filteredCount} found)</span>
      </h2>
    </div>
  );
};

export default BusinessListHeader;
