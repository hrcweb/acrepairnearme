
import { useState } from "react";
import { Send, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequestFormProps {
  businessName: string;
  businessPhone: string;
}

const QuoteRequestForm = ({ businessName, businessPhone }: QuoteRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
    urgency: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceType) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, phone, and service type are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Quote request sent!",
      description: `${businessName} will contact you within 24 hours.`,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      description: '',
      urgency: ''
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Request Free Quote</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div>
              <Label>Service Needed *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ac-repair">AC Repair</SelectItem>
                  <SelectItem value="ac-installation">AC Installation</SelectItem>
                  <SelectItem value="ac-maintenance">AC Maintenance</SelectItem>
                  <SelectItem value="duct-cleaning">Duct Cleaning</SelectItem>
                  <SelectItem value="heat-pump">Heat Pump Service</SelectItem>
                  <SelectItem value="emergency">Emergency Service</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Urgency Level</Label>
            <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="How urgent is this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
                <SelectItem value="urgent">Urgent (Within 24 hours)</SelectItem>
                <SelectItem value="soon">Soon (Within a few days)</SelectItem>
                <SelectItem value="flexible">Flexible timing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Describe Your Issue</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please describe what's happening with your AC system..."
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Request Quote'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              asChild
              className="flex-1"
            >
              <a href={`tel:${businessPhone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
