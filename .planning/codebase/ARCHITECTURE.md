<!-- refreshed: 2026-08-04 -->
# Architecture

**Analysis Date:** 2026-08-04

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                 Cloudflare Workers (SSR runtime)              │
│         entry: `@tanstack/react-start/server-entry`           │
│         config: `wrangler.jsonc`, `vite.config.ts`            │
└──────────────────────────┬────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               TanStack Start Router / Route Tree              │
│  `src/router.tsx` (createRouter) + `src/routeTree.gen.ts`     │
│              (auto-generated from `src/routes/`)              │
└──────────────────────────┬────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Root Shell + Layout                       │
│  `src/routes/__root.tsx` — <html>, <head>, global chrome:     │
│  Cursor / Header / ContextNav / <Outlet /> / Footer            │
└──────────────────────────┬────────────────────────────────────┘
                            ▼
┌──────────────────────────┬─────────────────────────────────┐
│      Page Routes          │        Shared Components         │
│  `src/routes/*.tsx`       │  `src/components/*.tsx`          │
│  one file = one URL path  │  layout, media, nav primitives   │
└──────────────┬────────────┴───────────────┬────────────────┘
               │                             │
               ▼                             ▼
┌────────────────────────┐    ┌─────────────────────────────┐
│   Lib / Hooks (logic)   │    │   Static Assets              │
│ `src/lib/*.ts`          │    │ `public/`, `src/assets/`     │
│ `src/hooks/*.tsx`       │    │ images, gifs, CV PDF, logos  │
└────────────────────────┘    └─────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root shell | HTML document, global `<head>` (meta/OG/JSON-LD), mounts persistent chrome | `src/routes/__root.tsx` |
| Router factory | Creates the TanStack Router instance, wires the generated route tree, default error boundary | `src/router.tsx` |
| Generated route tree | Auto-generated route registry (do not hand-edit) | `src/routeTree.gen.ts` |
| Route modules | One file per URL; each owns its own `head()` SEO block, page-level state, and JSX | `src/routes/*.tsx` |
| SEO helper | Builds consistent per-route `<head>` meta (canonical, OG, Twitter card) | `src/lib/seo.ts` |
| Nav-context registry | Static map of route → parent/category, used for contextual breadcrumbs | `src/lib/nav-context.ts` |
| Header | Fixed top nav bar + mobile menu overlay | `src/components/Header.tsx` |
| ContextNav | Sticky secondary nav showing "back to category" / "back to section", reads `nav-context.ts` + sessionStorage | `src/components/ContextNav.tsx` |
| Footer | Site footer | `src/components/Footer.tsx` |
| Cursor | Custom cursor effect (decorative, mounted once at root) | `src/components/Cursor.tsx` |
| ProjectMedia | Polymorphic media renderer — picks `<video>`, animated `<canvas>`/`<img>` (GIF-to-still-frame), or plain `<img>` based on file extension | `src/components/project-media.tsx` |
| Case study layouts | Reusable page-section building blocks for project/case pages | `src/components/social-case-layout.tsx`, `src/components/social-media-case.tsx`, `src/components/brand-header.tsx`, `src/components/website-scroll-showcase.tsx` |
| DraggableMarquee | Infinite drag-scrollable logo/image marquee (used on homepage "brands" section) | `src/components/draggable-marquee.tsx` |
| ServiceSelector | Interactive service/method picker UI | `src/components/service-selector.tsx` |
| useScrollReveal | IntersectionObserver hook that toggles `.is-visible` on `.scroll-reveal` children for scroll-triggered CSS animations | `src/hooks/use-scroll-reveal.tsx` |
| cn() utility | `clsx` + `tailwind-merge` class-name combiner used everywhere className logic branches | `src/lib/utils.ts` |

## Pattern Overview

**Overall:** File-based routing SSR site (TanStack Start on Vite) deployed to Cloudflare Workers. This is a marketing/portfolio site, not an application with a database or API layer — it is essentially a statically-informed, server-rendered React site with no backend data store.

**Key Characteristics:**
- File-based routing: every file in `src/routes/` becomes a URL (`src/routes/natrave.tsx` → `/natrave`, `src/routes/brand.$brandId.tsx` → `/brand/:brandId`).
- No client-side global state manager (no Redux/Zustand/Context-based store) — page state is local `useState`/`useEffect` per route/component.
- No database or ORM. All page content (project text, images, service descriptions) is hardcoded as inline TS objects/arrays directly inside route files.
- One server route (`src/routes/sitemap[.]xml.ts`) uses TanStack Start's `server.handlers.GET` to return a raw XML `Response` — the only non-HTML/non-React route.
- SSR + hydration: `RootShell` renders `<html>`/`<head>`/`<Scripts />`; `RootComponent` renders the actual persistent app chrome (Cursor, Header, ContextNav, Outlet, Footer).
- Styling is Tailwind CSS v4 utility classes (via `@tailwindcss/vite` plugin) plus a small set of custom CSS classes (`site-container`, `site-section`, `scroll-reveal`, `anim-fade-in`, `btn`, etc.) defined in `src/styles.css`.
- Path alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Layers

