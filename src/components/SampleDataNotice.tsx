
import React from "react";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SampleDataNoticeProps {
  cityName: string;
  className?: string;
}

const SampleDataNotice = ({ cityName, className = "" }: SampleDataNoticeProps) => {
  return (
    <Alert className={`border-blue-200 bg-blue-50 ${className}`}>
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Sample Listings:</strong> These are example contractors showing the types of AC repair services available in {cityName}. 
        We're actively adding real contractor listings for your area. 
        <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline ml-1">
          Contact us to list your business
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default SampleDataNotice;
