
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    const cityKey = Object.keys(mockHeatData).find(
      city => city.toLowerCase().includes(searchCity.toLowerCase())
    );
    if (cityKey) {
      setSelectedCity(cityKey);
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
          {/* City Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2 flex-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <Input
                    placeholder="Enter your city (Miami, Orlando, Tampa)..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleCitySearch} className="bg-blue-600 hover:bg-blue-700">
                    Search
                  </Button>
                </div>
                <div className="flex gap-2">
                  {Object.keys(mockHeatData).map((city) => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Button>
                  ))}
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
