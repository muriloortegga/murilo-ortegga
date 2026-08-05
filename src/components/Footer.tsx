import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      {/* Recruiter CTA Block (primary) */}
      <div className="site-section border-t-0">
        <div className="site-container">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/60 mb-6 block">
            Para recrutadores
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <h2 className="line-height-tight">
                Vamos conversar sobre<br />
                <span className="text-secondary font-medium">a próxima vaga?</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6 items-start lg:items-end">
              <div className="flex flex-wrap gap-4">
                <a href="/cv/curriculo-murilo-ortega.pdf" download className="btn btn-primary px-8 py-4 rounded-full flex items-center gap-2">
                  Baixar Currículo <Download size={16} />
                </a>
                <a href="https://linkedin.com/in/muriloortega" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-8 py-4 rounded-full">
                  LinkedIn
                </a>
              </div>
              <a href="mailto:contato@muriloortega.com" className="text-sm font-bold tracking-tight hover:text-secondary transition-colors">
                contato@muriloortega.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Freelance CTA Block (secondary, kept verbatim) */}
      <div className="site-section">
        <div className="site-container">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-secondary/40 mb-6 block">
            Buscando um parceiro para o seu projeto?
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="line-height-tight">
                Pronto para organizar<br />
                <span className="text-secondary font-medium">sua marca?</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 items-start lg:items-end">
              <a href="https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!" target="_blank" rel="noopener noreferrer" className="btn btn-arrow">
                Fale comigo <span className="arrow" />
              </a>
              <Link to="/trabalho" className="btn btn-arrow">
                Ver portfolio <span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer base */}
      <div className="site-container border-t border-border py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="text-[10px] font-mono uppercase tracking-tight text-secondary">
          © {new Date().getFullYear()} Murilo Ortega
        </span>
        <div className="flex items-center gap-6 md:gap-12">
          {[
            { name: "LinkedIn", url: "https://linkedin.com/in/muriloortega" },
            { name: "Instagram", url: "https://instagram.com/muriloortega" },
            { name: "Behance", url: "https://behance.net/muriloortega" },
            { name: "Upwork", url: "https://upwork.com" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-tight text-secondary hover:text-foreground transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
