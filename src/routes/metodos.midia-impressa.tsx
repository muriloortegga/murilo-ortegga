import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, Book, Layers, FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/metodos/midia-impressa")({
  head: () => ({
    meta: [
      { title: "Autoridade de marca - Murilo Ortega" },
      { name: "description", content: "Catálogos, diagramação e materiais institucionais com alta performance gráfica." },
    ],
  }),
  component: MidiaImpressaPage,
});

function MidiaImpressaPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* Hero */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[0.95] uppercase tracking-tighter">
              Mídia Impressa:<br />
              Onde sua marca<br />
              ganha <span className="text-secondary font-medium italic">peso</span> real.
            </h1>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10 md:mb-12 max-w-2xl">
              A marca que só existe no digital tem metade do impacto. Desenvolvo tudo que faz seu negócio parecer sólido e profissional no mundo físico - da papelaria às apresentações institucionais que fecham negócios.
            </p>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
              Iniciar projeto gráfico <Plus size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="site-section py-24 md:py-32 bg-off-white">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
             {[
               { title: "Catálogos Físicos & Digitais", icon: <Book size={20} /> },
               { title: "Diagramação Editorial", icon: <Layers size={20} /> },
               { title: "Materiais Institucionais", icon: <FileText size={20} /> },
               { title: "Peças Promocionais", icon: <FileText size={20} /> },
               { title: "Papelaria Premium", icon: <Plus size={20} /> },
               { title: "Arquivo Técnico", icon: <Layers size={20} /> }
             ].map((item, i) => (
               <div key={i} className="bg-background p-10 md:p-12 space-y-6 group hover:bg-foreground hover:text-background transition-all duration-500">
                  <div className="w-10 h-10 border border-border flex items-center justify-center mb-4 group-hover:border-background/20 transition-colors rounded-lg">
                     {item.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight">{item.title}</h4>
                  <p className="text-[10px] font-mono uppercase text-secondary group-hover:text-background/60 tracking-tight">Alta performance gráfica e fechamento técnico.</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Case Marco Boni */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
             <div className="lg:col-span-6">
                <Link to="/marco-boni" className="block shadow-2xl overflow-hidden group rounded-2xl border border-border/5">
                   <img 
                     src="/assets/projects/marco-boni/print/1.jpg" 
                     alt="Marco Boni Catalog" 
                     className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                   />
                </Link>
             </div>
             <div className="lg:col-span-6">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-8">Marco Boni: <br/> Catálogo Nacional</h2>
                <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10">
                   Produzi o catálogo nacional de produtos da marca, desde a fotografia e tratamento de imagens de mais de 1000 itens até a linha editorial, identidade visual e diagramação completa.
                </p>
                <div className="space-y-4 mb-12">
                   {["Fotografia & Tratamento", "Design Thinking & Exibição", "Direção Visual & Diagramação"].map((task, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-4 h-[1px] bg-foreground opacity-20" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">{task}</span>
                     </div>
                   ))}
                </div>
                <Link to="/marco-boni" className="btn btn-primary px-8 py-4 rounded-full">
                  Ver detalhes <ArrowRight size={18} className="ml-2" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.95] mb-12">O material que sua marca merece.</h2>
          <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Solicitar orçamento <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default MidiaImpressaPage;
