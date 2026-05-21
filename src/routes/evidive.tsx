import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Eye, Zap, Target, Award, Shield } from "lucide-react";
import { EditorialSocialCase } from "@/components/social-case-layout";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("social"),
});

export const Route = createFileRoute("/evidive")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "EviDive — Case Study — Murilo Ortega" },
      { name: "description", content: "Estratégia de Social Media e Marketing de Influência para EviDive." },
    ],
  }),
  component: ProjetoEviDive,
});

function ProjetoEviDive() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "social");

  const services = [
    { id: "social", label: "Social Media" },
    { id: "influencia", label: "Influência" }
  ];

  const metaData = [
    { label: "Cliente", value: "EviDive" },
    { label: "Ano", value: "2024" },
    { label: "Nicho", value: "Engenharia & Tech" },
    { label: "Skills", value: "Social Media, Estratégia" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader
        client="EviDive"
        phrase="Inteligência & Precisão"
        description="A Evidive é uma marca do mercado de engenharia e soluções técnicas. O diferencial está em unir conhecimento especializado com uma apresentação moderna e estratégica."
        niche="Engenharia & Soluções"
        meta={metaData}
        accentColor="#1ec4b4"
      />

      <ServiceSelector
        options={services}
        activeId={activeService}
        onChange={setActiveService}
      />

      {activeService === "social" && (
        <div className="anim-fade-in bg-background">
          <EditorialSocialCase
            mainImg="/assets/projects/evidive/thumbs/casevi.png"
            designTitle="Estética Premium & Autoridade"
            designText="Transformo temas complexos em conteúdos acessíveis, organizados e visualmente impactantes. O design foge da estética engessada comum no setor para uma visão contemporânea."
            copyTitle="Comunicação Estratégica"
            copyText="O desafio era transformar um nicho naturalmente técnico em uma presença online forte. O objetivo não era apenas postar, mas conversar com tomadores de decisão."
            stats={[
              { label: "Percepção", value: "Premium" },
              { label: "Foco", value: "Excelência" }
            ]}
          />

          <ObjetivoProjeto />
          <DirecaoCriativa />
          <DesafiosProjeto />
          <ResultadoPercebido />
        </div>
      )}

      {activeService === "influencia" && (
        <div className="anim-fade-in bg-background">
          <InfluenciaHero />
          <SobreCliente />
          <OProblema />
          <AEstrategia />
          <Metodologia />
          <Resultados />
          <CasalDayOff />
          <InteligenciaEstrategica />
          <Comparacao />
          <Conclusao />
        </div>
      )}

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-arrow">← Voltar Projetos</Link>
          <Link to="/milgrows" className="btn btn-arrow">Próximo Projeto <span className="arrow" /></Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoEviDive;

// ─── Utility ───────────────────────────────────────────────────────────────
function AnimCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const spring = useSpring(0, { stiffness: 35, damping: 18 });
  const display = useTransform(spring, (v) => `${prefix}${Math.floor(v).toLocaleString("pt-BR")}${suffix}`);
  if (isInView) spring.set(value);
  return <motion.span ref={ref}>{display}</motion.span>;
}

// ============================================================================
// SOCIAL MEDIA SECTIONS
// ============================================================================

function ObjetivoProjeto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const barriers = [
    { label: "Autoridade", desc: "Construir autoridade digital sólida no segmento." },
    { label: "Percepção", desc: "Elevar a percepção de valor da marca." },
    { label: "Tradução", desc: "Transformar conteúdos técnicos em materiais atrativos." },
    { label: "Consistência", desc: "Criar uma identidade visual consistente e moderna." },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.85] max-w-4xl">
            O Objetivo do Projeto
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          {barriers.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-foreground p-8 md:p-10 border border-background/10 hover:bg-background/5 transition-colors duration-300">
              <div className="text-3xl font-bold tracking-tighter mb-4" style={{ color: '#1ec4b4' }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-3 text-background">{b.label}</h3>
              <p className="text-xs text-background/50 uppercase leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="mt-16 text-lg md:text-xl text-background/60 uppercase font-medium max-w-3xl leading-tight">
          Mais do que gerar volume de postagens, o foco estava em criar uma comunicação que representasse corretamente o tamanho, a capacidade técnica e o posicionamento da Evidive.
        </motion.p>
      </div>
    </section>
  );
}

function DirecaoCriativa() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const steps = ["Grid Organizado", "Hierarquia", "Tipografia", "Contraste", "Minimalismo"];
  const roles = ["inovação", "confiabilidade", "precisão", "excelência"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="lg:col-span-5">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85]">Direção Criativa e Estratégica</motion.h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-lg text-secondary uppercase font-medium leading-tight">A estratégia criativa foi baseada em um equilíbrio entre sofisticação visual e clareza técnica. O conteúdo precisava transmitir:</motion.p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {roles.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center gap-3 border border-border p-4 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1ec4b4' }} /><span className="text-[10px] font-mono uppercase tracking-widest">{r}</span>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="text-lg text-secondary uppercase font-medium leading-tight mt-6">A copy também foi desenvolvida com foco em objetividade e autoridade, sem exageros comerciais ou promessas vazias.</motion.p>
          </div>
        </div>
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center min-w-max">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}>
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-foreground text-background flex items-center justify-center text-center p-3 rounded-xl border-b-4" style={{ borderColor: '#1ec4b4' }}>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider leading-tight">{step}</span>
                  </div>
                </motion.div>
                {i < steps.length - 1 && <ArrowRight size={20} className="text-secondary/30 mx-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesafiosProjeto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const left = ["Comunicação fria e complexa", "Linguagem excessivamente publicitária", "Estética visual ultrapassada", "Desconexão com a realidade operacional"];
  const right = ["Acessibilidade de conteúdos técnicos", "Organização estratégica", "Estética premium e contemporânea", "Alinhamento entre branding e engenharia"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] max-w-3xl">
            Os Desafios do Projeto
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="p-10 md:p-14">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">O Que Evitamos</h3>
            <ul className="space-y-4">
              {left.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background/70 text-xs uppercase leading-relaxed">
                  <span className="text-background/30 mt-1 flex-shrink-0">—</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }} className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-background/10 relative">
            <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: '#1ec4b4' }} />
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">O Que Entrego</h3>
            <ul className="space-y-4">
              {right.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background text-xs uppercase font-medium leading-relaxed">
                  <span className="mt-1 flex-shrink-0" style={{ color: '#1ec4b4' }}>+</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.blockquote initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="mt-16 border-t border-background/10 pt-12 max-w-3xl">
          <p className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight text-background/80">
            "Um dos principais desafios foi encontrar o equilíbrio ideal entre técnica e comunicação, transmitindo profissionalismo sem perder dinamismo visual."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function ResultadoPercebido() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const metrics = [
    { icon: <Shield size={18} />, label: "Credibilidade", value: "Autoridade", desc: "Mais confiança no mercado" },
    { icon: <Award size={18} />, label: "Estética", value: "Sofisticação", desc: "Design premium" },
    { icon: <Eye size={18} />, label: "Comunicação", value: "Clareza", desc: "Conteúdo acessível" },
    { icon: <Target size={18} />, label: "Postura", value: "Profissionalismo", desc: "Alinhamento com a operação" },
    { icon: <TrendingUp size={18} />, label: "Market Share", value: "Valor Percebido", desc: "Diferenciação clara" },
    { icon: <Zap size={18} />, label: "Identidade", value: "Consistência", desc: "Fuga do modelo genérico" },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.85] max-w-4xl">Resultado Percebido</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }} className="bg-background p-10 group hover:bg-foreground hover:text-background transition-all duration-500">
              <div className="mb-5 transition-colors" style={{ color: '#1ec4b4' }}>{m.icon}</div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary group-hover:text-background/50 mb-2 block">{m.label}</span>
              <div className="text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-2">{m.value}</div>
              <p className="text-[10px] text-secondary uppercase group-hover:text-background/50">{m.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.blockquote initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="mt-16 pl-8 max-w-2xl border-l-4" style={{ borderColor: '#1ec4b4' }}>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tighter leading-tight">"O projeto mostrou como design estratégico e copywriting podem transformar a forma como empresas técnicas são percebidas no digital."</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

// ============================================================================
// INFLUENCIA SECTIONS
// ============================================================================

function InfluenciaHero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-end pb-24 pt-32 site-section border-none bg-foreground text-background overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <img src="/assets/projects/evidive/backgrounds/hero.gif" alt="Background" className="w-full h-full object-cover opacity-20 grayscale" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="site-container relative z-10">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mb-8 max-w-5xl">
          Como transformei creators em motor de crescimento para a Evidive
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-base md:text-lg text-background/60 uppercase font-medium leading-tight max-w-3xl mb-16">
          Uma estratégia de influência focada em descoberta, confiança e expansão de audiência que gerou crescimento exponencial de alcance, autoridade e presença digital.
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 border border-background/10 rounded-xl overflow-hidden">
          {[
            { value: 500, suffix: "%", prefix: "+", label: "em seguidores" },
            { value: 46.9, suffix: "%", prefix: "+", label: "alcance via creators" },
            { value: 656, suffix: "mil", prefix: "~", label: "pessoas alcançadas" },
            { value: 4500, suffix: "", prefix: "+", label: "seguidores em 1 semana" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="bg-background/5 p-8 md:p-10">
              <div className="text-3xl md:text-5xl font-bold tracking-tighter leading-none mb-2 text-background">
                <AnimCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-background/50">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SobreCliente() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="lg:col-span-5">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85]">
            Um ecossistema muito além do mergulho
          </motion.h2>
        </div>
        <div className="lg:col-span-7 space-y-5">
          {["A Evidive não é apenas uma escola de mergulho. A marca construiu um ecossistema completo voltado para experiências premium, formação técnica e comunidade.", "O desafio estava em tornar o mergulho algo desejável, acessível e possível para pessoas que nunca haviam considerado viver essa experiência.", "A barreira não era apenas comercial. Era cultural e emocional."].map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }} className="text-lg text-secondary uppercase font-medium leading-tight">
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function OProblema() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const barriers = [
    { label: "Distante", desc: "Mergulho percebido como algo fora do alcance da maioria." },
    { label: "Perigoso", desc: "Medo e desconhecimento gerando resistência emocional." },
    { label: "Inacessível", desc: "Alto custo percebido como barreira de entrada." },
    { label: "Complexo", desc: "Processo de aprendizado visto como intimidador." },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/assets/projects/evidive/backgrounds/problema.png" alt="Background" className="w-full h-full object-cover opacity-10 grayscale" />
      </div>
      <div className="site-container relative z-10">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.85] max-w-4xl">
            O desafio era quebrar o imaginário
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          {barriers.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-foreground p-8 md:p-10 border border-background/10 hover:bg-background/5 transition-colors duration-300">
              <div className="text-3xl font-bold tracking-tighter text-background/20 mb-4">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-3 text-background">{b.label}</h3>
              <p className="text-xs text-background/50 uppercase leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="mt-16 text-lg md:text-xl text-background/60 uppercase font-medium max-w-3xl leading-tight">
          O objetivo não era apenas vender cursos. Era transformar: desconhecimento → curiosidade → confiança → desejo real de experiência.
        </motion.p>
      </div>
    </section>
  );
}

function AEstrategia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const steps = ["Creator", "Descoberta", "Curiosidade", "Confiança", "Conversa", "Conversão"];
  const roles = ["descoberta", "validação", "confiança", "aproximação emocional"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="lg:col-span-5">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85]">Creators como pontes de confiança</motion.h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-lg text-secondary uppercase font-medium leading-tight">Em vez de publicidade tradicional, usamos experiências reais para gerar identificação imediata. O creator deixa de ser apenas mídia. Ele se torna:</motion.p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {roles.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center gap-3 border border-border p-4 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" /><span className="text-[10px] font-mono uppercase tracking-widest">{r}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center min-w-max">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-foreground text-background flex items-center justify-center text-center p-2 rounded-xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider leading-tight">{step}</span>
                  </div>
                </motion.div>
                {i < steps.length - 1 && <ArrowRight size={20} className="text-secondary/30 mx-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metodologia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] max-w-3xl">Uma análise baseada em crescimento real</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 border border-background/10 rounded-xl overflow-hidden">
          {[
            { period: "Período 01", tag: "Sem Influência", desc: "Operação padrão, sem ações estruturadas com creators. Crescimento orgânico baseline de 10 meses." },
            { period: "Período 02", tag: "Com Creators", desc: "Estratégia ativa. Mesmos 10 meses, variável analisada: a presença de ações estruturadas de influência." },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }} className="p-10 md:p-14">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-4 block">{p.period}</span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-4 text-background">{p.tag}</h3>
              <p className="text-background/60 uppercase text-xs leading-relaxed max-w-sm">{p.desc}</p>
              {i === 1 && <div className="mt-8 inline-block px-4 py-2 border border-background/30 text-[9px] font-mono uppercase tracking-widest text-background/60 rounded-full">Variável ativa</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resultados() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const metrics = [
    { icon: <Eye size={18} />, label: "Alcance", value: "1M → 1,4M", desc: "contas alcançadas" },
    { icon: <Users size={18} />, label: "Seguidores", value: "3,5k → 21k", desc: "crescimento total" },
    { icon: <TrendingUp size={18} />, label: "Visitas no Perfil", value: "+64,8%", desc: "de crescimento" },
    { icon: <Target size={18} />, label: "Via Influência", value: "46,9%", desc: "do alcance total" },
    { icon: <Award size={18} />, label: "Salvamentos", value: "8.420", desc: "alta intenção" },
    { icon: <Zap size={18} />, label: "Crescimento Base", value: "+369%", desc: "sem pico viral" },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.85] max-w-4xl">Os resultados da estratégia</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }} className="bg-background p-10 group hover:bg-foreground hover:text-background transition-all duration-500">
              <div className="mb-5 group-hover:text-background/60 transition-colors">{m.icon}</div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary group-hover:text-background/50 mb-2 block">{m.label}</span>
              <div className="text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-2">{m.value}</div>
              <p className="text-[10px] text-secondary uppercase group-hover:text-background/50">{m.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.blockquote initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="mt-16 border-l-2 border-foreground pl-8 max-w-2xl">
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tighter leading-tight">"Influência não foi acessória. Ela foi responsável pela descoberta."</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function CasalDayOff() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const stats = [
    { value: "783mil", label: "visualizações" },
    { value: "61mil", label: "interações" },
    { value: "23mil", label: "compartilhamentos" },
    { value: "7,6mil", label: "salvamentos" },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] mb-8">
              Um único conteúdo gerou um pico de crescimento massivo
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="text-background/60 uppercase text-xs leading-relaxed mb-8">
              Um conteúdo publicado pelo creator Casal Day Off se tornou a materialização da estratégia. Mesmo sem collab direto no perfil da marca, o conteúdo gerou impacto massivo.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="border border-background/20 p-8 rounded-xl">
              <div className="text-3xl md:text-5xl font-bold tracking-tighter text-background mb-1">+4.500</div>
              <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-background/50">novos seguidores em uma única semana</p>
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-background/10 mb-10 rounded-xl overflow-hidden border border-background/10">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.08 }} className="bg-foreground p-8 border border-background/10">
                  <div className="text-2xl md:text-3xl font-bold tracking-tighter text-background mb-1">{s.value}</div>
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-background/40">{s.label}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="border-l-2 border-background/30 pl-8">
              <p className="text-base md:text-lg text-background/70 uppercase font-medium leading-tight mb-2">Insight</p>
              <p className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-background leading-tight">
                Grande parte do valor da influência acontece fora do feed da marca.
              </p>
              <p className="mt-4 text-xs md:text-sm text-background/50 uppercase leading-relaxed">
                O creator funciona como um imã de descoberta que leva novas audiências para dentro do ecossistema proprietário da empresa.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InteligenciaEstrategica() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const layers = [
    { step: "01", label: "Creators", desc: "Gerando descoberta e alcance qualificado" },
    { step: "02", label: "Conteúdo", desc: "Criando identificação e prova social" },
    { step: "03", label: "Social Seller", desc: "Convertendo interesse em conversa" },
    { step: "04", label: "Comunidade", desc: "Fortalecendo retenção e pertencimento" },
    { step: "05", label: "Remarketing", desc: "Transformando intenção em venda real" },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16">
          <div className="lg:col-span-6">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[0.85]">
              Não era sobre posts. Era sobre engenharia de crescimento.
            </motion.h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-secondary uppercase font-medium leading-tight">
              Marketing de influência eficiente não opera como campanha pontual. Opera como ecossistema.
            </motion.p>
          </div>
        </div>
        <div className="space-y-px rounded-xl overflow-hidden border border-border">
          {layers.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-center gap-6 md:gap-8 border-b border-border last:border-b-0 p-6 md:p-8 group hover:bg-foreground hover:text-background transition-all duration-500">
              <span className="text-[9px] md:text-[10px] font-mono text-secondary group-hover:text-background/50 w-6 flex-shrink-0">{l.step}</span>
              <div className="w-px h-6 bg-border group-hover:bg-background/20 flex-shrink-0" />
              <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter w-40 flex-shrink-0">{l.label}</h4>
              <p className="text-xs text-secondary uppercase group-hover:text-background/60 hidden md:block">{l.desc}</p>
              <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparacao() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const left = ["Maior resistência do público", "Linguagem comercial explícita", "Menor identificação emocional", "Jornada de compra mais longa"];
  const right = ["Narrativa orgânica e autêntica", "Identificação imediata", "Quebra de objeções naturalmente", "Confiança acelerada"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] max-w-3xl">
            O que muda quando creators entram em cena
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="p-10 md:p-14">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">Publicidade Tradicional</h3>
            <ul className="space-y-4">
              {left.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background/70 text-xs uppercase leading-relaxed">
                  <span className="text-background/30 mt-1 flex-shrink-0">—</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }} className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-background/10">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">Creator Experience</h3>
            <ul className="space-y-4">
              {right.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background text-xs uppercase font-medium leading-relaxed">
                  <span className="text-background/40 mt-1 flex-shrink-0">+</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.blockquote initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="mt-16 border-t border-background/10 pt-12 max-w-3xl">
          <p className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight text-background/80">
            "Pessoas confiam mais em pessoas vivendo experiências reais do que em marcas falando sobre si mesmas."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function Conclusao() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const points = ["construção de percepção", "expansão de audiência qualificada", "prova social", "comunidade", "retenção", "crescimento sustentável"];
  return (
    <>
      <section ref={ref} className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            <div className="lg:col-span-5">
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85]">
                Quanto mais pessoas contam a história, mais pessoas entram no ecossistema da marca
              </motion.h2>
            </div>
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-secondary uppercase font-medium leading-tight">
                O case da Evidive mostrou que influência não é apenas alcance. É:
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {points.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }} className="flex items-center gap-3 border border-border p-4 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{p}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="text-base md:text-lg text-secondary uppercase font-medium leading-tight pt-4 border-t border-border">
                Quando creators certos entram em ação, a marca deixa de depender apenas de anúncios e começa a construir autoridade contínua.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="site-section py-24 md:py-32 bg-foreground text-background border-none">
        <div className="site-container text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mb-8 max-w-4xl mx-auto">
            Sua marca também pode transformar influência em crescimento real.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-background/60 uppercase font-medium leading-tight max-w-2xl mx-auto mb-12">
            Estruturamos operações de influência focadas em descoberta, autoridade, comunidade e performance.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-10 py-5 rounded-full">
              Fale comigo <ArrowRight size={18} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
