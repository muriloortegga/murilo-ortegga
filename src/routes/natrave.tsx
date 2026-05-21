import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  PerformanceHero, 
  CopyFeature, 
  LiveArtGallery, 
  ReelsShowcase 
} from "@/components/social-media-case";
import { 
  TestimonialCTA 
} from "@/components/social-case-layout";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { Maximize2, X, ArrowLeft, ArrowRight } from "lucide-react";
import { WebsiteShowcase } from "@/components/website-scroll-showcase";

import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("marca"),
});

export const Route = createFileRoute("/natrave")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "NaTrave App - Murilo Ortega" },
      { name: "description", content: "Estratégia de Social Media e Branding para o NaTrave App." },
    ],
  }),
  component: ProjetoNaTrave,
});

function ProjetoNaTrave() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "marca");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add("has-fullscreen");
    } else {
      document.body.classList.remove("has-fullscreen");
    }
    return () => document.body.classList.remove("has-fullscreen");
  }, [isFullScreen]);

  const services = [
    { id: "marca", label: "Id Visual" },
    { id: "social", label: "Social Media" },
    { id: "websites", label: "Websites" }
  ];

  const metaData = [
    { label: "Papel", value: "Direção & Design" },
    { label: "Ano", value: "2024" },
    { label: "Plataforma", value: "iOS & Android" },
    { label: "Skills", value: "UX/UI, Social" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="NaTrave App"
        phrase="Virando o Jogo"
        description="O futebol amador elevado ao nível de elite. Uma plataforma para conectar jogadores, organizadores e a paixão pelo esporte sem burocracia."
        niche="Projeto Autoral - Esporte & Tech"
        meta={metaData}
        accentColor="#FF6B00"
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
        accentColor="#FF6B00"
      />

      {activeService === "social" && (
        <div className="anim-fade-in">
          <PerformanceHero 
            followers={2250}
            contentCount={100}
            mockupImg="/assets/projects/natrave/social/mockups/performance-overview.png" 
            accentColor="#FF6B00"
          />

          <CopyFeature 
            headline="COPYWRITING, REDAÇÃO E DESIGN QUE IA NENHUMA CONSEGUE CRIAR."
            contentCount={100}
            contentLabel="Conteúdos Criados"
            accentColor="#111111"
            mockupImg="/assets/projects/natrave/social/mockups/copy-showcase.png"
          />

          <LiveArtGallery 
            sections={[
              {
                title: "Jornalismo esportivo nas mídias sociais",
                layout: 'top',
                image: "/assets/projects/natrave/social/gallery/art-01.jpg"
              },
              {
                title: "Conteúdo que gera identificação com o público alvo",
                layout: 'bottom',
                image: "/assets/projects/natrave/social/gallery/art-02.jpg"
              },
              {
                title: "Design alinhado á identidade visual da marca",
                layout: 'top',
                image: "/assets/projects/natrave/social/gallery/art-03.jpg"
              }
            ]}
          />

          <ReelsShowcase 
            headline="CONTEÚDO EM MOVIMENTO"
            subheadline="Desenvolvimento de Stories e Reels estratégicos para fortalecer a presença digital e o engajamento da marca."
            videos={[
              { url: "/assets/projects/natrave/social/videos/video-01.mp4", category: "Reels" },
              { url: "/assets/projects/natrave/social/videos/video-02.mp4", category: "Stories" },
              { url: "/assets/projects/natrave/social/videos/video-03.mp4", category: "Institucional" },
              { url: "/assets/projects/natrave/social/videos/video-04.mp4", category: "Cobertura" },
            ]}
          />

          <TestimonialCTA 
            clientName="Fundador NaTrave"
            clientRole="CEO & Founder"
            testimonial="O Murilo não apenas desenhou o app, ele construiu a voz da nossa comunidade. O crescimento no Social foi o motor da nossa tração inicial."
            clientImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
          />
        </div>
      )}

      {activeService === "marca" && (
        <div className="anim-fade-in site-container pb-32">
           <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden border border-border group cursor-ns-resize rounded-2xl" onClick={() => setIsFullScreen(true)}>
             <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 flex items-center justify-center pointer-events-none">
                <div className="bg-background/80 backdrop-blur px-6 py-3 border border-border rounded-full opacity-0 group-hover:opacity-100 transition-all">
                   <Maximize2 size={16} className="inline-block" />
                   <span className="ml-2 text-[10px] font-mono uppercase tracking-widest">Ver Case Completo</span>
                </div>
             </div>
             <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                <img src="/natrave-marca.png" alt="NaTrave Branding Showcase" className="w-full h-auto" />
             </div>
           </div>
        </div>
      )}

      {activeService === "websites" && (
        <div className="anim-fade-in">
          <WebsiteShowcase 
            title="A Plataforma"
            description="Para o NaTrave, desenvolvi a parte de copywriting e o design completo da interface da plataforma. O foco foi estruturar uma usabilidade limpa para a comunidade."
            mediaSrc="/assets/projects/thumbnails/websites/natrave.gif"
            roleTitle="Identidade & Conversão"
            roleDescription="A identidade visual do projeto web seguiu rigorosamente as diretrizes do brandbook estabelecido, garantindo que a transição do aplicativo para a experiência desktop fosse totalmente coesa, intuitiva e voltada para alta performance."
          />
        </div>
      )}

      {/* Full Screen Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto no-scrollbar anim-fade-in">
          <div className="sticky top-0 right-0 left-0 h-24 flex items-center justify-between site-container z-[101] bg-background/50 backdrop-blur-sm border-b border-border/10 pointer-events-auto">
            <span className="text-xs font-mono uppercase tracking-widest">NaTrave App Case - Branding</span>
            <button 
              onClick={() => setIsFullScreen(false)}
              className="p-4 bg-foreground text-background transition-transform hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
          <div>
            <img 
              src="/natrave-marca.png" 
              alt="NaTrave Full Presentation" 
              className="w-full h-auto shadow-2xl"
            />
          </div>
        </div>
      )}

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-primary gap-2">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/solid" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoNaTrave;
