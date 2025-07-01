import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Plus, Download, Shield, UserCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BusinessImportForm from "@/components/BusinessImportForm";
import BusinessList from "@/components/BusinessList";

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("import");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { check_user_id: user?.id, role_name: 'admin' });
      
      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(data || false);
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const makeUserAdmin = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role: 'admin' });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been granted admin access!",
        });
        setIsAdmin(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Access Required
            </CardTitle>
            <CardDescription>Please sign in to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/auth">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Rights Required
            </CardTitle>
            <CardDescription>
              You need admin privileges to access this panel. If you are the site administrator, click below to grant yourself admin access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              <p><strong>Signed in as:</strong> {user.email}</p>
            </div>
            <Button onClick={makeUserAdmin} className="w-full">
              <UserCheck className="h-4 w-4 mr-2" />
              Grant Admin Access
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/">Back to Site</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const downloadTemplate = () => {
    const csvContent = [
      "name,description,address,city,state,zip_code,phone,email,website,services,rating,review_count,license_number,insurance_verified",
      "Cool Breeze AC Repair,Professional AC repair services,123 Main St,Miami,FL,33139,(305) 555-0123,info@coolbreeze.com,https://coolbreeze.com,\"AC Repair,Installation,Maintenance\",4.8,127,FL-12345,true",
      "Florida Comfort Solutions,HVAC services for Central Florida,456 Colonial Dr,Orlando,FL,32804,(407) 555-0456,contact@flcomfort.com,https://flcomfort.com,\"HVAC Repair,Duct Cleaning,Energy Audits\",4.6,89,FL-67890,true"
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <UserCheck className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
            <Button variant="outline" asChild>
              <a href="/">Back to Site</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "import" ? "default" : "ghost"}
            onClick={() => setActiveTab("import")}
            className="px-6"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Businesses
          </Button>
          <Button
            variant={activeTab === "add" ? "default" : "ghost"}
            onClick={() => setActiveTab("add")}
            className="px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Single Business
          </Button>
          <Button
            variant={activeTab === "manage" ? "default" : "ghost"}
            onClick={() => setActiveTab("manage")}
            className="px-6"
          >
            Manage Businesses
          </Button>
        </div>

        {activeTab === "import" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CSV Import</CardTitle>
                <CardDescription>
                  Upload a CSV file to import multiple businesses at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV Template
                  </Button>
                  <BusinessImportForm />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "add" && (
          <Card>
            <CardHeader>
              <CardTitle>Add Single Business</CardTitle>
              <CardDescription>
                Manually add a single business to the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessImportForm singleMode />
            </CardContent>
          </Card>
        )}

        {activeTab === "manage" && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Businesses</CardTitle>
              <CardDescription>
                View and manage all businesses in the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessList />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
