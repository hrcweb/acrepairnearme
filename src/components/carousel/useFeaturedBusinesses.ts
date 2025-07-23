
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
}

// Move sample data outside the hook to prevent recreation on every render
const SAMPLE_BUSINESSES: Business[] = [
  {
    id: 1,
    name: "Cool Breeze HVAC Services",
    description: "Expert AC repair and installation with 24/7 emergency service",
    phone: "(305) 555-0123",
    address: "1234 Main St",
    city: "Miami",
    state: "FL",
    services: ["AC Repair", "Installation", "Emergency Service"],
    rating: 4.9,
    review_count: 127,
    featured: true
  },
  {
    id: 2,
    name: "Arctic Air Solutions",
    description: "Commercial and residential HVAC specialists serving Orlando",
    phone: "(407) 555-0456",
    address: "5678 Orange Ave",
    city: "Orlando",
    state: "FL",
    services: ["Commercial HVAC", "Duct Cleaning", "Maintenance"],
    rating: 4.8,
    review_count: 89,
    featured: true
  },
  {
    id: 3,
    name: "Sunshine Climate Control",
    description: "Trusted HVAC contractors with over 20 years experience",
    phone: "(813) 555-0789",
    address: "9101 Bay St",
    city: "Tampa",
    state: "FL",
    services: ["Heat Pump", "AC Repair", "Installation"],
    rating: 4.7,
    review_count: 156,
    featured: true
  },
  {
    id: 4,
    name: "Coastal Air Conditioning",
    description: "Professional AC repair and maintenance for Fort Lauderdale",
    phone: "(954) 555-0321",
    address: "2468 Beach Blvd",
    city: "Fort Lauderdale",
    state: "FL",
    services: ["AC Repair", "Preventive Maintenance", "Emergency Service"],
    rating: 4.9,
    review_count: 203,
    featured: true
  },
  {
    id: 5,
    name: "Precision HVAC Experts",
    description: "Energy-efficient solutions and expert installations",
    phone: "(904) 555-0654",
    address: "3579 River Rd",
    city: "Jacksonville",
    state: "FL",
    services: ["Energy Efficiency", "Installation", "Repair"],
    rating: 4.6,
    review_count: 78,
    featured: true
  },
  {
    id: 6,
    name: "Tropical Air Systems",
    description: "Reliable HVAC services for residential and commercial clients",
    phone: "(239) 555-0987",
    address: "1357 Palm Way",
    city: "Naples",
    state: "FL",
    services: ["Residential HVAC", "Commercial Service", "Duct Work"],
    rating: 4.8,
    review_count: 134,
    featured: true
  }
];

export const useFeaturedBusinesses = () => {
  return useQuery({
    queryKey: ['featured-businesses'],
    queryFn: async () => {
      console.log('Fetching featured businesses...');
      
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('featured', true)
          .order('rating', { ascending: false })
          .limit(8);
        
        if (error) {
          console.log('Database error, using sample data:', error);
          return SAMPLE_BUSINESSES;
        }
        
        if (!data || data.length === 0) {
          console.log('No database results, using sample data');
          return SAMPLE_BUSINESSES;
        }
        
        // Filter out any non-HVAC businesses from database results
        const hvacBusinesses = data.filter(business => {
          const businessName = business.name.toLowerCase();
          const businessDescription = business.description?.toLowerCase() || '';
          const businessServices = business.services || [];
          
          // Check if it's HVAC/AC related
          const hvacKeywords = ['hvac', 'ac', 'air conditioning', 'heating', 'cooling', 'climate', 'refrigeration'];
          const isHvacBusiness = hvacKeywords.some(keyword => 
            businessName.includes(keyword) || 
            businessDescription.includes(keyword) ||
            businessServices.some((service: string) => service.toLowerCase().includes(keyword))
          );
          
          // Exclude jewelry and other non-HVAC businesses
          const nonHvacKeywords = ['jewelry', 'appraisal', 'diamond', 'gold', 'silver', 'watch', 'ring'];
          const isNonHvacBusiness = nonHvacKeywords.some(keyword => 
            businessName.includes(keyword) || 
            businessDescription.includes(keyword)
          );
          
          return isHvacBusiness && !isNonHvacBusiness;
        });
        
        console.log('Found HVAC businesses:', hvacBusinesses.length);
        
        // If no HVAC businesses in database, use sample data
        return hvacBusinesses.length > 0 ? hvacBusinesses as Business[] : SAMPLE_BUSINESSES;
      } catch (error) {
        console.error('Error fetching businesses:', error);
        return SAMPLE_BUSINESSES;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
