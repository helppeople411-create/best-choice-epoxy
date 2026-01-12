import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingCart, Download, Info } from "lucide-react";
import metallicData from "../metallic.json"; // Using updated JSON with GHL IDs
import { redirectToCheckout } from "@/lib/stripe";
import { useLocation } from "wouter";

import { Minus, Plus } from "lucide-react";

export default function MetallicAdditive() {
  const [selectedColor, setSelectedColor] = useState(metallicData[0]);
  
  const [, setLocation] = useLocation();

  const handleBuyNow = async () => {
    // Use dynamic pricing to ensure correct product details are sent to Stripe
    await redirectToCheckout([{
      name: `Metallic Additive - ${selectedColor.name}`,
      amount: Math.round(selectedColor.price * 100), // Convert to cents
      images: [`${window.location.origin}${selectedColor.image}`],
      quantity: 1
    }]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/gallery/showroom-metallic.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1 text-sm font-mono tracking-wider uppercase bg-primary/10">
              Premium Pigments
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white uppercase font-display">
              Metallic <span className="text-primary">Additive</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Create stunning, three-dimensional floors with our exotic metallic pigments. 
              Engineered for seamless integration with Best Choice clear epoxies to deliver 
              a showroom-quality finish that is truly one-of-a-kind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
                onClick={handleBuyNow}
              >
                Buy Now - ${selectedColor.price.toFixed(2)}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold uppercase tracking-wide">
                <Download className="mr-2 h-4 w-4" /> Technical Data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Product Image & Details */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden sticky top-24">
              <CardContent className="p-0">
                <div className="aspect-square relative bg-white/5 p-8 flex items-center justify-center">
                  <img 
                    src={selectedColor.image} 
                    alt={`Best Choice Metallic Additive - ${selectedColor.name}`}
                    className="w-full h-full object-contain drop-shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 border-t border-border/50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedColor.name}</h2>
                      <p className="text-muted-foreground text-sm">SKU: BC-MET-{selectedColor.name.replace(/\s+/g, '-').toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">${selectedColor.price.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">per 32oz jar</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Container Size</span>
                      <span className="text-white font-medium">32 oz</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="text-white font-medium">Varies by application</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="text-green-400 font-medium flex items-center gap-1"><Check className="h-3 w-3" /> In Stock</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg uppercase tracking-wide"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Color Selection & Info */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Color Selector */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary block"></span>
                Select Color
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {metallicData.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedColor.name === color.name 
                        ? "border-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background scale-105 z-10" 
                        : "border-transparent hover:border-white/50 hover:scale-105"
                    }`}
                  >
                    <img 
                      src={color.image} 
                      alt={color.name}
                      className="w-full h-full object-cover bg-white"
                    />
                    <div className={`absolute inset-x-0 bottom-0 p-1 text-[10px] font-bold text-center truncate transition-colors ${
                      selectedColor.name === color.name 
                        ? "bg-primary text-white" 
                        : "bg-black/70 text-white group-hover:bg-black/90"
                    }`}>
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary block"></span>
                Features & Benefits
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Vibrant Three-Dimensional Look",
                  "Durable & Long-Lasting",
                  "Easy to Use & Mix",
                  "Trouble-free Cleaning",
                  "Works with All Epoxy Floor Coatings",
                  "UV Stable Options Available"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Uses */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary block"></span>
                Recommended Uses
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Restaurants & Bars", "Sports Arenas", "Showroom Floors", 
                  "Residential Homes", "Automotive Service Areas", "Hair Studios",
                  "Garages", "Aircraft Hangers", "Schools & Universities"
                ].map((use, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-muted text-white border-border/50">
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Application Note */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 flex gap-4">
              <Info className="h-6 w-6 text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="text-blue-400 font-bold mb-2">Pro Tip</h4>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  The finished appearance of the Metallic flooring system can vary from gradual, subtle changes in color to more distinctive and exciting effects. Each project is truly unique and colors can be combined to create a one-of-a-kind custom masterpiece. We recommend creating a mockup before full application.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
