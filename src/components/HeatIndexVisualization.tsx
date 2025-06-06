
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, ThermometerSun, MapPin, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

interface HeatData {
  date: string;
  temperature: number;
  heatIndex: number;
  acUsage: number;
  city: string;
}

const mockHeatData: Record<string, HeatData[]> = {
  "Miami": [
    { date: "Jan", temperature: 76, heatIndex: 78, acUsage: 65, city: "Miami" },
    { date: "Feb", temperature: 78, heatIndex: 80, acUsage: 70, city: "Miami" },
    { date: "Mar", temperature: 82, heatIndex: 85, acUsage: 75, city: "Miami" },
    { date: "Apr", temperature: 85, heatIndex: 89, acUsage: 80, city: "Miami" },
    { date: "May", temperature: 88, heatIndex: 94, acUsage: 85, city: "Miami" },
    { date: "Jun", temperature: 91, heatIndex: 98, acUsage: 95, city: "Miami" },
    { date: "Jul", temperature: 93, heatIndex: 105, acUsage: 100, city: "Miami" },
    { date: "Aug", temperature: 93, heatIndex: 106, acUsage: 100, city: "Miami" },
    { date: "Sep", temperature: 91, heatIndex: 98, acUsage: 90, city: "Miami" },
    { date: "Oct", temperature: 87, heatIndex: 91, acUsage: 80, city: "Miami" },
    { date: "Nov", temperature: 82, heatIndex: 84, acUsage: 70, city: "Miami" },
    { date: "Dec", temperature: 78, heatIndex: 80, acUsage: 65, city: "Miami" },
  ],
  "Orlando": [
    { date: "Jan", temperature: 72, heatIndex: 74, acUsage: 55, city: "Orlando" },
    { date: "Feb", temperature: 75, heatIndex: 77, acUsage: 60, city: "Orlando" },
    { date: "Mar", temperature: 80, heatIndex: 82, acUsage: 70, city: "Orlando" },
    { date: "Apr", temperature: 84, heatIndex: 87, acUsage: 75, city: "Orlando" },
    { date: "May", temperature: 89, heatIndex: 95, acUsage: 85, city: "Orlando" },
    { date: "Jun", temperature: 92, heatIndex: 100, acUsage: 95, city: "Orlando" },
    { date: "Jul", temperature: 94, heatIndex: 108, acUsage: 100, city: "Orlando" },
    { date: "Aug", temperature: 94, heatIndex: 107, acUsage: 100, city: "Orlando" },
    { date: "Sep", temperature: 91, heatIndex: 97, acUsage: 88, city: "Orlando" },
    { date: "Oct", temperature: 86, heatIndex: 89, acUsage: 75, city: "Orlando" },
    { date: "Nov", temperature: 80, heatIndex: 82, acUsage: 65, city: "Orlando" },
    { date: "Dec", temperature: 74, heatIndex: 76, acUsage: 55, city: "Orlando" },
  ],
  "Tampa": [
    { date: "Jan", temperature: 71, heatIndex: 73, acUsage: 50, city: "Tampa" },
    { date: "Feb", temperature: 74, heatIndex: 76, acUsage: 55, city: "Tampa" },
    { date: "Mar", temperature: 79, heatIndex: 81, acUsage: 65, city: "Tampa" },
    { date: "Apr", temperature: 83, heatIndex: 86, acUsage: 72, city: "Tampa" },
    { date: "May", temperature: 88, heatIndex: 93, acUsage: 82, city: "Tampa" },
    { date: "Jun", temperature: 91, heatIndex: 98, acUsage: 92, city: "Tampa" },
    { date: "Jul", temperature: 92, heatIndex: 103, acUsage: 98, city: "Tampa" },
    { date: "Aug", temperature: 92, heatIndex: 104, acUsage: 98, city: "Tampa" },
    { date: "Sep", temperature: 90, heatIndex: 96, acUsage: 85, city: "Tampa" },
    { date: "Oct", temperature: 85, heatIndex: 88, acUsage: 72, city: "Tampa" },
    { date: "Nov", temperature: 79, heatIndex: 81, acUsage: 60, city: "Tampa" },
    { date: "Dec", temperature: 73, heatIndex: 75, acUsage: 50, city: "Tampa" },
  ],
  "Jacksonville": [
    { date: "Jan", temperature: 65, heatIndex: 67, acUsage: 40, city: "Jacksonville" },
    { date: "Feb", temperature: 68, heatIndex: 70, acUsage: 45, city: "Jacksonville" },
    { date: "Mar", temperature: 74, heatIndex: 76, acUsage: 55, city: "Jacksonville" },
    { date: "Apr", temperature: 79, heatIndex: 82, acUsage: 65, city: "Jacksonville" },
    { date: "May", temperature: 85, heatIndex: 90, acUsage: 78, city: "Jacksonville" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 88, city: "Jacksonville" },
    { date: "Jul", temperature: 91, heatIndex: 102, acUsage: 95, city: "Jacksonville" },
    { date: "Aug", temperature: 90, heatIndex: 101, acUsage: 94, city: "Jacksonville" },
    { date: "Sep", temperature: 87, heatIndex: 92, acUsage: 82, city: "Jacksonville" },
    { date: "Oct", temperature: 81, heatIndex: 84, acUsage: 68, city: "Jacksonville" },
    { date: "Nov", temperature: 74, heatIndex: 76, acUsage: 55, city: "Jacksonville" },
    { date: "Dec", temperature: 67, heatIndex: 69, acUsage: 42, city: "Jacksonville" },
  ],
  "Fort Lauderdale": [
    { date: "Jan", temperature: 75, heatIndex: 77, acUsage: 62, city: "Fort Lauderdale" },
    { date: "Feb", temperature: 77, heatIndex: 79, acUsage: 67, city: "Fort Lauderdale" },
    { date: "Mar", temperature: 81, heatIndex: 84, acUsage: 73, city: "Fort Lauderdale" },
    { date: "Apr", temperature: 84, heatIndex: 88, acUsage: 78, city: "Fort Lauderdale" },
    { date: "May", temperature: 87, heatIndex: 93, acUsage: 83, city: "Fort Lauderdale" },
    { date: "Jun", temperature: 90, heatIndex: 97, acUsage: 93, city: "Fort Lauderdale" },
    { date: "Jul", temperature: 92, heatIndex: 104, acUsage: 98, city: "Fort Lauderdale" },
    { date: "Aug", temperature: 92, heatIndex: 105, acUsage: 98, city: "Fort Lauderdale" },
    { date: "Sep", temperature: 90, heatIndex: 97, acUsage: 88, city: "Fort Lauderdale" },
    { date: "Oct", temperature: 86, heatIndex: 90, acUsage: 78, city: "Fort Lauderdale" },
    { date: "Nov", temperature: 81, heatIndex: 83, acUsage: 68, city: "Fort Lauderdale" },
    { date: "Dec", temperature: 77, heatIndex: 79, acUsage: 62, city: "Fort Lauderdale" },
  ],
  "St. Petersburg": [
    { date: "Jan", temperature: 70, heatIndex: 72, acUsage: 48, city: "St. Petersburg" },
    { date: "Feb", temperature: 73, heatIndex: 75, acUsage: 53, city: "St. Petersburg" },
    { date: "Mar", temperature: 78, heatIndex: 80, acUsage: 63, city: "St. Petersburg" },
    { date: "Apr", temperature: 82, heatIndex: 85, acUsage: 70, city: "St. Petersburg" },
    { date: "May", temperature: 87, heatIndex: 92, acUsage: 80, city: "St. Petersburg" },
    { date: "Jun", temperature: 90, heatIndex: 97, acUsage: 90, city: "St. Petersburg" },
    { date: "Jul", temperature: 91, heatIndex: 102, acUsage: 96, city: "St. Petersburg" },
    { date: "Aug", temperature: 91, heatIndex: 103, acUsage: 96, city: "St. Petersburg" },
    { date: "Sep", temperature: 89, heatIndex: 95, acUsage: 83, city: "St. Petersburg" },
    { date: "Oct", temperature: 84, heatIndex: 87, acUsage: 70, city: "St. Petersburg" },
    { date: "Nov", temperature: 78, heatIndex: 80, acUsage: 58, city: "St. Petersburg" },
    { date: "Dec", temperature: 72, heatIndex: 74, acUsage: 48, city: "St. Petersburg" },
  ],
  "Tallahassee": [
    { date: "Jan", temperature: 62, heatIndex: 64, acUsage: 35, city: "Tallahassee" },
    { date: "Feb", temperature: 66, heatIndex: 68, acUsage: 40, city: "Tallahassee" },
    { date: "Mar", temperature: 72, heatIndex: 74, acUsage: 50, city: "Tallahassee" },
    { date: "Apr", temperature: 77, heatIndex: 80, acUsage: 60, city: "Tallahassee" },
    { date: "May", temperature: 84, heatIndex: 89, acUsage: 75, city: "Tallahassee" },
    { date: "Jun", temperature: 88, heatIndex: 95, acUsage: 85, city: "Tallahassee" },
    { date: "Jul", temperature: 90, heatIndex: 100, acUsage: 92, city: "Tallahassee" },
    { date: "Aug", temperature: 89, heatIndex: 99, acUsage: 90, city: "Tallahassee" },
    { date: "Sep", temperature: 86, heatIndex: 91, acUsage: 78, city: "Tallahassee" },
    { date: "Oct", temperature: 79, heatIndex: 82, acUsage: 62, city: "Tallahassee" },
    { date: "Nov", temperature: 71, heatIndex: 73, acUsage: 45, city: "Tallahassee" },
    { date: "Dec", temperature: 64, heatIndex: 66, acUsage: 35, city: "Tallahassee" },
  ],
  "Gainesville": [
    { date: "Jan", temperature: 66, heatIndex: 68, acUsage: 42, city: "Gainesville" },
    { date: "Feb", temperature: 70, heatIndex: 72, acUsage: 47, city: "Gainesville" },
    { date: "Mar", temperature: 75, heatIndex: 77, acUsage: 57, city: "Gainesville" },
    { date: "Apr", temperature: 80, heatIndex: 83, acUsage: 67, city: "Gainesville" },
    { date: "May", temperature: 86, heatIndex: 91, acUsage: 80, city: "Gainesville" },
    { date: "Jun", temperature: 90, heatIndex: 98, acUsage: 90, city: "Gainesville" },
    { date: "Jul", temperature: 92, heatIndex: 104, acUsage: 96, city: "Gainesville" },
    { date: "Aug", temperature: 91, heatIndex: 103, acUsage: 95, city: "Gainesville" },
    { date: "Sep", temperature: 88, heatIndex: 94, acUsage: 82, city: "Gainesville" },
    { date: "Oct", temperature: 82, heatIndex: 85, acUsage: 68, city: "Gainesville" },
    { date: "Nov", temperature: 75, heatIndex: 77, acUsage: 52, city: "Gainesville" },
    { date: "Dec", temperature: 68, heatIndex: 70, acUsage: 42, city: "Gainesville" },
  ],
  "West Palm Beach": [
    { date: "Jan", temperature: 74, heatIndex: 76, acUsage: 60, city: "West Palm Beach" },
    { date: "Feb", temperature: 76, heatIndex: 78, acUsage: 65, city: "West Palm Beach" },
    { date: "Mar", temperature: 80, heatIndex: 83, acUsage: 71, city: "West Palm Beach" },
    { date: "Apr", temperature: 83, heatIndex: 87, acUsage: 76, city: "West Palm Beach" },
    { date: "May", temperature: 86, heatIndex: 92, acUsage: 81, city: "West Palm Beach" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 91, city: "West Palm Beach" },
    { date: "Jul", temperature: 91, heatIndex: 103, acUsage: 96, city: "West Palm Beach" },
    { date: "Aug", temperature: 91, heatIndex: 104, acUsage: 96, city: "West Palm Beach" },
    { date: "Sep", temperature: 89, heatIndex: 96, acUsage: 86, city: "West Palm Beach" },
    { date: "Oct", temperature: 85, heatIndex: 89, acUsage: 76, city: "West Palm Beach" },
    { date: "Nov", temperature: 80, heatIndex: 82, acUsage: 66, city: "West Palm Beach" },
    { date: "Dec", temperature: 76, heatIndex: 78, acUsage: 60, city: "West Palm Beach" },
  ],
  "Clearwater": [
    { date: "Jan", temperature: 69, heatIndex: 71, acUsage: 46, city: "Clearwater" },
    { date: "Feb", temperature: 72, heatIndex: 74, acUsage: 51, city: "Clearwater" },
    { date: "Mar", temperature: 77, heatIndex: 79, acUsage: 61, city: "Clearwater" },
    { date: "Apr", temperature: 81, heatIndex: 84, acUsage: 68, city: "Clearwater" },
    { date: "May", temperature: 86, heatIndex: 91, acUsage: 78, city: "Clearwater" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 88, city: "Clearwater" },
    { date: "Jul", temperature: 90, heatIndex: 101, acUsage: 94, city: "Clearwater" },
    { date: "Aug", temperature: 90, heatIndex: 102, acUsage: 94, city: "Clearwater" },
    { date: "Sep", temperature: 88, heatIndex: 94, acUsage: 81, city: "Clearwater" },
    { date: "Oct", temperature: 83, heatIndex: 86, acUsage: 68, city: "Clearwater" },
    { date: "Nov", temperature: 77, heatIndex: 79, acUsage: 56, city: "Clearwater" },
    { date: "Dec", temperature: 71, heatIndex: 73, acUsage: 46, city: "Clearwater" },
  ]
};

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  heatIndex: {
    label: "Heat Index",
    color: "hsl(var(--chart-2))",
  },
  acUsage: {
    label: "AC Usage %",
    color: "hsl(var(--chart-3))",
  },
};

