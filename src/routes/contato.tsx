import { createFileRoute } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Murilo Ortega" },
      { name: "description", content: "Vamos conversar. Se sua marca está abaixo do nível do seu negócio, é aqui que começa." },
      { property: "og:title", content: "Contato — Murilo Ortega" },
      { property: "og:description", content: "Vamos conversar sobre sua marca." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="pt-24 md:pt-32 pb-32">
      <section className="site-section border-t-0">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-12 anim-fade-in">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12">Contato</h1>
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl">
                Vamos <span className="text-secondary font-medium italic">conversar.</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 md:pt-16 border-t border-border mt-12 md:mt-16">
                <div className="space-y-10 md:space-y-12">
                  <p className="text-lg md:text-xl text-foreground font-medium uppercase tracking-tight leading-tight max-w-md">
                    Se você sente que sua marca está abaixo do nível do seu negócio, é aqui que começa.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full flex items-center justify-center gap-2">
                      WhatsApp <MessageSquare size={18} />
                    </a>
                    <a href="https://calendly.com/contato-muriloortega1/30min" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-10 py-5 rounded-full flex items-center justify-center gap-2">
                      Agendar Call <Calendar size={18} />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/40">E-mail</span>
                    <p className="text-base md:text-lg font-bold uppercase tracking-tighter hover:text-secondary transition-colors cursor-pointer">contato@muriloortega.com</p>
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary/40">Social</span>
                    <div className="flex flex-col gap-3">
                       {["LinkedIn", "Instagram", "Upwork"].map(social => (
                         <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group hover:text-secondary transition-all">
                           {social} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                         </a>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContatoPage;
