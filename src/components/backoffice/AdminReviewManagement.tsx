
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, XCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  business_id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
  verified: boolean;
  businesses?: {
    name: string;
  };
}

const AdminReviewManagement = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          businesses (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVerification = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ verified: !currentStatus })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Review ${!currentStatus ? 'verified' : 'unverified'} successfully`,
      });
      
      loadReviews(); // Reload reviews
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error",
        description: "Failed to update review",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === "verified") return review.verified;
    if (filter === "unverified") return !review.verified;
    return true;
  });

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          onClick={() => setFilter("all")}
          className="px-4"
        >
          All Reviews ({reviews.length})
        </Button>
        <Button
          variant={filter === "verified" ? "default" : "ghost"}
          onClick={() => setFilter("verified")}
          className="px-4"
        >
          Verified ({reviews.filter(r => r.verified).length})
        </Button>
        <Button
          variant={filter === "unverified" ? "default" : "ghost"}
          onClick={() => setFilter("unverified")}
          className="px-4"
        >
          Unverified ({reviews.filter(r => !r.verified).length})
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{review.businesses?.name}</CardTitle>
                  <p className="text-sm text-gray-600">by {review.customer_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {review.verified ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600">
                      <XCircle className="h-3 w-3 mr-1" />
                      Unverified
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => toggleVerification(review.id, review.verified)}
                  variant={review.verified ? "outline" : "default"}
                  size="sm"
                >
                  {review.verified ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Unverify
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/business/${review.business_id}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4 mr-2" />
                    View Business
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviewManagement;
