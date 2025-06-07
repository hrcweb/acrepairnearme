
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Star, TrendingUp, Users, Award, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const ListBusiness = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "List Your AC Repair Business | Join Florida's Top HVAC Directory";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'List your AC repair business in Florida\'s premier HVAC directory. Get more customers for commercial AC repair and heating services. Join 2,500+ verified contractors today!'
      );
    }

    // Add business listing structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "List Your AC Repair Business",
      "description": "Join Florida's premier AC repair and HVAC contractor directory",
      "url": window.location.href,
      "mainEntity": {
        "@type": "Service",
        "name": "Business Directory Listing",
        "provider": {
          "@type": "Organization",
          "name": "AC Repair Near Me Pro"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"List Your AC Repair Business"')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-blue-600 hover:underline">Back to Home</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
              Florida's #1 AC Repair & HVAC Business Directory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Grow Your AC Repair Business with 
              <span className="text-blue-600"> Qualified Leads</span>
            </h1>
            <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join over 2,500 successful AC repair contractors who've increased their revenue by an average of 40% 
              through our proven directory platform. Get connected with homeowners and businesses actively seeking AC repair near me and commercial HVAC services.
            </h2>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-gray-600">Monthly Searches for AC Repair</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2,500+</div>
                <div className="text-gray-600">Verified AC Contractors</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">24 Hours</div>
                <div className="text-gray-600">Average Time to First Lead</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                View Pricing Plans Below
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                See AC Contractor Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Pricing Section */}
        <PricingSection />

        {/* Benefits Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why List Your AC Repair Business?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">More Visibility for AC Repair</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get found by customers actively searching for AC repair near me. Our platform receives over 50,000 monthly searches from homeowners and businesses in need of AC repair and commercial HVAC services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Verified AC Contractor Badge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Build trust with a verified business badge after our comprehensive review process. We verify licenses, insurance, and business credentials for all AC repair and HVAC contractors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Star className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle className="text-lg">Customer Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Collect and showcase authentic customer reviews for your AC repair services. Our review system helps potential customers see your quality work and increases conversion rates for commercial and residential projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-8 h-8 bg-purple-600 mb-2 flex items-center justify-center">
                  $
                </Badge>
                <CardTitle className="text-lg">AC Repair Lead Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive direct quote requests from customers ready to hire AC repair contractors. Our platform connects you with pre-qualified leads seeking commercial heating and air conditioning repair services.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works - Start Getting AC Repair Customers Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Choose Your AC Business Plan</h4>
              <p className="text-gray-600 mb-4">
                Select the subscription plan that best fits your AC repair business size and goals. Start with Basic for new contractors or choose Premium/Enterprise for established AC repair companies looking to dominate their market.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Takes:</strong> 2 minutes<br />
                <strong>Cost:</strong> Starting at $29/month
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Complete Payment & AC Business Setup</h4>
              <p className="text-gray-600 mb-4">
                Secure checkout process with no setup fees or hidden costs. After payment, you'll receive immediate access to create your detailed AC repair business listing with photos, services, and contact information.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Takes:</strong> 5-10 minutes<br />
                <strong>Includes:</strong> AC business profile setup
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Go Live & Get AC Repair Customers</h4>
              <p className="text-gray-600 mb-4">
                Your AC repair business listing goes live immediately and starts appearing in search results for "AC repair near me" and commercial HVAC searches. Begin receiving customer inquiries and quote requests within 24-48 hours.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Results:</strong> 24-48 hours<br />
                <strong>Average:</strong> 5-15 AC repair leads per month
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-600">Monthly AC Repair Searches</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">2.5x</div>
              <div className="text-sm text-gray-600">Average ROI</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-gray-600">Time to First Lead</div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Trusted by AC Repair Professionals Across Florida</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Licensed & Insured AC Contractors Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>24/7 Support Available</span>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800 font-medium mb-2">
              "Since joining AC Repair Near Me, we've increased our monthly revenue by 40% and receive 3-5 qualified leads per week for both residential and commercial AC repair projects. The platform pays for itself!"
            </p>
            <p className="text-blue-600 text-sm">
              - Mike Rodriguez, Cool Air Solutions, Tampa
            </p>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6">
            Join Florida's Premier AC Repair & Commercial HVAC Directory
          </h3>
          <div className="max-w-4xl mx-auto text-gray-700">
            <p className="mb-4">
              List your AC repair business in Florida's most comprehensive directory for heating and air conditioning contractors. Our platform specializes in connecting qualified AC repair professionals with customers actively searching for "AC repair near me" and commercial HVAC services.
            </p>
            <p className="mb-4">
              Whether you specialize in residential AC repair, commercial heating and air conditioning repair near me, or emergency HVAC services, our directory helps you reach more customers and grow your business. Join thousands of verified contractors who have successfully expanded their customer base through our platform.
            </p>
            <p>
              Don't miss out on the opportunity to connect with customers who need AC repair services. List your business today and start receiving qualified leads from homeowners and businesses looking for reliable, professional HVAC contractors in their area.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListBusiness;
