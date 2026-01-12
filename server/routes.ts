import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";
console.log("Stripe Key Prefix:", key.substring(0, 8));
const stripe = new Stripe(key, {
  apiVersion: "2025-01-27.acacia" as any,
});

export function registerRoutes(app: Express): Server {
  // ... existing routes ...

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: "No items in cart" });
      }

      const lineItems = items.map((item: any) => {
        if (item.priceId) {
          return {
            price: item.priceId,
            quantity: item.quantity,
          };
        } else {
          // Dynamic pricing for items without a pre-defined Stripe Price ID
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                // Only include images if they are absolute URLs (Stripe requires public URLs)
                images: item.images && item.images.length > 0 ? item.images : (item.image && item.image.startsWith("http") ? [item.image] : []),
              },
              // Use 'amount' if provided (already in cents), otherwise fallback to 'price' * 100
              unit_amount: Math.round(item.amount ? item.amount : (item.price || 0) * 100),
            },
            quantity: item.quantity,
          };
        }
      });

      console.log("Constructed lineItems:", JSON.stringify(lineItems, null, 2));
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        success_url: `${req.headers.origin || "http://localhost:3000"}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || "http://localhost:3000"}/cart`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Checkout Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
