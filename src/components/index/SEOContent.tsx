
import React from "react";
import { Button } from "@/components/ui/button";

interface SEOContentProps {
  onBrowseAll: () => void;
  onViewAll: () => void;
}

const SEOContent = ({ onBrowseAll, onViewAll }: SEOContentProps) => {
  return (
    <section className="mb-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        How Our AC Repair Directory Works
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
        We've simplified finding reliable AC repair contractors. Our platform connects you with 
        pre-screened, licensed professionals who specialize in residential and commercial HVAC services. 
        Get free quotes, compare reviews, and hire with confidence - all in one place.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">1</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Tell Us Your Needs</h3>
          <p className="text-gray-600">Submit your location and service requirements through our simple form</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">2</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Get Matched</h3>
          <p className="text-gray-600">We connect you with up to 3 qualified contractors in your area</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">3</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Compare & Hire</h3>
          <p className="text-gray-600">Review quotes, read reviews, and choose the best contractor for your job</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onBrowseAll}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
        >
          Browse All Contractors
        </Button>
        <Button 
          onClick={onViewAll}
          variant="outline"
          className="px-6 py-3 text-lg"
        >
          View All AC Repair Services
        </Button>
      </div>
    </section>
  );
};

export default SEOContent;
