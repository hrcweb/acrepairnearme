
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Grow Your AC Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to showcase your services and connect with more customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Basic Listing</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Business profile page
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Contact information display
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Up to 5 photos
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Customer reviews
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Basic analytics
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Start Basic Plan
              </Button>
              <p className="text-center text-sm text-gray-600 mt-2">
                Or $299/year (save 15%)
              </p>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-blue-500 shadow-lg">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Premium Listing</CardTitle>
              <CardDescription>Enhanced visibility and features</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$79</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Everything in Basic
                </li>
                <li className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  Featured in search results
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Unlimited photos & videos
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Priority customer support
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Lead notifications
                </li>
              </ul>
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                Start Premium Plan
              </Button>
              <p className="text-center text-sm text-gray-600 mt-2">
                Or $799/year (save 15%)
              </p>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>Maximum exposure and leads</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$149</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Everything in Premium
                </li>
                <li className="flex items-center">
                  <Zap className="w-4 h-4 text-purple-500 mr-2" />
                  Top placement in results
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Custom banner ads
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Verified business badge
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Custom branding options
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Contact Sales
              </Button>
              <p className="text-center text-sm text-gray-600 mt-2">
                Or $1499/year (save 15%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Advertising Section */}
        <div id="advertising" className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Advertising Opportunities
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Reach thousands of potential customers with our advertising solutions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Banner Advertisements</CardTitle>
                <CardDescription>Premium placement on high-traffic pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">Starting at $299/month</div>
                <ul className="text-left space-y-2">
                  <li>• Homepage banner placement</li>
                  <li>• Search results page ads</li>
                  <li>• Custom ad creative design</li>
                  <li>• Performance analytics</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sponsored Listings</CardTitle>
                <CardDescription>Appear at the top of search results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">Starting at $199/month</div>
                <ul className="text-left space-y-2">
                  <li>• Top 3 search placement</li>
                  <li>• "Sponsored" badge</li>
                  <li>• Increased visibility</li>
                  <li>• Click-through reporting</li>
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