const HeatIndexVisualization = () => {
  const [selectedCity, setSelectedCity] = useState("Miami");
  const [searchCity, setSearchCity] = useState("");
  const [currentData, setCurrentData] = useState<HeatData[]>(mockHeatData.Miami);

  useEffect(() => {
    setCurrentData(mockHeatData[selectedCity] || mockHeatData.Miami);
  }, [selectedCity]);

  const handleCitySearch = () => {
    if (!searchCity.trim()) return;
    
    const cityKey = Object.keys(mockHeatData).find(
      city => city.toLowerCase().includes(searchCity.toLowerCase().trim())
    );
    
    if (cityKey) {
      setSelectedCity(cityKey);
      setSearchCity(""); // Clear search after successful search
    } else {
      // Show alert if city not found
      alert(`City "${searchCity}" not found. Available cities: ${Object.keys(mockHeatData).join(", ")}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  const getCurrentMonthData = () => {
    const currentMonth = new Date().getMonth();
    return currentData[currentMonth] || currentData[0];
  };

  const currentMonth = getCurrentMonthData();
  const getHeatLevel = (heatIndex: number) => {
    if (heatIndex >= 105) return { level: "Extreme", color: "bg-red-600", textColor: "text-red-600" };
    if (heatIndex >= 90) return { level: "High", color: "bg-orange-500", textColor: "text-orange-600" };
    if (heatIndex >= 80) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-600" };
    return { level: "Low", color: "bg-green-500", textColor: "text-green-600" };
  };

  const heatLevel = getHeatLevel(currentMonth.heatIndex);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Florida Heat Index & AC Usage Monitor
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track real-time heat index data and AC usage patterns in your area to optimize cooling costs and maintenance schedules.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* City Search and Selection */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2 flex-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <Input
                    placeholder="Search for a Florida city..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleCitySearch} className="bg-blue-600 hover:bg-blue-700">
                    Search
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Or select:</span>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(mockHeatData).sort().map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Current Temp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.temperature}°F</div>
                <p className="text-xs text-gray-600">in {selectedCity}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <ThermometerSun className="w-4 h-4 mr-2" />
                  Heat Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.heatIndex}°F</div>
                <Badge className={`${heatLevel.color} text-white mt-1`}>
                  {heatLevel.level}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  AC Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.acUsage}%</div>
                <p className="text-xs text-gray-600">vs typical usage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Efficiency Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 font-medium">
                  {currentMonth.heatIndex > 100 
                    ? "Schedule maintenance now"
                    : currentMonth.heatIndex > 90 
                    ? "Check air filters"
                    : "Optimal conditions"
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Annual Heat Index Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="heatIndex"
                        stroke="var(--color-heatIndex)"
                        fill="var(--color-heatIndex)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--color-temperature)"
                        fill="var(--color-temperature)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AC Usage Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="acUsage"
                        stroke="var(--color-acUsage)"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Smart Recommendations for {selectedCity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Maintenance Alert</h4>
                  <p className="text-sm text-blue-800">
                    {currentMonth.heatIndex > 100 
                      ? "High heat stress detected. Schedule AC maintenance within 7 days."
                      : "Your AC is operating in normal conditions."
                    }
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Energy Savings</h4>
                  <p className="text-sm text-green-800">
                    Optimal thermostat setting: {currentMonth.heatIndex > 95 ? "76-78°F" : "78-80°F"} 
                    to balance comfort and efficiency.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Peak Usage</h4>
                  <p className="text-sm text-orange-800">
                    Expected peak AC usage: {Math.max(...currentData.map(d => d.acUsage))}% 
                    during {currentData.find(d => d.acUsage === Math.max(...currentData.map(d => d.acUsage)))?.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeatIndexVisualization;
