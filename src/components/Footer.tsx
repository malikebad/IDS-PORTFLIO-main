import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ExternalLink,
  Heart,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const Footer = () => {
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        trackEvent("newsletter_subscribed", { email: newsletterEmail });
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter updates.",
        });
        setNewsletterEmail("");
      } else {
        throw new Error(data.error || "Failed to subscribe.");
      }
    } catch (err: any) {
      toast({
        title: "Subscription error",
        description: err.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const trustedClients = [
    { name: "FinTech Co.", icon: "⚡" },
    { name: "HealthAI", icon: "🧬" },
    { name: "RetailCloud", icon: "☁️" },
    { name: "StudioX", icon: "🎬" },
    { name: "CinePro", icon: "🎥" },
    { name: "DataForge", icon: "💎" },
  ];

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Trusted By Teams At Header Strip */}
      <div className="relative z-10 border-b border-border/40 bg-card/20 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Trusted by teams at
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {trustedClients.map((client) => (
              <div
                key={client.name}
                className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-card/40 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm"
              >
                <span className="font-semibold text-sm text-foreground/80 group-hover:text-primary transition-colors tracking-wide">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand and Social */}
          <div className="space-y-4 sm:space-y-5 col-span-1 sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                src={logo} 
                alt="INVENTER Design Studio" 
                className="h-12 sm:h-14 md:h-16 rounded-lg"
              />
              <div>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 mb-1">
                  Creative Technology Studio
                </span>
                <h3 className="font-bold text-base sm:text-lg text-foreground">
                  Software Development &amp; Video Production
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pr-0 lg:pr-6">
              Leading creative technology studio specializing in software development, UI/UX design, video production, and digital experiences. We transform ideas into scalable solutions and compelling stories.
            </p>

            <div className="flex space-x-3 sm:space-x-4 pt-1 sm:pt-2">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="GitHub"
              >
                <Github size={16} className="sm:size-18 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="sm:size-18 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram size={16} className="sm:size-18 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/70 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="YouTube"
              >
                <Youtube size={16} className="sm:size-18 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-5 relative inline-block">
              Navigation
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary/80 to-transparent"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-5 relative inline-block">
              What We Do
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary/80 to-transparent"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                Software Development
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                Video Production
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                Creative Agency
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                Digital Innovation
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-5 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary/80 to-transparent"></span>
            </h4>
            <a 
              href="mailto:info@inventerdesignstudio.com"
              onClick={() => trackEvent("email_clicked", { location: "footer" })}
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-3 sm:mb-4 group"
            >
              <div className="w-6 flex justify-center mr-2">
                <Mail size={14} className="sm:size-16 group-hover:text-primary transition-colors" />
              </div>
              <span>info@inventerdesignstudio.com</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
            </a>
            <a 
              href="tel:+923704441788"
              onClick={() => trackEvent("phone_clicked", { location: "footer" })}
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-3 sm:mb-4 group"
            >
              <div className="w-6 flex justify-center mr-2">
                <Phone size={14} className="sm:size-16 group-hover:text-primary transition-colors" />
              </div>
              <span>+92 370 4441 788</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
            </a>
            <a 
              href="https://share.google/22EChxAzOwTvM5Z1I"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
            >
              <div className="w-6 flex justify-center mr-2">
                <MapPin size={14} className="sm:size-16 group-hover:text-primary transition-colors" />
              </div>
              <span>Lahore, Pakistan</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 p-4 sm:p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Subscribe to our newsletter for the latest updates, case studies, and studio insights.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true" tabIndex={-1}>
                <input type="text" name="_hp_company" tabIndex={-1} autoComplete="off" />
              </div>
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="flex-1 h-10 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="h-10 px-5 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 shadow-md shadow-primary/20"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} INVENTER Design Studio. All rights reserved.
              <span className="hidden sm:inline-flex items-center text-xs text-muted-foreground/70 ml-2">
                Made with <Heart size={12} className="mx-1 text-red-500 fill-red-500" /> in Lahore
              </span>
            </p>
            <div className="flex items-center justify-center sm:justify-end space-x-4 sm:space-x-6 md:space-x-8">
              <Link to="/privacy-policy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
