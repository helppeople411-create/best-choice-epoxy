import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data for GHL
      const orderData = {
        contact: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zip,
          source: "Best Choice Website Checkout"
        },
        opportunity: {
          title: `Order: ${formData.firstName} ${formData.lastName}`,
          status: "open",
          value: total,
          stageId: "123456789" // Placeholder, GHL will assign default if invalid
        },
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant,
          ghlProductId: item.ghlProductId
        }))
      };

      // Send to backend API to create Stripe Checkout Session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            priceId: item.stripePriceId, // Ensure this field exists in your item data
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          metadata: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was a problem placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => setLocation("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-display font-bold uppercase mb-8 border-l-4 border-primary pl-4">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary block"></span>
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        required 
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        required 
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      required 
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        required 
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        required 
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input 
                        id="zip" 
                        name="zip" 
                        required 
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary block"></span>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md bg-muted/20 text-center">
                  <p className="text-muted-foreground">
                    Payment will be collected via invoice after order confirmation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                      <div className="h-16 w-16 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                        )}
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (Estimated)</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold text-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button 
                    className="w-full h-12 text-lg font-bold uppercase tracking-wide mt-4" 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
