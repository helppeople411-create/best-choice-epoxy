import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-display font-bold uppercase mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-muted">
            <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
            <Link href="/products">
              <Button size="lg" className="font-display font-bold uppercase">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.variant}`} className="rounded-none border-l-4 border-l-primary">
                  <CardContent className="p-6 flex gap-6 items-center">
                    <div className="h-24 w-24 bg-muted flex-shrink-0 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-muted-foreground">Color: {item.variant}</p>
                      )}
                      <p className="font-mono font-bold text-primary mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-input">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id, item.variant)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="rounded-none border-t-4 border-t-primary sticky top-24">
                <CardHeader>
                  <CardTitle className="font-display font-bold uppercase">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-mono font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-mono text-muted-foreground">Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-mono font-bold text-2xl text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-6 font-display font-bold uppercase h-12 text-lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
