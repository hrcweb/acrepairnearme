
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutSectionProps {
  businessName: string;
  description: string | null;
  licenseNumber: string | null;
}

const AboutSection = ({ businessName, description, licenseNumber }: AboutSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About {businessName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">
          {description || "Professional service provider in your area."}
        </p>
        {licenseNumber && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>License #:</strong> {licenseNumber}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;
