# Codebase Concerns

**Analysis Date:** 2026-08-04

## Tech Debt

**Hardcoded WhatsApp contact link duplicated across 17+ files:**
- Issue: The literal string `https://wa.me/5511941765691?text=gostaria%20de%20fazer%20um%20or%C3%A7amento!` is copy-pasted in at least 17 locations instead of being defined once.
- Files: `src/components/Header.tsx:9`, `src/components/Footer.tsx:17`, `src/components/social-case-layout.tsx:268`, `src/routes/sobre.tsx:335`, `src/routes/contato.tsx:37`, `src/routes/evidive.tsx:660`, `src/routes/metodos.marketing-de-influencia.tsx:28,153`, `src/routes/metodos.sistema-de-conteudo.tsx:32`, `src/routes/metodos.midia-impressa.tsx:27,120`, `src/routes/metodos.midia-ooh.tsx:28,113`, `src/routes/metodos.presenca-digital.tsx:27,187`, `src/routes/metodos.estruturacao-de-marca.tsx:28,113`
- Impact: Changing the phone number or default message text (a near-certainty for a freelancer's contact info) requires editing 17+ files with high risk of missing one, producing inconsistent contact behavior.
- Fix approach: Extract to a single constant (e.g. `src/lib/contact.ts` exporting `WHATSAPP_URL`) and import everywhere.

**Hardcoded production domain duplicated in 3 files:**
- Issue: `https://murilo-ortegga.lovable.app` (or `/`) is hardcoded independently in three places rather than derived from one config value.
- Files: `src/routes/sitemap[.]xml.ts:4` (`BASE_URL`), `src/routes/__root.tsx:72` (JSON-LD `url`), `src/routes/index.tsx:27` (JSON-LD `url`)
- Impact: If a custom domain is ever attached (no `custom_domain` is configured in `wrangler.jsonc`), sitemap URLs, canonical/OG tags, and structured data will silently point to the wrong (or stale `lovable.app` preview) domain, hurting SEO — directly relevant since the last commit was "Fixed SEO findings in batch".
- Fix approach: Centralize as a single exported `SITE_URL` constant (e.g. in `src/lib/seo.ts`) consumed by all three call sites; `routeSeo()` in `src/lib/seo.ts` should also build absolute `og:url`/`twitter:image` values from it instead of relying on relative paths (see Fragile Areas below).

**Two package managers' lockfiles committed simultaneously:**
- Issue: `bun.lock`, `bun.lockb`, and `package-lock.json` are all present at the repo root, with `bunfig.toml` present too.
- Files: `bun.lock`, `bun.lockb`, `package-lock.json`, `bunfig.toml`
- Impact: Ambiguous source of truth for dependency resolution; a contributor running `npm install` vs `bun install` can produce divergent `node_modules` trees and silently drift the lockfiles out of sync.
- Fix approach: Pick one package manager (Bun, given `bunfig.toml`), delete `package-lock.json`, and document the required tool (e.g. in a `README.md`, which does not currently exist in the repo).

**`ESLint` disables the unused-vars rule and provides no test/type-check gate:**
- Issue: `eslint.config.js` sets `"@typescript-eslint/no-unused-vars": "off"`. There is no `tsc --noEmit` script and no test runner configured (`package.json` scripts are only `dev`, `build`, `build:dev`, `preview`, `lint`).
- Files: `eslint.config.js:24`, `package.json`
- Impact: Dead imports/variables accumulate silently; `npm run lint`/`bun run lint` does not catch type errors, so `tsc` errors only surface at build time (or not at all if `noEmit` build path differs). No automated regression protection exists at all (see Test Coverage Gaps).
- Fix approach: Re-enable `no-unused-vars` (or switch to the stricter `unused-imports` plugin), and add a `"typecheck": "tsc --noEmit"` script wired into CI.

**Untyped props (`any`) in shared components:**
- Issue: `style?: any` and inline `any` typings bypass TypeScript's type checking on props that flow into every project page.
- Files: `src/components/project-media.tsx:9` (`style?: any`), `src/routes/index.tsx:199,201` (`ProjectCard({ project, index }: { project: any, index: number })`, `cardRef = (node: any) =>`)
- Impact: `project-media.tsx` is used by nearly every case-study route; an `any`-typed `style` prop and `project` object means typos in prop names (e.g. `porject.gif`) or wrong types will not be caught until runtime.
- Fix approach: Define a `Project` interface (fields: `to`, `name`, `category`, `image`, `gif?`) in `src/routes/index.tsx` or a shared types file, and type `style?: React.CSSProperties` in `project-media.tsx`.

**Dead/placeholder route shipped to production (`/brand/$brandId`):**
- Issue: `src/routes/brand.$brandId.tsx` is a full generic "Brand Case" page with a "Mais detalhes em breve" ("more details coming soon") placeholder section, hardcoded hotlinked Unsplash stock images, and is not linked from anywhere in the app's navigation (`Header.tsx`, `Footer.tsx`, `trabalho.tsx`) or `sitemap.xml`.
- Files: `src/routes/brand.$brandId.tsx`, `src/lib/nav-context.ts:65` (still wires context for it)
- Impact: Unfinished/placeholder content is publicly reachable at any `/brand/<anything>` URL, uses external Unsplash URLs (`images.unsplash.com`) that can break or rate-limit rather than the site's own hosted assets, and adds unnecessary bundle/route surface for a page that serves no real content.
- Fix approach: Either finish and link the page, or delete the route entirely along with its `nav-context.ts` special-case (`pathname.startsWith("/brand/")`).

**Dead placeholder client list shipped in bundle:**
- Issue: `src/routes/index.tsx:190-197` defines a `brands` array with fake clients ("Vogue", "Natural Pure", "Tech Flow") used only as a fallback if `dynamicLogos` (built from a Vite glob import of `src/assets/logos/*`) is empty.
- Files: `src/routes/index.tsx:190-197,314`
- Impact: Low risk in practice (real logos are present so the fallback rarely triggers), but ships fake client names in production JS; if the logo glob ever fails silently, the homepage would display fabricated clients.
- Fix approach: Remove the fake fallback array or replace it with an empty-state UI instead of fabricated brand names.

## Known Bugs

**`ContextNav` category links point to non-existent `/servicos/*` routes (404s):**
- Symptoms: On every case-study/project page (e.g. `/natrave`, `/evidive`, `/kmillion`, `/talk2buy`, `/maxi`, `/milgrows`, `/kapyi`, `/symplice`, `/solid`, `/marco-boni`, `/livin`), the sticky `ContextNav` breadcrumb renders a "category" chip (e.g. "Social Media", "Id Visual", "Mídia Impressa") linking to paths like `/servicos/sistema-de-conteudo`.
- Files: `src/lib/nav-context.ts:17-24,41-46` (defines `SOCIAL`, `ID_VISUAL`, `IMPRESSA`, `OOH`, `WEB`, `INFLU`, `SERVICOS` all pointing at `/servicos/...`), rendered by `src/components/ContextNav.tsx:83-91`
- Trigger: Visit any project route and look at the sticky nav bar under the header; click the category link.
- Root cause: The actual routes live under `/metodos/*` (confirmed via `src/routes/metodos.*.tsx` and `src/routeTree.gen.ts`), not `/servicos/*`. No `/servicos` route exists anywhere in `src/routes/`.
- Workaround: None currently — clicking the category chip on any project page leads to the 404 page (`NotFoundComponent` in `src/routes/__root.tsx`).
- Fix approach: Update all `to: "/servicos/..."` values in `src/lib/nav-context.ts` to the corresponding `/metodos/...` paths, and rename `SERVICOS`/`"/servicos"` entries to `/metodos`.

**Custom cursor hover states stop working after client-side navigation:**
- Symptoms: The custom cursor (`.hovering` class added on hover over links/buttons) only reacts correctly on the very first page the user lands on; after navigating client-side to another route, hovering new links/buttons on the new page does not trigger the "hovering" cursor state.
- Files: `src/components/Cursor.tsx:6-38`
- Trigger: Load the site, navigate via any `<Link>` (e.g. Header nav) to a different route, then hover a button/link that did not exist in the DOM on initial mount.
- Root cause: `Cursor` is mounted once at the root layout (`src/routes/__root.tsx:100`, outside `<Outlet>`), and its `useEffect` has an empty dependency array. It runs `document.querySelectorAll("a, button, .project-card")` exactly once and attaches `mouseenter`/`mouseleave` listeners only to nodes that existed at that moment — it never re-scans after route changes.
- Workaround: None; degrades silently (cursor still moves, just never shows hover affordance on newly rendered interactive elements).
- Fix approach: Use event delegation (`document.addEventListener("mouseover"/"mouseout")` with `closest("a, button, .project-card")` checks) instead of per-node listeners, or re-run the query on every route change via `useLocation()`.

## Security Considerations

**External image hotlinking on a public route:**
- Risk: `src/routes/brand.$brandId.tsx:53,60` embeds `https://images.unsplash.com/...` URLs directly. This creates a dependency on a third-party asset host from a route that is publicly reachable at arbitrary `/brand/<id>` paths, and leaks referrer/traffic data to Unsplash on every page view.
- Files: `src/routes/brand.$brandId.tsx`
- Current mitigation: None.
- Recommendations: Remove the route (see Tech Debt) or replace hotlinked images with self-hosted assets under `public/assets/`.

**No Content-Security-Policy or security headers configured:**
- Risk: The app is deployed to Cloudflare via `wrangler.jsonc` but defines no CSP, `X-Frame-Options`, or other security headers, leaving default browser behavior for embedded content/XSS mitigation.
- Files: `wrangler.jsonc`
- Current mitigation: React's default JSX escaping (no `dangerouslySetInnerHTML` usage found anywhere in `src/`, which is good).
- Recommendations: Add security headers via a Cloudflare Worker response transform or `_headers` file if the site ever accepts user input (currently it does not — all forms are external links to WhatsApp/Calendly/mailto, so this is low priority for a static portfolio).

## Performance Bottlenecks

**Multi-hundred-megabyte GIF assets served uncompressed and eagerly:**
- Problem: Several "website scroll" showcase GIFs are enormous and are rendered with a plain `<img>` tag with no `loading="lazy"` attribute, so they load eagerly on page render.
- Files: `public/assets/projects/kmillion/website-scroll.gif` (91 MB), `public/assets/projects/natrave/website-scroll.gif` (66 MB), `public/assets/projects/talk2buy/website-scroll.gif` (37 MB), rendered via `src/components/website-scroll-showcase.tsx:43-47` (`<img src={mediaSrc} ... />`, no `loading` attribute)
- Cause: Full-motion scroll-capture GIFs used instead of compressed video (`.mp4`/`.webm`) or a scroll-scrubbed video/canvas technique; no lazy-loading, no responsive/format alternatives.
- Improvement path: Convert these GIFs to muted, looping `<video>` elements (the codebase already has this pattern in `src/components/project-media.tsx:59-70` for other media) and add `loading="lazy"`/IntersectionObserver-gated mounting so off-screen showcases don't download until scrolled into view. Also compress `public/assets/about/photos/footer-bg.jpg` (25 MB), `hero-bg.jpg` (19 MB), `middle-bg.jpg` (17 MB) and other large PNGs (`kmillion-marca.png` 14 MB, `4.png` files 3-4 MB) — these are far above web-optimized sizes.

**Total asset payload (365 MB in `public/assets/projects`, 62 MB in `public/assets/about`) is fully committed to git:**
- Problem: All project media (~427 MB combined) lives directly in the repo and is served from Cloudflare without any CDN transform/optimization pipeline (no `next/image`-equivalent, no Cloudflare Images).
- Files: `public/assets/**` (committed; confirmed via `git ls-files public/assets | wc -l` → 93 tracked files, including the 91 MB GIF)
- Cause: No image optimization step in the build (`vite.config.ts` has no image plugin); raw exported design files are dropped directly into `public/`.
- Improvement path: Introduce a build-time image optimization step (e.g. `vite-plugin-image-optimizer` or pre-processing exports to WebP/AVIF + responsive `srcset`), and consider Cloudflare Images or an R2+Images pipeline given the app already deploys via `@cloudflare/vite-plugin`.

## Fragile Areas

**`routeSeo()` emits a relative `og:url`, contradicting the Open Graph spec:**
- Files: `src/lib/seo.ts:22` (`{ property: "og:url", content: path }` where `path` is e.g. `"/sobre"`)
- Why fragile: The Open Graph protocol requires `og:url` to be an absolute URL; the inline comment even claims relative paths "resolve correctly on any host," which is not how OG scrapers (Facebook, LinkedIn, WhatsApp preview) behave — they will either drop the tag or resolve it incorrectly. Given the last commit message was "Fixed SEO findings in batch," this looks like a known-but-incompletely-fixed issue.
- Safe modification: Update `routeSeo()` to prefix `path` with the canonical `SITE_URL` constant (see Tech Debt: hardcoded domain) before emitting `og:url`, `og:image`, and the `canonical` link (`src/lib/seo.ts:30`, which also currently emits a relative `href`).
- Test coverage: None (no tests exist at all).

**`social-media-case.tsx` and `social-case-layout.tsx` are large, prop-driven "kitchen sink" components reused by every case study:**
- Files: `src/components/social-media-case.tsx` (604 lines), `src/components/social-case-layout.tsx` (357 lines)
- Why fragile: Every project route (`evidive.tsx` 668 lines, `natrave.tsx` 318 lines, `maxi.tsx` 331 lines, `symplice.tsx` 205 lines, `kmillion.tsx` 246 lines, `talk2buy.tsx`, `kapyi.tsx`, `milgrows.tsx`, `solid.tsx`, `livin.tsx`, `marco-boni.tsx`) hand-assembles its own layout by composing many small locally-defined subcomponents plus these shared components, each with large inline prop objects (metadata, stats, colors, copy). There is no shared "case study schema"; each route re-implements section ordering and prop wiring by hand.
- Safe modification: Changes to shared section components (`PerformanceHero`, `Counter`, etc. in `social-media-case.tsx`) must be manually verified against all ~11 case-study routes since there is no type-level guarantee every route supplies compatible data, and no snapshot/visual tests exist.
- Test coverage: None.

## Scaling Limits

**Not applicable** — this is a static/SSR marketing portfolio site with no database, no user accounts, and no dynamic write paths. There are no meaningful data-volume or concurrency scaling concerns beyond the asset-size issues already covered under Performance.

## Dependencies at Risk

**None identified as urgent.** Core dependencies (`react`/`react-dom` 19.2, `@tanstack/react-router`/`react-start` 1.162, `vite` 7.3, `tailwindcss` 4.2) are current major versions as of the analysis date. `lovable-tagger` (`^1.1.13`, devDependency) is a Lovable.dev-specific build tool tied to the project's origin as a Lovable-generated app (see `.lovable/` directory) — if the project moves away from the Lovable platform, this dependency and its Vite plugin wiring in `vite.config.ts` become dead weight to remove.

## Missing Critical Features

**No `README.md` at the repository root:**
- Problem: There is no documentation of setup steps, required Node/Bun version, environment variables, or deployment process (Cloudflare via `wrangler.jsonc`) anywhere in the repo root.
- Blocks: Onboarding a new contributor or even the original author returning after time away requires reverse-engineering `package.json` scripts and `wrangler.jsonc` from scratch.

**No CI pipeline:**
- Problem: No `.github/workflows/` or equivalent CI configuration exists to run `lint`/`build` on push or PR.
- Blocks: Broken builds or lint regressions can be committed directly to `main` (confirmed: repo has no branch protection artifacts, and recent commits like "Changes" x3 are direct, undescriptive commits to `main`) without any automated check.

## Test Coverage Gaps

**Zero automated tests exist anywhere in the repository:**
- What's not tested: Everything — no unit tests, no component tests, no E2E tests. No test runner (Jest/Vitest/Playwright) is installed in `package.json`, and no `*.test.*`/`*.spec.*` files exist anywhere outside `node_modules`.
- Files: N/A (absence is repo-wide)
- Risk: The known bugs documented above (broken `/servicos/*` links in `ContextNav`, stale cursor hover state after navigation) would have been caught by even minimal route/integration tests. Any future refactor of the shared case-study components (`social-media-case.tsx`, `social-case-layout.tsx`) or `nav-context.ts` route mapping has no safety net and depends entirely on manual click-through QA across ~20 routes.
- Priority: High for `src/lib/nav-context.ts` (pure function, trivially unit-testable, currently broken) and `src/lib/seo.ts` (pure function generating SEO-critical output); Medium for route-level smoke tests (e.g. Playwright checking every route in `sitemap[.]xml.ts` returns 200 and has no console errors).

---

*Concerns audit: 2026-08-04*
