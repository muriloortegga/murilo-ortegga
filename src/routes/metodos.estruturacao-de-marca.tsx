import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, BookOpen, PenTool, Search, Layout, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/metodos/estruturacao-de-marca")({
  head: () => ({
    meta: [
      { title: "Estrutura de Marca, Murilo Ortega" },
      { name: "description", content: "Construindo a base sólida que sua marca precisa para liderar." },
    ],
  }),
  component: EstruturacaoMarcaPage,
});

function EstruturacaoMarcaPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* Hero */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[1.1] tracking-tighter">
              Estruturação de Marca:<br />
              porque negócio bom com marca fraca<br />
              perde para negócio mediano com <span className="text-secondary font-medium italic">marca forte</span>.
            </h1>
 <p className="text-base md:text-lg text-secondary font-medium leading-[1.1] mb-10 md:mb-12 max-w-2xl">
              Do diagnóstico ao brandbook completo. Construo identidades que fazem seu negócio ser lido do jeito certo, antes de qualquer palavra.
            </p>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
              Iniciar estruturação <Plus size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="site-section py-24 md:py-32 bg-off-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { 
                num: "01", 
                title: "Diagnóstico & Estratégia", 
                desc: "Mapeio onde você está, onde o mercado está e o espaço que ninguém ainda ocupou. Daqui saem as decisões que guiam tudo que vem depois.",
                icon: <Search size={20} />
              },
              { 
                num: "02", 
                title: "Naming & Tom de Voz", 
                desc: "Defino como sua marca se chama, como ela escreve e como ela soa. Porque o cliente decide se confia em você antes mesmo de entrar em contato.",
                icon: <PenTool size={20} />
              },
              { 
                num: "03", 
                title: "Identidade Visual", 
                desc: "Logo, tipografia, paleta e sistema visual construídos para funcionar juntos, em qualquer canal, em qualquer tamanho, sem perder coerência.",
                icon: <Layout size={20} />
              },
              { 
                num: "04", 
                title: "Brandbook & Manual", 
                desc: "Tudo documentado: como usar, como não usar e por quê. Seu time, sua agência e qualquer fornecedor vão saber exatamente como tratar a marca, sem improvisar.",
                icon: <BookOpen size={20} />
              }
            ].map((p, i) => (
              <div key={i} className="lg:col-span-6 bg-background p-10 md:p-14 space-y-6 md:space-y-8 group hover:bg-foreground hover:text-background transition-all duration-700">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 border border-border group-hover:border-background/20 flex items-center justify-center rounded-lg">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{p.num}</span>
                </div>
                <div className="space-y-4">
 <h3 className="text-xl md:text-2xl font-bold tracking-tighter">{p.title}</h3>
                  <p className="text-[11px] md:text-xs font-mono uppercase tracking-tight text-secondary group-hover:text-background/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Section */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="mb-8 md:mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">Na prática, é assim que fica:</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-6">
 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-8">Solid +: Fintech Identity & Systems</h2>
 <p className="text-base md:text-lg text-secondary font-medium leading-tight mb-10">
                 A Solid+ precisava de uma marca que funcionasse tanto em boardrooms do Reino Unido quanto em interfaces digitais de escala global. Construí o sistema visual e institucional completo, do logo ao brandbook, que hoje sustenta a operação em dois mercados.
               </p>
               <Link to="/solid" className="btn btn-primary rounded-full px-8 py-4">
                 Ver case completo <ArrowRight size={18} className="ml-2" />
               </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full max-w-[400px] mb-8 shadow-xl overflow-hidden rounded-2xl border border-border/5">
                <img src="/solid-full.png" alt="Solid+ Brandbook" className="w-full transition-all duration-700 hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="site-container text-center">
 <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-12">Pronto para parar de perder para marcas piores que a sua?</h2>
          <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Solicitar orçamento <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default EstruturacaoMarcaPage;
