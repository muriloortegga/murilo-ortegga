import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WebsiteShowcase } from "@/components/website-scroll-showcase";

import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("marca"),
});

export const Route = createFileRoute("/kmillion")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Kmillion - Case Study - Murilo Ortega" },
      { name: "description", content: "Identidade Visual e Inteligência Promocional para Kmillion Promotech." },
    ],
  }),
  component: ProjetoKmillion,
});

function ProjetoKmillion() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "marca");

  const services = [
    { id: "marca", label: "Id Visual" },
    { id: "websites", label: "Websites" }
  ];

  const metaData = [
    { label: "Cliente", value: "Kmillion" },
    { label: "Ano", value: "2024" },
    { label: "Tech", value: "Promotech / Varejo" },
    { label: "Skills", value: "Id Visual, UI/UX" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="Kmillion"
        phrase="Inteligência Adaptável"
        description="Transformando promoções em canais de relacionamento. Inspirada na adaptabilidade do camaleão, a Kmillion entrega autonomia e inteligência para o marketing de varejo."
        niche="Tecnologia & Varejo"
        meta={metaData}
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
      />

      {activeService === "marca" && (
        <div className="anim-fade-in pb-32">
          {/* Hero Logo Area */}
          <div className="site-container py-12 md:py-20 text-center border-t border-border/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[280px] md:max-w-[320px] mx-auto"
            >
              <img 
                src="/assets/projects/kmillion/logo.svg" 
                alt="Kmillion Logo" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Bloco 1 - Centralizado */}
          <section className="py-12 md:py-16 bg-off-white border-y border-border/10">
            <div className="site-container text-center max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1] mb-8"
              >
                Inteligência adaptável <br />
                <span className="font-extrabold text-foreground">para o varejo moderno.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16"
              >
                Inspirada na flexibilidade e dinamismo do camaleão, a identidade visual da Kmillion foi estruturada para refletir autonomia, robustez e inovação tecnológica nas promoções de grande escala.
              </motion.p>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/kmillion/1.png" 
                  alt="Kmillion Inteligência Varejo" 
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
                />
              </div>
            </div>
          </section>

          {/* Bloco 2 - Alinhado à Esquerda */}
          <section className="py-12 md:py-16 bg-background">
            <div className="site-container">
              <div className="max-w-3xl text-left mb-12 md:mb-16 space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1]"
                >
                  Design que gera <br />
                  conexão e engajamento.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  A combinação de formas orgânicas e cores quentes com uma tipografia sólida transmite credibilidade institucional e proximidade no relacionamento com os varejistas.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/kmillion/2.png" 
                  alt="Kmillion Conexão e Design" 
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
                />
              </div>
            </div>
          </section>

          {/* Bloco 3 - Alinhado à Esquerda */}
          <section className="py-12 md:py-16 bg-off-white border-y border-border/10">
            <div className="site-container">
              <div className="max-w-3xl text-left mb-12 md:mb-16 space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1]"
                >
                  Adaptabilidade visual <br />
                  em cada detalhe do ecossistema.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  A marca foi desenhada para funcionar perfeitamente em múltiplos contextos, desde a interface de usuário de alta fidelidade até materiais corporativos de conversão.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/kmillion/3.png" 
                  alt="Kmillion Adaptabilidade" 
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
                />
              </div>
            </div>
          </section>

          {/* Bloco 4 - Alinhado à Esquerda */}
          <section className="py-12 md:py-16 bg-background">
            <div className="site-container">
              <div className="max-w-3xl text-left mb-12 md:mb-16 space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1]"
                >
                  Rigor visual e <br />
                  consistência de marca.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  O manual de identidade orienta a aplicação coesa de grids, contrastes de cores e elementos visuais em todas as superfícies de contato institucionais.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/kmillion/4.png" 
                  alt="Kmillion Consistência" 
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
                />
              </div>
            </div>
          </section>
        </div>
      )}

      {activeService === "websites" && (
        <div className="anim-fade-in">
          <WebsiteShowcase 
            title="O Site"
            description="Assumi a criação de copywriting e web design da página. Baseado no brandbook, criei uma interface limpa, focada em resultados e autoridade."
            mediaSrc="/assets/projects/thumbnails/websites/kmillion.gif"
            roleTitle="Inteligência Visual"
            roleDescription="A página funciona como o principal motor de autoridade da marca. Com um design estratégico, direcionamos a atenção do usuário para o ecossistema de inteligência promocional da Kmillion, reduzindo atrito e educando o cliente durante o scroll."
          />
        </div>
      )}

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-primary gap-2">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/solid" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoKmillion;
