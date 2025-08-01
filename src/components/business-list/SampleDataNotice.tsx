
import React from "react";
import { Info } from "lucide-react";

interface SampleDataNoticeProps {
  searchLocation: string;
}

const SampleDataNotice: React.FC<SampleDataNoticeProps> = ({ searchLocation }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-blue-800 font-medium">Sample Listings</p>
        <p className="text-blue-700 text-sm">
          These are example contractors to show you the types of services available in {searchLocation}. 
          We're actively adding real contractor listings for your area.
        </p>
      </div>
    </div>
  );
};

export default SampleDataNotice;
