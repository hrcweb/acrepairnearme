
// City data for Florida locations with SEO-optimized information
export interface CityData {
  name: string;
  slug: string;
  county: string;
  zipCodes: string[];
  population?: number;
  description: string;
  seoKeywords: string[];
}

export const FLORIDA_CITIES: CityData[] = [
  {
    name: "Stuart",
    slug: "stuart",
    county: "Martin County",
    zipCodes: ["34994", "34996", "34997"],
    population: 17000,
    description: "Stuart is a beautiful coastal city in Martin County, known for its pristine beaches and year-round warm weather that keeps AC systems working hard.",
    seoKeywords: ["stuart ac repair", "martin county hvac", "stuart air conditioning", "stuart emergency ac"]
  },
  {
    name: "West Palm Beach",
    slug: "west-palm-beach",
    county: "Palm Beach County",
    zipCodes: ["33401", "33402", "33403", "33404", "33405", "33406", "33407", "33409", "33411", "33412", "33413", "33414", "33415", "33417", "33418"],
    population: 117000,
    description: "West Palm Beach is a major city in Palm Beach County with hot, humid summers requiring reliable AC systems for homes and businesses.",
    seoKeywords: ["west palm beach ac repair", "palm beach county hvac", "west palm beach air conditioning", "wpb emergency ac"]
  },
  {
    name: "Boca Raton",
    slug: "boca-raton",
    county: "Palm Beach County",
    zipCodes: ["33427", "33428", "33429", "33431", "33432", "33433", "33434", "33486", "33487", "33488", "33496", "33497", "33498"],
    population: 97000,
    description: "Boca Raton is an upscale city in Palm Beach County where residents expect premium AC repair and HVAC maintenance services.",
    seoKeywords: ["boca raton ac repair", "boca raton hvac", "boca raton air conditioning", "boca raton emergency ac"]
  },
  {
    name: "Fort Lauderdale",
    slug: "fort-lauderdale",
    county: "Broward County",
    zipCodes: ["33301", "33302", "33303", "33304", "33305", "33306", "33307", "33308", "33309", "33311", "33312", "33313", "33314", "33315", "33316", "33317", "33318", "33319", "33321", "33322", "33323", "33324", "33325", "33326", "33327", "33328", "33329", "33330", "33331", "33332", "33334", "33335", "33336", "33337", "33338", "33339", "33340", "33345", "33346", "33348", "33349", "33351", "33355", "33359", "33394"],
    population: 183000,
    description: "Fort Lauderdale's tropical climate and bustling business district create high demand for reliable commercial and residential AC repair services.",
    seoKeywords: ["fort lauderdale ac repair", "broward county hvac", "fort lauderdale air conditioning", "fort lauderdale emergency ac"]
  },
  {
    name: "Miami",
    slug: "miami",
    county: "Miami-Dade County",
    zipCodes: ["33101", "33102", "33109", "33111", "33112", "33116", "33122", "33124", "33125", "33126", "33127", "33128", "33129", "33130", "33131", "33132", "33133", "33134", "33135", "33136", "33137", "33138", "33139", "33140", "33141", "33142", "33143", "33144", "33145", "33146", "33147", "33150", "33151", "33152", "33153", "33154", "33155", "33156", "33157", "33158", "33161", "33162", "33163", "33164", "33165", "33166", "33167", "33168", "33169", "33170", "33172", "33173", "33174", "33175", "33176", "33177", "33178", "33179", "33180", "33181", "33182", "33183", "33184", "33185", "33186", "33187", "33189", "33190", "33193", "33194", "33196", "33197", "33199"],
    population: 470000,
    description: "Miami's year-round heat and humidity make reliable AC systems essential for the city's residents and thriving business community.",
    seoKeywords: ["miami ac repair", "miami dade hvac", "miami air conditioning", "miami emergency ac repair"]
  },
  {
    name: "Orlando",
    slug: "orlando",
    county: "Orange County", 
    zipCodes: ["32801", "32802", "32803", "32804", "32805", "32806", "32807", "32808", "32809", "32810", "32811", "32812", "32814", "32815", "32816", "32817", "32818", "32819", "32820", "32821", "32822", "32824", "32825", "32826", "32827", "32828", "32829", "32830", "32831", "32832", "32833", "32834", "32835", "32836", "32837", "32839"],
    population: 310000,
    description: "Orlando's hot climate and tourism industry create unique AC repair needs for both residential and commercial properties.",
    seoKeywords: ["orlando ac repair", "orange county hvac", "orlando air conditioning", "orlando emergency ac"]
  },
  {
    name: "Palm Beach Gardens",
    slug: "palm-beach-gardens",
    county: "Palm Beach County",
    zipCodes: ["33403", "33408", "33410", "33412", "33418"],
    population: 59000,
    description: "Palm Beach Gardens is an affluent community requiring premium AC repair and maintenance services for luxury homes and businesses.",
    seoKeywords: ["palm beach gardens ac repair", "pbg hvac", "palm beach gardens air conditioning"]
  },
  {
    name: "Jupiter",
    slug: "jupiter",
    county: "Palm Beach County",
    zipCodes: ["33458", "33468", "33469", "33477", "33478"],
    population: 65000,
    description: "Jupiter's coastal location and upscale communities demand reliable AC repair services to combat Florida's heat and humidity.",
    seoKeywords: ["jupiter ac repair", "jupiter hvac", "jupiter air conditioning", "jupiter emergency ac"]
  },
  {
    name: "Boynton Beach",
    slug: "boynton-beach",
    county: "Palm Beach County",
    zipCodes: ["33424", "33425", "33426", "33435", "33436", "33437"],
    population: 80000,
    description: "Boynton Beach residents rely on professional AC repair services to maintain comfort in South Florida's challenging climate.",
    seoKeywords: ["boynton beach ac repair", "boynton beach hvac", "boynton beach air conditioning"]
  },
  {
    name: "Delray Beach",
    slug: "delray-beach",
    county: "Palm Beach County",
    zipCodes: ["33444", "33445", "33446", "33447", "33448", "33484"],
    population: 70000,
    description: "Delray Beach's vibrant downtown and residential areas require expert AC repair and HVAC maintenance year-round.",
    seoKeywords: ["delray beach ac repair", "delray beach hvac", "delray beach air conditioning"]
  },
  // Adding more cities based on the database data
  {
    name: "Royal Palm Beach",
    slug: "royal-palm-beach",
    county: "Palm Beach County",
    zipCodes: ["33411", "33421"],
    description: "Royal Palm Beach is a growing community that needs reliable AC repair services for its expanding residential and commercial properties.",
    seoKeywords: ["royal palm beach ac repair", "royal palm beach hvac"]
  },
  {
    name: "Lake Worth",
    slug: "lake-worth",
    county: "Palm Beach County",
    zipCodes: ["33449", "33460", "33461", "33462", "33463", "33464", "33465", "33466", "33467"],
    description: "Lake Worth residents depend on professional AC repair services to stay comfortable in South Florida's tropical climate.",
    seoKeywords: ["lake worth ac repair", "lake worth hvac", "lake worth air conditioning"]
  },
  {
    name: "Coral Springs",
    slug: "coral-springs",
    county: "Broward County",
    zipCodes: ["33065", "33071", "33073", "33076", "33077"],
    description: "Coral Springs families and businesses need reliable AC repair services to maintain comfort in Broward County's warm climate.",
    seoKeywords: ["coral springs ac repair", "coral springs hvac", "coral springs air conditioning"]
  },
  {
    name: "Parkland",
    slug: "parkland",
    county: "Broward County",
    zipCodes: ["33067", "33076"],
    description: "Parkland's luxury homes and businesses require premium AC repair and HVAC maintenance services.",
    seoKeywords: ["parkland ac repair", "parkland hvac", "parkland air conditioning"]
  },
  {
    name: "Coconut Creek",
    slug: "coconut-creek",
    county: "Broward County",
    zipCodes: ["33063", "33066", "33073", "33097"],
    description: "Coconut Creek residents rely on expert AC repair services to combat South Florida's heat and humidity.",
    seoKeywords: ["coconut creek ac repair", "coconut creek hvac", "coconut creek air conditioning"]
  },
  {
    name: "Margate",
    slug: "margate",
    county: "Broward County",
    zipCodes: ["33063", "33066", "33068"],
    description: "Margate homeowners and businesses need dependable AC repair services for year-round comfort.",
    seoKeywords: ["margate ac repair", "margate hvac", "margate air conditioning"]
  },
  {
    name: "Pompano Beach",
    slug: "pompano-beach",
    county: "Broward County",
    zipCodes: ["33060", "33061", "33062", "33063", "33064", "33065", "33066", "33067", "33068", "33069", "33071", "33072", "33073", "33074", "33075", "33076", "33077", "33093", "33097"],
    description: "Pompano Beach's coastal location creates unique AC repair challenges that our certified technicians are equipped to handle.",
    seoKeywords: ["pompano beach ac repair", "pompano beach hvac", "pompano beach air conditioning"]
  },
  {
    name: "Lighthouse Point",
    slug: "lighthouse-point",
    county: "Broward County",
    zipCodes: ["33064", "33074"],
    description: "Lighthouse Point's waterfront properties require specialized AC repair services to handle humid coastal conditions.",
    seoKeywords: ["lighthouse point ac repair", "lighthouse point hvac"]
  },
  {
    name: "Naples",
    slug: "naples",
    county: "Collier County",
    zipCodes: ["34101", "34102", "34103", "34104", "34105", "34106", "34107", "34108", "34109", "34110", "34112", "34113", "34114", "34116", "34117", "34119", "34120"],
    description: "Naples' luxury market demands premium AC repair and maintenance services for high-end residential and commercial properties.",
    seoKeywords: ["naples ac repair", "collier county hvac", "naples air conditioning", "naples emergency ac"]
  },
  {
    name: "Cape Coral",
    slug: "cape-coral",
    county: "Lee County",
    zipCodes: ["33904", "33909", "33910", "33914", "33915", "33990", "33991", "33993"],
    description: "Cape Coral's rapid growth requires reliable AC repair services for new and existing homes throughout Lee County.",
    seoKeywords: ["cape coral ac repair", "lee county hvac", "cape coral air conditioning"]
  },
  {
    name: "Fort Myers",
    slug: "fort-myers",
    county: "Lee County",
    zipCodes: ["33901", "33902", "33905", "33906", "33907", "33908", "33912", "33913", "33916", "33917", "33918", "33919", "33966", "33967", "33971", "33994"],
    description: "Fort Myers residents and businesses rely on professional AC repair services to stay cool in Southwest Florida's heat.",
    seoKeywords: ["fort myers ac repair", "fort myers hvac", "fort myers air conditioning", "fort myers emergency ac"]
  },
  {
    name: "Sarasota",
    slug: "sarasota",
    county: "Sarasota County",
    zipCodes: ["34234", "34235", "34236", "34237", "34238", "34239", "34240", "34241", "34242", "34243"],
    description: "Sarasota's cultural district and upscale neighborhoods require expert AC repair and HVAC maintenance services.",
    seoKeywords: ["sarasota ac repair", "sarasota county hvac", "sarasota air conditioning"]
  },
  {
    name: "Tampa",
    slug: "tampa",
    county: "Hillsborough County",
    zipCodes: ["33601", "33602", "33603", "33604", "33605", "33606", "33607", "33608", "33609", "33610", "33611", "33612", "33613", "33614", "33615", "33616", "33617", "33618", "33619", "33620", "33621", "33622", "33623", "33624", "33625", "33626", "33629", "33630", "33631", "33633", "33634", "33635", "33637", "33647", "33660", "33661", "33662", "33663", "33664", "33672", "33673", "33674", "33675", "33677", "33679", "33680", "33681", "33682", "33684", "33685", "33686", "33687", "33688", "33689", "33694"],
    population: 400000,
    description: "Tampa's thriving business district and growing residential areas create high demand for commercial and residential AC repair services.",
    seoKeywords: ["tampa ac repair", "hillsborough county hvac", "tampa air conditioning", "tampa emergency ac"]
  },
  {
    name: "St. Petersburg",
    slug: "st-petersburg",
    county: "Pinellas County",
    zipCodes: ["33701", "33702", "33703", "33704", "33705", "33706", "33707", "33708", "33709", "33710", "33711", "33712", "33713", "33714", "33715", "33716", "33730", "33731", "33732", "33733", "33734", "33736", "33738", "33740", "33741", "33742", "33743", "33747", "33755", "33756", "33759", "33760", "33761", "33762", "33763", "33764", "33767", "33770", "33771", "33772", "33773", "33774", "33776", "33777", "33778", "33781", "33782", "33785", "33786"],
    population: 265000,
    description: "St. Petersburg's waterfront location and arts district require specialized AC repair services for both historic and modern buildings.",
    seoKeywords: ["st petersburg ac repair", "pinellas county hvac", "st pete air conditioning"]
  },
  {
    name: "Clearwater",
    slug: "clearwater",
    county: "Pinellas County",
    zipCodes: ["33755", "33756", "33759", "33760", "33761", "33762", "33763", "33764", "33765", "33767", "33770", "33771", "33772", "33773", "33774", "33775", "33776", "33777", "33778", "33779", "33780", "33781", "33782", "33784", "33785", "33786", "33787"],
    description: "Clearwater's beach communities and inland areas need reliable AC repair services to handle Florida's year-round warmth.",
    seoKeywords: ["clearwater ac repair", "clearwater hvac", "clearwater air conditioning"]
  },
  {
    name: "Jacksonville",
    slug: "jacksonville",
    county: "Duval County",
    zipCodes: ["32099", "32201", "32202", "32203", "32204", "32205", "32206", "32207", "32208", "32209", "32210", "32211", "32212", "32214", "32216", "32217", "32218", "32219", "32220", "32221", "32222", "32223", "32224", "32225", "32226", "32227", "32228", "32233", "32234", "32235", "32236", "32237", "32244", "32246", "32247", "32250", "32254", "32256", "32257", "32258", "32259", "32266", "32277"],
    population: 950000,
    description: "Jacksonville's large metropolitan area requires extensive AC repair services for diverse residential and commercial properties.",
    seoKeywords: ["jacksonville ac repair", "duval county hvac", "jacksonville air conditioning", "jax emergency ac"]
  },
  {
    name: "Gainesville",
    slug: "gainesville",
    county: "Alachua County",
    zipCodes: ["32601", "32602", "32603", "32604", "32605", "32606", "32607", "32608", "32609", "32610", "32611", "32612", "32614", "32615", "32616", "32627", "32635", "32641", "32653"],
    description: "Gainesville's university community and growing residential areas depend on reliable AC repair services year-round.",
    seoKeywords: ["gainesville ac repair", "alachua county hvac", "gainesville air conditioning"]
  },
  {
    name: "Tallahassee",
    slug: "tallahassee",
    county: "Leon County",
    zipCodes: ["32301", "32302", "32303", "32304", "32305", "32306", "32307", "32308", "32309", "32310", "32311", "32312", "32313", "32314", "32315", "32316", "32317", "32395", "32399"],
    description: "Tallahassee's government offices and university require professional AC repair services for institutional and residential properties.",
    seoKeywords: ["tallahassee ac repair", "leon county hvac", "tallahassee air conditioning"]
  }
];

// Generate URL slug from city name
export const generateCitySlug = (cityName: string): string => {
  return cityName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Find city data by slug
export const getCityDataBySlug = (slug: string): CityData | undefined => {
  return FLORIDA_CITIES.find(city => city.slug === slug);
};

// Get all city slugs for routing
export const getAllCitySlugs = (): string[] => {
  return FLORIDA_CITIES.map(city => city.slug);
};
