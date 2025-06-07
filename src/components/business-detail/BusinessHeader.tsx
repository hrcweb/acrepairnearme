
import { Star, CheckCircle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BusinessHeaderProps {
  business: {
    name: string;
    description: string | null;
    rating: number;
    review_count: number;
    insurance_verified: boolean;
    featured: boolean;
  };
}

const BusinessHeader = ({ business }: BusinessHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {business.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
              {business.insurance_verified && (
                <CheckCircle className="w-6 h-6 text-green-500" />
              )}
              {business.featured && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium ml-1">{business.rating}</span>
                <span className="text-gray-600 ml-1">({business.review_count} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600">{business.description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BusinessHeader;
