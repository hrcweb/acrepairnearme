
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Shield, Clock, Users, Award, Phone, CheckCircle, MapPin } from "lucide-react";
import { CityData } from "@/data/cities";
import QuoteRequestCTA from "@/components/QuoteRequestCTA";

interface DataComingSoonProps {
  cityData: CityData;
}

const DataComingSoon = ({ cityData }: DataComingSoonProps) => {
  return (
    <div className="space-y-8">
      <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Data Coming Soon for {cityData.name}
        </h3>
        <p className="text-blue-700 text-lg mb-6">
          We're actively building our directory of verified AC repair contractors in {cityData.name}, {cityData.county}. 
          In the meantime, you can request quotes from our network of trusted professionals.
        </p>
        <QuoteRequestCTA variant="inline" />
      </Card>

      {/* Service Information from Index Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <Shield className="w-10 h-10 text-blue-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Licensed & Insured</h4>
          <p className="text-gray-600 text-sm">
            All contractors in our network are properly licensed and insured to work in {cityData.county}, Florida.
          </p>
        </Card>
        
        <Card className="p-6">
          <Clock className="w-10 h-10 text-green-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">24/7 Emergency Service</h4>
          <p className="text-gray-600 text-sm">
            Get emergency AC repair service any time of day or night in {cityData.name} and surrounding areas.
          </p>
        </Card>
        
        <Card className="p-6">
          <Users className="w-10 h-10 text-purple-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Trusted by Thousands</h4>
          <p className="text-gray-600 text-sm">
            Over 50,000+ Florida residents have found reliable HVAC contractors through our platform.
          </p>
        </Card>
        
        <Card className="p-6">
          <Award className="w-10 h-10 text-yellow-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Top-Rated Service</h4>
          <p className="text-gray-600 text-sm">
            Our contractors maintain an average 4.8-star rating with verified customer reviews.
          </p>
        </Card>
        
        <Card className="p-6">
          <Phone className="w-10 h-10 text-red-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Free Quotes</h4>
          <p className="text-gray-600 text-sm">
            Get multiple free quotes from qualified AC repair professionals in {cityData.name}.
          </p>
        </Card>
        
        <Card className="p-6">
          <CheckCircle className="w-10 h-10 text-indigo-600 mb-4" />
          <h4 className="text-lg font-semibold mb-2">Same-Day Service</h4>
          <p className="text-gray-600 text-sm">
            Most AC repairs can be completed the same day with our network of local contractors.
          </p>
        </Card>
      </div>

      {/* Why Choose Our Network */}
      <Card className="p-8 bg-gray-50">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Why Choose Our AC Repair Network in {cityData.name}?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">✓ Local Expertise</h4>
            <p className="text-gray-600 mb-4">
              Our contractors understand {cityData.name}'s unique climate challenges and building requirements.
            </p>
            
            <h4 className="font-semibold text-lg mb-3">✓ Verified Reviews</h4>
            <p className="text-gray-600 mb-4">
              All reviews are verified from real customers who have used our contractor services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">✓ Competitive Pricing</h4>
            <p className="text-gray-600 mb-4">
              Compare quotes from multiple contractors to ensure you get the best price for quality work.
            </p>
            
            <h4 className="font-semibold text-lg mb-3">✓ Quality Guarantee</h4>
            <p className="text-gray-600 mb-4">
              All work is backed by our service guarantee and contractor warranties.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DataComingSoon;
