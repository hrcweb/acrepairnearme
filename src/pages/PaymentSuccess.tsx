
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get("tier");
  const type = searchParams.get("type");
  const adType = searchParams.get("ad_type");
  const { user, checkSubscription, signUp } = useAuth();
  const { toast } = useToast();
  
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If Enterprise tier, redirect to special page after a delay
    if (tier === "Enterprise" && user) {
      const timer = setTimeout(() => {
        window.location.href = `/enterprise-welcome?tier=Enterprise`;
      }, 3000);
      return () => clearTimeout(timer);
    }

    // If user is not logged in, show account creation form
    if (!user) {
      setShowAccountCreation(true);
    } else {
      // Check subscription status after successful payment
      const timer = setTimeout(() => {
        checkSubscription();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, checkSubscription, tier]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password, fullName);
      if (!error) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
        setShowAccountCreation(false);
      }
    } catch (error) {
      console.error("Account creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSuccessMessage = () => {
    if (type === "advertisement") {
      const adTypeName = adType === "banner" ? "Banner Advertisement" : "Sponsored Listing";
      return {
        title: "Advertisement Purchase Successful!",
        message: `Your ${adTypeName} is now active and will run for 30 days.`,
      };
    }
    
    if (tier === "Enterprise") {
      return {
        title: "Enterprise Subscription Activated!",
        message: "Welcome to our premium Enterprise tier! You'll be redirected to your exclusive Enterprise dashboard in a moment.",
      };
    }
    
    return {
      title: "Payment Successful!",
      message: `Thank you for your subscription! Your ${tier || 'business'} listing is now active.`,
    };
  };

  const { title, message } = getSuccessMessage();

  if (showAccountCreation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
            <p className="text-gray-600 mt-2">
              Create your account to manage your {tier ? 'subscription' : 'advertisement'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                  minLength={6}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/auth" className="text-blue-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          {tier === "Enterprise" && (
            <p className="text-sm text-blue-600 font-medium">
              Redirecting to your Enterprise dashboard...
            </p>
          )}
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with your receipt and details.
          </p>
          <div className="space-y-2 pt-4">
            {tier !== "Enterprise" && (
              <Button asChild className="w-full">
                <Link to="/">Return to Homepage</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
