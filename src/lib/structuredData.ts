// JSON-LD Structured Data Generators for Schema.org SEO & AI-Search Visibility

export const BASE_URL = "https://inventordesignstudio.io";
export const BRAND_NAME = "Inventor Design Studio";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: BRAND_NAME,
  alternateName: ["IDS", "Inventor Studio", "INVENTER Design Studio"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    caption: BRAND_NAME,
    width: "512",
    height: "512",
  },
  image: `${BASE_URL}/logo.png`,
  description:
    "Leading creative technology studio specializing in software development, UI/UX design, video production, and digital experiences.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Floor, Plaza No. 8, H, A4, Commercial Area Block H Valencia",
    addressLocality: "Lahore",
    postalCode: "54000",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-370-4441788",
    contactType: "customer service",
    email: "info@inventordesignstudio.io",
    availableLanguage: ["English", "Urdu"],
  },
  hasMap: "https://maps.app.goo.gl/vYfa48yTxy26Z9ucA",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "19:00",
      closes: "04:30"
    }
  ],
  sameAs: [
    "https://github.com",
    "https://linkedin.com",
    "https://instagram.com",
    "https://youtube.com",
  ],
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: BRAND_NAME,
  description:
    "Creative technology studio bridging software engineering, UI/UX product design, and cinematic video storytelling.",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  inLanguage: "en-US",
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Creative Technology & Software Development",
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Studio Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agentic AI & Custom LLMs",
          description: "Autonomous AI agents, LangChain/LlamaIndex multi-agent orchestration, RAG retrieval engines, and bespoke LLM fine-tuning.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Networking & Cyber Security",
          description: "Zero-Trust network architecture, firewall hardening, encrypted microservices, continuous threat monitoring, and vulnerability defense.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Advanced SEO & Generative Engine Optimization (GEO)",
          description: "Programmatic SEO architectures, Schema.org graph markup, Core Web Vitals optimization, and generative AI search indexing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Infrastructure & DevOps",
          description: "High-availability Kubernetes clusters, Docker containerization, automated CI/CD pipelines, multi-cloud AWS/GCP, and 99.99% uptime architectures.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-Stack Web & SaaS Engineering",
          description: "Modern high-performance React/Next.js architectures, TypeScript microservices, real-time WebSocket systems, and scalable distributed databases.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cinematic Video Production & CG VFX",
          description: "4K commercial films, DaVinci Resolve color grading, 2D/3D VFX, viral social reels, and auditory sound design.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding & Visual Identity Systems",
          description: "Logo systems, typography, brand guidelines, and multi-channel creative direction.",
        },
      },
    ],
  },
});

export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
  })),
});

export interface VideoSchemaItem {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 format e.g. "PT1M30S"
}

export const getVideoObjectSchema = (videos: VideoSchemaItem | VideoSchemaItem[]) => {
  const items = Array.isArray(videos) ? videos : [videos];
  return items.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl.startsWith("http") ? video.thumbnailUrl : `${BASE_URL}${video.thumbnailUrl}`,
    uploadDate: video.uploadDate,
    ...(video.contentUrl ? { contentUrl: video.contentUrl.startsWith("http") ? video.contentUrl : `${BASE_URL}${video.contentUrl}` } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.duration ? { duration: video.duration } : {}),
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  }));
};

export interface ImageSchemaItem {
  name: string;
  description: string;
  contentUrl: string;
}

export const getImageObjectSchema = (images: ImageSchemaItem | ImageSchemaItem[]) => {
  const items = Array.isArray(images) ? images : [images];
  return items.map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: img.name,
    description: img.description,
    contentUrl: img.contentUrl.startsWith("http") ? img.contentUrl : `${BASE_URL}${img.contentUrl}`,
    creator: {
      "@id": `${BASE_URL}/#organization`,
    },
  }));
};
