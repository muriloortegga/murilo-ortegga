import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BrandHeader } from "@/components/brand-header";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/symplice")({
  head: () => ({
    meta: [
      { title: "Symplice, Murilo Ortega" },
      { name: "description", content: "Identidade Visual para Symplice, Facilitando o complexo." },
    ],
  }),
  component: ProjetoSymplice,
});

function ProjetoSymplice() {
  const metaData = [
    { label: "Cliente", value: "Symplice" },
    { label: "Ano", value: "2024" },
    { label: "Foco", value: "Startup & SaaS" },
    { label: "Skills", value: "Id Visual, Branding" }
  ];

  return (
    <div className="bg-background">
      <BrandHeader 
        client="Symplice"
        phrase="Clareza Digital"
        description="Para marcas que operam na complexidade, a Symplice entrega simplicidade estratégica. Uma identidade visual limpa, direta e focada na experiência do usuário."
        niche="Branding & Design System"
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
            src="/assets/projects/symplice/logo.png" 
            alt="Symplice Logo" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Bloco 1 - Centralizado */}
      <section className="py-20 md:py-32 bg-off-white border-y border-border/10">
        <div className="site-container text-center max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            Em um cenário empresarial <br className="hidden md:inline" />
            saturado de processos complexos, <br />
            <span className="font-extrabold text-foreground">a eficiência exige clareza.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-16"
          >
            A Symplice nasce como uma plataforma de soluções digitais desenhada para desmistificar e simplificar a gestão de pequenas e médias empresas. Nosso compromisso foi traduzir tecnologia de ponta, segurança e excelência em uma experiência visual instantaneamente leve, transparente e confiável.
          </motion.p>
        </div>
        <div className="site-container my-12 md:my-20">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/symplice/1.jpg" 
              alt="Symplice Experiência Visual" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
            />
          </div>
        </div>
      </section>

      {/* Bloco 2 - Alinhado à Esquerda (Assimétrico) */}
      <section className="py-20 md:py-32 bg-background">
        <div className="site-container px-4">
          <div className="max-w-3xl text-left mb-16 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1]"
            >
              Symplice. <br />
              A fonética do óbvio, <br />
              a sofisticação do minimalismo.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-xl"
            >
              Inspirado na inicial de System e na pronúncia literal da palavra Simples, o nome transcende fronteiras linguísticas. Uma abordagem direta e memorável criada para se destacar no ecossistema tecnológico global.
            </motion.p>
          </div>
        </div>
        <div className="site-container my-12 md:my-20">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/symplice/2.jpg" 
              alt="Symplice Identidade de Nome" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
            />
          </div>
        </div>
      </section>

      {/* Bloco 3 - Alinhado à Esquerda (Assimétrico) */}
      <section className="py-20 md:py-32 bg-off-white border-y border-border/10">
        <div className="site-container px-4">
          <div className="max-w-3xl text-left mb-16 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1]"
            >
              A fusão geométrica entre o minimalismo e a vanguarda.
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
        <div className="site-container my-12 md:my-20">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/symplice/3.jpg" 
              alt="Symplice Ícone Geométrico" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
            />
          </div>
        </div>
      </section>

      {/* Bloco 4 - Centralizado */}
      <section className="py-20 md:py-32 bg-background">
        <div className="site-container text-center max-w-4xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            Conectando a simplicidade do presente com a inovação do futuro.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm md:text-base text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-16"
          >
            Na Symplice, a identidade visual não é apenas estética; é uma promessa de entrega sem complicações. Uma assinatura de vanguarda que redefine a relação entre o extraordinário e o descomplicado.
          </motion.p>
        </div>
        <div className="site-container my-12 md:my-20">
          <div className="overflow-hidden rounded-2xl border border-border/10 shadow-md">
            <img 
              src="/assets/projects/symplice/4.jpg" 
              alt="Symplice Futuro e Simplicidade" 
              className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700 ease-out-expo"
            />
          </div>
        </div>
      </section>

      {/* Navegação entre Projetos */}
      <section className="site-section border-t border-border/50 py-16">
        <div className="site-container flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
          <Link to="/trabalho" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            <ArrowLeft size={16} /> Voltar Projetos
          </Link>
          <Link to="/natrave" className="btn btn-primary gap-2 w-full sm:w-auto text-center justify-center rounded-full px-8 py-4">
            Próximo Projeto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjetoSymplice;
