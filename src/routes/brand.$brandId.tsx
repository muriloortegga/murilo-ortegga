import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/brand/$brandId")({
  component: BrandPage,
});

function BrandPage() {
  const { brandId } = useParams({ from: "/brand/$brandId" });
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brandName = brandId.charAt(0).toUpperCase() + brandId.slice(1);

  return (
    <div ref={revealRef} className="bg-background min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="site-container relative z-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-8 block anim-fade-in">Brand Case</span>
          <h1 className="text-[12vw] leading-[0.8] tracking-tighter uppercase anim-fade-in">
            {brandName}
          </h1>
          <p className="mt-12 text-xl text-secondary max-w-2xl mx-auto anim-fade-in delay-250">
            Exploração visual e estratégica para {brandName}. Um sistema completo de identidade e presença digital.
          </p>
        </div>
      </section>

      {/* Visual System */}
      <section className="site-section border-t border-border">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="scroll-reveal aspect-square bg-card overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop" 
                alt="Detail 1"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="scroll-reveal aspect-square bg-card overflow-hidden md:mt-24">
               <img 
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop" 
                alt="Detail 2"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for content */}
      <section className="site-section bg-card">
        <div className="site-container text-center">
          <h2 className="text-4xl font-bold uppercase mb-8">Mais detalhes em breve</h2>
          <Link to="/trabalho" className="text-link">Voltar para Projetos</Link>
        </div>
      </section>
    </div>
  );
}
