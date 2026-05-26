import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PerformanceHero, 
  CopyFeature, 
  LiveArtGallery, 
  ReelsShowcase 
} from "@/components/social-media-case";
import { 
  TestimonialCTA 
} from "@/components/social-case-layout";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WebsiteShowcase } from "@/components/website-scroll-showcase";

import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("marca"),
});

export const Route = createFileRoute("/natrave")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "NaTrave App - Murilo Ortega" },
      { name: "description", content: "Estratégia de Social Media e Branding para o NaTrave App." },
    ],
  }),
  component: ProjetoNaTrave,
});

function ProjetoNaTrave() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "marca");

  const services = [
    { id: "marca", label: "Id Visual" },
    { id: "social", label: "Social Media" },
    { id: "websites", label: "Websites" }
  ];

  const metaData = [
    { label: "Papel", value: "Direção & Design" },
    { label: "Ano", value: "2024" },
    { label: "Plataforma", value: "iOS & Android" },
    { label: "Skills", value: "UX/UI, Social" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="NaTrave App"
        phrase="Virando o Jogo"
        description="O futebol amador elevado ao nível de elite. Uma plataforma para conectar jogadores, organizadores e a paixão pelo esporte sem burocracia."
        niche="Projeto Autoral - Esporte & Tech"
        meta={metaData}
        accentColor="#FF6B00"
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
        accentColor="#FF6B00"
      />

      {activeService === "social" && (
        <div className="anim-fade-in">
          <PerformanceHero 
            followers={2250}
            contentCount={100}
            mockupImg="/assets/projects/natrave/social/mockups/performance-overview.png" 
            accentColor="#FF6B00"
          />

          <CopyFeature 
            headline="COPYWRITING, REDAÇÃO E DESIGN QUE IA NENHUMA CONSEGUE CRIAR."
            contentCount={100}
            contentLabel="Conteúdos Criados"
            accentColor="#111111"
            mockupImg="/assets/projects/natrave/social/mockups/copy-showcase.png"
          />

          <LiveArtGallery 
            sections={[
              {
                title: "Jornalismo esportivo nas mídias sociais",
                layout: 'top',
                image: "/assets/projects/natrave/social/gallery/art-01.jpg"
              },
              {
                title: "Conteúdo que gera identificação com o público alvo",
                layout: 'bottom',
                image: "/assets/projects/natrave/social/gallery/art-02.jpg"
              },
              {
                title: "Design alinhado á identidade visual da marca",
                layout: 'top',
                image: "/assets/projects/natrave/social/gallery/art-03.jpg"
              }
            ]}
          />

          <ReelsShowcase 
            headline="CONTEÚDO EM MOVIMENTO"
            subheadline="Desenvolvimento de Stories e Reels estratégicos para fortalecer a presença digital e o engajamento da marca."
            videos={[
              { url: "/assets/projects/natrave/social/videos/video-01.mp4", category: "Reels" },
              { url: "/assets/projects/natrave/social/videos/video-02.mp4", category: "Stories" },
              { url: "/assets/projects/natrave/social/videos/video-03.mp4", category: "Institucional" },
              { url: "/assets/projects/natrave/social/videos/video-04.mp4", category: "Cobertura" },
            ]}
          />

          <TestimonialCTA 
            clientName="Fundador NaTrave"
            clientRole="CEO & Founder"
            testimonial="O Murilo não apenas desenhou o app, ele construiu a voz da nossa comunidade. O crescimento no Social foi o motor da nossa tração inicial."
            clientImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
          />
        </div>
      )}

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
                src="/assets/projects/natrave/logo.svg" 
                alt="NaTrave Logo" 
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
                O futebol amador elevado <br />
                <span className="font-extrabold text-foreground">ao nível de elite.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16"
              >
                Uma identidade desenvolvida para dar visibilidade e profissionalismo aos campeonatos de várzea, conectando paixão, tecnologia e comunidade em uma única experiência visual.
              </motion.p>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/natrave/1.png" 
                  alt="NaTrave Experiência Visual" 
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
                  Design focado em <br />
                  energia e performance.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  A combinação do laranja vibrante com pretos e cinzas profundos cria um contraste dinâmico que evoca a emoção das quadras e campos, mantendo o rigor técnico de uma plataforma digital moderna.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/natrave/2.png" 
                  alt="NaTrave Cores e Performance" 
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
                  Uma linguagem conectada <br />
                  à comunidade de base.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  Do desenho do ícone à escolha tipográfica, cada detalhe foi planejado para refletir a autenticidade e a garra do esporte de base, construindo identificação imediata com os atletas.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/natrave/3.png" 
                  alt="NaTrave Identidade" 
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
                  Flexibilidade para <br />
                  um ecossistema completo.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
                >
                  A identidade se desdobra de forma consistente e adaptável entre o aplicativo móvel, materiais de comunicação impressos e ativos digitais para redes sociais.
                </motion.p>
              </div>
            </div>
            <div className="site-container">
              <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
                <img 
                  src="/assets/projects/natrave/4.png" 
                  alt="NaTrave Ecossistema" 
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
            title="A Plataforma"
            description="Para o NaTrave, desenvolvi a parte de copywriting e o design completo da interface da plataforma. O foco foi estruturar uma usabilidade limpa para a comunidade."
            mediaSrc="/assets/projects/thumbnails/websites/natrave.gif"
            roleTitle="Identidade & Conversão"
            roleDescription="A identidade visual do projeto web seguiu rigorosamente as diretrizes do brandbook estabelecido, garantindo que a transição do aplicativo para a experiência desktop fosse totalmente coesa, intuitiva e voltada para alta performance."
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

export default ProjetoNaTrave;
