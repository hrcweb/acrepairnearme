
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Phone, MapPin, Globe, TrendingUp, Users } from "lucide-react";

interface BusinessAnalyticsProps {
  businessId: number;
  subscriptionTier: string;
}

const BusinessAnalytics = ({ businessId, subscriptionTier }: BusinessAnalyticsProps) => {
  const analytics = {
    basic: {
      profileViews: 145,
      phoneClicks: 23,
      directionsClicks: 18,
      websiteClicks: 12
    },
    premium: {
      profileViews: 287,
      phoneClicks: 45,
      directionsClicks: 32,
      websiteClicks: 28,
      searchAppearances: 892,
      averagePosition: 3.2,
      monthlyTrend: '+12%'
    },
    enterprise: {
      profileViews: 524,
      phoneClicks: 89,
      directionsClicks: 67,
      websiteClicks: 54,
      searchAppearances: 1543,
      averagePosition: 2.1,
      monthlyTrend: '+18%',
      conversionRate: '8.2%',
      topKeywords: ['ac repair miami', 'hvac service', 'emergency cooling']
    }
  };

  if (subscriptionTier === 'free') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Analytics not available on Free plan</p>
            <Badge variant="outline">Upgrade to Basic or higher</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = analytics[subscriptionTier as keyof typeof analytics];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Business Analytics
            <Badge variant="outline" className="capitalize">{subscriptionTier}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{data.profileViews}</div>
              <div className="text-sm text-blue-700">Profile Views</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Phone className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{data.phoneClicks}</div>
              <div className="text-sm text-green-700">Phone Clicks</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{data.directionsClicks}</div>
              <div className="text-sm text-purple-700">Directions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Globe className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{data.websiteClicks}</div>
              <div className="text-sm text-orange-700">Website Clicks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(subscriptionTier === 'premium' || subscriptionTier === 'enterprise') && (
        <Card>
          <CardHeader>
            <CardTitle>Advanced Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold">{data.searchAppearances}</div>
                <div className="text-sm text-gray-600">Search Appearances</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold">{data.averagePosition}</div>
                <div className="text-sm text-gray-600">Avg. Search Position</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-green-600">{data.monthlyTrend}</div>
                <div className="text-sm text-gray-600">Monthly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {subscriptionTier === 'enterprise' && (
        <Card>
          <CardHeader>
            <CardTitle>Enterprise Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Conversion Rate</span>
                <Badge variant="outline">{data.conversionRate}</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Top Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {data.topKeywords?.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessAnalytics;
