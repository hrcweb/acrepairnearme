
import { useState, useEffect } from "react";
import { Clock, Phone, MapPin, AlertTriangle, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EmergencyServiceLocator from "@/components/EmergencyServiceLocator";
import Footer from "@/components/Footer";

const Emergency = () => {
  const [zipCode, setZipCode] = useState("");
  const [showResults, setShowResults] = useState(false);

  // SEO optimization
  useEffect(() => {
    document.title = "24/7 Emergency AC Repair Near Me | Commercial Emergency HVAC Services Florida";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        '24/7 emergency AC repair near me. Fast response commercial and residential emergency HVAC services across Florida. Licensed contractors available now for urgent AC repairs.'
      );
    }

    // Add emergency service structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": "24/7 Emergency AC Repair Services",
      "description": "24/7 emergency AC repair and commercial HVAC services across Florida",
      "serviceArea": {
        "@type": "State", 
        "name": "Florida"
      },
      "availableService": [
        {
          "@type": "Service",
          "name": "Emergency AC Repair",
          "description": "24/7 emergency air conditioning repair services"
        },
        {
          "@type": "Service", 
          "name": "Commercial Emergency HVAC",
          "description": "Emergency commercial heating and air conditioning repair"
        }
      ],
      "telephone": "561-206-2624",
      "hoursAvailable": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"24/7 Emergency AC Repair Services"')) {
          script.remove();
        }
      });
    };
  }, []);

  const emergencyContractors = [
    {
      id: 1,
      name: "24/7 AC Emergency Repair",
      phone: "561-206-2624",
      rating: 4.9,
      responseTime: "30 minutes",
      location: "Miami, FL",
      services: ["Emergency Repair", "System Replacement", "Refrigerant Leak"],
      availability: "Available Now",
      verified: true
    },
    {
      id: 2,
      name: "Quick Cool AC Services",
      phone: "561-206-2624",
      rating: 4.8,
      responseTime: "45 minutes",
      location: "Orlando, FL",
      services: ["Emergency Repair", "Compressor Replacement", "Electrical Issues"],
      availability: "Available Now",
      verified: true
    },
    {
      id: 3,
      name: "Rapid Response HVAC",
      phone: "561-206-2624",
      rating: 4.7,
      responseTime: "1 hour",
      location: "Tampa, FL",
      services: ["Emergency Repair", "Duct Repair", "System Diagnostics"],
      availability: "Available Now",
      verified: true
    }
  ];

  const handleFindHelp = () => {
    if (zipCode.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-lg font-semibold">24/7 Emergency AC Repair Service Available</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Emergency AC Repair Near Me
          </h1>
          <h2 className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            24/7 Emergency AC Repair & Commercial HVAC Services - Get immediate help from verified emergency contractors available around the clock across Florida.
          </h2>
          
          {/* Emergency Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">Less Than 1 Hour</div>
              <div className="text-gray-600">Average Response</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-gray-600">Verified</div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your ZIP code for emergency AC repair"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="flex-1"
                aria-label="Enter ZIP code for emergency AC repair"
              />
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={handleFindHelp}
                aria-label="Find emergency AC repair help"
              >
                Find Help Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Emergency Contractors - Show based on search */}
        {showResults && (
          <section className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8">Available Emergency AC Repair Contractors Near {zipCode}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContractors.map((contractor) => (
                <Card key={contractor.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{contractor.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 text-sm">{contractor.location}</span>
                        </div>
                      </div>
                      {contractor.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{contractor.rating}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {contractor.availability}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Response time: {contractor.responseTime}</span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-1">Emergency Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {contractor.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        asChild
                      >
                        <a href={`tel:${contractor.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call {contractor.phone}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Always show Emergency Service Locator */}
        <EmergencyServiceLocator />

        {/* Emergency Tips */}
        <section className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">What to Do While You Wait for Emergency AC Repair</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-red-600">Call Emergency AC Repair If:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• AC unit is smoking or burning smell</li>
                <li>• Electrical sparks or unusual noises</li>
                <li>• Complete system failure in extreme heat</li>
                <li>• Water leaking extensively</li>
                <li>• Commercial HVAC system down during business hours</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-blue-600">AC Issues That Can Wait:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• AC not cooling efficiently</li>
                <li>• Strange but not alarming sounds</li>
                <li>• Unit turns on but doesn't cool properly</li>
                <li>• Filter needs replacement</li>
                <li>• Minor refrigerant leaks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">Emergency AC Repair & Commercial HVAC Services</h3>
          <div className="max-w-4xl mx-auto text-gray-700">
            <p className="mb-4">
              When your air conditioning system fails, especially during Florida's hot climate, you need fast, reliable emergency AC repair near me. Our network of verified contractors specializes in both residential and commercial emergency HVAC services, ensuring you get immediate help when you need it most.
            </p>
            <p className="mb-4">
              Our emergency AC repair contractors are available 24/7 and specialize in commercial heating and air conditioning repair near me, serving businesses and residential properties across Florida. Whether it's a complete system breakdown, electrical issues, or refrigerant leaks, our verified professionals provide rapid response emergency services.
            </p>
            <p>
              Don't let a broken AC system disrupt your comfort or business operations. Find qualified emergency AC repair contractors in your area who are licensed, insured, and ready to respond quickly to your urgent HVAC needs.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Emergency;
