import React, { useState } from 'react';
import { redirectToCheckout } from "@/lib/stripe";
import { useLocation } from 'wouter';
import slipResistantData from '../slipresistant.json';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShoppingCart } from "lucide-react";

const SlipResistant = () => {
  
  const [, setLocation] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(slipResistantData[0]);

  const handleBuyNow = async () => {
    if (!selectedProduct) return;
    
    await redirectToCheckout([{
      name: `Best Choice Slip Resistant Additive - ${selectedProduct.name}`,
      amount: Math.round(selectedProduct.price * 100), // Convert to cents
      quantity: 1,
      images: [window.location.origin + selectedProduct.image]
    }]);
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
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x600/262626/white?text=Slip+Resistant+Additive";
                    }}
                  />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">Best Choice Slip Resistant Additive</h1>
                  <p className="text-xl text-neutral-400">Available in 50TEX and 30TEX</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-4">${selectedProduct.price.toFixed(2)}</p>
                </div>

                <div className="prose prose-invert">
                  <p>
                    Best Choice Slip Resistant Additive is a stir-in additive available in two sizes, 
                    30TEX and 50TEX, that provides a slip-resistant texture to Best Choice floor coatings.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 text-neutral-300">
                    <li>Add to paints, stains or sealers</li>
                    <li>Add to latex-based, oil-based and epoxy coatings</li>
                    <li>Easy surface cleaning</li>
                    <li>Spherical-shaped particles provide a smoother feel to touch</li>
                    <li>Does not increase material viscosity</li>
                    <li>Stays suspended in coatings</li>
                  </ul>
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Select Size</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {slipResistantData.map((product) => (
                      <button
                        key={product.name}
                        onClick={() => setSelectedProduct(product)}
                        className={`
                          px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2
                          ${selectedProduct.name === product.name 
                            ? 'bg-emerald-600 border-emerald-400 text-white' 
                            : 'bg-neutral-800 border-transparent text-neutral-300 hover:bg-neutral-700 hover:border-neutral-600'}
                        `}
                      >
                        <div className="font-bold">{product.name.split(' ')[0]}</div>
                        <div className="text-xs opacity-80">{product.description.split('(')[1].replace(')', '')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="pt-6 border-t border-neutral-800">
                  <Button
                    className="w-full py-6 text-lg font-bold uppercase tracking-wide bg-emerald-600 hover:bg-emerald-500"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
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

export default SlipResistant;
