import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  PerformanceHero, 
  CopyFeature, 
  SingleImageShowcase 
} from "@/components/social-media-case";
import { 
  TestimonialCTA 
} from "@/components/social-case-layout";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { z } from "zod";

const projectSearchSchema = z.object({
  service: z.string().optional().catch("social"),
});

export const Route = createFileRoute("/milgrows")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Milgrows - Murilo Ortega" },
      { name: "description", content: "Estratégia de Social Media e Educação sobre Cannabis Medicinal para Milgrows." },
    ],
  }),
  component: ProjetoMilgrows,
});

function ProjetoMilgrows() {
  const { service } = Route.useSearch();
  const [activeService, setActiveService] = useState(service || "social");

  const services = [
    { id: "social", label: "Social Media" }
  ];

  const metaData = [
    { label: "Cliente", value: "Milgrows" },
    { label: "Ano", value: "2023" },
    { label: "Nicho", value: "Cannabis Medicinal" },
    { label: "Skills", value: "Social Media, Educação" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="Milgrows"
        phrase="Semeando Conhecimento"
        description="Uma organização voltada à promoção do acesso seguro, legal e informado à cannabis medicinal. Suporte a pacientes e conexão com respaldo jurídico especializado."
        niche="Saúde & Movimento Social"
        meta={metaData}
        accentColor="#2ECC71"
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
        accentColor="#2ECC71"
      />

      {activeService === "social" && (
        <div className="anim-fade-in">
          <PerformanceHero 
            followers={11000}
            followersLabel="Novos Seguidores"
            anchorText="Identidade e base consolidada"
            mockupImg="/assets/projects/milgrows/social/mockups/performance.png" 
            accentColor="#2ECC71"
          />

          <CopyFeature 
            headline="COPYWRITING, REDAÇÃO E DESIGN QUE IA NENHUMA CONSEGUE CRIAR."
            contentCount={100}
            contentLabel="Conteúdos Criados"
            accentColor="#0C2D1C"
            mockupImg="/assets/projects/milgrows/social/mockups/copy-showcase.png"
          />

          <SingleImageShowcase 
            src="/assets/projects/milgrows/social/gallery/art-01.png"
          />

          <TestimonialCTA 
            clientName="Associação MilGrows"
            clientRole="Diretoria Executiva"
            testimonial="O Murilo traduziu temas complexos em conteúdos acolhedores. Ele conseguiu posicionar a MilGrows como uma autoridade humana e confiável."
            clientImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
          />
        </div>
      )}

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-primary gap-2">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/kapyi" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoMilgrows;
