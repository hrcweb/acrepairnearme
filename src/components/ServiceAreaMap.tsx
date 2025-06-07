
import { useState } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceArea {
  city: string;
  zipCodes: string[];
  businessCount: number;
}

const serviceAreas: ServiceArea[] = [
  { city: "Miami", zipCodes: ["33101", "33125", "33139", "33154"], businessCount: 45 },
  { city: "Orlando", zipCodes: ["32801", "32804", "32806", "32809"], businessCount: 38 },
  { city: "Tampa", zipCodes: ["33602", "33607", "33612", "33618"], businessCount: 42 },
  { city: "Jacksonville", zipCodes: ["32202", "32207", "32211", "32216"], businessCount: 29 },
  { city: "Fort Lauderdale", zipCodes: ["33301", "33304", "33308", "33312"], businessCount: 31 },
  { city: "St. Petersburg", zipCodes: ["33701", "33704", "33707", "33712"], businessCount: 25 },
  { city: "Hialeah", zipCodes: ["33010", "33012", "33015", "33018"], businessCount: 22 },
  { city: "Tallahassee", zipCodes: ["32301", "32304", "32308", "32312"], businessCount: 18 },
  { city: "Cape Coral", zipCodes: ["33904", "33909", "33914", "33919"], businessCount: 16 },
  { city: "Port St. Lucie", zipCodes: ["34952", "34953", "34986", "34987"], businessCount: 14 }
];

interface ServiceAreaMapProps {
  onAreaSelect?: (area: ServiceArea) => void;
}

const ServiceAreaMap = ({ onAreaSelect }: ServiceAreaMapProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  const filteredAreas = serviceAreas.filter(area =>
    area.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.zipCodes.some(zip => zip.includes(searchQuery))
  );

  const handleAreaClick = (area: ServiceArea) => {
    setSelectedArea(area);
    onAreaSelect?.(area);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Service Area Coverage</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or zip code..."
              className="pl-10"
            />
          </div>

          {/* Interactive Map Placeholder */}
          <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Interactive Florida Map</p>
              <p className="text-sm text-gray-500">Click on cities below to see coverage</p>
            </div>
          </div>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAreas.map((area) => (
              <div
                key={area.city}
                onClick={() => handleAreaClick(area)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedArea?.city === area.city
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{area.city}</h4>
                    <p className="text-sm text-gray-600">
                      {area.zipCodes.length} zip codes
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {area.businessCount} businesses
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Area Details */}
          {selectedArea && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-900">
                    {selectedArea.city} Service Area
                  </h4>
                  <Button 
                    size="sm" 
                    onClick={() => onAreaSelect?.(selectedArea)}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    View Businesses
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>{selectedArea.businessCount}</strong> AC contractors available
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>Zip Codes:</strong> {selectedArea.zipCodes.join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {serviceAreas.length}
              </p>
              <p className="text-sm text-gray-600">Cities Covered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {serviceAreas.reduce((total, area) => total + area.zipCodes.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Zip Codes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {serviceAreas.reduce((total, area) => total + area.businessCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Businesses</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceAreaMap;
