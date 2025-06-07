
import { useState } from "react";
import { Save, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface BusinessData {
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  hours: string;
  services: string[];
  emergencyService: boolean;
  verified: boolean;
}

const BusinessListingForm = () => {
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    hours: '',
    services: [],
    emergencyService: false,
    verified: false
  });
  const [newService, setNewService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof BusinessData, value: string | boolean) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (newService.trim() && !businessData.services.includes(newService.trim())) {
      setBusinessData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (serviceToRemove: string) => {
    setBusinessData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessData.name || !businessData.phone || !businessData.address) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, phone, and address are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Business listing submitted!",
      description: "Your listing will be reviewed and published within 24 hours.",
    });

    // Reset form
    setBusinessData({
      name: '',
      description: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      hours: '',
      services: [],
      emergencyService: false,
      verified: false
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>List Your AC Business</CardTitle>
          <p className="text-gray-600">Create or update your business listing to reach more customers</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  value={businessData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Cool Breeze AC Repair"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={businessData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={businessData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="info@coolbreezeac.com"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={businessData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.coolbreezeac.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={businessData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main St, Miami, FL 33139"
                required
              />
            </div>

            <div>
              <Label htmlFor="hours">Business Hours</Label>
              <Input
                id="hours"
                value={businessData.hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                placeholder="Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
              />
            </div>

            <div>
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={businessData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your business, experience, and what makes you unique..."
                rows={4}
              />
            </div>

            {/* Services */}
            <div>
              <Label>Services Offered</Label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="Add a service (e.g., AC Repair)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  />
                  <Button type="button" onClick={addService} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {businessData.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {businessData.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{service}</span>
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeService(service)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="emergencyService"
                  checked={businessData.emergencyService}
                  onCheckedChange={(checked) => handleInputChange('emergencyService', !!checked)}
                />
                <Label htmlFor="emergencyService">24/7 Emergency Service Available</Label>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div>
              <Label>Business Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Upload photos of your business, team, or work</p>
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, GIF (Max 5MB each)
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessListingForm;
