
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search, Edit, Trash2, Star, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
}

const BusinessList = () => {
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    const filtered = businesses.filter(business =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.zip_code.includes(searchQuery)
    );
    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery]);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching businesses",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      toast({
        title: "Error fetching businesses",
        description: error instanceof Error ? error.message : "An error occurred",
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

      if (error) {
        toast({
          title: "Error deleting business",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Business deleted",
          description: `${name} has been deleted successfully.`,
        });
        fetchBusinesses();
      }
    } catch (error) {
      toast({
        title: "Error deleting business",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading businesses...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search businesses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
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
            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredBusinesses.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Business List */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => (
          <Card key={business.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{business.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {business.address}, {business.city}, {business.state} {business.zip_code}
                    </div>
                    {business.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {business.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{business.rating}</span>
                    <span className="text-gray-500 ml-1">({business.review_count})</span>
                  </div>
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

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No businesses found.
        </div>
      )}
    </div>
  );
};

export default BusinessList;
