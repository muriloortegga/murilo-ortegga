import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { Maximize2, X, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/symplice")({
  head: () => ({
    meta: [
      { title: "Symplice — Murilo Ortega" },
      { name: "description", content: "Identidade Visual para Symplice — Facilitando o complexo." },
    ],
  }),
  component: ProjetoSymplice,
});

function ProjetoSymplice() {
  const [activeService, setActiveService] = useState("marca");
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
    { id: "marca", label: "Id Visual" }
  ];

  const metaData = [
    { label: "Cliente", value: "Symplice" },
    { label: "Ano", value: "2024" },
    { label: "Foco", value: "Startup & SaaS" },
    { label: "Skills", value: "Id Visual, Branding" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="Symplice"
        phrase="Clareza Digital"
        description="Para marcas que operam na complexidade, a Symplice entrega simplicidade estratégica. Uma identidade visual limpa, direta e focada na experiência do usuário."
        niche="Branding & Design System"
        meta={metaData}
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
      />

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
                <img src="/assets/projects/symplice/marca/projeto-completo.jpg" alt="Symplice Branding Showcase" className="w-full h-auto" />
             </div>
           </div>
        </div>
      )}

      {/* Full Screen Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto no-scrollbar anim-fade-in">
          <div className="sticky top-0 right-0 left-0 h-24 flex items-center justify-between site-container z-[101] bg-background/50 backdrop-blur-sm border-b border-border/10 pointer-events-auto">
            <span className="text-xs font-mono uppercase tracking-widest">Symplice Case — Branding</span>
            <button 
              onClick={() => setIsFullScreen(false)}
              className="p-4 bg-foreground text-background transition-transform hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
          <div>
            <img 
              src="/assets/projects/symplice/marca/projeto-completo.jpg" 
              alt="Symplice Full Presentation" 
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
          <Link to="/natrave" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoSymplice;
