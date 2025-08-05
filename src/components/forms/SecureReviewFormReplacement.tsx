
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { reviewValidationSchema, sanitizeHtml, rateLimiter } from '@/utils/security';
import { Star } from 'lucide-react';
import { z } from 'zod';

type ReviewFormData = z.infer<typeof reviewValidationSchema>;

interface SecureReviewFormProps {
  businessId: number;
  businessName: string;
  onReviewSubmitted?: () => void;
}

const SecureReviewFormReplacement: React.FC<SecureReviewFormProps> = ({ 
  businessId, 
  businessName,
  onReviewSubmitted 
}) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewValidationSchema),
  });

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to leave a review",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting check
    const rateLimitKey = `review_submit_${user.id}_${businessId}`;
    if (!rateLimiter.isAllowed(rateLimitKey, 1, 86400000)) { // 1 review per day per business
      toast({
        title: "Rate limit exceeded",
        description: "You can only submit one review per business per day",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize HTML content
      const sanitizedData = {
        business_id: businessId,
        user_id: user.id,
        rating: data.rating,
        customer_name: sanitizeHtml(data.customer_name),
        comment: sanitizeHtml(data.comment),
        verified: false,
      };

      const { error } = await supabase
        .from('reviews')
        .insert(sanitizedData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your review has been submitted and is pending approval",
      });

      reset();
      setRating(0);
      onReviewSubmitted?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        <CardDescription>
          Share your experience with {businessName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      value <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_name">Your Name *</Label>
            <Input
              id="customer_name"
              {...register('customer_name')}
              placeholder="John Smith"
              maxLength={50}
            />
            {errors.customer_name && (
              <p className="text-sm text-red-600">{errors.customer_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Review *</Label>
            <Textarea
              id="comment"
              {...register('comment')}
              placeholder="Tell others about your experience..."
              maxLength={500}
              rows={4}
            />
            {errors.comment && (
              <p className="text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading || !rating} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureReviewFormReplacement;
