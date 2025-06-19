
import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FLORIDA_CITIES } from "@/data/cities";

interface LocationLinksProps {
  currentCity?: string;
  showTitle?: boolean;
  maxLinks?: number;
}

const LocationLinks = ({ currentCity, showTitle = true, maxLinks = 12 }: LocationLinksProps) => {
  // Filter out current city and get nearby/popular cities
  const otherCities = FLORIDA_CITIES
    .filter(city => city.name !== currentCity)
    .sort((a, b) => (b.population || 0) - (a.population || 0)) // Sort by population
    .slice(0, maxLinks);

  return (
    <Card className="mt-8">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            AC Repair Services in Other Florida Cities
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {otherCities.map(city => (
            <Link
              key={city.slug}
              to={`/ac-repair-${city.slug}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 transition-colors"
            >
              AC Repair {city.name}
            </Link>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            View All Florida AC Repair Services
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationLinks;
