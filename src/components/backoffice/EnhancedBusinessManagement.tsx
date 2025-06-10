
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Plus, Edit, Trash2, Star, Phone, MapPin, Globe, Mail, Camera, BarChart3, MessageSquare, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BusinessEditForm from "./BusinessEditForm";
import BusinessPhotosManager from "./BusinessPhotosManager";
import BusinessAnalytics from "./BusinessAnalytics";
import BusinessPrioritySupport from "./BusinessPrioritySupport";
import BusinessCustomDomain from "./BusinessCustomDomain";

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
  subscription_tier?: string;
}

const EnhancedBusinessManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      loadUserBusinesses();
    }
  }, [user]);

  const loadUserBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add mock subscription tiers for demo
      const businessesWithTiers = (data || []).map(business => ({
        ...business,
        subscription_tier: ['free', 'basic', 'premium', 'enterprise'][Math.floor(Math.random() * 4)]
      }));
      
      setBusinesses(businessesWithTiers);
    } catch (error) {
      console.error('Error loading businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load your businesses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBusiness = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${name} has been deleted successfully.`,
      });
      loadUserBusinesses();
      if (selectedBusiness?.id === id) {
        setSelectedBusiness(null);
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Failed to delete business",
        variant: "destructive",
      });
    }
  };

  const handleBusinessSaved = () => {
    setEditingBusiness(null);
    setShowAddForm(false);
    loadUserBusinesses();
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-gold-100 text-gold-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading your businesses...</div>;
  }

  if (editingBusiness || showAddForm) {
    return (
      <BusinessEditForm
        business={editingBusiness}
        onSave={handleBusinessSaved}
        onCancel={() => {
          setEditingBusiness(null);
          setShowAddForm(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Enhanced Business Management</h3>
          <p className="text-sm text-gray-600">Manage your business listings with advanced features</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Businesses ({businesses.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {businesses.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No business listings found.</p>
                  <Button onClick={() => setShowAddForm(true)} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Business
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {businesses.map((business) => (
                    <div 
                      key={business.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedBusiness?.id === business.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm truncate">{business.name}</h4>
                        <Badge className={`text-xs capitalize ${getTierColor(business.subscription_tier || 'free')}`}>
                          {business.subscription_tier || 'free'}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {business.city}, {business.state}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-400" />
                          {business.rating} ({business.review_count})
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingBusiness(business);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBusiness(business.id, business.name);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Business Details */}
        <div className="lg:col-span-2">
          {selectedBusiness ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedBusiness.name}
                  <Badge className={`capitalize ${getTierColor(selectedBusiness.subscription_tier || 'free')}`}>
                    {selectedBusiness.subscription_tier || 'free'} Plan
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview" className="text-xs">
                      <Settings className="h-4 w-4 mr-1" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="photos" className="text-xs">
                      <Camera className="h-4 w-4 mr-1" />
                      Photos
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="text-xs">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="support" className="text-xs">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Support
                    </TabsTrigger>
                    <TabsTrigger value="domain" className="text-xs">
                      <Globe className="h-4 w-4 mr-1" />
                      Domain
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Business Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Address:</span>
                            <p>{selectedBusiness.address}, {selectedBusiness.city}, {selectedBusiness.state} {selectedBusiness.zip_code}</p>
                          </div>
                          {selectedBusiness.phone && (
                            <div>
                              <span className="text-gray-500">Phone:</span>
                              <p>{selectedBusiness.phone}</p>
                            </div>
                          )}
                          {selectedBusiness.email && (
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <p>{selectedBusiness.email}</p>
                            </div>
                          )}
                          {selectedBusiness.website && (
                            <div>
                              <span className="text-gray-500">Website:</span>
                              <p>{selectedBusiness.website}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {selectedBusiness.description && (
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-gray-600">{selectedBusiness.description}</p>
                        </div>
                      )}
                      
                      {selectedBusiness.services && selectedBusiness.services.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedBusiness.services.map((service, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="photos" className="mt-6">
                    <BusinessPhotosManager 
                      businessId={selectedBusiness.id}
                      subscriptionTier={selectedBusiness.subscription_tier || 'free'}
                    />
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <BusinessAnalytics 
                      businessId={selectedBusiness.id}
                      subscriptionTier={selectedBusiness.subscription_tier || 'free'}
                    />
                  </TabsContent>

                  <TabsContent value="support" className="mt-6">
                    <BusinessPrioritySupport 
                      subscriptionTier={selectedBusiness.subscription_tier || 'free'}
                    />
                  </TabsContent>

                  <TabsContent value="domain" className="mt-6">
                    <BusinessCustomDomain 
                      businessId={selectedBusiness.id}
                      subscriptionTier={selectedBusiness.subscription_tier || 'free'}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Business</h3>
                <p className="text-gray-500">Choose a business from the list to view and manage its features</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBusinessManagement;
