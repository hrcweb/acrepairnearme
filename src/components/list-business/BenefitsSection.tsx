
import { TrendingUp, CheckCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BenefitsSection = () => {
  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-8">Why List Your AC Repair Business?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle className="text-lg">More Visibility for AC Repair</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Get found by customers actively searching for AC repair near me. Our platform receives over 50,000 monthly searches from homeowners and businesses in need of AC repair and commercial HVAC services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <CardTitle className="text-lg">Verified AC Contractor Badge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Build trust with a verified business badge after our comprehensive review process. We verify licenses, insurance, and business credentials for all AC repair and HVAC contractors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Star className="w-8 h-8 text-yellow-600 mb-2" />
            <CardTitle className="text-lg">Customer Reviews & Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Collect and showcase authentic customer reviews for your AC repair services. Our review system helps potential customers see your quality work and increases conversion rates for commercial and residential projects.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Badge className="w-8 h-8 bg-purple-600 mb-2 flex items-center justify-center">
              $
            </Badge>
            <CardTitle className="text-lg">AC Repair Lead Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Receive direct quote requests from customers ready to hire AC repair contractors. Our platform connects you with pre-qualified leads seeking commercial heating and air conditioning repair services.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;
