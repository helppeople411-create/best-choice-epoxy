import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import products from "@/products.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [filter, setFilter] = useState("All");
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  // Filter products
  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-5xl font-display font-bold uppercase mb-4">Product Catalog</h1>
            <p className="text-muted-foreground font-mono max-w-2xl">
              Browse our complete line of industrial-grade protective coatings, sealers, and repair materials.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-border">
            {categories.map(category => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`rounded-none font-display font-bold uppercase ${
                  filter === category 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "border-border hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-mono text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