**Routing Layer:**
- Purpose: Maps URLs to page components and defines per-page `<head>` metadata.
- Location: `src/routes/`
- Contains: `createFileRoute()` calls, `head()` SEO functions, page components, and (for one route) a server GET handler.
- Depends on: `src/lib/seo.ts`, `src/lib/nav-context.ts`, `src/components/*`, `src/hooks/*`.
- Used by: `src/router.tsx` via the generated `routeTree.gen.ts`.

**Root/Shell Layer:**
- Purpose: Wraps every route with persistent document structure and global chrome (nav, footer, cursor).
- Location: `src/routes/__root.tsx`
- Contains: `createRootRoute()`, `RootShell` (HTML document), `RootComponent` (app chrome + `<Outlet/>`), `NotFoundComponent`.
- Depends on: `src/components/Header.tsx`, `Footer.tsx`, `Cursor.tsx`, `ContextNav.tsx`, `src/styles.css`.
- Used by: The router (root of the route tree).

**Component Layer:**
- Purpose: Reusable presentational and interactive UI building blocks shared across route files.
- Location: `src/components/`
- Contains: Layout primitives (case-study layouts, brand header), media rendering (`project-media.tsx`), navigation (`Header.tsx`, `ContextNav.tsx`), decorative/interactive widgets (`Cursor.tsx`, `draggable-marquee.tsx`, `service-selector.tsx`, `website-scroll-showcase.tsx`).
- Depends on: `src/lib/utils.ts` (`cn`), `src/hooks/use-scroll-reveal.tsx`, `lucide-react` icons, `@tanstack/react-router` (`Link`).
- Used by: Route files in `src/routes/`.

**Lib/Utility Layer:**
- Purpose: Small, dependency-free helper modules with no React/JSX.
- Location: `src/lib/`
- Contains: `seo.ts` (per-route head builder), `nav-context.ts` (route → breadcrumb metadata + sessionStorage origin tracking), `utils.ts` (`cn` classname helper).
- Depends on: Nothing internal (leaf modules).
- Used by: Route files and components throughout.

**Hooks Layer:**
- Purpose: Reusable React hooks encapsulating browser-API-driven behavior.
- Location: `src/hooks/`
- Contains: `use-scroll-reveal.tsx` (IntersectionObserver-based scroll animation trigger).
- Depends on: React only.
- Used by: Route files (e.g. `src/routes/index.tsx`, `brand.$brandId.tsx`) and layout components.

**Static Assets:**
- Purpose: Images, GIFs, PDFs, brand logos referenced by routes/components.
- Location: `public/` (served as-is at root, e.g. `/cv/curriculo.pdf`, `/assets/projects/...`), `src/assets/logos/` (imported via `import.meta.glob` for bundling/hashing).
- Depends on: Nothing.
- Used by: Route files (`<img src="/assets/...">`) and `src/routes/index.tsx` (dynamic logo import via `import.meta.glob("/src/assets/logos/*...")`).

## Data Flow

### Primary Request Path

1. Cloudflare Worker receives the HTTP request; entry point is `@tanstack/react-start/server-entry` (configured in `wrangler.jsonc`, `main` field).
2. TanStack Start's SSR handler matches the URL against the generated route tree (`src/routeTree.gen.ts`) and resolves the matching route module in `src/routes/`.
3. The matched route's `head()` function (if defined) builds `<head>` meta/links/scripts — typically via `routeSeo()` (`src/lib/seo.ts:12`).
4. `RootShell` (`src/routes/__root.tsx:83`) renders the `<html>`/`<head>`/`<body>` document; `RootComponent` (`src/routes/__root.tsx:97`) renders persistent chrome (`Cursor`, `Header`, `ContextNav`) around the route's `component` via `<Outlet/>`.
5. The route's own `component` (e.g. `HomePage` in `src/routes/index.tsx:243`) renders the page body, reading hardcoded content arrays defined in the same file.
6. Response streams to the client; React hydrates client-side using `src/router.tsx`'s `getRouter()`, re-attaching interactivity (scroll listeners, `useScrollReveal` observers, etc.).

### Sitemap Generation Flow (server-only route)

1. Request to `/sitemap.xml` is matched by `src/routes/sitemap[.]xml.ts`.
2. The route's `server.handlers.GET` runs entirely server-side (no React render) — it builds an array of `SitemapEntry` objects hardcoded in the file (`src/routes/sitemap[.]xml.ts:17`).
3. Returns a raw `Response` with `Content-Type: application/xml` and a 1-hour cache header — bypassing the normal HTML render pipeline entirely.

