import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/trabalho", label: "Portfolio" },
  { to: "/metodos", label: "Métodos" },
  { to: "/sobre", label: "Sobre Mim" },
  { to: "https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!", label: "Contato", isExternal: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-background/40 backdrop-blur-3xl border-b border-border/10 shadow-sm" : "bg-transparent"
        )}
      >
        <div className="site-container flex items-center justify-between h-24">
 <Link to="/" className="text-foreground text-lg font-bold tracking-tight ">
            Murilo Ortega
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
 className="text-sm font-regular tracking-tight text-foreground/60 transition-opacity duration-250 hover:opacity-100"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
 className="text-sm font-regular tracking-tight text-foreground/60 transition-opacity duration-250 hover:opacity-100"
                  activeProps={{
                    className: "text-foreground opacity-100",
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="site-container flex items-center justify-between h-24">
            <Link
              to="/"
 className="text-foreground text-lg font-bold tracking-tight "
              onClick={() => setMenuOpen(false)}
            >
              Murilo Ortega
            </Link>
            <button
              className="text-foreground p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-start site-container mt-12 gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
 className="text-[40px] text-foreground font-bold leading-none tracking-tight"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
 className="text-[40px] text-foreground font-bold leading-none tracking-tight"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
