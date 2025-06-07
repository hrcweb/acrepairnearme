
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    const { tier } = await req.json();
    logStep("Received request", { tier });

    // Check if user is authenticated (optional for guest checkout)
    let user = null;
    let email = "guest@example.com"; // Default guest email
    
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
        if (user?.email) {
          email = user.email;
        }
        logStep("User authenticated", { userId: user?.id, email });
      } catch (error) {
        logStep("Authentication failed, proceeding as guest", { error: error.message });
      }
    } else {
      logStep("No auth header, proceeding as guest");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });
    
    // Check for existing customer only if we have a real email
    let customerId;
    if (email !== "guest@example.com") {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        logStep("No existing customer found");
      }
    }

    // Define pricing based on tier
    let priceAmount;
    let productName;
    switch (tier) {
      case "Basic":
        priceAmount = 2900; // $29.00
        productName = "Basic Business Listing";
        break;
      case "Premium":
        priceAmount = 7900; // $79.00
        productName = "Premium Business Listing";
        break;
      case "Enterprise":
        priceAmount = 14900; // $149.00
        productName = "Enterprise Business Listing";
        break;
      default:
        throw new Error("Invalid tier specified");
    }

    logStep("Creating checkout session", { tier, priceAmount, productName });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: priceAmount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/payment-success?tier=${tier}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        tier,
        user_id: user?.id || "guest",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
