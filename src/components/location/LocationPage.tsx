import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Star, Shield, Clock, Phone, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessCard from "@/components/BusinessCard";
import QuoteRequestCTA from "@/components/QuoteRequestCTA";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import LocationLinks from "./LocationLinks";
import { getCityDataBySlug, CityData } from "@/data/cities";
import { getBusinessesByCity, SampleBusiness } from "@/data/sampleBusinesses";
import { updatePageSEO } from "@/utils/seoUtils";
import { Business } from "@/pages/Index";

const LocationPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [cityData, setCityData] = useState<CityData | null>(null);

  console.log('LocationPage rendered with citySlug:', citySlug);

  // Get city data
  useEffect(() => {
    if (citySlug) {
      console.log('Looking up city data for slug:', citySlug);
      const data = getCityDataBySlug(citySlug);
      console.log('Found city data:', data);
      setCityData(data || null);
    }
  }, [citySlug]);

  // Fetch businesses for this specific city from database
  const { data: databaseBusinesses = [], isLoading, error } = useQuery({
    queryKey: ['location-businesses', cityData?.name],
    queryFn: async () => {
      if (!cityData?.name) {
        console.log('No city data available for business query');
        return [];
      }
      
      console.log('Fetching businesses for city:', cityData.name);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .ilike('city', cityData.name)
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });
      
      if (error) {
        console.error('Error fetching location businesses:', error);
        throw error;
      }
      
      console.log('Database businesses found:', data?.length || 0);
      return data?.map(business => ({
        id: business.id,
        name: business.name,
        description: business.description,
        phone: business.phone,
        email: business.email,
        website: business.website,
        address: business.address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        services: business.services || [],
        rating: business.rating || 0,
        review_count: business.review_count || 0,
        featured: business.featured || false,
        insurance_verified: business.insurance_verified || false,
        license_number: business.license_number,
        created_at: business.created_at,
        updated_at: business.updated_at,
        latitude: business.latitude,
        longitude: business.longitude,
        business_hours: business.business_hours
      })) || [];
    },
    enabled: !!cityData?.name
  });

  // Get sample businesses if no database businesses found
  const sampleBusinesses = cityData ? getBusinessesByCity(cityData.name) : [];
  console.log('Sample businesses found:', sampleBusinesses.length);
  
  // Convert sample businesses to the format expected by BusinessCard
  const convertedSampleBusinesses = sampleBusinesses.map((business, index) => ({
    id: 1000 + index, // Use high numbers to avoid conflicts with real business IDs
    name: business.name,
    description: business.description,
    phone: business.phone,
    email: business.email,
    website: business.website,
    address: business.address,
    city: business.city,
    state: business.state,
    zip_code: business.zip_code,
    services: business.services,
    rating: business.rating,
    review_count: business.review_count,
    featured: business.featured,
    insurance_verified: business.insurance_verified,
    license_number: business.license_number,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    latitude: null,
    longitude: null,
    business_hours: business.business_hours
  }));

  // Use database businesses if available, otherwise use sample businesses
  const businesses = databaseBusinesses.length > 0 ? databaseBusinesses : convertedSampleBusinesses;
  console.log('Total businesses to display:', businesses.length);

  // Update SEO when city data is available
  useEffect(() => {
    if (cityData) {
      const title = `AC Repair ${cityData.name} FL | Top HVAC Contractors Near Me | 24/7 Emergency Service`;
      const description = `Find top-rated AC repair contractors in ${cityData.name}, Florida. Licensed HVAC professionals offering emergency AC repair, installation, and maintenance services. Get free quotes today!`;
      const keywords = cityData.seoKeywords.join(', ') + `, ${cityData.name} emergency ac repair, ${cityData.name} hvac contractors, air conditioning repair ${cityData.name} florida`;
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `AC Repair Near Me Pro - ${cityData.name}`,
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityData.name,
          "addressRegion": "FL",
          "addressCountry": "US",
          "postalCode": cityData.zipCodes?.[0] || ""
        },
        "telephone": "561-206-2624",
        "url": window.location.href,
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "addressLocality": cityData.name,
            "addressRegion": "FL"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AC Repair Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency AC Repair",
                "description": `24/7 emergency AC repair services in ${cityData.name}, Florida`
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AC Installation",
                "description": `Professional AC installation services in ${cityData.name}, Florida`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "HVAC Maintenance",
                "description": `Regular HVAC maintenance services in ${cityData.name}, Florida`
              }
            }
          ]
        }
      };

      updatePageSEO(title, description, keywords, title, description, structuredData);
    }
  }, [cityData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Fetching AC repair contractors for {citySlug}...</p>
        </div>
      </div>
    );
  }

  if (!cityData) {
    console.log('No city data found for slug:', citySlug);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600">The requested location "{citySlug}" could not be found.</p>
          <Button 
            onClick={() => window.location.href = '/'} 
            className="mt-4"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  console.log('Rendering LocationPage for:', cityData.name, 'with', businesses.length, 'businesses');

  return (
    <div className="min-h-screen bg-background">
      {/* Location-specific Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 sm:py-16 md:py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                AC Repair {cityData.name} FL
                <span className="block text-blue-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                  Licensed • Fast • Trusted
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
                {cityData.description} Find verified HVAC contractors in {cityData.name}, {cityData.county} 
                with 24/7 emergency service available. Get free quotes today!
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <TrustBadges variant="horizontal" showStats={true} />
              </div>
              
              {/* Location Stats */}
              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-200">{businesses.length}</div>
                  <div className="text-sm sm:text-base text-blue-100">Local Contractors</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-200">
                    {businesses.length > 0 
                      ? (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1)
                      : "4.8"
                    }★
                  </div>
                  <div className="text-sm sm:text-base text-blue-100">Average Rating</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-200">24/7</div>
                  <div className="text-sm sm:text-base text-blue-100">Emergency Service</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <QuoteRequestCTA variant="hero" className="max-w-md w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Sample Data Notice */}
        {databaseBusinesses.length === 0 && sampleBusinesses.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3 mb-8">
            <div className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0">ℹ️</div>
            <div>
              <p className="text-blue-800 font-medium">Sample Listings</p>
              <p className="text-blue-700 text-sm">
                These are example contractors to show you the types of services available in {cityData.name}. 
                We're actively adding real contractor listings for your area.
              </p>
            </div>
          </div>
        )}

        {/* Business Listings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Top-Rated AC Repair Contractors in {cityData.name}
            </h2>
            {databaseBusinesses.length === 0 && sampleBusinesses.length > 0 && (
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Sample Listings
              </div>
            )}
          </div>
          
          {businesses.length > 0 ? (
            <div className="grid gap-6">
              {businesses.map((business) => (
                <BusinessCard 
                  key={business.id} 
                  business={{
                    ...business,
                    reviewCount: business.review_count,
                    services: business.services || [],
                    verified: business.insurance_verified
                  }} 
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                No Contractors Listed Yet in {cityData.name}
              </h3>
              <p className="text-gray-600 mb-6">
                We're actively adding more contractors to serve {cityData.name} and surrounding areas in {cityData.county}.
                In the meantime, you can request quotes from nearby contractors.
              </p>
              <QuoteRequestCTA variant="inline" />
            </Card>
          )}
        </div>

        {/* Enhanced Location-specific content sections */}
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

          {/* Local Resources and Rebates */}
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

          {/* Internal linking to other cities */}
          <LocationLinks currentCity={cityData.name} />
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <QuoteRequestCTA variant="inline" className="max-w-4xl mx-auto" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationPage;
