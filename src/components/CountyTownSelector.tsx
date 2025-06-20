
import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface County {
  name: string;
  cities: string[];
}

const FLORIDA_COUNTIES: County[] = [
  {
    name: "Palm Beach County",
    cities: ["West Palm Beach", "Boca Raton", "Delray Beach", "Boynton Beach", "Lake Worth", "Jupiter", "Palm Beach Gardens", "Royal Palm Beach"]
  },
  {
    name: "Broward County", 
    cities: ["Fort Lauderdale", "Hollywood", "Pembroke Pines", "Coral Springs", "Pompano Beach", "Davie", "Plantation", "Sunrise", "Miramar", "Weston", "Deerfield Beach", "Coconut Creek", "Margate", "Tamarac", "Parkland", "Cooper City", "Lighthouse Point"]
  },
  {
    name: "Miami-Dade County",
    cities: ["Miami", "Hialeah", "Miami Beach", "Homestead", "Coral Gables", "Doral", "Kendall", "Aventura", "Pinecrest", "Palmetto Bay"]
  },
  {
    name: "Orange County",
    cities: ["Orlando", "Winter Park", "Apopka", "Ocoee", "Winter Garden", "Maitland", "Altamonte Springs", "Casselberry", "Longwood"]
  },
  {
    name: "Hillsborough County",
    cities: ["Tampa", "Brandon", "Riverview", "Valrico", "Seffner", "Plant City", "Temple Terrace", "Town 'n' Country"]
  },
  {
    name: "Pinellas County",
    cities: ["St. Petersburg", "Clearwater", "Largo", "Pinellas Park", "Seminole", "Kenneth City", "Gulfport", "Dunedin", "Tarpon Springs", "Safety Harbor"]
  },
  {
    name: "Lee County",
    cities: ["Fort Myers", "Cape Coral", "Bonita Springs", "Estero", "Lehigh Acres", "North Fort Myers", "San Carlos Park"]
  },
  {
    name: "Collier County",
    cities: ["Naples", "Marco Island", "Immokalee", "Golden Gate", "Lely Resort", "Pelican Bay"]
  },
  {
    name: "Sarasota County",
    cities: ["Sarasota", "Bradenton", "Venice", "North Port", "Palmetto", "Longboat Key", "Siesta Key"]
  },
  {
    name: "Martin County",
    cities: ["Stuart", "Jensen Beach", "Palm City", "Hobe Sound", "Indiantown", "Ocean Breeze Park"]
  },
  {
    name: "Duval County",
    cities: ["Jacksonville", "Atlantic Beach", "Neptune Beach", "Jacksonville Beach", "Baldwin", "Fernandina Beach"]
  }
];

interface CountyTownSelectorProps {
  onTownSelect: (town: string) => void;
  selectedTown?: string;
}

const CountyTownSelector = ({ onTownSelect, selectedTown }: CountyTownSelectorProps) => {
  const [openCounties, setOpenCounties] = useState<string[]>([]);

  const toggleCounty = (countyName: string) => {
    setOpenCounties(prev => 
      prev.includes(countyName) 
        ? prev.filter(name => name !== countyName)
        : [...prev, countyName]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Browse by Location
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select your county and city to find AC repair contractors in your area
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {FLORIDA_COUNTIES.map((county) => (
          <Collapsible 
            key={county.name}
            open={openCounties.includes(county.name)}
            onOpenChange={() => toggleCounty(county.name)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-blue-50 p-3 h-auto"
              >
                <span className="font-medium text-left">{county.name}</span>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${
                    openCounties.includes(county.name) ? 'rotate-90' : ''
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 ml-4">
              {county.cities.map((city) => (
                <Button
                  key={city}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-700 ${
                    selectedTown === city ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600'
                  }`}
                  onClick={() => onTownSelect(city)}
                >
                  {city}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default CountyTownSelector;
