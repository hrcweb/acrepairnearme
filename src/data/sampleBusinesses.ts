// Sample businesses for Florida cities - HVAC/AC contractors only
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
  // Jacksonville HVAC businesses
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
    services: ["AC Repair", "AC Installation", "HVAC Maintenance", "Emergency AC Service"],
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
    description: "Trusted AC repair and HVAC services in Jacksonville. Licensed, insured, and committed to keeping your home comfortable year-round with professional air conditioning services.",
    phone: "(904) 555-0102",
    email: "service@rivercityhvac.com",
    address: "5678 University Blvd N",
    city: "Jacksonville",
    state: "FL",
    zip_code: "32211",
    services: ["AC Repair", "Heat Pump Service", "Air Duct Cleaning", "Commercial HVAC"],
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
    description: "Family-owned AC repair company serving Jacksonville since 1998. Expert HVAC technicians providing reliable air conditioning solutions and emergency repair services.",
    phone: "(904) 555-0103",
    email: "info@duvalac.com",
    address: "9876 Baymeadows Rd",
    city: "Jacksonville",
    state: "FL",
    zip_code: "32256",
    services: ["Emergency AC Service", "AC Installation", "HVAC Maintenance", "Indoor Air Quality"],
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
  // Miami HVAC businesses
  {
    name: "Miami Beach AC Experts",
    description: "Premier air conditioning services in Miami-Dade County. Specializing in high-efficiency AC systems, emergency repairs, and commercial HVAC solutions.",
    phone: "(305) 555-0201",
    email: "service@miamibeachac.com",
    address: "1500 Collins Ave",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "Commercial HVAC"],
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
    description: "Professional HVAC contractors serving Miami and surrounding areas. Licensed, bonded, and insured with 20+ years experience in air conditioning repair and installation.",
    phone: "(305) 555-0202",
    email: "info@magiccityhvac.com",
    address: "2300 NW 7th Ave",
    city: "Miami",
    state: "FL",
    zip_code: "33127",
    services: ["Heat Pump Service", "Air Duct Cleaning", "HVAC Maintenance", "Indoor Air Quality"],
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
  // Tampa HVAC businesses
  {
    name: "Tampa Bay AC Professionals",
    description: "Leading AC repair and HVAC services in Tampa Bay area. Certified air conditioning technicians providing quality service since 2005.",
    phone: "(813) 555-0301",
    email: "contact@tampabayac.com",
    address: "3456 Dale Mabry Hwy",
    city: "Tampa",
    state: "FL",
    zip_code: "33609",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
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
    description: "Trusted HVAC contractor serving Tampa and Hillsborough County. Specializing in energy-efficient AC systems, repairs, and commercial air conditioning services.",
    phone: "(813) 555-0302",
    email: "service@hillsboroughhvac.com",
    address: "7890 Fletcher Ave",
    city: "Tampa",
    state: "FL",
    zip_code: "33618",
    services: ["Commercial HVAC", "Air Duct Cleaning", "Heat Pump Service", "Indoor Air Quality"],
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
  // Orlando HVAC businesses
  {
    name: "Orlando AC Masters",
    description: "Expert AC repair and installation services in Orlando and Orange County. Family-owned air conditioning business with over 25 years experience.",
    phone: "(407) 555-0401",
    email: "info@orlandoacmasters.com",
    address: "4567 Colonial Dr",
    city: "Orlando",
    state: "FL",
    zip_code: "32808",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
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
    description: "Professional HVAC services throughout Central Florida. Licensed air conditioning contractors specializing in residential and commercial AC systems.",
    phone: "(407) 555-0402",
    email: "service@centralfloridahvac.com",
    address: "8901 International Dr",
    city: "Orlando",
    state: "FL",
    zip_code: "32819",
    services: ["Commercial HVAC", "Heat Pump Service", "Air Duct Cleaning", "Indoor Air Quality"],
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
  // Fort Lauderdale HVAC businesses
  {
    name: "Fort Lauderdale AC Repair Pro",
    description: "Leading AC repair specialists in Broward County. Fast, reliable air conditioning service with experienced, licensed HVAC technicians.",
    phone: "(954) 555-0501",
    email: "contact@ftlacpro.com",
    address: "2345 Las Olas Blvd",
    city: "Fort Lauderdale",
    state: "FL",
    zip_code: "33301",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
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
  // West Palm Beach HVAC businesses
  {
    name: "Palm Beach County AC Services",
    description: "Trusted AC repair and HVAC services in West Palm Beach area. Certified air conditioning professionals with 15+ years experience.",
    phone: "(561) 555-0601",
    email: "info@pbcac.com",
    address: "3456 Okeechobee Blvd",
    city: "West Palm Beach",
    state: "FL",
    zip_code: "33409",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "Commercial HVAC"],
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
  // Stuart HVAC businesses
  {
    name: "Treasure Coast AC Repair",
    description: "Professional AC repair services in Stuart and Martin County. Family-owned air conditioning business providing reliable HVAC solutions.",
    phone: "(772) 555-0701",
    email: "service@treasurecoastac.com",
    address: "1234 SE Federal Hwy",
    city: "Stuart",
    state: "FL",
    zip_code: "34994",
    services: ["AC Repair", "Heat Pump Service", "HVAC Maintenance", "Indoor Air Quality"],
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
  // Naples HVAC businesses
  {
    name: "Naples Elite AC Services",
    description: "Premium AC repair and HVAC services in Naples and Collier County. Luxury home air conditioning specialists with top-rated service.",
    phone: "(239) 555-0801",
    email: "contact@napleseliteac.com",
    address: "5678 Airport Rd N",
    city: "Naples",
    state: "FL",
    zip_code: "34105",
    services: ["AC Repair", "AC Installation", "HVAC Maintenance", "Commercial HVAC"],
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
  },

  // Clearwater HVAC businesses
  {
    name: "Clearwater Climate Control",
    description: "Professional HVAC services in Clearwater and Pinellas County. Specializing in residential AC repair, installation, and maintenance with 24/7 emergency service.",
    phone: "(727) 555-0901",
    email: "info@clearwaterclimate.com",
    website: "https://clearwaterclimate.com",
    address: "4567 Gulf to Bay Blvd",
    city: "Clearwater",
    state: "FL",
    zip_code: "33759",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
    rating: 4.8,
    review_count: 167,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1824801",
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
    name: "Pinellas Air Conditioning",
    description: "Trusted AC repair and HVAC services in Clearwater area. Licensed and insured contractors providing reliable air conditioning solutions.",
    phone: "(727) 555-0902",
    email: "service@pinellasac.com",
    address: "8901 Ulmerton Rd",
    city: "Clearwater",
    state: "FL",
    zip_code: "33762",
    services: ["Heat Pump Service", "Air Duct Cleaning", "Commercial HVAC", "Indoor Air Quality"],
    rating: 4.6,
    review_count: 124,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1824802",
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
  
  // St. Petersburg HVAC businesses
  {
    name: "St. Pete AC Specialists",
    description: "Expert air conditioning services in St. Petersburg. Professional HVAC technicians providing quality AC repair and installation since 2010.",
    phone: "(727) 555-1001",
    email: "contact@stpeteac.com",
    address: "1234 4th St N",
    city: "St. Petersburg",
    state: "FL",
    zip_code: "33701",
    services: ["AC Repair", "AC Installation", "HVAC Maintenance", "Emergency AC Service"],
    rating: 4.9,
    review_count: 198,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1825901",
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
    name: "Sunshine Bay HVAC",
    description: "Comprehensive HVAC services in St. Petersburg and surrounding areas. Specializing in energy-efficient AC systems and commercial installations.",
    phone: "(727) 555-1002",
    email: "info@sunshinebayac.com",
    address: "5678 Central Ave",
    city: "St. Petersburg",
    state: "FL",
    zip_code: "33710",
    services: ["Commercial HVAC", "Energy Efficiency", "Air Duct Cleaning", "Heat Pump Service"],
    rating: 4.7,
    review_count: 145,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1825902",
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
  
  // Sarasota HVAC businesses
  {
    name: "Sarasota Premier AC",
    description: "Premium air conditioning services in Sarasota County. Expert AC repair and installation with focus on customer satisfaction and quality workmanship.",
    phone: "(941) 555-1101",
    email: "service@sarasotapremierac.com",
    address: "2345 Bee Ridge Rd",
    city: "Sarasota",
    state: "FL",
    zip_code: "34233",
    services: ["AC Repair", "AC Installation", "HVAC Maintenance", "Indoor Air Quality"],
    rating: 4.8,
    review_count: 189,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1826001",
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
    name: "Gulf Coast HVAC Solutions",
    description: "Reliable HVAC contractor serving Sarasota and Manatee counties. Professional air conditioning services with 20+ years experience.",
    phone: "(941) 555-1102",
    email: "info@gulfcoasthvac.com",
    address: "6789 Clark Rd",
    city: "Sarasota",
    state: "FL",
    zip_code: "34238",
    services: ["Emergency AC Service", "Heat Pump Service", "Commercial HVAC", "Air Duct Cleaning"],
    rating: 4.5,
    review_count: 112,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1826002",
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
  
  // Bradenton HVAC businesses
  {
    name: "Bradenton Air Conditioning Pros",
    description: "Professional AC repair and HVAC services in Bradenton and Manatee County. Licensed contractors specializing in residential and commercial systems.",
    phone: "(941) 555-1201",
    email: "contact@bradentonacpros.com",
    address: "3456 Manatee Ave W",
    city: "Bradenton",
    state: "FL",
    zip_code: "34205",
    services: ["AC Repair", "AC Installation", "Commercial HVAC", "HVAC Maintenance"],
    rating: 4.7,
    review_count: 134,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1827101",
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
    name: "Manatee County HVAC",
    description: "Trusted HVAC services throughout Manatee County. Expert air conditioning repair and installation with emergency service available.",
    phone: "(941) 555-1202",
    email: "service@manateecountyhvac.com",
    address: "7890 Cortez Rd W",
    city: "Bradenton",
    state: "FL",
    zip_code: "34210",
    services: ["Emergency AC Service", "Heat Pump Service", "Indoor Air Quality", "Air Duct Cleaning"],
    rating: 4.6,
    review_count: 98,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1827102",
    business_hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Emergency Only"
    }
  },
  
  // Lakeland HVAC businesses
  {
    name: "Lakeland AC Repair Experts",
    description: "Professional air conditioning services in Lakeland and Polk County. Family-owned HVAC business with over 25 years of experience.",
    phone: "(863) 555-1301",
    email: "info@lakelandacexperts.com",
    address: "4567 Memorial Blvd",
    city: "Lakeland",
    state: "FL",
    zip_code: "33801",
    services: ["AC Repair", "AC Installation", "HVAC Maintenance", "Emergency AC Service"],
    rating: 4.9,
    review_count: 212,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1828201",
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
    name: "Polk County HVAC Services",
    description: "Comprehensive HVAC solutions in Lakeland area. Licensed and insured contractors providing quality air conditioning services.",
    phone: "(863) 555-1302",
    email: "contact@polkcountyhvac.com",
    address: "8901 Kathleen Rd",
    city: "Lakeland",
    state: "FL",
    zip_code: "33815",
    services: ["Commercial HVAC", "Heat Pump Service", "Air Duct Cleaning", "Indoor Air Quality"],
    rating: 4.5,
    review_count: 87,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1828202",
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
  
  // Gainesville HVAC businesses
  {
    name: "Gainesville AC Solutions",
    description: "Expert air conditioning services in Gainesville and Alachua County. Professional HVAC technicians serving residential and commercial clients.",
    phone: "(352) 555-1401",
    email: "service@gainesvilleacsolutions.com",
    address: "1234 NW 13th St",
    city: "Gainesville",
    state: "FL",
    zip_code: "32601",
    services: ["AC Repair", "AC Installation", "Commercial HVAC", "HVAC Maintenance"],
    rating: 4.8,
    review_count: 156,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1829301",
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
    name: "Alachua County HVAC",
    description: "Trusted HVAC contractor in Gainesville area. Specializing in energy-efficient AC systems and professional installation services.",
    phone: "(352) 555-1402",
    email: "info@alachuacountyhvac.com",
    address: "5678 SW Archer Rd",
    city: "Gainesville",
    state: "FL",
    zip_code: "32608",
    services: ["Energy Efficiency", "Heat Pump Service", "Indoor Air Quality", "Air Duct Cleaning"],
    rating: 4.6,
    review_count: 101,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1829302",
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
  
  // Ocala HVAC businesses
  {
    name: "Ocala Air Conditioning Masters",
    description: "Professional AC repair and HVAC services in Ocala and Marion County. Expert technicians with 30+ years combined experience.",
    phone: "(352) 555-1501",
    email: "contact@ocalaacmasters.com",
    address: "2345 Silver Springs Blvd",
    city: "Ocala",
    state: "FL",
    zip_code: "34470",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
    rating: 4.7,
    review_count: 143,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1830401",
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
    name: "Marion County HVAC Pros",
    description: "Reliable HVAC services throughout Marion County. Licensed air conditioning contractors providing quality service and installations.",
    phone: "(352) 555-1502",
    email: "service@marioncountyhvac.com",
    address: "6789 SW State Road 200",
    city: "Ocala",
    state: "FL",
    zip_code: "34476",
    services: ["Commercial HVAC", "Heat Pump Service", "Air Duct Cleaning", "Indoor Air Quality"],
    rating: 4.5,
    review_count: 89,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1830402",
    business_hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Emergency Only"
    }
  },
  
  // Tallahassee HVAC businesses
  {
    name: "Tallahassee AC Repair Specialists",
    description: "Expert air conditioning services in Tallahassee and Leon County. Professional HVAC technicians serving the capital city since 2005.",
    phone: "(850) 555-1601",
    email: "info@tallahasseeacrepair.com",
    address: "3456 Apalachee Pkwy",
    city: "Tallahassee",
    state: "FL",
    zip_code: "32301",
    services: ["AC Repair", "AC Installation", "Commercial HVAC", "Emergency AC Service"],
    rating: 4.8,
    review_count: 167,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1831501",
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
    name: "Capital City HVAC",
    description: "Trusted HVAC contractor in Tallahassee area. Specializing in residential and commercial air conditioning systems with quality service.",
    phone: "(850) 555-1602",
    email: "service@capitalcityhvac.com",
    address: "7890 Thomasville Rd",
    city: "Tallahassee",
    state: "FL",
    zip_code: "32312",
    services: ["HVAC Maintenance", "Heat Pump Service", "Indoor Air Quality", "Air Duct Cleaning"],
    rating: 4.6,
    review_count: 124,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1831502",
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
  
  // Pensacola HVAC businesses
  {
    name: "Pensacola AC Experts",
    description: "Professional air conditioning services in Pensacola and Escambia County. Expert HVAC technicians with focus on customer satisfaction.",
    phone: "(850) 555-1701",
    email: "contact@pensacolaacexperts.com",
    address: "1234 Navy Blvd",
    city: "Pensacola",
    state: "FL",
    zip_code: "32507",
    services: ["AC Repair", "AC Installation", "Emergency AC Service", "HVAC Maintenance"],
    rating: 4.9,
    review_count: 198,
    featured: true,
    insurance_verified: true,
    license_number: "CAC1832601",
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
    name: "Gulf Coast Air Conditioning",
    description: "Reliable HVAC services in Pensacola area. Licensed and insured contractors providing quality air conditioning solutions since 2000.",
    phone: "(850) 555-1702",
    email: "info@gulfcoastac.com",
    address: "5678 Mobile Hwy",
    city: "Pensacola",
    state: "FL",
    zip_code: "32526",
    services: ["Commercial HVAC", "Heat Pump Service", "Air Duct Cleaning", "Indoor Air Quality"],
    rating: 4.7,
    review_count: 156,
    featured: false,
    insurance_verified: true,
    license_number: "CAC1832602",
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
