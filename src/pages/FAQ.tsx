import { useMemo, useState } from "react";
import { Search, X, MessageSquare, ArrowRight, HelpCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/structuredData";

const FAQ = () => {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const faqs = useMemo(
    () => [
      {
        id: "services",
        category: "Services",
        question: "What core services does Inventor Design Studio provide?",
        answer:
          "We are a multidisciplinary creative technology studio providing end-to-end digital services: full-stack web and SaaS application development, UI/UX and product design, cinematic video production, 3D visualization, brand identity systems, and cloud infrastructure/DevOps.",
        topics: ["services", "capabilities"],
      },
      {
        id: "process",
        category: "Process",
        question: "What is your typical project workflow and process?",
        answer:
          "Our workflow follows 4 distinct stages: 1) Discovery & Research (defining objectives and technical specs), 2) Creative Strategy & Architecture (wireframes, prototypes, system architecture), 3) Production & Engineering (agile sprints, code builds, filming/editing), and 4) QA, Testing, Deployment & Optimization.",
        topics: ["process", "workflow"],
      },
      {
        id: "timeline",
        category: "Timelines",
        question: "How long do design and development projects usually take?",
        answer:
          "Project timelines depend on complexity. Brand identity and marketing websites typically take 3–6 weeks. Complex custom web applications, SaaS platforms, and full commercial film productions generally range from 8–16 weeks. We provide clear milestone roadmaps prior to kickoff.",
        topics: ["timeline", "duration"],
      },
      {
        id: "revisions",
        category: "Revisions",
        question: "What is your revision and feedback policy?",
        answer:
          "All project proposals include dedicated revision rounds at each milestone (concept, wireframe, high-fidelity UI, video rough cut, staging build). We conduct collaborative reviews via Figma and live staging environments to ensure your team is aligned before final release.",
        topics: ["revisions", "feedback"],
      },
      {
        id: "pricing",
        category: "Pricing Approach",
        question: "How do you structure your pricing and project estimates?",
        answer:
          "We offer transparent project-based fixed pricing with defined deliverables, as well as monthly dedicated retainer models for ongoing engineering, design, and content production. Each scope is detailed in a written agreement with no hidden costs.",
        topics: ["pricing", "payment"],
      },
      {
        id: "deliverables",
        category: "Deliverables",
        question: "What deliverables and IP ownership will we receive?",
        answer:
          "Upon final payment, full intellectual property rights, source code repositories (GitHub), production assets, design files (Figma), and master 4K video exports are 100% transferred to your company, complete with deployment documentation.",
        topics: ["deliverables", "ownership"],
      },
      {
        id: "communication",
        category: "Communication",
        question: "How do you handle day-to-day communication and updates?",
        answer:
          "We establish dedicated communication channels via Slack or Microsoft Teams, hold weekly progress syncs via Zoom/Google Meet, and provide asynchronous task tracking in Linear, Jira, or Notion.",
        topics: ["communication", "collaboration"],
      },
      {
        id: "kickoff",
        category: "Project Kickoff",
        question: "How quickly can we kick off a new project?",
        answer:
          "Once the initial discovery consultation is complete and the agreement is signed, we typically begin onboarding and stakeholder interviews within 3–5 business days.",
        topics: ["kickoff", "start"],
      },
      {
        id: "technologies",
        category: "Technology Stack",
        question: "What technical stacks and creative tools do you specialize in?",
        answer:
          "For software, we build with React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Docker, Kubernetes, and AWS/Vercel. For visual design and video production, we use Figma, Adobe Premiere Pro, After Effects, DaVinci Resolve, Cinema 4D, and Blender.",
        topics: ["technology", "tools"],
      },
      {
        id: "support",
        category: "Support & Maintenance",
        question: "Do you provide ongoing support after deployment?",
        answer:
          "Yes. We offer post-launch warranty support on all custom builds, along with proactive monthly maintenance retainers covering security updates, performance monitoring, SEO health, and ongoing feature enhancements.",
        topics: ["support", "maintenance"],
      },
    ],
    []
  );

  const popularTopics = [
    { id: "all", label: "All Topics" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process & Workflow" },
    { id: "timeline", label: "Timelines" },
    { id: "pricing", label: "Pricing & Terms" },
    { id: "deliverables", label: "Deliverables" },
    { id: "technology", label: "Tech Stack" },
    { id: "support", label: "Support" },
  ];

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesTopic =
        selectedTopic === "all" ||
        f.category.toLowerCase().includes(selectedTopic) ||
        f.topics.includes(selectedTopic);

      if (!query) return matchesTopic;

      const q = query.toLowerCase();
      const matchesQuery =
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.topics.join(" ").includes(q);

      return matchesTopic && matchesQuery;
    });
  }, [faqs, query, selectedTopic]);

  const faqSchema = useMemo(() => {
    return [
      getFAQSchema(faqs),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ]),
    ];
  }, [faqs]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about Inventor Design Studio services, engineering process, project timelines, deliverables, pricing, and ongoing support."
        path="/faq"
        schema={faqSchema}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-12 overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-lime-400/15 to-lime-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" /> QUESTIONS &amp; ANSWERS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about partnering with Inventor Design Studio on software development, UI/UX design, video production, and digital products.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Main Column */}
            <div className="lg:col-span-8">
              {/* Search Bar */}
              <div className="mb-6">
                <label htmlFor="faq-search" className="sr-only">
                  Search FAQs, topics, or keywords
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
                    <Search className="w-4 h-4 text-primary" />
                  </span>
                  <Input
                    id="faq-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search FAQs by question, stack, timeline..."
                    className="pl-11 pr-10 h-12 bg-card/60 border-border/60 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-card transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Topic Pills */}
              <div className="mb-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap border transition-all ${
                        selectedTopic === topic.id
                          ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20 font-semibold"
                          : "bg-card/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-card/80 hover:border-border"
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion FAQ List */}
              <section aria-label="FAQ Accordion">
                {filtered.length === 0 ? (
                  <div className="p-10 rounded-2xl bg-card/30 border border-border/50 text-center space-y-4">
                    <HelpCircle className="w-10 h-10 text-muted-foreground/50 mx-auto" />
                    <h3 className="font-semibold text-lg">No matching questions found</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      We couldn't find any questions matching "{query}". Try checking a different topic or message our team directly.
                    </p>
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link to="/contact">Ask Us Directly</Link>
                    </Button>
                  </div>
                ) : (
                  <Accordion type="single" collapsible defaultValue={filtered[0]?.id} className="space-y-4">
                    {filtered.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-border/40 bg-card/40 backdrop-blur-sm rounded-xl px-5 sm:px-6 data-[state=open]:border-primary/40 data-[state=open]:bg-card/70 transition-all shadow-sm"
                      >
                        <AccordionTrigger className="text-base sm:text-lg font-semibold hover:text-primary transition-colors py-4 text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          <p className="mb-4">{faq.answer}</p>
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {faq.category}
                            </span>
                            {faq.topics.map((t) => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 space-y-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Have a specific question?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Have an upcoming project with unique requirements? Our team is available for technical discussions and scope consultations.
                  </p>
                </div>
                <div className="pt-2 space-y-3">
                  <Button asChild className="w-full rounded-xl shadow-md shadow-primary/20">
                    <Link to="/contact" className="flex items-center justify-center gap-1.5">
                      Contact Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-xl border-border/60 hover:bg-card">
                    <Link to="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card/30 border border-border/40 text-xs text-muted-foreground space-y-2.5">
                <p className="font-semibold text-foreground text-sm">Response Time Guarantee</p>
                <p>All inquiries submitted through our contact form receive a direct response within 24 business hours.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
