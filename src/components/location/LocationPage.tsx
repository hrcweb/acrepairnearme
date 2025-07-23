
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import LocationLinks from "./LocationLinks";
import LocationHero from "./LocationHero";
import BusinessListings from "./BusinessListings";
import DataComingSoon from "./DataComingSoon";
import LocationContent from "./LocationContent";
import QuoteRequestCTA from "@/components/QuoteRequestCTA";
import { getCityDataBySlug } from "@/data/cities";
import { getBusinessesByCity } from "@/data/sampleBusinesses";
import { updatePageSEO } from "@/utils/seoUtils";

const LocationPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const location = useLocation();
  
  // Extract city slug - simplified without memoization
  let actualCitySlug = citySlug;
  if (!actualCitySlug) {
    const path = location.pathname;
    const match = path.match(/\/ac-repair-([a-z-]+)/);
    if (match) {
      actualCitySlug = match[1];
    }
  }

  console.log('LocationPage rendered with actualCitySlug:', actualCitySlug);

  // Get city data directly - simplified
  const cityData = actualCitySlug ? getCityDataBySlug(actualCitySlug) : null;

  // Fetch businesses for this specific city from database with flexible matching
  const { data: databaseBusinesses = [], isLoading, error } = useQuery({
    queryKey: ['location-businesses', cityData?.name || ''],
    queryFn: async () => {
      if (!cityData?.name) {
        console.log('No city data available for business query');
        return [];
      }
      
      console.log('Fetching businesses for city:', cityData.name);
      
      // Try multiple matching strategies to find businesses
      const queries = [
        // Exact match
        supabase
          .from('businesses')
          .select('*')
          .eq('city', cityData.name),
        
        // Case-insensitive match
        supabase
          .from('businesses')
          .select('*')
          .ilike('city', cityData.name),
        
        // Partial match for compound city names
        supabase
          .from('businesses')
          .select('*')
          .ilike('city', `%${cityData.name.split(' ')[0]}%`)
      ];
      
      let businesses: any[] = [];
      
      // Try each query until we find results
      for (const query of queries) {
        const { data, error } = await query
          .order('featured', { ascending: false })
          .order('rating', { ascending: false });
        
        if (error) {
          console.error('Error in business query:', error);
          continue;
        }
        
        if (data && data.length > 0) {
          businesses = data;
          console.log(`Found ${businesses.length} businesses using query strategy`);
          break;
        }
      }
      
      console.log('Total database businesses found:', businesses.length);
      return businesses?.map(business => ({
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
    enabled: !!cityData?.name,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Get sample businesses - simplified
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
  }, [cityData?.name]); // Only depend on city name, not the entire cityData object

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Fetching AC repair contractors for {actualCitySlug}...</p>
        </div>
      </div>
    );
  }

  if (!actualCitySlug) {
    console.log('No city slug found in URL');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid URL</h1>
          <p className="text-gray-600">Please navigate to a specific city page like /ac-repair-miami</p>
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

  if (!cityData) {
    console.log('No city data found for slug:', actualCitySlug);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600">The requested location "{actualCitySlug}" could not be found.</p>
          <p className="text-sm text-gray-500 mt-2">Available cities include: Miami, Orlando, Tampa, Jacksonville, Fort Lauderdale, and more.</p>
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
      <LocationHero cityData={cityData} businesses={businesses} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {businesses.length > 0 ? (
          <BusinessListings 
            businesses={businesses}
            cityName={cityData.name}
            databaseBusinesses={databaseBusinesses}
            sampleBusinesses={sampleBusinesses}
          />
        ) : (
          <DataComingSoon cityData={cityData} />
        )}

        <LocationContent cityData={cityData} />
        <LocationLinks currentCity={cityData.name} />

        <div className="mt-16">
          <QuoteRequestCTA variant="inline" className="max-w-4xl mx-auto" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LocationPage;
