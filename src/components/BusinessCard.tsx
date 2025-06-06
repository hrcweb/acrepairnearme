
import { Phone, MapPin, Star, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Business {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  phone: string;
  address: string;
  services: string[];
  description: string;
  image: string;
  sponsored: boolean;
  verified: boolean;
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${business.sponsored ? 'border-blue-200 bg-blue-50/30' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <img 
              src={business.image} 
              alt={business.name}
              className="w-16 h-16 rounded-lg object-cover bg-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
                {business.verified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {business.sponsored && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Sponsored
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{business.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({business.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{business.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {business.services.map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              {business.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {business.address}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Call Now
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Get Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
