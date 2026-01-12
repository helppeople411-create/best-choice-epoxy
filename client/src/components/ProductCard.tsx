import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-card border-2 border-border hover:border-primary transition-colors duration-300 flex flex-col h-full">
      {/* Technical Overlay */}
      <div className="absolute top-2 right-2 z-10 font-mono text-[10px] text-muted-foreground bg-background/80 px-1 border border-border">
        SKU: {product.id.toUpperCase().substring(0, 6)}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/20 p-8 border-b-2 border-border">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hazard Stripe Overlay on Hover */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-mono text-primary uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-display font-bold uppercase mb-2 leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border border-dashed">
          <span className="text-lg font-mono font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Link href={`/products/${product.id}`}>
            <Button size="sm" className="rounded-none font-display font-bold uppercase bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              View Details <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
