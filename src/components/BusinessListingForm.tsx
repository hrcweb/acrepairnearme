
import { useState } from "react";
import { Save, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface BusinessData {
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  hours: string;
  services: string[];
  emergencyService: boolean;
  verified: boolean;
  subscription_tier: string;
  license_number: string;
  insurance_verified: boolean;
}

interface BusinessListingFormProps {
  initialTier?: string;
}

const BusinessListingForm = ({ initialTier = 'free' }: BusinessListingFormProps) => {
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: 'FL',
    zip_code: '',
    hours: '',
    services: [],
    emergencyService: false,
    verified: false,
    subscription_tier: initialTier,
    license_number: '',
    insurance_verified: false
  });
  const [newService, setNewService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { session } = useAuth();

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

  const handleEnterprisePayment = async () => {
    if (!businessData.name || !businessData.phone || !businessData.address || !businessData.city || !businessData.zip_code) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, phone, address, city, and ZIP code are required before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create checkout session for Enterprise plan
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier: 'Enterprise' },
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : {}
      });

      if (error) throw error;

      // Store business data in localStorage for after payment
      localStorage.setItem('enterpriseBusinessData', JSON.stringify(businessData));

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating Enterprise checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to process Enterprise payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For Enterprise plan, handle payment first
    if (businessData.subscription_tier === 'enterprise') {
      await handleEnterprisePayment();
      return;
    }
    
    if (!businessData.name || !businessData.phone || !businessData.address || !businessData.city || !businessData.zip_code) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, phone, address, city, and ZIP code are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for non-Enterprise plans
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Business listing submitted!",
      description: `Your ${businessData.subscription_tier} listing will be reviewed and published within 24 hours.`,
    });

    // Reset form
    setBusinessData({
      name: '',
      description: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      city: '',
      state: 'FL',
      zip_code: '',
      hours: '',
      services: [],
      emergencyService: false,
      verified: false,
      subscription_tier: initialTier,
      license_number: '',
      insurance_verified: false
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>List Your AC Business</CardTitle>
          <p className="text-gray-600">
            {businessData.subscription_tier === 'enterprise' 
              ? "Complete your business information and proceed to secure payment for your Enterprise listing."
              : "Create your business listing. All information will be collected, and what's displayed will depend on your subscription plan."
            }
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="capitalize">
              {businessData.subscription_tier} Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plan Selection */}
            <div>
              <Label>Subscription Plan</Label>
              <Select value={businessData.subscription_tier} onValueChange={(value) => handleInputChange('subscription_tier', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free Listing</SelectItem>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="premium">Premium Plan</SelectItem>
                  <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            {/* Address Information */}
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={businessData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={businessData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Miami"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select value={businessData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FL">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zip_code">ZIP Code *</Label>
                <Input
                  id="zip_code"
                  value={businessData.zip_code}
                  onChange={(e) => handleInputChange('zip_code', e.target.value)}
                  placeholder="33139"
                  required
                />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="license_number">License Number</Label>
                <Input
                  id="license_number"
                  value={businessData.license_number}
                  onChange={(e) => handleInputChange('license_number', e.target.value)}
                  placeholder="CAC1234567"
                />
              </div>
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
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="insurance_verified"
                  checked={businessData.insurance_verified}
                  onCheckedChange={(checked) => handleInputChange('insurance_verified', !!checked)}
                />
                <Label htmlFor="insurance_verified">Fully Insured and Bonded</Label>
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
                {businessData.subscription_tier === 'free' && (
                  <p className="text-xs text-orange-600 mt-1">
                    Photo uploads available with paid plans
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Processing...' : 
                 businessData.subscription_tier === 'enterprise' ? 'Proceed to Payment' : 'Submit for Review'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessListingForm;
