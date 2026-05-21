import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Award, Eye, Target, TrendingUp, Zap } from "lucide-react";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { EditorialSocialCase } from "@/components/social-case-layout";
import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("social"),
});

export const Route = createFileRoute("/maxi")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Colégio Maxi - Case Study - Murilo Ortega" },
      { name: "description", content: "Estratégia de Social Media e Mídia OOH para o Colégio Maxi." },
    ],
  }),
  component: ProjetoMaxi,
});

function ProjetoMaxi() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "social");

  const services = [
    { id: "social", label: "Social Media" },
    { id: "ooh", label: "Mídia OOH" },
  ];

  const metaData = [
    { label: "Cliente", value: "Colégio Maxi" },
    { label: "Ano", value: "2024" },
    { label: "Nicho", value: "Educação & Alta Performance" },
    { label: "Skills", value: "Social Media, OOH, Copywriting" },
  ];

  const accentColor = "#cc0000"; // Tons de vermelho

  return (
    <div className="bg-background">
      <BrandHeader
        client="Colégio Maxi"
        phrase="Tradição que Evolui"
        description="O Colégio Maxi é uma instituição de ensino com trajetória consolidada, focada em excelência acadêmica, desenvolvimento humano e aprovações em vestibulares."
        niche="Educação & Performance"
        meta={metaData}
        accentColor={accentColor}
      />

      <ServiceSelector
        options={services}
        activeId={activeService}
        onChange={setActiveService}
      />

      {activeService === "social" && (
        <div className="anim-fade-in bg-background">
          <EditorialSocialCase 
            mainImg="/assets/projects/maxi/social/hero.png"
            designTitle="Tradição & Contemporaneidade"
            designText="O desafio era modernizar e fortalecer a presença digital da instituição sem perder a credibilidade consolidada. O trabalho envolveu uma comunicação visual estratégica, alinhada à identidade e focada na consistência."
            copyTitle="Autoridade & Proximidade"
            copyText="Conteúdos criados para transmitir autoridade educacional, gerar conexão com famílias e valorizar a infraestrutura e os diferenciais do Maxi, traduzindo o peso da marca para o digital."
            stats={[
              { label: "Posicionamento", value: "Alto Desempenho" },
              { label: "Comunicação", value: "Estratégica" }
            ]}
          />

          <ObjetivoProjeto accentColor={accentColor} />
          <DirecaoCriativa accentColor={accentColor} />
          <CampanhaDeVoltaParaCasa accentColor={accentColor} />
          <ResultadoPercebido accentColor={accentColor} />
        </div>
      )}

      {activeService === "ooh" && (
        <div className="anim-fade-in w-full bg-background pb-32">
          {/* Header Minimalista para OOH */}
          <div className="site-container pt-24 pb-16 text-center flex flex-col items-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-6 max-w-3xl">
              Presença Urbana e Memória de Marca
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-base md:text-lg text-secondary uppercase font-medium leading-tight max-w-2xl">
              Campanhas externas projetadas para reafirmar a liderança educacional do Colégio Maxi. Mídia OOH desenhada para impacto imediato e clareza na mensagem.
            </motion.p>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="site-container my-12 md:my-20">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img src="/assets/projects/maxi/ooh/1.jpg" alt="Maxi OOH 1" className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo" />
              </div>
            </div>
            
            <IntersticialCopy 
              title="A Força da Escala" 
              text="No ambiente urbano, o tempo de atenção é mínimo. O design precisa ser preciso, a hierarquia da informação impecável e a identidade da marca instantaneamente reconhecível."
              accentColor={accentColor}
            />

            <div className="site-container my-12 md:my-20">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img src="/assets/projects/maxi/ooh/2.jpg" alt="Maxi OOH 2" className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo" />
              </div>
            </div>
            
            <IntersticialCopy 
              title="Consistência em Múltiplos Formatos" 
              text="A tradução da campanha digital para o meio físico exigiu adaptação técnica, mantendo o apelo emocional e a seriedade que a instituição exige."
              accentColor={accentColor}
            />

            <div className="site-container my-12 md:my-20">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img src="/assets/projects/maxi/ooh/3.jpg" alt="Maxi OOH 3" className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo" />
              </div>
            </div>
            
            <IntersticialCopy 
              title="Autoridade Pela Presença" 
              text="O impacto do OOH complementa a estratégia de performance e awareness, cercando o público-alvo com a solidez e os resultados da marca no seu dia a dia."
              accentColor={accentColor}
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

export default ProjetoMaxi;

// ============================================================================
// SOCIAL MEDIA SECTIONS
// ============================================================================

function ObjetivoProjeto({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const barriers = [
    { label: "Modernização", desc: "Atualizar a presença digital sem perder a seriedade, a credibilidade e a tradição." },
    { label: "Proximidade", desc: "Desenvolver uma linguagem que aproxima a escola das famílias e dos alunos." },
    { label: "Autoridade", desc: "Reforçar os diferenciais acadêmicos e a força do modelo de ensino." },
    { label: "Consistência", desc: "Organizar estrategicamente a comunicação para um visual mais profissional e limpo." },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl">
            O Desafio da Evolução
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          {barriers.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-foreground p-8 md:p-10 border border-background/10 hover:bg-background/5 transition-colors duration-300">
              <div className="text-3xl font-bold tracking-tighter mb-4" style={{ color: accentColor }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-3 text-background">{b.label}</h3>
              <p className="text-xs text-background/50 uppercase leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="mt-16 text-lg md:text-xl text-background/60 uppercase font-medium max-w-3xl leading-tight">
          A estratégia foi desenhada para equilibrar a rica história do Colégio com as demandas de uma comunicação digital dinâmica e atualizada.
        </motion.p>
      </div>
    </section>
  );
}

function DirecaoCriativa({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const steps = ["Identidade Sólida", "Organização", "Linguagem Institucional", "Clareza Visual", "Legibilidade"];
  const roles = ["tradição", "pertencimento", "excelência acadêmica", "visão de futuro"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-20">
          <div className="lg:col-span-5">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-2xl md:text-4xl font-bold uppercase tracking-tighter leading-[0.95]">Direção de Arte & Copywriting</motion.h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-lg text-secondary uppercase font-medium leading-tight">O trabalho exigiu a construção de uma narrativa que respeitasse o legado do colégio enquanto comunicava para novas gerações. Cada material publicado precisava transmitir:</motion.p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {roles.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center gap-3 border border-border p-4 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} /><span className="text-[10px] font-mono uppercase tracking-widest">{r}</span>
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
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-foreground text-background flex items-center justify-center text-center p-3 rounded-xl border-b-4" style={{ borderColor: accentColor }}>
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

function CampanhaDeVoltaParaCasa({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const left = ["Apenas números e estatísticas", "Frieza na comunicação comercial", "Foco exclusivo em vendas sem conexão", "Esquecimento do legado e da história"];
  const right = ["Conceito de reencontro", "Apelo emocional forte e moderno", "Despertar da memória afetiva", "Reforço da relevância do cursinho"];
  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background">
      <div className="site-container">
        <div className="mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/50 mb-4 block">Marco do Projeto</span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl">
            Campanha: Maxi de Volta para Casa
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-6 text-lg text-background/60 uppercase font-medium leading-tight max-w-3xl">
            O objetivo era promover o retorno do renomado cursinho pré-vestibular, um símbolo histórico de alto número de matrículas e grandes aprovações na instituição.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="p-10 md:p-14">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">O que evitamos</h3>
            <ul className="space-y-4">
              {left.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background/70 text-xs uppercase leading-relaxed">
                  <span className="text-background/30 mt-1 flex-shrink-0">-</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }} className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-background/10 relative">
            <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: accentColor }} />
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/40 mb-6">Minha Estratégia</h3>
            <ul className="space-y-4">
              {right.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-background text-xs uppercase font-medium leading-relaxed">
                  <span className="mt-1 flex-shrink-0" style={{ color: accentColor }}>+</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.blockquote initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="mt-16 border-t border-background/10 pt-12 max-w-3xl">
          <p className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight text-background/80">
            "Construí uma campanha emocional baseada no reencontro, sem perder a seriedade. Uma lembrança poderosa da tradição de excelência que o cursinho Maxi sempre representou."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function ResultadoPercebido({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const metrics = [
    { icon: <Shield size={18} />, label: "Credibilidade", value: "Tradição", desc: "Histórico mantido e honrado" },
    { icon: <Award size={18} />, label: "Aprovações", value: "Destaque", desc: "Resultados em evidência" },
    { icon: <Eye size={18} />, label: "Visibilidade", value: "Atenção", desc: "Presença digital consolidada" },
    { icon: <Target size={18} />, label: "Comunicação", value: "Estratégia", desc: "Conteúdos organizados" },
    { icon: <TrendingUp size={18} />, label: "Crescimento", value: "Relevância", desc: "Marca modernizada" },
    { icon: <Zap size={18} />, label: "Engajamento", value: "Afetividade", desc: "Conexão com famílias e alunos" },
  ];
  return (
    <section ref={ref} className="site-section py-24 md:py-32">
      <div className="site-container">
        <div className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl">O Resultado</motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }} className="bg-background p-10 group hover:bg-foreground hover:text-background transition-all duration-500">
              <div className="mb-5 transition-colors" style={{ color: accentColor }}>{m.icon}</div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary group-hover:text-background/50 mb-2 block">{m.label}</span>
              <div className="text-2xl md:text-3xl font-bold tracking-tighter leading-none mb-2">{m.value}</div>
              <p className="text-[10px] text-secondary uppercase group-hover:text-background/50">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// OOH SECTIONS
// ============================================================================

function IntersticialCopy({ title, text, accentColor }: { title: string, text: string, accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-background border-y border-border/50 my-1">
      <div className="site-container flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="md:w-1/3">
           <div className="w-8 h-1 mb-6" style={{ backgroundColor: accentColor }} />
           <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tighter leading-tight">
             {title}
           </h3>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="md:w-2/3">
           <p className="text-lg md:text-xl text-secondary uppercase font-medium leading-relaxed max-w-2xl">
             {text}
           </p>
        </motion.div>
      </div>
    </section>
  );
}
