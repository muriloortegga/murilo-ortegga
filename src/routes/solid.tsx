import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BrandHeader } from "@/components/brand-header";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/solid")({
  head: () => ({
    meta: [
      { title: "Solid+ - Murilo Ortega" },
      { name: "description", content: "Identidade Visual e Fintech Systems para Solid+." },
    ],
  }),
  component: ProjetoSolid,
});

function ProjetoSolid() {
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

      {/* Hero Logo Area */}
      <div className="site-container py-12 md:py-20 text-center border-t border-border/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[280px] md:max-w-[320px] mx-auto"
        >
          <img 
            src="/assets/projects/solid/logo.svg" 
            alt="Solid+ Logo" 
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
            Trazer clareza para a tecnologia. <br />
            <span className="font-extrabold text-foreground">Rompendo o estereótipo frio do setor de TI.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16"
          >
            Sediada no Reino Unido, a Solid+ nasce para transformar a relação entre empresas e tecnologia através de uma abordagem humana, clara e acessível. Mais do que suporte técnico e estratégia, a marca se posiciona como uma parceira que simplifica processos, orienta decisões e gera crescimento conjunto, unindo a sabedoria técnica ao acolhimento.
          </motion.p>
        </div>
        <div className="site-container">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/solid/1.png" 
              alt="Solid+ Experiência Visual" 
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
              Solid+. <br />
              A anatomia de uma marca <br />
              que entra para somar.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
            >
              O naming foi estrategicamente arquitetado através de camadas de significado: SOL evoca luz, direção e clareza; ID representa identidade e conexão humana; e o símbolo (+) assina o propósito de expansão, ecossistema e crescimento conjunto.
            </motion.p>
          </div>
        </div>
        <div className="site-container">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/solid/2.png" 
              alt="Solid+ Naming" 
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
              Um clique em <br />
              direção à solução.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
            >
              O ícone é o resultado da união de dois arcos em direções opostas que se entrelaçam perfeitamente para formar a letra S. Cada linha foi refinada para destacar o essencial, projetando uma sensação imediata de movimento, fluidez e futurismo digital.
            </motion.p>
          </div>
        </div>
        <div className="site-container">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/solid/3.png" 
              alt="Solid+ Icon" 
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
              Rigor técnico e legibilidade. <br />
              Nas cores e na tipografia.
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl space-y-4"
            >
              <p>
                O sistema visual transita entre a autoridade técnica e o acolhimento humano através de uma tipografia geométrica de alta legibilidade e uma paleta de cores dividida em duas frentes estratégicas:
              </p>
              <p>
                <span className="block"><strong className="text-foreground">Enterprise:</strong> A combinação do amarelo com tons de azul para transmitir estabilidade, profissionalismo e clareza institucional.</span>
              </p>
              <p>
                <span className="block"><strong className="text-foreground">For Fun:</strong> A introdução do coral vibrante para trazer calor, criatividade e uma comunicação mais amigável em ativações da marca.</span>
              </p>
            </motion.div>
          </div>
        </div>
        <div className="site-container">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/solid/4.png" 
              alt="Solid+ Cores e Tipografia" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
            />
          </div>
        </div>
      </section>

      {/* Bloco 5 - Centralizado (Finalização) */}
      <section className="py-12 md:py-20 bg-off-white border-t border-border/10">
        <div className="site-container text-center max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            Luz natural, layouts vivos e <br />
            <span className="font-extrabold text-foreground">tecnologia colaborativa.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto"
          >
            O universo visual da Solid+ adota o conceito de "luz entrando pela janela" como metáfora para a clareza que chega à tecnologia. Uma identidade projetada para transmitir confiança e autoridade de mercado sem perder a proximidade e o otimismo humano.
          </motion.p>
        </div>
      </section>

      {/* Navegação entre Projetos */}
      <section className="site-section border-t border-border/50 py-12 md:py-16">
        <div className="site-container flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link to="/trabalho" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/symplice" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoSolid;
