# Technology Stack

**Analysis Date:** 2026-08-04

## Languages

**Primary:**
- TypeScript 5.8 (strict mode) - all application code (`src/**/*.ts`, `src/**/*.tsx`), config files (`vite.config.ts`, `eslint.config.js`)

**Secondary:**
- CSS (Tailwind CSS v4 syntax) - `src/styles.css`
- JSONC - `wrangler.jsonc` (Cloudflare Worker config)

There is no server-side language distinct from the client — this is a single TypeScript codebase compiled to both a browser bundle and a Cloudflare Worker (SSR) bundle via Vite.

## Runtime

**Environment:**
- Node.js v25.9.0 (developer machine; no `.nvmrc` or `engines` field pins a version)
- Production runtime: **Cloudflare Workers** (via `@cloudflare/vite-plugin`, `wrangler.jsonc`), using `nodejs_compat` compatibility flag (`compatibility_date: 2025-09-24`)

**Package Manager:**
- Bun (`bun.lock`, `bun.lockb`, `bunfig.toml` present) - primary lockfile/toolchain
- `package-lock.json` also present (npm) - redundant/stale lockfile; treat `bun.lock` as source of truth
- `bunfig.toml` sets `saveTextLockfile = false`

## Frameworks

**Core:**
- React 19.2 (`react`, `react-dom`) - UI library
- TanStack Start 1.162 (`@tanstack/react-start`) - full-stack SSR framework (file-based routing + server functions/handlers)
- TanStack Router 1.162 (`@tanstack/react-router`, `@tanstack/router-plugin`) - file-based routing, generated route tree at `src/routeTree.gen.ts`
- Tailwind CSS 4.2 (`tailwindcss`, `@tailwindcss/vite`) - utility-first styling, CSS-first config (no `tailwind.config.js`; theme lives in `src/styles.css`)
- Framer Motion 12.38 - animations
- Zod 3.24 - schema validation (present as a dependency; verify actual usage sites before relying on it for new validation code)

**Testing:**
- Not detected — no test runner (`jest.config.*`, `vitest.config.*`), no `*.test.*`/`*.spec.*` files, no test script in `package.json`

**Build/Dev:**
- Vite 7.3 - dev server, bundler (`vite.config.ts`)
- `@vitejs/plugin-react` - React Fast Refresh / JSX transform
- `vite-tsconfig-paths` - resolves the `@/*` path alias from `tsconfig.json`
- `@cloudflare/vite-plugin` - builds a Cloudflare Worker-compatible SSR bundle (only applied on `command === "build"`, skipped in dev since workerd isn't available locally)
- `lovable-tagger` (`componentTagger()`) - dev-only Vite plugin, active only when `mode === "development"` (this project originated from/is edited via the Lovable platform — see `.lovable/` directory)
- ESLint 9 (flat config, `eslint.config.js`) - `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Key Dependencies

**Critical:**
- `@tanstack/react-start` / `@tanstack/react-router` / `@tanstack/router-plugin` (^1.162.9) - routing and SSR are the backbone of the app; route files under `src/routes/` are auto-collected into `src/routeTree.gen.ts` (generated, do not hand-edit)
- `react` / `react-dom` (^19.2.0) - React 19 features (e.g. new JSX transform, Actions) may be relied upon
- `tailwindcss` / `@tailwindcss/vite` (^4.2.1) - v4's Vite plugin approach differs from v3's PostCSS config; no `postcss.config.js` or `tailwind.config.ts` exists
- `clsx` + `tailwind-merge` - class name composition helper, likely wrapped in `src/lib/utils.ts` (standard `cn()` helper pattern)

**Infrastructure:**
- `@cloudflare/vite-plugin` (^1.25.5) + `wrangler.jsonc` - defines the deployment target as Cloudflare Workers (`main: "@tanstack/react-start/server-entry"`)
- `vite-tsconfig-paths` - keeps the `@/*` alias in sync between TS and Vite without duplicating alias config

**Custom dev tooling (in `vite.config.ts`):**
- `devClientErrorLogger()` - injects a virtual module into `routes/__root` (dev only) that forwards browser `error`/`unhandledrejection` events to the Vite dev server via HMR websocket, logged server-side
- `devServerFnErrorLogger()` - patches TanStack Start's server-functions-handler module at dev time to forward server-function errors over the same HMR channel
Both are dev-only (`apply: "serve"`) diagnostic aids; they do not run in production builds.

## Configuration

**Environment:**
- No `.env` files present in the repo (none found on disk)
- `vite.config.ts` calls `loadEnv(mode, process.cwd(), "VITE_")` and injects every `VITE_`-prefixed variable into `import.meta.env.*` via Vite's `define` — so any env-driven config must use the `VITE_` prefix
- `.gitignore` excludes `.dev.vars` (Cloudflare Workers' local env file) and `*.local`, confirming the intended pattern for local secrets is Wrangler's `.dev.vars`, not `.env`
- Currently no environment variables appear to be consumed anywhere in `src/` (only `import.meta.env.DEV` is referenced, in `src/router.tsx`)

**Build:**
- `vite.config.ts` - main build config; path alias `@` → `./src`; dev server on `host: "::"`, `port: 8080`
- `tsconfig.json` - `target: ES2022`, `moduleResolution: Bundler`, `strict: true`, JSX `react-jsx`, path alias `@/*` → `./src/*`
- `wrangler.jsonc` - Cloudflare Worker deployment config (name `tanstack-start-app`, `nodejs_compat`)
- `eslint.config.js` - flat ESLint config; ignores `dist`, `.output`, `.vinxi`

## Platform Requirements

**Development:**
- Node.js (any recent LTS; project tested with v25.9.0 locally)
- Bun (for lockfile-accurate installs) or npm (stale `package-lock.json` fallback)
- `bun dev` / `npm run dev` → `vite dev` on port 8080
- Cloudflare's `workerd` runtime is NOT used in dev — the Cloudflare plugin is skipped for `vite dev`, so local dev runs on Node/Vite's own server, not a Workers-accurate environment

**Production:**
- Deployment target: **Cloudflare Workers** (`wrangler.jsonc`, `@cloudflare/vite-plugin`)
- Build command: `vite build` (or `build:dev` for a development-mode build) produces a Worker-compatible SSR bundle plus static assets in `dist/`
- No `wrangler deploy` script is defined in `package.json` — deployment likely happens via Wrangler CLI directly or an external CI/dashboard (Cloudflare Pages/Workers) outside this repo's script set

---

*Stack analysis: 2026-08-04*
