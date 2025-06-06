
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Heat index data for major Florida cities
const floridaCitiesData = {
  "Miami": { temp: 89, humidity: 78, heatIndex: 105 },
  "Tampa": { temp: 87, humidity: 75, heatIndex: 101 },
  "Orlando": { temp: 88, humidity: 73, heatIndex: 99 },
  "Jacksonville": { temp: 86, humidity: 70, heatIndex: 94 },
  "Fort Lauderdale": { temp: 88, humidity: 80, heatIndex: 107 },
  "West Palm Beach": { temp: 87, humidity: 77, heatIndex: 102 },
  "St. Petersburg": { temp: 86, humidity: 74, heatIndex: 98 },
  "Tallahassee": { temp: 85, humidity: 68, heatIndex: 91 },
  "Cape Coral": { temp: 89, humidity: 76, heatIndex: 103 },
  "Pembroke Pines": { temp: 88, humidity: 79, heatIndex: 106 },
  "Hollywood": { temp: 87, humidity: 78, heatIndex: 103 },
  "Gainesville": { temp: 84, humidity: 72, heatIndex: 92 },
  "Coral Springs": { temp: 87, humidity: 77, heatIndex: 102 },
  "Clearwater": { temp: 86, humidity: 75, heatIndex: 99 },
  "Miami Gardens": { temp: 88, humidity: 79, heatIndex: 106 },
  "Brandon": { temp: 87, humidity: 74, heatIndex: 100 },
  "Lakeland": { temp: 86, humidity: 73, heatIndex: 97 },
  "Pompano Beach": { temp: 87, humidity: 78, heatIndex: 103 },
  "Davie": { temp: 88, humidity: 77, heatIndex: 104 },
  "Sunrise": { temp: 87, humidity: 78, heatIndex: 103 },
  "Boca Raton": { temp: 86, humidity: 76, heatIndex: 100 },
  "Deltona": { temp: 85, humidity: 71, heatIndex: 93 },
  "Palm Bay": { temp: 86, humidity: 74, heatIndex: 98 },
  "Plantation": { temp: 87, humidity: 77, heatIndex: 102 },
  "Largo": { temp: 85, humidity: 75, heatIndex: 97 },
  "Melbourne": { temp: 86, humidity: 73, heatIndex: 96 },
  "Boynton Beach": { temp: 86, humidity: 76, heatIndex: 100 },
  "Deerfield Beach": { temp: 87, humidity: 77, heatIndex: 102 },
  "Lauderhill": { temp: 87, humidity: 78, heatIndex: 103 },
  "Homestead": { temp: 89, humidity: 80, heatIndex: 108 }
};

