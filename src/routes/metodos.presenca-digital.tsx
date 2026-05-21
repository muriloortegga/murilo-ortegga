import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, ArrowRight, Zap } from "lucide-react";

export const Route = createFileRoute("/metodos/presenca-digital")({
  head: () => ({
    meta: [
      { title: "Conversão de Marca - Murilo Ortega" },
      { name: "description", content: "Sites e Landing Pages premium de alta performance. O diferencial que sua marca merece." },
    ],
  }),
  component: PresencaDigitalPage,
});

function PresencaDigitalPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* Hero */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[0.95] uppercase tracking-tighter">
              Sites e Landing Pages<br />
              de <span className="text-secondary font-medium italic">alta performance</span><br />
              e design premium.
            </h1>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10 md:mb-12 max-w-2xl">
              Seu site precisa trabalhar por você. Crio sites e interfaces que organizam sua comunicação, deixam claro o que você oferece e conduzem o visitante até a ação, sem deixar dúvida no caminho.
            </p>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
              Construir minha casa digital <Plus size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="site-section py-24 md:py-32 bg-foreground text-background">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
             <div className="space-y-8 md:space-y-12">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">
                   O site como um<br />diferencial para<br />sua marca se destacar.
                </h2>
                <p className="text-base md:text-lg text-background/60 uppercase font-medium leading-tight">
                   Não é sobre ter um link na bio. É sobre ter uma plataforma de conversão que trabalha 24/7 para o seu negócio.
                </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-2xl overflow-hidden border border-background/10">
                {[
                  { title: "Design Disruptivo", desc: "Interfaces que prendem a atenção e elevam a percepção de marca.", icon: <Zap size={18} /> },
                  { title: "Alta Performance", desc: "Velocidade de carregamento otimizada para SEO e conversão.", icon: <Zap size={18} /> },
                  { title: "UX Estratégica", desc: "Jornada do usuário pensada para levar ao clique final.", icon: <Zap size={18} /> },
                  { title: "Exclusividade", desc: "Design único, nada de templates prontos ou genéricos.", icon: <Zap size={18} /> }
                ].map((item, i) => (
                  <div key={i} className="p-8 md:p-10 border border-background/5 space-y-4 hover:bg-background/5 transition-colors">
                     <div className="w-10 h-10 border border-background/20 flex items-center justify-center text-secondary rounded-lg">
                        {item.icon}
                     </div>
                     <h4 className="text-lg font-bold uppercase tracking-tighter">{item.title}</h4>
                     <p className="text-[10px] font-mono uppercase text-background/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Cases de Destaque */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">Cases em Presença Digital</h2>
            </div>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight max-w-sm">Plataformas que construo do zero, focadas em performance e branding.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
             {[
               { name: "Talk2Buy", tag: "E-commerce & UX", to: "/talk2buy" },
               { name: "Kmillion", tag: "Landing Page High Ticket", to: "/kmillion" },
               { name: "EviDive", tag: "Branding & Web", to: "/evidive" },
               { name: "NaTrave", tag: "Plataforma Digital", to: "/natrave" }
             ].map((c, i) => (
               <Link key={i} to={c.to} className="bg-background p-10 md:p-14 group hover:bg-foreground hover:text-background transition-all duration-700 space-y-6">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">{c.tag}</span>
                     <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{c.name}</h3>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.95] mb-12">O próximo grande site pode ser o seu.</h2>
          <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Agendar reunião estratégica <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default PresencaDigitalPage;
