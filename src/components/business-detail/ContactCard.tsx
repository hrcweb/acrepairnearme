
import { Phone, MapPin, Clock, Globe, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactCardProps {
  phone: string | null;
  fullAddress: string;
  hours: string;
  website: string | null;
  email: string | null;
}

const ContactCard = ({ phone, fullAddress, hours, website, email }: ContactCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {phone && (
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>{phone}</span>
          </div>
        )}
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>{fullAddress}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{hours}</span>
        </div>
        {website && (
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <a href={website.startsWith('http') ? website : `https://${website}`} 
               className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
              {email}
            </a>
          </div>
        )}
        
        <div className="pt-4 space-y-2">
          {phone && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <a href={`tel:${phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
          )}
          <Button variant="outline" className="w-full">
            Get Free Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
