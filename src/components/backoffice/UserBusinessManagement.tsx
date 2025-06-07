
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Edit, Trash2, Star, Phone, MapPin, Globe, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BusinessEditForm from "./BusinessEditForm";

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
  owner_user_id?: string;
}

const UserBusinessManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserBusinesses();
    }
  }, [user]);

  const loadUserBusinesses = async () => {
    try {
      // For now, we'll get all businesses since there's no owner_user_id field yet
      // This would need to be filtered by user in a real implementation
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
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
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your Business Listings</h3>
          <p className="text-sm text-gray-600">Manage your business listings and information</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businesses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businesses.length > 0 
                ? (businesses.reduce((sum, b) => sum + b.rating, 0) / businesses.length).toFixed(1)
                : "0.0"
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businesses.reduce((sum, b) => sum + b.review_count, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business List */}
      {businesses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No business listings found.</p>
            <p className="text-sm text-gray-400 mb-4">
              Add your first business listing to get started.
            </p>
            <Button onClick={() => setShowAddForm(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Business
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {businesses.map((business) => (
            <Card key={business.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{business.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {business.address}, {business.city}, {business.state} {business.zip_code}
                      </div>
                      {business.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {business.phone}
                        </div>
                      )}
                      {business.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {business.email}
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {business.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex items-center text-right">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{business.rating}</span>
                      <span className="text-gray-500 ml-1">({business.review_count})</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingBusiness(business)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBusiness(business.id, business.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {business.services && business.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {business.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBusinessManagement;
