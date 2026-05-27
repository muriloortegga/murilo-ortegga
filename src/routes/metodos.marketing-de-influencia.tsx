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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[1.1] tracking-tighter">
              Influência não é sobre alcance. <br />
              É sobre <span className="text-secondary font-medium italic">desejo</span>, autoridade e conversão.
            </h1>
            <p className="text-base md:text-lg text-secondary font-medium leading-[1.1] mb-10 md:mb-12 max-w-2xl">
              Cuido de todo o processo: do casting ao briefing, da gestão dos creators à entrega final. Sua marca chega a novos públicos com a voz de quem eles já confiam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
                Quero uma estratégia de influência <Plus size={18} className="ml-2" />
              </a>
              <button onClick={() => document.getElementById('metodo')?.scrollIntoView({behavior: 'smooth'})} className="btn btn-secondary px-10 py-5 rounded-full">
                Ver como funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUEBRA DE CRENÇA */}
      <section className="site-section bg-foreground text-background py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
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
                  <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-1">0{i+1}</span>
                  <p className="text-xl md:text-2xl font-bold tracking-tight">{item}</p>
                </div>
              ))}
              <p className="text-xl md:text-2xl font-medium italic mt-8 md:mt-12 text-secondary">Influência sem estrutura é só barulho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA (PROCESSO) */}
      <section id="metodo" className="site-section py-16 md:py-24 bg-off-white">
        <div className="site-container">
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1]">Meu Processo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { step: "01", title: "Diagnóstico", desc: "Mapeio onde a marca está, qual narrativa faz sentido para o nicho e que tipo de creator vai gerar fit real — não só alcance." },
              { step: "02", title: "Curadoria", desc: "Seleção baseada em estética, audiência real e alinhamento com o posicionamento da marca. Sem comprar seguidores, sem perfil genérico." },
              { step: "03", title: "Direção", desc: "Briefings estratégicos que orientam o creator sem engessar. O conteúdo precisa parecer genuíno — porque é." },
              { step: "04", title: "Ativação", desc: "Cada peça de conteúdo pensada para uma etapa do funil: awareness, consideração ou conversão. Nada publicado sem função." },
              { step: "05", title: "Otimização", desc: "Análise qualitativa de cada ativação para refinar o que funciona e escalar o que converte." }
            ].map((p, i) => (
              <div key={i} className="bg-background p-8 md:p-10 space-y-6 group hover:bg-foreground hover:text-background transition-all">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{p.step}</span>
                <h4 className="text-lg md:text-xl font-bold tracking-tighter">{p.title}</h4>
                <p className="text-sm font-medium text-secondary group-hover:text-background/80 leading-[1.4]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O CASE EVIDIVE (PROVA) */}
      <section className="site-section py-16 md:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-12">De marca nichada a referência aspiracional.</h2>
              <div className="w-full max-w-[400px] mb-8 shadow-xl overflow-hidden rounded-2xl border border-border/5">
                <img src="/hero-brandding.jpg" alt="Case EviDive" className="w-full transition-all duration-700 hover:scale-105" />
              </div>
              <div className="flex justify-between items-end px-2 font-mono uppercase opacity-30 text-[9px] tracking-widest">
                <span>CASE EVIDIVE</span>
                <span>2024</span>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-12 md:space-y-16">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-4 block">Contexto</span>
                <p className="text-lg md:text-xl text-foreground font-medium leading-[1.4]">
                  O maior centro de mergulho da América Latina e o primeiro Concept Dive Center da região precisava traduzir toda a sua estrutura premium física para o ambiente digital, indo além de um simples operador de mergulho para se consolidar como um estilo de vida desejável.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-4 block">Estratégia</span>
                <p className="text-lg md:text-xl text-foreground font-medium leading-[1.4]">
                  Fiz a curadoria de perfis com fit estético real para o universo do mergulho. Dirigi cada ativação com briefings de narrativa e direção visual — para que o conteúdo dos creators parecesse desejo, não publicidade.
                </p>
              </div>
              <div className="bg-off-white p-10 md:p-12 rounded-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-6 block">Resultados</span>
                <div className="space-y-6">
                   <p className="text-lg font-medium leading-[1.4] text-foreground">
                     <strong className="font-bold">Posicionamento</strong> como referência de luxo e estilo de vida no mergulho.
                   </p>
                   <div className="h-[1px] bg-border w-full" />
                   <p className="text-lg font-medium leading-[1.4] text-foreground">
                     <strong className="font-bold">Ecossistema Conectado</strong> integrando creators, cursos internacionais e comunidade.
                   </p>
                   <div className="h-[1px] bg-border w-full" />
                   <p className="text-lg font-medium leading-[1.4] text-foreground">
                     <strong className="font-bold">Demanda inbound</strong> qualificada e atração orgânica constante.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIFERENCIAL */}
      <section className="site-section bg-foreground text-background py-16 md:py-24">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Não gerencio influenciadores.<br />
            <span className="text-secondary font-medium italic">Construo sistemas</span> de crescimento.
          </h2>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-16 md:py-24 bg-foreground text-background border-t border-background/10">
        <div className="site-container text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1]">Pare de testar.<br />Comece a <span className="text-secondary font-medium italic">influenciar</span>.</h2>
          <div className="flex justify-center items-center">
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full text-center">
              Quero montar minha estratégia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarketingInfluenciaPage;
