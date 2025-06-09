
import { useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface CountyTownSelectorProps {
  onTownSelect: (town: string) => void;
  selectedTown: string;
}

const FLORIDA_COUNTIES = {
  "Palm Beach County": [
    "West Palm Beach",
    "Boca Raton",
    "Delray Beach",
    "Boynton Beach",
    "Jupiter",
    "Palm Beach Gardens",
    "Wellington",
    "Royal Palm Beach",
    "Lake Worth",
    "Greenacres",
    "Lantana",
    "Palm Beach",
    "Riviera Beach",
    "North Palm Beach",
    "Palm Beach Shores",
    "Juno Beach",
    "Tequesta",
    "Highland Beach",
    "Gulf Stream",
    "Briny Breezes",
    "Ocean Ridge",
    "Manalapan",
    "South Palm Beach",
    "Atlantis",
    "Haverhill",
    "Pahokee",
    "Belle Glade",
    "South Bay",
    "Canal Point"
  ],
  "Martin County": [
    "Stuart",
    "Palm City",
    "Jensen Beach",
    "Hobe Sound",
    "Port Salerno",
    "Indiantown",
    "Ocean Breeze Park",
    "Sewall's Point",
    "Jupiter Island"
  ],
  "Miami-Dade County": [
    "Miami",
    "Miami Beach",
    "Coral Gables",
    "Hialeah",
    "Homestead",
    "Aventura",
    "Doral",
    "Kendall",
    "Pinecrest",
    "Palmetto Bay",
    "Cutler Bay",
    "Miami Lakes",
    "North Miami",
    "North Miami Beach",
    "Surfside",
    "Bal Harbour",
    "Bay Harbor Islands",
    "Biscayne Park",
    "El Portal",
    "Florida City",
    "Golden Beach",
    "Hialeah Gardens",
    "Indian Creek",
    "Key Biscayne",
    "Medley",
    "Miami Gardens",
    "Miami Shores",
    "Miami Springs",
    "Opa-locka",
    "South Miami",
    "Sunny Isles Beach",
    "Virginia Gardens",
    "West Miami",
    "Westchester"
  ]
};

const CountyTownSelector = ({ onTownSelect, selectedTown }: CountyTownSelectorProps) => {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCountySelect = (county: string) => {
    if (selectedCounty === county) {
      setSelectedCounty(null);
    } else {
      setSelectedCounty(county);
      setSearchTerm(""); // Clear search when switching counties
    }
  };

  const handleTownSelect = (town: string) => {
    onTownSelect(town);
  };

  const clearSelection = () => {
    onTownSelect("");
    setSelectedCounty(null);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter cities based on search term
  const getFilteredCities = (cities: string[]) => {
    if (!searchTerm) return cities;
    return cities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get total cities count for display
  const getTotalCitiesCount = () => {
    return Object.values(FLORIDA_COUNTIES).reduce((total, cities) => total + cities.length, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Browse by Location</span>
        </CardTitle>
        <div className="text-sm text-gray-500">
          {getTotalCitiesCount()} cities across {Object.keys(FLORIDA_COUNTIES).length} counties
        </div>
        {selectedTown && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1 bg-blue-50 text-blue-700 border-blue-200">
              <MapPin className="w-3 h-3" />
              <span>Selected: {selectedTown}</span>
              <button onClick={clearSelection} className="ml-1 text-xs hover:text-red-500 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* County Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs mr-2">
              Step 1
            </span>
            Select County:
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(FLORIDA_COUNTIES).map((county) => (
              <Button
                key={county}
                variant={selectedCounty === county ? "default" : "outline"}
                className={`justify-start h-auto p-4 transition-all duration-200 ${
                  selectedCounty === county 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md" 
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
                onClick={() => handleCountySelect(county)}
              >
                <div className="text-left flex-1">
                  <div className="font-medium">{county}</div>
                  <div className={`text-xs mt-1 ${
                    selectedCounty === county ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {FLORIDA_COUNTIES[county as keyof typeof FLORIDA_COUNTIES].length} cities available
                  </div>
                </div>
                <div className="ml-auto">
                  {selectedCounty === county ? (
                    <span className="text-blue-100">▼</span>
                  ) : (
                    <span className="text-gray-400">▶</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        {selectedCounty && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center">
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs mr-2">
                Step 2
              </span>
              Select City in {selectedCounty}:
            </h3>
            
            {/* Search within selected county */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={`Search cities in ${selectedCounty}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50/50">
              {getFilteredCities(FLORIDA_COUNTIES[selectedCounty as keyof typeof FLORIDA_COUNTIES]).map((city) => (
                <Button
                  key={city}
                  variant={selectedTown === city ? "default" : "outline"}
                  size="sm"
                  className={`justify-start text-xs h-8 transition-all duration-200 ${
                    selectedTown === city 
                      ? "bg-orange-500 hover:bg-orange-600 text-white" 
                      : "text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
                  }`}
                  onClick={() => handleTownSelect(city)}
                >
                  {city}
                </Button>
              ))}
            </div>

            {searchTerm && getFilteredCities(FLORIDA_COUNTIES[selectedCounty as keyof typeof FLORIDA_COUNTIES]).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No cities found matching "{searchTerm}"</p>
                <Button variant="link" onClick={clearSearch} className="text-xs">
                  Clear search
                </Button>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center">
              Showing {getFilteredCities(FLORIDA_COUNTIES[selectedCounty as keyof typeof FLORIDA_COUNTIES]).length} of {FLORIDA_COUNTIES[selectedCounty as keyof typeof FLORIDA_COUNTIES].length} cities
            </div>
          </div>
        )}

        {!selectedCounty && (
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-medium text-gray-700 mb-2">Choose Your County</h4>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Select a county above to view available cities and find verified AC repair contractors in your area.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CountyTownSelector;
