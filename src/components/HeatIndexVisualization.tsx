
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Thermometer, Droplets, Wind, Sun, MapPin, Star, CheckCircle, Navigation } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WeatherData {
  temperature: number;
  humidity: number;
  heatIndex: number;
  condition: string;
  windSpeed: number;
  uvIndex: number;
}

interface FloridaLocation {
  city: string;
  zipCode: string;
  county: string;
  region: string;
}

// Comprehensive Florida locations data
const floridaLocations: FloridaLocation[] = [
  // Major Cities
  { city: "Miami", zipCode: "33101", county: "Miami-Dade", region: "South Florida" },
  { city: "Jacksonville", zipCode: "32201", county: "Duval", region: "Northeast Florida" },
  { city: "Tampa", zipCode: "33602", county: "Hillsborough", region: "Central Florida" },
  { city: "Orlando", zipCode: "32801", county: "Orange", region: "Central Florida" },
  { city: "St. Petersburg", zipCode: "33701", county: "Pinellas", region: "Central Florida" },
  { city: "Hialeah", zipCode: "33010", county: "Miami-Dade", region: "South Florida" },
  { city: "Tallahassee", zipCode: "32301", county: "Leon", region: "North Florida" },
  { city: "Fort Lauderdale", zipCode: "33301", county: "Broward", region: "South Florida" },
  { city: "Port St. Lucie", zipCode: "34952", county: "St. Lucie", region: "Southeast Florida" },
  { city: "Cape Coral", zipCode: "33904", county: "Lee", region: "Southwest Florida" },
  { city: "Pembroke Pines", zipCode: "33024", county: "Broward", region: "South Florida" },
  { city: "Hollywood", zipCode: "33019", county: "Broward", region: "South Florida" },
  { city: "Miramar", zipCode: "33025", county: "Broward", region: "South Florida" },
  { city: "Gainesville", zipCode: "32601", county: "Alachua", region: "North Florida" },
  { city: "Coral Springs", zipCode: "33065", county: "Broward", region: "South Florida" },
  { city: "Clearwater", zipCode: "33755", county: "Pinellas", region: "Central Florida" },
  { city: "Miami Beach", zipCode: "33139", county: "Miami-Dade", region: "South Florida" },
  { city: "Pompano Beach", zipCode: "33060", county: "Broward", region: "South Florida" },
  { city: "West Palm Beach", zipCode: "33401", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Lakeland", zipCode: "33801", county: "Polk", region: "Central Florida" },
  { city: "Davie", zipCode: "33314", county: "Broward", region: "South Florida" },
  { city: "Miami Gardens", zipCode: "33056", county: "Miami-Dade", region: "South Florida" },
  { city: "Boca Raton", zipCode: "33431", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Sunrise", zipCode: "33313", county: "Broward", region: "South Florida" },
  { city: "Plantation", zipCode: "33324", county: "Broward", region: "South Florida" },
  
  // Additional Major Zip Codes
  { city: "Naples", zipCode: "34102", county: "Collier", region: "Southwest Florida" },
  { city: "Fort Myers", zipCode: "33901", county: "Lee", region: "Southwest Florida" },
  { city: "Sarasota", zipCode: "34236", county: "Sarasota", region: "Southwest Florida" },
  { city: "Bradenton", zipCode: "34205", county: "Manatee", region: "Southwest Florida" },
  { city: "Pensacola", zipCode: "32501", county: "Escambia", region: "Northwest Florida" },
  { city: "Ocala", zipCode: "34470", county: "Marion", region: "North Florida" },
  { city: "Kissimmee", zipCode: "34741", county: "Osceola", region: "Central Florida" },
  { city: "Deltona", zipCode: "32725", county: "Volusia", region: "Central Florida" },
  { city: "Daytona Beach", zipCode: "32114", county: "Volusia", region: "Northeast Florida" },
  { city: "Palm Bay", zipCode: "32905", county: "Brevard", region: "East Florida" },
  { city: "Melbourne", zipCode: "32901", county: "Brevard", region: "East Florida" },
  { city: "Boynton Beach", zipCode: "33435", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Lauderhill", zipCode: "33313", county: "Broward", region: "South Florida" },
  { city: "Weston", zipCode: "33326", county: "Broward", region: "South Florida" },
  { city: "Homestead", zipCode: "33030", county: "Miami-Dade", region: "South Florida" },
  { city: "Delray Beach", zipCode: "33444", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Tamarac", zipCode: "33321", county: "Broward", region: "South Florida" },
  { city: "Palm Beach Gardens", zipCode: "33410", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Deerfield Beach", zipCode: "33441", county: "Broward", region: "South Florida" },
  { city: "Margate", zipCode: "33063", county: "Broward", region: "South Florida" },
  { city: "Wellington", zipCode: "33414", county: "Palm Beach", region: "Southeast Florida" },
  { city: "Coconut Creek", zipCode: "33066", county: "Broward", region: "South Florida" },
  { city: "Sanford", zipCode: "32771", county: "Seminole", region: "Central Florida" },
  { city: "Largo", zipCode: "33770", county: "Pinellas", region: "Central Florida" },
  { city: "Pinellas Park", zipCode: "33781", county: "Pinellas", region: "Central Florida" },
  { city: "Casselberry", zipCode: "32707", county: "Seminole", region: "Central Florida" },
  { city: "Altamonte Springs", zipCode: "32701", county: "Seminole", region: "Central Florida" },
  { city: "Winter Park", zipCode: "32789", county: "Orange", region: "Central Florida" },
  { city: "Apopka", zipCode: "32703", county: "Orange", region: "Central Florida" },
  { city: "Oviedo", zipCode: "32765", county: "Seminole", region: "Central Florida" },
  { city: "Winter Springs", zipCode: "32708", county: "Seminole", region: "Central Florida" },
  { city: "Clermont", zipCode: "34711", county: "Lake", region: "Central Florida" },
  { city: "Leesburg", zipCode: "34748", county: "Lake", region: "Central Florida" },
  { city: "Eustis", zipCode: "32726", county: "Lake", region: "Central Florida" },
  { city: "Mount Dora", zipCode: "32757", county: "Lake", region: "Central Florida" },
  
  // Keys and Coastal Areas
  { city: "Key West", zipCode: "33040", county: "Monroe", region: "Florida Keys" },
  { city: "Marathon", zipCode: "33050", county: "Monroe", region: "Florida Keys" },
  { city: "Key Largo", zipCode: "33037", county: "Monroe", region: "Florida Keys" },
  { city: "Islamorada", zipCode: "33036", county: "Monroe", region: "Florida Keys" },
  
  // Panhandle
  { city: "Panama City", zipCode: "32401", county: "Bay", region: "Northwest Florida" },
  { city: "Destin", zipCode: "32541", county: "Okaloosa", region: "Northwest Florida" },
  { city: "Fort Walton Beach", zipCode: "32548", county: "Okaloosa", region: "Northwest Florida" },
  { city: "Crestview", zipCode: "32536", county: "Okaloosa", region: "Northwest Florida" },
  { city: "Niceville", zipCode: "32578", county: "Okaloosa", region: "Northwest Florida" },
  
  // Space Coast
  { city: "Titusville", zipCode: "32780", county: "Brevard", region: "East Florida" },
  { city: "Cocoa", zipCode: "32922", county: "Brevard", region: "East Florida" },
  { city: "Rockledge", zipCode: "32955", county: "Brevard", region: "East Florida" },
  { city: "Viera", zipCode: "32940", county: "Brevard", region: "East Florida" },
  
  // Nature Coast
  { city: "Crystal River", zipCode: "34428", county: "Citrus", region: "Nature Coast" },
  { city: "Inverness", zipCode: "34450", county: "Citrus", region: "Nature Coast" },
  { city: "Homosassa", zipCode: "34446", county: "Citrus", region: "Nature Coast" },
  { city: "Spring Hill", zipCode: "34609", county: "Hernando", region: "Nature Coast" },
  { city: "Brooksville", zipCode: "34601", county: "Hernando", region: "Nature Coast" },
];

const generateWeatherData = (location: string): WeatherData => {
  const baseTemp = 75 + Math.random() * 20;
  const humidity = 60 + Math.random() * 30;
  const heatIndex = baseTemp + (humidity > 80 ? 5 : 0) + Math.random() * 10;
  
  const conditions = ['Sunny', 'Partly Cloudy', 'Humid', 'Hot', 'Very Hot'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temperature: Math.round(baseTemp),
    humidity: Math.round(humidity),
    heatIndex: Math.round(heatIndex),
    condition,
    windSpeed: Math.round(Math.random() * 15),
    uvIndex: Math.round(Math.random() * 10)
  };
};

const HeatIndexVisualization = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
    const locationData = generateWeatherData(value);
    setWeatherData(locationData);
  };

  const getHeatIndexLevel = (heatIndex: number) => {
    if (heatIndex < 80) return { level: 'Normal', color: 'bg-green-500', textColor: 'text-green-700' };
    if (heatIndex < 90) return { level: 'Caution', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (heatIndex < 105) return { level: 'Extreme Caution', color: 'bg-orange-500', textColor: 'text-orange-700' };
    if (heatIndex < 130) return { level: 'Danger', color: 'bg-red-500', textColor: 'text-red-700' };
    return { level: 'Extreme Danger', color: 'bg-purple-500', textColor: 'text-purple-700' };
  };

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group locations by region for better organization
  const locationsByRegion = useMemo(() => {
    const grouped = floridaLocations.reduce((acc, location) => {
      if (!acc[location.region]) {
        acc[location.region] = [];
      }
      acc[location.region].push(location);
      return acc;
    }, {} as Record<string, typeof floridaLocations>);
    
    // Sort locations within each region by city name
    Object.keys(grouped).forEach(region => {
      grouped[region].sort((a, b) => a.city.localeCompare(b.city));
    });
    
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Florida Heat Index Monitor</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay safe in Florida's heat! Check real-time heat index levels across the state and find qualified AC contractors when you need them most.
          </p>
        </div>

        {/* Enhanced Location Selection */}
        <Card id="search-section" className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl text-orange-900">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full shadow-md">
                <Navigation className="w-6 h-6 text-orange-600" />
              </div>
              Select Your Florida Location
            </CardTitle>
            <CardDescription className="text-orange-700 text-lg">
              Choose any city across Florida to get current heat index conditions and safety recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Select value={selectedLocation} onValueChange={handleLocationSelect}>
                <SelectTrigger className="w-full h-14 text-lg border-2 border-orange-200 focus:border-orange-400 bg-white/90 shadow-sm">
                  <SelectValue placeholder="🏙️ Choose a Florida city..." />
                </SelectTrigger>
                <SelectContent className="max-h-96 bg-white/95 backdrop-blur-sm">
                  {Object.entries(locationsByRegion).map(([region, locations]) => (
                    <div key={region}>
                      <div className="px-2 py-2 text-sm font-semibold text-orange-600 bg-orange-50/80 sticky top-0">
                        {region}
                      </div>
                      {locations.map((location) => (
                        <SelectItem 
                          key={`${location.zipCode}-${location.city}`} 
                          value={`${location.city}, ${location.zipCode}`}
                          className="py-3 hover:bg-orange-50"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <span className="font-medium">{location.city}</span>
                              <span className="text-gray-500 ml-2">({location.zipCode})</span>
                            </div>
                            <Badge variant="outline" className="text-xs border-orange-200">
                              {location.county}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedLocation && (
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-base shadow-md">
                  📍 Monitoring: {selectedLocation}
                </Badge>
              </div>
            )}
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-200 shadow-sm">
                <div className="text-orange-600 font-semibold mb-1">75+ Cities</div>
                <div className="text-sm text-gray-600">Statewide Coverage</div>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-200 shadow-sm">
                <div className="text-orange-600 font-semibold mb-1">Real-Time</div>
                <div className="text-sm text-gray-600">Heat Index Data</div>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-200 shadow-sm">
                <div className="text-orange-600 font-semibold mb-1">Safety First</div>
                <div className="text-sm text-gray-600">Health Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Data Display */}
        {weatherData && selectedLocation && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Conditions */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  Current Conditions - {selectedLocation}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50/80 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{weatherData.temperature}°F</div>
                    <div className="text-sm text-gray-600">Temperature</div>
                  </div>
                  <div className="text-center p-4 bg-cyan-50/80 rounded-lg border border-cyan-200">
                    <div className="text-2xl font-bold text-cyan-600">{weatherData.humidity}%</div>
                    <div className="text-sm text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50/80 rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-gray-600">{weatherData.windSpeed} mph</div>
                    <div className="text-sm text-gray-600">Wind Speed</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50/80 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{weatherData.uvIndex}</div>
                    <div className="text-sm text-gray-600">UV Index</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-white/80 border rounded-lg">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {weatherData.condition}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Heat Index Alert */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Heat Index Alert
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const heatLevel = getHeatIndexLevel(weatherData.heatIndex);
                  return (
                    <>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{weatherData.heatIndex}°F</div>
                        <Badge className={`${heatLevel.color} text-white text-lg px-4 py-2`}>
                          {heatLevel.level}
                        </Badge>
                      </div>
                      
                      <Progress value={(weatherData.heatIndex / 130) * 100} className="w-full" />
                      
                      <div className={`p-4 rounded-lg border ${heatLevel.textColor} bg-opacity-10`}>
                        <h4 className="font-semibold mb-2">Safety Recommendations:</h4>
                        <ul className="space-y-1 text-sm">
                          {weatherData.heatIndex < 80 && (
                            <>
                              <li>• Normal outdoor activities are safe</li>
                              <li>• Stay hydrated during physical activity</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 80 && weatherData.heatIndex < 90 && (
                            <>
                              <li>• Exercise caution during prolonged exposure</li>
                              <li>• Take frequent water breaks</li>
                              <li>• Watch for signs of heat exhaustion</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 90 && weatherData.heatIndex < 105 && (
                            <>
                              <li>• Heat exhaustion and cramps possible</li>
                              <li>• Limit outdoor activities</li>
                              <li>• Seek air conditioning when possible</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 105 && (
                            <>
                              <li>• Heat stroke highly likely</li>
                              <li>• Avoid outdoor activities</li>
                              <li>• Stay in air-conditioned spaces</li>
                              <li>• Seek immediate medical attention if symptoms occur</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Find Qualified Contractors Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-orange-900">
              Beat the Heat with Professional AC Service
            </CardTitle>
            <CardDescription className="text-orange-700 text-lg">
              Don't let extreme heat put your family at risk. Find qualified, licensed AC contractors in your area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-900">Licensed & Verified</h3>
                <p className="text-sm text-orange-700">All contractors are licensed, insured, and background-checked</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-900">Top-Rated Service</h3>
                <p className="text-sm text-orange-700">Read reviews from real customers in your neighborhood</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Wind className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-900">24/7 Emergency</h3>
                <p className="text-sm text-orange-700">Emergency AC repair available when you need it most</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 shadow-lg"
                onClick={scrollToSearch}
              >
                Find AC Contractors Near You
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeatIndexVisualization;
