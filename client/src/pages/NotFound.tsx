import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <AlertTriangle className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-6xl font-display font-bold uppercase mb-4">404</h1>
      <h2 className="text-2xl font-mono mb-8">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold uppercase">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
