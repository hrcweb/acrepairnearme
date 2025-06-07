
import { useState } from "react";
import { MapPin, Navigation, Search, Phone, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceArea {
  city: string;
  zipCodes: string[];
  businessCount: number;
  avgRating: number;
  avgResponseTime: string;
}

const serviceAreas: ServiceArea[] = [
  { city: "Miami", zipCodes: ["33101", "33125", "33139", "33154"], businessCount: 45, avgRating: 4.8, avgResponseTime: "< 2 hours" },
  { city: "Orlando", zipCodes: ["32801", "32804", "32806", "32809"], businessCount: 38, avgRating: 4.7, avgResponseTime: "< 1 hour" },
  { city: "Tampa", zipCodes: ["33602", "33607", "33612", "33618"], businessCount: 42, avgRating: 4.9, avgResponseTime: "< 1 hour" },
  { city: "Jacksonville", zipCodes: ["32202", "32207", "32211", "32216"], businessCount: 29, avgRating: 4.6, avgResponseTime: "< 3 hours" },
  { city: "Fort Lauderdale", zipCodes: ["33301", "33304", "33308", "33312"], businessCount: 31, avgRating: 4.7, avgResponseTime: "< 2 hours" },
  { city: "St. Petersburg", zipCodes: ["33701", "33704", "33707", "33712"], businessCount: 25, avgRating: 4.8, avgResponseTime: "< 2 hours" },
  { city: "Hialeah", zipCodes: ["33010", "33012", "33015", "33018"], businessCount: 22, avgRating: 4.5, avgResponseTime: "< 3 hours" },
  { city: "Tallahassee", zipCodes: ["32301", "32304", "32308", "32312"], businessCount: 18, avgRating: 4.6, avgResponseTime: "< 4 hours" },
  { city: "Cape Coral", zipCodes: ["33904", "33909", "33914", "33919"], businessCount: 16, avgRating: 4.7, avgResponseTime: "< 3 hours" },
  { city: "Port St. Lucie", zipCodes: ["34952", "34953", "34986", "34987"], businessCount: 14, avgRating: 4.8, avgResponseTime: "< 2 hours" }
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

  const getAvailabilityColor = (businessCount: number) => {
    if (businessCount > 35) return "text-green-600";
    if (businessCount > 20) return "text-yellow-600";
    return "text-orange-600";
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

          {/* Interactive Map Placeholder with Florida outline */}
          <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
            {/* Florida shape representation */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path
                  d="M50 150 Q100 100 150 120 Q200 110 250 130 Q300 140 350 160 Q380 180 370 220 Q350 250 300 240 Q250 250 200 240 Q150 250 100 230 Q50 200 50 150 Z"
                  fill="currentColor"
                  className="text-blue-200"
                />
                {/* Major cities as dots */}
                <circle cx="120" cy="200" r="4" fill="currentColor" className="text-blue-500" />
                <circle cx="180" cy="160" r="4" fill="currentColor" className="text-blue-500" />
                <circle cx="200" cy="180" r="4" fill="currentColor" className="text-blue-500" />
                <circle cx="280" cy="140" r="4" fill="currentColor" className="text-blue-500" />
              </svg>
            </div>
            <div className="text-center z-10">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Interactive Florida Coverage Map</p>
              <p className="text-sm text-gray-500">Click on cities below to see details</p>
            </div>
          </div>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
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
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{area.city}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{area.avgRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600">
                        {area.zipCodes.length} zip codes
                      </p>
                      <p className="text-xs text-gray-500">
                        Avg response: {area.avgResponseTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className={getAvailabilityColor(area.businessCount)}>
                      {area.businessCount} contractors
                    </Badge>
                  </div>
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
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    View Contractors
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700 mb-1">
                      <strong>{selectedArea.businessCount}</strong> verified contractors
                    </p>
                    <p className="text-sm text-blue-600">
                      <strong>Zip Codes:</strong> {selectedArea.zipCodes.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 mb-1">
                      <strong>{selectedArea.avgRating}/5.0</strong> average rating
                    </p>
                    <p className="text-sm text-blue-600">
                      <strong>Response time:</strong> {selectedArea.avgResponseTime}
                    </p>
                  </div>
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
              <p className="text-sm text-gray-600">Total Contractors</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceAreaMap;
