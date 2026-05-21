import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/marco-boni")({
  head: () => ({
    meta: [
      { title: "Marco Boni - Mídia Impressa - Murilo Ortega" },
      { name: "description", content: "Mídia Impressa e Catálogos de Alta Performance para Marco Boni." },
    ],
  }),
  component: ProjetoMarcoBoni,
});

function ProjetoMarcoBoni() {
  return (
    <div className="bg-background min-h-screen pt-24">
      {/* Header Clean */}
      <div className="site-container pt-12 pb-16 text-center flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] mb-6">Marco Boni</h1>
        <p className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl">
          Desenvolvimento de catálogos e direção de materiais institucionais focados em excelência visual.
        </p>
      </div>

      {/* Galeria Imagem (com respiro e cantos arredondados) */}
      <div className="w-full flex flex-col items-center anim-fade-in">
        <div className="site-container my-12 md:my-16">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/marco-boni/print/1.jpg" 
              alt="Marco Boni Print 1" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo" 
            />
          </div>
        </div>
      </div>

      {/* Navegação entre Projetos */}
      <section className="site-section border-t border-border/50 py-12 md:py-16">
        <div className="site-container flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link to="/trabalho" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/livin" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoMarcoBoni;
