import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Calendar, MapPin, Users, Award, Clock, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Training() {
  const courses = [
    {
      month: "November",
      dates: "14th - 16th",
      duration: "3 Day",
      type: "Weekend Class",
      status: "Only 15 left",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
    },
    {
      month: "December",
      dates: "12th - 14th",
      duration: "3 Day",
      type: "Weekday Class",
      status: "Out of stock",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
    },
    {
      month: "January",
      dates: "16th - 18th",
      duration: "3 Day",
      type: "Weekday Class",
      status: "Out of stock",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
    },
    {
      month: "February",
      dates: "20th - 21st",
      duration: "3 Day",
      type: "Weekday Class",
      status: "Only 7 left",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
    },
    {
      month: "March",
      dates: "20th - 21st",
      duration: "3 Day",
      type: "Weekday Class",
      status: "Only 15 left",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
    },
    {
      month: "April",
      dates: "24th - 26th",
      duration: "3 Day",
      type: "Weekday Class",
      status: "Open",
      price: 1495,
      features: [
        "Full hands-on epoxy training",
        "All materials & tools provided",
        "Certification upon completion",
        "Lifetime expert support",
        "Breakfast & Lunch included",
        "Entry to Exclusive WhatsApp Group"
      ]
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
                 backgroundImage: "radial-gradient(#808080 1px, transparent 1px)", 
                 backgroundSize: "20px 20px" 
               }}>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold text-primary-foreground uppercase tracking-widest mb-4">
                Professional Certification
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase leading-none tracking-tighter mb-6">
                Epoxy Flooring <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Training Courses</span>
              </h1>
              <p className="text-xl text-white font-mono max-w-2xl border-l-4 border-primary pl-6 mb-8">
                Master the art of epoxy flooring with our comprehensive 3-day hands-on training program.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Calgary, Canada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Small Class Sizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Certification Included</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Schedule */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <div key={idx} className="group relative bg-card border-2 border-border hover:border-primary transition-all duration-300 flex flex-col">
                  {/* Header */}
                  <div className="bg-accent p-6 border-b-2 border-border group-hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-display font-bold text-white uppercase">{course.month}</h3>
                      <span className={`text-xs font-mono font-bold px-2 py-1 uppercase ${
                        course.status === "Out of stock" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 font-mono text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{course.dates}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 font-mono text-sm mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration} ({course.type})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow bg-card">
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-6 border-t border-border">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xs font-mono text-muted-foreground uppercase">Course Fee</p>
                          <p className="text-3xl font-display font-bold text-foreground">${course.price}</p>
                        </div>
                        <p className="text-xs font-mono text-primary text-right max-w-[120px]">
                          Purchase 2nd ticket for 10% off
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full rounded-none font-display font-bold uppercase text-lg h-12"
                        disabled={course.status === "Out of stock"}
                        variant={course.status === "Out of stock" ? "secondary" : "default"}
                      >
                        {course.status === "Out of stock" ? "Sold Out" : "Register Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-muted/30 border-t border-border">
          <div className="container text-center max-w-3xl mx-auto">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold uppercase mb-4">Have Questions?</h2>
            <p className="text-lg text-muted-foreground font-mono mb-8">
              Need more information about our training curriculum or group rates? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="outline" className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background font-display font-bold uppercase">
                Call (403) 702-6700
              </Button>
              <Link href="/contact">
                <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-accent hover:text-white font-display font-bold uppercase">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
