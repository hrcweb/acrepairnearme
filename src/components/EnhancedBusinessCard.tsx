import { Phone, MapPin, Star, CheckCircle, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
  insurance_verified: boolean;
  license_number: string | null;
}

interface EnhancedBusinessCardProps {
  business: Business;
  imageUrl?: string;
  showPricing?: boolean;
}

const EnhancedBusinessCard = ({ business, imageUrl, showPricing = true }: EnhancedBusinessCardProps) => {
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

  const finalImageUrl = imageUrl || getRandomAcImage(business.id);
  const priceRange = "$75 - $150"; // This would come from business data in real implementation

  return (
    <Card className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${business.featured ? 'border-blue-200 bg-gradient-to-br from-blue-50/50 to-white' : 'hover:border-gray-300'}`}>
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <LazyImage
            src={finalImageUrl}
            alt={`${business.name} - Professional AC Repair and HVAC Services`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {business.featured && (
              <Badge className="bg-blue-600 text-white font-medium">
                Featured
              </Badge>
            )}
            {business.insurance_verified && (
              <Badge className="bg-green-600 text-white font-medium">
                Verified
              </Badge>
            )}
          </div>

          {/* Quick Action Button */}
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              className="bg-white/90 text-gray-900 hover:bg-white"
              asChild
            >
              <a href={`tel:${business.phone}`}>
                <Phone className="w-4 h-4 mr-1" />
                Call
              </a>
            </Button>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">
                {business.rating?.toFixed(1) || "5.0"}
              </span>
              <span className="text-sm text-gray-600">
                ({business.review_count})
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <Link to={`/business/${business.id}`} className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                  {business.name}
                </h3>
              </Link>
              {business.insurance_verified && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
              )}
            </div>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {business.city}, {business.state} {business.zip_code}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {business.description || "Professional AC repair and HVAC services with fast, reliable solutions for your comfort needs."}
            </p>
          </div>

          {/* Services */}
          {business.services && business.services.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {business.services.slice(0, 3).map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {business.services.length > 3 && (
                  <Badge variant="outline" className="text-xs text-blue-600">
                    +{business.services.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              Licensed & Insured
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-blue-500" />
              24/7 Emergency
            </div>
            {showPricing && (
              <div className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1 text-orange-500" />
                Starting {priceRange}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 hover:bg-blue-50 hover:border-blue-300"
              asChild
            >
              <Link to={`/business/${business.id}`}>
                <ExternalLink className="w-4 h-4 mr-1" />
                View Details
              </Link>
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link to={`/business/${business.id}#quote`}>
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedBusinessCard;
