import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-accent text-accent-foreground py-20 border-b-8 border-primary">
          <div className="container">
            <h1 className="text-5xl md:text-6xl font-display font-bold uppercase mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl">
              Get in touch with our technical experts for product support, quotes, or general inquiries.
            </p>
          </div>
        </div>
        
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-display font-bold uppercase mb-8 text-primary">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-mono font-bold uppercase">First Name</label>
                    <Input className="rounded-none border-2 border-border focus:border-primary h-12 bg-muted/10" placeholder="JOHN" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-mono font-bold uppercase">Last Name</label>
                    <Input className="rounded-none border-2 border-border focus:border-primary h-12 bg-muted/10" placeholder="DOE" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono font-bold uppercase">Email Address</label>
                  <Input className="rounded-none border-2 border-border focus:border-primary h-12 bg-muted/10" placeholder="JOHN.DOE@COMPANY.COM" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono font-bold uppercase">Phone Number</label>
                  <Input className="rounded-none border-2 border-border focus:border-primary h-12 bg-muted/10" placeholder="(555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono font-bold uppercase">Message</label>
                  <Textarea className="rounded-none border-2 border-border focus:border-primary min-h-[150px] bg-muted/10" placeholder="HOW CAN WE HELP YOU?" />
                </div>
                
                <Button size="lg" className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase h-14 text-lg">
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-8 text-primary">Headquarters</h2>
                <div className="space-y-6 font-mono">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-bold">Best Choice Inc.</p>
                      <p className="text-muted-foreground">32700 Industrial Drive</p>
                      <p className="text-muted-foreground">Madison Heights, MI 48071</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <p>(866) 515-8775</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <p>info@bestchoice.com</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 bg-muted/20 border-2 border-border">
                <h3 className="text-xl font-display font-bold uppercase mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" /> Business Hours
                </h3>
                <ul className="space-y-2 font-mono text-sm">
                  <li className="flex justify-between border-b border-border border-dashed pb-2">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM EST</span>
                  </li>
                  <li className="flex justify-between border-b border-border border-dashed pb-2">
                    <span>Saturday</span>
                    <span>Closed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
