import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, ArrowRight, Zap, Globe, ShieldCheck } from "lucide-react";

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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[1.1] tracking-tighter">
              Conversão de Marca:<br />
              o site que faz o seu negócio ser levado a sério <span className="text-secondary font-medium italic">antes da primeira reunião</span>.
            </h1>
            <p className="text-base md:text-lg text-secondary font-medium leading-tight mb-10 md:mb-12 max-w-2xl">
              Seu site precisa trabalhar por você. Crio sites institucionais que organizam sua comunicação, deixam claro o que você oferece e conduzem o visitante até a ação — sem deixar dúvida no caminho.
            </p>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
              Quero um site que converte <Plus size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="site-section py-24 md:py-32 bg-foreground text-background">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
             <div className="space-y-8 md:space-y-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
                  Não é sobre ter um link na bio. É sobre ter um site que trabalha pelo seu negócio enquanto você dorme.
                </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-2xl overflow-hidden border border-background/10">
                {[
                  { 
                    title: "Design Disruptivo", 
                    desc: "Cada página projetada para comunicar quem você é antes de qualquer palavra. Design único — nada de template, nada de genérico.", 
                    icon: <Zap size={18} /> 
                  },
                  { 
                    title: "Alta Performance", 
                    desc: "Site otimizado para SEO, GEO e indexação por IA. Seu negócio encontrado no Google, no ChatGPT e em qualquer plataforma onde seu cliente estiver buscando.", 
                    icon: <Globe size={18} /> 
                  },
                  { 
                    title: "UX Estratégica", 
                    desc: "Cada seção do site tem uma função: apresentar, convencer e converter. O visitante é conduzido sem perceber — até chegar onde você quer.", 
                    icon: <Zap size={18} /> 
                  },
                  { 
                    title: "Exclusividade", 
                    desc: "Desenvolvido do zero com meu parceiro técnico fixo. Você tem um time dedicado ao seu projeto — não um freelancer genérico montando Elementor.", 
                    icon: <ShieldCheck size={18} /> 
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 md:p-10 border border-background/5 space-y-4 hover:bg-background/5 transition-colors">
                     <div className="w-10 h-10 border border-background/20 flex items-center justify-center text-secondary rounded-lg">
                        {item.icon}
                     </div>
                     <h4 className="text-lg font-bold tracking-tighter">{item.title}</h4>
                     <p className="text-[11px] md:text-xs font-mono text-background/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Novo Bloco: Como funciona na prática */}
      <section className="site-section py-24 md:py-32 bg-off-white">
        <div className="site-container">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">Metodologia</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mt-4">Como funciona na prática:</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              {
                num: "01",
                title: "Diagnóstico estratégico",
                desc: "Sessão para entender seu negócio, seu público e o que o site precisa resolver — antes de abrir qualquer arquivo de design."
              },
              {
                num: "02",
                title: "Arquitetura e UX",
                desc: "Defino a estrutura do site: quais páginas existem, o que cada uma comunica e como o visitante se move entre elas."
              },
              {
                num: "03",
                title: "Design & Conteúdo",
                desc: "Criação visual completa com copy estratégica integrada. Nenhuma página entregue sem os dois elementos funcionando juntos."
              },
              {
                num: "04",
                title: "SEO, GEO e Indexação por IA",
                desc: "Estruturo a estratégia de visibilidade: como seu site aparece no Google, como é citado por ferramentas de IA e como se posiciona nas buscas que importam para o seu negócio."
              },
              {
                num: "05",
                title: "Desenvolvimento e Entrega",
                desc: "Execução técnica feita pelo meu parceiro dev fixo — com acompanhamento total até o go-live."
              }
            ].map((step, i) => (
              <div key={i} className="lg:col-span-12 bg-background p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center hover:bg-foreground hover:text-background transition-all duration-500 group">
                <span className="text-2xl md:text-3xl font-mono text-secondary group-hover:text-background/40 font-bold">{step.num}</span>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tighter">{step.title}</h3>
                  <p className="text-sm text-secondary group-hover:text-background/70 leading-relaxed max-w-4xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases de Destaque */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">Projetos entregues. Resultados reais:</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             {[
               { 
                 name: "Talk2Buy", 
                 tag: "E-commerce & UX", 
                 desc: "Talk2Buy — Arquitetura de conversão e UX design estratégico para e-commerce de alto volume.", 
                 to: "/talk2buy",
                 img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
               },
               { 
                 name: "Kmillion", 
                 tag: "Landing Page High Ticket", 
                 desc: "Kmillion — Landing page de alta conversão para mentorias de ticket premium.", 
                 to: "/kmillion",
                 img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
               },
               { 
                 name: "EviDive", 
                 tag: "Branding & Web", 
                 desc: "EviDive — Branding e site institucional para empresa de mergulho com operações internacionais.", 
                 to: "/evidive",
                 img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
               },
               { 
                 name: "NaTrave", 
                 tag: "Plataforma Digital", 
                 desc: "NaTrave — Plataforma e portal de conteúdo esportivo com alta performance e design personalizado.", 
                 to: "/natrave",
                 img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
               }
             ].map((c, i) => (
               <Link key={i} to={c.to} className="group flex flex-col space-y-6">
                  <div className="relative overflow-hidden aspect-[16/10] rounded-2xl border border-border/5 bg-secondary/10 shadow-lg">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">{c.tag}</span>
                       <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">{c.name}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{c.desc}</p>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-12">Seu negócio merece um site que trabalha tão bem quanto você.</h2>
          <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Agendar diagnóstico gratuito <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default PresencaDigitalPage;
