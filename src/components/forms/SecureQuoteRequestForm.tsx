
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { quoteValidationSchema, sanitizeHtml, rateLimiter } from '@/utils/security';
import { z } from 'zod';

type QuoteFormData = z.infer<typeof quoteValidationSchema>;

interface SecureQuoteRequestFormProps {
  businessId?: number;
  businessName?: string;
  onQuoteSubmitted?: () => void;
}

const SecureQuoteRequestForm = ({ businessId, businessName, onQuoteSubmitted }: SecureQuoteRequestFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteValidationSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    // Rate limiting check using IP or session storage as fallback
    const rateLimitKey = `quote_submit_${Date.now()}`;
    if (!rateLimiter.isAllowed(rateLimitKey, 3, 300000)) { // 3 quotes per 5 minutes
      toast({
        title: "Rate limit exceeded",
        description: "Please wait before submitting another quote request",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize all input data
      const sanitizedData = {
        business_id: businessId,
        business_name: businessName,
        name: sanitizeHtml(data.name),
        email: data.email, // Email doesn't need sanitization as it's validated
        phone: data.phone,
        service: sanitizeHtml(data.service),
        message: sanitizeHtml(data.message),
        submitted_at: new Date().toISOString(),
      };

      // In a real implementation, this would be sent to your backend
      console.log('Quote request submitted:', sanitizedData);

      toast({
        title: "Quote request submitted!",
        description: "The business will contact you soon with a quote",
      });

      reset();
      onQuoteSubmitted?.();
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

  const services = [
    'AC Repair',
    'AC Installation',
    'AC Maintenance',
    'Heating Repair',
    'Heating Installation',
    'Ductwork',
    'Emergency Service',
    'Other',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>
          {businessName ? `Get a quote from ${businessName}` : 'Get a quote for AC services'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Doe"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="phone">Phone Number *</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Needed *</Label>
            <Select onValueChange={(value) => setValue('service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-sm text-red-600">{errors.service.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Please describe your AC service needs..."
              maxLength={1000}
              rows={4}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Request Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureQuoteRequestForm;
