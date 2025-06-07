
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import BusinessLocation from "@/components/BusinessLocation";
import BusinessHeader from "@/components/business-detail/BusinessHeader";
import ClaimListingBanner from "@/components/business-detail/ClaimListingBanner";
import ServicesSection from "@/components/business-detail/ServicesSection";
import AboutSection from "@/components/business-detail/AboutSection";
import ContactCard from "@/components/business-detail/ContactCard";
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
      const businessId = parseInt(id!, 10);
      if (isNaN(businessId)) {
        toast({
          title: "Error",
          description: "Invalid business ID",
          variant: "destructive",
        });
        setBusiness(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
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
            <BusinessHeader business={business} />
            <ClaimListingBanner />
            <ServicesSection services={business.services} />
            <AboutSection 
              businessName={business.name}
              description={business.description}
              licenseNumber={business.license_number}
            />

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
            <ContactCard 
              phone={business.phone}
              fullAddress={fullAddress}
              hours={hours}
              website={business.website}
              email={business.email}
            />
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
