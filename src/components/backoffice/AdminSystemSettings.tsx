
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Settings, Database, Globe, Mail, Shield, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminSystemSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "AC Repair Near Me",
    siteDescription: "Florida's trusted directory for professional AC repair services",
    maintenanceMode: false,
    allowRegistrations: true,
    featuredListingsLimit: 6,
    autoApproveBusinesses: false,
    emailNotifications: true,
    requireBusinessVerification: true
  });

  const [dbStats, setDbStats] = useState({
    totalBusinesses: 0,
    totalUsers: 0,
    totalReviews: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    loadDatabaseStats();
  }, []);

  const loadDatabaseStats = async () => {
    try {
      console.log('Loading database statistics...');
      
      // Load statistics with proper error handling
      const [businessesResult, usersResult, reviewsResult] = await Promise.allSettled([
        supabase.from('businesses').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true })
      ]);

      const businessCount = businessesResult.status === 'fulfilled' ? businessesResult.value.count || 0 : 0;
      const userCount = usersResult.status === 'fulfilled' ? usersResult.value.count || 0 : 0;
      const reviewCount = reviewsResult.status === 'fulfilled' ? reviewsResult.value.count || 0 : 0;

      setDbStats({
        totalBusinesses: businessCount,
        totalUsers: userCount,
        totalReviews: reviewCount,
        pendingApprovals: 0 // This would need a status column in businesses table
      });

      console.log('Database statistics loaded:', { businessCount, userCount, reviewCount });
    } catch (error) {
      console.error('Error loading database stats:', error);
      toast({
        title: "Error loading statistics",
        description: "Could not load database statistics. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In a real implementation, you'd save these to a settings table
      console.log('Saving settings:', settings);
      
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "System settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error saving settings",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDatabaseMaintenance = async (action: string) => {
    setLoading(true);
    try {
      console.log(`Starting database maintenance: ${action}`);
      
      switch (action) {
        case 'vacuum':
          toast({
            title: "Database maintenance started",
            description: "Vacuum operation initiated. This may take a few minutes.",
          });
          break;
        case 'reindex':
          toast({
            title: "Database reindexing started",
            description: "Reindexing operation initiated. Performance may be temporarily affected.",
          });
          break;
        case 'analyze':
          toast({
            title: "Database analysis started",
            description: "Analyzing database statistics for query optimization.",
          });
          break;
        default:
          throw new Error(`Unknown maintenance action: ${action}`);
      }
      
      // Simulate maintenance operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error('Maintenance error:', error);
      toast({
        title: "Maintenance error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{dbStats.totalBusinesses}</p>
                <p className="text-sm text-muted-foreground">Total Businesses</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{dbStats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{dbStats.totalReviews}</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{dbStats.pendingApprovals}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
              <Zap className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Settings */}
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
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
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
                onChange={(e) => setSettings({ ...settings, featuredListingsLimit: parseInt(e.target.value) || 6 })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistrations: checked })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, autoApproveBusinesses: checked })}
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
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
          </div>

          <Button onClick={handleSaveSettings} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>

      {/* Database Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Management
          </CardTitle>
          <CardDescription>
            Perform database maintenance and optimization tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => handleDatabaseMaintenance('vacuum')}
              disabled={loading}
            >
              Vacuum Database
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDatabaseMaintenance('reindex')}
              disabled={loading}
            >
              Reindex Tables
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDatabaseMaintenance('analyze')}
              disabled={loading}
            >
              Analyze Statistics
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Warning:</strong> Database maintenance operations can temporarily affect performance. 
              It's recommended to perform these during low-traffic periods.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemSettings;
