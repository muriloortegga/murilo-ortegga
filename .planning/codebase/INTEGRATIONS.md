# External Integrations

**Analysis Date:** 2026-08-04

This is a static/SSR marketing portfolio site with no backend application logic, no database, and no authenticated user flows. All "integrations" are outbound links to third-party services and one embedded font provider — there are no SDKs, API keys, or server-to-server calls in the codebase.

## APIs & External Services

**Messaging / Lead capture:**
- WhatsApp click-to-chat - `https://wa.me/5511941765691?text=...` links used as the primary CTA across the site
  - SDK/Client: none — plain `<a>` anchor with `target="_blank"`
  - Auth: none (public deep link)
  - Locations: `src/components/Footer.tsx`, `src/components/Header.tsx` (nav item), `src/components/social-case-layout.tsx`, `src/routes/contato.tsx`, and CTA links across most `src/routes/metodos.*.tsx` pages, `src/routes/sobre.tsx`, `src/routes/evidive.tsx`

**Scheduling:**
- Calendly - `https://calendly.com/contato-muriloortega1/30min` - "Agendar Call" CTA
  - SDK/Client: none — plain outbound link, not an embedded widget/iframe
  - Locations: `src/routes/contato.tsx`, `src/routes/metodos.sistema-de-conteudo.tsx`

**Email:**
- `mailto:contato@muriloortega.com` link - `src/routes/contato.tsx`

**Social profiles (outbound links only, no API integration):**
- LinkedIn - `https://linkedin.com/in/muriloortega`
- Instagram - `https://instagram.com/muriloortega`
- Behance - `https://behance.net/muriloortega`
- Upwork - `https://upwork.com` (generic, not a profile deep link)
  - Locations: `src/components/Footer.tsx`, `src/routes/contato.tsx`, `src/routes/index.tsx` (used in `sameAs` array, likely for JSON-LD `Person`/`Organization` structured data)

**Fonts:**
- Google Fonts - `fonts.googleapis.com` / `fonts.gstatic.com`, loading "DM Sans" and "DM Mono" families
  - Integration method: `<link rel="preconnect">` + `<link rel="stylesheet">` tags declared in the route head config, `src/routes/__root.tsx`
  - No self-hosting/`next/font`-style optimization — fonts are fetched from Google's CDN at request time

## Data Storage

**Databases:**
- None. No ORM, no database client, no `DATABASE_URL`-style config detected anywhere in dependencies or source.

**File Storage:**
- Local filesystem only — all media (project images, logos, CV PDF) is committed as static assets under `public/assets/` and `src/assets/`, served directly by Vite/Cloudflare's static asset handling. No S3/Cloudinary/R2 client detected.

**Caching:**
- None application-level. `src/routes/sitemap[.]xml.ts` sets `Cache-Control: public, max-age=3600` on its response, but there is no CDN/KV/Redis integration in code.

## Authentication & Identity

**Auth Provider:**
- None. This is a fully public marketing site with no login, no sessions, no protected routes.

## Monitoring & Observability

**Error Tracking:**
- None in production. `vite.config.ts` contains two **dev-only** custom Vite plugins (`devClientErrorLogger`, `devServerFnErrorLogger`) that forward browser runtime errors and TanStack Start server-function errors to the local Vite dev server console over HMR — these do not run in production builds and are not a substitute for a real error-tracking service (e.g., Sentry is not integrated).

**Logs:**
- No structured logging framework. Production logging (if any) would be whatever Cloudflare Workers' default `console.log` capture provides via the Cloudflare dashboard — no explicit logging integration found in `src/`.

**Analytics:**
- None detected — no Google Analytics, Plausible, Fathom, PostHog, or similar tracking script/pixel found in `src/routes/__root.tsx` or elsewhere.

## CI/CD & Deployment

**Hosting:**
- Cloudflare Workers, per `wrangler.jsonc` (`compatibility_date: 2025-09-24`, `nodejs_compat` flag) and the `@cloudflare/vite-plugin` build integration in `vite.config.ts`.
- Git remote: `github.com/muriloortegga/murilo-ortegga.git` (`.git/config`)

**CI Pipeline:**
- None detected in-repo — no `.github/workflows/`, no `.gitlab-ci.yml`, no other CI config files found. Deployment is presumably manual (`wrangler deploy`) or configured outside this repository (e.g., a Cloudflare Pages/Workers dashboard build hook), since no deploy script exists in `package.json`.

**Origin / editing platform:**
- `.lovable/` directory present, containing prompt/task notes (e.g. a cleanup plan for removing unused shadcn/ui components and dependencies) — indicates the project is developed/maintained through the Lovable AI app-builder platform in addition to direct code edits. `lovable-tagger`'s `componentTagger()` Vite plugin (dev-mode only) is part of this integration, tagging DOM elements with source metadata for Lovable's visual editor.

## Environment Configuration

**Required env vars:**
- None currently consumed by the application code. `vite.config.ts` is wired to pick up any `VITE_`-prefixed variable automatically via `loadEnv`, but no such variable is referenced in `src/`.

**Secrets location:**
- No secrets exist in this codebase today. If server-side secrets are needed in the future (e.g., a form-submission API key), the established Cloudflare Workers convention is a `.dev.vars` file locally (already excluded via `.gitignore`) and `wrangler secret put` for production — not a `.env` file.

## Webhooks & Callbacks

**Incoming:**
- None. The only server-side route handler in the app is `src/routes/sitemap[.]xml.ts`, which serves a static, generated XML sitemap on `GET /sitemap.xml` — it is not a webhook receiver.

**Outgoing:**
- None. There is no server-side `fetch()`/HTTP client call anywhere in `src/` (confirmed via repo-wide search) — all "integrations" listed above are client-rendered outbound links, not API calls made by this application.

---

*Integration audit: 2026-08-04*
