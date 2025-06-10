
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            Florida's #1 AC Repair & HVAC Business Directory
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Grow Your AC Repair Business with 
            <span className="text-blue-600"> Qualified Leads</span>
          </h1>
          <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join over 2,500 successful AC repair contractors who've increased their revenue by an average of 40% 
            through our proven directory platform. Get connected with homeowners and businesses actively seeking AC repair near me and commercial HVAC services.
          </h2>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50,000+</div>
              <div className="text-gray-600">Monthly Searches for AC Repair</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,500+</div>
              <div className="text-gray-600">Verified AC Contractors</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24 Hours</div>
              <div className="text-gray-600">Average Time to First Lead</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              View Pricing Plans Below
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/success-stories">See AC Contractor Success Stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
