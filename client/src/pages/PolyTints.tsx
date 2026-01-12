import React, { useState } from 'react';
import { redirectToCheckout } from "@/lib/stripe";
import { useLocation } from 'wouter';
import polytintsData from '../polytints.json';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShoppingCart } from "lucide-react";

const PolyTints = () => {
  
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = async () => {
    if (!selectedColor) return;
    
    const product = polytintsData.find(p => p.name === selectedColor);
    if (product) {
      await redirectToCheckout([{
        name: `Best Choice Poly Tint - ${product.name}`,
        amount: 3200, // $32.00 in cents
        quantity: quantity,
        images: [window.location.origin + "/images/products/polytints.png"]
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen bg-neutral-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Section */}
              <div className="space-y-6">
                <div className="aspect-w-1 aspect-h-1 bg-neutral-800 rounded-2xl overflow-hidden flex items-center justify-center">
                   <img 
                    src="/images/products/polytints.png" 
                    alt="Best Choice Poly Tints"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x600/262626/white?text=Poly+Tints";
                    }}
                  />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">Best Choice Poly Tints</h1>
                  <p className="text-xl text-neutral-400">Custom Color Polyurea Pigment Packs (1 Pt)</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-4">$32.00</p>
                </div>

                <div className="prose prose-invert">
                  <p>
                    Best Choice Poly Tints are specially tinted color packs designed to be added to 
                    Instant Patch, Polygrout, and 860JF neutral bases to achieve a wide range of 
                    available colors quickly.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 text-neutral-300">
                    <li>Chemical Resistant</li>
                    <li>Solvent Free</li>
                    <li>Seamless – High Build Coating</li>
                    <li>Hard Wearing & Abrasion Resistant</li>
                    <li>Excellent Adhesion Properties</li>
                  </ul>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Select Color</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {polytintsData.map((tint) => (
                      <button
                        key={tint.name}
                        onClick={() => setSelectedColor(tint.name)}
                        className={`
                          px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2
                          ${selectedColor === tint.name 
                            ? 'bg-emerald-600 border-emerald-400 text-white' 
                            : 'bg-neutral-800 border-transparent text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600'}
                        `}
                      >
                        {tint.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="pt-6 border-t border-neutral-800">
                  {selectedColor ? (
                    <Button
                      className="w-full py-6 text-lg font-bold uppercase tracking-wide bg-emerald-600 hover:bg-emerald-500"
                      onClick={handleBuyNow}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full py-6 text-lg font-bold uppercase tracking-wide bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Select a Color
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolyTints;
