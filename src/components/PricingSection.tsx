
import { Check, X, Star, Zap, Crown, Shield, Phone, Mail, Users, MapPin, Camera, BarChart3, Headphones, Globe, Building2, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvertisementButton from "@/components/AdvertisementButton";
import SubscriptionButton from "@/components/SubscriptionButton";

interface PricingSectionProps {
  onGetStartedFree?: () => void;
}

const PricingSection = ({ onGetStartedFree }: PricingSectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Business Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your AC repair business listed and start attracting more customers today. All plans include our satisfaction guarantee and can be upgraded anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 border-gray-200 bg-white">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-gray-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Free Listing</CardTitle>
              <div className="text-3xl font-bold text-gray-900">$0</div>
              <p className="text-gray-600">Forever</p>
              <p className="text-sm text-gray-500 mt-2">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Basic business listing with company name and description</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Primary contact information (phone & address)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Up to 3 services listed (AC repair, installation, maintenance)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Basic search visibility in your service area</span>
                </div>
                <div className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-500">No business photos or gallery</span>
                </div>
                <div className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-500">No priority placement in search results</span>
                </div>
                <div className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-500">No customer reviews system</span>
                </div>
                <div className="flex items-start">
                  <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-500">No lead tracking or analytics</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={onGetStartedFree}
              >
                Get Started Free
              </Button>
              <p className="text-xs text-gray-500 text-center">No credit card required</p>
            </CardContent>
          </Card>

          {/* Basic Plan */}
          <Card className="relative border-2 border-blue-200 bg-blue-50">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-900">Basic</CardTitle>
              <div className="text-3xl font-bold text-blue-900">$29</div>
              <p className="text-blue-700">per month</p>
              <p className="text-sm text-blue-600 mt-2">Great for small businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">Everything in Free Plan, plus:</span>
                </div>
                <div className="flex items-start">
                  <Camera className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Up to 5 high-quality business photos</span>
                </div>
                <div className="flex items-start">
                  <Star className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Customer reviews and rating system</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Business hours display with holiday schedules</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Service area mapping (up to 3 cities)</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Email support with 24-hour response time</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Basic lead notification emails</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Mobile-optimized listing page</span>
                </div>
              </div>
              <SubscriptionButton tier="Basic" price={29} className="w-full">
                Choose Basic
              </SubscriptionButton>
              <p className="text-xs text-blue-600 text-center">14-day free trial included</p>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-orange-200 bg-orange-50 transform scale-105 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white px-4 py-1">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-orange-900">Premium</CardTitle>
              <div className="text-3xl font-bold text-orange-900">$79</div>
              <p className="text-orange-700">per month</p>
              <p className="text-sm text-orange-600 mt-2">Best value for growing businesses</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">Everything in Basic Plan, plus:</span>
                </div>
                <div className="flex items-start">
                  <Rocket className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Priority placement in search results</span>
                </div>
                <div className="flex items-start">
                  <Badge className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">"Featured Contractor" badge on your listing</span>
                </div>
                <div className="flex items-start">
                  <Camera className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Unlimited business photos and virtual gallery</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Extended service area (up to 10 cities)</span>
                </div>
                <div className="flex items-start">
                  <Mail className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Instant lead notifications via email & SMS</span>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Analytics dashboard with lead tracking</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Social media integration (Facebook, Google)</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Priority phone support (2-hour response)</span>
                </div>
              </div>
              <SubscriptionButton tier="Premium" price={79} className="w-full bg-orange-500 hover:bg-orange-600">
                Choose Premium
              </SubscriptionButton>
              <p className="text-xs text-orange-600 text-center">30-day free trial included</p>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 border-purple-200 bg-purple-50">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-purple-900">Enterprise</CardTitle>
              <div className="text-3xl font-bold text-purple-900">$199</div>
              <p className="text-purple-700">per month</p>
              <p className="text-sm text-purple-600 mt-2">For large HVAC companies</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium">Everything in Premium Plan, plus:</span>
                </div>
                <div className="flex items-start">
                  <Building2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Multiple business locations (up to 10)</span>
                </div>
                <div className="flex items-start">
                  <Globe className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">API access for website integration</span>
                </div>
                <div className="flex items-start">
                  <Shield className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Custom branding and white-label options</span>
                </div>
                <div className="flex items-start">
                  <Users className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Team management with multiple user accounts</span>
                </div>
                <div className="flex items-start">
                  <Headphones className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Dedicated account manager & phone support</span>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Advanced analytics with custom reporting</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">CRM integration (Salesforce, HubSpot)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Custom lead routing and assignment</span>
                </div>
              </div>
              <SubscriptionButton tier="Enterprise" price={199} className="w-full bg-purple-600 hover:bg-purple-700">
                Contact Sales
              </SubscriptionButton>
              <p className="text-xs text-purple-600 text-center">Custom onboarding included</p>
            </CardContent>
          </Card>
        </div>

        {/* Advertisement Options */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Boost Your Visibility with Targeted Advertising</h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Stand out from the competition with our premium advertising options. Get immediate visibility and attract more customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Banner Advertisement */}
            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Banner Advertisement</CardTitle>
                <div className="text-3xl font-bold text-yellow-600">$149</div>
                <p className="text-gray-600">30 days</p>
                <p className="text-sm text-yellow-700 mt-2">Premium homepage placement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Top banner placement on homepage and search pages</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">High visibility across all pages (50,000+ monthly views)</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom banner design and copywriting included</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Detailed click tracking & performance analytics</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Mobile and desktop optimization</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">A/B testing for optimal performance</span>
                  </div>
                </div>
                <AdvertisementButton 
                  adType="banner" 
                  price={149}
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                >
                  Purchase Banner Ad
                </AdvertisementButton>
                <p className="text-xs text-yellow-700 text-center">Average 300% increase in leads</p>
              </CardContent>
            </Card>

            {/* Sponsored Listing */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Sponsored Listing</CardTitle>
                <div className="text-3xl font-bold text-green-600">$99</div>
                <p className="text-gray-600">30 days</p>
                <p className="text-sm text-green-700 mt-2">Prime search placement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Guaranteed top 3 placement in search results</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Distinctive "Sponsored" badge for credibility</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Enhanced listing with highlighted border</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority in location-based searches</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Extended service area visibility</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Lead generation boost (avg. 200% increase)</span>
                  </div>
                </div>
                <AdvertisementButton 
                  adType="sponsored" 
                  price={99}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Purchase Sponsored Listing
                </AdvertisementButton>
                <p className="text-xs text-green-700 text-center">Most cost-effective lead generator</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Features Comparison */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-xl font-bold text-center mb-6">Feature Comparison at a Glance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Basic</th>
                  <th className="text-center py-3 px-4">Premium</th>
                  <th className="text-center py-3 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-3 px-4">Business Photos</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">5</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Service Areas</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">3</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Customer Reviews</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Analytics Dashboard</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">Advanced</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Support Level</td>
                  <td className="text-center py-3 px-4">Community</td>
                  <td className="text-center py-3 px-4">Email</td>
                  <td className="text-center py-3 px-4">Priority</td>
                  <td className="text-center py-3 px-4">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium">30-day money-back guarantee on all paid plans</span>
          </div>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
