# Codebase Structure

**Analysis Date:** 2026-08-04

## Directory Layout

```
murilo-ortegga/
├── src/
│   ├── routes/          # File-based routes — one file = one URL (pages + one XML endpoint)
│   ├── components/      # Shared React components (nav, layout, media, widgets)
│   ├── lib/              # Framework-free helper modules (SEO, nav-context, cn util)
│   ├── hooks/            # Reusable React hooks
│   ├── assets/logos/     # Brand logo files, bundled via import.meta.glob
│   ├── routeTree.gen.ts  # Auto-generated route registry (DO NOT hand-edit)
│   ├── router.tsx        # Router factory + default error component
│   └── styles.css        # Global Tailwind CSS + custom utility classes
├── public/               # Static files served verbatim at site root
│   ├── assets/projects/  # Project imagery (thumbnails, case study media)
│   ├── assets/about/     # About-page imagery
│   ├── cv/                # Downloadable CV PDF
│   └── robots.txt
├── dist/                 # Build output (client + server bundles) — generated, not committed source
├── .wrangler/            # Cloudflare Wrangler local state — generated
├── .lovable/              # Lovable.dev platform metadata (plan.md)
├── .claude/               # Claude Code project config
├── .planning/             # GSD planning artifacts (this document lives here)
├── vite.config.ts         # Vite build config: plugins (Tailwind, TanStack Start, Cloudflare, React), path alias
├── wrangler.jsonc         # Cloudflare Workers deployment config (entry: server-entry)
├── tsconfig.json          # TypeScript config, path alias `@/*` -> `src/*`
├── eslint.config.js       # ESLint flat config
└── package.json           # Scripts: dev, build, build:dev, preview, lint
```

## Directory Purposes

**`src/routes/`:**
- Purpose: Defines every page and one non-HTML endpoint via TanStack Start's file-based router.
- Contains: `createFileRoute()` route modules — page components with `head()` SEO functions; `__root.tsx` (root shell/layout); `sitemap[.]xml.ts` (server-only XML handler).
- Key files: `__root.tsx` (global layout), `index.tsx` (homepage, largest content file), `trabalho.tsx` (portfolio listing), `metodos.tsx` + `metodos.*.tsx` (nested method pages), `brand.$brandId.tsx` (dynamic brand case route), one file per client project (`natrave.tsx`, `evidive.tsx`, `kapyi.tsx`, `kmillion.tsx`, `livin.tsx`, `marco-boni.tsx`, `maxi.tsx`, `milgrows.tsx`, `natrave.tsx`, `solid.tsx`, `symplice.tsx`, `talk2buy.tsx`).

**`src/components/`:**
- Purpose: Presentational/interactive UI shared across multiple routes.
- Contains: Global chrome (`Header.tsx`, `Footer.tsx`, `ContextNav.tsx`, `Cursor.tsx`), media rendering (`project-media.tsx`), case-study scaffolding (`social-case-layout.tsx`, `social-media-case.tsx`, `brand-header.tsx`, `website-scroll-showcase.tsx`), interactive widgets (`draggable-marquee.tsx`, `service-selector.tsx`).
- Key files: `ContextNav.tsx` (breadcrumb logic, depends on `src/lib/nav-context.ts`), `project-media.tsx` (extension-based media type switch, used by most project routes).

**`src/lib/`:**
- Purpose: Plain TypeScript helpers with no JSX — the only "business logic" layer in the app.
- Contains: `seo.ts` (per-route head builder), `nav-context.ts` (route hierarchy map + sessionStorage helpers), `utils.ts` (`cn` classname merge helper).
- Key files: `nav-context.ts` (must be updated when adding new non-top-level routes).

**`src/hooks/`:**
- Purpose: Reusable stateful browser-API logic extracted from components.
- Contains: `use-scroll-reveal.tsx` (IntersectionObserver-driven scroll animation).

**`src/assets/logos/`:**
- Purpose: Client/brand logo image files for the homepage marquee.
- Contains: SVG/PNG files, one per brand (e.g. `evidive.svg`, `symplice.png`). Loaded dynamically via `import.meta.glob("/src/assets/logos/*.{png,jpg,jpeg,svg,webp}", { eager: true })` in `src/routes/index.tsx:184` — new files dropped here are picked up automatically without code changes.

**`public/`:**
- Purpose: Files served as-is at the site root (no bundling/hashing) — referenced with absolute paths like `/assets/projects/...` or `/cv/curriculo.pdf`.
- Contains: `assets/projects/` (per-project subfolders with thumbnails/case media), `assets/about/`, `cv/curriculo.pdf`, `robots.txt`, a few loose root-level images (`hero-brandding.jpg`, `natrave-marca.png`, `solid-full.png`/`.jpg`).
- Generated: No — manually curated.
- Committed: Yes.

**`dist/`:**
- Purpose: Vite build output — `dist/client` (browser bundle + static assets) and `dist/server` (SSR/Worker bundle).
- Generated: Yes (via `npm run build`).
- Committed: No (should be gitignored — verify `.gitignore`).

**`.wrangler/`:**
- Purpose: Cloudflare Wrangler CLI local cache/state (`deploy/` subfolder).
- Generated: Yes.
- Committed: No.

**`.lovable/`:**
- Purpose: Metadata for the Lovable.dev platform this project was originally scaffolded/edited on (contains `plan.md`).
- Generated: Platform-managed.
- Committed: Likely yes (small metadata file).

## Key File Locations

**Entry Points:**
- `wrangler.jsonc`: Declares `@tanstack/react-start/server-entry` as the Cloudflare Worker's `main` — the production SSR entry point.
- `src/router.tsx`: `getRouter()` — client-side router instantiation and default error boundary.
- `src/routes/__root.tsx`: Root route — HTML document shell (`RootShell`) and persistent app chrome (`RootComponent`).

**Configuration:**
- `vite.config.ts`: Build/dev config — plugins (Tailwind v4, TanStack Start, Cloudflare Workers, React, `vite-tsconfig-paths`), path alias `@` → `src`, dev-only error-forwarding plugins.
- `tsconfig.json`: TS compiler options (`strict: true`, ES2022, bundler resolution), path alias `@/*` → `./src/*`.
- `wrangler.jsonc`: Cloudflare deployment target, compatibility date/flags.
- `eslint.config.js`: Flat ESLint config.

**Core Logic:**
- `src/lib/seo.ts`: SEO head builder — used by nearly every route.
- `src/lib/nav-context.ts`: Route hierarchy registry for breadcrumb nav — must be updated for new non-top-level routes.
- `src/routes/*.tsx`: Page-specific content and rendering (content is co-located with presentation, not separated).

**Testing:**
- None found. No test runner config, no `*.test.*`/`*.spec.*` files anywhere in `src/`. See CONCERNS.md-equivalent note: this project currently has zero automated test coverage.

## Naming Conventions

**Files:**
- Route files: lowercase, kebab-case-free single words matching the URL segment (e.g. `natrave.tsx` → `/natrave`, `marco-boni.tsx` → `/marco-boni`).
- Nested/dotted routes use TanStack Start's dot-segment convention: `metodos.tsx` (layout) + `metodos.index.tsx` + `metodos.estruturacao-de-marca.tsx` etc. (dot = path segment separator, mirrors `/metodos`, `/metodos/estruturacao-de-marca`).
- Dynamic params use `$paramName` embedded in the filename: `brand.$brandId.tsx` → `/brand/:brandId`.
- Non-page server routes bracket-escape the literal dot in the URL: `sitemap[.]xml.ts` → `/sitemap.xml`.
- Components: PascalCase for component files that export a single named component (`Header.tsx`, `Footer.tsx`, `Cursor.tsx`, `ContextNav.tsx`); kebab-case for newer/multi-export component files (`project-media.tsx`, `social-case-layout.tsx`, `draggable-marquee.tsx`, `service-selector.tsx`, `brand-header.tsx`, `website-scroll-showcase.tsx`, `social-media-case.tsx`). Both conventions coexist — no single enforced standard.
- Hooks: kebab-case filename prefixed `use-` (`use-scroll-reveal.tsx`), exporting a camelCase `useXxx` function.
- Lib modules: kebab-case (`nav-context.ts`, `seo.ts`, `utils.ts`).

**Directories:**
- All lowercase, singular-purpose names (`routes`, `components`, `lib`, `hooks`, `assets`).

## Where to Add New Code

**New page/route:**
- Create a file in `src/routes/` matching the desired URL path (see Naming Conventions above for dot/param syntax). The route tree regenerates automatically (`src/routeTree.gen.ts`) — no manual registration needed for basic routing.
- Add a `head()` using `routeSeo()` from `src/lib/seo.ts` for consistent meta tags.
- If the new page is NOT top-level (i.e. it's a project/case page or service/method detail page), add an entry to `ROUTE_CONTEXT` in `src/lib/nav-context.ts` so `ContextNav` renders breadcrumbs correctly.
- Add the new path to the `entries` array in `src/routes/sitemap[.]xml.ts` if it should be indexed by search engines.
- If it's a project case study, follow the pattern of existing project routes (e.g. `src/routes/natrave.tsx`) and consider reusing `src/components/social-case-layout.tsx` or `social-media-case.tsx` rather than building layout from scratch.

**New shared component:**
- Place in `src/components/`. Use PascalCase filename if it exports one primary named component matching global chrome conventions (Header/Footer-style); use kebab-case if following the newer multi-export/utility component convention (project-media/social-case-layout-style). Prefer matching whichever sibling component is most similar in purpose.
- Import `cn` from `src/lib/utils.ts` for conditional className composition (established pattern in `Header.tsx`, `project-media.tsx`).

**New hook:**
- Place in `src/hooks/` as `use-<name>.tsx`, exporting a single `useXxx` function. Follow `use-scroll-reveal.tsx` as the template (ref-based, cleanup in `useEffect` return).

**Utilities:**
- Framework-agnostic helpers (no JSX, no React hooks) belong in `src/lib/` as kebab-case `.ts` files.

**New static asset:**
- Brand/client logos: drop into `src/assets/logos/` — automatically picked up by the `import.meta.glob` scan in `src/routes/index.tsx:184` (no code change required).
- Project imagery/case media: add under `public/assets/projects/<project-name>/` and reference with an absolute path (e.g. `/assets/projects/<project-name>/thumb.jpg`).

## Special Directories

**`dist/`:**
- Purpose: Vite/Cloudflare build artifacts (`dist/client`, `dist/server`).
- Generated: Yes.
- Committed: No (build output; regenerate with `npm run build`).

**`.wrangler/`:**
- Purpose: Local Cloudflare Wrangler CLI cache/deploy state.
- Generated: Yes.
- Committed: No.

**`src/routeTree.gen.ts`:**
- Purpose: Auto-generated typed route registry consumed by `src/router.tsx`.
- Generated: Yes (by `@tanstack/router-plugin`, runs automatically via the Vite plugin during dev/build).
- Committed: Typically yes for this plugin's convention, but never hand-edited — treat as build output that happens to be checked in.

**`node_modules/`, `bun.lock`, `bun.lockb`, `package-lock.json`:**
- Purpose: Dependency management. Both `bun.lock(b)` and `package-lock.json` are present, suggesting the project has been managed with both Bun and npm at different times — prefer whichever lockfile matches the currently intended package manager before running installs.

---

*Structure analysis: 2026-08-04*
