import { useMemo, useState } from "react";
import { 
  Video, 
  Palette, 
  Smartphone, 
  Code2, 
  Zap, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  PenTool, 
  Rocket, 
  Film,
  Sparkles
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/structuredData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  
  const SERVICES_DATA = [
    {
      icon: Video,
      title: "Cinematic Video Production & Reels",
      description:
        "From viral short-form reels to widescreen documentary-style YouTube video essays, we craft high-retention video edits with kinetic typography, 3D motion graphics, DaVinci Resolve color grading, and immersive sound design.",
      features: [
        "Viral 9:16 Social Media Reels & TikToks",
        "16:9 Widescreen Documentary Video Essays",
        "Alex Hormozi & Iman Gadzhi Style Edits",
        "DaVinci Resolve Cinematic Color Grading",
      ],
      cta: "Explore Video Production",
      color: "from-lime-400 to-lime-600",
      bgColor: "bg-lime-400/10",
      textColor: "text-lime-400",
    },
    {
      icon: Code2,
      title: "Software & Web Engineering",
      description:
        "High-performance websites, SaaS platforms, and enterprise web applications engineered for speed, reliability, and scale. We build full-stack digital solutions using modern React, Next.js, and TypeScript ecosystems.",
      features: [
        "Custom SaaS & Web Application Development",
        "Responsive Full-Stack Architecture",
        "API Engineering & Third-Party Integrations",
        "Performance Optimization & Schema.org SEO",
      ],
      cta: "Explore Web Engineering",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      icon: Smartphone,
      title: "UI/UX & Digital Product Design",
      description:
        "Creating digital experiences that are intuitive, engaging, and conversion-oriented. We design interfaces that users love and that drive measurable business growth.",
      features: [
        "User Experience Research & Wireframing",
        "Interactive High-Fidelity Prototyping",
        "Scalable Design Systems & Component Libraries",
        "WCAG 2.1 AA Accessibility Standards",
      ],
      cta: "View Digital Design Services",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      icon: Palette,
      title: "Branding & Visual Identity Systems",
      description:
        "We craft distinctive brand identities that resonate with your audience and stand out in the market. From logos to complete brand systems, we ensure visual authority and market consistency.",
      features: [
        "Brand Strategy & Market Positioning",
        "Logo Design & Visual Identity Systems",
        "Comprehensive Brand Guidelines",
        "Packaging & Marketing Asset Design",
      ],
      cta: "Discover Branding Solutions",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
    {
      icon: Zap,
      title: "DevOps & Cloud Infrastructure",
      description:
        "Robust cloud architecture, automated CI/CD deployment pipelines, containerization, and security hardening to ensure your digital applications scale seamlessly with zero downtime.",
      features: [
        "CI/CD Pipeline Automation",
        "Docker & Kubernetes Containerization",
        "Cloud Deployment & Serverless Architecture",
        "Security Monitoring & Observability",
      ],
      cta: "Explore Cloud Infrastructure",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400",
    },
  ];
  
  const services = useMemo(() => SERVICES_DATA, []);

  return (
    <div className="min-h-screen bg-background text-white font-sans antialiased">
      <SEO
        title="Services &amp; Capabilities"
        description="Full-stack software engineering, UI/UX design, cloud architecture, and cinematic video production tailored for ambitious brands."
        path="/services"
        schema={[
          getServiceSchema(),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto text-center animate-fade-in">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">OUR EXPERTISE</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text">Transforming Visions Into Scalable Products</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            End-to-end digital solutions tailored to elevate your software platforms, video content, and brand authority.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300" asChild>
              <Link to="/contact" className="flex items-center">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full hover:bg-primary/10 transition-all duration-300" asChild>
              <Link to="/projects">View Video &amp; Project Showcase</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">SERVICES</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Specialized Capabilities</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Precision engineering and cinematic storytelling crafted to exceed your business growth benchmarks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-slide-up flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveService(service.title)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-8 space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${service.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-7 h-7 ${service.textColor}`} />
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-300">{service.title}</h2>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70">Key Deliverables:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-xs sm:text-sm">
                          <Check className={`w-4 h-4 mr-2 ${service.textColor} shrink-0`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-white/5">
                      <Link 
                        to="/contact" 
                        className={`inline-flex items-center text-sm font-medium ${service.textColor} hover:underline`}
                      >
                        {service.cta} <ArrowUpRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05_1px,transparent_1px),linear-gradient(135deg,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="container relative mx-auto max-w-5xl">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">OUR APPROACH</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              A collaborative, agile approach to delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />
            
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description:
                  "We analyze your goals, target audience, and technical specs through deep consultations.",
                icon: Search,
              },
              {
                step: "02",
                title: "Engineering & Production",
                description:
                  "Our team builds agile sprints, crafts high-retention video edits, and writes clean code.",
                icon: PenTool,
              },
              {
                step: "03",
                title: "Delivery & Growth",
                description:
                  "We deploy scalable platforms and release optimized video campaigns with continuous support.",
                icon: Rocket,
              },
            ].map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div
                  key={phase.step}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 text-center space-y-5 animate-slide-up hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-background border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 shadow-md z-10">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary/40 to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary-foreground transition-all duration-300">
                    {phase.step}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">{phase.title}</h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground">{phase.description}</p>
                  
                  <div className="pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff08_1px,transparent_1px),linear-gradient(135deg,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="container relative mx-auto text-center">
          <div className="max-w-3xl mx-auto bg-background/30 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-primary/20 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">Ready to Build Your Next Big Idea?</h2>
            <p className="text-lg sm:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Let's partner together to engineer high-converting digital products and viral video storytelling.
            </p>
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300" asChild>
              <Link to="/contact" className="flex items-center">
                Schedule a Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
