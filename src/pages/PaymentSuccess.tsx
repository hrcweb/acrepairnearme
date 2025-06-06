
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get("tier");
  const type = searchParams.get("type");
  const adType = searchParams.get("ad_type");
  const { checkSubscription } = useAuth();

  useEffect(() => {
    // Check subscription status after successful payment
    const timer = setTimeout(() => {
      checkSubscription();
    }, 2000);

    return () => clearTimeout(timer);
  }, [checkSubscription]);

  const getSuccessMessage = () => {
    if (type === "advertisement") {
      const adTypeName = adType === "banner" ? "Banner Advertisement" : "Sponsored Listing";
      return {
        title: "Advertisement Purchase Successful!",
        message: `Your ${adTypeName} is now active and will run for 30 days.`,
      };
    }
    return {
      title: "Payment Successful!",
      message: `Thank you for your subscription! Your ${tier || 'business'} listing is now active.`,
    };
  };

  const { title, message } = getSuccessMessage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{message}</p>
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your receipt and details.
          </p>
          <div className="space-y-2 pt-4">
            <Button asChild className="w-full">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
