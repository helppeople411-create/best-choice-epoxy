import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Plane, Car, GraduationCap, Utensils, ShoppingBasket, Stethoscope, 
  Factory, Dog, Pill, Home, Siren, Trophy
} from "lucide-react";
import { Link } from "wouter";

export default function Industries() {
  const industrySystems = [
    {
      name: "Aerospace",
      icon: Plane,
      description: "High-performance coatings for hangars and maintenance facilities.",
      image: "/images/systems/aerospace.jpg"
    },
    {
      name: "Automotive",
      icon: Car,
      description: "Durable, chemical-resistant flooring for showrooms and service bays.",
      image: "/images/systems/automotive.jpg"
    },
    {
      name: "Education",
      icon: GraduationCap,
      description: "Safe, low-maintenance flooring for schools and universities.",
      image: "/images/systems/education.jpg"
    },
    {
      name: "Food & Beverage",
      icon: Utensils,
      description: "Hygienic, seamless flooring solutions for food processing and dining.",
      image: "/images/systems/food-beverage.jpg"
    },
    {
      name: "Grocery & Retail",
      icon: ShoppingBasket,
      description: "Attractive, durable flooring for high-traffic retail environments.",
      image: "/images/systems/grocery-retail.jpg"
    },
    {
      name: "Healthcare",
      icon: Stethoscope,
      description: "Sterile, easy-to-clean flooring for hospitals and clinics.",
      image: "/images/systems/healthcare.jpg"
    },
    {
      name: "Manufacturing",
      icon: Factory,
      description: "Heavy-duty flooring for industrial manufacturing plants.",
      image: "/images/systems/manufacturing.jpg"
    },
    {
      name: "Pet Care",
      icon: Dog,
      description: "Durable, easy-to-clean flooring for veterinary clinics and kennels.",
      image: "/images/systems/pet-care.jpeg"
    },
    {
      name: "Pharmaceutical",
      icon: Pill,
      description: "Chemical-resistant, sterile flooring for labs and production areas.",
      image: "/images/systems/pharmaceutical.jpg"
    },
    {
      name: "Residential",
      icon: Home,
      description: "Stylish, durable flooring for garages, basements, and living spaces.",
      image: "/images/systems/residential.jpeg"
    },
    {
      name: "Fire/Police/Rescue",
      icon: Siren,
      description: "Rugged, reliable flooring for emergency service facilities.",
      image: "/images/systems/fire-police-rescue.jpeg"
    },
    {
      name: "Sporting & Events",
      icon: Trophy,
      description: "High-performance flooring for stadiums, arenas, and gyms.",
      image: "/images/systems/sporting-events.jpeg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-accent text-white py-20 border-b-8 border-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: "linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080), linear-gradient(45deg, #808080 25%, transparent 25%, transparent 75%, #808080 75%, #808080)",
                 backgroundSize: "20px 20px",
                 backgroundPosition: "0 0, 10px 10px"
               }}>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold text-primary-foreground uppercase tracking-widest mb-4">
                Commercial Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase leading-none tracking-tighter mb-6">
                Industry <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Applications</span>
              </h1>
              <p className="text-xl text-white font-mono max-w-2xl border-l-4 border-primary pl-6 mb-8">
                Specialized flooring solutions tailored to the unique demands of every industry.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Systems Grid */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industrySystems.map((system, idx) => (
                <div key={idx} className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img 
                      src={system.image} 
                      alt={system.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 bg-background/90 px-4 py-2 border-t-2 border-primary z-20">
                      <system.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-display font-bold text-foreground uppercase mb-2 group-hover:text-primary transition-colors">
                      {system.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {system.description}
                    </p>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl font-mono mb-8 max-w-2xl mx-auto">
              Our technical experts can help design a flooring system tailored to your specific facility requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-none font-display font-bold uppercase text-lg h-14 px-8">
                Contact Technical Support
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
