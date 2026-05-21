import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/brand-header";

export const Route = createFileRoute("/livin")({
  head: () => ({
    meta: [
      { title: "Livin Company — Mídia Impressa — Murilo Ortega" },
      { name: "description", content: "Projeto editorial e catálogos para a Livin Company." },
    ],
  }),
  component: ProjetoLivin,
});

function ProjetoLivin() {
  const metaData = [
    { label: "Cliente", value: "Livin Company" },
    { label: "Segmento", value: "Importação & Decor" },
    { label: "Contexto", value: "Feiras SP (ABCasa / DecorLab)" },
    { label: "Skills", value: "Design Editorial, Print" }
  ];

  const accentColor = "#888888"; // Tom neutro/sofisticado para home decor

  return (
    <div className="bg-background min-h-screen">
      <BrandHeader 
        client="Livin Company"
        phrase="Design Editorial Imersivo"
        description="Direção de arte e design editorial de catálogos impressos para uma grande importadora de móveis e itens de home design (quadros, esculturas, decoração). O projeto foi pensado para grandes feiras de negócios em São Paulo, como ABCasa Fair e DecorLab, entregando uma experiência tátil de altíssimo padrão."
        niche="Home Design & Móveis"
        meta={metaData}
      />

      <div className="anim-fade-in w-full bg-background pb-32">
        {/* Header Minimalista (Estilo OOH) */}
        <div className="site-container pt-12 pb-16 text-center flex flex-col items-center border-t border-border/10 mt-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 max-w-3xl">
            A Experiência Visual Tátil
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-base md:text-lg text-secondary uppercase font-medium leading-tight max-w-2xl">
            Catálogos desenvolvidos para materializar a exclusividade dos produtos, com foco na jornada do cliente B2B nas maiores feiras do setor.
          </motion.p>
        </div>

        <div className="w-full flex flex-col items-center">
          <img src="/assets/projects/livin/print/1.jpg" alt="Catálogo Livin Capa" className="w-full h-auto block" />
          
          <IntersticialCopy 
            title="Direção de Arte Elegante" 
            text="O uso estratégico de grids minimalistas e respiros visuais permite que cada peça de design respire, transferindo o valor estético do móvel para o catálogo."
            accentColor={accentColor}
          />

          <img src="/assets/projects/livin/print/2.jpg" alt="Catálogo Livin Interna 1" className="w-full h-auto block" />
          
          <IntersticialCopy 
            title="Destaque nos Detalhes" 
            text="A fotografia e a tipografia foram alinhadas rigorosamente para criar um ritmo de leitura impecável, garantindo que os clientes absorvam as especificações técnicas sem esforço visual."
            accentColor={accentColor}
          />

          <img src="/assets/projects/livin/print/3.jpg" alt="Catálogo Livin Interna 2" className="w-full h-auto block" />
          
          <IntersticialCopy 
            title="Posicionamento no PDV" 
            text="Mais do que um catálogo, o material funciona como uma ferramenta de autoridade para os vendedores, elevando a percepção da marca diante da concorrência."
            accentColor={accentColor}
          />
        </div>
      </div>

      <section className="site-section border-t border-border mt-16">
        <div className="site-container flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/trabalho" className="btn btn-primary gap-2 w-full md:w-auto text-center justify-center">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/marco-boni" className="btn btn-primary gap-2 w-full md:w-auto text-center justify-center">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function IntersticialCopy({ title, text, accentColor }: { title: string, text: string, accentColor: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-background border-y border-border/50 my-1">
      <div className="site-container flex flex-col md:flex-row items-start gap-8 md:gap-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="md:w-1/3">
           <div className="w-8 h-1 mb-6" style={{ backgroundColor: accentColor }} />
           <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter leading-tight">
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

export default ProjetoLivin;
