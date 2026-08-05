import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";
import { DraggableMarquee } from "@/components/draggable-marquee";
import { ArrowRight, Download, Users, Globe2, MessageSquare, ClipboardList } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { routeSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = routeSeo({
      path: "/",
      title: "Murilo Ortega — Branding, Social Media e Presença Digital",
      description:
        "8 anos em branding, direção de arte, social media e presença digital. Disponível para posições remotas em Marketing, Branding e Design — e também para projetos sob demanda.",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Murilo Ortega",
            jobTitle: "Design Estratégico & Identidade de Marca",
            url: "https://murilo-ortegga.lovable.app/",
            sameAs: [
              "https://linkedin.com/in/muriloortega",
              "https://instagram.com/muriloortega",
              "https://behance.net/muriloortega",
            ],
          }),
        },
      ],
    };
  },
  component: HomePage,
});

// NOTE: mantido tal como estava — não usado na home hoje, preservado (regra: nada é apagado).
const projects = [
  {
    name: "NaTrave App - O Ecossistema do Futebol Amador",
    category: "Social Media · 2024",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
  },
  {
    name: "Solid + - Fintech Identity & Systems",
    category: "Id Visual · 2024",
    image: "/solid-full.png",
    to: "/solid",
  },
  {
    name: "Kmillion - Inteligência Promocional",
    category: "Websites · 2024",
    image: "/assets/projects/thumbnails/kmillion.jpg",
    to: "/kmillion",
  },
  {
    name: "Symplice - Facilitando o Complexo",
    category: "Id Visual · 2024",
    image: "/assets/projects/thumbnails/symplice.jpg",
    to: "/symplice",
  },
  {
    name: "Evidive - Social Media & Creators",
    category: "Social Media · 2024",
    image: "/assets/projects/thumbnails/social/evidive.jpg",
    to: "/evidive",
  },
  {
    name: "Talk2Buy - Conversão Conversacional",
    category: "Social Media · 2024",
    image: "/assets/projects/thumbnails/social/talk2buy.jpg",
    to: "/talk2buy",
  },
];

