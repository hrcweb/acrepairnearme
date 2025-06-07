
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SubscriptionButton from "./SubscriptionButton";
import { useAuth } from "@/contexts/AuthContext";

const PricingSection = () => {
  const { subscriptionTier } = useAuth();

  const plans = [
    {
      name: "Basic",
      price: 29,
      description: "Perfect for small AC repair businesses getting started",
      tagline: "Great for new businesses",
      features: [
        "Complete business listing with contact information",
        "Basic profile customization with company logo",
        "Customer reviews display and management",
        "Mobile-friendly listing optimized for local searches",
        "Email support during business hours",
        "Service area coverage up to 25 miles",
        "Basic analytics dashboard"
      ],
      popular: false,
      savings: "Save $120/year vs competitors"
    },
    {
      name: "Premium",
      price: 79,
      description: "Most popular choice for growing AC businesses",
      tagline: "Best value for established businesses",
      features: [
        "Everything included in Basic plan",
        "Featured placement in search results (3x visibility)",
        "Professional photo gallery (up to 10 high-res images)",
        "Interactive service area mapping",
        "Priority customer support (phone & email)",
        "Monthly performance analytics and lead reports",
        "Social media integration (Facebook, Google)",
        "Emergency service badge and priority listing",
        "Customer quote request notifications"
      ],
      popular: true,
      savings: "Most contractors see 5-10 leads/month"
    },
    {
      name: "Enterprise",
      price: 149,
      description: "For established AC companies dominating their market",
      tagline: "Maximum exposure and leads",
      features: [
        "Everything included in Premium plan",
        "Top search placement across all searches",
        "Unlimited professional photo gallery",
        "Multiple service locations support",
        "24/7 priority support with dedicated account manager",
        "Advanced analytics, competitor insights & ROI tracking",
        "Professional lead generation tools and CRM integration",
        "Custom branding and promotional banners",
        "Featured in emergency service directory",
        "Monthly strategy consultation calls"
      ],
      popular: false,
      savings: "Average 15-25 leads/month"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Business Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get more customers with our proven directory platform. 
            Join over 2,500 successful AC contractors already growing their business with our platform.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            All plans include instant activation • No setup fees • 30-day money-back guarantee
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrentPlan = subscriptionTier === plan.name;
            
            return (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''} ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                {isCurrentPlan && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Your Plan
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-sm text-blue-600 font-medium">{plan.tagline}</div>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium mt-1">
                    {plan.savings}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <SubscriptionButton 
                    tier={plan.name as "Basic" | "Premium" | "Enterprise"}
                    price={plan.price}
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  >
                    {isCurrentPlan ? 'Current Plan' : `Start ${plan.name} Plan`}
                  </SubscriptionButton>
                  
                  {!isCurrentPlan && (
                    <div className="text-center mt-3">
                      <div className="text-xs text-gray-500">
                        Cancel anytime • Instant activation
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">All Plans Include:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>✓ Instant listing activation</div>
              <div>✓ Mobile-optimized pages</div>
              <div>✓ Customer review management</div>
              <div>✓ Lead tracking dashboard</div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white rounded-lg max-w-xl mx-auto shadow-sm">
            <p className="text-gray-600 mb-2 font-medium">
              Questions about which plan is right for you?
            </p>
            <p className="text-sm text-gray-500">
              Call us at 561-206-2624 or email support@acrepairnearme.pro for personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
