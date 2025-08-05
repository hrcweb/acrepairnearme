
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
import { quoteValidationSchema, sanitizeHtml, rateLimiter } from '@/utils/security';
import { z } from 'zod';

type QuoteFormData = z.infer<typeof quoteValidationSchema>;

interface SecureQuoteRequestFormProps {
  businessId: number;
  businessName: string;
}

const SecureQuoteRequestFormReplacement: React.FC<SecureQuoteRequestFormProps> = ({ 
  businessId, 
  businessName 
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteValidationSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    // Rate limiting check
    const rateLimitKey = `quote_request_${businessId}`;
    if (!rateLimiter.isAllowed(rateLimitKey, 3, 3600000)) { // 3 requests per hour
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another quote request",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize HTML content
      const sanitizedData = {
        business_id: businessId,
        name: sanitizeHtml(data.name),
        email: data.email,
        phone: data.phone,
        service: sanitizeHtml(data.service),
        message: sanitizeHtml(data.message),
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('quotes')
        .insert(sanitizedData);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Your quote request has been sent to ${businessName}`,
      });

      reset();
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>
          Get a personalized quote from {businessName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Smith"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              maxLength={100}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
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
            <Label htmlFor="service">Service Needed *</Label>
            <Input
              id="service"
              {...register('service')}
              placeholder="AC Repair, Installation, etc."
              maxLength={100}
            />
            {errors.service && (
              <p className="text-sm text-red-600">{errors.service.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Please describe your AC issue or service needs..."
              maxLength={1000}
              rows={4}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Quote Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureQuoteRequestFormReplacement;
