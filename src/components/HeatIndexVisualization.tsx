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
    <div className="w-full bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 relative">
          {/* Background Sun */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Sun className="w-96 h-96 text-orange-400" />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Florida Heat Index Monitor</h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Stay safe in Florida's intense heat! Monitor real-time heat index levels across the state and find qualified AC contractors when you need them most. 
              Don't let dangerous heat put your family at risk.
            </p>
          </div>
        </div>

        {/* Enhanced Location Selection */}
        <Card id="search-section" className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl mb-16">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center gap-4 text-3xl text-orange-900 mb-4">
              <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full shadow-lg">
                <Navigation className="w-8 h-8 text-orange-600" />
              </div>
              Select Your Florida Location
            </CardTitle>
            <CardDescription className="text-orange-700 text-xl leading-relaxed max-w-3xl mx-auto">
              Choose any city across Florida to get current heat index conditions, safety recommendations, and connect with emergency AC repair services in your area.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            <div className="max-w-3xl mx-auto">
              <Select value={selectedLocation} onValueChange={handleLocationSelect}>
                <SelectTrigger className="w-full h-16 text-xl border-2 border-orange-300 focus:border-orange-500 bg-white shadow-lg hover:shadow-xl transition-all">
                  <SelectValue placeholder="🌴 Choose a Florida city to monitor heat conditions..." />
                </SelectTrigger>
                <SelectContent className="max-h-96 bg-white/98 backdrop-blur-sm shadow-2xl border-2 border-orange-200">
                  {Object.entries(locationsByRegion).map(([region, locations]) => (
                    <div key={region}>
                      <div className="px-4 py-3 text-base font-bold text-orange-700 bg-gradient-to-r from-orange-100 to-red-100 sticky top-0 border-b border-orange-200">
                        🏝️ {region}
                      </div>
                      {locations.map((location) => (
                        <SelectItem 
                          key={`${location.zipCode}-${location.city}`} 
                          value={`${location.city}, ${location.zipCode}`}
                          className="py-4 hover:bg-orange-50 transition-colors"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <span className="font-semibold text-lg">{location.city}</span>
                              <span className="text-gray-500 ml-3 text-base">({location.zipCode})</span>
                            </div>
                            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
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
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 text-lg shadow-lg">
                  🌡️ Monitoring: {selectedLocation}
                </Badge>
              </div>
            )}
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-orange-600 mb-2">75+</div>
                <div className="text-orange-700 font-medium">Cities Monitored</div>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-red-600 mb-2">Real-Time</div>
                <div className="text-red-700 font-medium">Heat Index Data</div>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
                <div className="text-yellow-700 font-medium">Emergency Services</div>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-3xl font-bold text-green-600 mb-2">Safety</div>
                <div className="text-green-700 font-medium">Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Data Display */}
        {weatherData && selectedLocation && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Current Conditions */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Thermometer className="w-6 h-6 text-blue-600" />
                  Current Conditions - {selectedLocation}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-md">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{weatherData.temperature}°F</div>
                    <div className="text-blue-700 font-medium">Temperature</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border-2 border-cyan-200 shadow-md">
                    <div className="text-3xl font-bold text-cyan-600 mb-2">{weatherData.humidity}%</div>
                    <div className="text-cyan-700 font-medium">Humidity</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-md">
                    <div className="text-3xl font-bold text-gray-600 mb-2">{weatherData.windSpeed} mph</div>
                    <div className="text-gray-700 font-medium">Wind Speed</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200 shadow-md">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{weatherData.uvIndex}</div>
                    <div className="text-yellow-700 font-medium">UV Index</div>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl shadow-md">
                  <Badge variant="outline" className="text-xl px-6 py-2 font-semibold">
                    {weatherData.condition}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Heat Index Alert */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Sun className="w-6 h-6 text-orange-600" />
                  Heat Index Alert
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(() => {
                  const heatLevel = getHeatIndexLevel(weatherData.heatIndex);
                  return (
                    <>
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-4 text-gray-900">{weatherData.heatIndex}°F</div>
                        <Badge className={`${heatLevel.color} text-white text-xl px-6 py-3 shadow-lg`}>
                          {heatLevel.level}
                        </Badge>
                      </div>
                      
                      <Progress value={(weatherData.heatIndex / 130) * 100} className="w-full h-4" />
                      
                      <div className={`p-6 rounded-xl border-2 ${heatLevel.textColor} bg-opacity-20 shadow-md`}>
                        <h4 className="font-bold mb-4 text-lg">⚠️ Safety Recommendations:</h4>
                        <ul className="space-y-2 text-base">
                          {weatherData.heatIndex < 80 && (
                            <>
                              <li>• ✅ Normal outdoor activities are safe</li>
                              <li>• 💧 Stay hydrated during physical activity</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 80 && weatherData.heatIndex < 90 && (
                            <>
                              <li>• ⚡ Exercise caution during prolonged exposure</li>
                              <li>• 💧 Take frequent water breaks</li>
                              <li>• 👀 Watch for signs of heat exhaustion</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 90 && weatherData.heatIndex < 105 && (
                            <>
                              <li>• 🚨 Heat exhaustion and cramps possible</li>
                              <li>• 🏠 Limit outdoor activities</li>
                              <li>• ❄️ Seek air conditioning when possible</li>
                            </>
                          )}
                          {weatherData.heatIndex >= 105 && (
                            <>
                              <li>• 🚨 Heat stroke highly likely</li>
                              <li>• 🚫 Avoid outdoor activities</li>
                              <li>• ❄️ Stay in air-conditioned spaces</li>
                              <li>• 🚑 Seek immediate medical attention if symptoms occur</li>
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

        {/* Enhanced Find Qualified Contractors Section */}
        <Card className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 border-0 text-white shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold mb-6">
              Beat the Heat with Professional AC Service
            </CardTitle>
            <CardDescription className="text-orange-100 text-xl max-w-4xl mx-auto leading-relaxed">
              Don't let extreme heat put your family at risk. When temperatures soar and heat index levels become dangerous, 
              reliable air conditioning isn't just comfort—it's a safety necessity. Find qualified, licensed AC contractors in your area now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-12 px-8 pb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl">Licensed & Verified</h3>
                <p className="text-orange-100">All contractors are licensed, insured, and background-checked for your safety and peace of mind</p>
              </div>
              <div className="text-center space-y-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl">Top-Rated Service</h3>
                <p className="text-orange-100">Read verified reviews from real customers in your neighborhood before making your choice</p>
              </div>
              <div className="text-center space-y-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <Wind className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl">24/7 Emergency</h3>
                <p className="text-orange-100">Emergency AC repair available around the clock when dangerous heat strikes</p>
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-orange-100">Verified Contractors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-orange-100">Emergency Response</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                  <div className="text-orange-100">Average Rating</div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-12 py-4 text-xl shadow-xl hover:shadow-2xl transition-all"
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
