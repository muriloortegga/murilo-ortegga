import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BrandHeader } from "@/components/brand-header";
import { ServiceSelector } from "@/components/service-selector";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solid")({
  head: () => ({
    meta: [
      { title: "Solid+ — Murilo Ortega" },
      { name: "description", content: "Identidade Visual e Fintech Systems para Solid+." },
    ],
  }),
  component: ProjetoSolid,
});

function ProjetoSolid() {
  const [activeService, setActiveService] = useState("marca");

  const services = [
    { id: "marca", label: "Id Visual" }
  ];

  const metaData = [
    { label: "Cliente", value: "Solid+" },
    { label: "Ano", value: "2024" },
    { label: "Segmento", value: "Fintech" },
    { label: "Skills", value: "Id Visual, Fintech Design" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="Solid+"
        phrase="Estrutura Robusta"
        description="Fintech Identity & Systems. Design que transmite solidez, confiança e inovação para o mercado financeiro digital."
        niche="Fintech & Digital Systems"
        meta={metaData}
      />

      <ServiceSelector 
        options={services} 
        activeId={activeService} 
        onChange={setActiveService} 
      />

      <div className="anim-fade-in site-container pb-32 space-y-8 md:space-y-12">
         <img src="/solid-full.png" alt="Solid+ Branding" className="w-full h-auto border border-border shadow-2xl rounded-2xl" />
         <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" alt="Solid+ Office" className="w-full h-auto border border-border grayscale rounded-2xl" />
      </div>

      <section className="site-section border-t border-border mt-32">
        <div className="site-container flex justify-between items-center">
          <Link to="/trabalho" className="btn btn-primary gap-2">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/symplice" className="btn btn-primary gap-2">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoSolid;
