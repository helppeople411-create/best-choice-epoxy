import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground border-t-8 border-primary">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <img 
              src="/images/logo.png" 
              alt="Best Choice Logo" 
              className="h-12 w-auto object-contain brightness-0 invert" 
            />
            <p className="text-sm font-mono text-muted-foreground">
              Innovative Protective Coatings. Made in the USA. Engineered to protect every industry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-lg font-display font-bold uppercase mb-6 text-primary">Products</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Best Choice Guard</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Best Choice Hard</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Best Choice Thane WB</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Tabletop Epoxy</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">1000HS Primer</Link></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h3 className="text-lg font-display font-bold uppercase mb-6 text-primary">Industries</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><Link href="/systems" className="hover:text-primary transition-colors">Automotive</Link></li>
              <li><Link href="/systems" className="hover:text-primary transition-colors">Aerospace</Link></li>
              <li><Link href="/systems" className="hover:text-primary transition-colors">Retail</Link></li>
              <li><Link href="/systems" className="hover:text-primary transition-colors">Manufacturing</Link></li>
              <li><Link href="/systems" className="hover:text-primary transition-colors">Residential</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-display font-bold uppercase mb-6 text-primary">Contact</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex flex-col">
                <span className="text-muted-foreground text-xs">Address</span>
                <span>32700 Industrial Drive<br/>Madison Heights, MI 48071</span>
              </li>
              <li className="flex flex-col">
                <span className="text-muted-foreground text-xs">Phone</span>
                <span>(866) 515-8775</span>
              </li>
              <li className="flex flex-col">
                <span className="text-muted-foreground text-xs">Email</span>
                <span>info@bestchoice.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <p>&copy; 2026 Best Choice Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
