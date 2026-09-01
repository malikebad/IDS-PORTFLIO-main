import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4 relative overflow-hidden">
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for could not be found."
        path={location.pathname}
        noindex={true}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md mx-auto space-y-6 p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-foreground">Page Not Found</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The link you followed may be broken or the page may have been moved.
          </p>
        </div>
        <Button asChild className="rounded-xl shadow-lg shadow-primary/20">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
