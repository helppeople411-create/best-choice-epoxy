import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { redirectToCheckout } from "@/lib/stripe";
import { useLocation } from 'wouter';
import utintsData from '../utints.json';

const UTints = () => {
  
  const [, setLocation] = useLocation();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = async () => {
    if (!selectedColor) return;
    
    const product = utintsData.find(p => p.name === selectedColor);
    if (product) {
      await redirectToCheckout([{
        name: `Best Choice U-Tint - ${product.name}`,
        amount: 3200, // $32.00 in cents
        quantity: quantity,
        images: [window.location.origin + "/images/products/u-tints.png"]
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="aspect-w-1 aspect-h-1 bg-neutral-800 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                {/* Placeholder for U-Tint Image */}
                <span className="text-2xl">U-Tint Image</span>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Best Choice U-Tint</h1>
              <p className="text-xl text-neutral-400">Universal Pigment Packs (16oz)</p>
              <p className="text-3xl font-bold text-emerald-400 mt-4">$32.00</p>
            </div>

            <div className="prose prose-invert">
              <p>
                Best Choice U-Tint Universal Pigment Packs are high-performance, 100% solids, zero VOC 
                pigments designed to be easily mixed into Best Choice urethane and epoxy coatings.
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Select Color</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {utintsData.map((tint) => (
                  <button
                    key={tint.name}
                    onClick={() => setSelectedColor(tint.name)}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedColor === tint.name 
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}
                    `}
                  >
                    {tint.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="pt-6 border-t border-neutral-800">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-neutral-300">Quantity:</span>
                <div className="flex items-center bg-neutral-800 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {selectedColor ? (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                >
                  Buy Now
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 bg-neutral-800 text-neutral-500 cursor-not-allowed"
                >
                  Select a Color
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTints;
