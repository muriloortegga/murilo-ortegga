import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";
import { DraggableMarquee } from "@/components/draggable-marquee";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Murilo Ortega — Design Estratégico & Identidade de Marca" },
      { name: "description", content: "Design que confronta o comum e eleva o digital. Branding, conteúdo e presença digital conectados em um sistema de alto nível." },
      { property: "og:title", content: "Murilo Ortega — Design Estratégico & Identidade de Marca" },
      { property: "og:description", content: "Design que confronta o comum e eleva o digital. Branding, conteúdo e presença digital conectados em um sistema de alto nível." },
    ],
  }),
  component: HomePage,
});

const projects = [
  {
    name: "NaTrave App — O Ecossistema do Futebol Amador",
    category: "Social Media · 2024",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
  },
  {
    name: "Solid + — Fintech Identity & Systems",
    category: "Id Visual · 2024",
    image: "/solid-full.png",
    to: "/solid",
  },
  {
    name: "Kmillion — Inteligência Promocional",
    category: "Websites · 2024",
    image: "/assets/projects/thumbnails/kmillion.jpg",
    to: "/kmillion",
  },
];

const services = [
  {
    id: "branding",
    num: "01",
    title: "Estruturação de Marca",
    body: "Construção de identidades visuais e estratégias que elevam o valor percebido do seu negócio.",
    image: "/solid-full.png",
  },
  {
    id: "conteudo",
    num: "02",
    title: "Sistema de Conteúdo",
    body: "Linha editorial e narrativa que transforma sua presença digital em autoridade contínua.",
    image: "/assets/projects/thumbnails/natrave.jpg",
  },
  {
    id: "digital",
    num: "03",
    title: "Presença Digital",
    body: "Sites e interfaces que organizam a comunicação e facilitam a conversão, elevando o digital.",
    image: "/assets/projects/kmillion/website-scroll.gif",
  },
  {
    id: "impressa",
    num: "04",
    title: "Mídia Impressa",
    body: "Papelaria e materiais físicos que tangibilizam a qualidade da sua marca no mundo real.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "influencia",
    num: "05",
    title: "Marketing de Influência",
    body: "Conectando sua marca com creators que geram confiança e expandem seu alcance de forma autêntica.",
    image: "/assets/projects/evidive/thumbs/influencia.jpg",
  },
  {
    id: "ooh",
    num: "06",
    title: "Mídia OOH",
    body: "Campanhas externas e sinalização que dominam a paisagem urbana com impacto visual.",
    image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800&auto=format&fit=crop",
  },
];

const galleryImages = [
  "/assets/projects/thumbnails/symplice.jpg",
  "/assets/projects/thumbnails/social/kapyi.jpg",
  "/assets/projects/thumbnails/solid.jpg",
  "/assets/projects/thumbnails/natrave.jpg",
  "/assets/projects/thumbnails/kmillion.jpg",
  "/assets/projects/thumbnails/social/talk2buy.jpg",
  "/assets/projects/thumbnails/social/maxi.jpg",
  "/assets/projects/thumbnails/social/milgrows.jpg",
  "/assets/projects/thumbnails/social/evidive.jpg",
];

