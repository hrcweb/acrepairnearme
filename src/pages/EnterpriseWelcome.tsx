
import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, Building2, Phone, Mail, Calendar, ArrowRight, Star, Shield, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const EnterpriseWelcome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    // Check if this is coming from a successful payment
    const tier = searchParams.get("tier");
    if (tier !== "Enterprise") {
      navigate("/");
      return;
    }

    // Retrieve stored business data
    const storedData = localStorage.getItem('enterpriseBusinessData');
    if (storedData) {
      setBusinessData(JSON.parse(storedData));
      // Clear the stored data
      localStorage.removeItem('enterpriseBusinessData');
    }

    // Update page title for Enterprise
    document.title = "Welcome to Enterprise - AC Repair Near Me Pro";
  }, [searchParams, navigate]);

  const handleScheduleOnboarding = () => {
    toast({
      title: "Onboarding Scheduled",
      description: "Your dedicated account manager will contact you within 24 hours to begin your Enterprise onboarding.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
              <Badge className="bg-gold-100 text-gold-800 border-gold-200">
                Enterprise
              </Badge>
            </div>
            <Link to="/back-office" className="text-blue-600 hover:underline">
              Access Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Welcome Hero */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Enterprise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your Enterprise subscription is now active! You've joined Florida's premier HVAC contractor network with exclusive benefits and dedicated support.
          </p>
        </div>

        {/* Business Summary */}
        {businessData && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Your Business Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Business Name:</span>
                  <p>{businessData.name}</p>
                </div>
                <div>
                  <span className="font-medium">Location:</span>
                  <p>{businessData.city}, {businessData.state}</p>
                </div>
                <div>
                  <span className="font-medium">Phone:</span>
                  <p>{businessData.phone}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-green-100 text-green-800">
                    Active Enterprise Listing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enterprise Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-purple-200">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Premium Placement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Top search results placement</li>
                <li>• Featured business spotlight</li>
                <li>• Priority in emergency searches</li>
                <li>• Enhanced business profile</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time lead tracking</li>
                <li>• Customer insights dashboard</li>
                <li>• ROI performance reports</li>
                <li>• Market analysis tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gold-200">
            <CardHeader>
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-gold-600" />
              </div>
              <CardTitle className="text-lg">Dedicated Support</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Personal account manager</li>
                <li>• Priority 24/7 support</li>
                <li>• Quarterly business reviews</li>
                <li>• Marketing consultation</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Calendar className="w-5 h-5 mr-2" />
              Your Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-2">Immediate Actions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Business listing submitted for priority review
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Enterprise dashboard access activated
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Priority support queue enabled
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">Within 24 Hours</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    Account manager contact & introduction
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    Business listing review & optimization
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-green-600 mr-2" />
                    Premium features setup consultation
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 border-blue-200">
          <CardHeader>
            <CardTitle>Enterprise Support Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium">Priority Support Hotline</h4>
                  <p className="text-sm text-gray-600">Available 24/7 for Enterprise clients</p>
                  <p className="font-mono text-blue-600">(888) 123-ENTERPRISE</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium">Enterprise Support Email</h4>
                  <p className="text-sm text-gray-600">Direct line to your account manager</p>
                  <p className="text-blue-600">enterprise@acrepairnearme.pro</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Button onClick={handleScheduleOnboarding} size="lg" className="bg-green-600 hover:bg-green-700">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Onboarding Call
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/back-office">
              <Building2 className="w-5 h-5 mr-2" />
              Access Enterprise Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseWelcome;
