
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Star, CheckCircle, ExternalLink, Clock, Globe, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import BusinessLocation from "@/components/BusinessLocation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  insurance_verified: boolean;
  license_number: string | null;
  featured: boolean;
  business_hours: any;
}

const BusinessDetailDynamic = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewsRefreshTrigger, setReviewsRefreshTrigger] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Business not found",
          variant: "destructive",
        });
        setBusiness(null);
      } else {
        setBusiness(data);
      }
    } catch (error) {
      console.error('Error fetching business:', error);
      toast({
        title: "Error",
        description: "Failed to load business details",
        variant: "destructive",
      });
      setBusiness(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setReviewsRefreshTrigger(prev => prev + 1);
    // Refresh business data to update rating
    fetchBusiness();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading business details...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const fullAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip_code}`;
  const hours = business.business_hours || "Contact for hours";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to Directory</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AC Repair Near Me</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                      {business.insurance_verified && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {business.featured && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-medium ml-1">{business.rating}</span>
                        <span className="text-gray-600 ml-1">({business.review_count} reviews)</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{business.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Services */}
            {business.services && business.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {business.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-2">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {business.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {business.description || "Professional service provider in your area."}
                </p>
                {business.license_number && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>License #:</strong> {business.license_number}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs for Reviews and Quote */}
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
                <TabsTrigger value="quote">Get Quote</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-6">
                <ReviewForm 
                  businessId={business.id} 
                  onReviewSubmitted={handleReviewSubmitted}
                />
                <ReviewsList 
                  businessId={business.id}
                  refreshTrigger={reviewsRefreshTrigger}
                />
              </TabsContent>
              
              <TabsContent value="quote">
                <QuoteRequestForm 
                  businessName={business.name}
                  businessPhone={business.phone || ""}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{business.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{fullAddress}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{hours}</span>
                </div>
                {business.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <a href={business.website.startsWith('http') ? business.website : `https://${business.website}`} 
                       className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      {business.website}
                    </a>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                      {business.email}
                    </a>
                  </div>
                )}
                
                <div className="pt-4 space-y-2">
                  {business.phone && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={`tel:${business.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    Get Free Quote
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <BusinessLocation 
              address={fullAddress}
              hours={hours}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailDynamic;
