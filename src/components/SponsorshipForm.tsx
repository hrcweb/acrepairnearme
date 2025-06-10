
import { useState } from "react";
import { Save, Upload, Plus, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SponsorshipData {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  targetKeywords: string[];
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  preferredPlacement: string;
  budget: string;
  campaignDuration: string;
}

interface SponsorshipFormProps {
  onBack: () => void;
}

const SponsorshipForm = ({ onBack }: SponsorshipFormProps) => {
  const [sponsorshipData, setSponsorshipData] = useState<SponsorshipData>({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    description: '',
    targetKeywords: [],
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    preferredPlacement: '',
    budget: '',
    campaignDuration: '30'
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof SponsorshipData, value: string) => {
    setSponsorshipData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform: keyof SponsorshipData['socialMediaLinks'], value: string) => {
    setSponsorshipData(prev => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value }
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !sponsorshipData.targetKeywords.includes(newKeyword.trim())) {
      setSponsorshipData(prev => ({
        ...prev,
        targetKeywords: [...prev.targetKeywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setSponsorshipData(prev => ({
      ...prev,
      targetKeywords: prev.targetKeywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sponsorshipData.businessName || !sponsorshipData.contactEmail || !sponsorshipData.contactPhone) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, contact email, and phone are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Sponsorship application submitted!",
      description: "We'll review your application and contact you within 24 hours.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Advertising Options</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sponsored Listing Application
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              $99/month
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Get premium placement in search results and enhanced visibility for your AC repair business.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={sponsorshipData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Cool Breeze AC Repair"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={sponsorshipData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={sponsorshipData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="info@coolbreezeac.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={sponsorshipData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.coolbreezeac.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={sponsorshipData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your business, services, and what makes you unique..."
                rows={4}
              />
            </div>

            {/* Logo Upload */}
            <div>
              <Label>Business Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Upload your business logo (will be displayed with sponsored listings)</p>
                <Button type="button" variant="outline">
                  Choose Logo File
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: PNG with transparent background, min 200x200px
                </p>
              </div>
            </div>

            {/* Target Keywords */}
            <div>
              <Label>Target Keywords/Services</Label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword (e.g., AC Repair Miami)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button type="button" onClick={addKeyword} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {sponsorshipData.targetKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {sponsorshipData.targetKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{keyword}</span>
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <Label>Social Media Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Input
                    placeholder="Facebook URL"
                    value={sponsorshipData.socialMediaLinks.facebook}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Twitter URL"
                    value={sponsorshipData.socialMediaLinks.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Instagram URL"
                    value={sponsorshipData.socialMediaLinks.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="LinkedIn URL"
                    value={sponsorshipData.socialMediaLinks.linkedin}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Campaign Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredPlacement">Preferred Placement Areas</Label>
                <Input
                  id="preferredPlacement"
                  value={sponsorshipData.preferredPlacement}
                  onChange={(e) => handleInputChange('preferredPlacement', e.target.value)}
                  placeholder="e.g., Miami-Dade, Search Results, Homepage"
                />
              </div>
              <div>
                <Label htmlFor="campaignDuration">Campaign Duration (days)</Label>
                <Input
                  id="campaignDuration"
                  type="number"
                  value={sponsorshipData.campaignDuration}
                  onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                  placeholder="30"
                  min="1"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SponsorshipForm;