### Client-Side Navigation Flow

1. User clicks a `<Link to="...">` (from `@tanstack/react-router`) — e.g. project card links in `src/routes/index.tsx:217`.
2. Router performs client-side transition (no full reload); `defaultPreloadStaleTime: 0` in `src/router.tsx:70` means links are always freshly preloaded.
3. `ContextNav` (`src/components/ContextNav.tsx:23`) reacts to `pathname` changes via `useLocation()`, looks up `getRouteContext(pathname)` (`src/lib/nav-context.ts:63`), and persists "origin" category to `sessionStorage` for smarter back-navigation.
4. `useScrollReveal` hooks re-run per mounted page to wire up `IntersectionObserver` on elements with the `.scroll-reveal` class.

**State Management:**
- No global store. State is local to each component (`useState`, `useEffect`) and re-initialized on every route mount.
- The only persisted client state is `sessionStorage["nav:origin"]`, written/read via `setOrigin`/`getOrigin` in `src/lib/nav-context.ts:74-89`.
- Page content (project lists, service descriptions, gallery images) is defined as static in-file arrays/objects, not fetched from any API or loader.

## Key Abstractions

**Route module (`createFileRoute`):**
- Purpose: Represents one page — bundles URL matching, SEO `head()`, and the rendered `component` (and optionally a server `GET` handler) in a single file.
- Examples: `src/routes/index.tsx`, `src/routes/natrave.tsx`, `src/routes/brand.$brandId.tsx`, `src/routes/sitemap[.]xml.ts`
- Pattern: `export const Route = createFileRoute("/path")({ head: () => ({...}), component: PageComponent })`. Dynamic segments use `$paramName` in the filename (e.g. `brand.$brandId.tsx`).

**routeSeo() helper:**
- Purpose: Normalizes canonical URL, OG tags, and Twitter card meta so every route's SEO output is consistent.
- Examples: Used in `src/routes/index.tsx:11`, `src/routes/brand.$brandId.tsx:9`, and virtually every other route file.
- Pattern: Call with `{ path, title, description, type?, image? }`, spread the result into the route's `head()` return value, optionally appending JSON-LD `scripts`.

**Route context registry (`ROUTE_CONTEXT`):**
- Purpose: Central, hand-maintained map describing each route's place in the site hierarchy (top-level vs. child of a category), used purely for breadcrumb UI — not for route matching itself.
- Examples: `src/lib/nav-context.ts:33`
- Pattern: New pages that are NOT top-level (i.e. project/case pages, service detail pages) must add an entry here or `ContextNav` will render nothing for them.

**ProjectMedia polymorphic renderer:**
- Purpose: Single component that decides how to render project imagery based on file extension (`.mp4`/`.webm` → video, `.gif` with hover-play → canvas/img swap, otherwise plain `<img>`).
- Examples: `src/components/project-media.tsx`, used in `src/routes/index.tsx:224`
- Pattern: Pass `src` (a path string) and let the component infer rendering strategy — callers never need `if (isVideo)` branches themselves.

**Case-study layout components:**
- Purpose: Shared scaffolding for individual project pages so each project route (`natrave.tsx`, `evidive.tsx`, etc.) doesn't reinvent hero/section structure.
- Examples: `src/components/social-case-layout.tsx`, `src/components/social-media-case.tsx`, `src/components/brand-header.tsx`
- Pattern: Route files import and compose these with project-specific content data.

## Entry Points

**Server entry (SSR / Worker):**
- Location: `@tanstack/react-start/server-entry` (package-provided, referenced as `main` in `wrangler.jsonc`)
- Triggers: Every incoming HTTP request in production (Cloudflare Workers runtime).
- Responsibilities: Resolves the route tree, runs `head()`/server handlers, renders `RootShell`/`RootComponent` to HTML, streams response.

**Client router factory:**
- Location: `src/router.tsx` (`getRouter()`)
- Triggers: Client-side hydration on page load; also referenced by TanStack Start's build tooling.
- Responsibilities: Instantiates `createRouter` with the generated route tree, sets `scrollRestoration: true`, `defaultPreloadStaleTime: 0`, and wires `DefaultErrorComponent` for uncaught route errors.

