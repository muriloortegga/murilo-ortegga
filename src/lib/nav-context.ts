// Maps each route to its natural parent context and which service categories it belongs to.
// Used by ContextNav to surface "back to category" + "back to overview" links on every page.

export type ContextLink = { to: string; label: string };

export type RouteContext = {
  // The page itself (used to skip showing nav on top-level destinations)
  isTopLevel?: boolean;
  // The default fallback "overview" link (e.g. /servicos, /trabalho)
  parent?: ContextLink;
  // For project pages: which service categories the project belongs to.
  // Allows ContextNav to prefer the category the user came from (via sessionStorage).
  categories?: ContextLink[];
};

// Service category slugs map directly to the service detail pages.
const SOCIAL: ContextLink = { to: "/servicos/sistema-de-conteudo", label: "Social Media" };
const ID_VISUAL: ContextLink = { to: "/servicos/estruturacao-de-marca", label: "Id Visual" };
const IMPRESSA: ContextLink = { to: "/servicos/midia-impressa", label: "Mídia Impressa" };
const OOH: ContextLink = { to: "/servicos/midia-ooh", label: "Mídia OOH" };
const WEB: ContextLink = { to: "/servicos/presenca-digital", label: "Presença Digital" };
const INFLU: ContextLink = { to: "/servicos/marketing-de-influencia", label: "Marketing de Influência" };

const SERVICOS: ContextLink = { to: "/servicos", label: "Serviços" };
const TRABALHO: ContextLink = { to: "/trabalho", label: "Portifólio" };

// Project pages: parent defaults to /trabalho, categories enable smart "back to category" links.
const projectContext = (categories: ContextLink[]): RouteContext => ({
  parent: TRABALHO,
  categories,
});

export const ROUTE_CONTEXT: Record<string, RouteContext> = {
  "/": { isTopLevel: true },
  "/trabalho": { isTopLevel: true },
  "/servicos": { isTopLevel: true },
  "/sobre": { isTopLevel: true },
  "/contato": { isTopLevel: true },

  // Service detail pages -> back to /servicos
  "/servicos/estruturacao-de-marca": { parent: SERVICOS },
  "/servicos/sistema-de-conteudo": { parent: SERVICOS },
  "/servicos/midia-impressa": { parent: SERVICOS },
  "/servicos/midia-ooh": { parent: SERVICOS },
  "/servicos/presenca-digital": { parent: SERVICOS },
  "/servicos/marketing-de-influencia": { parent: SERVICOS },

  // Project pages -> categories from trabalho.tsx project list
  "/natrave": projectContext([SOCIAL, ID_VISUAL, WEB]),
  "/talk2buy": projectContext([SOCIAL, WEB]),
  "/evidive": projectContext([SOCIAL, INFLU]),
  "/maxi": projectContext([SOCIAL, OOH]),
  "/milgrows": projectContext([SOCIAL]),
  "/kapyi": projectContext([SOCIAL]),
  "/symplice": projectContext([ID_VISUAL]),
  "/kmillion": projectContext([ID_VISUAL, WEB]),
  "/solid": projectContext([ID_VISUAL]),
  "/marco-boni": projectContext([IMPRESSA]),
  "/livin": projectContext([IMPRESSA]),
};

// Resolves dynamic routes (e.g. /brand/$brandId) by prefix.
export function getRouteContext(pathname: string): RouteContext {
  if (ROUTE_CONTEXT[pathname]) return ROUTE_CONTEXT[pathname];
  if (pathname.startsWith("/brand/")) return projectContext([ID_VISUAL]);
  return {};
}

// SessionStorage key used to remember which category page the user came from.
export const ORIGIN_KEY = "nav:origin";

export type Origin = { to: string; label: string };

export function setOrigin(origin: Origin) {
  try {
    sessionStorage.setItem(ORIGIN_KEY, JSON.stringify(origin));
  } catch {
    /* ignore */
  }
}

export function getOrigin(): Origin | null {
  try {
    const raw = sessionStorage.getItem(ORIGIN_KEY);
    return raw ? (JSON.parse(raw) as Origin) : null;
  } catch {
    return null;
  }
}
