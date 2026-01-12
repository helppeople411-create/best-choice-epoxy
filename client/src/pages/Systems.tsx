import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { systemCategories } from "@/lib/systems-data";

export default function Systems() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Systems Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-6">
            <span className="text-primary">Engineered</span> Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete, high-performance coating solutions designed for every environment.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemCategories.map((category) => (
              <Link key={category.id} href={`/systems/${category.id}`}>
                <Card className="group h-full cursor-pointer hover:border-primary transition-colors duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {category.description}
                    </p>
                    <Button variant="ghost" className="group-hover:text-primary p-0 hover:bg-transparent">
                      View Systems <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