const services = [
  {
    id: "branding",
    num: "01",
    title: "Estruturação de Marca",
    body: "Sua marca precisa comunicar o que ela vale antes de abrir a boca. Aqui construo a identidade visual e o sistema de marca que fazem seu negócio parecer tão bom quanto ele é.",
    image: "/solid-full.png",
  },
  {
    id: "conteudo",
    num: "02",
    title: "Sistema de Conteúdo",
    body: "Postar sem estratégia é só barulho. Desenvolvo a linha editorial e a narrativa da sua marca para que cada peça de conteúdo construa algo, não apenas ocupe espaço no feed.",
    image: "/assets/projects/thumbnails/natrave.jpg",
  },
  {
    id: "digital",
    num: "03",
    title: "Presença Digital",
    body: "Seu site precisa trabalhar por você. Crio sites e interfaces que organizam sua comunicação, deixam claro o que você oferece e conduzem o visitante até a ação, sem deixar dúvida no caminho.",
    image: "/assets/projects/kmillion/website-scroll.gif",
  },
  {
    id: "impressa",
    num: "04",
    title: "Mídia Impressa",
    body: "A marca que só existe no digital tem metade do impacto. Desenvolvo tudo que faz seu negócio parecer sólido e profissional no mundo físico, da papelaria às apresentações institucionais que fecham negócios.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "influencia",
    num: "05",
    title: "Marketing de Influência",
    body: "Cuido de todo o processo: do casting ao briefing, da gestão dos creators à entrega final. Sua marca chega a novos públicos com a voz de quem eles já confiam, e sem você precisar gerenciar nada disso.",
    image: "/assets/projects/evidive/thumbs/influencia.jpg",
  },
  {
    id: "ooh",
    num: "06",
    title: "Mídia OOH",
    body: "Onde sua marca aparece fisicamente diz muito sobre quem ela é. Crio campanhas e sinalização OOH que colocam seu negócio no lugar certo, visto pelas pessoas certas.",
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

const galleryAlts = [
  "Símbolo do sistema visual Symplice",
  "Direção criativa social Kapyi",
  "Identidade visual Solid Plus",
  "Aplicação de marca NaTrave",
  "Website institucional Kmillion",
  "Peça social Talk2Buy",
  "Campanha Maxi Colégio",
  "Conteúdo educativo Milgrows",
  "Case social Evidive Creators",
];

function HeroGallery() {
  return (
    <div className="hero-gallery">
      <div className="hero-gallery-track">
        {galleryImages.map((img, i) => (
          <div key={i} className="hero-gallery-item">
            <img
              src={img}
              alt={galleryAlts[i] ?? "Peça de portfolio Murilo Ortega"}
              width={400}
              height={500}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="rounded-xl transition-all duration-700"
            />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {galleryImages.map((img, i) => (
          <div key={`dup-${i}`} className="hero-gallery-item" aria-hidden="true">
            <img
              src={img}
              alt=""
              width={400}
              height={500}
              loading="lazy"
              className="rounded-xl transition-all duration-700"
            />
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

// Contexto/resultado por cliente — usado na faixa logo abaixo da prova social (logos).
const socialProofContext = [
  { name: "NaTrave", note: "Ecossistema completo pro futebol amador" },
  { name: "Solid+", note: "Identidade para expansão internacional" },
  { name: "Symplice", note: "Sistema visual que simplifica o complexo" },
  { name: "Kapyi", note: "2,5 anos de liderança criativa em agência" },
  { name: "Milgrows", note: "Social media e educação em saúde" },
];

// Cases em destaque — narrativa problema → ação → resultado, copy baseada no conteúdo já existente nas páginas de cada projeto.
const featuredCases = [
  {
    name: "NaTrave",
    tag: "Branding & UX/UI",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
    problem: "O futebol amador não tinha um ecossistema à altura da paixão de quem joga.",
    result: "Construí a identidade e a experiência do app do zero — hoje uma comunidade viva, com o social como motor da tração inicial.",
  },
  {
    name: "Symplice",
    tag: "Naming & ID Visual",
    image: "/assets/projects/thumbnails/symplice.jpg",
    to: "/symplice",
    problem: "Uma marca corporativa precisava simplificar experiências digitais complexas para grandes clientes.",
    result: "Criei o naming e o sistema de identidade do zero — clareza como princípio de design.",
  },
  {
    name: "Maxi",
    tag: "Social Media & OOH",
    image: "/assets/projects/thumbnails/social/maxi.jpg",
    to: "/maxi",
    problem: "Uma instituição de ensino tradicional precisava equilibrar autoridade acadêmica com presença digital moderna.",
    result: "Assumi a direção de social media e das campanhas OOH — marca modernizada, com mais conexão com famílias e alunos.",
  },
  {
    name: "Solid+",
    tag: "Direção & ID Visual · Mercado Internacional",
    image: "/solid-full.png",
    to: "/solid",
    problem: "Uma fintech sediada no Reino Unido precisava traduzir tecnologia complexa em algo humano e acessível.",
    result: "Dirigi o naming, o símbolo e o sistema de identidade completo — pronta para expansão internacional.",
  },
  {
    name: "Kapyi",
    tag: "Direção Criativa",
    image: "/assets/projects/thumbnails/social/kapyi.jpg",
    to: "/kapyi",
    problem: "Uma agência precisava de consistência criativa em múltiplos projetos simultâneos.",
    result: "2,5 anos de liderança criativa — branding, copy e direção social com clareza visual e sofisticação.",
  },
];

// Reaproveita os mesmos ícones já usados em /sobre — versão condensada pra home.
const hardSkillsGlance = [
  { name: "Photoshop", logo: "/assets/about/logos/ps.png" },
  { name: "Illustrator", logo: "/assets/about/logos/ai.png" },
  { name: "Figma", logo: "/assets/about/logos/fi.png" },
  { name: "After Effects", logo: "/assets/about/logos/ae.png" },
  { name: "Premiere", logo: "/assets/about/logos/pr.png" },
  { name: "Claude AI", logo: "/assets/about/logos/claude.png" },
  { name: "GPT/Gemini", logo: "/assets/about/logos/gpt.png" },
  { name: "Lovable", logo: "/assets/about/logos/lovable.png" },
  { name: "Asana", logo: "/assets/about/logos/asana.png" },
  { name: "Notion", logo: "/assets/about/logos/notion.png" },
];

const softSkills = [
  { label: "Liderança criativa", icon: Users },
  { label: "Autonomia em time remoto assíncrono", icon: Globe2 },
  { label: "Comunicação estratégica com stakeholders", icon: MessageSquare },
  { label: "Gestão de múltiplos projetos em paralelo", icon: ClipboardList },
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
            className="transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <figcaption className="mt-6 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1 block">{project.category}</span>
 <span className="font-bold text-lg leading-tight block tracking-tight">{project.name}</span>
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
 <h1 className="anim-fade-in text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter ">
                  Trabalho para transformar <br />
                  marcas comuns em marcas <br />
                  com <span className="text-secondary font-medium italic">impacto real</span> — pronto para o meu próximo time.
                </h1>
 <p className="mt-8 text-base md:text-xl text-secondary leading-relaxed max-w-[600px] anim-fade-in delay-250 font-medium">
                  8 anos em branding, direção de arte, social media, conteúdo e presença digital. Hoje, aplico esse método dentro de um time remoto de Marketing, Branding ou Design.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-4 anim-fade-in delay-500" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <a href="/cv/curriculo-murilo-ortega.pdf" download className="btn btn-hero-primary flex items-center gap-2">
                  Baixar Currículo <Download size={16} />
                </a>
                <Link to="/trabalho" className="btn btn-hero-secondary">
                  Ver Portfolio Completo
                </Link>
                <Link to="/sobre" className="btn btn-arrow">
                  Sobre mim <span className="arrow" />
                </Link>
              </div>
            </div>

            {/* Right side: Photo */}
            <div
              className="relative h-[60vh] lg:h-screen w-full lg:w-[120%] lg:ml-8 overflow-hidden anim-fade-in delay-250 border-l border-border/10"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <ProjectMedia
                src="/assets/about/photos/hero-bg.jpg"
                alt="Murilo Ortega — Direção de Arte & Branding"
                className="w-full h-full object-cover object-[50%_15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background bg-foreground/80 backdrop-blur px-3 py-2 rounded-full inline-block">
                  Murilo Ortega — São Paulo, Brasil
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work preview strip (mesma galeria de antes, reposicionada) */}
      <section className="py-12 md:py-16 overflow-hidden">
        <div className="relative h-[22vh] md:h-[28vh] w-full">
          <HeroGallery />
        </div>
      </section>

      {/* Brand Marquee + contexto */}
      <section className="py-24 overflow-hidden border-t border-border/5">
        <div className="site-container mb-12">
 <h2 className="text-xl md:text-2xl font-bold tracking-tighter scroll-reveal">Marcas que já trabalhei</h2>
        </div>

        <DraggableMarquee
          items={dynamicLogos.length > 0 ? dynamicLogos : brands.map(b => ({ name: b.name, url: "" }))}
          baseVelocity={-3.0}
        />

        <div className="site-container mt-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 scroll-reveal">
            {socialProofContext.map((item) => (
              <div key={item.name} className="border-t border-border/20 pt-4">
                <span className="text-xs font-bold tracking-tight block mb-1">{item.name}</span>
                <span className="text-[11px] text-secondary leading-snug block">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="site-section border-t border-border bg-foreground text-background">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-10">
 <p className="scroll-reveal text-2xl md:text-3xl lg:text-4xl font-bold line-height-tight tracking-tighter leading-[1.1]">
                O problema não é falta de ação. É falta de estrutura em Marketing. <br/><br/>
                <span className="text-background/50">Atuo com marcas e times que cresceram pela qualidade do que entregam, mas cuja comunicação não sustenta mais o nível que merecem.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases em destaque */}
      <section className="site-section border-t border-border relative z-10 bg-background">
        <div className="site-container">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-3xl scroll-reveal">
              Cases em destaque
            </h2>
            <Link to="/trabalho" className="btn btn-arrow shrink-0">
              Ver todos os projetos <span className="arrow" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {featuredCases.map((project, index) => (
              <Link key={project.name} to={project.to} className="group">
                <figure
                  className="scroll-reveal relative"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/10 bg-off-white">
                    <ProjectMedia
                      src={project.image}
                      alt={project.name}
                      className="transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">{project.tag}</span>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />
                    </div>
                    <span className="font-bold text-xl leading-tight block tracking-tight mb-2">{project.name}</span>
                    <p className="text-sm text-secondary leading-relaxed">
                      <span className="text-foreground/70">{project.problem}</span> {project.result}
                    </p>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Competências */}
      <section className="site-section border-t border-border bg-off-white/50">
        <div className="site-container">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-3xl scroll-reveal">
              Competências
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            {/* Hard skills */}
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-6 block">
                Ferramentas
              </span>
              <div className="flex flex-wrap gap-4 mb-6">
                {hardSkillsGlance.map((tool) => (
                  <div key={tool.name} title={tool.name} className="w-14 h-14 md:w-16 md:h-16 bg-background flex items-center justify-center p-3 rounded-xl border border-border/10">
                    <img src={tool.logo} alt={`Logo do ${tool.name}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              <Link to="/sobre" className="btn btn-arrow">
                Ver todas as ferramentas <span className="arrow" />
              </Link>
            </div>

            {/* Soft skills */}
            <div className="lg:col-span-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-6 block">
                Como trabalho
              </span>
              <div className="flex flex-col gap-5">
                {softSkills.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 border-b border-border/10 pb-5">
                    <Icon size={18} className="text-secondary shrink-0" />
                    <span className="text-sm md:text-base font-bold tracking-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="site-section border-t border-border relative z-10 bg-background">
        <div className="site-container">
          <div className="mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-4 block scroll-reveal">
              Competências em prática
            </span>
 <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-4xl scroll-reveal">
              Processos e abordagens testadas e validadas, com mais de 8 anos de atuação
            </h2>
 <p className="mt-6 text-base md:text-lg text-secondary max-w-2xl scroll-reveal">
              As mesmas competências, aplicadas de duas formas: dentro de um time, com dono de produto e marca, ou como parceiro estratégico em projetos sob demanda.
            </p>
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
    { slug: "estruturacao-de-marca", title: "Estrutura de Marca", preview: "Sua marca precisa comunicar o que ela vale antes de abrir a boca. Aqui construo a identidade visual e o sistema de marca que fazem seu negócio parecer tão bom quanto ele é." },
    { slug: "sistema-de-conteudo", title: "Comunicação de Marca", preview: "Postar sem estratégia é só barulho. Desenvolvo a linha editorial e a narrativa da sua marca para que cada peça de conteúdo construa algo, não apenas ocupe espaço no feed." },
    { slug: "presenca-digital", title: "Conversão de Marca", preview: "Seu site precisa trabalhar por você. Crio sites e interfaces que organizam sua comunicação, deixam claro o que você oferece e conduzem o visitante até a ação, sem deixar dúvida no caminho." },
    { slug: "midia-impressa", title: "Autoridade de marca", preview: "A marca que só existe no digital tem metade do impacto. Desenvolvo tudo que faz seu negócio parecer sólido e profissional no mundo físico, da papelaria às apresentações institucionais que fecham negócios." },
    { slug: "midia-ooh", title: "Percepção de Marca", preview: "Onde sua marca aparece fisicamente diz muito sobre quem ela é. Crio campanhas e sinalização OOH que colocam seu negócio no lugar certo, visto pelas pessoas certas." },
    { slug: "marketing-de-influencia", title: "Expansão de Marca", preview: "Cuido de todo o processo: do casting ao briefing, da gestão dos creators à entrega final. Sua marca chega a novos públicos com a voz de quem eles já confiam, e sem você precisar gerenciar nada disso." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 scroll-reveal">
      <div className="lg:col-span-7 flex flex-wrap gap-4 items-start content-start">
        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
 className={`px-6 py-4 border border-foreground rounded-full font-bold tracking-tighter text-sm transition-all ${activeIndex === i ? 'bg-foreground text-background' : 'hover:bg-foreground/5'}`}
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
            <Link to={`/metodos/${m.slug}` as string} className="block bg-card hover:bg-card/80 transition-colors border border-border p-8 rounded-2xl h-full flex flex-col justify-between group">
              <div>
                <h3 className="text-2xl font-bold tracking-tighter mb-4 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-secondary font-medium tracking-tight mb-8 leading-relaxed text-sm md:text-base">{m.preview}</p>
              </div>
              <div>
                <span className="btn btn-hero-primary w-full md:w-auto inline-block text-center">
                  Ver Mais
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
