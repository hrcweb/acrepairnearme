
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
      description: "Perfect for small AC repair businesses",
      features: [
        "Business listing with contact info",
        "Basic profile customization",
        "Customer reviews display",
        "Email support",
        "Mobile-friendly listing"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: 79,
      description: "Most popular for growing businesses",
      features: [
        "Everything in Basic",
        "Featured placement in search",
        "Photo gallery (up to 10 images)",
        "Service area mapping",
        "Priority customer support",
        "Monthly performance analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: 149,
      description: "For established AC companies",
      features: [
        "Everything in Premium",
        "Top search placement",
        "Unlimited photo gallery",
        "Multiple service locations",
        "24/7 priority support",
        "Advanced analytics & insights",
        "Lead generation tools"
      ],
      popular: false
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
            Join thousands of successful AC contractors already growing their business.
          </p>
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
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <SubscriptionButton 
                    tier={plan.name as "Basic" | "Premium" | "Enterprise"}
                    price={plan.price}
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  >
                    {isCurrentPlan ? 'Current Plan' : `Get ${plan.name}`}
                  </SubscriptionButton>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            No setup fees • Cancel anytime • Instant activation
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
