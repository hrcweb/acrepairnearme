
import { Check, X, Star, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvertisementButton from "@/components/AdvertisementButton";
import SubscriptionButton from "@/components/SubscriptionButton";

const PricingSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Business Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your AC repair business listed and start attracting more customers today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 border-gray-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Free Listing</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <p className="text-gray-600">Forever</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Basic business listing</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Contact information</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Up to 3 services listed</span>
                </div>
                <div className="flex items-center">
                  <X className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">No photos</span>
                </div>
                <div className="flex items-center">
                  <X className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">No priority placement</span>
                </div>
                <div className="flex items-center">
                  <X className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">No customer reviews</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Basic Plan */}
          <Card className="relative border-2 border-blue-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Basic</CardTitle>
              <div className="text-3xl font-bold">$29</div>
              <p className="text-gray-600">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Everything in Free</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Up to 5 business photos</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Customer reviews</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Business hours display</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Email support</span>
                </div>
              </div>
              <SubscriptionButton tier="Basic" price={29} className="w-full">
                Choose Basic
              </SubscriptionButton>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-orange-200 bg-orange-50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Premium</CardTitle>
              <div className="text-3xl font-bold">$79</div>
              <p className="text-gray-600">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Everything in Basic</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Priority placement</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Featured badge</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Unlimited photos</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Lead notifications</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Analytics dashboard</span>
                </div>
              </div>
              <SubscriptionButton tier="Premium" price={79} className="w-full bg-orange-500 hover:bg-orange-600">
                Choose Premium
              </SubscriptionButton>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 border-purple-200">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <div className="text-3xl font-bold">$199</div>
              <p className="text-gray-600">per month</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Everything in Premium</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Multiple locations</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">API access</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Custom branding</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Dedicated support</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
              </div>
              <SubscriptionButton tier="Enterprise" price={199} className="w-full bg-purple-600 hover:bg-purple-700">
                Contact Sales
              </SubscriptionButton>
            </CardContent>
          </Card>
        </div>

        {/* Advertisement Options */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Boost Your Visibility</h3>
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Top banner placement</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">High visibility across all pages</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Custom banner design included</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Click tracking & analytics</span>
                  </div>
                </div>
                <AdvertisementButton 
                  adType="banner" 
                  price={149}
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                >
                  Purchase Banner Ad
                </AdvertisementButton>
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Top 3 search results</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">"Sponsored" badge</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Enhanced listing appearance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Priority in location searches</span>
                  </div>
                </div>
                <AdvertisementButton 
                  adType="sponsored" 
                  price={99}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Purchase Sponsored Listing
                </AdvertisementButton>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <Check className="w-4 h-4 mr-2" />
            30-day money-back guarantee
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
