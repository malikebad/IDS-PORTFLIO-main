import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-bold text-primary animate-pulse">404</h1>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl -z-10" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Oops! Page Not Found</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The page you're looking for doesn't exist, has been moved, or the URL might be incorrect.
          </p>
        </div>

        {/* Search suggestion */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Try these pages instead:</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <Link to="/about" className="text-primary hover:underline">About</Link>
            <Link to="/services" className="text-primary hover:underline">Services</Link>
            <Link to="/portfolio" className="text-primary hover:underline">Portfolio</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
            <Link to="/faq" className="text-primary hover:underline">FAQ</Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Contact CTA */}
        <div className="pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-3">
            Can't find what you're looking for?
          </p>
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
