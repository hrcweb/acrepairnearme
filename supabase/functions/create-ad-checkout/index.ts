
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    const { adType } = await req.json();

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
      } catch (error) {
        console.log("Authentication failed, proceeding as guest");
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check for existing customer only if we have a real email
    let customerId;
    if (email !== "guest@example.com") {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    const adPrices = {
      banner: { amount: 19900, name: "Banner Advertisement - 30 Days" }, // $199
      sponsored: { amount: 9900, name: "Sponsored Listing - 30 Days" } // $99
    };

    const selectedAd = adPrices[adType as keyof typeof adPrices];
    if (!selectedAd) throw new Error("Invalid ad type");

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selectedAd.name },
            unit_amount: selectedAd.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?type=advertisement&ad_type=${adType}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        ad_type: adType,
        user_id: user?.id || "guest",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
