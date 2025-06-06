
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionButtonProps {
  tier: "Basic" | "Premium" | "Enterprise";
  price: number;
  children: React.ReactNode;
  className?: string;
}

const SubscriptionButton = ({ tier, price, children, className }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { user, session, subscriptionTier } = useAuth();
  const { toast } = useToast();

  const isCurrentPlan = subscriptionTier === tier;

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier },
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isCurrentPlan) {
    return (
      <Button variant="outline" className={className} disabled>
        Current Plan
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleSubscribe} 
      disabled={loading}
      className={className}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default SubscriptionButton;
