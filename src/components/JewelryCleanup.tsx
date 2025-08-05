
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, AlertTriangle } from 'lucide-react';

const JewelryCleanup = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [specificBusinesses, setSpecificBusinesses] = useState<any[]>([]);

  const specificJewelryNames = [
    'Boston Fine Jewelry Appraisers',
    'Heritage Jewelry Appraisals',
    'White Mountain Valuations',
    'Constitution State Valuations',
    'Pine Tree Jewelry Experts',
    'Ocean State Appraisals',
    'Gold Coast Appraisal Group',
    'Newport Jewelry Specialists',
    'Cambridge Gemological Institute',
    'Mystic River Appraisals',
    'Bay State Jewelry Evaluations',
    'Green Mountain Gemology',
    'Yale City Gemologists',
    'Coastal Appraisal Services',
    'Granite State Gemology'
  ];

  const findSpecificBusinesses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .in('name', specificJewelryNames);

      if (error) throw error;

      setSpecificBusinesses(data || []);
      
      if (data && data.length > 0) {
        toast({
          title: `Found ${data.length} specific jewelry businesses`,
          description: "Review them below before removing",
        });
      } else {
        toast({
          title: "No specified jewelry businesses found",
          description: "These businesses may have already been removed or don't exist",
        });
      }
    } catch (error) {
      toast({
        title: "Error searching for businesses",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeSpecificBusinesses = async () => {
    if (specificBusinesses.length === 0) {
      toast({
        title: "No businesses to remove",
        description: "Please search for businesses first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const businessIds = specificBusinesses.map(b => b.id);
      
      // Remove related reviews first
      const { error: reviewsError } = await supabase
        .from('reviews')
        .delete()
        .in('business_id', businessIds);

      if (reviewsError) throw reviewsError;

      // Remove related quotes
      const { error: quotesError } = await supabase
        .from('quotes')
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
        title: "Specific jewelry businesses removed successfully",
        description: `Removed ${specificBusinesses.length} specified jewelry businesses and their associated data`,
      });

      setSpecificBusinesses([]);
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

  const findAllJewelryBusinesses = async () => {
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
          name.ilike.%appraisal%,
          name.ilike.%gemolog%,
          description.ilike.%jewelry%,
          description.ilike.%jeweler%,
          description.ilike.%diamond%,
          description.ilike.%ring%,
          description.ilike.%necklace%,
          description.ilike.%bracelet%,
          description.ilike.%watch%,
          description.ilike.%gold%,
          description.ilike.%appraisal%,
          description.ilike.%gemolog%,
          services.cs.{jewelry,jeweler,diamond,ring,necklace,bracelet,watch,gold,appraisal,gemology}
        `);

      if (error) throw error;

      setSpecificBusinesses(data || []);
      
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

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Remove Jewelry Businesses</h2>
        <p className="text-gray-600 mb-6">
          This tool will help you find and remove specific jewelry-related business listings from your database.
        </p>
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <Button 
          onClick={findSpecificBusinesses} 
          disabled={loading}
          variant="outline"
        >
          {loading ? "Searching..." : "Find Specific Businesses"}
        </Button>
        
        <Button 
          onClick={findAllJewelryBusinesses} 
          disabled={loading}
          variant="outline"
        >
          {loading ? "Searching..." : "Find All Jewelry Businesses"}
        </Button>
        
        {specificBusinesses.length > 0 && (
          <Button 
            onClick={removeSpecificBusinesses} 
            disabled={loading}
            variant="destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove All ({specificBusinesses.length})
          </Button>
        )}
      </div>

      {specificBusinesses.length > 0 && (
        <div className="mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                <strong>Warning:</strong> This will permanently remove {specificBusinesses.length} businesses and all their associated reviews and quotes.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Found Businesses:</h3>
          <div className="space-y-4">
            {specificBusinesses.map((business) => (
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

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Targeted Businesses:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {specificJewelryNames.map((name, index) => (
                <div key={index} className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JewelryCleanup;
