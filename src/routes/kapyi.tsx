import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { EditorialSocialCase } from "@/components/social-case-layout";
import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("social"),
});

export const Route = createFileRoute("/kapyi")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Agência Kapyi - Case Study - Murilo Ortega" },
      { name: "description", content: "Direção criativa, branding e estratégia digital na Agência Kapyi." },
    ],
  }),
  component: ProjetoKapyi,
});

function ProjetoKapyi() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "social");

  const services = [
    { id: "social", label: "Direção & Social" }
  ];

  const metaData = [
    { label: "Agência", value: "Kapyi" },
    { label: "Duração", value: "2.5 Anos" },
    { label: "Papel", value: "Liderança Criativa" },
    { label: "Skills", value: "Branding, Copy" },
  ];

  const accentColor = "#FF4500"; 

  return (
    <div className="bg-background">
      <BrandHeader
        client="Agência Kapyi"
        phrase="Estética e Estratégia"
        description="Fugindo de fórmulas prontas. Uma atuação de 2,5 anos unindo branding e direção criativa para posicionar marcas de forma premium no ambiente online."
        niche="Agência Criativa"
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
          {/* Seção 1: Hero & Contexto */}
          <EditorialSocialCase 
            mainImg="/assets/projects/kapyi/social/hero.png"
            designTitle="Muito Além do Post"
            designText="Na Kapyi, o trabalho não era sobre volume, mas sobre percepção de valor. Atuando na direção de campanhas e estratégias para nichos distintos (engenharia, educação, clínicas, tech), o objetivo sempre foi traduzir narrativas de marca para o comportamento nativo das redes."
            copyTitle="Narrativas de Valor"
            copyText="O desafio era produzir comunicações que não parecessem excessivamente publicitárias ou artificiais. Construí posicionamentos autênticos com design e copy profundamente alinhados."
            stats={[
              { label: "Tempo de Atuação", value: "2.5 Anos" },
              { label: "Foco Principal", value: "Branding Digital" }
            ]}
          />

          {/* Seção 2: A Abordagem e Entrega (Resumo final) */}
          <AbordagemEstrategica accentColor={accentColor} />
        </div>
      )}

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-primary gap-2">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/milgrows" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoKapyi;

// ============================================================================
// SOCIAL MEDIA SECTIONS
// ============================================================================

function AbordagemEstrategica({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const pilares = [
    { label: "Estratégia", desc: "Social Media tratado como Branding, não apenas posts recorrentes." },
    { label: "Identidade", desc: "Design autêntico adaptado à linguagem nativa de cada plataforma." },
    { label: "Consistência", desc: "Organização criativa para sustentar posicionamento premium a longo prazo." }
  ];

  return (
    <section ref={ref} className="site-section py-24 md:py-32 bg-foreground text-background">
      <div className="site-container">
        <div className="mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-background/50 mb-4 block">A Visão Kapyi</span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.85] max-w-4xl">
            A Diferença na Execução
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-6 text-lg text-background/60 uppercase font-medium leading-tight max-w-3xl">
            O resultado de mais de dois anos de liderança criativa foi a construção de projetos robustos, onde clareza visual e impacto se equilibravam com sofisticação.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-background/10 rounded-xl overflow-hidden border border-background/10">
          {pilares.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="p-10 md:p-14 bg-foreground relative hover:bg-background/5 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />
              <div className="text-xl font-bold uppercase tracking-tighter mb-4 text-background">{p.label}</div>
              <p className="text-xs text-background/60 uppercase leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