**Dev server:**
- Location: `vite.config.ts` (`vite dev`, port 8080)
- Triggers: `npm run dev` / `bun run dev`.
- Responsibilities: Runs Vite dev server without the Cloudflare Workers plugin (skipped in dev since `workerd` runtime isn't available locally); includes custom dev-only plugins for forwarding client/SSR runtime errors over HMR websocket (`devClientErrorLogger`, `devServerFnErrorLogger` in `vite.config.ts`).

**Route tree entry:**
- Location: `src/routeTree.gen.ts`
- Triggers: Regenerated automatically by `@tanstack/router-plugin` (Vite plugin) whenever files under `src/routes/` change.
- Responsibilities: Provides the typed route tree consumed by `createRouter` in `src/router.tsx`. Never hand-edited.

## Architectural Constraints

- **Threading:** Cloudflare Workers single-threaded V8 isolate model (per-request, no persistent process state across requests) — do not rely on module-level mutable state surviving between requests.
- **Global state:** No app-level singletons beyond the generated route tree; the only cross-page persisted value is `sessionStorage["nav:origin"]` (`src/lib/nav-context.ts:70`), which is browser-only and does not exist during SSR.
- **No backend/data layer:** There is no database, ORM, or fetch-based data loader. All content is hardcoded per-route. Adding a CMS or API would require introducing a new data-fetching layer (e.g. TanStack Start loaders) not currently present anywhere in the codebase.
- **Content duplication risk:** Project/service metadata (names, categories, image paths) is duplicated across `src/routes/index.tsx`, `src/lib/nav-context.ts`, `src/routes/trabalho.tsx`, and `src/routes/sitemap[.]xml.ts` — there is no single source of truth for "what projects exist." Adding/removing a project requires updating multiple files by hand.
- **Route registration is manual in two places:** A new page route file automatically gets picked up by the file-router (`routeTree.gen.ts` regenerates), but it will NOT automatically appear in `ContextNav` (needs a `src/lib/nav-context.ts` entry) or in `/sitemap.xml` (needs a manual entry in `src/routes/sitemap[.]xml.ts`).

## Anti-Patterns

### Hardcoded content mixed with presentation

**What happens:** Route files like `src/routes/index.tsx` define large content arrays (`projects`, `services`, `galleryImages`, `brands`, `methods`) inline, interleaved with JSX components in the same file (398 lines).
**Why it's wrong:** Content changes require editing implementation files; there's no separation between "what to show" and "how to show it," making the largest route files (`social-media-case.tsx` at 604 lines, `natrave.tsx` at 318 lines) hard to scan.
**Do this instead:** When adding new projects/services, keep new content arrays at the top of the file (existing convention) rather than scattering literals through JSX; consider extracting shared content shape objects to `src/lib/` if reused across more than one route.

### `any` typed props in component interfaces

**What happens:** `ProjectMediaProps.style?: any` (`src/components/project-media.tsx:9`) and `ProjectCard({ project, index }: { project: any, index: number })` (`src/routes/index.tsx:199`) bypass TypeScript's type checking despite `strict: true` in `tsconfig.json`.
**Why it's wrong:** Defeats compile-time safety for exactly the props most likely to vary (style objects, project shape), making refactors of the `projects` array silently unsafe.
**Do this instead:** Define an explicit `Project` interface (name, category, image, to, gif?) and use `React.CSSProperties` for style props.

## Error Handling

**Strategy:** Two-tier error boundaries provided by TanStack Router: a router-level `defaultErrorComponent` for uncaught render/loader errors, and a `notFoundComponent` for unmatched routes.

**Patterns:**
- `DefaultErrorComponent` (`src/router.tsx:4-63`) shows a generic "Something went wrong" screen with a dev-only stack trace (`import.meta.env.DEV`), a "Try again" button that calls `router.invalidate()` + `reset()`, and a "Go home" link.
- `NotFoundComponent` (`src/routes/__root.tsx:9-31`) renders a branded 404 page with a link back to `/`.
- No try/catch or error handling exists inside individual route components — errors bubble to the router's boundary.
- Dev-time runtime/SSR errors are additionally forwarded over Vite's HMR websocket for terminal visibility via custom plugins in `vite.config.ts` (`devClientErrorLogger`, `devServerFnErrorLogger`) — this is a development-only diagnostic aid, not part of production error handling.

## Cross-Cutting Concerns

**Logging:** No structured logging or telemetry library. Only `console.error` is intercepted in dev mode by the custom Vite plugin (`vite.config.ts`) to forward errors over HMR; nothing is logged in production beyond default platform (Cloudflare Workers) logs.

**Validation:** `zod` is a dependency but not used in any file under `src/` (no forms, no schema validation observed) — likely reserved for future contact-form or server-function input.

**Authentication:** None. This is a public marketing site with no login/session/user concept.

**SEO:** Centralized via `routeSeo()` (`src/lib/seo.ts`) called from every route's `head()`, plus per-route JSON-LD structured data blocks embedded directly in `head().scripts` (e.g. `src/routes/index.tsx:19-35`, `src/routes/__root.tsx:65-76`).

---

*Architecture analysis: 2026-08-04*
