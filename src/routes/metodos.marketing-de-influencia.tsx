import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, ArrowRight, CheckCircle2, Star, Users, Zap, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/metodos/marketing-de-influencia")({
  head: () => ({
    meta: [
      { title: "Expansão de Marca - Murilo Ortega" },
      { name: "description", content: "Construindo sistemas de influência que transformam audiência em clientes." },
    ],
  }),
  component: MarketingInfluenciaPage,
});

function MarketingInfluenciaPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* 1. HERO */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[0.95] uppercase tracking-tighter">
              Influência não é sobre alcance. <br />
              É sobre <span className="text-secondary font-medium italic">desejo</span>, autoridade e conversão.
            </h1>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10 md:mb-12 max-w-2xl">
              Cuido de todo o processo: do casting ao briefing, da gestão dos creators à entrega final. Sua marca chega a novos públicos com a voz de quem eles já confiam, e sem você precisar gerenciar nada disso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
                Quero aplicar isso <Plus size={18} className="ml-2" />
              </a>
              <button onClick={() => document.getElementById('metodo')?.scrollIntoView({behavior: 'smooth'})} className="btn btn-secondary px-10 py-5 rounded-full">
                Ver como funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUEBRA DE CRENÇA */}
      <section className="site-section bg-foreground text-background py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">
              A maioria das<br />marcas erra aqui:
            </h2>
            <div className="space-y-6 md:space-y-8">
              {[
                "Contrata influenciadores sem estratégia",
                "Mede likes, não impacto real",
                "Não conecta influência com funil",
                "Depende de picos, não de consistência"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 border-l border-background/20 pl-8 py-2">
                  <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">0{i+1}</span>
                  <p className="text-xl md:text-2xl font-bold uppercase tracking-tight">{item}</p>
                </div>
              ))}
              <p className="text-xl md:text-2xl font-medium italic mt-8 md:mt-12 text-secondary">Influência sem estrutura é só barulho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTRO DO MÉTODO */}
      <section id="metodo" className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">Influence Growth Framework</h2>
            </div>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight max-w-sm">Desenvolvo um sistema próprio que integra o posicionamento à narrativa de influência.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { title: "Posicionamento de marca", icon: <Star size={20} /> },
              { title: "Curadoria estratégica", icon: <Users size={20} /> },
              { title: "Produção de narrativa", icon: <Zap size={20} /> },
              { title: "Distribuição com funil", icon: <ArrowRight size={20} /> }
            ].map((item, i) => (
              <div key={i} className="bg-background p-8 md:p-10 flex flex-col items-start hover:bg-off-white transition-colors">
                <div className="w-10 h-10 border border-border flex items-center justify-center mb-6 rounded-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O CASE EVIDIVE (PROVA) */}
      <section className="site-section bg-off-white py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-12">De marca nichada a referência aspiracional.</h2>
              <div className="w-full max-w-[400px] mb-8 shadow-xl overflow-hidden rounded-2xl border border-border/5">
                <img src="/hero-brandding.jpg" alt="Case EviDive" className="w-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
              <div className="flex justify-between items-end px-2 font-mono uppercase opacity-30 text-[9px] tracking-widest">
                <span>CASE EVIDIVE</span>
                <span>2024</span>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-12 md:space-y-16">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-4 block">Contexto</span>
                <p className="text-lg md:text-xl text-foreground font-medium uppercase tracking-tight leading-tight">
                  A EviDive não precisava apenas de visibilidade. Precisava se posicionar como experiência premium no nicho de mergulho.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-6 block">Estratégia</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {[
                    "Seleção criteriosa de perfis",
                    "Narrativa aspiracional",
                    "Jornadas de desejo",
                    "Estética e direção clara"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle2 size={16} className="text-foreground shrink-0 opacity-20" />
                      <span className="text-xs font-bold uppercase tracking-tight">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background p-10 md:p-12 border border-border rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-8 block">Resultados</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                   {[
                     "Percepção Premium",
                     "Autoridade de Nicho",
                     "Demanda Crescente",
                     "Público Qualificado"
                   ].map((res, i) => (
                     <div key={i} className="space-y-2">
                        <p className="text-base md:text-lg font-bold uppercase leading-none tracking-tighter">{res}</p>
                        <div className="h-[1px] bg-foreground/10 w-full" />
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMO FUNCIONA (PROCESSO) */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">Meu Processo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { step: "01", title: "Diagnóstico", desc: "Entendimento profundo da marca e território." },
              { step: "02", title: "Curadoria", desc: "Seleção baseada em fit estético e influência real." },
              { step: "03", title: "Direção", desc: "Briefings estratégicos para consistência narrativa." },
              { step: "04", title: "Ativação", desc: "Conteúdo pensado para cada etapa do funil." },
              { step: "05", title: "Otimização", desc: "Análise qualitativa e refinamento constante." }
            ].map((p, i) => (
              <div key={i} className="bg-background p-10 space-y-6 group hover:bg-foreground hover:text-background transition-all">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{p.step}</span>
                <h4 className="text-lg font-bold uppercase tracking-tighter">{p.title}</h4>
                <p className="text-[10px] font-mono uppercase text-secondary group-hover:text-background/60 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAL */}
      <section className="site-section bg-foreground text-background py-24 md:py-32">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-12">
            Não gerencio influenciadores.<br />
            <span className="text-secondary font-medium italic">Construo sistemas</span> de crescimento.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-20">
            {["Branding + Performance", "Curadoria Obsessiva", "Direção Estratégica", "Integração de Funil"].map((pilar, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-1.5 h-1.5 bg-background rounded-full opacity-20" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60">{pilar}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARA QUEM É */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">Para marcas que buscam o próximo nível:</h2>
            </div>
            <div className="space-y-3">
              {[
                "Posicionamento Premium",
                "Valor de Marca",
                "Crescimento Sustentável",
                "Independência de Tráfego"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-6 p-6 border border-border group hover:bg-foreground hover:text-background transition-all duration-500 rounded-xl">
                  <ArrowRight size={18} className="opacity-10 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xl font-bold uppercase tracking-tighter">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-24 md:py-32 bg-foreground text-background border-t border-background/10">
        <div className="site-container text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85]">Pare de testar.<br />Comece a <span className="text-secondary font-medium italic">influenciar</span>.</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full text-center">
              Quero aplicar isso
            </a>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background border-b border-background/20 pb-1 uppercase font-mono text-[10px] tracking-widest hover:opacity-60 transition-opacity">
              Falar com especialista <MessageSquare size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarketingInfluenciaPage;
