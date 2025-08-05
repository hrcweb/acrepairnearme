
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, AlertTriangle } from 'lucide-react';

const JewelryCleanup = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [jewelryBusinesses, setJewelryBusinesses] = useState<any[]>([]);

  const findJewelryBusinesses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .or(`
          name.ilike.%jewelry%,
          name.ilike.%jeweler%,
          name.ilike.%diamond%,
          name.ilike.%ring%,
          name.ilike.%necklace%,
          name.ilike.%bracelet%,
          name.ilike.%watch%,
          name.ilike.%gold%,
          description.ilike.%jewelry%,
          description.ilike.%jeweler%,
          description.ilike.%diamond%,
          description.ilike.%ring%,
          description.ilike.%necklace%,
          description.ilike.%bracelet%,
          description.ilike.%watch%,
          description.ilike.%gold%,
          services.cs.{jewelry,jeweler,diamond,ring,necklace,bracelet,watch,gold}
        `);

      if (error) throw error;

      setJewelryBusinesses(data || []);
      
      if (data && data.length > 0) {
        toast({
          title: `Found ${data.length} jewelry-related businesses`,
          description: "Review them below before removing",
        });
      } else {
        toast({
          title: "No jewelry businesses found",
          description: "Your database is already clean of jewelry listings",
        });
      }
    } catch (error) {
      toast({
        title: "Error searching for jewelry businesses",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeJewelryBusinesses = async () => {
    if (jewelryBusinesses.length === 0) {
      toast({
        title: "No businesses to remove",
        description: "Please search for jewelry businesses first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const businessIds = jewelryBusinesses.map(b => b.id);
      
      // Remove related reviews first
      const { error: reviewsError } = await supabase
        .from('reviews')
        .delete()
        .in('business_id', businessIds);

      if (reviewsError) throw reviewsError;

      // Remove related quotes
      const { error: quotesError } = await supabase
        .from('quotes' as any)
        .delete()
        .in('business_id', businessIds);

      if (quotesError) throw quotesError;

      // Remove the businesses
      const { error: businessError } = await supabase
        .from('businesses')
        .delete()
        .in('id', businessIds);

      if (businessError) throw businessError;

      toast({
        title: "Jewelry businesses removed successfully",
        description: `Removed ${jewelryBusinesses.length} jewelry-related businesses and their associated data`,
      });

      setJewelryBusinesses([]);
    } catch (error) {
      toast({
        title: "Error removing jewelry businesses",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Remove Jewelry Businesses</h2>
        <p className="text-gray-600 mb-6">
          This tool will help you find and remove all jewelry-related business listings from your database.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button 
          onClick={findJewelryBusinesses} 
          disabled={loading}
          variant="outline"
        >
          {loading ? "Searching..." : "Find Jewelry Businesses"}
        </Button>
        
        {jewelryBusinesses.length > 0 && (
          <Button 
            onClick={removeJewelryBusinesses} 
            disabled={loading}
            variant="destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove All ({jewelryBusinesses.length})
          </Button>
        )}
      </div>

      {jewelryBusinesses.length > 0 && (
        <div className="mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                <strong>Warning:</strong> This will permanently remove {jewelryBusinesses.length} businesses and all their associated reviews and quotes.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Found Jewelry Businesses:</h3>
          <div className="space-y-4">
            {jewelryBusinesses.map((business) => (
              <div key={business.id} className="border rounded-lg p-4 bg-white">
                <h4 className="font-semibold text-lg">{business.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{business.description}</p>
                <p className="text-gray-500 text-sm">
                  {business.address}, {business.city}, {business.state} {business.zip_code}
                </p>
                {business.services && business.services.length > 0 && (
                  <p className="text-sm mt-2">
                    <strong>Services:</strong> {business.services.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JewelryCleanup;
