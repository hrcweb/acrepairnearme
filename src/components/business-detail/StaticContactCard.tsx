
import { Phone, MapPin, Clock, Globe, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StaticContactCardProps {
  phone: string;
  address: string;
  hours: string;
  website: string;
  email: string;
}

const StaticContactCard = ({ phone, address, hours, website, email }: StaticContactCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>{address}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{hours}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-gray-500" />
          <a href={`https://${website}`} className="text-blue-600 hover:underline">
            {website}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        </div>
        
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <a href={`tel:${phone}`}>
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </Button>
          <Button variant="outline" className="w-full">
            Get Free Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticContactCard;
