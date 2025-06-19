
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
import { updatePageSEO } from "@/utils/seoUtils";
import { Business } from "@/pages/Index";

const LocationPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [cityData, setCityData] = useState<CityData | null>(null);

  // Get city data
  useEffect(() => {
    if (citySlug) {
      const data = getCityDataBySlug(citySlug);
      setCityData(data || null);
    }
  }, [citySlug]);

  // Fetch businesses for this specific city
  const { data: businesses = [], isLoading, error } = useQuery({
    queryKey: ['location-businesses', cityData?.name],
    queryFn: async () => {
      if (!cityData?.name) return [];
      
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

  if (!cityData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600">The requested location could not be found.</p>
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
        {/* Location Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              AC Repair Services in {cityData.name}, {cityData.county}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{businesses.length}</div>
                <div className="text-sm text-gray-600">Verified Contractors</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">
                  {businesses.length >  0 
                    ? (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1)
                    : "4.8"
                  }★
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-green-600">Same Day</div>
                <div className="text-sm text-gray-600">Service Available</div>
              </div>
            </div>
            
            {cityData.zipCodes && cityData.zipCodes.length > 0 && (
              <div className="text-sm text-gray-600">
                <strong>Service Areas:</strong> {cityData.zipCodes.join(', ')}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Listings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top-Rated AC Repair Contractors in {cityData.name}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-8">Loading contractors...</div>
          ) : businesses.length > 0 ? (
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

        {/* Location-specific content sections */}
        <div className="mt-16 space-y-12">
          {/* Why Choose Our {City} AC Contractors */}
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
            </div>
          </section>

          {/* Local AC Repair FAQ */}
          <section>
            <h3 className="text-2xl font-bold mb-6">
              Frequently Asked Questions - AC Repair in {cityData.name}
            </h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How quickly can I get AC repair service in {cityData.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Most of our {cityData.name} contractors offer same-day service and emergency repairs. During peak summer months in Florida, response times may vary, but emergency services are typically available within 2-4 hours.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's the average cost of AC repair in {cityData.name}?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AC repair costs in {cityData.name} typically range from $150-$800 depending on the issue. Common repairs like capacitor replacement cost $150-$400, while compressor issues may cost $800-$2,500. Get free quotes to compare prices from local contractors.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do {cityData.name} AC contractors service all brands?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, our network of {cityData.name} HVAC professionals service all major AC brands including Trane, Carrier, Lennox, Goodman, Rheem, York, and more. They carry parts for most residential and commercial systems.
                  </p>
                </CardContent>
              </Card>
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
