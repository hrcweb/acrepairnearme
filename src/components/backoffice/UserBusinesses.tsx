
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";

const UserBusinesses = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Business Listings</h3>
        <Button asChild>
          <a href="/list-business">
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </a>
        </Button>
      </div>
      
      <Card>
        <CardContent className="text-center py-8">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No business listings found.</p>
          <p className="text-sm text-gray-400 mb-4">
            Add your business to help customers find you.
          </p>
          <Button asChild variant="outline">
            <a href="/list-business">List Your Business</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBusinesses;
