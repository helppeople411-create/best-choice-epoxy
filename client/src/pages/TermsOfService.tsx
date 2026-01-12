import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-8 text-foreground">
          Terms of Service
        </h1>
        <Card className="bg-card border-border">
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-8">Last Updated: January 9, 2026</p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing our website at Best Choice, you agree to be bound by these terms of service, all applicable laws and regulations, 
              and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Best Choice's website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Best Choice's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              The materials on Best Choice's website are provided on an 'as is' basis. Best Choice makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">4. Limitations</h2>
            <p className="text-muted-foreground mb-6">
              In no event shall Best Choice or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use the materials on Best Choice's website, even if Best Choice 
              or a Best Choice authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground mb-6">
              The materials appearing on Best Choice's website could include technical, typographical, or photographic errors. 
              Best Choice does not warrant that any of the materials on its website are accurate, complete, or current. 
              Best Choice may make changes to the materials contained on its website at any time without notice. 
              However, Best Choice does not make any commitment to update the materials.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">6. Governing Law</h2>
            <p className="text-muted-foreground mb-6">
              These terms and conditions are governed by and construed in accordance with the laws of Michigan and you irrevocably submit to the 
              exclusive jurisdiction of the courts in that State or location.
            </p>

            <h2 className="text-2xl font-display font-bold uppercase text-primary mt-8 mb-4">7. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              Questions about the Terms of Service should be sent to us at info@bestchoice.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