// Major Florida zip codes mapped to cities
const floridaZipCodes = {
  // Miami area
  "33101": "Miami", "33102": "Miami", "33109": "Miami", "33125": "Miami", "33126": "Miami", "33127": "Miami", "33128": "Miami", "33129": "Miami", "33130": "Miami", "33131": "Miami", "33132": "Miami", "33133": "Miami", "33134": "Miami", "33135": "Miami", "33136": "Miami", "33137": "Miami", "33138": "Miami", "33139": "Miami", "33140": "Miami", "33141": "Miami", "33142": "Miami", "33143": "Miami", "33144": "Miami", "33145": "Miami", "33146": "Miami", "33147": "Miami", "33150": "Miami", "33154": "Miami", "33155": "Miami", "33156": "Miami", "33157": "Miami", "33158": "Miami", "33161": "Miami", "33162": "Miami", "33163": "Miami", "33164": "Miami", "33165": "Miami", "33166": "Miami", "33167": "Miami", "33168": "Miami", "33169": "Miami", "33170": "Miami", "33172": "Miami", "33173": "Miami", "33174": "Miami", "33175": "Miami", "33176": "Miami", "33177": "Miami", "33178": "Miami", "33179": "Miami", "33180": "Miami", "33181": "Miami", "33182": "Miami", "33183": "Miami", "33184": "Miami", "33185": "Miami", "33186": "Miami", "33187": "Miami", "33188": "Miami", "33189": "Miami", "33190": "Miami", "33193": "Miami", "33194": "Miami", "33196": "Miami", "33197": "Miami", "33199": "Miami",
  
  // Tampa area
  "33601": "Tampa", "33602": "Tampa", "33603": "Tampa", "33604": "Tampa", "33605": "Tampa", "33606": "Tampa", "33607": "Tampa", "33608": "Tampa", "33609": "Tampa", "33610": "Tampa", "33611": "Tampa", "33612": "Tampa", "33613": "Tampa", "33614": "Tampa", "33615": "Tampa", "33616": "Tampa", "33617": "Tampa", "33618": "Tampa", "33619": "Tampa", "33620": "Tampa", "33621": "Tampa", "33622": "Tampa", "33623": "Tampa", "33624": "Tampa", "33625": "Tampa", "33626": "Tampa", "33629": "Tampa", "33630": "Tampa", "33631": "Tampa", "33633": "Tampa", "33634": "Tampa", "33635": "Tampa", "33637": "Tampa", "33647": "Tampa", "33672": "Tampa", "33673": "Tampa", "33674": "Tampa", "33675": "Tampa", "33677": "Tampa", "33679": "Tampa", "33680": "Tampa", "33681": "Tampa", "33682": "Tampa", "33684": "Tampa", "33685": "Tampa", "33686": "Tampa", "33687": "Tampa", "33688": "Tampa", "33689": "Tampa", "33694": "Tampa",
  
  // Orlando area
  "32801": "Orlando", "32802": "Orlando", "32803": "Orlando", "32804": "Orlando", "32805": "Orlando", "32806": "Orlando", "32807": "Orlando", "32808": "Orlando", "32809": "Orlando", "32810": "Orlando", "32811": "Orlando", "32812": "Orlando", "32814": "Orlando", "32815": "Orlando", "32816": "Orlando", "32817": "Orlando", "32818": "Orlando", "32819": "Orlando", "32820": "Orlando", "32821": "Orlando", "32822": "Orlando", "32824": "Orlando", "32825": "Orlando", "32826": "Orlando", "32827": "Orlando", "32828": "Orlando", "32829": "Orlando", "32830": "Orlando", "32831": "Orlando", "32832": "Orlando", "32833": "Orlando", "32834": "Orlando", "32835": "Orlando", "32836": "Orlando", "32837": "Orlando", "32839": "Orlando", "32853": "Orlando", "32854": "Orlando", "32855": "Orlando", "32856": "Orlando", "32857": "Orlando", "32858": "Orlando", "32859": "Orlando", "32860": "Orlando", "32861": "Orlando", "32862": "Orlando", "32867": "Orlando", "32868": "Orlando", "32869": "Orlando", "32872": "Orlando", "32877": "Orlando", "32878": "Orlando", "32885": "Orlando", "32886": "Orlando", "32887": "Orlando", "32891": "Orlando", "32896": "Orlando", "32897": "Orlando", "32898": "Orlando",
  
  // Jacksonville area
  "32099": "Jacksonville", "32201": "Jacksonville", "32202": "Jacksonville", "32203": "Jacksonville", "32204": "Jacksonville", "32205": "Jacksonville", "32206": "Jacksonville", "32207": "Jacksonville", "32208": "Jacksonville", "32209": "Jacksonville", "32210": "Jacksonville", "32211": "Jacksonville", "32212": "Jacksonville", "32214": "Jacksonville", "32216": "Jacksonville", "32217": "Jacksonville", "32218": "Jacksonville", "32219": "Jacksonville", "32220": "Jacksonville", "32221": "Jacksonville", "32222": "Jacksonville", "32223": "Jacksonville", "32224": "Jacksonville", "32225": "Jacksonville", "32226": "Jacksonville", "32227": "Jacksonville", "32228": "Jacksonville", "32229": "Jacksonville", "32231": "Jacksonville", "32232": "Jacksonville", "32233": "Jacksonville", "32234": "Jacksonville", "32235": "Jacksonville", "32236": "Jacksonville", "32237": "Jacksonville", "32238": "Jacksonville", "32239": "Jacksonville", "32240": "Jacksonville", "32241": "Jacksonville", "32244": "Jacksonville", "32245": "Jacksonville", "32246": "Jacksonville", "32247": "Jacksonville", "32250": "Jacksonville", "32254": "Jacksonville", "32255": "Jacksonville", "32256": "Jacksonville", "32257": "Jacksonville", "32258": "Jacksonville", "32259": "Jacksonville", "32260": "Jacksonville", "32266": "Jacksonville", "32277": "Jacksonville",
  
  // Fort Lauderdale area
  "33301": "Fort Lauderdale", "33302": "Fort Lauderdale", "33303": "Fort Lauderdale", "33304": "Fort Lauderdale", "33305": "Fort Lauderdale", "33306": "Fort Lauderdale", "33307": "Fort Lauderdale", "33308": "Fort Lauderdale", "33309": "Fort Lauderdale", "33310": "Fort Lauderdale", "33311": "Fort Lauderdale", "33312": "Fort Lauderdale", "33313": "Fort Lauderdale", "33314": "Fort Lauderdale", "33315": "Fort Lauderdale", "33316": "Fort Lauderdale", "33317": "Fort Lauderdale", "33318": "Fort Lauderdale", "33319": "Fort Lauderdale", "33320": "Fort Lauderdale", "33321": "Fort Lauderdale", "33322": "Fort Lauderdale", "33323": "Fort Lauderdale", "33324": "Fort Lauderdale", "33325": "Fort Lauderdale", "33326": "Fort Lauderdale", "33327": "Fort Lauderdale", "33328": "Fort Lauderdale", "33329": "Fort Lauderdale", "33330": "Fort Lauderdale", "33331": "Fort Lauderdale", "33332": "Fort Lauderdale", "33334": "Fort Lauderdale", "33335": "Fort Lauderdale", "33336": "Fort Lauderdale", "33337": "Fort Lauderdale", "33338": "Fort Lauderdale", "33339": "Fort Lauderdale", "33340": "Fort Lauderdale", "33345": "Fort Lauderdale", "33346": "Fort Lauderdale", "33348": "Fort Lauderdale", "33349": "Fort Lauderdale", "33351": "Fort Lauderdale", "33355": "Fort Lauderdale", "33359": "Fort Lauderdale", "33394": "Fort Lauderdale",
  
  // Additional major cities
  "33401": "West Palm Beach", "33402": "West Palm Beach", "33403": "West Palm Beach", "33404": "West Palm Beach", "33405": "West Palm Beach", "33406": "West Palm Beach", "33407": "West Palm Beach", "33408": "West Palm Beach", "33409": "West Palm Beach", "33410": "West Palm Beach", "33411": "West Palm Beach", "33412": "West Palm Beach", "33413": "West Palm Beach", "33414": "West Palm Beach", "33415": "West Palm Beach", "33416": "West Palm Beach", "33417": "West Palm Beach", "33418": "West Palm Beach", "33419": "West Palm Beach", "33420": "West Palm Beach",
  
  "33701": "St. Petersburg", "33702": "St. Petersburg", "33703": "St. Petersburg", "33704": "St. Petersburg", "33705": "St. Petersburg", "33706": "St. Petersburg", "33707": "St. Petersburg", "33708": "St. Petersburg", "33709": "St. Petersburg", "33710": "St. Petersburg", "33711": "St. Petersburg", "33712": "St. Petersburg", "33713": "St. Petersburg", "33714": "St. Petersburg", "33715": "St. Petersburg", "33716": "St. Petersburg", "33729": "St. Petersburg", "33730": "St. Petersburg", "33731": "St. Petersburg", "33732": "St. Petersburg", "33733": "St. Petersburg", "33734": "St. Petersburg", "33736": "St. Petersburg", "33738": "St. Petersburg", "33740": "St. Petersburg", "33741": "St. Petersburg", "33742": "St. Petersburg", "33743": "St. Petersburg", "33747": "St. Petersburg", "33755": "St. Petersburg", "33756": "St. Petersburg", "33759": "St. Petersburg", "33760": "St. Petersburg", "33761": "St. Petersburg", "33762": "St. Petersburg", "33763": "St. Petersburg", "33764": "St. Petersburg", "33765": "St. Petersburg", "33767": "St. Petersburg", "33769": "St. Petersburg", "33770": "St. Petersburg", "33771": "St. Petersburg", "33772": "St. Petersburg", "33773": "St. Petersburg", "33774": "St. Petersburg", "33775": "St. Petersburg", "33776": "St. Petersburg", "33777": "St. Petersburg", "33778": "St. Petersburg", "33781": "St. Petersburg", "33782": "St. Petersburg", "33784": "St. Petersburg", "33785": "St. Petersburg", "33786": "St. Petersburg"
};

