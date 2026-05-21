import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { getRouteContext, getOrigin, setOrigin, type ContextLink } from "@/lib/nav-context";

/**
 * Sticky breadcrumb nav shown on every non-top-level page.
 * Always surfaces:
 *   ← Voltar (browser back, with sensible fallback)
 *   • [Category overview]  (inferred from origin OR project's primary category)
 *   • [Section overview]   (e.g. Métodos, Portfolio)
 */
export function ContextNav() {
  const location = useLocation();
  const router = useRouter();
  const pathname = location.pathname;
  const ctx = getRouteContext(pathname);

  const [origin, setOriginState] = useState<ContextLink | null>(null);

  // Track origin: when the user lands on a category-style page (servicos detail or /trabalho),
  // remember it so subsequent project visits can offer a "back to category" link.
  useEffect(() => {
    const stored = getOrigin();
    if (stored) setOriginState(stored);

    // If current page is itself a category origin, persist it.
    if (pathname.startsWith("/metodos/") || pathname === "/trabalho") {
      const label =
        pathname === "/trabalho"
          ? "Portfolio"
          : pathname
              .replace("/metodos/", "")
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(" ");
      setOrigin({ to: pathname, label });
      setOriginState({ to: pathname, label });
    }
  }, [pathname]);

  if (ctx.isTopLevel || (!ctx.parent && !ctx.categories)) return null;

  // Pick best "category" link: prefer remembered origin if it matches one of the project's categories.
  let categoryLink: ContextLink | null = null;
  if (ctx.categories && ctx.categories.length > 0) {
    const matched = origin && ctx.categories.find((c) => c.to === origin.to);
    categoryLink = matched ?? ctx.categories[0];
  }

  const sectionLink = ctx.parent ?? null;
  // Avoid duplicate links (when category === parent, e.g. on a service detail page).
  const showSection = sectionLink && sectionLink.to !== categoryLink?.to;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else if (categoryLink) {
      router.navigate({ to: categoryLink.to as string });
    } else if (sectionLink) {
      router.navigate({ to: sectionLink.to as string });
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <nav
      aria-label="Navegação contextual"
      className="fixed top-24 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/20"
    >
      <div className="site-container flex items-center justify-between h-12 gap-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar</span>
        </button>

        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          {categoryLink && (
            <Link
              to={categoryLink.to as string}
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-secondary hover:text-foreground transition-colors truncate"
            >
              <LayoutGrid size={14} className="shrink-0" />
              <span className="truncate">{categoryLink.label}</span>
            </Link>
          )}
          {showSection && (
            <>
              <span className="text-secondary/40 text-xs">/</span>
              <Link
                to={sectionLink!.to as string}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary hover:text-foreground transition-colors truncate"
              >
                {sectionLink!.label}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
