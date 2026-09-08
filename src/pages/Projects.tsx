import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Film, 
  Eye, 
  Heart, 
  Smartphone, 
  Flame, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Play, 
  Clock, 
  Tag, 
  ArrowRight, 
  Video,
  Code2,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { getBreadcrumbSchema, getVideoObjectSchema } from '../lib/structuredData';
import { reels, videos, type Reel, type VideoShowcase } from '../data/videos';

// Import local assets
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import Navigation from '../components/Navigation';
import BrandingIdentity from '../assets/BrandingIdentity.png';
import SocialMediaContent from '../assets/SocialMediaContent.png';
import UIUXProductDesign from '../assets/UIUXProductDesign.png';
import webdevelopment from '../assets/webdevelopment.png';
import shippingfullfilment from '../assets/shippingfullfilment.jpg';
import publicshop from '../assets/publicshop.jpg';
import poseai from '../assets/poseai.jpg';
import bakery from '../assets/bakery.jpeg';
import Footer from '../components/Footer';

// ============================================================================
// REUSABLE ANIMATED COMPONENTS
// ============================================================================

const AnimatedSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className = "", href = "#", onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
};

const TestimonialCard = ({ quote, author, role, image }: { quote: string; author: string; role: string; image?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-[#161616] to-[#0D0D0D] border border-white/10 rounded-2xl p-8 shadow-xl"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-lime-400 fill-lime-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <p className="text-white/70 leading-relaxed mb-6 text-lg italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center text-black font-bold">
          {image || author[0]}
        </div>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-white/40 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// PROJECT TESTIMONIAL CARD
// ============================================================================
const ProjectTestimonialCard = ({ project }: { project: any }) => {
  return (
    <Link to={`/case-study/${project.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl bg-[#161616] border border-white/10 hover:border-lime-400/40 transition-all duration-500 shadow-xl h-full cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lime-400 text-xs font-medium uppercase tracking-wider bg-lime-400/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
              {project.year && (
                <span className="text-white/40 text-xs font-medium">
                  {project.year}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
            
            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                  <span key={idx} className="text-[10px] font-medium text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="absolute bottom-20 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lime-400 text-xs font-medium flex items-center gap-1">
              View Case Study →
            </span>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-lime-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </Link>
  );
};

// ============================================================================
// PROJECT VIDEO CARD (Local Video / Interactive)
// ============================================================================
const ProjectVideoCard = ({ project, index }: { project: any; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Link to={`/case-study/${project.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -8 }}
        className="group rounded-2xl overflow-hidden bg-[#161616] border border-white/10 hover:border-lime-400/40 transition-all duration-300 cursor-pointer"
      >
        <div 
          className="relative aspect-[9/16] overflow-hidden bg-black"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            src={project.videoSrc}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loop
            muted
            playsInline
            preload="metadata"
          />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center shadow-2xl shadow-lime-400/40">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <div>
              <p className="text-lime-400 text-xs font-medium uppercase tracking-wider">{project.category}</p>
              <p className="text-white font-medium text-sm mt-1">{project.title}</p>
              <p className="text-lime-400 text-xs mt-1">View Case Study →</p>
            </div>
          </div>
          
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80">
              {project.category}
            </span>
          </div>
          
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-full bg-primary/80 backdrop-blur-sm border border-white/10 text-white">
              <Film className="w-3.5 h-3.5" /> Reel
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// ============================================================================
// REGULAR PROJECT CARD
// ============================================================================
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  if (project.isVideo) {
    return <ProjectVideoCard project={project} index={index} />;
  }

  return (
    <Link to={`/case-study/${project.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -8 }}
        className="group rounded-2xl overflow-hidden bg-[#161616] border border-white/10 hover:border-lime-400/40 transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <div>
              <p className="text-lime-400 text-xs font-medium uppercase tracking-wider">{project.category}</p>
              <p className="text-white font-medium text-sm mt-1">{project.title}</p>
              <p className="text-lime-400 text-xs mt-1">View Case Study →</p>
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80">
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// ============================================================================
// INTERACTIVE SLIDING CATEGORY BAR COMPONENT
// ============================================================================
const SlidingCategoryBar = ({
  categories,
  activeFilter,
  onSelect,
  reelsCount,
  videosCount,
}: {
  categories: string[];
  activeFilter: string;
  onSelect: (cat: string) => void;
  reelsCount: number;
  videosCount: number;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const slide = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    checkScroll();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCategoryClick = (category: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(category);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="relative max-w-7xl mx-auto flex items-center group/bar">
      {/* Left Slide Button */}
      <button
        onClick={() => slide('left')}
        disabled={!canScrollLeft}
        aria-label="Slide Left"
        className={`absolute -left-2 sm:left-0 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161616]/95 border border-white/20 hover:border-lime-400/60 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md ${
          canScrollLeft
            ? "opacity-100 hover:scale-110 hover:bg-lime-400 hover:text-black cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Left Gradient Fade */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent pointer-events-none z-10" />
      )}

      {/* Scrollable & Draggable Strip */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex items-center gap-2.5 overflow-x-auto py-1 px-4 sm:px-10 scrollbar-hide cursor-grab active:cursor-grabbing select-none w-full scroll-smooth"
      >
        {categories.map((category) => {
          const isActive = activeFilter === category;
          const count =
            category === "Social Media Reels"
              ? reelsCount
              : category === "Showcase Videos"
                ? videosCount
                : undefined;

          return (
            <button
              key={category}
              onClick={(e) => handleCategoryClick(category, e)}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-lime-400 text-black font-semibold shadow-[0_0_18px_rgba(163,230,53,0.35)] scale-[1.02]"
                  : "bg-[#161616] hover:bg-lime-400/10 border border-white/10 text-white/70 hover:text-white hover:border-white/20"
              }`}
            >
              <span>{category}</span>
              {typeof count === "number" && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-black/20 text-black font-bold" : "bg-white/10 text-white/60"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Gradient Fade */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent pointer-events-none z-10" />
      )}

      {/* Right Slide Button */}
      <button
        onClick={() => slide('right')}
        disabled={!canScrollRight}
        aria-label="Slide Right"
        className={`absolute -right-2 sm:right-0 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161616]/95 border border-white/20 hover:border-lime-400/60 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md ${
          canScrollRight
            ? "opacity-100 hover:scale-110 hover:bg-lime-400 hover:text-black cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

// ============================================================================
// SERVICE SECTION COMPONENT
// ============================================================================
const ServiceSection = ({ title, subtitle, description, image, features, index, imageLeft = true }: any) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
      index > 0 ? 'pt-20 border-t border-white/5' : ''
    }`}>
      {imageLeft ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-lime-400 text-sm font-mono tracking-wider uppercase">{subtitle}</span>
            <h3 className="text-3xl sm:text-4xl font-bold">{title}</h3>
            <p className="text-white/60 leading-relaxed">{description}</p>
            <div className="space-y-2 pt-2">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-white/70">
                  <span className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-lime-400" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-lime-400 text-sm font-mono tracking-wider uppercase">{subtitle}</span>
            <h3 className="text-3xl sm:text-4xl font-bold">{title}</h3>
            <p className="text-white/60 leading-relaxed">{description}</p>
            <div className="space-y-2 pt-2">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 text-white/70">
                  <span className="w-5 h-5 rounded-full bg-lime-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-lime-400" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full h-[400px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </>
      )}
    </div>
  );
};

// ============================================================================
// SOCIAL MEDIA REEL CARD COMPONENT (9:16 Vertical format)
// ============================================================================
const SocialReelCard = ({ reel, index }: { reel: Reel; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : reel.vimeoId || null;
  };

  const vimeoId = getVimeoId(reel.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl overflow-hidden bg-[#161616] border border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_25px_rgba(163,230,53,0.15)] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        {isPlaying && vimeoId ? (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=0&controls=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title={reel.title}
          />
        ) : (
          <div className="w-full h-full relative bg-neutral-950 flex items-center justify-center">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
              className="w-full h-full pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              frameBorder="0"
              title={reel.title}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-14 h-14 rounded-full bg-lime-400 flex items-center justify-center shadow-2xl shadow-lime-400/50 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white">
            <Smartphone className="w-3 h-3 text-lime-400" /> Reel (9:16)
          </span>
        </div>

        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-lime-400/20 backdrop-blur-md border border-lime-400/30 text-lime-400 font-medium">
            {reel.category}
          </span>
        </div>
      </div>

      <div className="p-4 bg-[#161616] border-t border-white/5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-lime-400 transition-colors line-clamp-1">
            {reel.title}
          </h3>
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-lime-400 transition-colors shrink-0 p-1"
            title="Watch on Vimeo"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
          {reel.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-white/50">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-lime-400/80" /> {reel.views || "2.5M"} views
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/40" /> {reel.likes || "150K"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// SHOWCASE VIDEO CARD COMPONENT (16:9 Horizontal Widescreen format)
// ============================================================================
const ShowcaseVideoCard = ({ video, index }: { video: VideoShowcase; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : video.vimeoId || null;
  };

  const vimeoId = getVimeoId(video.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#191919] to-[#121212] border border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {isPlaying && vimeoId ? (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=0&controls=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            title={video.title}
          />
        ) : (
          <div className="w-full h-full relative bg-neutral-950 flex items-center justify-center">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
              className="w-full h-full pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              frameBorder="0"
              title={video.title}
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center shadow-2xl shadow-lime-400/50 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-black ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white">
            <Film className="w-3.5 h-3.5 text-lime-400" /> 16:9 Production
          </span>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-lime-400/20 backdrop-blur-md border border-lime-400/30 text-lime-400">
            {video.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-lime-400 text-xs font-mono uppercase tracking-wider font-semibold">
              {video.category}
            </span>
            <span className="text-white/40 text-xs font-medium">16:9 Widescreen</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-lime-400 transition-colors leading-snug">
            {video.title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:border-lime-400/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-lime-400" /> {video.views || "1.5M"} views
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-400 fill-red-400/40" /> {video.likes || "80K"}
              </span>
            </div>

            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-lime-400 hover:text-black text-white/80 text-xs font-medium transition-all duration-300 border border-white/10 hover:border-lime-400"
            >
              Watch on Vimeo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN PROJECT DETAILS COMPONENT
// ============================================================================
const Projects = () => {
  const targetRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");
  const [animatedProjects, setAnimatedProjects] = useState<any[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const webDevImages = [
    webdevelopment,
    webdevelopment,
    webdevelopment,
  ];

  const brandingImages = [
    BrandingIdentity,
    BrandingIdentity,
    BrandingIdentity,
  ];

  const uxImages = [
    UIUXProductDesign,
    UIUXProductDesign,
    UIUXProductDesign,
  ];

  const socialMediaImages = [
    SocialMediaContent,
    SocialMediaContent,
    SocialMediaContent,
  ];

  // VIDEO REELS DATA - For UI/UX Design category local previews
  const videoReels = useMemo(() => [
    {
      id: "local-reel-1",
      title: "Interactive UI/UX Prototype Reel",
      category: "UI/UX Design",
      description: "Engaging UI/UX design showcase featuring smooth animations and interactive prototypes",
      image: video1,
      tags: ["UI/UX", "Animation", "Prototyping"],
      isVideo: true,
      videoSrc: video1,
      isReel: true
    },
    {
      id: "local-reel-2",
      title: "Design System & Micro-Interactions",
      category: "UI/UX Design",
      description: "Advanced UI/UX design patterns and micro-interactions demonstration",
      image: video2,
      tags: ["UI/UX", "Micro-interactions", "Design System"],
      isVideo: true,
      videoSrc: video2,
      isReel: true
    },
  ], []);

  // REGULAR PROJECTS DATA (Focused on Web, UI/UX, Branding, Social)
  const regularProjects = useMemo(() => [
    {
      id: "smart-logistics",
      title: "Smart Logistics Dashboard",
      category: "Web Development",
      description: "Real-time fleet management platform with GPS tracking and route optimization",
      image: webDevImages[0],
      tags: ["React", "Node.js", "Real-time"]
    },
    {
      id: "corporate-identity",
      title: "Modern Corporate Identity",
      category: "Branding & Identity",
      description: "Complete brand overhaul for a tech company including logo, colors, and guidelines",
      image: brandingImages[0],
      tags: ["Branding", "Identity", "Corporate"]
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      category: "UI/UX Design",
      description: "Intuitive user interface design for a high-traffic e-commerce platform",
      image: uxImages[0],
      tags: ["UI/UX", "E-commerce", "Mobile-first"]
    },
    {
      id: "social-campaign",
      title: "Social Media Campaign",
      category: "Social Media Handling",
      description: "Comprehensive social media strategy and content creation for brand awareness",
      image: socialMediaImages[0],
      tags: ["Social Media", "Content", "Engagement"]
    },
    {
      id: "corporate-website",
      title: "Corporate Website",
      category: "Web Development",
      description: "Modern, responsive corporate website design with seamless user experience",
      image: webDevImages[1],
      tags: ["Web Design", "Responsive", "Corporate"]
    },
  ], []);

  const allProjectsWithReels = useMemo(() => [
    ...regularProjects,
    ...videoReels,
  ], [regularProjects, videoReels]);

  // REAL DELIVERED PROJECTS DATA
  const realProjects = useMemo(() => [
    {
      id: 'bakery-faize',
      title: "Bakery Faize Nagina",
      category: "UI/UX Design",
      description: "Complete user experience overhaul for a leading e-commerce platform resulting in 45% increase in conversions.",
      image: bakery,
      tags: ["UI/UX", "E-commerce", "Conversion Optimization"],
      year: "2024"
    },
    {
      id: 'pose-ai',
      title: "Pose Ai",
      category: "AI Powered Pose Detection",
      description: "Real-time AI computer vision application for motion tracking and anatomical pose estimation.",
      image: poseai,
      tags: ["Detecting", "Pose", "AI Computer Vision"],
      year: "2024"
    },
    {
      id: 'public-shop',
      title: "Public Shop",
      category: "App Development",
      description: "IoT-enabled dashboard for smart bakery management with real-time analytics and device control.",
      image: publicshop,
      tags: ["IoT", "Dashboard", "Real-time"],
      year: "2023"
    },
    {
      id: 'lahore-plastic',
      title: "Lahore Plastic",
      category: "Shipping & Fulfillment",
      description: "Sustainable enterprise web system for industrial packaging and supply chain tracking.",
      image: shippingfullfilment,
      tags: ["Industrial", "Sustainable", "Supply Chain"],
      year: "2024"
    },
  ], []);

  // SERVICES DATA (Focused Core Services)
  const services = [
    {
      title: "Cinematic Video Production & Motion Graphics",
      subtitle: "01 — Video Storytelling",
      description: "From viral short-form reels to widescreen YouTube documentaries, we craft high-retention video edits with kinetic typography, 3D motion graphics, DaVinci Resolve color grading, and immersive sound design.",
      image: socialMediaImages[0],
      features: [
        "Viral 9:16 Social Media Reels & TikTok/Shorts editing",
        "16:9 Widescreen Documentary & YouTube Video Essays",
        "Alex Hormozi & Iman Gadzhi style motion graphic edits",
        "DaVinci Resolve Cinematic Color Grading & VFX",
        "Bespoke sound design, Foley & auditory retention mapping"
      ]
    },
    {
      title: "Web Development & Engineering",
      subtitle: "02 — Digital Solutions",
      description: "We build high-performance websites and web applications that deliver exceptional user experiences. From e-commerce platforms to complex enterprise solutions, we craft digital experiences that drive results.",
      image: webDevImages[2],
      features: [
        "Custom web development with React, Vite & Next.js",
        "Responsive design for all device viewports",
        "E-commerce solutions with payment gateway integrations",
        "CMS development for seamless content publishing",
        "Performance optimization & Schema.org SEO"
      ]
    },
    {
      title: "UI/UX & Digital Product Design",
      subtitle: "03 — User Experience",
      description: "Designing intuitive interfaces that users love. Our UX research and UI design process ensures your digital products are not just beautiful but also functional and conversion-oriented.",
      image: uxImages[1],
      features: [
        "User research, wireframing & prototyping",
        "Interactive prototypes & design systems",
        "User interface design with dark/light themes",
        "Accessibility (WCAG 2.1 AA) compliance",
        "Conversion rate optimization (CRO)"
      ]
    },
    {
      title: "Branding & Visual Identity Systems",
      subtitle: "04 — Brand Strategy",
      description: "We create powerful brand identities that resonate with your audience and stand out in the market. From logos to complete brand guidelines, we build brands that tell compelling stories.",
      image: brandingImages[1],
      features: [
        "Brand strategy & market positioning",
        "Logo design & visual identity systems",
        "Brand guidelines & comprehensive style guides",
        "Packaging design & merchandise design",
        "Brand messaging & tone of voice"
      ]
    },
    {
      title: "Social Media Handling & Growth",
      subtitle: "05 — Digital Engagement",
      description: "Building brand presence and engagement through strategic social media content creation and distribution that connects with target audiences and drives conversions.",
      image: socialMediaImages[1],
      features: [
        "Cross-platform content strategy & calendar",
        "Short-form video repurposing & viral hooks",
        "High-converting thumbnail & copy design",
        "Audience analytics & retention tracking",
        "Growth campaign management"
      ]
    }
  ];

  // FILTER BAR CATEGORIES
  const categories = useMemo(() => [
    "All",
    "Showcase Videos",
    "Social Media Reels",
    "Web Development",
    "UI/UX Design",
    "Branding & Identity",
    "Social Media Handling"
  ], []);

  const filteredProjects = useMemo(() => {
    if (filter === "All") {
      return regularProjects;
    } else if (filter === "Social Media Reels" || filter === "Showcase Videos") {
      return [];
    } else {
      return allProjectsWithReels.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase()));
    }
  }, [regularProjects, allProjectsWithReels, filter]);

  useEffect(() => {
    setAnimatedProjects([]);
    const timer = setTimeout(() => {
      if (filter === "Social Media Reels" || filter === "Showcase Videos") {
        setAnimatedProjects([]);
      } else {
        setAnimatedProjects(filteredProjects);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredProjects, filter]);

  const testimonials = [
    {
      quote: "From start to finish, they exceeded every expectation. Their video editing, cinematic color grading, and creative direction elevated our brand to an entirely new tier.",
      author: "Sarah Johnson",
      role: "CEO, Creative Labs"
    },
    {
      quote: "Our video engagement and brand identity skyrocketed. The team delivered flawless vertical reels and documentary-grade YouTube videos that drove phenomenal retention.",
      author: "Michael Chen",
      role: "Product Director, TechCorp"
    }
  ];

  const allVideoSchemas = useMemo(() => [
    ...reels.map((r) => ({
      name: r.title,
      description: r.description,
      thumbnailUrl: "/assets/SocialMediaContent.png",
      uploadDate: "2025-02-01T08:00:00+00:00",
      embedUrl: `https://player.vimeo.com/video/${r.vimeoId}`,
    })),
    ...videos.map((v) => ({
      name: v.title,
      description: v.description,
      thumbnailUrl: "/assets/SocialMediaContent.png",
      uploadDate: "2025-02-01T08:00:00+00:00",
      embedUrl: `https://player.vimeo.com/video/${v.vimeoId}`,
    }))
  ], []);

  return (
    <div className="bg-[#0D0D0D] text-white font-sans antialiased overflow-x-hidden">
      <SEO
        title="Projects &amp; Video Showcase"
        description="Explore our portfolio: high-retention 16:9 showcase videos, viral 9:16 reels, full-stack web platforms, and UI/UX product design."
        path="/projects"
        schema={[
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
          ]),
          ...getVideoObjectSchema(allVideoSchemas),
        ]}
      />

      <div className="fixed inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMzkuNSAwTDAgMzkuNSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] bg-repeat" />
      <div className="fixed inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-[#0D0D0D]/90" />

      <Navigation />

      <main className="relative z-10" ref={targetRef}>
        {/* ========== HERO SECTION ========== */}
        <section className="relative pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0D0D0D]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container relative mx-auto text-center">
            <StaggerContainer>
              <StaggerItem>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider text-lime-400 bg-lime-400/10 rounded-full border border-lime-400/20 shadow-[0_0_15px_rgba(163,230,53,0.15)]">
                  <Sparkles className="w-3.5 h-3.5" /> PORTFOLIO & VIDEO SHOWCASE
                </span>
              </StaggerItem>
              
              <StaggerItem>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text">
                  Our Work & Video Productions
                </h1>
              </StaggerItem>
              
              <StaggerItem>
                <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
                  Explore our curated showcase of cinematic 16:9 video productions, viral 9:16 social media reels, full-stack software applications, and digital design systems.
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ========== FILTER BAR (Slideable & Interactive) ========== */}
        <section className="py-5 px-4 sm:px-6 border-y border-white/5 backdrop-blur-md sticky top-0 z-30 bg-[#0D0D0D]/90 shadow-md">
          <SlidingCategoryBar
            categories={categories}
            activeFilter={filter}
            onSelect={setFilter}
            reelsCount={reels.length}
            videosCount={videos.length}
          />
        </section>

        {/* ========== MAIN CONTENT ACCORDING TO FILTER ========== */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* VIEW: SOCIAL MEDIA REELS (8 Vertical Reels) */}
          {filter === "Social Media Reels" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-lime-400 text-xs font-mono uppercase tracking-wider bg-lime-400/10 px-2.5 py-0.5 rounded-full">
                      9:16 Vertical Format
                    </span>
                    <span className="text-white/40 text-xs">• {reels.length} Videos</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Social Media Reels & Shorts</h2>
                  <p className="text-white/60 text-sm mt-1 max-w-2xl">
                    High-energy short-form video reels optimized for retention, kinetic motion, speed-ramps, and viral engagement across Instagram, TikTok, and YouTube Shorts.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-lime-400 text-sm font-medium px-4 py-2 bg-lime-400/10 rounded-full border border-lime-400/20 shrink-0">
                  <Flame className="w-4 h-4 text-lime-400" /> Trending Proof
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {reels.map((reel, idx) => (
                  <SocialReelCard 
                    key={reel.id} 
                    reel={reel}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SHOWCASE VIDEOS (9 Horizontal 16:9 Widescreen Videos) */}
          {filter === "Showcase Videos" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-lime-400 text-xs font-mono uppercase tracking-wider bg-lime-400/10 px-2.5 py-0.5 rounded-full">
                      16:9 Widescreen Format
                    </span>
                    <span className="text-white/40 text-xs">• {videos.length} Productions</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Featured Showcase Videos</h2>
                  <p className="text-white/60 text-sm mt-1 max-w-2xl">
                    In-depth widescreen YouTube documentaries, cash-cow video essays, talking-head masterclasses, wedding films, and luxury real estate cinematography.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-lime-400 text-sm font-medium px-4 py-2 bg-lime-400/10 rounded-full border border-lime-400/20 shrink-0">
                  <Film className="w-4 h-4 text-lime-400" /> 4K Master Grade
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {videos.map((video, idx) => (
                  <ShowcaseVideoCard 
                    key={video.id} 
                    video={video}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          )}

          {/* VIEW: CATEGORY FILTERED PROJECTS */}
          {filter !== "All" && filter !== "Social Media Reels" && filter !== "Showcase Videos" && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">{filter} Projects</h2>
                <p className="text-white/40 text-sm">Curated deliverables in {filter}</p>
              </div>

              {animatedProjects.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-white/40">
                  Loading projects...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {animatedProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: ALL */}
          {filter === "All" && (
            <div className="space-y-24">
              
              {/* 1. Regular Highlight Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Engineering & Design</h2>
                    <p className="text-white/50 text-sm mt-1">Full-stack web applications, real-time dashboards, and conversion design systems</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regularProjects.slice(0, 4).map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
              </div>

              {/* 2. Featured Showcase Videos (16:9 Section with Headings & Descriptions) */}
              <div className="pt-12 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lime-400 text-xs font-mono uppercase tracking-wider bg-lime-400/10 px-2.5 py-0.5 rounded-full">
                        16:9 Widescreen Productions
                      </span>
                      <span className="text-white/40 text-xs">• {videos.length} Videos Available</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Cinematic Showcase Videos
                    </h2>
                    <p className="text-white/60 text-sm mt-1 max-w-2xl">
                      Widescreen YouTube documentary edits, talking-head retention breakdowns, motion graphics, and commercial cinematography.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setFilter("Showcase Videos")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-400 text-black text-sm font-semibold hover:bg-lime-500 transition-all shadow-[0_0_20px_rgba(163,230,53,0.25)] shrink-0 self-start sm:self-auto"
                  >
                    View All {videos.length} Videos <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {videos.slice(0, 3).map((video, idx) => (
                    <ShowcaseVideoCard key={video.id} video={video} index={idx} />
                  ))}
                </div>
              </div>

              {/* 3. Viral Social Media Reels (9:16 Vertical Section) */}
              <div className="pt-12 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lime-400 text-xs font-mono uppercase tracking-wider bg-lime-400/10 px-2.5 py-0.5 rounded-full">
                        9:16 Vertical Reels & Shorts
                      </span>
                      <span className="text-white/40 text-xs">• {reels.length} Viral Reels</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Social Media Video Reels
                    </h2>
                    <p className="text-white/60 text-sm mt-1 max-w-2xl">
                      Fast-paced vertical edits with kinetic typography, paper textures, sound design, and speed-ramping.
                    </p>
                  </div>

                  <button
                    onClick={() => setFilter("Social Media Reels")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-400 text-black text-sm font-semibold hover:bg-lime-500 transition-all shadow-[0_0_20px_rgba(163,230,53,0.25)] shrink-0 self-start sm:self-auto"
                  >
                    View All {reels.length} Reels <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {reels.slice(0, 4).map((reel, idx) => (
                    <SocialReelCard key={reel.id} reel={reel} index={idx} />
                  ))}
                </div>
              </div>

            </div>
          )}

        </section>

        {/* ========== SERVICES SECTION ========== */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <AnimatedSection className="text-center mb-16" delay={0.1}>
            <span className="text-lime-400 text-sm font-mono tracking-wider uppercase">What We Deliver</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">Full-Spectrum Capabilities</h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Comprehensive creative technology, video production, and software engineering disciplines executed with meticulous craftsmanship.
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {services.map((service, index) => (
              <ServiceSection
                key={index}
                {...service}
                index={index}
                imageLeft={index % 2 === 0}
              />
            ))}
          </div>
        </section>

        {/* ========== REAL PROJECTS DELIVERED (2x2 Grid) ========== */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <AnimatedSection className="text-center mb-16" delay={0.1}>
            <span className="text-lime-400 text-sm font-mono tracking-wider uppercase">Portfolio Highlights</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">Real Projects We've Delivered</h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Each case study showcases our commitment to engineering excellence and aesthetic mastery across global clients.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {realProjects.map((project) => (
              <ProjectTestimonialCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ========== TESTIMONIALS SECTION ========== */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <AnimatedSection className="text-center mb-16" delay={0.1}>
            <span className="text-lime-400 text-sm font-mono tracking-wider uppercase">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">Why Clients Choose Us</h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">Hear from leaders and creators who have partnered with our studio.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </section>

        {/* ========== CTA BANNER ========== */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161616] via-[#1a1a1a] to-[#0D0D0D] border border-white/10 p-12 sm:p-16 text-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 via-transparent to-lime-400/10" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/20 rounded-full filter blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lime-400/10 rounded-full filter blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Ready to Produce Your Next <br />
                <span className="text-lime-400">Viral Video or Digital Platform</span>?
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
                Let's transform ambitious concepts into high-converting video productions and exceptional digital platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link to="/contact">
                  <MagneticButton
                    className="px-10 py-4 rounded-full bg-lime-400 text-black font-semibold hover:bg-lime-500 transition-all duration-300 shadow-2xl shadow-lime-400/30 text-lg cursor-pointer"
                  >
                    Start Your Project
                  </MagneticButton>
                </Link>
                <Link to="/contact">
                  <MagneticButton className="px-10 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg cursor-pointer">
                    Book a Discovery Call
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>

      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(13, 13, 13, 0.8) 100%);
        }
        .border-l-3 {
          border-left-width: 3px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0D0D0D;
        }
        ::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a3e635;
        }
      `}</style>
    </div>
  );
};

export default Projects;