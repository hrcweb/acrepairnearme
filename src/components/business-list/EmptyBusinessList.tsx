
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyBusinessListProps {
  onClearFilters: () => void;
}

const EmptyBusinessList: React.FC<EmptyBusinessListProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          No contractors found
        </h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your search criteria or browse contractors in other locations.
        </p>
        <Button onClick={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default EmptyBusinessList;
