
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Business {
  id: number;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  services: string[] | null;
  rating: number;
  review_count: number;
  created_at: string;
}

interface BusinessEditFormProps {
  business?: Business | null;
  onSave: () => void;
  onCancel: () => void;
}

const BusinessEditForm: React.FC<BusinessEditFormProps> = ({ business, onSave, onCancel }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newService, setNewService] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    email: "",
    website: "",
    services: [] as string[],
  });

  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name,
        description: business.description || "",
        address: business.address,
        city: business.city,
        state: business.state,
        zip_code: business.zip_code,
        phone: business.phone || "",
        email: business.email || "",
        website: business.website || "",
        services: business.services || [],
      });
    }
  }, [business]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService("");
    }
  };

  const removeService = (serviceToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zip_code) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const businessData = {
        name: formData.name,
        description: formData.description || null,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        phone: formData.phone || null,
        email: formData.email || null,
        website: formData.website || null,
        services: formData.services.length > 0 ? formData.services : null,
        rating: business ? business.rating : 0,
        review_count: business ? business.review_count : 0,
      };

      if (business) {
        // Update existing business
        const { error } = await supabase
          .from('businesses')
          .update(businessData)
          .eq('id', business.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Business updated successfully.",
        });
      } else {
        // Create new business
        const { error } = await supabase
          .from('businesses')
          .insert(businessData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Business created successfully.",
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving business:', error);
      toast({
        title: "Error",
        description: "Failed to save business. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{business ? 'Edit Business' : 'Add New Business'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Business Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your Business Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="info@yourbusiness.com"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourbusiness.com"
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Miami"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="FL"
                required
              />
            </div>
            <div>
              <Label htmlFor="zip_code">ZIP Code *</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => handleInputChange('zip_code', e.target.value)}
                placeholder="33139"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your business, services, and what makes you unique..."
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
              
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
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

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : (business ? 'Update Business' : 'Create Business')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessEditForm;
