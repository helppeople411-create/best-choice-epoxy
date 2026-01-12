import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Zap, Users, Award } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
            alt="Industrial Facility" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Since 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter text-foreground mb-6">
              ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">EXCELLENCE</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              At Best Choice, we don't just manufacture coatings; we engineer resilience. 
              Our mission is to provide industrial-grade protection that stands the test of time, 
              combining cutting-edge chemistry with practical application.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower professionals and DIY enthusiasts with superior protective solutions. 
                  We believe every surface deserves the best defense against wear, chemicals, and time itself. 
                  We strive to deliver products that exceed expectations in performance, longevity, and aesthetic appeal.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-4">Who We Are</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Born from a passion for excellence, Best Choice is a team of chemists, engineers, and industry experts. 
                  We understand the unique challenges of surface protection because we've been in the field. 
                  Our products are crafted with precision and rigorously tested to ensure they meet the highest standards.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/products">
                  <Button size="lg" className="font-display font-bold uppercase text-lg h-14 px-8">
                    Explore Our Solutions
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card border-border hover:border-primary transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase">Innovation</h3>
                  <p className="text-sm text-muted-foreground">Pushing boundaries with advanced coating technology.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary transition-colors duration-300 mt-8">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase">Quality</h3>
                  <p className="text-sm text-muted-foreground">Premium raw materials for consistent performance.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase">Support</h3>
                  <p className="text-sm text-muted-foreground">Expert technical guidance for your success.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary transition-colors duration-300 mt-8">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold uppercase">Value</h3>
                  <p className="text-sm text-muted-foreground">Professional protection accessible to everyone.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-6">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground">
              We specialize in comprehensive coating systems designed for extreme durability and stunning aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Industrial Systems",
                desc: "Heavy-duty protection for warehouses, factories, and high-traffic facilities.",
                image: "/images/about-industrial.jpg"
              },
              {
                title: "Commercial Spaces",
                desc: "Decorative and durable finishes for showrooms, retail, and public venues.",
                image: "/images/about-commercial.jpg"
              },
              {
                title: "Residential Solutions",
                desc: "Professional-grade garage and basement floor coatings for homeowners.",
                image: "/images/about-residential.jpg"
              }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border border-border bg-card">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold uppercase mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Join the thousands of professionals who trust Best Choice for their coating needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-display font-bold uppercase text-lg h-14 px-8">
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-display font-bold uppercase text-lg h-14 px-8">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
