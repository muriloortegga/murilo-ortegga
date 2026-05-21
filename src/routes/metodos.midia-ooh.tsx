import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, ArrowRight, MapPin, Maximize, Target, Settings } from "lucide-react";

export const Route = createFileRoute("/metodos/midia-ooh")({
  head: () => ({
    meta: [
      { title: "Percepção de Marca - Murilo Ortega" },
      { name: "description", content: "Mídia Off-Home: Planejamento, design e gestão de campanhas externas de alto impacto." },
    ],
  }),
  component: MidiaOOHPage,
});

function MidiaOOHPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* Hero */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[1.1] tracking-tighter">
              Mídia OOH:<br />
              sua marca no lugar certo,<br />
              vista por quem <span className="text-secondary font-medium italic">importa</span>.
            </h1>
            <p className="text-base md:text-lg text-secondary font-medium leading-[1.1] mb-10 md:mb-12 max-w-2xl">
              Onde sua marca aparece fisicamente diz muito sobre quem ela é. Crio campanhas e sinalização OOH que colocam seu negócio no lugar certo, visto pelas pessoas certas.
            </p>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
              Planejar campanha OOH <Plus size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="site-section py-16 md:py-24 bg-off-white">
        <div className="site-container">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">Gestão Completa de Mídia Off</h2>
            </div>
            <p className="text-base md:text-lg text-secondary font-medium leading-[1.1] max-w-sm">Cuido de cada detalhe para que sua marca ocupe o espaço público com estratégia e presença.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
             {[
               { 
                 title: "Planejamento & Estratégia", 
                 description: "Mapeio os melhores pontos, formatos e roteiros para que sua verba apareça onde seu público está.",
                 icon: <Target size={20} /> 
               },
               { 
                 title: "Orçamento & Fornecedores", 
                 description: "Negociação e gestão de fornecedores de mídia — você não precisa falar com ninguém, só aprovar.",
                 icon: <Settings size={20} /> 
               },
               { 
                 title: "Administração de Budget", 
                 description: "Controle total do investimento: sem surpresa de custo, sem desperdício de verba.",
                 icon: <Plus size={20} /> 
               },
               { 
                 title: "Direção Visual & Design", 
                 description: "Criação das peças adaptadas para cada formato — outdoor, painel, busdoor — com fechamento técnico para gráfica.",
                 icon: <Maximize size={20} /> 
               }
             ].map((item, i) => (
               <div key={i} className="bg-background p-10 md:p-12 space-y-6 group hover:bg-foreground hover:text-background transition-all duration-700">
                  <div className="w-10 h-10 border border-border group-hover:border-background/20 flex items-center justify-center rounded-lg">
                     {item.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold tracking-tighter leading-[1.1]">{item.title}</h4>
                  <p className="text-sm font-medium text-secondary group-hover:text-background/80 tracking-tight leading-[1.4]">{item.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Case Maxi */}
      <section className="site-section py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
             <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="shadow-2xl overflow-hidden rounded-2xl border border-border/5">
                   <img src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1200" alt="Maxi Billboard" className="w-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                </div>
             </div>
             <div className="lg:col-span-6 order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-8">Colégio Maxi: <br/> Visibilidade Urbana</h2>
                <p className="text-base md:text-lg text-secondary font-medium leading-[1.1] mb-10">
                   Um dos colégios mais tradicionais de Londrina precisava de presença urbana consistente durante o período de matrículas. Gerenciei toda a operação: planejamento de roteiros, negociação com fornecedores, controle de budget e entrega gráfica de outdoors e painéis.
                </p>
                <div className="space-y-4 mb-12">
                   {["Planejamento de Roteiros", "Gestão de Fornecedores", "Follow-up & Controle", "Fechamento de Arquivos"].map((task, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <MapPin size={16} className="text-secondary opacity-30" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">{task}</span>
                     </div>
                   ))}
                </div>
                <Link to="/maxi" className="btn btn-primary px-8 py-4 rounded-full">
                  Ver projeto Maxi <ArrowRight size={18} className="ml-2" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-12">Sua marca fora da tela —<br /> e dentro da cabeça do seu cliente.</h2>
          <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Planejar minha campanha OOH <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default MidiaOOHPage;
