import { useRoute, Link } from "wouter";
import { systemCategories } from "@/lib/systems-data";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, CheckCircle2 } from "lucide-react";

export default function SystemDetail() {
  const [match, params] = useRoute("/systems/:categoryId/:systemId");
  
  if (!match) return null;

  const category = systemCategories.find(c => c.id === params.categoryId);
  const system = category?.systems.find(s => s.id === params.systemId);

  if (!category || !system) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">System Not Found</h1>
        <Link href="/systems">
          <Button>Return to Systems</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
            <Link href="/systems" className="hover:text-primary">Systems</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/systems/${category.id}`} className="hover:text-primary">{category.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{system.name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-primary mb-4">
            {system.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {system.description}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image & Features */}
          <div className="space-y-8">
            <div className="rounded-lg overflow-hidden border border-border bg-card">
              <img 
                src={system.image} 
                alt={system.name} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('h-64', 'flex', 'items-center', 'justify-center', 'bg-muted');
                  e.currentTarget.parentElement!.innerHTML = `<div class="text-muted-foreground/20 font-display font-bold text-4xl uppercase">${system.name.substring(0, 2)}</div>`;
                }}
              />
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold uppercase mb-6 border-l-4 border-primary pl-4">
                System Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Industrial Grade Durability",
                  "Chemical Resistant",
                  "UV Stable Options",
                  "Easy Maintenance",
                  "Seamless Finish",
                  "Slip Resistant Available"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Description & Downloads */}
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-display font-bold uppercase mb-4">
                System Overview
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The {system.name} is a premium flooring solution designed for {category.name.toLowerCase()} applications. 
                It offers superior protection against wear, chemicals, and impact while providing an attractive, professional finish.
                Engineered for longevity, this system is ideal for environments requiring both durability and aesthetics.
              </p>
              
              <h4 className="text-xl font-display font-bold uppercase mt-8 mb-4">
                Recommended Applications
              </h4>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Manufacturing Facilities</li>
                <li>Warehouses & Distribution Centers</li>
                <li>Commercial Showrooms</li>
                <li>Automotive Garages</li>
                <li>Retail Spaces</li>
              </ul>
            </div>

            <div className="bg-muted/20 p-6 rounded-lg border border-border">
              <h3 className="text-xl font-display font-bold uppercase mb-4">
                Technical Resources
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-auto py-4 text-left group">
                  <Download className="h-5 w-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold">System Guide</div>
                    <div className="text-xs text-muted-foreground">PDF Download</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-4 text-left group">
                  <Download className="h-5 w-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold">Technical Data Sheet (TDS)</div>
                    <div className="text-xs text-muted-foreground">PDF Download</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-4 text-left group">
                  <Download className="h-5 w-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold">Safety Data Sheet (SDS)</div>
                    <div className="text-xs text-muted-foreground">PDF Download</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-display font-bold uppercase mb-2 text-primary">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground mb-4">
                Contact our technical team for a custom quote or specification assistance.
              </p>
              <Link href="/contact">
                <Button className="w-full font-bold uppercase tracking-wider">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
