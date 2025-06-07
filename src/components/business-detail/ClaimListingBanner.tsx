
import { Link } from "react-router-dom";
import { Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClaimListingBanner = () => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Is this your business?</h3>
              <p className="text-blue-700">Claim this listing to manage your business profile and get more customers</p>
            </div>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/list-business#pricing">
              Claim This Listing
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimListingBanner;
