import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, ArrowUpRight, Cpu, ClipboardList, Zap } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Mim — Murilo Ortega — Design Estratégico & Identidade de Marca" },
      { name: "description", content: "8 anos de experiência transformando marcas através de dados, criatividade e estratégia." },
    ],
  }),
  component: SobrePage,
});

const designTools = [
  { name: "Photoshop", logo: "/assets/about/logos/ps.png" },
  { name: "Illustrator", logo: "/assets/about/logos/ai.png" },
  { name: "After Effects", logo: "/assets/about/logos/ae.png" },
  { name: "Figma", logo: "/assets/about/logos/fi.png" },
  { name: "Canva", logo: "/assets/about/logos/cv.png" },
  { name: "Capcut", logo: "/assets/about/logos/cc.png" },
  { name: "Premiere", logo: "/assets/about/logos/pr.png" },
];

const aiTools = [
  { name: "Claude AI", logo: "/assets/about/logos/claude.png", desc: "Refinamento de narrativas e análise crítica" },
  { name: "Antigravity", logo: "/assets/about/logos/antigravity.png", desc: "Desenvolvimento e performance digital" },
  { name: "Lovable", logo: "/assets/about/logos/lovable.png", desc: "Criação ágil de landing pages e interfaces" },
  { name: "Manus AI", logo: "/assets/about/logos/manus.png", desc: "Organização e automação de fluxos" },
  { name: "GPT/Gemini", logo: "/assets/about/logos/gpt.png", desc: "Copywriting e lapidação de textos" },
  { name: "VEO3", logo: "/assets/about/logos/veo3.png", desc: "Geração e elevação visual" },
];

const managementTools = [
  { name: "Asana", logo: "/assets/about/logos/asana.png", desc: "Gestão de projetos e prazos" },
  { name: "Trello", logo: "/assets/about/logos/trello.png", desc: "Organização ágil de fluxos" },
  { name: "Notion", logo: "/assets/about/logos/notion.png", desc: "Base de conhecimento estratégica" },
];

const brands = [
  { 
    id: "symplice", 
    name: "Symplice", 
    desc: "Facilitando experiências digitais para grandes corporações através de um sistema de marca focado em clareza.",
    tag: "Naming & ID Visual",
    to: "/symplice"
  },
  { 
    id: "natrave", 
    name: "NaTrave", 
    desc: "O futebol amador elevado ao nível de elite. Plataforma completa com foco em UX/UI e comunidade.",
    tag: "Branding & UX/UI",
    to: "/natrave"
  },
  { 
    id: "solid", 
    name: "Solid +", 
    desc: "Traduzindo tecnologia complexa em uma interface institucional humana e acessível para o mercado global.",
    tag: "Direção & ID Visual",
    to: "/solid"
  },
  { 
    id: "maxi", 
    name: "Maxi", 
    desc: "Equilibrando autoridade acadêmica com dinamismo digital para uma das instituições de ensino mais tradicionais.",
    tag: "Social Media & OOH",
    to: "/maxi"
  }
];

