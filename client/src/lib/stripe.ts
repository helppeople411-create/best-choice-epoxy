import { toast } from "sonner";

export interface CheckoutItem {
  priceId?: string;
  name?: string;
  amount?: number; // Amount in cents
  images?: string[];
  quantity: number;
}

export async function redirectToCheckout(items: CheckoutItem[]) {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create checkout session");
    }

    const { url } = await response.json();
    
    if (url) {
      window.location.href = url;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (error: any) {
    console.error("Checkout Error:", error);
    toast.error(`Checkout failed: ${error.message}`);
  }
}
