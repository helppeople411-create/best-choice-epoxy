import { useRoute, Link } from "wouter";
import { systemCategories } from "@/lib/systems-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function SystemCategory() {
  const [match, params] = useRoute("/systems/:categoryId");
  
  if (!match) return null;

  const category = systemCategories.find(c => c.id === params.categoryId);

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <Link href="/systems">
          <Button>Return to Systems</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/systems" className="hover:text-primary">Systems</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-primary">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0 space-y-2">
            <h3 className="font-display font-bold uppercase text-lg mb-4 px-4">Categories</h3>
            {systemCategories.map((cat) => (
              <Link key={cat.id} href={`/systems/${cat.id}`}>
                <div className={`
                  w-full text-left px-4 py-3 rounded-md transition-colors font-medium text-sm uppercase tracking-wide cursor-pointer
                  ${cat.id === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"}
                `}>
                  {cat.name}
                </div>
              </Link>
            ))}
          </aside>

          {/* Systems Grid */}
          <div className="flex-1">
            <div className="grid gap-6">
              {category.systems.map((system) => (
                <Card key={system.id} className="overflow-hidden bg-card/50 border-border/50 hover:border-primary transition-colors group">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 md:h-auto bg-muted relative shrink-0">
                      <img 
                        src={system.image} 
                        alt={system.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          e.currentTarget.parentElement!.innerHTML = `<div class="text-muted-foreground/20 font-display font-bold text-4xl uppercase">${system.name.substring(0, 2)}</div>`;
                        }}
                      />
                    </div>
                    
                    <CardContent className="flex-1 p-6 flex flex-col justify-center">
                      <h3 className="text-2xl font-display font-bold uppercase mb-3 group-hover:text-primary transition-colors">
                        {system.name}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {system.description}
                      </p>
                      <div>
                        <Link href={`/systems/${category.id}/${system.id}`}>
                          <Button className="uppercase font-bold tracking-wider">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