function HeroGallery() {
  return (
    <div className="hero-gallery">
      <div className="hero-gallery-track">
        {galleryImages.map((img, i) => (
          <div key={i} className="hero-gallery-item">
            <img src={img} alt={`Gallery ${i}`} className="rounded-xl transition-all duration-700" />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {galleryImages.map((img, i) => (
          <div key={`dup-${i}`} className="hero-gallery-item">
            <img src={img} alt={`Gallery Dup ${i}`} className="rounded-xl transition-all duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

const logoFiles = import.meta.glob("/src/assets/logos/*.{png,jpg,jpeg,svg,webp}", { eager: true, query: "?url", import: "default" });
const dynamicLogos = Object.entries(logoFiles).map(([path, url]) => {
  const name = path.split("/").pop()?.split(".")[0] || "";
  return { name, url: url as string };
});

const brands = [
  { name: "Symplice", id: "symplice" },
  { name: "NaTrave", id: "natrave" },
  { name: "Solid+", id: "solid" },
  { name: "Vogue", id: "vogue" },
  { name: "Natural Pure", id: "natural" },
  { name: "Tech Flow", id: "tech" },
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = (node: any) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
    }
  };

  return (
    <Link to={project.to} className="group">
      <figure 
        ref={cardRef}
        className="scroll-reveal project-card relative" 
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="media-wrap aspect-[4/3] rounded-2xl overflow-hidden border border-border/5">
          <ProjectMedia 
            src={isVisible && project.gif ? project.gif : project.image} 
            alt={project.name} 
            isVisible={isVisible}
            className="grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <figcaption className="mt-6 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1 block">{project.category}</span>
            <span className="font-bold text-lg leading-tight block uppercase tracking-tight">{project.name}</span>
          </div>
          <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
        </figcaption>
      </figure>
    </Link>
  );
}

function HomePage() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-0 lg:pb-0 overflow-hidden relative">
        <div className="site-container w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[80vh]">
            {/* Left side: Copy */}
            <div className="lg:pr-20 py-12 lg:py-0 relative z-10">
              <div
                style={{ 
                  transform: `translateY(${scrollY * 0.1}px)`,
                  opacity: Math.max(1 - scrollY * 0.003, 0),
                  filter: `blur(${scrollY > 20 ? Math.min((scrollY - 20) * 0.04, 12) : 0}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease-out'
                }}
              >
                <h1 className="anim-fade-in text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter uppercase">
                  Trabalho para transformar <br />
                  marcas comuns em marcas <br />
                  com <span className="text-secondary font-medium italic">impacto real</span>
                </h1>
                <p className="mt-8 text-base md:text-xl text-secondary leading-relaxed max-w-[600px] anim-fade-in delay-250 uppercase font-medium">
                  Design que confronta o comum e eleva o digital. Branding, conteúdo e presença digital conectados em um método infalível.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4 anim-fade-in delay-500" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <Link to="/trabalho" className="btn btn-hero-primary">
                  Ver Portfolio
                </Link>
                <Link to="/sobre" className="btn btn-hero-secondary">
                  Ver mais sobre mim
                </Link>
                <a href="/cv/curriculo.pdf" download className="btn btn-hero-secondary">
                  Baixar CV
                </a>
              </div>
            </div>

            {/* Right side: Gallery */}
            <div 
              className="relative h-[60vh] lg:h-screen w-full lg:w-[120%] lg:ml-8 overflow-hidden anim-fade-in delay-250 border-l border-border/10"
              style={{ 
                transform: `translateY(${scrollY * -0.05}px)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <HeroGallery />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="py-24 overflow-hidden border-t border-border/5">
        <div className="site-container mb-12">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter scroll-reveal">Marcas que já trabalhei</h3>
        </div>
        
        <DraggableMarquee 
          items={dynamicLogos.length > 0 ? dynamicLogos : brands.map(b => ({ name: b.name, url: "" }))} 
          baseVelocity={-1.5}
        />
      </section>

      {/* Positioning */}
      <section className="site-section border-t border-border bg-foreground text-background">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-10">
              <p className="scroll-reveal text-2xl md:text-3xl lg:text-4xl font-bold line-height-tight tracking-tighter uppercase leading-[0.95]">
                O problema não é falta de ação. É falta de estrutura em Marketing. <br/><br/>
                <span className="text-background/50">Atuo com empresas que cresceram pela qualidade do serviço, mas cuja marca não sustenta mais o nível que entregam.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="site-section border-t border-border relative z-10 bg-background">
        <div className="site-container">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl scroll-reveal">
              Processos e abordagens testadas e validadas, com mais de 8 anos de atuação
            </h2>
          </div>
          
          <MethodsSection />
        </div>
      </section>
    </div>
  );
}

function MethodsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const methods = [
    { slug: "estruturacao-de-marca", title: "Estrutura de Marca", preview: "Construção de identidades visuais e estratégias que elevam o valor percebido do seu negócio." },
    { slug: "sistema-de-conteudo", title: "Comunicação de Marca", preview: "Linha editorial e narrativa que transforma sua presença digital em autoridade contínua." },
    { slug: "presenca-digital", title: "Conversão de Marca", preview: "Sites e interfaces que organizam a comunicação e facilitam a conversão, elevando o digital." },
    { slug: "midia-impressa", title: "Autoridade de marca", preview: "Papelaria e materiais físicos que tangibilizam a qualidade da sua marca no mundo real." },
    { slug: "midia-ooh", title: "Percepção de Marca", preview: "Campanhas externas e sinalização que dominam a paisagem urbana com impacto visual." },
    { slug: "marketing-de-influencia", title: "Expansão de Marca", preview: "Conectando sua marca com creators que geram confiança e expandem seu alcance de forma autêntica." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 scroll-reveal">
      <div className="lg:col-span-7 flex flex-wrap gap-4 items-start content-start">
        {methods.map((m, i) => (
          <button 
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-6 py-4 border border-foreground rounded-full font-bold uppercase tracking-tighter text-sm transition-all ${activeIndex === i ? 'bg-foreground text-background' : 'hover:bg-foreground/5'}`}
          >
            {m.title}
          </button>
        ))}
      </div>
      <div className="lg:col-span-5 relative min-h-[250px]">
        {methods.map((m, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-all duration-500 ${activeIndex === i ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}
          >
            <div className="bg-card border border-border p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{m.title}</h3>
                <p className="text-secondary font-medium uppercase tracking-tight mb-8 leading-relaxed text-sm md:text-base">{m.preview}</p>
              </div>
              <div>
                <Link to={`/metodos/${m.slug}`} className="btn btn-hero-primary w-full md:w-auto">
                  Ver Mais
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
