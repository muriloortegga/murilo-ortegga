import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, Calendar, Users, CheckSquare, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/metodos/sistema-de-conteudo")({
  head: () => ({
    meta: [
      { title: "Comunicação de Marca — Murilo Ortega" },
      { name: "description", content: "Um sistema integrado de social media que transforma sua presença digital em autoridade." },
    ],
  }),
  component: SistemaConteudoPage,
});

function SistemaConteudoPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="bg-background pt-24 md:pt-32">
      {/* Hero */}
      <section className="site-section border-t-0 pt-0 pb-16 md:pb-24">
        <div className="site-container">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 leading-[0.95] uppercase tracking-tighter">
              Social Media como um<br />
              sistema <span className="text-secondary font-medium italic">integrado</span><br />
              de autoridade.
            </h1>
            <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10 md:mb-12 max-w-2xl">
              Esqueça postagens isoladas. Crio um ecossistema de conteúdo que sustenta sua marca e converte audiência em clientes reais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-10 py-5 rounded-full">
                Implementar sistema <Plus size={18} className="ml-2" />
              </a>
              <a href="https://calendly.com/contato-muriloortega1/30min" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-10 py-5 rounded-full">
                Agendar Diagnóstico <MessageSquare size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="site-section py-24 md:py-32 bg-off-white">
        <div className="site-container">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95]">Como funciona o meu sistema de conteúdo:</h2>
          </div>
          <div className="space-y-px bg-border border border-border rounded-2xl overflow-hidden">
            {[
              { title: "Diagnóstico de Marca", desc: "Sessão estratégica para entender seu momento atual.", icon: <Briefcase size={18} /> },
              { title: "Ajuste de Linha Editorial", desc: "Definição do território de conteúdo e tom de voz.", icon: <Plus size={18} /> },
              { title: "Calendário Publicitário", desc: "Planejamento estratégico de datas e campanhas.", icon: <Calendar size={18} /> },
              { title: "Buyer Personas & ICPs", desc: "Construção detalhada do seu cliente ideal.", icon: <Users size={18} /> },
              { title: "Design & Copywriting", desc: "Alta performance visual e escrita focada em retenção.", icon: <Plus size={18} /> },
              { title: "Aprovação Self-Service", desc: "Plataforma centralizada para aprovação e comentários.", icon: <CheckSquare size={18} /> },
              { title: "Agendamento & Garantia", desc: "Controle total para presença digital ininterrupta.", icon: <Plus size={18} /> }
            ].map((step, i) => (
              <div key={i} className="bg-background p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between group hover:bg-foreground hover:text-background transition-all duration-500">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">0{i+1}</span>
                  <div className="space-y-1">
                    <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-none">{step.title}</h4>
                    <p className="text-[10px] md:text-[11px] font-mono uppercase text-secondary group-hover:text-background/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                   {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Section */}
      <section className="site-section py-24 md:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
               <div className="shadow-2xl overflow-hidden rounded-2xl border border-border/5">
                 <img src="/assets/projects/thumbnails/natrave.jpg" alt="NaTrave Content System" className="w-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
               </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.95] mb-8">NaTrave: <br/> O Ecossistema do Futebol</h2>
               <p className="text-base md:text-lg text-secondary uppercase font-medium leading-tight mb-10">
                 Construí um fluxo de conteúdo que elevou a percepção de uma plataforma amadora ao nível de elite. Copywriting agressivo e design de alta performance garantiram retenção e crescimento orgânico constante.
               </p>
               <Link to="/natrave" className="btn btn-primary px-8 py-4 rounded-full">
                 Ver case de conteúdo <ArrowRight size={18} className="ml-2" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="site-container text-center">
          <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.95] mb-12">Sua marca sempre presente.<br /><span className="text-secondary font-medium italic">Sempre no topo.</span></h2>
          <a href="https://calendly.com/contato-muriloortega1/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary bg-background text-foreground px-12 py-6 text-lg hover:bg-background/90 rounded-full">
            Agendar diagnóstico <Plus size={20} className="ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default SistemaConteudoPage;
