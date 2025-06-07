
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
                  Get found by customers actively searching for AC services in your area. Our platform receives over 50,000 monthly searches from homeowners in need of AC repair and installation services.
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
                  Build trust with a verified business badge after our comprehensive review process. We verify licenses, insurance, and business credentials to help customers choose reliable contractors.
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
                  Collect and showcase authentic customer reviews to build your reputation. Our review system helps potential customers see your quality work and satisfied clients, increasing your conversion rate.
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
                  Receive direct quote requests from customers ready to hire. Our platform connects you with pre-qualified leads who are actively seeking AC services in your service area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced How It Works Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works - Start Getting Customers Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Choose Your Plan</h4>
              <p className="text-gray-600 mb-4">
                Select the subscription plan that best fits your business size and goals. Start with Basic for new businesses or choose Premium/Enterprise for established companies looking to dominate their market.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Takes:</strong> 2 minutes<br />
                <strong>Cost:</strong> Starting at $29/month
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Complete Payment & Setup</h4>
              <p className="text-gray-600 mb-4">
                Secure checkout process with no setup fees or hidden costs. After payment, you'll receive immediate access to our business dashboard where you can create your detailed listing with photos, services, and contact information.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Takes:</strong> 5-10 minutes<br />
                <strong>Includes:</strong> Business profile setup
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Go Live & Get Customers</h4>
              <p className="text-gray-600 mb-4">
                Your business listing goes live immediately and starts appearing in search results. Begin receiving customer inquiries, quote requests, and phone calls from homeowners in your service area within 24-48 hours.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Results:</strong> 24-48 hours<br />
                <strong>Average:</strong> 5-15 leads per month
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Monthly Searches</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">2.5x</div>
              <div className="text-sm text-gray-600">Average ROI</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-gray-600">Time to First Lead</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Trusted by AC Professionals Across Florida</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Licensed & Insured Contractors Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>24/7 Support Available</span>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800 font-medium mb-2">
              "Since joining AC Repair Near Me, we've increased our monthly revenue by 40% and receive 3-5 qualified leads per week. The platform pays for itself!"
            </p>
            <p className="text-blue-600 text-sm">
              - Mike Rodriguez, Cool Air Solutions, Tampa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBusiness;
