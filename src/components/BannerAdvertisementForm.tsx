
import { useState } from "react";
import { Save, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BannerAdData {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  callToAction: string;
  targetUrl: string;
  bannerSize: string;
  placement: string;
  campaignDuration: string;
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  adDescription: string;
}

interface BannerAdvertisementFormProps {
  onBack: () => void;
}

const BannerAdvertisementForm = ({ onBack }: BannerAdvertisementFormProps) => {
  const [bannerData, setBannerData] = useState<BannerAdData>({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    callToAction: '',
    targetUrl: '',
    bannerSize: '',
    placement: '',
    campaignDuration: '30',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    adDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof BannerAdData, value: string) => {
    setBannerData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform: keyof BannerAdData['socialMediaLinks'], value: string) => {
    setBannerData(prev => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bannerData.businessName || !bannerData.contactEmail || !bannerData.contactPhone) {
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
      title: "Banner advertisement submitted!",
      description: "We'll review your banner design and contact you within 24 hours.",
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
            Banner Advertisement Application
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              $199/month
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Get maximum visibility with premium banner placement across our platform.
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
                  value={bannerData.businessName}
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
                  value={bannerData.contactPhone}
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
                  value={bannerData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="info@coolbreezeac.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={bannerData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.coolbreezeac.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="targetUrl">Target URL (where banner clicks should go)</Label>
              <Input
                id="targetUrl"
                value={bannerData.targetUrl}
                onChange={(e) => handleInputChange('targetUrl', e.target.value)}
                placeholder="https://www.coolbreezeac.com/contact"
              />
            </div>

            <div>
              <Label htmlFor="callToAction">Call-to-Action Text</Label>
              <Input
                id="callToAction"
                value={bannerData.callToAction}
                onChange={(e) => handleInputChange('callToAction', e.target.value)}
                placeholder="e.g., Call Now for Free Estimate, Schedule Service Today"
              />
            </div>

            <div>
              <Label htmlFor="adDescription">Advertisement Description</Label>
              <Textarea
                id="adDescription"
                value={bannerData.adDescription}
                onChange={(e) => handleInputChange('adDescription', e.target.value)}
                placeholder="Describe what you want to promote and any special offers..."
                rows={3}
              />
            </div>

            {/* Banner Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Banner Size</Label>
                <Select value={bannerData.bannerSize} onValueChange={(value) => handleInputChange('bannerSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select banner size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leaderboard">Leaderboard (728x90)</SelectItem>
                    <SelectItem value="medium-rectangle">Medium Rectangle (300x250)</SelectItem>
                    <SelectItem value="large-rectangle">Large Rectangle (336x280)</SelectItem>
                    <SelectItem value="skyscraper">Wide Skyscraper (160x600)</SelectItem>
                    <SelectItem value="mobile-banner">Mobile Banner (320x50)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Preferred Placement</Label>
                <Select value={bannerData.placement} onValueChange={(value) => handleInputChange('placement', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select placement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homepage-top">Homepage - Top</SelectItem>
                    <SelectItem value="homepage-sidebar">Homepage - Sidebar</SelectItem>
                    <SelectItem value="search-results">Search Results Pages</SelectItem>
                    <SelectItem value="business-detail">Business Detail Pages</SelectItem>
                    <SelectItem value="mobile-footer">Mobile - Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Banner Upload */}
            <div>
              <Label>Upload Banner Design</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Upload your banner design or logo</p>
                <Button type="button" variant="outline">
                  Choose Banner File
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, GIF. Max file size: 2MB
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Don't have a design? We can create one for you (additional fee may apply)
                </p>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <Label>Additional Images/Graphics</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Upload additional images, logos, or graphics</p>
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Multiple files allowed. For use in banner creation if needed.
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <Label>Social Media Links (for potential inclusion)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Input
                    placeholder="Facebook URL"
                    value={bannerData.socialMediaLinks.facebook}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Twitter URL"
                    value={bannerData.socialMediaLinks.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Instagram URL"
                    value={bannerData.socialMediaLinks.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="LinkedIn URL"
                    value={bannerData.socialMediaLinks.linkedin}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Campaign Duration */}
            <div>
              <Label htmlFor="campaignDuration">Campaign Duration (days)</Label>
              <Input
                id="campaignDuration"
                type="number"
                value={bannerData.campaignDuration}
                onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                placeholder="30"
                min="1"
                className="max-w-xs"
              />
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

export default BannerAdvertisementForm;
