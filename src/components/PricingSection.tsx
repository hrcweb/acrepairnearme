
import { Check, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingSectionProps {
  onGetStartedFree?: () => void;
}

const PricingSection = ({ onGetStartedFree }: PricingSectionProps) => {
  const plans = [
    {
      name: "Free Listing",
      price: "$0",
      period: "forever",
      description: "Get started with basic visibility",
      features: [
        "Basic business listing",
        "Contact information display",
        "Limited to 1 location",
        "Community support",
        "Standard search visibility"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      onClick: onGetStartedFree
    },
    {
      name: "Basic Plan",
      price: "$29",
      period: "month",
      description: "Enhanced visibility and features",
      features: [
        "Enhanced business listing",
        "Photo gallery (up to 10 photos)",
        "Customer reviews display",
        "Basic analytics",
        "Email support",
        "Service area mapping"
      ],
      buttonText: "Choose Basic",
      buttonVariant: "default" as const,
      popular: false
    },
    {
      name: "Premium Plan",
      price: "$79",
      period: "month",
      description: "Maximum visibility and growth",
      features: [
        "Featured listing placement",
        "Unlimited photos",
        "Priority in search results",
        "Advanced analytics",
        "Lead management tools",
        "Priority support",
        "Custom business hours",
        "Special offers posting"
      ],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "month",
      description: "Complete marketing solution",
      features: [
        "Top placement guarantee",
        "Dedicated account manager",
        "Custom business profile",
        "Advanced lead analytics",
        "API access",
        "White-label options",
        "Priority 24/7 support",
        "Marketing consultation",
        "Custom integrations"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get more customers with our proven directory listing plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={plan.onClick}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All plans include a 30-day money-back guarantee. No setup fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
