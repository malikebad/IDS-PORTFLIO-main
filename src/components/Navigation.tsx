import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const mobileNavLinks = [
    ...mainNavLinks,
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/10 py-2.5 sm:py-3"
          : "bg-background/40 backdrop-blur-md border-b border-border/20 py-3 sm:py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3 hover:opacity-95 transition-all shrink-0"
            aria-label="Inventor Design Studio Home"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative p-1 rounded-xl bg-card/80 border border-border/60 shadow-sm group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(136,231,17,0.2)] transition-all duration-300"
            >
              <img
                src={logo}
                alt="Inventor Design Studio Logo"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                  Inventor
                </span>
                <span className="font-semibold text-base sm:text-lg md:text-xl tracking-tight text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                  Design Studio
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <span className="hidden sm:inline-block text-[9px] md:text-[10px] uppercase font-semibold tracking-widest text-muted-foreground/80 leading-none mt-0.5">
                Creative Technology &amp; Growth Systems
              </span>
            </motion.div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {mainNavLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="hidden sm:block"
            >
              <Button
                variant="default"
                size="sm"
                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3.5 sm:px-4 shadow-sm hover:shadow-[0_0_20px_rgba(136,231,17,0.3)] transition-all duration-300 group"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <span>Let's Talk</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden text-foreground p-2 rounded-xl bg-card/80 border border-border/60 hover:border-primary/40 hover:bg-card transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden overflow-hidden mt-3 pt-3 pb-4 px-4 bg-card/95 backdrop-blur-2xl rounded-2xl border border-border/70 shadow-2xl space-y-2"
            >
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Inventor Design Studio" className="h-7 w-7 rounded-md object-contain" />
                  <span className="text-sm font-bold text-foreground">Inventor Design Studio</span>
                </div>
                <span className="text-[10px] font-semibold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  Navigation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 text-sm font-medium transition-all rounded-xl ${
                      isActive(link.path)
                        ? "text-primary bg-primary/10 font-semibold border border-primary/20"
                        : "text-foreground/80 hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={16}
                      className={isActive(link.path) ? "text-primary" : "text-muted-foreground/60"}
                    />
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-border/50">
                <Button
                  variant="default"
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md py-2.5"
                  asChild
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    <span>Start a Project with Us</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
