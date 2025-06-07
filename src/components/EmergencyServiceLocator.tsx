
import { useState, useEffect } from "react";
import { AlertTriangle, Phone, Clock, MapPin, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface EmergencyBusiness {
  id: number;
  name: string;
  phone: string;
  address: string;
  distance: number;
  rating: number;
  responseTime: string;
  available24h: boolean;
  emergencyFee: string;
}

const emergencyBusinesses: EmergencyBusiness[] = [
  {
    id: 1,
    name: "Cool Breeze AC Repair",
    phone: "561-206-2624",
    address: "123 Ocean Drive, Miami, FL",
    distance: 2.5,
    rating: 4.8,
    responseTime: "15-30 mins",
    available24h: true,
    emergencyFee: "$75"
  },
  {
    id: 3,
    name: "Sunshine AC & Heating",
    phone: "561-206-2624",
    address: "789 Tampa Bay Blvd, Tampa, FL",
    distance: 15.3,
    rating: 4.9,
    responseTime: "30-45 mins",
    available24h: true,
    emergencyFee: "$85"
  }
];

const EmergencyServiceLocator = () => {
  const [zipCode, setZipCode] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nearbyServices, setNearbyServices] = useState<EmergencyBusiness[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFindServices = () => {
    if (zipCode.trim()) {
      // Simulate API call to find nearby emergency services
      setNearbyServices(emergencyBusinesses);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Emergency Header */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-red-900 text-2xl">
                24/7 Emergency AC Service
              </CardTitle>
              <p className="text-red-700">
                Find immediate help for AC emergencies near you
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold text-red-900">Current Time</p>
              <p className="text-red-700">{formatTime(currentTime)}</p>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold text-red-900">Rapid Response</p>
              <p className="text-red-700">15-45 minute arrival</p>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold text-red-900">Direct Contact</p>
              <p className="text-red-700">Call contractors directly</p>
            </div>
          </div>

          {/* Location Input */}
          <div className="flex space-x-3">
            <Input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter your zip code for emergency service..."
              className="flex-1"
            />
            <Button 
              onClick={handleFindServices}
              className="bg-red-600 hover:bg-red-700"
            >
              Find Emergency Service
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span>AC Emergency Situations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Call Emergency Service If:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>AC unit is smoking or burning smell</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Electrical sparks or unusual noises</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Complete system failure in extreme heat</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Water leaking extensively</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Can Wait Until Morning:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>AC not cooling efficiently</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>Strange but not alarming sounds</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>Unit turns on but doesn't cool</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                  <span>Filter needs replacement</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Services Results */}
      {nearbyServices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Emergency AC Services Near You ({nearbyServices.length} available)
          </h3>
          
          {nearbyServices.map((business) => (
            <Card key={business.id} className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold">{business.name}</h4>
                      {business.available24h && (
                        <Badge className="bg-red-600">24/7 Available</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {business.address} ({business.distance} miles)
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          Response time: {business.responseTime}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium">Rating:</span>
                          <span className="ml-1 text-yellow-600">★ {business.rating}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium">Emergency fee:</span>
                          <span className="ml-1">{business.emergencyFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      asChild
                    >
                      <a href={`tel:${business.phone}`}>
                        <Phone className="w-4 h-4 mr-1" />
                        Call Now
                      </a>
                    </Button>
                    <p className="text-xs text-center text-gray-600">
                      {business.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Safety Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Safety First</h4>
              <p className="text-sm text-yellow-800">
                If you smell gas or suspect an electrical hazard, turn off your AC unit and contact your utility company immediately. 
                For life-threatening emergencies, call 911.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyServiceLocator;
