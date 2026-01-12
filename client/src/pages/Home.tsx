import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import products from "@/products.json";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Hammer, Clock, Award } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-background border-b border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Extreme Durability", desc: "Engineered to withstand heavy traffic and harsh chemicals." },
                { icon: Hammer, title: "Easy Application", desc: "Professional results with user-friendly application systems." },
                { icon: Clock, title: "Fast Cure Times", desc: "Minimize downtime with our rapid-curing formulations." },
                { icon: Award, title: "USA Made", desc: "Proudly manufactured in our state-of-the-art facility." }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-start p-6 border-l-4 border-primary bg-muted/10 hover:bg-muted/30 transition-colors">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-display font-bold uppercase mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-mono text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-24 bg-muted/20">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <span className="text-primary font-mono font-bold uppercase tracking-widest text-sm">Catalog</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mt-2">Featured Products</h2>
              </div>
              <Link href="/products">
                <Button variant="outline" className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background font-display font-bold uppercase">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" 
               style={{ 
                 backgroundImage: "linear-gradient(45deg, #FF6700 25%, transparent 25%, transparent 50%, #FF6700 50%, #FF6700 75%, transparent 75%, transparent)", 
                 backgroundSize: "40px 40px" 
               }}>
          </div>
          
          <div className="container relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6">Ready to Transform Your Surface?</h2>
            <p className="text-xl text-white max-w-2xl mx-auto mb-10 font-mono">
              Get the best protection for your concrete floors with our industrial-grade coating systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-white hover:text-accent font-display font-bold uppercase text-lg px-10 h-16 border-2 border-primary transition-all">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-none border-2 border-white text-white hover:bg-white hover:text-accent font-display font-bold uppercase text-lg px-10 h-16 transition-all">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
