
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Star, CheckCircle, Phone, MapPin } from "lucide-react";
import { CityData } from "@/data/cities";

interface LocationContentProps {
  cityData: CityData;
}

const LocationContent = ({ cityData }: LocationContentProps) => {
  return (
    <div className="mt-16 space-y-12">
      {/* Climate and AC Considerations for this city */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">
          AC Repair Considerations for {cityData.name} Climate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-3 text-orange-800">Local Weather Challenges</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• High humidity levels stress AC systems year-round</li>
              <li>• Salt air exposure in coastal areas accelerates corrosion</li>
              <li>• Frequent thunderstorms can cause power surge damage</li>
              <li>• Hurricane season requires system weatherproofing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 text-orange-800">Maintenance Recommendations</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Change filters monthly during peak season</li>
              <li>• Annual coil cleaning to prevent efficiency loss</li>
              <li>• Surge protector installation recommended</li>
              <li>• Bi-annual professional inspections advised</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Our Contractors */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Why Choose Our {cityData.name} AC Repair Contractors?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Shield className="w-8 h-8 text-blue-500 mb-3" />
            <h4 className="font-semibold mb-2">Licensed & Insured in {cityData.county}</h4>
            <p className="text-sm text-gray-600">All contractors are properly licensed and insured to work in {cityData.name} and throughout {cityData.county}.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Clock className="w-8 h-8 text-green-500 mb-3" />
            <h4 className="font-semibold mb-2">24/7 Emergency Service</h4>
            <p className="text-sm text-gray-600">Emergency AC repair available around the clock for {cityData.name} residents and businesses.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Star className="w-8 h-8 text-yellow-500 mb-3" />
            <h4 className="font-semibold mb-2">Top-Rated Local Experts</h4>
            <p className="text-sm text-gray-600">Verified customer reviews from {cityData.name} residents ensure quality service.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <CheckCircle className="w-8 h-8 text-purple-500 mb-3" />
            <h4 className="font-semibold mb-2">Same-Day Service Available</h4>
            <p className="text-sm text-gray-600">Most repairs completed the same day with fully stocked service vehicles.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Phone className="w-8 h-8 text-red-500 mb-3" />
            <h4 className="font-semibold mb-2">Local Response Team</h4>
            <p className="text-sm text-gray-600">Contractors based in {cityData.name} area for faster response times.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MapPin className="w-8 h-8 text-indigo-500 mb-3" />
            <h4 className="font-semibold mb-2">Service Area Coverage</h4>
            <p className="text-sm text-gray-600">Complete coverage of {cityData.name} and surrounding {cityData.county} areas.</p>
          </div>
        </div>
      </section>

      {/* Local AC Repair FAQ */}
      <section>
        <h3 className="text-2xl font-bold mb-6">
          {cityData.name} AC Repair - Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How quickly can I get AC repair service in {cityData.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Most of our {cityData.name} contractors offer same-day service and emergency repairs. During peak summer months in Florida, response times may vary, but emergency services are typically available within 2-4 hours. Our local contractors maintain service vehicles in {cityData.name} to ensure rapid response.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's the average cost of AC repair in {cityData.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AC repair costs in {cityData.name} typically range from $150-$800 depending on the issue. Common repairs like capacitor replacement cost $150-$400, while compressor issues may cost $800-$2,500. {cityData.county} rates are competitive with state averages. Get free quotes to compare prices from local contractors.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do {cityData.name} AC contractors service all brands?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Yes, our network of {cityData.name} HVAC professionals service all major AC brands including Trane, Carrier, Lennox, Goodman, Rheem, York, American Standard, and more. They carry parts for most residential and commercial systems and can source specialized parts for older units.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What permits are needed for AC work in {cityData.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                In {cityData.name}, {cityData.county}, permits are required for new AC installations, major system replacements, and significant ductwork modifications. Minor repairs typically don't require permits. All our contractors are familiar with local permitting requirements and will handle necessary paperwork for you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-green-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">
          {cityData.name} Energy Efficiency Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-lg mb-3 text-green-800">Available Rebates & Incentives</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Florida Power & Light (FPL) AC rebates up to $1,600</li>
              <li>• Federal tax credits for high-efficiency systems</li>
              <li>• {cityData.county} energy efficiency programs</li>
              <li>• Manufacturer rebates on select HVAC brands</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 text-green-800">Energy Saving Tips</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Set thermostat to 78°F when home</li>
              <li>• Use ceiling fans to feel 4°F cooler</li>
              <li>• Seal air leaks around windows and doors</li>
              <li>• Install programmable or smart thermostats</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationContent;
