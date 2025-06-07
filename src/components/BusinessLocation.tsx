
import { MapPin, Navigation, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BusinessLocationProps {
  address: string;
  hours: string;
}

const BusinessLocation = ({ address, hours }: BusinessLocationProps) => {
  const getDirectionsUrl = () => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const getEmbedMapUrl = () => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyDummy&q=${encodedAddress}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Location & Hours</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="font-medium">Business Hours</p>
            <p className="text-gray-600">{hours}</p>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button onClick={getDirectionsUrl} className="w-full" asChild>
            <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </Button>
          <Button variant="outline" onClick={openInMaps} className="w-full">
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        </div>

        {/* Interactive Google Maps embed */}
        <div className="mt-4">
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing location of ${address}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessLocation;
