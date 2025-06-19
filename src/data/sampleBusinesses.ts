
// Sample businesses for Florida cities
export interface SampleBusiness {
  name: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  services: string[];
  rating: number;
  review_count: number;
  featured: boolean;
  insurance_verified: boolean;
  license_number?: string;
  business_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export const FLORIDA_SAMPLE_BUSINESSES: SampleBusiness[] = [
  // Jacksonville businesses
  {
    name: "Jacksonville Premier AC Repair",
    description: "Professional HVAC services serving Jacksonville and surrounding areas for over 15 years. Specializing in residential and commercial AC repair, installation, and maintenance.",
    phone: "(904) 555-0101",
    email: "info@jaxpremierac.com",
    website: "https://jaxpremierac.com",
    address: "1234 Atlantic Blvd",
    city: "Jacksonville",
    state: "FL",
    zip_code: "32207",
    services: ["AC Repair", "Installation", "Emergency Service", "Maintenance"],
    rating: 4.8,
    review_count: 127,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1816234",
    business_hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM", 
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "Emergency Only"
    }
  },
  {
    name: "River City HVAC Solutions",
    description: "Trusted AC repair and HVAC services in Jacksonville. Licensed, insured, and committed to keeping your home comfortable year-round.",
    phone: "(904) 555-0102",
    email: "service@rivercityhvac.com",
    address: "5678 University Blvd N",
    city: "Jacksonville",
    state: "FL",
    zip_code: "32211",
    services: ["AC Repair", "Heat Pump Service", "Duct Cleaning", "Commercial HVAC"],
    rating: 4.6,
    review_count: 89,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1816235",
    business_hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    }
  },
  {
    name: "Duval County Air Conditioning",
    description: "Family-owned AC repair company serving Jacksonville since 1998. Expert technicians providing reliable HVAC solutions.",
    phone: "(904) 555-0103",
    email: "info@duvalac.com",
    address: "9876 Baymeadows Rd",
    city: "Jacksonville",
    state: "FL",
    zip_code: "32256",
    services: ["Emergency Service", "AC Installation", "Maintenance", "Indoor Air Quality"],
    rating: 4.7,
    review_count: 156,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1816236",
    business_hours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Miami businesses
  {
    name: "Miami Beach AC Experts",
    description: "Premier air conditioning services in Miami-Dade County. Specializing in high-efficiency systems and emergency repairs.",
    phone: "(305) 555-0201",
    email: "service@miamibeachac.com",
    address: "1500 Collins Ave",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    services: ["AC Repair", "Installation", "Emergency Service", "Commercial HVAC"],
    rating: 4.9,
    review_count: 243,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1817101",
    business_hours: {
      monday: "6:00 AM - 10:00 PM",
      tuesday: "6:00 AM - 10:00 PM",
      wednesday: "6:00 AM - 10:00 PM",
      thursday: "6:00 AM - 10:00 PM",
      friday: "6:00 AM - 10:00 PM",
      saturday: "6:00 AM - 10:00 PM",
      sunday: "24/7 Emergency"
    }
  },
  {
    name: "Magic City HVAC Services",
    description: "Professional HVAC contractors serving Miami and surrounding areas. Licensed, bonded, and insured with 20+ years experience.",
    phone: "(305) 555-0202",
    email: "info@magiccityhvac.com",
    address: "2300 NW 7th Ave",
    city: "Miami",
    state: "FL",
    zip_code: "33127",
    services: ["Heat Pump Service", "Duct Cleaning", "Maintenance", "Indoor Air Quality"],
    rating: 4.5,
    review_count: 178,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1817102",
    business_hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Tampa businesses
  {
    name: "Tampa Bay AC Professionals",
    description: "Leading AC repair and HVAC services in Tampa Bay area. Certified technicians providing quality service since 2005.",
    phone: "(813) 555-0301",
    email: "contact@tampabayac.com",
    address: "3456 Dale Mabry Hwy",
    city: "Tampa",
    state: "FL",
    zip_code: "33609",
    services: ["AC Repair", "Installation", "Emergency Service", "Maintenance"],
    rating: 4.8,
    review_count: 194,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1818201",
    business_hours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "Emergency Only"
    }
  },
  {
    name: "Hillsborough HVAC Solutions",
    description: "Trusted HVAC contractor serving Tampa and Hillsborough County. Specializing in energy-efficient AC systems and repairs.",
    phone: "(813) 555-0302",
    email: "service@hillsboroughhvac.com",
    address: "7890 Fletcher Ave",
    city: "Tampa",
    state: "FL",
    zip_code: "33618",
    services: ["Commercial HVAC", "Duct Cleaning", "Heat Pump Service", "Indoor Air Quality"],
    rating: 4.6,
    review_count: 132,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1818202",
    business_hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 3:00 PM",
      sunday: "Closed"
    }
  },
  // Orlando businesses
  {
    name: "Orlando AC Masters",
    description: "Expert AC repair and installation services in Orlando and Orange County. Family-owned business with over 25 years experience.",
    phone: "(407) 555-0401",
    email: "info@orlandoacmasters.com",
    address: "4567 Colonial Dr",
    city: "Orlando",
    state: "FL",
    zip_code: "32808",
    services: ["AC Repair", "Installation", "Emergency Service", "Maintenance"],
    rating: 4.9,
    review_count: 287,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1819301",
    business_hours: {
      monday: "6:00 AM - 9:00 PM",
      tuesday: "6:00 AM - 9:00 PM",
      wednesday: "6:00 AM - 9:00 PM",
      thursday: "6:00 AM - 9:00 PM",
      friday: "6:00 AM - 9:00 PM",
      saturday: "7:00 AM - 7:00 PM",
      sunday: "24/7 Emergency"
    }
  },
  {
    name: "Central Florida HVAC",
    description: "Professional HVAC services throughout Central Florida. Licensed contractors specializing in residential and commercial systems.",
    phone: "(407) 555-0402",
    email: "service@centralfloridahvac.com",
    address: "8901 International Dr",
    city: "Orlando",
    state: "FL",
    zip_code: "32819",
    services: ["Commercial HVAC", "Heat Pump Service", "Duct Cleaning", "Indoor Air Quality"],
    rating: 4.7,
    review_count: 165,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1819302",
    business_hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Fort Lauderdale businesses
  {
    name: "Fort Lauderdale AC Repair Pro",
    description: "Leading AC repair specialists in Broward County. Fast, reliable service with experienced, licensed technicians.",
    phone: "(954) 555-0501",
    email: "contact@ftlacpro.com",
    address: "2345 Las Olas Blvd",
    city: "Fort Lauderdale",
    state: "FL",
    zip_code: "33301",
    services: ["AC Repair", "Installation", "Emergency Service", "Maintenance"],
    rating: 4.8,
    review_count: 201,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1820401",
    business_hours: {
      monday: "7:00 AM - 8:00 PM",
      tuesday: "7:00 AM - 8:00 PM",
      wednesday: "7:00 AM - 8:00 PM",
      thursday: "7:00 AM - 8:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 6:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Add more cities with 2-3 businesses each
  // West Palm Beach
  {
    name: "Palm Beach County AC Services",
    description: "Trusted AC repair and HVAC services in West Palm Beach area. Certified professionals with 15+ years experience.",
    phone: "(561) 555-0601",
    email: "info@pbcac.com",
    address: "3456 Okeechobee Blvd",
    city: "West Palm Beach",
    state: "FL",
    zip_code: "33409",
    services: ["AC Repair", "Installation", "Emergency Service", "Commercial HVAC"],
    rating: 4.7,
    review_count: 143,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1821501",
    business_hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Stuart
  {
    name: "Treasure Coast AC Repair",
    description: "Professional AC repair services in Stuart and Martin County. Family-owned business providing reliable HVAC solutions.",
    phone: "(772) 555-0701",
    email: "service@treasurecoastac.com",
    address: "1234 SE Federal Hwy",
    city: "Stuart",
    state: "FL",
    zip_code: "34994",
    services: ["AC Repair", "Heat Pump Service", "Maintenance", "Indoor Air Quality"],
    rating: 4.9,
    review_count: 98,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1822601",
    business_hours: {
      monday: "7:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 6:00 PM",
      thursday: "7:00 AM - 6:00 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Emergency Only"
    }
  },
  // Naples
  {
    name: "Naples Elite AC Services",
    description: "Premium AC repair and HVAC services in Naples and Collier County. Luxury home specialists with top-rated service.",
    phone: "(239) 555-0801",
    email: "contact@napleseliteac.com",
    address: "5678 Airport Rd N",
    city: "Naples",
    state: "FL",
    zip_code: "34105",
    services: ["AC Repair", "Installation", "Maintenance", "Commercial HVAC"],
    rating: 4.8,
    review_count: 176,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1823701",
    business_hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM",
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "8:00 AM - 5:00 PM",
      sunday: "Emergency Only"
    }
  }
];

// Function to get businesses by city
export const getBusinessesByCity = (cityName: string): SampleBusiness[] => {
  return FLORIDA_SAMPLE_BUSINESSES.filter(
    business => business.city.toLowerCase() === cityName.toLowerCase()
  );
};

// Function to get all unique cities with businesses
export const getCitiesWithBusinesses = (): string[] => {
  return [...new Set(FLORIDA_SAMPLE_BUSINESSES.map(business => business.city))];
};
