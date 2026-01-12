import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import products from "@/products.json";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, FileText, Shield, ArrowLeft } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { redirectToCheckout } from "@/lib/stripe";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  ghlProductId?: string;
  stripePriceId?: string;
}

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:id");
  
  const [, setLocation] = useLocation();
  
  if (!match) return <NotFound />;
  
  const product = (products as unknown as Product[]).find(p => p.id === params.id);
  
  if (!product) return <NotFound />;

  const handleBuyNow = async () => {
    // Use dynamic pricing for all products
    await redirectToCheckout([{
      name: product.name,
      amount: Math.round(product.price * 100), // Convert to cents
      quantity: 1,
      images: [window.location.origin + product.image]
    }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb / Back */}
        <div className="bg-muted/30 border-b border-border py-4">
          <div className="container">
            <Link href="/products">
              <a className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
              </a>
            </Link>
          </div>
        </div>
        
        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-white border-2 border-border p-12 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid-pattern.png')] opacity-5"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary"></div>
              </div>
              
              {/* Tech Specs Box */}
              <div className="mt-8 bg-accent text-accent-foreground p-6 border-l-4 border-primary">
                <h3 className="font-display font-bold uppercase mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Coverage</span>
                    <span>200-300 sq.ft/gal</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Application Temp</span>
                    <span>50°F - 90°F</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Pot Life</span>
                    <span>45 Minutes</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">Shelf Life</span>
                    <span>12 Months</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <span className="inline-block bg-secondary px-2 py-1 text-xs font-mono font-bold text-secondary-foreground uppercase tracking-widest">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-3xl font-mono font-bold text-primary mb-8 pb-8 border-b border-border border-dashed">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-lg text-white mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="mb-10">
                <h3 className="font-display font-bold uppercase mb-4 text-sm tracking-wider">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-mono text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto space-y-4">
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase h-14 text-lg"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-none border-2 border-border hover:border-primary hover:text-primary font-display font-bold uppercase h-14 w-14 p-0 flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground font-mono text-center">
                  * Professional use only. Read TDS/SDS before application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
