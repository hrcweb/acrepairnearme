
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

  // Mock rebate data - in a real app, this would come from an API
  const mockRebates: Rebate[] = [
    {
      id: 1,
      title: "Federal Tax Credit for Energy Efficient AC",
      amount: "Up to $2,000",
      type: "Federal",
      description: "30% tax credit for qualifying ENERGY STAR certified central air conditioners and heat pumps.",
      eligibility: "Must meet ENERGY STAR requirements and be installed in primary residence",
      deadline: "December 31, 2024",
      provider: "IRS",
      link: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit"
    },
    {
      id: 2,
      title: "Florida Energy Efficiency Rebate",
      amount: "Up to $1,500",
      type: "State",
      description: "State rebate for replacing old AC units with high-efficiency systems (16+ SEER rating).",
      eligibility: "Florida residents, primary residence only",
      deadline: "Ongoing (while funds last)",
      provider: "Florida Department of Environmental Protection",
      link: "#"
    },
    {
      id: 3,
      title: "FPL Energy Efficiency Rebate",
      amount: "Up to $1,000",
      type: "Utility",
      description: "Rebate for FPL customers who upgrade to qualifying high-efficiency AC systems.",
      eligibility: "FPL customers, must pre-qualify before installation",
      deadline: "December 31, 2024",
      provider: "Florida Power & Light",
      link: "#"
    },
    {
      id: 4,
      title: "Miami-Dade Green Building Incentive",
      amount: "Up to $500",
      type: "Local",
      description: "Additional rebate for Miami-Dade residents who install ENERGY STAR certified systems.",
      eligibility: "Miami-Dade County residents",
      deadline: "June 30, 2024",
      provider: "Miami-Dade County",
      link: "#"
    }
  ];

  const handleSearch = () => {
    if (zipCode.trim()) {
      // In a real app, this would filter based on the zip code
      setSearchResults(mockRebates);
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
            Local Rebate Finder
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover available rebates and incentives for energy-efficient AC installations in your area
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
                    Available Rebates in {zipCode}
                  </h3>
                  <p className="text-gray-600">
                    Found {searchResults.length} rebate{searchResults.length !== 1 ? 's' : ''} that could save you money
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

                <div className="mt-12 text-center">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-8">
                      <h4 className="text-xl font-bold text-blue-900 mb-4">
                        Need Help with Your Rebate Application?
                      </h4>
                      <p className="text-blue-700 mb-6">
                        Our verified contractors can help you navigate rebate applications and ensure your new AC system qualifies for maximum savings.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Find Qualified Contractors
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No rebates found for ZIP code {zipCode}. Try a different location or check back later.
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
