import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-8 text-foreground">
          Privacy Policy
        </h1>
        <Card className="bg-card border-border">
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: January 9, 2026</p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-6">
              Best Choice ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li><strong className="text-foreground">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong className="text-foreground">Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong className="text-foreground">Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              <li><strong className="text-foreground">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            </ul>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p className="text-muted-foreground mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. 
              In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. 
              They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">5. Your Legal Rights</h2>
            <p className="text-muted-foreground mb-6">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <address className="not-italic text-muted-foreground">
              <strong className="text-foreground">Best Choice</strong><br />
              32700 Industrial Drive<br />
              Madison Heights, MI 48071<br />
              Email: info@bestchoice.com<br />
              Phone: (866) 515-8775
            </address>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
