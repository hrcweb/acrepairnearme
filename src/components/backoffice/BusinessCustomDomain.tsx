
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Globe, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessCustomDomainProps {
  businessId: number;
  subscriptionTier: string;
}

const BusinessCustomDomain = ({ businessId, subscriptionTier }: BusinessCustomDomainProps) => {
  const { toast } = useToast();
  const [customDomain, setCustomDomain] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [domainStatus, setDomainStatus] = useState<'none' | 'pending' | 'verified' | 'error'>('none');

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setDomainStatus('pending');
    
    // Simulate domain verification
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const success = Math.random() > 0.3; // 70% success rate for demo
    setDomainStatus(success ? 'verified' : 'error');
    setIsVerifying(false);
    
    toast({
      title: success ? "Domain verified" : "Domain verification failed",
      description: success 
        ? "Your custom domain is now active" 
        : "Please check your DNS settings and try again",
      variant: success ? "default" : "destructive",
    });
  };

  if (subscriptionTier !== 'enterprise') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Custom domains are only available on Enterprise plan</p>
            <Button variant="outline">Upgrade to Enterprise</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Custom Domain
          <Badge variant="outline">Enterprise Feature</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Set up a custom domain for your business profile page (e.g., profile.yourbusiness.com)
            </p>
            
            <form onSubmit={handleDomainSubmit} className="space-y-4">
              <div>
                <Label htmlFor="domain">Custom Domain</Label>
                <Input
                  id="domain"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="profile.yourbusiness.com"
                  disabled={isVerifying}
                />
              </div>
              
              <Button type="submit" disabled={isVerifying || !customDomain}>
                {isVerifying ? 'Verifying...' : 'Verify Domain'}
              </Button>
            </form>
          </div>

          {domainStatus !== 'none' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                domainStatus === 'verified' ? 'bg-green-50 text-green-800' :
                domainStatus === 'pending' ? 'bg-yellow-50 text-yellow-800' :
                'bg-red-50 text-red-800'
              }`}>
                {domainStatus === 'verified' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : domainStatus === 'pending' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-yellow-800 border-t-transparent" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <div>
                  <div className="font-medium">
                    {domainStatus === 'verified' && 'Domain Verified'}
                    {domainStatus === 'pending' && 'Verifying Domain...'}
                    {domainStatus === 'error' && 'Verification Failed'}
                  </div>
                  <div className="text-sm">
                    {domainStatus === 'verified' && `${customDomain} is now active`}
                    {domainStatus === 'pending' && 'Please wait while we verify your domain'}
                    {domainStatus === 'error' && 'Check your DNS settings and try again'}
                  </div>
                </div>
              </div>

              {domainStatus === 'verified' && (
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Your Business Profile</div>
                      <div className="text-sm text-gray-600">https://{customDomain}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">DNS Setup Instructions</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>1. Add a CNAME record pointing to: profiles.acrepairnearme.com</p>
              <p>2. Verify your domain ownership</p>
              <p>3. SSL certificate will be automatically provisioned</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCustomDomain;
