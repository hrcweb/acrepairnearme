
import { Phone, MapPin, Star, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Business {
  id: number;
  name: string;
  rating: number | null;
  reviewCount: number;
  phone: string | null;
  address: string;
  services: string[];
  description: string | null;
  image?: string;
  sponsored?: boolean;
  verified?: boolean;
  insurance_verified?: boolean;
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  // Verified AC/HVAC related images from Unsplash
  const acImages = [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop", // AC unit installation
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop", // HVAC equipment
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=250&fit=crop", // Indoor AC unit
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop", // AC maintenance
    "https://images.unsplash.com/photo-1555963633-1bb0c20b54f5?w=400&h=250&fit=crop", // HVAC system
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop", // AC condenser unit
    "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=250&fit=crop", // Modern AC unit
    "https://images.unsplash.com/photo-1592928302636-c83cf0fa1a2a?w=400&h=250&fit=crop", // Professional technician
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop", // HVAC technician at work
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop", // Air conditioning repair
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop", // HVAC maintenance
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"  // Professional HVAC work
  ];

  const getRandomAcImage = (businessId: number) => {
    // Use business ID to ensure consistent image assignment
    return acImages[businessId % acImages.length];
  };

  const imageUrl = business.image || getRandomAcImage(business.id);
  const rating = business.rating || 0;
  const reviewCount = business.reviewCount || 0;
  const phone = business.phone || "Contact for details";
  const description = business.description || "Professional AC repair and HVAC services";
  const services = business.services || [];
  const isVerified = business.verified || business.insurance_verified || false;
  const isSponsored = business.sponsored || false;

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isSponsored ? 'border-blue-200 bg-blue-50/30' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <Link to={`/business/${business.id}`}>
              <img 
                src={imageUrl} 
                alt={`${business.name} - AC Repair and HVAC Services`}
                className="w-16 h-16 rounded-lg object-cover bg-gray-200 hover:opacity-80 transition-opacity cursor-pointer"
                onError={(e) => {
                  // Fallback to a default image if the current one fails
                  const target = e.target as HTMLImageElement;
                  target.src = acImages[0];
                }}
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link to={`/business/${business.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {business.name}
                  </h3>
                </Link>
                {isVerified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {isSponsored && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Sponsored
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <Link to={`/business/${business.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Profile
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {services.slice(0, 4).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {services.length > 4 && (
              <Badge variant="outline" className="text-xs text-gray-500">
                +{services.length - 4} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="space-y-1">
            {business.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-1" />
                <a href={`tel:${business.phone}`} className="hover:text-blue-600 transition-colors">
                  {business.phone}
                </a>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {business.address}
            </div>
          </div>
          <div className="flex space-x-2">
            {business.phone && (
              <Button size="sm" variant="outline" asChild>
                <a href={`tel:${business.phone}`}>Call Now</a>
              </Button>
            )}
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to={`/business/${business.id}`}>Get Quote</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
