
import React from 'react';
import { Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import LazyImage from "@/components/LazyImage";

interface Business {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  services: string[] | null;
  rating: number | null;
  review_count: number;
  featured: boolean;
}

interface FeaturedBusinessCardProps {
  business: Business;
  imageUrl: string;
}

const FeaturedBusinessCard: React.FC<FeaturedBusinessCardProps> = ({ business, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Business Image */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt={`${business.name} - AC Repair and HVAC Services`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-blue-600 text-white">
            Featured
          </Badge>
        </div>
      </div>

      {/* Business Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {business.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">
              {business.rating?.toFixed(1) || "5.0"}
            </span>
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({business.review_count} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{business.city}, {business.state}</span>
        </div>

        {/* Services */}
        {business.services && business.services.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {business.services.slice(0, 2).map((service, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {business.services.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{business.services.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {business.phone && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              asChild
            >
              <a href={`tel:${business.phone}`}>
                <Phone className="w-3 h-3 mr-1" />
                Call
              </a>
            </Button>
          )}
          <Button size="sm" className="flex-1" asChild>
            <Link to={`/business/${business.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBusinessCard;
