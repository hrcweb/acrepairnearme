
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const handleCountySelect = (county: string) => {
    if (selectedCounty === county) {
      setSelectedCounty(null);
    } else {
      setSelectedCounty(county);
    }
  };

  const handleTownSelect = (town: string) => {
    onTownSelect(town);
  };

  const clearSelection = () => {
    onTownSelect("");
    setSelectedCounty(null);
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
        {/* County Selection */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Select County:</h3>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(FLORIDA_COUNTIES).map((county) => (
              <Button
                key={county}
                variant={selectedCounty === county ? "default" : "outline"}
                className="justify-start h-auto p-4"
                onClick={() => handleCountySelect(county)}
              >
                <div className="text-left">
                  <div className="font-medium">{county}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {FLORIDA_COUNTIES[county as keyof typeof FLORIDA_COUNTIES].length} cities available
                  </div>
                </div>
                {selectedCounty === county && (
                  <span className="ml-auto">▼</span>
                )}
                {selectedCounty !== county && (
                  <span className="ml-auto">▶</span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* City Selection */}
        {selectedCounty && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">
              Select City in {selectedCounty}:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {FLORIDA_COUNTIES[selectedCounty as keyof typeof FLORIDA_COUNTIES].map((city) => (
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

        {!selectedCounty && (
          <p className="text-sm text-gray-500">
            Select a county above to view available cities and find AC repair contractors in your area.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CountyTownSelector;
