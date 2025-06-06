
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdvertisementButtonProps {
  adType: "banner" | "sponsored";
  price: number;
  children: React.ReactNode;
  className?: string;
}

const AdvertisementButton = ({ adType, price, children, className }: AdvertisementButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const handleAdvertisement = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase advertisements.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-ad-checkout', {
        body: { adType },
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating advertisement checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAdvertisement} 
      disabled={loading}
      className={className}
    >
      {loading ? "Processing..." : children}
    </Button>
  );
};

export default AdvertisementButton;
