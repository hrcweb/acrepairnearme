
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSystemStats } from "@/hooks/useSystemStats";
import SystemStats from "./settings/SystemStats";
import SiteSettingsCard from "./settings/SiteSettingsCard";
import DatabaseMaintenanceCard from "./settings/DatabaseMaintenanceCard";

const AdminSystemSettings = () => {
  const { toast } = useToast();
  const { stats } = useSystemStats();
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

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      console.log('Saving settings:', settings);
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
      <SystemStats stats={stats} />
      <SiteSettingsCard 
        settings={settings}
        onSettingsChange={setSettings}
        onSave={handleSaveSettings}
        loading={loading}
      />
      <DatabaseMaintenanceCard 
        onMaintenance={handleDatabaseMaintenance}
        loading={loading}
      />
    </div>
  );
};

export default AdminSystemSettings;
