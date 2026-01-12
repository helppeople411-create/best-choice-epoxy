import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative bg-accent text-accent-foreground overflow-hidden border-b-8 border-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: "radial-gradient(#808080 1px, transparent 1px)", 
             backgroundSize: "20px 20px" 
           }}>
      </div>
      
      <div className="container relative z-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold text-primary-foreground uppercase tracking-widest mb-4">
            Industrial Grade Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none tracking-tighter">
            Engineered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Durability</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-xl font-mono border-l-4 border-primary pl-6">
            High-performance coatings for concrete floors, countertops, and industrial surfaces. Built to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-white hover:text-accent font-display font-bold uppercase text-lg px-8 h-14 border-2 border-primary transition-all">
                Shop Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-none border-2 border-white text-white hover:bg-white hover:text-accent font-display font-bold uppercase text-lg px-8 h-14 transition-all">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 border-2 border-primary/30 z-0"></div>
          <div className="absolute -inset-8 border-2 border-primary/10 z-0"></div>
          <img 
            src="/images/products/simguard.png" 
            alt="Best Choice Guard" 
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
          />
          
          {/* Technical Specs Overlay */}
          <div className="absolute bottom-10 -right-10 bg-background/90 p-4 border-2 border-primary backdrop-blur-sm z-20 max-w-xs">
            <h4 className="font-display font-bold uppercase text-primary mb-2">Best Choice Guard</h4>
            <ul className="text-xs font-mono space-y-1 text-foreground">
              <li className="flex justify-between"><span>Adhesion:</span> <span>&gt;400 PSI</span></li>
              <li className="flex justify-between"><span>Cure Time:</span> <span>24 Hours</span></li>
              <li className="flex justify-between"><span>VOC:</span> <span>&lt;50 g/L</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
