
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";

interface AdvertisingOptionsProps {
  onSelectSponsorship: () => void;
  onSelectBanner: () => void;
}

const AdvertisingOptions = ({ onSelectSponsorship, onSelectBanner }: AdvertisingOptionsProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Advertising Options
        </h1>
        <p className="text-xl text-gray-600">
          Boost your AC repair business with our premium advertising solutions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sponsored Listing */}
        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span>Sponsored Listing</span>
              </CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Popular Choice
              </Badge>
            </div>
            <div className="text-3xl font-bold text-green-600">
              $99<span className="text-lg font-normal text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Get premium placement in search results with enhanced business listing features.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority placement in search results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Business logo displayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Enhanced business description</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Social media links included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Targeted keyword optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Monthly performance reports</span>
              </div>
            </div>

            <Button 
              onClick={onSelectSponsorship}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Get Started with Sponsored Listing
            </Button>
          </CardContent>
        </Card>

        {/* Banner Advertisement */}
        <Card className="relative border-blue-200">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-blue-600 text-white">Maximum Visibility</Badge>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-blue-500" />
              <span>Banner Advertisement</span>
            </CardTitle>
            <div className="text-3xl font-bold text-blue-600">
              $199<span className="text-lg font-normal text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Maximum exposure with prominent banner placement across our platform.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Prime banner placement</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Custom banner design support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Multiple banner sizes available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Homepage and search page placement</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Click-through tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-blue-500" />
                <span>Weekly performance analytics</span>
              </div>
            </div>

            <Button 
              onClick={onSelectBanner}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Get Started with Banner Ads
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Need help choosing the right advertising option for your business?
        </p>
        <Button variant="outline">
          Contact Our Advertising Team
        </Button>
      </div>
    </div>
  );
};

export default AdvertisingOptions;
