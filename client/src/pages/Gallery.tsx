import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Gallery() {
  const projects = [
    {
      id: 1,
      title: "Luxury Residential Garage",
      location: "Bloomfield Hills, MI",
      system: "Best Choice Flake SB",
      color: "Domino",
      description: "A complete transformation of a 3-car garage using our premium solvent-based flake system. The client requested a high-gloss, showroom-quality finish that could withstand hot tire pickup and road salts.",
      image: "/images/gallery/garage-flake.png",
      category: "Residential"
    },
    {
      id: 2,
      title: "Automotive Showroom",
      location: "Los Angeles, CA",
      system: "Best Choice Metallic",
      color: "Silver & Charcoal",
      description: "This high-end dealership needed a floor that matched the elegance of their vehicles. Our metallic system created a seamless, liquid-metal look that enhances the lighting and vehicle presentation.",
      image: "/images/gallery/showroom-metallic.png",
      category: "Commercial"
    },
    {
      id: 3,
      title: "Industrial Distribution Center",
      location: "Chicago, IL",
      system: "Best Choice Polished Concrete",
      color: "Natural",
      description: "For this 50,000 sq ft facility, durability was key. We installed a high-performance polished concrete system capable of handling constant forklift traffic and heavy pallet loads.",
      image: "/images/gallery/warehouse-polished.png",
      category: "Industrial"
    },
    {
      id: 4,
      title: "Restaurant Commercial Kitchen",
      location: "New York, NY",
      system: "Best Choice Quartz DB",
      color: "Red & Tan",
      description: "Safety and hygiene were the top priorities. Our double-broadcast quartz system provides superior slip resistance and an impervious surface that meets all health department codes.",
      image: "/images/gallery/kitchen-quartz.png",
      category: "Commercial"
    }
  ];

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Residential", "Commercial", "Industrial"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-accent text-accent-foreground py-20 border-b-8 border-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: "radial-gradient(#808080 1px, transparent 1px)", 
                 backgroundSize: "20px 20px" 
               }}>
          </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold text-primary-foreground uppercase tracking-widest mb-4">
                Real World Results
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none tracking-tighter mb-6">
                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Gallery</span>
              </h1>
              <p className="text-xl text-white font-mono border-l-4 border-primary pl-6 max-w-2xl">
                Explore our portfolio of industrial, commercial, and residential installations. See the Best Choice difference.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Gallery */}
        <section className="py-16">
          <div className="container">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 justify-center md:justify-start">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  onClick={() => setFilter(cat)}
                  className={`rounded-none font-display font-bold uppercase tracking-wider border-2 ${
                    filter === cat 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "border-input hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group bg-card border-2 border-border hover:border-primary transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="rounded-none border-2 border-white text-white hover:bg-white hover:text-black font-display font-bold uppercase">
                            <ZoomIn className="mr-2 h-4 w-4" /> View Full Size
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl bg-black border-2 border-primary p-1">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-auto"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-bold uppercase mb-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-mono text-muted-foreground flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {project.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6 flex-grow">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-border border-dashed">
                        <div>
                          <span className="block text-xs font-mono text-muted-foreground uppercase">System</span>
                          <span className="font-bold text-foreground">{project.system}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-mono text-muted-foreground uppercase">Color</span>
                          <span className="font-bold text-foreground">{project.color}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full rounded-none bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground font-display font-bold uppercase transition-all group-hover:translate-x-2">
                      Request Similar Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
