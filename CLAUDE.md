<!-- GSD:project-start source:PROJECT.md -->
## Project

**Portfólio Murilo Ortega — Reposicionamento para Recrutadores**

Site de portfólio pessoal de Murilo Ortega (murilo-ortegga.lovable.app), profissional com 8 anos de experiência em branding, direção de arte, social media, conteúdo e presença digital, atuando via seu estúdio Eme Creative Hub (São Paulo). Hoje o site é 100% estruturado como landing page de agência/freelancer (CTAs de WhatsApp para orçamento, headlines de venda de serviço). Este projeto reestrutura a **home page** para funcionar primariamente como landing de conversão para **recrutadores de vagas remotas** em Social Media, Branding, Marketing e Design Gráfico, mantendo a camada freelancer/agência como opção secundária.

**Core Value:** Em poucos segundos de home page, um recrutador entende quem é Murilo, com o que ele trabalha, os resultados que já entregou (via cases reais, não só imagens bonitas), e consegue agir (LinkedIn, e-mail, CV) — sem que nada do conteúdo/projetos/páginas existentes seja perdido ou fique inacessível.

### Constraints

- **Conteúdo**: Nenhum conteúdo/página/projeto/texto/asset existente pode ser excluído — só reorganizado, reescrito ou movido de posição/hierarquia.
- **Deploy/Sync**: Toda mudança de código do site deve refletir automaticamente no Lovable via push em `main`. Mudanças estruturais grandes continuam sendo feitas em branch separada (`feature/home-recruiter-redesign`), nunca commit direto de código em `main` durante a execução da fase (exceto documentação em `.planning/`, que não afeta o site) — **mas, a partir de 2026-08-05, o merge da branch pra `main` acontece a cada fase aprovada pelo usuário no checkpoint final dela**, não mais só uma vez no final da Fase 4. Isso significa que o site ao vivo é atualizado incrementalmente conforme cada fase fecha, e a Fase 4 (QA completa: responsivo, SEO/meta, integridade de links, squint test) passa a ser uma passada de polimento final sobre o que já está no ar, não mais um gate obrigatório antes do primeiro deploy.
- **Estética**: Dark mode, editorial, tipograficamente minimalista, premium — linguagem visual não muda, só arquitetura de informação e hierarquia de conversão. Consultar skill `ui-ux-pro-max` antes de gerar componente novo.
- **Tech stack**: React 19 + TanStack Start + Tailwind CSS 4 + Framer Motion + Vite 7 — fixo, não é decisão desta fase.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.8 (strict mode) - all application code (`src/**/*.ts`, `src/**/*.tsx`), config files (`vite.config.ts`, `eslint.config.js`)
- CSS (Tailwind CSS v4 syntax) - `src/styles.css`
- JSONC - `wrangler.jsonc` (Cloudflare Worker config)
## Runtime
- Node.js v25.9.0 (developer machine; no `.nvmrc` or `engines` field pins a version)
- Production runtime: **Cloudflare Workers** (via `@cloudflare/vite-plugin`, `wrangler.jsonc`), using `nodejs_compat` compatibility flag (`compatibility_date: 2025-09-24`)
- Bun (`bun.lock`, `bun.lockb`, `bunfig.toml` present) - primary lockfile/toolchain
- `package-lock.json` also present (npm) - redundant/stale lockfile; treat `bun.lock` as source of truth
- `bunfig.toml` sets `saveTextLockfile = false`
## Frameworks
- React 19.2 (`react`, `react-dom`) - UI library
- TanStack Start 1.162 (`@tanstack/react-start`) - full-stack SSR framework (file-based routing + server functions/handlers)
- TanStack Router 1.162 (`@tanstack/react-router`, `@tanstack/router-plugin`) - file-based routing, generated route tree at `src/routeTree.gen.ts`
- Tailwind CSS 4.2 (`tailwindcss`, `@tailwindcss/vite`) - utility-first styling, CSS-first config (no `tailwind.config.js`; theme lives in `src/styles.css`)
- Framer Motion 12.38 - animations
- Zod 3.24 - schema validation (present as a dependency; verify actual usage sites before relying on it for new validation code)
- Not detected — no test runner (`jest.config.*`, `vitest.config.*`), no `*.test.*`/`*.spec.*` files, no test script in `package.json`
- Vite 7.3 - dev server, bundler (`vite.config.ts`)
- `@vitejs/plugin-react` - React Fast Refresh / JSX transform
- `vite-tsconfig-paths` - resolves the `@/*` path alias from `tsconfig.json`
- `@cloudflare/vite-plugin` - builds a Cloudflare Worker-compatible SSR bundle (only applied on `command === "build"`, skipped in dev since workerd isn't available locally)
- `lovable-tagger` (`componentTagger()`) - dev-only Vite plugin, active only when `mode === "development"` (this project originated from/is edited via the Lovable platform — see `.lovable/` directory)
- ESLint 9 (flat config, `eslint.config.js`) - `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
## Key Dependencies
- `@tanstack/react-start` / `@tanstack/react-router` / `@tanstack/router-plugin` (^1.162.9) - routing and SSR are the backbone of the app; route files under `src/routes/` are auto-collected into `src/routeTree.gen.ts` (generated, do not hand-edit)
- `react` / `react-dom` (^19.2.0) - React 19 features (e.g. new JSX transform, Actions) may be relied upon
- `tailwindcss` / `@tailwindcss/vite` (^4.2.1) - v4's Vite plugin approach differs from v3's PostCSS config; no `postcss.config.js` or `tailwind.config.ts` exists
- `clsx` + `tailwind-merge` - class name composition helper, likely wrapped in `src/lib/utils.ts` (standard `cn()` helper pattern)
- `@cloudflare/vite-plugin` (^1.25.5) + `wrangler.jsonc` - defines the deployment target as Cloudflare Workers (`main: "@tanstack/react-start/server-entry"`)
- `vite-tsconfig-paths` - keeps the `@/*` alias in sync between TS and Vite without duplicating alias config
- `devClientErrorLogger()` - injects a virtual module into `routes/__root` (dev only) that forwards browser `error`/`unhandledrejection` events to the Vite dev server via HMR websocket, logged server-side
- `devServerFnErrorLogger()` - patches TanStack Start's server-functions-handler module at dev time to forward server-function errors over the same HMR channel
## Configuration
- No `.env` files present in the repo (none found on disk)
- `vite.config.ts` calls `loadEnv(mode, process.cwd(), "VITE_")` and injects every `VITE_`-prefixed variable into `import.meta.env.*` via Vite's `define` — so any env-driven config must use the `VITE_` prefix
- `.gitignore` excludes `.dev.vars` (Cloudflare Workers' local env file) and `*.local`, confirming the intended pattern for local secrets is Wrangler's `.dev.vars`, not `.env`
- Currently no environment variables appear to be consumed anywhere in `src/` (only `import.meta.env.DEV` is referenced, in `src/router.tsx`)
- `vite.config.ts` - main build config; path alias `@` → `./src`; dev server on `host: "::"`, `port: 8080`
- `tsconfig.json` - `target: ES2022`, `moduleResolution: Bundler`, `strict: true`, JSX `react-jsx`, path alias `@/*` → `./src/*`
- `wrangler.jsonc` - Cloudflare Worker deployment config (name `tanstack-start-app`, `nodejs_compat`)
- `eslint.config.js` - flat ESLint config; ignores `dist`, `.output`, `.vinxi`
## Platform Requirements
- Node.js (any recent LTS; project tested with v25.9.0 locally)
- Bun (for lockfile-accurate installs) or npm (stale `package-lock.json` fallback)
- `bun dev` / `npm run dev` → `vite dev` on port 8080
- Cloudflare's `workerd` runtime is NOT used in dev — the Cloudflare plugin is skipped for `vite dev`, so local dev runs on Node/Vite's own server, not a Workers-accurate environment
- Deployment target: **Cloudflare Workers** (`wrangler.jsonc`, `@cloudflare/vite-plugin`)
- Build command: `vite build` (or `build:dev` for a development-mode build) produces a Worker-compatible SSR bundle plus static assets in `dist/`
- No `wrangler deploy` script is defined in `package.json` — deployment likely happens via Wrangler CLI directly or an external CI/dashboard (Cloudflare Pages/Workers) outside this repo's script set
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components use `PascalCase.tsx` for top-level shared UI (`src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Cursor.tsx`, `src/components/ContextNav.tsx`).
- Newer/feature components use `kebab-case.tsx` (`src/components/brand-header.tsx`, `src/components/draggable-marquee.tsx`, `src/components/project-media.tsx`, `src/components/service-selector.tsx`, `src/components/social-case-layout.tsx`, `src/components/social-media-case.tsx`, `src/components/website-scroll-showcase.tsx`). **Prefer kebab-case for any new component file** — it is the dominant pattern for recently added files.
- Hooks use `kebab-case.tsx` prefixed with `use-` (`src/hooks/use-scroll-reveal.tsx`).
- Lib/utility modules use `kebab-case.ts` (`src/lib/utils.ts`, `src/lib/seo.ts`, `src/lib/nav-context.ts`).
- Route files are named after the URL path using TanStack Router file-based routing conventions: flat kebab/dot segments (`src/routes/metodos.estruturacao-de-marca.tsx`, `src/routes/metodos.index.tsx`), single-word project slugs (`src/routes/natrave.tsx`, `src/routes/kmillion.tsx`), and bracket-escaped special routes (`src/routes/sitemap[.]xml.ts` for `/sitemap.xml`).
- `src/routeTree.gen.ts` is generated by the TanStack Router plugin — never edit by hand.
- Components: `PascalCase` function declarations, always exported as named `export function ComponentName(...)` (not `const ComponentName = () =>`). Example: `export function ServiceSelector(...)` in `src/components/service-selector.tsx`, `export function PerformanceHero(...)` in `src/components/social-media-case.tsx`.
- Route page components use a `PageName` suffix matching the route (`HomePage` in `src/routes/index.tsx`, `ContatoPage` in `src/routes/contato.tsx`, `ProjetoNaTrave` in `src/routes/natrave.tsx`) and are additionally re-exported via `export default` at the bottom of the file for TanStack Router / HMR compatibility.
- Local/private helper components inside a route file are plain `function ComponentName()` without export (e.g. `HeroGallery`, `ProjectCard`, `MethodsSection` in `src/routes/index.tsx`).
- Hooks: `camelCase` prefixed with `use` (`useScrollReveal`).
- Utility/helper functions: `camelCase` (`cn`, `routeSeo`, `getRouteContext`, `setOrigin`, `getOrigin`).
- `camelCase` throughout (`activeService`, `scrollY`, `menuOpen`).
- Module-level constant data arrays/objects use `camelCase` (`navLinks`, `projects`, `services`, `galleryImages`, `galleryAlts`, `brands`) or `SCREAMING_SNAKE_CASE` for fixed singleton-like route context links (`SOCIAL`, `ID_VISUAL`, `SERVICOS`, `TRABALHO` in `src/lib/nav-context.ts`).
- Interfaces use `PascalCase` with no `I` prefix (`ServiceOption`, `RouteSeoInput`, `ProjectMediaProps`, `SitemapEntry`).
- Inline prop types are common: many components type props directly in the function signature rather than declaring a named interface (see `ServiceSelector` in `src/components/service-selector.tsx`).
- Type aliases use `PascalCase` (`ContextLink`, `RouteContext`, `Origin`).
## Code Style
- No Prettier config present (`.prettierrc*` absent). Formatting is whatever the editor/Lovable platform produces — 2-space indentation is the norm but not machine-enforced; some files have inconsistent indentation (e.g. `src/components/Header.tsx` mixes 1-space and correctly-indented JSX lines like `<Link to="/" className="text-foreground text-lg font-bold tracking-tight ">` at column 1). Do not assume formatting is auto-fixed on save.
- Double quotes for strings/JSX attributes.
- Semicolons used consistently.
- Trailing commas common in multiline object/array literals but not enforced.
- ESLint flat config at `eslint.config.js`, using `@eslint/js` recommended + `typescript-eslint` recommended + `eslint-plugin-react-hooks` recommended + `eslint-plugin-react-refresh`.
- `@typescript-eslint/no-unused-vars` is explicitly turned **off** — unused variables will not be flagged.
- `react-refresh/only-export-components` is a **warning** (not error), with `allowConstantExport: true` — route files exporting both a `Route` object and a page component are allowed.
- `dist`, `.output`, `.vinxi` directories are ignored.
- Run via `npm run lint` (`eslint .`). No pre-commit hook or CI lint gate detected.
- `tsconfig.json` has `strict: true` but `noUnusedLocals: false` and `noUnusedParameters: false` — the codebase tolerates dead variables/params. `: any` appears in a few places (`src/components/project-media.tsx:9` `style?: any;`, `src/routes/index.tsx:199` `project: any`, `src/routes/index.tsx:201` `node: any`) — acceptable but not preferred; type explicitly when practical.
## Import Organization
- `@/*` maps to `./src/*`, configured in both `tsconfig.json` (`"paths": { "@/*": ["./src/*"] }`) and `vite-tsconfig-paths` plugin in `vite.config.ts`. Always use `@/...` for cross-directory imports; never use deep relative paths like `../../lib/utils`.
## Error Handling
- No global error boundary or error-tracking service is wired in. `notFoundComponent` (`NotFoundComponent` in `src/routes/__root.tsx`) is the only structured error UI, handling 404s.
- `try/catch` is used sparingly and only to guard browser-storage APIs that may throw in restrictive environments (`src/lib/nav-context.ts`):
- Promise rejections from non-critical browser APIs are silenced inline rather than logged: `videoRef.current.play().catch(() => {});` in `src/components/project-media.tsx`. Use this pattern for autoplay/media APIs that can legitimately reject (e.g. browser autoplay policy) without needing to surface an error to the user.
- Search-param validation uses Zod `.catch()` for graceful fallback instead of throwing, e.g. `service: z.string().optional().catch("marca")` in `src/routes/natrave.tsx` — invalid/missing query params silently resolve to a sane default rather than causing a validation error page. Follow this pattern for all `validateSearch` schemas on project routes.
- No custom `Error` subclasses, no centralized error-formatting utility, no toast/notification system for surfacing errors to the user.
## Comments
- Sparse, used mainly for: (a) explaining *why* a workaround exists (e.g. `/* ignore */` after empty catch), (b) documenting non-obvious data-flow/purpose at the top of lib files (`src/lib/seo.ts`, `src/lib/nav-context.ts` both open with 1–3 line block comments describing the module's role), (c) marking visual/JSX sections inside long route files (`{/* Hero */}`, `{/* Bloco 1 - Centralizado */}`, `{/* Mobile overlay */}`).
- No JSDoc/TSDoc annotations used anywhere in the codebase — types are conveyed via TypeScript signatures, not doc comments.
## Function Design
## Module Design
## Data-Driven Content Pattern
## Styling Conventions
- Tailwind CSS v4 utility classes directly in JSX `className`; no CSS Modules or styled-components.
- `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) is the standard way to conditionally compose class names — always use `cn(...)` instead of manual template-literal class concatenation when there is any conditional logic. Plain template literals are used for very simple ternaries (see `MethodsSection` in `src/routes/index.tsx`), but `cn()` is preferred for anything with more than one condition.
- Inline `style={{ ... }}` is used for scroll-driven/dynamic values that can't be expressed as static Tailwind classes (parallax transforms, opacity tied to `scrollY` state) — this is an accepted, deliberate pattern, not a code smell, in animation-heavy sections of `src/routes/index.tsx`.
- Custom utility classes beyond Tailwind's defaults are defined in `src/styles.css` and used alongside Tailwind classes (`site-container`, `site-section`, `btn btn-primary`, `anim-fade-in`, `scroll-reveal`).
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Overview
```text
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
- File-based routing: every file in `src/routes/` becomes a URL (`src/routes/natrave.tsx` → `/natrave`, `src/routes/brand.$brandId.tsx` → `/brand/:brandId`).
- No client-side global state manager (no Redux/Zustand/Context-based store) — page state is local `useState`/`useEffect` per route/component.
- No database or ORM. All page content (project text, images, service descriptions) is hardcoded as inline TS objects/arrays directly inside route files.
- One server route (`src/routes/sitemap[.]xml.ts`) uses TanStack Start's `server.handlers.GET` to return a raw XML `Response` — the only non-HTML/non-React route.
- SSR + hydration: `RootShell` renders `<html>`/`<head>`/`<Scripts />`; `RootComponent` renders the actual persistent app chrome (Cursor, Header, ContextNav, Outlet, Footer).
- Styling is Tailwind CSS v4 utility classes (via `@tailwindcss/vite` plugin) plus a small set of custom CSS classes (`site-container`, `site-section`, `scroll-reveal`, `anim-fade-in`, `btn`, etc.) defined in `src/styles.css`.
- Path alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
## Layers
- Purpose: Maps URLs to page components and defines per-page `<head>` metadata.
- Location: `src/routes/`
- Contains: `createFileRoute()` calls, `head()` SEO functions, page components, and (for one route) a server GET handler.
- Depends on: `src/lib/seo.ts`, `src/lib/nav-context.ts`, `src/components/*`, `src/hooks/*`.
- Used by: `src/router.tsx` via the generated `routeTree.gen.ts`.
- Purpose: Wraps every route with persistent document structure and global chrome (nav, footer, cursor).
- Location: `src/routes/__root.tsx`
- Contains: `createRootRoute()`, `RootShell` (HTML document), `RootComponent` (app chrome + `<Outlet/>`), `NotFoundComponent`.
- Depends on: `src/components/Header.tsx`, `Footer.tsx`, `Cursor.tsx`, `ContextNav.tsx`, `src/styles.css`.
- Used by: The router (root of the route tree).
- Purpose: Reusable presentational and interactive UI building blocks shared across route files.
- Location: `src/components/`
- Contains: Layout primitives (case-study layouts, brand header), media rendering (`project-media.tsx`), navigation (`Header.tsx`, `ContextNav.tsx`), decorative/interactive widgets (`Cursor.tsx`, `draggable-marquee.tsx`, `service-selector.tsx`, `website-scroll-showcase.tsx`).
- Depends on: `src/lib/utils.ts` (`cn`), `src/hooks/use-scroll-reveal.tsx`, `lucide-react` icons, `@tanstack/react-router` (`Link`).
- Used by: Route files in `src/routes/`.
- Purpose: Small, dependency-free helper modules with no React/JSX.
- Location: `src/lib/`
- Contains: `seo.ts` (per-route head builder), `nav-context.ts` (route → breadcrumb metadata + sessionStorage origin tracking), `utils.ts` (`cn` classname helper).
- Depends on: Nothing internal (leaf modules).
- Used by: Route files and components throughout.
- Purpose: Reusable React hooks encapsulating browser-API-driven behavior.
- Location: `src/hooks/`
- Contains: `use-scroll-reveal.tsx` (IntersectionObserver-based scroll animation trigger).
- Depends on: React only.
- Used by: Route files (e.g. `src/routes/index.tsx`, `brand.$brandId.tsx`) and layout components.
- Purpose: Images, GIFs, PDFs, brand logos referenced by routes/components.
- Location: `public/` (served as-is at root, e.g. `/cv/curriculo.pdf`, `/assets/projects/...`), `src/assets/logos/` (imported via `import.meta.glob` for bundling/hashing).
- Depends on: Nothing.
- Used by: Route files (`<img src="/assets/...">`) and `src/routes/index.tsx` (dynamic logo import via `import.meta.glob("/src/assets/logos/*...")`).
## Data Flow
### Primary Request Path
### Sitemap Generation Flow (server-only route)
### Client-Side Navigation Flow
- No global store. State is local to each component (`useState`, `useEffect`) and re-initialized on every route mount.
- The only persisted client state is `sessionStorage["nav:origin"]`, written/read via `setOrigin`/`getOrigin` in `src/lib/nav-context.ts:74-89`.
- Page content (project lists, service descriptions, gallery images) is defined as static in-file arrays/objects, not fetched from any API or loader.
## Key Abstractions
- Purpose: Represents one page — bundles URL matching, SEO `head()`, and the rendered `component` (and optionally a server `GET` handler) in a single file.
- Examples: `src/routes/index.tsx`, `src/routes/natrave.tsx`, `src/routes/brand.$brandId.tsx`, `src/routes/sitemap[.]xml.ts`
- Pattern: `export const Route = createFileRoute("/path")({ head: () => ({...}), component: PageComponent })`. Dynamic segments use `$paramName` in the filename (e.g. `brand.$brandId.tsx`).
- Purpose: Normalizes canonical URL, OG tags, and Twitter card meta so every route's SEO output is consistent.
- Examples: Used in `src/routes/index.tsx:11`, `src/routes/brand.$brandId.tsx:9`, and virtually every other route file.
- Pattern: Call with `{ path, title, description, type?, image? }`, spread the result into the route's `head()` return value, optionally appending JSON-LD `scripts`.
- Purpose: Central, hand-maintained map describing each route's place in the site hierarchy (top-level vs. child of a category), used purely for breadcrumb UI — not for route matching itself.
- Examples: `src/lib/nav-context.ts:33`
- Pattern: New pages that are NOT top-level (i.e. project/case pages, service detail pages) must add an entry here or `ContextNav` will render nothing for them.
- Purpose: Single component that decides how to render project imagery based on file extension (`.mp4`/`.webm` → video, `.gif` with hover-play → canvas/img swap, otherwise plain `<img>`).
- Examples: `src/components/project-media.tsx`, used in `src/routes/index.tsx:224`
- Pattern: Pass `src` (a path string) and let the component infer rendering strategy — callers never need `if (isVideo)` branches themselves.
- Purpose: Shared scaffolding for individual project pages so each project route (`natrave.tsx`, `evidive.tsx`, etc.) doesn't reinvent hero/section structure.
- Examples: `src/components/social-case-layout.tsx`, `src/components/social-media-case.tsx`, `src/components/brand-header.tsx`
- Pattern: Route files import and compose these with project-specific content data.
## Entry Points
- Location: `@tanstack/react-start/server-entry` (package-provided, referenced as `main` in `wrangler.jsonc`)
- Triggers: Every incoming HTTP request in production (Cloudflare Workers runtime).
- Responsibilities: Resolves the route tree, runs `head()`/server handlers, renders `RootShell`/`RootComponent` to HTML, streams response.
- Location: `src/router.tsx` (`getRouter()`)
- Triggers: Client-side hydration on page load; also referenced by TanStack Start's build tooling.
- Responsibilities: Instantiates `createRouter` with the generated route tree, sets `scrollRestoration: true`, `defaultPreloadStaleTime: 0`, and wires `DefaultErrorComponent` for uncaught route errors.
- Location: `vite.config.ts` (`vite dev`, port 8080)
- Triggers: `npm run dev` / `bun run dev`.
- Responsibilities: Runs Vite dev server without the Cloudflare Workers plugin (skipped in dev since `workerd` runtime isn't available locally); includes custom dev-only plugins for forwarding client/SSR runtime errors over HMR websocket (`devClientErrorLogger`, `devServerFnErrorLogger` in `vite.config.ts`).
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
### `any` typed props in component interfaces
## Error Handling
- `DefaultErrorComponent` (`src/router.tsx:4-63`) shows a generic "Something went wrong" screen with a dev-only stack trace (`import.meta.env.DEV`), a "Try again" button that calls `router.invalidate()` + `reset()`, and a "Go home" link.
- `NotFoundComponent` (`src/routes/__root.tsx:9-31`) renders a branded 404 page with a link back to `/`.
- No try/catch or error handling exists inside individual route components — errors bubble to the router's boundary.
- Dev-time runtime/SSR errors are additionally forwarded over Vite's HMR websocket for terminal visibility via custom plugins in `vite.config.ts` (`devClientErrorLogger`, `devServerFnErrorLogger`) — this is a development-only diagnostic aid, not part of production error handling.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