function BrandBoard() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
      {brands.map((brand) => (
        <div 
          key={brand.id}
          className="relative bg-background group cursor-pointer overflow-hidden"
          onClick={() => setActiveBrand(activeBrand === brand.id ? null : brand.id)}
          onMouseEnter={() => typeof window !== 'undefined' && window.innerWidth > 768 && setActiveBrand(brand.id)}
          onMouseLeave={() => typeof window !== 'undefined' && window.innerWidth > 768 && setActiveBrand(null)}
        >
          <div className="p-10 md:p-14 flex flex-col items-center justify-center min-h-[200px] md:min-h-[280px] transition-all duration-700">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter transition-all duration-500 group-hover:scale-90 group-hover:opacity-20 text-center">
              {brand.name}
            </h3>
            <div className="flex flex-col items-center gap-2 mt-4 transition-all duration-500 group-hover:opacity-0">
               <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/40">
                {brand.tag}
              </span>
              <ChevronDown size={12} className={`text-secondary opacity-20 transition-transform duration-500 ${activeBrand === brand.id ? "rotate-180" : ""}`} />
            </div>
          </div>

          <div className={`absolute inset-0 bg-foreground text-background p-8 md:p-12 flex flex-col justify-between transition-all duration-700 ease-out-expo ${activeBrand === brand.id ? "translate-y-0" : "translate-y-full"}`}>
            <div className="space-y-4">
               <span className="text-[9px] font-mono uppercase tracking-[0.4em] opacity-40 block">{brand.tag}</span>
               <p className="text-base md:text-lg leading-tight uppercase font-bold tracking-tight">{brand.desc}</p>
            </div>
            <Link to={brand.to} className="flex items-center justify-between group/btn border-t border-background/10 pt-6 md:pt-8">
              <span className="text-[10px] font-mono uppercase tracking-widest">Ver Projeto</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-background/20 flex items-center justify-center group-hover/btn:bg-background group-hover/btn:text-foreground transition-all duration-500">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function SobrePage() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const trajectoryRef = useRef(null);
  const { scrollYProgress: trajectoryScroll } = useScroll({
    target: trajectoryRef,
    offset: ["start end", "end start"]
  });
  
  const trajY = useTransform(trajectoryScroll, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={revealRef} className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ProjectMedia 
            src="/assets/about/photos/hero-bg.jpg" 
            alt="Murilo Ortega Portrait" 
            className="w-full h-full object-cover grayscale opacity-30 md:opacity-40 object-[50%_25%] md:object-[50%_10%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="site-container relative z-10 w-full pt-32 pb-24">
          <div className="max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.8] mb-12"
            >
              Marcas que não<br />
              pedem <span className="text-secondary font-medium italic">licença</span><br />
              para liderar.
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-mono uppercase text-secondary/40 tracking-widest">Expertise</span>
                   <span className="text-sm md:text-base uppercase font-bold tracking-tighter">Design Estratégico</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-mono uppercase text-secondary/40 tracking-widest">Localização</span>
                   <span className="text-sm md:text-base uppercase font-bold tracking-tighter">Brasil / Global</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="md:col-span-2 flex flex-col md:flex-row gap-8 items-start md:items-end md:justify-end"
              >
                 <p className="text-base md:text-xl text-secondary uppercase font-medium leading-tight max-w-sm">
                   8 anos transformando negócios através de behavioral design, estética premium e estratégias de alta tração.
                 </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Summary with Parallax Background */}
      <section ref={trajectoryRef} className="relative py-32 md:py-48 overflow-hidden border-y border-border/5">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: trajY }} className="w-full h-[120%] absolute -top-[10%]">
             <ProjectMedia 
               src="/assets/about/photos/middle-bg.jpg" 
               alt="Murilo Ortega Workflow" 
               className="w-full h-full object-cover grayscale opacity-10" 
             />
          </motion.div>
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="site-container relative z-10">
          <div className="max-w-5xl space-y-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.9] text-foreground">
              Oito anos liderando o diálogo entre estética e resultado real.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-border/10">
              <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight">
                 Como especialista em marcas, desenvolvi ao longo de 8 anos um método próprio que funde design estratégico e dados. Meu foco é projetar experiências e identidades que não são apenas bonitas, mas desenhadas estruturalmente para converter e dominar o mercado.
              </p>
              <div className="flex flex-col gap-6">
                 {["Foco em Performance", "Estratégia de Dados", "Liderança Criativa"].map((text, i) => (
                   <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-[1px] bg-foreground/20 group-hover:bg-foreground group-hover:w-16 transition-all duration-700" />
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">{text}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="py-24 md:py-32 bg-background border-t border-border/5">
        <div className="site-container mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.8]">Design & <br /><span className="text-secondary font-medium italic">Direção de Arte</span></h2>
        </div>
        <div className="overflow-hidden mb-12">
           <div className="flex animate-marquee-fast gap-8 md:gap-16 whitespace-nowrap">
              {[...designTools, ...designTools, ...designTools, ...designTools, ...designTools].map((tool, i) => (
                <div key={i} className="flex items-center gap-8 group">
                   <div className="w-24 h-24 md:w-32 md:h-32 bg-off-white flex items-center justify-center p-6 rounded-2xl transition-all duration-500 hover:scale-105">
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                   </div>
                </div>
              ))}
           </div>
        </div>
        <div className="site-container">
           <p className="text-sm md:text-base font-mono uppercase text-secondary leading-relaxed max-w-xl opacity-60">
             Domínio técnico das ferramentas que moldam a estética visual moderna. Agilidade e precisão em Photoshop, Illustrator, After Effects e Figma para entregar designs que performam.
           </p>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-24 md:py-32 bg-off-white/50 border-y border-border/5">
        <div className="site-container mb-16 md:mb-24">
           <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.8]">Inteligência <br /><span className="text-secondary font-medium italic">Artificial</span></h2>
        </div>
        <div className="overflow-hidden mb-12">
           <div className="flex animate-marquee-fast gap-8 md:gap-16 whitespace-nowrap direction-reverse">
              {[...aiTools, ...aiTools, ...aiTools, ...aiTools, ...aiTools].map((tool, i) => (
                <div key={i} className="flex items-center gap-8 group">
                   <div className="w-24 h-24 md:w-32 md:h-32 bg-background flex items-center justify-center p-8 rounded-2xl transition-all duration-500 hover:scale-105">
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                   </div>
                </div>
              ))}
           </div>
        </div>
        <div className="site-container">
           <p className="text-sm md:text-base font-mono uppercase text-secondary leading-relaxed max-w-xl opacity-60">
             As IAs potencializam meus skills de copywriting, redação e UX, elevando a performance e a pontualidade de cada projeto através de ferramentas como Claude, GPT e VEO3.
           </p>
        </div>
      </section>

      {/* Management Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="site-container">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.8] mb-12">Gestão & <br /><span className="text-secondary font-medium italic">Planejamento</span></h2>
                 <p className="text-sm md:text-base font-mono uppercase text-secondary leading-relaxed max-w-md opacity-60 mb-12">
                   Organização absoluta para garantir que a criatividade tenha espaço para performar. Fluxos de trabalho otimizados em Asana, Trello e Notion.
                 </p>
                 <div className="space-y-6">
                    {managementTools.map((tool) => (
                      <div key={tool.name} className="flex items-center justify-between border-b border-border pb-6 group">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 flex items-center justify-center">
                               <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain transition-all" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter">{tool.name}</span>
                         </div>
                         <span className="text-[10px] font-mono uppercase text-secondary opacity-40 group-hover:opacity-100 transition-all">{tool.desc}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-square bg-off-white rounded-2xl overflow-hidden group">
                 <ProjectMedia 
                   src="/assets/about/photos/middle-bg.jpg" 
                   alt="Murilo Ortega Workflow" 
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-background/5" />
              </div>
           </div>
        </div>
      </section>

      {/* Brand Board */}
      <section className="site-section py-24 md:py-32 border-t border-border/5">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.9]">Projetos e marcas que confiam na minha expertise.</h2>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-secondary/40 mb-2">Explore os detalhes</p>
          </div>
          <BrandBoard />
        </div>
      </section>

      {/* Final Call to Action with Background */}
      <section className="relative py-32 md:py-48 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ProjectMedia 
            src="/assets/about/photos/footer-bg.jpg" 
            alt="Murilo Ortega Contact" 
            className="w-full h-full object-cover opacity-20 grayscale" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="site-container relative z-10 text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8]"
          >
            Vamos elevar o<br />seu projeto?
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full w-full md:w-auto text-center border-none shadow-2xl">
              Iniciar conversa <Plus size={18} className="ml-2" />
            </a>
            <Link to="/trabalho" className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity border-b border-background/20 pb-1">
              Explorar Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobrePage;
