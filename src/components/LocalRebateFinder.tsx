import { useState } from "react";
import { Search, MapPin, DollarSign, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Rebate {
  id: number;
  title: string;
  amount: string;
  type: "Federal" | "State" | "Utility" | "Local";
  description: string;
  eligibility: string;
  deadline: string;
  provider: string;
  link: string;
}

const LocalRebateFinder = () => {
  const [zipCode, setZipCode] = useState("");
  const [searchResults, setSearchResults] = useState<Rebate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Updated current rebate data - accurate as of 2024
  const currentRebates: Rebate[] = [
    {
      id: 1,
      title: "Federal Energy Efficient Home Improvement Credit",
      amount: "Up to $2,000",
      type: "Federal",
      description: "30% tax credit for ENERGY STAR certified central air conditioners, heat pumps, and other qualifying equipment through the Inflation Reduction Act.",
      eligibility: "Primary residence, equipment must meet ENERGY STAR Most Efficient criteria",
      deadline: "December 31, 2032",
      provider: "IRS",
      link: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit"
    },
    {
      id: 2,
      title: "Federal High-Efficiency Electric Home Rebate",
      amount: "Up to $8,000",
      type: "Federal",
      description: "Point-of-sale rebates for heat pump HVAC systems under the Inflation Reduction Act's HOMES program.",
      eligibility: "Income-qualified households, primary residence",
      deadline: "Program ongoing (funding limited)",
      provider: "Department of Energy",
      link: "https://www.energy.gov/scep/slsc/home-electrification-and-appliance-rebates"
    },
    {
      id: 3,
      title: "Florida Solar and CHP Sales Tax Exemption",
      amount: "Sales tax savings",
      type: "State",
      description: "Sales tax exemption for solar energy systems and combined heat and power systems, including qualifying heat pumps.",
      eligibility: "Florida residents and businesses",
      deadline: "Ongoing",
      provider: "Florida Department of Revenue",
      link: "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx"
    },
    {
      id: 4,
      title: "Duke Energy Florida Smart $aver Rebates",
      amount: "Up to $1,200",
      type: "Utility",
      description: "Rebates for high-efficiency central AC and heat pump systems (16+ SEER, 9+ HSPF for heat pumps).",
      eligibility: "Duke Energy Florida customers, pre-approval required",
      deadline: "Ongoing (while funds available)",
      provider: "Duke Energy Florida",
      link: "https://www.duke-energy.com/home/products/smart-saver"
    },
    {
      id: 5,
      title: "FPL Energy Manager Rebates",
      amount: "Up to $1,600",
      type: "Utility",
      description: "Rebates for qualifying high-efficiency AC systems and heat pumps with smart thermostats.",
      eligibility: "FPL residential customers, equipment must be on qualified list",
      deadline: "Ongoing",
      provider: "Florida Power & Light",
      link: "https://www.fpl.com/save/rebates.html"
    },
    {
      id: 6,
      title: "TECO Energy Wise Rebates",
      amount: "Up to $750",
      type: "Utility",
      description: "Rebates for ENERGY STAR certified central air conditioning and heat pump systems.",
      eligibility: "TECO residential customers in service area",
      deadline: "December 31, 2024",
      provider: "Tampa Electric Company",
      link: "https://www.tecoenergy.com/residential/save-energy-money/rebates-incentives/"
    },
    {
      id: 7,
      title: "JEA Efficiency Made Easy Rebates",
      amount: "Up to $1,000",
      type: "Utility",
      description: "Rebates for high-efficiency HVAC systems and smart home energy management devices.",
      eligibility: "JEA electric customers in Jacksonville area",
      deadline: "Ongoing (budget permitting)",
      provider: "JEA (Jacksonville Electric Authority)",
      link: "https://www.jea.com/Ways_to_Save/Rebates_and_Programs/"
    },
    {
      id: 8,
      title: "City of Orlando GreenWorks Rebates",
      amount: "Up to $400",
      type: "Local",
      description: "Additional rebates for ENERGY STAR HVAC systems for Orlando residents.",
      eligibility: "City of Orlando residents, must be primary residence",
      deadline: "June 30, 2025",
      provider: "City of Orlando",
      link: "https://www.orlando.gov/Our-Government/Departments-Offices/Office-of-Sustainability-Resilience"
    }
  ];

  const handleSearch = () => {
    if (zipCode.trim()) {
      // Filter rebates based on location (simplified logic for demo)
      let filtered = [...currentRebates];
      
      // Federal rebates are available everywhere
      // State rebates are available throughout Florida
      // Utility rebates depend on service area (simplified here)
      // Local rebates depend on specific municipalities
      
      if (zipCode.startsWith('32') || zipCode.startsWith('33') || zipCode.startsWith('34')) {
        // Florida ZIP codes - include all rebates
        setSearchResults(filtered);
      } else {
        // Non-Florida - only show federal rebates
        filtered = filtered.filter(rebate => rebate.type === "Federal");
        setSearchResults(filtered);
      }
      
      setHasSearched(true);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Federal": return "bg-blue-100 text-blue-800";
      case "State": return "bg-green-100 text-green-800";
      case "Utility": return "bg-purple-100 text-purple-800";
      case "Local": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-green-50 py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Current HVAC Rebates & Tax Credits
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover thousands in savings with up-to-date rebates and tax credits for energy-efficient AC and heat pump installations. 
            Take advantage of federal, state, utility, and local incentives to reduce your HVAC upgrade costs.
          </p>
        </div>

        {/* Enhanced Search Section */}
        <Card className="max-w-4xl mx-auto mb-16 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Find Your Local Rebates</h3>
              <p className="text-gray-600 text-lg">Enter your ZIP code to discover available incentives in your area</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <Input
                  placeholder="Enter your ZIP code (e.g., 33101)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full h-14 text-lg border-2 border-blue-200 focus:border-blue-400 bg-white"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-lg shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Rebates
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 text-center">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">$50B+</div>
                <div className="text-sm text-blue-700">Federal Funding Available</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">30%</div>
                <div className="text-sm text-green-700">Maximum Tax Credit</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">$8,000</div>
                <div className="text-sm text-purple-700">Max Heat Pump Rebate</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-1">2032</div>
                <div className="text-sm text-orange-700">Program Ends</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-7xl mx-auto">
            {searchResults.length > 0 ? (
              <>
                <div className="mb-12 text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Available Rebates for {zipCode}
                  </h3>
                  <p className="text-xl text-gray-600">
                    Found {searchResults.length} current rebate{searchResults.length !== 1 ? 's' : ''} and tax credits worth up to{' '}
                    <span className="font-bold text-green-600">
                      ${searchResults.reduce((total, rebate) => {
                        const amount = parseInt(rebate.amount.replace(/[^\d]/g, '')) || 0;
                        return total + amount;
                      }, 0).toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {searchResults.map((rebate) => (
                    <Card key={rebate.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/95 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-3 text-gray-900">{rebate.title}</CardTitle>
                            <div className="flex items-center space-x-3 mb-3">
                              <Badge className={`${getTypeColor(rebate.type)} font-medium`}>
                                {rebate.type}
                              </Badge>
                              <div className="flex items-center text-green-600 font-bold text-lg">
                                <DollarSign className="w-5 h-5 mr-1" />
                                {rebate.amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-6 leading-relaxed">{rebate.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-900">Eligibility: </span>
                              <span className="text-gray-700">{rebate.eligibility}</span>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-gray-900">Deadline: </span>
                              <span className="text-gray-700">{rebate.deadline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-gray-600 font-medium">
                            Provided by {rebate.provider}
                          </span>
                          <Button variant="outline" size="sm" asChild className="hover:bg-blue-50 border-blue-200">
                            <a href={rebate.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Learn More
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <p className="text-gray-700 text-xl mb-4">
                    No location-specific rebates found for ZIP code {zipCode}.
                  </p>
                  <p className="text-gray-600">
                    Federal tax credits may still be available nationwide. Try searching with a Florida ZIP code for more local incentives.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        {!hasSearched && (
          <div className="text-center mt-16">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-green-600 border-0 text-white shadow-xl">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Save Thousands on Your HVAC Upgrade?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Combine federal tax credits with local rebates to maximize your savings on energy-efficient cooling systems.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                  onClick={() => document.querySelector('input')?.focus()}
                >
                  Search Your ZIP Code Now
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalRebateFinder;
