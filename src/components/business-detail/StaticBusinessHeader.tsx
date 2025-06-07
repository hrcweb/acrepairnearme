
import { Star, CheckCircle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StaticBusinessHeaderProps {
  business: {
    name: string;
    description: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    sponsored: boolean;
    image: string;
  };
}

const StaticBusinessHeader = ({ business }: StaticBusinessHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start space-x-4">
          <img 
            src={business.image} 
            alt={business.name}
            className="w-20 h-20 rounded-lg object-cover bg-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
              {business.verified && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
              {business.sponsored && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Sponsored
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium ml-1">{business.rating}</span>
                <span className="text-gray-600 ml-1">({business.reviewCount} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600">{business.description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StaticBusinessHeader;
