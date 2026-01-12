import { Link, useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, total } = useCart();

  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Decorative", path: "/products/decorative-chip" },

    { name: "Garage Solutions", path: "/garage-solutions" },
    { name: "Systems", path: "/systems" },
    { name: "Gallery", path: "/gallery" },
    { name: "Industries", path: "/industries" },
    { name: "Training", path: "/training" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-primary bg-background">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="Best Choice Logo" 
              className="h-12 w-auto object-contain" 
            />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`text-sm font-display font-bold uppercase tracking-wider hover:text-primary transition-colors ${
                location === item.path ? "text-primary" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-none hover:bg-muted">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button 
              variant="default" 
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase relative h-10 px-4"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs">Cart</span>
                <span className="text-sm font-mono">({itemCount}) ${total.toFixed(2)}</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/cart">
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase h-9 px-3"
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px]">Cart</span>
                <span className="text-xs font-mono">({itemCount})</span>
              </div>
            </Button>
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-none border-2 border-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l-4 border-primary bg-background p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <img 
                    src="/images/logo.png" 
                    alt="Best Choice Logo" 
                    className="h-10 w-auto object-contain" 
                  />
                </div>
                <nav className="flex-1 flex flex-col p-6 gap-4">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.path}
                      className="text-lg font-display font-bold uppercase tracking-wider hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t border-border bg-muted/20">
                  <Button className="w-full rounded-none bg-primary text-primary-foreground font-display font-bold uppercase">
                    Professional Login
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Decorative Tech Line */}
      <div className="h-1 w-full bg-accent flex">
        <div className="w-1/3 bg-primary"></div>
        <div className="w-1/3 bg-secondary"></div>
        <div className="w-1/3 bg-accent"></div>
      </div>
    </header>
  );
}
