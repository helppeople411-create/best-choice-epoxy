import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import chips from "@/chips.json";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Download } from "lucide-react";
import { useState } from "react";
import { redirectToCheckout } from "@/lib/stripe";

export default function DecorativeChip() {
  const [selectedChip, setSelectedChip] = useState(chips[0]);

  const handleBuyNow = async () => {
    await redirectToCheckout([{
      name: `Best Choice Decorative Chip - ${selectedChip.name}`,
      amount: 11000, // $110.00 in cents
      quantity: 1,
      images: [window.location.origin + selectedChip.image]
    }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-accent text-accent-foreground py-20 border-b-8 border-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/products/decorative-chip.png')] bg-cover bg-center"></div>
          <div className="container relative z-10">
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6">Decorative Chip</h1>
            <h2 className="text-2xl font-mono text-primary mb-8">Floor Coating Chipflakes</h2>
            <p className="text-xl text-white font-mono max-w-3xl leading-relaxed">
              Best Choice Decorative Chip flakes are vinyl paint chipflakes, composed of water-based resin materials 
              and contain high-quality additives and color pigments. Designed for use in commercial, industrial, 
              and residential flooring applications.
            </p>
          </div>
        </div>

        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Chip Selector */}
            <div className="lg:col-span-7">
              <h3 className="text-3xl font-display font-bold uppercase mb-8 border-l-4 border-primary pl-4">
                Available Colors & Blends
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {chips.map((chip) => (
                  <div 
                    key={chip.name}
                    className={`group cursor-pointer transition-all duration-300 ${
                      selectedChip.name === chip.name ? 'scale-105' : 'hover:scale-105'
                    }`}
                    onClick={() => setSelectedChip(chip)}
                  >
                    <div className={`aspect-square overflow-hidden border-4 ${
                      selectedChip.name === chip.name ? 'border-primary shadow-xl' : 'border-border group-hover:border-primary/50'
                    }`}>
                      <img 
                        src={chip.image} 
                        alt={chip.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className={`mt-3 text-center font-mono font-bold uppercase text-sm ${
                      selectedChip.name === chip.name ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {chip.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-4">Features & Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Colorfast, UV Stable Pigments",
                      "Random Shapes Hide Imperfections",
                      "Economical Flooring Solution",
                      "Highly Customizable",
                      "Easy to Use & Maintain",
                      "Hides Dirt and Debris",
                      "Improves Traction",
                      "Create Terrazzo Appearance"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center font-mono text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold uppercase mb-4">Recommended Uses</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Garages", "Basements", "Commercial Kitchens", "Retail Spaces", 
                      "Hospitals", "Schools", "Auto Dealerships", "Restrooms"
                    ].map((use, idx) => (
                      <span key={idx} className="bg-muted/20 border border-border px-3 py-1 text-xs font-mono uppercase">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Selected Chip Detail & Purchase */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-card border-2 border-border p-8 shadow-2xl">
                <div className="aspect-video w-full overflow-hidden border-2 border-border mb-6 relative">
                  <img 
                    src={selectedChip.image} 
                    alt={selectedChip.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-background/90 px-4 py-2 border-t-2 border-r-2 border-primary">
                    <span className="font-display font-bold uppercase text-xl">{selectedChip.name}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono font-bold uppercase text-sm text-muted-foreground mb-2">Selected Color</h4>
                    <div className="text-3xl font-display font-bold uppercase">{selectedChip.name}</div>
                  </div>

                  <div className="border-t border-border border-dashed pt-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-mono font-bold uppercase text-sm text-muted-foreground">Price (40lb Box)</span>
                      <span className="text-4xl font-mono font-bold text-primary">$110.00</span>
                    </div>
                    
                  </div>

                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase h-14 text-lg"
                      onClick={handleBuyNow}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                    </Button>
                    <Button size="lg" variant="outline" className="w-full rounded-none border-2 border-border hover:border-primary hover:text-primary font-display font-bold uppercase h-14">
                      <Download className="mr-2 h-5 w-5" /> Download Color Chart
                    </Button>
                  </div>

                  <div className="bg-muted/10 p-4 border border-border mt-6">
                    <h5 className="font-bold uppercase text-xs mb-2 flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" /> In Stock
                    </h5>
                    <p className="text-xs text-muted-foreground font-mono">
                      Ships within 24 hours. Bulk discounts available for orders over 500lbs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
