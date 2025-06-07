
import Footer from "@/components/Footer";
import { CheckCircle, Star, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContractorGuidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contractor Guidelines
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Standards and requirements for AC repair contractors on our platform.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Requirements Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Licensed & Insured</h3>
              <p className="text-sm text-gray-600">Valid state license and insurance coverage required</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Quality Service</h3>
              <p className="text-sm text-gray-600">Maintain high customer satisfaction ratings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Reliable Response</h3>
              <p className="text-sm text-gray-600">Prompt communication and service delivery</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Verified Profile</h3>
              <p className="text-sm text-gray-600">Complete verification process and background check</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Eligibility Requirements</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Licensing and Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Valid HVAC contractor license in Florida
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      General liability insurance ($1M minimum)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Workers' compensation insurance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Bonding certificate (recommended)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Service Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Minimum 3 years of HVAC experience
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      EPA certification for refrigerant handling
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Professional appearance and conduct
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      Use of proper tools and safety equipment
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Performance Standards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Respond to leads within 2 hours</li>
                    <li>• Emergency calls within 30 minutes</li>
                    <li>• Scheduled appointments on time</li>
                    <li>• 24-hour advance notice for cancellations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Maintain 4.0+ star rating</li>
                    <li>• Less than 5% complaint rate</li>
                    <li>• Complete work per manufacturer specs</li>
                    <li>• Provide written estimates and warranties</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Code of Conduct</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Professional Behavior</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Treat customers with respect and professionalism</li>
                      <li>• Maintain clean and professional appearance</li>
                      <li>• Use appropriate language and communication</li>
                      <li>• Respect customer property and privacy</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Honest Business Practices</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Provide accurate quotes and estimates</li>
                      <li>• Explain work needed in understandable terms</li>
                      <li>• No high-pressure sales tactics</li>
                      <li>• Honor warranties and guarantees</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Safety Compliance</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Follow all safety protocols and regulations</li>
                      <li>• Use proper personal protective equipment</li>
                      <li>• Ensure work area is safe and clean</li>
                      <li>• Report any safety concerns immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Violations and Consequences</h2>
            
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  Failure to meet our guidelines may result in:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Warning and required corrective action</li>
                  <li>• Temporary suspension from the platform</li>
                  <li>• Removal from featured listings</li>
                  <li>• Permanent termination from the platform</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  We reserve the right to remove contractors who consistently fail to meet our standards or receive multiple customer complaints.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  Ready to join our network of trusted contractors?
                </p>
                <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                  <li>Complete the contractor application form</li>
                  <li>Submit required documentation and certifications</li>
                  <li>Pass our verification and background check process</li>
                  <li>Complete profile setup and service area selection</li>
                  <li>Start receiving qualified leads</li>
                </ol>
                <p className="text-sm text-gray-600 mt-4">
                  Questions about our contractor program? Contact us at contractor@acrepairnearme.pro
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContractorGuidelines;
