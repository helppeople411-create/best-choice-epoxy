import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, LayoutGrid, Box, Layers } from "lucide-react";
import { Link } from "wouter";

export default function GarageSolutions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden border-b-8 border-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/garage-hero.jpg" 
            alt="Industrial Garage Transformation" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 opacity-20" 
               style={{ 
                 backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
                 backgroundSize: "30px 30px" 
               }}>
          </div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold text-primary-foreground uppercase tracking-widest mb-2">
              Total Garage Optimization
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none tracking-tighter">
              Transform Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Workspace</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono border-l-4 border-primary pl-6 max-w-2xl text-gray-200">
              Premium flooring, custom cabinets, and industrial-grade organization systems designed for performance.
            </p>
            <div className="pt-6">
              <Link href="/contact">
                <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-white hover:text-accent font-display font-bold uppercase text-lg px-8 h-14 border-2 border-primary transition-all">
                  Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
              Engineered Solutions
            </h2>
            <p className="text-xl text-gray-400 font-mono max-w-2xl mx-auto">
              Complete garage makeovers tailored to your specific needs and workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flooring */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden group hover:border-primary transition-colors duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src="/images/garage-flooring.jpg" 
                  alt="Epoxy Flooring" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground px-4 py-2 font-mono font-bold uppercase text-sm z-20">
                  01. Surface
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold uppercase">Industrial Flooring</h3>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  High-performance epoxy and polyaspartic coatings that resist chemicals, abrasions, and impact. Available in decorative chip, metallic, and solid color finishes.
                </p>
                <ul className="space-y-2 pt-4">
                  {['Chemical Resistant', 'Easy Maintenance', 'Anti-Slip Options'].map((item) => (
                    <li key={item} className="flex items-center text-sm font-mono text-gray-300">
                      <Check className="h-4 w-4 text-primary mr-2" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cabinets */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden group hover:border-primary transition-colors duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src="/images/garage-cabinets.jpg" 
                  alt="Garage Cabinets" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground px-4 py-2 font-mono font-bold uppercase text-sm z-20">
                  02. Storage
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Box className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold uppercase">Custom Cabinetry</h3>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Heavy-duty modular cabinets designed for the garage environment. Off-the-floor mounting protects against water and pests while maximizing space.
                </p>
                <ul className="space-y-2 pt-4">
                  {['Soft-Close Hinges', '1-Inch Thick Shelves', 'Custom Configurations'].map((item) => (
                    <li key={item} className="flex items-center text-sm font-mono text-gray-300">
                      <Check className="h-4 w-4 text-primary mr-2" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Wall Organization */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden group hover:border-primary transition-colors duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src="/images/wall-storage.jpg" 
                  alt="Wall Organization" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground px-4 py-2 font-mono font-bold uppercase text-sm z-20">
                  03. Organization
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold uppercase">Slatwall Systems</h3>
                </div>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Versatile wall storage solutions that adapt to your changing needs. Hang bikes, tools, and equipment securely to reclaim your floor space.
                </p>
                <ul className="space-y-2 pt-4">
                  {['Heavy-Duty PVC', 'Interchangeable Hooks', 'Clean Aesthetic'].map((item) => (
                    <li key={item} className="flex items-center text-sm font-mono text-gray-300">
                      <Check className="h-4 w-4 text-primary mr-2" /> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
             style={{ 
               backgroundImage: "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)", 
               backgroundSize: "60px 60px",
               backgroundPosition: "0 0, 30px 30px"
             }}>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-8">
                The Best Choice <br/>
                <span className="text-primary">Advantage</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl font-mono">01</div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Consultation & Design</h3>
                    <p className="font-mono text-gray-600">We start with a free in-home assessment to understand your storage needs and design preferences.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl font-mono">02</div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Precision Installation</h3>
                    <p className="font-mono text-gray-600">Our certified installers prepare the surface and install your system with minimal downtime.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl font-mono">03</div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Lifetime Warranty</h3>
                    <p className="font-mono text-gray-600">We stand behind our products and workmanship with industry-leading warranties.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border-4 border-primary z-0"></div>
              <img 
                src="/images/garage-hero.jpg" 
                alt="Completed Garage Project" 
                className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-6">
            Ready to Upgrade?
          </h2>
          <p className="text-xl md:text-2xl font-mono mb-10 max-w-2xl mx-auto opacity-90">
            Schedule your free design consultation today and see what your garage can become.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-none bg-white text-primary hover:bg-black hover:text-white font-display font-bold uppercase text-lg px-12 h-16 border-2 border-white transition-all">
              Schedule Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
