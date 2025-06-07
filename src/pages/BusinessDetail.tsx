import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import BusinessLocation from "@/components/BusinessLocation";
import StaticBusinessHeader from "@/components/business-detail/StaticBusinessHeader";
import ClaimListingBanner from "@/components/business-detail/ClaimListingBanner";
import ServicesSection from "@/components/business-detail/ServicesSection";
import AboutSection from "@/components/business-detail/AboutSection";
import StaticContactCard from "@/components/business-detail/StaticContactCard";
import GallerySection from "@/components/business-detail/GallerySection";
import { useState } from "react";

// Mock data - in a real app this would come from an API
const businessData = {
  1: {
    id: 1,
    name: "Cool Breeze AC Repair",
    rating: 4.8,
    reviewCount: 127,
    phone: "(305) 555-0123",
    address: "123 Ocean Drive, Miami, FL 33139",
    services: ["AC Repair", "Installation", "Maintenance", "Emergency Service"],
    description: "Professional AC repair and installation services in Miami. 24/7 emergency service available with certified technicians.",
    longDescription: "Cool Breeze AC Repair has been serving the Miami area for over 15 years. Our certified technicians provide comprehensive HVAC services including repair, installation, and maintenance. We pride ourselves on quick response times and quality workmanship.",
    image: "/placeholder.svg",
    sponsored: true,
    verified: true,
    hours: "Mon-Sun: 24/7",
    website: "www.coolbreezeac.com",
    email: "info@coolbreezeac.com",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { id: 1, name: "John D.", rating: 5, comment: "Excellent service! Fixed my AC in no time.", date: "2024-05-15" },
      { id: 2, name: "Sarah M.", rating: 5, comment: "Professional and reliable. Highly recommend!", date: "2024-05-10" },
      { id: 3, name: "Mike R.", rating: 4, comment: "Good service, fair pricing.", date: "2024-05-05" }
    ]
  },
  2: {
    id: 2,
    name: "Florida Comfort Solutions",
    rating: 4.6,
    reviewCount: 89,
    phone: "(407) 555-0456",
    address: "456 Colonial Dr, Orlando, FL 32804",
    services: ["HVAC Repair", "Duct Cleaning", "Energy Audits", "System Replacement"],
    description: "Comprehensive HVAC services for Central Florida. Licensed and insured professionals.",
    longDescription: "Florida Comfort Solutions specializes in complete HVAC services throughout Central Florida. Our team of licensed professionals offers everything from routine maintenance to complete system replacements.",
    image: "/placeholder.svg",
    sponsored: false,
    verified: true,
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    website: "www.floridacomfort.com",
    email: "service@floridacomfort.com",
    gallery: ["/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { id: 1, name: "Lisa K.", rating: 5, comment: "Great energy audit service!", date: "2024-05-12" },
      { id: 2, name: "Tom B.", rating: 4, comment: "Fixed our ductwork efficiently.", date: "2024-05-08" }
    ]
  },
  3: {
    id: 3,
    name: "Sunshine AC & Heating",
    rating: 4.9,
    reviewCount: 203,
    phone: "(813) 555-0789",
    address: "789 Tampa Bay Blvd, Tampa, FL 33607",
    services: ["AC Repair", "Heat Pump Service", "Indoor Air Quality", "Preventive Maintenance"],
    description: "Award-winning AC repair service in Tampa Bay area. Family-owned since 1985.",
    longDescription: "Sunshine AC & Heating is a family-owned business that has been serving the Tampa Bay area since 1985. We specialize in residential and commercial HVAC services with a focus on customer satisfaction and quality workmanship.",
    image: "/placeholder.svg",
    sponsored: true,
    verified: true,
    hours: "Mon-Fri: 7AM-7PM, Emergency 24/7",
    website: "www.sunshineac.com",
    email: "contact@sunshineac.com",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { id: 1, name: "Robert L.", rating: 5, comment: "Amazing service for 20+ years!", date: "2024-05-18" },
      { id: 2, name: "Jennifer P.", rating: 5, comment: "Best AC company in Tampa!", date: "2024-05-14" },
      { id: 3, name: "David W.", rating: 5, comment: "Professional and honest pricing.", date: "2024-05-11" }
    ]
  }
};

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const business = businessData[Number(id) as keyof typeof businessData];
  const [reviewsRefreshTrigger, setReviewsRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    setReviewsRefreshTrigger(prev => prev + 1);
  };

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
            <StaticBusinessHeader business={business} />
            <ClaimListingBanner />
            <ServicesSection services={business.services} />
            <AboutSection 
              businessName={business.name}
              description={business.longDescription}
              licenseNumber={null}
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
                  businessPhone={business.phone}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StaticContactCard 
              phone={business.phone}
              address={business.address}
              hours={business.hours}
              website={business.website}
              email={business.email}
            />
            <BusinessLocation 
              address={business.address}
              hours={business.hours}
            />
            <GallerySection 
              gallery={business.gallery}
              businessName={business.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
