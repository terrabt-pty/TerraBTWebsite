import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <SEOHead title="404 - Page Not Found | TerraBT" description="The page you are looking for does not exist." />
      <Card className="w-full max-w-md mx-4 border-primary/20 shadow-xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Error 404</h1>
            <p className="text-muted-foreground mt-2">Page Not Found</p>
          </div>

          <p className="text-foreground/80 mb-8">
            The link might be broken, or the page has been moved.
          </p>

          <Link href="/">
            <Button className="w-full gap-2">
              <Home className="h-4 w-4" />
              Back to Safety
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
