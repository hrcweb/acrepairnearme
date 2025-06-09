
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CountyTownSelectorProps {
  onTownSelect: (town: string) => void;
  selectedTown: string;
}

const FLORIDA_CITIES = {
  "Florida AC Repair Centers": [
    // Palm Beach County
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
    "Canal Point",
    // Martin County
    "Stuart",
    "Palm City",
    "Jensen Beach",
    "Hobe Sound",
    "Port Salerno",
    "Indiantown",
    "Ocean Breeze Park",
    "Sewall's Point",
    "Jupiter Island",
    // Miami-Dade County
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
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateSelect = (state: string) => {
    if (selectedState === state) {
      setSelectedState(null);
    } else {
      setSelectedState(state);
    }
  };

  const handleTownSelect = (town: string) => {
    onTownSelect(town);
  };

  const clearSelection = () => {
    onTownSelect("");
    setSelectedState(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Browse by Location</span>
        </CardTitle>
        {selectedTown && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Selected: {selectedTown}</span>
              <button onClick={clearSelection} className="ml-1 text-xs hover:text-red-500">
                ✕
              </button>
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* State Selection */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Select State:</h3>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(FLORIDA_CITIES).map((state) => (
              <Button
                key={state}
                variant={selectedState === state ? "default" : "outline"}
                className="justify-start h-auto p-4"
                onClick={() => handleStateSelect(state)}
              >
                <div className="text-left">
                  <div className="font-medium">{state}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {FLORIDA_CITIES[state as keyof typeof FLORIDA_CITIES].length} cities available
                  </div>
                </div>
                {selectedState === state && (
                  <span className="ml-auto">▼</span>
                )}
                {selectedState !== state && (
                  <span className="ml-auto">▶</span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        {selectedState && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">
              Select City in {selectedState}:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {FLORIDA_CITIES[selectedState as keyof typeof FLORIDA_CITIES].map((city) => (
                <Button
                  key={city}
                  variant={selectedTown === city ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-xs h-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  onClick={() => handleTownSelect(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        )}

        {!selectedState && (
          <p className="text-sm text-gray-500">
            Select Florida above to view available cities and find AC repair contractors in your area.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CountyTownSelector;
