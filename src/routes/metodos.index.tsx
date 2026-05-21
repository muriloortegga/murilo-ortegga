import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Plus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/metodos/")({
  head: () => ({
    meta: [
      { title: "Métodos — Murilo Ortega" },
      { name: "description", content: "Metodologias aplicadas: Growth, Design Thinking e Posicionamento de Marca." },
      { property: "og:title", content: "Métodos — Murilo Ortega" },
      { property: "og:description", content: "Metodologias aplicadas para estruturar marcas e converter atenção." },
    ],
  }),
  component: MetodosPage,
});

const products = [
  {
    slug: "estruturacao-de-marca",
    num: "01",
    name: "Estrutura de Marca",
    resolve: "Marcas estagnadas por falta de clareza estrutural. Identidades que não conversam com o público ou não se sustentam no digital.",
    envolve: "Imersão no negócio, aplicação de metodologias de Design Thinking para posicionamento, construção de identidade visual e verbal guiada por comportamento do consumidor.",
    recebe: "Um posicionamento sólido documentado e uma identidade arquitetada para elevar sua percepção de valor.",
  },
  {
    slug: "sistema-de-conteudo",
    num: "02",
    name: "Comunicação de Marca",
    resolve: "Produção de conteúdo sem tração. O esforço criativo existe, mas não escala ou não retém a atenção do público de forma estratégica.",
    envolve: "Implementação de mentalidade de Growth no conteúdo. Criação de linhas editoriais baseadas em testes, métricas de retenção e táticas de copywriting avançado para funis de alta performance.",
    recebe: "Um playbook de conteúdo ágil com foco em métricas reais, e não apenas métricas de vaidade.",
  },
  {
    slug: "presenca-digital",
    num: "03",
    name: "Conversão de Marca",
    resolve: "Tráfego que não converte. Sites e landing pages que são bonitos, mas que possuem jornadas de usuário quebradas e baixo desempenho.",
    envolve: "Auditoria de experiência (UX), prototipagem de alta fidelidade (UI) com foco em Behavioral Design, redação orientada a persuasão e refinamento visual extremo.",
    recebe: "Uma plataforma digital imersiva, desenhada sistematicamente para capturar e converter atenção.",
  },
  {
    slug: "midia-impressa",
    num: "04",
    name: "Autoridade de marca",
    resolve: "Necessidade de transmitir autoridade instantânea no ambiente físico. Momentos em que o digital não é suficiente para materializar confiança.",
    envolve: "Direção de arte rigorosa e projeto gráfico de elite para papelaria, catálogos e materiais institucionais, utilizando princípios de design minimalista e grids estruturados.",
    recebe: "Peças táteis que elevam a percepção de valor da marca em negociações e pontos de contato físicos.",
  },
  {
    slug: "midia-ooh",
    num: "05",
    name: "Percepção de Marca",
    resolve: "Marcas que precisam expandir awareness em ecossistemas urbanos sem perder a sofisticação da mensagem.",
    envolve: "Estratégia de ocupação visual. Direção criativa aplicada a formatos de grande escala, onde cada milissegundo de atenção do público em movimento conta.",
    recebe: "Campanhas de rua com máxima legibilidade, foco em mensagem clara e altíssimo impacto estético.",
  },
  {
    slug: "marketing-de-influencia",
    num: "06",
    name: "Expansão de Marca",
    resolve: "Marcas tentando forçar autoridade ao invés de pedi-la emprestada de quem já a possui. Ruído na comunicação com creators.",
    envolve: "Curadoria cirúrgica de porta-vozes, alinhamento de valores, roteirização estratégica de campanhas e integração da influência diretamente nas suas etapas do funil.",
    recebe: "Endosso de autoridade real que traciona alcance, transferindo a confiança do creator para a sua marca.",
  },
];

function MetodosPage() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={revealRef} className="pt-24 md:pt-32">
      <section className="site-section border-t-0">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-12 anim-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12">Métodos</h1>
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.95] max-w-4xl">
                Processos validados de mercado. <br />
                <span className="text-secondary font-medium italic">Abordagens específicas.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container pb-32">
        {products.map((p, i) => (
          <Link 
            key={i} 
            to={`/metodos/${p.slug}`}
            className="scroll-reveal block group border-t border-border first:border-t-0" 
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-12 pb-12 md:pt-16 md:pb-16 group-hover:bg-off-white/50 transition-colors duration-500 rounded-xl px-4 md:px-8 -mx-4 md:-mx-8">
              <div className="lg:col-span-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">{p.num}</span>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mt-4 flex items-center gap-4">
                  {p.name}
                  <Plus size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-10 md:space-y-12">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">O que resolve</span>
                  <p className="text-lg md:text-xl text-foreground font-medium mt-4 max-w-[600px] leading-tight uppercase tracking-tight">{p.resolve}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10 md:pt-12 border-t border-border/50">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">O que envolve</span>
                    <p className="text-[11px] font-mono uppercase text-secondary leading-relaxed mt-4">{p.envolve}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">Entrega</span>
                      <p className="text-sm text-foreground font-bold mt-4 uppercase tracking-tighter">{p.recebe}</p>
                    </div>
                    <div className="hidden md:block">
                       <ArrowRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default MetodosPage;
