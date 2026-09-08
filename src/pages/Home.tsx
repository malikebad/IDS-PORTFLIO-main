import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Code2, 
  Video, 
  Zap, 
  TrendingUp, 
  Users2, 
  Github, 
  Globe, 
  ExternalLink, 
  ArrowUpRight,
  Film,
  Smartphone,
  Eye,
  Heart,
  Flame,
  Check,
  Bot,
  ShieldCheck,
  Search,
  Cpu,
  Layers,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { reels, videos, type Reel, type VideoShowcase } from "@/data/videos";
import videoProjectImg from "@/assets/project-architecture-1.jpg";
import brand from "@/assets/brand.mp4";
import aiProjectImg from "@/assets/poseai.jpg";
import brandingProject from "@/assets/SocialMediaContent.png";
import digitalProject from "@/assets/publicshop.jpg";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ============================================================================
// HOME VIDEO CARD (16:9 Horizontal)
// ============================================================================
const HomeShowcaseVideoCard = ({ video, index }: { video: VideoShowcase; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl overflow-hidden bg-[#161616] border border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {isPlaying ? (
          <iframe
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&loop=1&muted=0&controls=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title={video.title}
          />
        ) : (
          <div className="w-full h-full relative bg-neutral-950 flex items-center justify-center">
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
              className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              frameBorder="0"
              title={video.title}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-lime-400 flex items-center justify-center shadow-2xl shadow-lime-400/50 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-black ml-1" />
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white">
            <Film className="w-3.5 h-3.5 text-lime-400" /> 16:9 Production
          </span>
        </div>

        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-lime-400/20 backdrop-blur-md border border-lime-400/30 text-lime-400">
            {video.category}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-lime-400 transition-colors leading-snug">
            {video.title}
          </h3>
          <p className="text-white/65 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-lime-400" /> {video.views || "1.4M"}
          </span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-lime-400 flex items-center gap-1 transition-colors"
          >
            Vimeo <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// HOME REEL CARD (9:16 Vertical)
// ============================================================================
const HomeReelCard = ({ reel, index }: { reel: Reel; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden bg-[#161616] border border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_25px_rgba(163,230,53,0.15)] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        {isPlaying ? (
          <iframe
            src={`https://player.vimeo.com/video/${reel.vimeoId}?autoplay=1&loop=1&muted=0&controls=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title={reel.title}
          />
        ) : (
          <div className="w-full h-full relative bg-neutral-950 flex items-center justify-center">
            <iframe
              src={`https://player.vimeo.com/video/${reel.vimeoId}?autoplay=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
              className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              frameBorder="0"
              title={reel.title}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center shadow-2xl shadow-lime-400/50 group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-black fill-black ml-0.5" />
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-2.5 left-2.5 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white">
            <Smartphone className="w-3 h-3 text-lime-400" /> Reel
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 pointer-events-none z-10">
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-lime-400/20 backdrop-blur-md border border-lime-400/30 text-lime-400">
            {reel.category}
          </span>
        </div>
      </div>

      <div className="p-3.5 space-y-1.5 bg-[#161616] border-t border-white/5">
        <h4 className="text-white font-semibold text-xs sm:text-sm group-hover:text-lime-400 transition-colors line-clamp-1">
          {reel.title}
        </h4>
        <div className="flex items-center justify-between text-[10px] text-white/50 pt-1 border-t border-white/5">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-lime-400" /> {reel.views || "2.5M"}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400 fill-red-400/30" /> {reel.likes || "140K"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, awards: 0 });
  const [videoTab, setVideoTab] = useState<"showcase" | "reels">("showcase");
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<Record<number, {rx:number, ry:number}>>({});
  
  // Mouse position tracker for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const start = Date.now();
            
            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - start) / duration, 1);
              
              setCounters({
                projects: Math.floor(150 * progress),
                clients: Math.floor(50 * progress),
                years: Math.floor(12 * progress),
                awards: Math.floor(10 * progress)
              });
              
              if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: "SaaS E‑commerce Platform",
      category: "Software Engineering",
      image: digitalProject,
      tags: ["Next.js", "Node.js", "SaaS"]
    },
    {
      id: 2,
      title: "AI Analytics Dashboard",
      category: "Product Engineering",
      image: aiProjectImg,
      tags: ["TypeScript", "Tailwind", "Charts"]
    },
    {
      id: 3,
      title: "Cinematic Brand Film",
      category: "Video Production",
      image: videoProjectImg,
      video: brand,
      tags: ["4K", "Drone", "VFX"]
    },
    {
      id: 4,
      title: "Launch Teaser Reel",
      category: "Content Studio",
      image: brandingProject,
      tags: ["Motion", "Editing", "Sound Design"]
    },
  ];

  const capabilities = [
    {
      icon: Bot,
      title: "Agentic AI & Custom LLMs",
      description: "Autonomous AI agents, LangChain/LlamaIndex multi-agent orchestration, RAG knowledge retrieval engines, and bespoke LLM fine-tuning.",
      color: "from-lime-400 to-lime-500",
      tags: ["Autonomous Agents", "Custom LLMs", "RAG Pipelines", "Cognitive AI"]
    },
    {
      icon: ShieldCheck,
      title: "Networking & Cyber Security",
      description: "Zero-Trust network architecture, firewall hardening, encrypted microservices, continuous threat monitoring, and vulnerability defense.",
      color: "from-lime-400 to-lime-500",
      tags: ["Zero Trust", "Firewall Hardening", "Encrypted APIs", "Threat Defense"]
    },
    {
      icon: Search,
      title: "Advanced SEO & Generative Engine Optimization",
      description: "Programmatic SEO architectures, Schema.org graph markup, Core Web Vitals optimization, and generative AI search indexing (GEO).",
      color: "from-lime-400 to-lime-500",
      tags: ["AI Search / GEO", "Programmatic SEO", "Schema Graphs", "SERP Authority"]
    },
    {
      icon: Zap,
      title: "Cloud Infrastructure & DevOps",
      description: "High-availability Kubernetes clusters, Docker containerization, automated CI/CD pipelines, multi-cloud AWS/GCP, and 99.99% uptime architectures.",
      color: "from-lime-400 to-lime-500",
      tags: ["Kubernetes", "Docker CI/CD", "AWS/GCP Cloud", "Auto-Scaling"]
    },
    {
      icon: Code2,
      title: "Full-Stack Web & SaaS Engineering",
      description: "Modern high-performance React/Next.js architectures, TypeScript microservices, real-time WebSocket systems, and scalable distributed databases.",
      color: "from-lime-400 to-lime-500",
      tags: ["Next.js / React", "TypeScript", "Microservices", "Scalable SaaS"]
    },
    {
      icon: Video,
      title: "Cinematic Video Production & CG VFX",
      description: "4K commercial films, DaVinci Resolve color grading, 2D/3D VFX, high-retention viral social reels, and auditory sound design.",
      color: "from-lime-400 to-lime-500",
      tags: ["4K Master Grade", "DaVinci Color", "3D VFX", "Viral Reels (9:16)"]
    },
  ];

  return (
    <div className="min-h-screen bg-background text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Software &amp; Video Production Studio"
        description="Inventor Design Studio crafts scalable software, modern UI/UX design, and cinematic video production for innovative brands worldwide."
        path="/"
      />
      <Navigation />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24"
      >
        {/* Animated background with grid */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px] lg:bg-[size:60px_60px]" />
          
          {/* Animated gradient orbs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/3 left-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-lime-400/20 to-lime-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-1/3 right-1/3 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-zinc-600/20 to-zinc-400/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-2 sm:px-4 md:px-6 max-w-6xl mx-auto">
          {/* Trusted By */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 md:mb-8 lg:mb-12"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3 md:mb-4">Trusted by teams at</p>
            <div className="relative overflow-hidden w-full">
              <div className="flex justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 md:gap-4 opacity-70">
                {["FinTech Co.", "HealthAI", "RetailCloud", "StudioX", "CinePro", "DataForge"].map((partner) => (
                  <motion.span 
                    key={partner}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 text-xs sm:text-sm text-foreground/70"
                  >
                    {partner}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4 lg:mb-6"
          >
            <span className="block mb-1 sm:mb-2">Ship Faster.</span>
            <span className="relative inline-block">
              Scale Smarter.
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-lime-400 via-lime-500 to-lime-400 opacity-20 blur-sm animate-pulse" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed px-1 sm:px-2 md:px-4"
          >
            Creative technology & video production studio: Full-stack engineering and cloud systems alongside high-retention documentary edits, motion graphics, and viral video reels.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              variant="default" 
              asChild 
              className="group shadow-lg hover:shadow-2xl hover:shadow-lime-400/20 w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 rounded-full transform hover:scale-105 transition-all duration-300 bg-lime-400 text-black hover:bg-lime-500 font-semibold"
            >
              <Link to="/projects">
                Explore Video Showcase
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="group border-2 hover:border-lime-400 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-6 rounded-full hover:bg-lime-400/10 transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/projects">
                <Play className="mr-2 w-4 h-4 text-lime-400 fill-lime-400" />
                Watch Viral Reels
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats with animated counters */}
      <section>
        <div className="container mx-auto">
          <div 
            id="stats-section"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 pt-6 sm:pt-8 md:pt-12 border-t border-border/50 px-1 sm:px-2 md:px-4 max-w-4xl mx-auto"
          >
            <div className="text-center px-1 sm:px-2">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-lime-400 mb-1 transition-all duration-300">
                {counters.projects}+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="text-center px-1 sm:px-2">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-lime-400 mb-1 transition-all duration-300">
                {counters.clients}+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center px-1 sm:px-2">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-lime-400 mb-1 transition-all duration-300">
                {counters.years}+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center px-1 sm:px-2">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-lime-400 mb-1 transition-all duration-300">
                {counters.awards}+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Award Wins</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED CINEMATIC VIDEO & REELS SHOWCASE SECTION ON HOME */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[#121212]/50 to-transparent">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-lime-400 bg-lime-400/10 rounded-full border border-lime-400/20">
                <Flame className="w-3.5 h-3.5" /> CINEMATIC VIDEO PRODUCTION
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Featured Video Showcase &amp; Reels
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
                Explore our widescreen documentary edits, high-retention talking heads, and viral vertical reels crafted for global creators and enterprise brands.
              </p>
            </div>

            {/* Tab switch button */}
            <div className="flex items-center gap-2 bg-[#161616] p-1.5 rounded-full border border-white/10 self-start md:self-auto">
              <button
                onClick={() => setVideoTab("showcase")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                  videoTab === "showcase"
                    ? "bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Film className="w-4 h-4" /> 16:9 Showcase ({videos.length})
              </button>
              <button
                onClick={() => setVideoTab("reels")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                  videoTab === "reels"
                    ? "bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Smartphone className="w-4 h-4" /> 9:16 Reels ({reels.length})
              </button>
            </div>
          </div>

          {/* Render Active Tab */}
          {videoTab === "showcase" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.slice(0, 6).map((video, idx) => (
                <HomeShowcaseVideoCard key={video.id} video={video} index={idx} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {reels.map((reel, idx) => (
                <HomeReelCard key={reel.id} reel={reel} index={idx} />
              ))}
            </div>
          )}

          <div className="text-center mt-12 sm:mt-16">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full px-8 py-6 border-lime-400/30 hover:border-lime-400 hover:bg-lime-400/10 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-lime-400/20"
            >
              <Link to="/projects">
                Explore All 17 Videos &amp; Case Studies
                <ArrowRight className="ml-2 w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Company Info Strip */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-border/50 py-6 text-center text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Industry</p>
              <p className="font-semibold">Technology, Information & Internet</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Location</p>
              <p className="font-semibold">Fort Worth, Texas</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Followers</p>
              <p className="font-semibold">127+</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Team Size</p>
              <p className="font-semibold">11–50 employees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">What We Do</h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Full‑stack web apps, SaaS platforms, and cinematic films — crafted end‑to‑end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={capability.title}
                className="group relative p-6 sm:p-8 bg-card border border-border rounded-3xl hover:border-primary/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 animate-slide-up creative-shadow overflow-hidden flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                    <capability.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 relative z-10 group-hover:text-primary transition-colors">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed relative z-10 group-hover:text-foreground/90 transition-colors mb-6">
                    {capability.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {capability.tags.map((tag: string, tIdx: number) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:border-primary/30 group-hover:text-primary transition-colors font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Featured Work</h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Work that blends robust software engineering with cinematic video storytelling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to="/projects"
                  className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover-scale creative-shadow will-change-transform block"
                  onMouseMove={(e) => {
                    const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rx = ((y / rect.height) - 0.5) * -6;
                    const ry = ((x / rect.width) - 0.5) * 6;
                    setTilt((t) => ({ ...t, [index]: { rx, ry } }));
                  }}
                  onMouseLeave={() => {
                    setTilt((t) => ({ ...t, [index]: { rx: 0, ry: 0 } }));
                  }}
                  style={{
                    transform: tilt[index] ? `perspective(900px) rotateX(${tilt[index].rx}deg) rotateY(${tilt[index].ry}deg)` : undefined,
                    transition: 'transform 200ms ease-out'
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {"video" in project && project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:via-black/60 transition-all duration-700" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 transition-all duration-500 rounded-3xl" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1.5 text-xs font-medium bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 text-primary group-hover:bg-primary/30 group-hover:scale-105 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-lime-400 mb-2 group-hover:text-lime-300 transition-colors">
                      {project.category}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lime-300 group-hover:to-lime-500 transition-all duration-500">
                      {project.title}
                    </h3>
                  </div>

                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 shadow-lg shadow-lime-400/40">
                    <ArrowRight className="w-6 h-6 text-black" />
                  </div>

                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8 sm:mt-12 md:mt-16"
          >
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="group border-2 hover:border-primary hover:bg-primary/10 text-sm sm:text-base px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
            >
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">What Clients Say</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">Results, not promises. Here's why partners choose us again.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "They shipped our SaaS MVP in 6 weeks and it scaled to 50k users with zero downtime.",
                name: "Amir Khan",
                role: "CTO, FinTech Co.",
              },
              {
                quote: "The brand film lifted our conversion rate by 38%. World‑class storytelling.",
                name: "Sara Malik",
                role: "Head of Marketing, HealthAI",
              },
              {
                quote: "Clear process, clean code, and on‑time delivery. Best vendor experience we’ve had.",
                name: "David Lee",
                role: "Product Lead, RetailCloud",
              },
            ].map((t, i) => (
              <div key={i} className="p-6 sm:p-8 bg-card border border-border rounded-3xl creative-shadow hover:scale-[1.01] transition-transform">
                <p className="text-base sm:text-lg leading-relaxed mb-6">“{t.quote}”</p>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.name}</span> • {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-lime-500/30 via-lime-400/10 to-zinc-700/40">
            <div className="relative overflow-hidden rounded-[calc(theme(borderRadius.2xl)-1px)] sm:rounded-[calc(theme(borderRadius.3xl)-1px)] border border-border bg-gradient-to-br from-lime-400/10 via-transparent to-zinc-900 p-6 sm:p-8 md:p-12 creative-shadow">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Ready to outpace the competition?</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 md:mb-8">Let's build a product that performs and a story that sells. Start with a free strategy call.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild className="rounded-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base bg-lime-400 text-black hover:bg-lime-500 font-semibold">
                    <Link to="/contact">Book Strategy Call</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-2 text-sm sm:text-base">
                    <Link to="/projects">See Video Showcase</Link>
                  </Button>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 sm:w-48 md:w-72 h-36 sm:h-48 md:h-72 rounded-full bg-lime-400/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-card/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
        
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-lime-400/15 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-zinc-600/15 to-zinc-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center animate-fade-in px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-12">
              Where Code Meets
              <br />
              <span className="text-gradient-purple-blue relative inline-block">
                <span className="relative z-10">Creative Vision</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-lime-400/25 via-lime-500/25 to-lime-400/25 blur-lg animate-pulse" />
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              We believe the future of digital experiences lies at the intersection of cutting-edge 
              technology and compelling storytelling. Our multidisciplinary team brings together software 
              engineers, creative directors, and visual artists to craft experiences that don't just 
              function—they inspire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="default" 
                asChild 
                className="group shadow-xl hover:shadow-2xl hover:shadow-lime-400/30 text-sm sm:text-base px-8 sm:px-10 py-6 rounded-full transform hover:scale-105 transition-all duration-300 bg-lime-400 text-black hover:bg-lime-500 font-semibold"
              >
                <Link to="/about" className="flex items-center">
                  Learn More About Us
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
