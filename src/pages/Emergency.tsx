
import { useState } from "react";
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

  const emergencyContractors = [
    {
      id: 1,
      name: "24/7 AC Emergency Repair",
      phone: "(305) 555-0123",
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
      phone: "(407) 555-0456",
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
      phone: "(813) 555-0789",
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
            <span className="text-lg font-semibold">24/7 Emergency AC Service Available</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Emergency AC Repair
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AC system down? Get immediate help from verified emergency contractors available 24/7 across Florida.
          </p>
          
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
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={handleFindHelp}
              >
                Find Help Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Emergency Contractors - Show based on search */}
        {showResults && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Available Emergency Contractors Near {zipCode}</h2>
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
          </div>
        )}

        {/* Always show Emergency Service Locator */}
        <EmergencyServiceLocator />

        {/* Emergency Tips */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">What to Do While You Wait</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-red-600">Immediate Steps:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Turn off your AC system at the thermostat</li>
                <li>• Check circuit breakers and reset if tripped</li>
                <li>• Replace air filter if it's dirty</li>
                <li>• Clear area around outdoor unit</li>
                <li>• Check for obvious leaks or damage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-blue-600">Safety Reminders:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Never attempt electrical repairs yourself</li>
                <li>• Keep pets and children away from units</li>
                <li>• Don't use space heaters as temporary cooling</li>
                <li>• Stay hydrated in hot weather</li>
                <li>• Consider temporary cooling options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Emergency;
