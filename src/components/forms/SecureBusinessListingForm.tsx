
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
import { businessValidationSchema, sanitizeHtml } from '@/utils/security';
import { enhancedRateLimiter, strictSanitizeHtml } from '@/utils/securityEnhancements';
import { BusinessSecurityService, AuthSecurityService } from '@/utils/enhancedSecurity';
import { z } from 'zod';

type BusinessFormData = z.infer<typeof businessValidationSchema>;

const SecureBusinessListingForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessValidationSchema),
  });

  const onSubmit = async (data: BusinessFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a business listing",
        variant: "destructive",
      });
      return;
    }

    // Enhanced rate limiting check
    const rateLimitKey = `business_submit_${user.id}`;
    if (!enhancedRateLimiter.isAllowed(rateLimitKey, 2, 300000, 'fixed')) { // 2 submissions per 5 minutes
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another business listing",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Check for duplicate business
      const isDuplicate = await BusinessSecurityService.checkDuplicateBusiness(
        data.name,
        data.address,
        user.id
      );

      if (isDuplicate) {
        toast({
          title: "Duplicate business detected",
          description: "You have already submitted a business with this name and address",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Enhanced sanitization
      const sanitizedData = {
        name: strictSanitizeHtml(data.name),
        description: data.description ? sanitizeHtml(data.description) : null,
        address: strictSanitizeHtml(data.address),
        city: strictSanitizeHtml(data.city),
        state: data.state.toUpperCase(),
        zip_code: data.zip_code,
        phone: data.phone || null,
        email: data.email || null,
        website: data.website || null,
        license_number: data.license_number || null,
        services: data.services || null,
        user_id: user.id,
      };

      const { error } = await supabase
        .from('businesses')
        .insert(sanitizedData);

      if (error) throw error;

      // Log security event
      await AuthSecurityService.logSecurityEvent(
        user.id,
        'business_listing_created',
        { business_name: sanitizedData.name }
      );

      toast({
        title: "Success!",
        description: "Your business listing has been submitted for review",
      });

      reset();
    } catch (error) {
      console.error('Error submitting business:', error);
      
      // Log security event for failed submission
      await AuthSecurityService.logSecurityEvent(
        user.id,
        'business_listing_failed',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      );
      
      toast({
        title: "Error",
        description: "Failed to submit business listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Your Business</CardTitle>
        <CardDescription>
          Submit your AC repair business for listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="ABC Air Conditioning"
              maxLength={100}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Brief description of your services..."
              maxLength={1000}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="123 Main St"
                maxLength={200}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Phoenix"
                maxLength={50}
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="AZ"
                maxLength={2}
                style={{ textTransform: 'uppercase' }}
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip_code">ZIP Code *</Label>
              <Input
                id="zip_code"
                {...register('zip_code')}
                placeholder="85001"
                maxLength={10}
              />
              {errors.zip_code && (
                <p className="text-sm text-red-600">{errors.zip_code.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="(555) 555-5555"
                maxLength={14}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="contact@yourcompany.com"
                maxLength={100}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...register('website')}
              placeholder="https://yourcompany.com"
              maxLength={200}
            />
            {errors.website && (
              <p className="text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="license_number">License Number</Label>
            <Input
              id="license_number"
              {...register('license_number')}
              placeholder="AC123456"
              maxLength={50}
            />
            {errors.license_number && (
              <p className="text-sm text-red-600">{errors.license_number.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Business Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureBusinessListingForm;
