import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequestCTAProps {
  variant?: "hero" | "sticky" | "inline";
  className?: string;
}

const QuoteRequestCTA = ({ variant = "inline", className = "" }: QuoteRequestCTAProps) => {
  const [formData, setFormData] = useState({
    location: "",
    phone: "",
    email: "",
    serviceType: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted!",
      description: "We'll connect you with top-rated AC contractors in your area within 1 hour.",
    });
    setFormData({ location: "", phone: "", email: "", serviceType: "" });
  };

  const handleStickyButtonClick = () => {
    // Scroll to the hero form or show a quick quote modal
    const heroForm = document.querySelector('[data-hero-form]');
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no hero form is visible, show a toast with instructions
      toast({
        title: "Ready to Get Your Quote?",
        description: "Scroll up to fill out the quote form or call us directly for immediate assistance.",
      });
    }
  };

  const serviceTypes = [
    "AC Repair",
    "AC Installation", 
    "Emergency AC Service",
    "AC Maintenance",
    "Commercial HVAC",
    "Duct Cleaning",
    "Heat Pump Service"
  ];

  if (variant === "sticky") {
    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50 ${className}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Need AC Repair? Get Free Quotes Now!</h3>
            <p className="text-sm text-blue-100">Connect with licensed contractors in minutes</p>
          </div>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleStickyButtonClick}
          >
            Get Free Quote <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <Card className={`bg-white/95 backdrop-blur-sm border-0 shadow-xl ${className}`} data-hero-form>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900 text-center">
            Get Free Quotes from Top-Rated AC Contractors
          </CardTitle>
          <p className="text-center text-gray-600">Licensed • Insured • 24/7 Available</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Enter your ZIP code or city"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="pl-10"
                required
              />
            </div>
            
            <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="What service do you need?" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg">
              Get Free Quotes Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs text-center text-gray-500">
              No obligation • Typically 3-5 quotes • Average response: 1 hour
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Get Your AC Fixed?
          </h3>
          <p className="text-gray-600">Get free quotes from licensed contractors in your area</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your ZIP code"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <Input
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select service needed" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Get Free Quotes <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestCTA;
