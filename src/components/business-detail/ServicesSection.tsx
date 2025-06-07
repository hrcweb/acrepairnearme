
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServicesSectionProps {
  services: string[] | null;
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Offered</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((service, index) => (
            <Badge key={index} variant="outline" className="justify-center py-2">
              {service}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesSection;
