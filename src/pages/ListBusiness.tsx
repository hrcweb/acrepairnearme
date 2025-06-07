
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PricingSection from "@/components/PricingSection";
import { useAuth } from "@/contexts/AuthContext";

const ListBusiness = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            List Your AC Business
          </h1>
          <p className="text-lg text-gray-600">
            Choose a plan to get started and reach thousands of potential customers
          </p>
        </div>

        {/* Pricing Section */}
        <PricingSection />

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why List Your Business?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">More Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get found by customers actively searching for AC services in your area
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Verified Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Build trust with a verified business badge after our review process
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle className="text-lg">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Collect and showcase authentic customer reviews to build reputation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-8 h-8 bg-purple-600 mb-2 flex items-center justify-center">
                  $
                </Badge>
                <CardTitle className="text-lg">Lead Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive direct quote requests from customers ready to hire
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Choose Your Plan</h4>
              <p className="text-gray-600 text-sm">Select the subscription plan that best fits your business needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Complete Payment</h4>
              <p className="text-gray-600 text-sm">Secure checkout process - no setup fees or hidden costs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Create Your Listing</h4>
              <p className="text-gray-600 text-sm">Set up your business profile and start getting customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBusiness;
