
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Globe } from "lucide-react";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  featuredListingsLimit: number;
  autoApproveBusinesses: boolean;
  emailNotifications: boolean;
  requireBusinessVerification: boolean;
}

interface SiteSettingsCardProps {
  settings: SiteSettings;
  onSettingsChange: (settings: SiteSettings) => void;
  onSave: () => void;
  loading: boolean;
}

const SiteSettingsCard = ({ settings, onSettingsChange, onSave, loading }: SiteSettingsCardProps) => {
  const updateSettings = (updates: Partial<SiteSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Site Settings
        </CardTitle>
        <CardDescription>
          Configure global site settings and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="featuredLimit">Featured Listings Limit</Label>
            <Input
              id="featuredLimit"
              type="number"
              min="1"
              max="20"
              value={settings.featuredListingsLimit}
              onChange={(e) => updateSettings({ featuredListingsLimit: parseInt(e.target.value) || 6 })}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            value={settings.siteDescription}
            onChange={(e) => updateSettings({ siteDescription: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
            </div>
            <Switch
              id="maintenance"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => updateSettings({ maintenanceMode: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="registrations">Allow Registrations</Label>
              <p className="text-sm text-muted-foreground">Enable new user signups</p>
            </div>
            <Switch
              id="registrations"
              checked={settings.allowRegistrations}
              onCheckedChange={(checked) => updateSettings({ allowRegistrations: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoApprove">Auto-approve Businesses</Label>
              <p className="text-sm text-muted-foreground">Automatically approve new listings</p>
            </div>
            <Switch
              id="autoApprove"
              checked={settings.autoApproveBusinesses}
              onCheckedChange={(checked) => updateSettings({ autoApproveBusinesses: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Send system notifications</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
            />
          </div>
        </div>

        <Button onClick={onSave} disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SiteSettingsCard;