const HeatIndexVisualization = () => {
  const [selectedCity, setSelectedCity] = useState("Miami");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Check if search term is a zip code
    const cityFromZip = floridaZipCodes[searchTerm];
    if (cityFromZip) {
      setSelectedCity(cityFromZip);
      return;
    }
    
    // Check if search term matches a city name
    const cityMatch = Object.keys(floridaCitiesData).find(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (cityMatch) {
      setSelectedCity(cityMatch);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const currentData = floridaCitiesData[selectedCity as keyof typeof floridaCitiesData];
  
  const chartData = [
    {
      name: 'Temperature',
      value: currentData?.temp || 0,
      color: '#FF6B6B'
    },
    {
      name: 'Humidity %',
      value: currentData?.humidity || 0,
      color: '#4ECDC4'
    },
    {
      name: 'Heat Index',
      value: currentData?.heatIndex || 0,
      color: '#FF8E53'
    }
  ];

  const getHeatIndexLevel = (heatIndex: number) => {
    if (heatIndex < 80) return { level: "Normal", color: "text-green-600", bg: "bg-green-100" };
    if (heatIndex < 90) return { level: "Caution", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (heatIndex < 105) return { level: "Extreme Caution", color: "text-orange-600", bg: "bg-orange-100" };
    if (heatIndex < 130) return { level: "Danger", color: "text-red-600", bg: "bg-red-100" };
    return { level: "Extreme Danger", color: "text-purple-600", bg: "bg-purple-100" };
  };

  const heatLevel = getHeatIndexLevel(currentData?.heatIndex || 0);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Florida Heat Index Monitor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time heat index data for major Florida cities. Monitor dangerous heat conditions 
            and plan your AC maintenance accordingly.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search and City Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Location</CardTitle>
              <CardDescription>
                Choose a city from the dropdown or search by city name or zip code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="md:w-64">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(floridaCitiesData).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2 flex-1">
                  <Input
                    placeholder="Search by city name or zip code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Conditions - {selectedCity}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${heatLevel.bg} ${heatLevel.color}`}>
                    {heatLevel.level}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{currentData?.temp}°F</div>
                    <div className="text-sm text-gray-600">Temperature</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{currentData?.humidity}%</div>
                    <div className="text-sm text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{currentData?.heatIndex}°F</div>
                    <div className="text-sm text-gray-600">Heat Index</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">AC Maintenance Recommendations:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {currentData?.heatIndex && currentData.heatIndex > 100 ? (
                      <>
                        <li>• Schedule immediate AC inspection</li>
                        <li>• Check refrigerant levels</li>
                        <li>• Clean or replace air filters</li>
                        <li>• Ensure proper ventilation</li>
                      </>
                    ) : (
                      <>
                        <li>• Regular maintenance recommended</li>
                        <li>• Monitor system performance</li>
                        <li>• Keep filters clean</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weather Data Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#FF8E53" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Find Qualified Contractors Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Find Qualified Contractors</CardTitle>
              <CardDescription className="text-blue-700">
                High heat index readings mean your AC system is working harder. Connect with verified professionals in your area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">Search by Location</h3>
                  <p className="text-blue-700 text-sm">Find AC contractors near you based on your current location or zip code</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">Verified Reviews</h3>
                  <p className="text-blue-700 text-sm">Read authentic reviews from customers and see ratings for quality service</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">Licensed & Insured</h3>
                  <p className="text-blue-700 text-sm">All contractors are verified, licensed, and insured for your peace of mind</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={() => {
                    // Scroll to search section
                    document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Find AC Contractors Now
                </Button>
                <p className="text-sm text-blue-600 mt-2">
                  Get free quotes from top-rated professionals in your area
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeatIndexVisualization;
