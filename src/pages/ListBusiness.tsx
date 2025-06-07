
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BusinessListingForm from "@/components/BusinessListingForm";
import { useAuth } from "@/contexts/AuthContext";

const ListBusiness = () => {
  const { user } = useAuth();

  if (!user) {
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

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              List Your AC Business
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of contractors getting more customers through our platform
            </p>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4">Sign in to continue</h2>
                <p className="text-gray-600 mb-6">
                  You need to be signed in to list your business on our platform.
                </p>
                <Button size="lg" asChild>
                  <Link to="/auth">Sign In / Create Account</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Get More Customers</h3>
                  <p className="text-sm text-gray-600">
                    Reach thousands of potential customers searching for AC services
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Verified Listings</h3>
                  <p className="text-sm text-gray-600">
                    Get verified badge to build trust with potential customers
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <Star className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="font-semibold mb-2">Customer Reviews</h3>
                  <p className="text-sm text-gray-600">
                    Build your reputation with authentic customer reviews
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Create your business listing and start getting more customers today
          </p>
        </div>

        <BusinessListingForm />

        {/* Benefits Section */}
        <div className="mt-12">
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
      </div>
    </div>
  );
};

export default ListBusiness;
