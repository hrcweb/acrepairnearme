
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ManageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const { user, session, subscribed } = useAuth();
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    if (!user || !subscribed) {
      toast({
        title: "No Active Subscription",
        description: "You need an active subscription to manage billing.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });

      if (error) throw error;

      // Redirect to Stripe customer portal
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error accessing customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to access billing portal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!subscribed) {
    return null;
  }

  return (
    <Button 
      variant="outline"
      onClick={handleManageSubscription} 
      disabled={loading}
    >
      {loading ? "Loading..." : "Manage Subscription"}
    </Button>
  );
};

export default ManageSubscriptionButton;
