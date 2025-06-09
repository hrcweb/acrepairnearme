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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Current HVAC Rebates & Tax Credits
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find up-to-date rebates and tax credits for energy-efficient AC and heat pump installations
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Find Rebates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            {searchResults.length > 0 ? (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Available Rebates for {zipCode}
                  </h3>
                  <p className="text-gray-600">
                    Found {searchResults.length} current rebate{searchResults.length !== 1 ? 's' : ''} and tax credits
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((rebate) => (
                    <Card key={rebate.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{rebate.title}</CardTitle>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTypeColor(rebate.type)}>
                                {rebate.type}
                              </Badge>
                              <div className="flex items-center text-green-600 font-semibold">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {rebate.amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{rebate.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <span className="font-medium text-sm">Eligibility: </span>
                              <span className="text-sm text-gray-600">{rebate.eligibility}</span>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <span className="font-medium text-sm">Deadline: </span>
                              <span className="text-sm text-gray-600">{rebate.deadline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-sm text-gray-500">
                            Provided by {rebate.provider}
                          </span>
                          <Button variant="outline" size="sm" asChild>
                            <a href={rebate.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />
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
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No location-specific rebates found for ZIP code {zipCode}. Federal tax credits may still be available nationwide.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalRebateFinder;
