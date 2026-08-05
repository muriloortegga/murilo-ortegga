# Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies - Research

**Researched:** 2026-08-05
**Domain:** React 19 + TanStack Start SSR home page restructure — hero compositing, card-based case study activation, CTA hierarchy — no new dependencies
**Confidence:** HIGH (all findings are direct codebase inspection; no external library research was needed — this phase reuses existing native CSS/Tailwind/lucide-react capabilities only)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** The 5th case is **Kapyi** (agência criativa, 2,5 anos, liderança criativa/branding), not Milgrows. User chose this explicitly despite Milgrows having a ready quantifiable metric (+11.000 seguidores) — Kapyi better represents senior/leadership-level experience relevant to the recruiter audience.
- **D-02:** Kapyi has no quantifiable metric on record. Per user's explicit choice, use a **qualitative result line**, sourced only from what already exists on `src/routes/kapyi.tsx` (2.5 anos de liderança criativa, posicionamento premium sustentado para marcas de nichos distintos — engenharia, educação, clínicas, tech). Do NOT invent a number or fabricate a metric for Kapyi under any circumstance.
- **Final 5 cases, confirmed:** NaTrave (Branding & UX/UI), Symplice (Naming & ID Visual), Maxi (Social Media & OOH), Solid+ (Direção & ID Visual, mercado internacional), Kapyi (Direção Criativa & Branding, agência).

### Claude's Discretion
- **Hero headline copy (HERO-01):** User did not discuss this now (declined when offered). Draft 2-3 headline options during planning/execution — line 1 states hireable role in standard market terminology (e.g. "Branding & Social Media Designer" / "Diretor de Arte & Social Media" — avoid invented titles), line 2 states a delivered result. Present drafts to the user at the plan-review or execution checkpoint rather than shipping unreviewed marketing copy silently.
- **Photo-on-dark-canvas compositing (open item from `01-HERO-PHOTO.md` §7):** User did not discuss this now. `01-HERO-PHOTO.md` names three options (feathered/gradient mask, hard-edge card, cutout/matte) without pre-judging. Planner/executor should pick a treatment consistent with the site's "dark mode, editorial, minimalist, premium" aesthetic (PROJECT.md constraint) — a gradient/mask blend is the safer default to avoid a jarring white rectangle on a dark page, but this is not locked; flag the choice in the plan for visibility rather than deciding silently. **See Pitfall 0 below — this premise needs correction before the planner acts on it.**
- **Case narrative content for the other 4 cases (NaTrave, Symplice, Maxi, Solid+):** Real content already exists and must be used as-is, condensed — NEVER fabricate a metric, client name, or outcome not already published on that project's own page. NaTrave has `followers={2250}`; Symplice/Maxi/Solid+ have no follower metric — use qualitative framing condensed from their existing `BrandHeader` `description` copy.
- **`sizes` attribute and hero container/layout dimensions:** Explicitly left open by `01-HERO-PHOTO.md` §6 — this phase's UI-SPEC (via `/gsd:ui-phase`, `ui_hint: yes` in ROADMAP) resolves it, not this research.

### Deferred Ideas (OUT OF SCOPE)
- Exact hero headline copy — not decided, present drafts back to user for approval.
- Photo-on-dark-canvas compositing choice — not decided (and the "dark canvas" framing itself needs correcting, see below).
- Full case-content sourcing/writing pass for NaTrave, Symplice, Maxi, Solid+ — condense only from what's already published on each project's own page, never invent.
- Skills, methods reframe, social proof context, final contact block — all Phase 3.
- Any page other than home (`/sobre`, `/trabalho`, `/metodos`, `/contato`, individual project pages) — untouched, only linked from home.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Headline dupla — linha 1 papel contratável, linha 2 resultado entregue | Discretion item; see Common Pitfalls #2 (Middle-Ground Messaging) and Code Examples for structure precedent already in `index.tsx` |
| HERO-02 | Foto/presença visual em destaque (não grayscale/baixa opacidade como `/sobre`) | Corrected finding on actual site background color (Pitfall 0) + concrete `mask-image` compositing technique already precedented in `.hero-gallery` (styles.css) |
| HERO-03 | Cluster CTA primário — LinkedIn + e-mail + CV, hierarquia dominante | Existing `.btn-hero-primary`/`.btn-hero-secondary` classes, existing correct LinkedIn URL/CV path from Phase 1, `lucide-react` `Linkedin`/`Mail`/`Download` icons confirmed installed |
| HERO-04 | CTA secundário — "Ver Portfolio completo" mantém acesso a `/trabalho` | Already exists in current hero (`<Link to="/trabalho" className="btn btn-hero-primary">`) — needs demotion to `btn-hero-secondary`, not new build |
| CASE-01 | 5 cases com narrativa Problema→Ação→Resultado | `projects` array + `ProjectCard` component activation plan; content sourced from each project route (see Code Examples) |
| CASE-02 | Resultado visível sem clique | Card layout restructure — P→A→R as visible text block, not hidden behind hover/click |
| CASE-03 | Demais projetos continuam acessíveis via `/trabalho` | Already satisfied — `/trabalho` (`src/routes/trabalho.tsx`) already lists all 11+ projects including the 5 featured ones; no change needed there |
| ANTI-02 | Sem saudação genérica no hero | Current hero headline (`"Trabalho para transformar marcas comuns..."`) is already non-generic but agency-voiced — reframe per HERO-01, do not introduce "Olá, sou o Murilo" |
| ANTI-03 | Não replicar lista completa de projetos na home | Card grid caps at 5 — confirmed by D-01 final list; do not add more |
| ANTI-04 | WhatsApp não é CTA dominante/primeiro no hero | Current hero has zero WhatsApp CTAs already (confirmed by direct read of `index.tsx` hero JSX) — this requirement is about NOT introducing one, not removing one |
| ANTI-05 | Sem animação/vídeo pesado novo no hero | Reuse existing `scroll-reveal`/`anim-fade-in`/`useScrollReveal` patterns; no new Framer Motion `motion.div` sequences, no video |
</phase_requirements>

## Summary

This phase is **wiring and restructuring, not new engineering**. Every capability the requirements ask for — responsive hero image, CTA button hierarchy, case-study cards — already has either a shipped asset (Phase 1's hero exports), an existing but unused component (`ProjectCard`, `projects` array in `src/routes/index.tsx`), or an established CSS pattern (`.btn-hero-primary`/`.btn-hero-secondary`, `.scroll-reveal`, `mask-image` feathering already used in `.hero-gallery`) elsewhere in the same file or `styles.css`. No new npm package is needed anywhere in this phase.

The single most important correction this research makes to the inherited premise: **the site is not literally dark-mode.** `:root` in `src/styles.css` defines `--background: #f4f4f4` (near-white/light gray) and `--foreground: #252422` (near-black) — this is a **light-background, dark-text** design system by default. No `dark` class is ever applied to `<html>` (confirmed by reading `src/routes/__root.tsx`), and there is no `prefers-color-scheme` toggle. What *reads* as "dark editorial" on this site is a handful of individual `<section>` blocks locally inverted via `bg-foreground text-background` utility classes (e.g., the "Positioning" section in `index.tsx`, most of `evidive.tsx`) — not a site-wide dark theme. Since the hero section in `index.tsx` currently carries no background override, it renders on the actual light `#f4f4f4` body background — and the hero photo's own backdrop (`hero-bg.jpg`, per `01-HERO-PHOTO.md` §1) is described as "near-white seamless." This means the "jarring white rectangle on a dark page" risk named in CONTEXT.md's Claude's Discretion section is **overstated relative to the real color values** — the actual compositing problem is closer to "near-white photo backdrop against a near-white-but-not-identical page background," a much smaller color-matching problem than a dark-canvas problem. See Pitfall 0 for full detail and a corrected recommendation.

**Primary recommendation:** Activate the existing `projects`/`ProjectCard` code (don't rewrite it — extend its shape with `problem`/`action`/`result` fields and restructure the caption into a visible text block), restyle the existing hero CTA row using the existing `.btn-hero-primary`/`.btn-hero-secondary` classes with a LinkedIn/E-mail/CV cluster as primary and "Ver Portfolio" demoted to secondary, and composite the hero photo with a subtle `mask-image` edge feather (following the exact technique already used in `.hero-gallery`) rather than assuming a high-contrast dark-canvas treatment is required.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero photo responsive delivery (`<picture>`, AVIF/JPEG, `sizes`) | Browser / Client (rendering) | Frontend Server (SSR, initial markup) | Static `<picture>` markup is SSR'd by TanStack Start then hydrated; no data fetching involved — this is a markup/CSS concern, not a data-layer one |
| Photo-to-background edge compositing (mask/gradient/card) | Browser / Client (CSS) | — | Pure CSS (`mask-image`, `border-radius`, gradient overlay) — no JS needed, same tier as existing `.hero-gallery` mask precedent |
| CTA hierarchy (LinkedIn/E-mail/CV cluster vs. "Ver Portfolio") | Browser / Client (CSS class application) | Frontend Server (SSR renders the links) | Plain `<a>`/`<Link>` elements styled via existing `.btn-hero-*` classes; no client-only interactivity required |
| Case study data (`projects` array → 5 cards) | Frontend Server (SSR, static in-file data) | Browser / Client (scroll-reveal animation, `IntersectionObserver`) | Data is hardcoded TS (no backend/API per project architecture) rendered server-side; `ProjectCard`'s `IntersectionObserver` reveal is a client-only enhancement layered on top |
| Case card → individual project route linking | Frontend Server (TanStack Router `<Link>`) | — | Pure client-side routing via already-registered routes; no new route files needed (`/natrave`, `/symplice`, `/maxi`, `/solid`, `/kapyi` all exist) |
| Scroll-triggered reveal animation on new sections | Browser / Client (existing `useScrollReveal` hook + IntersectionObserver) | — | Established sitewide pattern (`src/hooks/use-scroll-reveal.tsx`); reuse, don't reinvent |

## Standard Stack

### Core
No new libraries. This phase's "stack" is 100% reuse of what's already installed and already used elsewhere in this exact codebase.

| Library | Version | Purpose | Why Standard (in this codebase) |
|---------|---------|---------|--------------|
| `lucide-react` | 0.575.0 (installed; `1.28.0` is latest on npm, upgrade NOT recommended this phase — scope discipline) | `Linkedin`, `Mail`, `Download` icons for the CTA cluster | [VERIFIED: local `node_modules/lucide-react/dist/esm/icons/`] — `linkedin.js`, `mail.js`, `download.js` all present in the installed package; no install step needed |
| Tailwind CSS 4.2 utility classes + hand-written `@layer components` CSS | 4.2.1 (installed) | Layout, spacing, the `mask-image` feather technique | [VERIFIED: `src/styles.css`] — `mask-image` is already used at `.hero-gallery` (line ~509); Tailwind v4 has no built-in `mask-*` utility set, so this codebase's convention is a hand-written CSS class in `@layer components`, not an arbitrary Tailwind utility — follow that convention, don't introduce `tailwindcss-mask` or similar |
| `@tanstack/react-router` `<Link>` | 1.162.x (installed) | Case card → project route links, "Ver Portfolio" link | [VERIFIED: `src/routes/index.tsx`] already used throughout |
| Native `<picture>`/`srcset`/`sizes` | Browser API | Hero responsive image delivery | [CITED: `01-HERO-PHOTO.md` §5] markup sketch already provided by Phase 1 handoff — this phase fills in `sizes` and wraps it in the compositing treatment |
| `useScrollReveal` hook | Project-local (`src/hooks/use-scroll-reveal.tsx`) | Scroll-triggered fade/translate on new case-card section | [VERIFIED: `src/routes/index.tsx:244`] already wired at the top of `HomePage`; new sections just need the `scroll-reveal` className |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `framer-motion` | 12.38 (installed) | NOT needed for this phase's hero — `useReducedMotion()` only if a new entrance animation is added beyond the existing `anim-fade-in`/`scroll-reveal` CSS classes | Only if the planner decides a JS-driven motion sequence is needed for the hero photo entrance; default should be the existing CSS-only `anim-fade-in` pattern already used on the current hero `<h1>` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-written `mask-image` CSS class (existing convention) | Tailwind v4 arbitrary value `mask-[linear-gradient(...)]` inline in JSX | Arbitrary values work in Tailwind v4 but break from this codebase's established pattern of putting non-trivial visual effects in `@layer components` (see `.hero-gallery`, `.btn-hero-primary`) — inconsistent with `CONVENTIONS.md`'s documented styling approach |
| Extending existing `projects` array + `ProjectCard` | Writing a brand-new `FeaturedCases` component from scratch | CONTEXT.md and `ARCHITECTURE.md` (project research) both explicitly instruct activation/adaptation of the existing dead code, not a rewrite — the component already has scroll-reveal, `IntersectionObserver`, and `ProjectMedia` wiring correct |
| Reusing `.btn-hero-primary`/`.btn-hero-secondary` | New `.btn-cta-cluster` component with different visual treatment | `PITFALLS.md` (Pitfall 7) explicitly warns against introducing new colors/components for "conversion" purposes — express hierarchy through order/repetition/type scale using existing tokens, not new visual language |

**Installation:**
```bash
# Nothing to install — this phase adds zero new dependencies.
```

**Version verification:** `lucide-react` confirmed installed at `^0.575.0` in `package.json`; icon files verified present on disk in `node_modules`. No registry lookup needed since no new package is being added — see Package Legitimacy Audit below.

## Package Legitimacy Audit

**Not applicable — this phase installs zero external packages.** All capabilities (icons, CSS masking, routing, scroll-reveal) are satisfied by dependencies already present in `package.json` and already used elsewhere in the codebase, verified by direct filesystem inspection (`node_modules/lucide-react/dist/esm/icons/{linkedin,mail,download}.js` all present). The Package Legitimacy Gate protocol (slopcheck, registry verification) is skipped because there is nothing to audit.

**Packages removed due to slopcheck [SLOP] verdict:** none (N/A — no packages evaluated)
**Packages flagged as suspicious [SUS]:** none (N/A — no packages evaluated)

## Architecture Patterns

### System Architecture Diagram

```
                         ┌─────────────────────────────────────────┐
                         │   src/routes/index.tsx (HomePage)        │
                         │   SSR'd by TanStack Start, hydrated      │
                         └───────────────────┬───────────────────────┘
                                              │
              ┌───────────────────────────────┼────────────────────────────────┐
              ▼                               ▼                                ▼
   ┌─────────────────────┐      ┌─────────────────────────┐      ┌──────────────────────────┐
   │  HERO SECTION        │      │  CASE STUDIES SECTION    │      │  (unchanged below)        │
   │  (restructured)       │      │  (NEW — activates dead   │      │  Brand Marquee,           │
   │                       │      │   code)                  │      │  Positioning, Methods     │
   │  <picture> element    │      │  projects[] (5 items,    │      │  (Phase 3 territory)      │
   │  ├─ AVIF source       │      │  extended w/              │      │                            │
   │  │  (480/960/1440w)   │      │  problem/action/result)   │      └──────────────────────────┘
   │  ├─ JPEG <img>        │      │        │                  │
   │  │  fallback           │      │        ▼                  │
   │  │  loading="eager"    │      │  ProjectCard × 5           │
   │  │  fetchPriority=     │      │  (adapted, not rewritten) │
   │  │  "high"              │      │  ├─ ProjectMedia (image)  │
   │  └─ mask-image feather │      │  ├─ P→A→R text block       │
   │     edge treatment      │      │  │  (NEW — visible,        │
   │                          │      │  │   no click required)   │
   │  Headline (2 lines)      │      │  └─ <Link to={project.to}>│
   │  ├─ Line 1: role          │      │     → existing project    │
   │  └─ Line 2: result        │      │       routes (all exist)  │
   │                            │      └──────────────┬─────────────┘
   │  CTA cluster                │                     │
   │  ├─ Primary: LinkedIn        │                     ▼
   │  │  + E-mail + CV            │           /natrave /symplice /maxi
   │  │  (btn-hero-primary)       │           /solid /kapyi (untouched)
   │  └─ Secondary: "Ver           │
   │     Portfolio" → /trabalho    │──────────────────────────────────┐
   │     (btn-hero-secondary)      │                                    ▼
   └────────────────────────────────┘                         /trabalho (untouched,
                                                                 already lists all 11+
                                                                 projects — CASE-03
                                                                 satisfied automatically)
```

A recruiter's primary path: lands on `/` → reads headline + sees photo (0-10s) → clicks LinkedIn/e-mail/CV directly from hero (terminal action, no further routing) **or** scrolls to case cards → reads P→A→R inline (10-60s) → optionally clicks into a case route for depth, or clicks "Ver Portfolio" to reach `/trabalho` for the full list.

### Recommended Project Structure
No new files required. All changes are inside the existing `src/routes/index.tsx`:
```
src/routes/index.tsx
├── projects[]           # EXTEND: add problem/action/result fields, reduce to confirmed 5, reorder to D-01 list
├── ProjectCard()         # ADAPT: restructure figcaption into a visible P→A→R text block
├── HeroGallery()         # LIKELY REMOVED or demoted — see Open Questions (hero photo replaces gallery as primary visual, but gallery itself isn't "deleted content," see Pitfall 0a)
└── HomePage()            # RESTRUCTURE: hero JSX (photo + headline + CTA cluster), insert <CaseStudiesSection> after Brand Marquee, before Positioning
```
No new component file is strictly required — `ProjectCard` already lives in `index.tsx` and is the established pattern for "component private to this route" (see `CONVENTIONS.md`: "Local/private helper components inside a route file are plain `function ComponentName()` without export"). If the hero `<picture>` markup grows complex, a new `src/components/hero-portrait.tsx` (kebab-case, per naming convention) is a reasonable extraction — but starting inline in `index.tsx` and extracting later if needed avoids premature componentization.

### Pattern 1: Native `<picture>` with Feathered Mask Edge (Hero Photo)

**What:** Wrap the Phase-1-exported `<picture>` element (AVIF + JPEG, 3 widths each) in a container that applies a CSS `mask-image` gradient to feather one or more edges into the page background, rather than a hard rectangular edge.
**When to use:** The hero photo specifically — this is the one new foreground portrait in the codebase (per `01-HERO-PHOTO.md` §7, "no existing foreground-portrait precedent").
**Example (follows the exact technique already used for `.hero-gallery` in `styles.css`):**
```css
/* Source pattern: src/styles.css, existing .hero-gallery rule (verbatim precedent) */
.hero-gallery {
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

/* New rule, same technique, for the hero portrait — add to @layer components */
.hero-portrait-mask {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}
```
```tsx
{/* src/routes/index.tsx — inside the hero section's right/photo column */}
<div className="hero-portrait-mask relative">
  <picture>
    <source
      type="image/avif"
      srcSet="
        /assets/home/hero/murilo-hero-480.avif 480w,
        /assets/home/hero/murilo-hero-960.avif 960w,
        /assets/home/hero/murilo-hero-1440.avif 1440w
      "
      sizes="(min-width: 1024px) 40vw, 90vw" /* placeholder — UI-SPEC resolves final value */
    />
    <img
      src="/assets/home/hero/murilo-hero-960.jpg"
      srcSet="
        /assets/home/hero/murilo-hero-480.jpg 480w,
        /assets/home/hero/murilo-hero-960.jpg 960w,
        /assets/home/hero/murilo-hero-1440.jpg 1440w
      "
      sizes="(min-width: 1024px) 40vw, 90vw"
      alt="Murilo Ortega"
      width={960}
      height={1200}
      loading="eager"
      fetchPriority="high"
      className="w-full h-auto object-cover"
    />
  </picture>
</div>
```
**Note:** Given the corrected finding that the hero section background is `#f4f4f4` (near-white) and the photo backdrop is also near-white, this feather is a *refinement* (softening a barely-visible seam), not a rescue from a "dark canvas vs. light photo" clash. A hard-edge card (`rounded-2xl border`, no mask at all — following the exact pattern already used for `ProjectMedia` wraps: `"media-wrap aspect-[4/3] rounded-2xl overflow-hidden border border-border/5"`) is an equally valid, lower-risk alternative and should be presented to the user alongside the mask option, not silently chosen. See Pitfall 0.

### Pattern 2: Card-Based Case Study with Inline Outcome (No Click Required)

**What:** Extend the existing `projects` array shape with `problem`/`action`/`result` string fields; restructure `ProjectCard`'s `<figcaption>` from a name+category label into a name+category label **plus** a 3-line P→A→R block, styled with the existing `.label-upper`/monospace-tag conventions already in `styles.css` (`tag-mono`, `site-card-label`) rather than inventing new typographic treatment.
**When to use:** The 5 featured case cards only (not `/trabalho`'s full list, which stays as-is).
**Example:**
```tsx
// Extend the existing projects array shape (src/routes/index.tsx) — adapt, don't replace
const projects = [
  {
    name: "NaTrave — O Ecossistema do Futebol Amador",
    category: "Branding & UX/UI · 2024",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
    problem: "Plataforma social sem identidade nem retenção de usuários.",
    action: "Direção de arte, sistema de conteúdo e social media completos.",
    result: "2.250 seguidores conquistados organicamente.", // sourced from natrave.tsx PerformanceHero followers={2250} — real, not invented
  },
  // Symplice, Maxi, Solid+: qualitative result lines, condensed from each
  // project's existing BrandHeader `description` prop (see Code Examples below)
  // Kapyi: qualitative only per D-02 — "2,5 anos de liderança criativa,
  // posicionamento premium sustentado para marcas de nichos distintos."
];

// ProjectCard figcaption restructure — P→A→R visible without click
<figcaption className="mt-6">
  <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1 block">
    {project.category}
  </span>
  <span className="font-bold text-lg leading-tight block tracking-tight mb-3">
    {project.name}
  </span>
  <dl className="text-sm text-secondary space-y-1">
    <div><dt className="inline font-bold text-foreground">Problema: </dt><dd className="inline">{project.problem}</dd></div>
    <div><dt className="inline font-bold text-foreground">Ação: </dt><dd className="inline">{project.action}</dd></div>
    <div><dt className="inline font-bold text-foreground">Resultado: </dt><dd className="inline">{project.result}</dd></div>
  </dl>
</figcaption>
```
**Trade-off:** A `<dl>` (definition list) is semantically correct for label/value pairs and requires zero new CSS classes (relies on existing `text-secondary`, `font-bold`, `text-foreground` Tailwind utilities already used throughout `index.tsx`) — but the planner should verify the resulting card height doesn't create excessive vertical rhythm variance across the 5-card grid (NaTrave has a real metric — short; Kapyi is qualitative — potentially longer sentence). Consider a fixed-height truncation or a consistent max-line-count per field to keep the grid visually even (an "inverted pyramid" one-sentence-per-field discipline, per `ARCHITECTURE.md` Pattern 1).

### Pattern 3: CTA Cluster Hierarchy Using Existing Button Classes

**What:** Group LinkedIn + E-mail + CV as one visually-primary cluster (`.btn-hero-primary` on each, or one dominant + two compact icon buttons — see options below), with "Ver Portfolio" demoted to `.btn-hero-secondary`. WhatsApp is absent entirely from the hero (ANTI-04) — it is not "demoted," it simply isn't rendered here (Phase 3 owns the final contact block where it appears as secondary).
**When to use:** Hero CTA row only, this phase. (Phase 3's final CTA block will mirror this hierarchy per `CONTACT-03`, but that's out of scope here.)
**Example — Option A (equal-weight cluster, lowest layout risk):**
```tsx
<div className="mt-12 flex flex-wrap gap-4 anim-fade-in delay-500">
  {/* Primary cluster — visually grouped by proximity + identical styling */}
  <a
    href="https://www.linkedin.com/in/murilo-ortega"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-hero-primary gap-2"
  >
    <Linkedin size={16} /> LinkedIn
  </a>
  <a href="mailto:contato@muriloortega.com" className="btn btn-hero-primary gap-2">
    <Mail size={16} /> E-mail
  </a>
  <a href="/cv/CV%20MURILO%20ORTEGA%202026.pdf" download className="btn btn-hero-primary gap-2">
    <Download size={16} /> Baixar CV
  </a>
</div>
<div className="mt-4 anim-fade-in delay-500">
  {/* Secondary — visually smaller weight via btn-hero-secondary, own row */}
  <Link to="/trabalho" className="btn btn-hero-secondary">
    Ver Portfolio completo
  </Link>
</div>
```
**Example — Option B (single dominant + compact secondary icons, lower visual weight/less "kitchen sink"):**
```tsx
<div className="mt-12 flex flex-wrap items-center gap-4 anim-fade-in delay-500">
  <a href="https://www.linkedin.com/in/murilo-ortega" target="_blank" rel="noopener noreferrer" className="btn btn-hero-primary gap-2">
    <Linkedin size={16} /> Conectar no LinkedIn
  </a>
  <a href="mailto:contato@muriloortega.com" aria-label="Enviar e-mail" className="btn btn-hero-secondary !px-4">
    <Mail size={16} />
  </a>
  <a href="/cv/CV%20MURILO%20ORTEGA%202026.pdf" download aria-label="Baixar CV" className="btn btn-hero-secondary !px-4">
    <Download size={16} />
  </a>
</div>
```
Both options reuse `LinkedInURL`/CV path exactly as corrected by Phase 1 (`https://www.linkedin.com/in/murilo-ortega`, `/cv/CV%20MURILO%20ORTEGA%202026.pdf`) — do not re-derive these values, copy them verbatim from Phase 1's shipped `index.tsx` (already correct in the current file, confirmed by direct read). Option A is closer to CONTEXT.md's literal "LinkedIn + e-mail + CV com hierarquia visual dominante" (three equally weighted primary actions); Option B better serves `PITFALLS.md` Pitfall 1 (Kitchen Sink) and Pitfall 7 (aesthetic-clash) concerns about three identical large black buttons reading as heavy/generic-SaaS rather than editorial. **This is a Claude's Discretion item per CONTEXT.md — the planner should pick one and flag it, not silently decide.**

### Anti-Patterns to Avoid
- **New color/gradient/shadow for CTA "importance":** `PITFALLS.md` Pitfall 7 — express hierarchy via `.btn-hero-primary` (filled) vs. `.btn-hero-secondary` (outlined) only, both already in the design system. Do not add a third visual weight (e.g., a bright accent color) "to make LinkedIn pop more."
- **Duplicating `/sobre`'s grayscale/opacity treatment on the hero photo:** Explicitly rejected by `01-HERO-PHOTO.md` §2 (D-05) — the hero portrait is full-color and foreground-prominent, never `grayscale opacity-30`.
- **Rewriting `ProjectCard` from scratch:** CONTEXT.md and `ARCHITECTURE.md` both direct activation/adaptation of the existing component — it already has correct `IntersectionObserver` reveal, `ProjectMedia` polymorphic rendering, and hover-arrow micro-interaction wired.
- **Compressing full project-page content into home cards:** `ARCHITECTURE.md` Anti-Pattern 1 — each P→A→R field must stay to 1 short sentence; the card's job is "enough to justify a click," not "enough to replace it."

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive image format/width negotiation | A custom `srcSet` builder function or a new `<ResponsiveImage>` abstraction | Native `<picture>`/`<source>`/`srcSet`/`sizes` (already sketched in `01-HERO-PHOTO.md` §5) | Zero JS needed, zero new dependency, browser handles selection natively; this codebase has zero image-processing abstraction layer by design (`ARCHITECTURE.md`: "no database, no fetch-based data loader... all content hardcoded") |
| Soft-edge photo compositing | A canvas-based cutout/matte generation step, or a new masking library | CSS `mask-image` (already precedented in `.hero-gallery`) | This exact technique already exists in the codebase for exactly this purpose (feathering an image edge into the page); reuse the pattern instead of introducing a build-time image-matting tool, which would violate the "stack is fixed" constraint |
| Scroll-triggered reveal for new case-card section | A new `IntersectionObserver` wired directly in `HomePage`, or a Framer Motion `whileInView` sequence | Existing `useScrollReveal` hook + `.scroll-reveal`/`.is-visible` CSS classes, already active at the top of `HomePage` (`const revealRef = useScrollReveal<HTMLDivElement>()`) | One reveal mechanism sitewide avoids two competing observer instances doing redundant work on the same scroll, per `STACK.md` §5 |
| Icon set for LinkedIn/e-mail/CV CTAs | A custom SVG icon set or a new icon package | `lucide-react` (`Linkedin`, `Mail`, `Download`) — already installed, already used for `ArrowRight`/`ChevronRight` in this same file | Confirmed present on disk; adding a second icon library for 3 icons is pure scope creep |

**Key insight:** Every "don't hand-roll" item in this phase is really "don't re-solve a problem this exact codebase already solved once, in this exact file or its sibling `styles.css`." The research risk here isn't missing an external library — it's failing to notice the precedent already sitting three sections above the code you're about to write.

## Common Pitfalls

### Pitfall 0: Acting on the "Dark Canvas" Premise Without Checking Actual Color Values

**What goes wrong:** `01-HERO-PHOTO.md` §7 and CONTEXT.md both frame the hero photo compositing problem as "light portrait on a dark canvas" / "jarring white rectangle on a dark page," inherited from `PROJECT.md`'s "Dark mode, editorial" aesthetic description. If the planner takes this literally, it may spec a strong dark-vignette or heavy gradient treatment to fight a contrast problem that doesn't actually exist at the color-value level.
**Why it happens:** `PROJECT.md`/`CLAUDE.md` describe the site's *aesthetic* as "dark mode, editorial" — which is true of individual sections (`bg-foreground text-background` bands like the "Positioning" section) — but the actual CSS custom properties in `:root` (`src/styles.css`) are `--background: #f4f4f4` (near-white) and `--foreground: #252422` (near-black), and no `.dark` class or `prefers-color-scheme` toggle exists anywhere (verified: `grep -rn "className=\"dark\"" src/` and `grep -n "prefers-color-scheme" src/styles.css` both return nothing). The hero section in `index.tsx` today carries no background override, so it renders on the literal `#f4f4f4` body background — the same near-white tone the hero photo's studio backdrop already has (per `01-HERO-PHOTO.md` §1: "clean near-white seamless background").
**How to avoid:** Before speccing the compositing treatment, confirm in the browser/DevTools (or by reading `styles.css` + the final hero JSX) what color the hero section's actual background renders as. If it stays the default `#f4f4f4`, a heavy dark-canvas vignette is solving the wrong problem — a light feather (or no mask at all, just a clean contained card) is more appropriate. If the planner/executor instead chooses to give the hero section a `bg-foreground text-background` inversion (making it genuinely dark, consistent with the "Positioning" section elsewhere on the page), then the dark-canvas framing becomes accurate and the heavier mask treatment is justified — but that's a section-background decision that must be made explicitly, not assumed.
**Warning signs:** A plan/spec that says "fade the white background into black" without first stating what the hero section's own background color will be.
**Phase to address:** This phase, hero compositing task — first decision point, before any mask CSS is written.

### Pitfall 1: Reintroducing Broken/Unconfirmed CTA Values

**What goes wrong:** Phase 1 already fixed and manually verified the LinkedIn URL (`https://www.linkedin.com/in/murilo-ortega`) and CV path (`/cv/CV%20MURILO%20ORTEGA%202026.pdf`) in the current `index.tsx`. If the hero is rebuilt from scratch (rather than edited in place), it's easy to accidentally retype an old/wrong value from memory or from a stale reference.
**Why it happens:** Large JSX rewrites sometimes copy structure from an older mental model instead of the file's current, already-corrected state.
**How to avoid:** Copy the LinkedIn URL and CV `href` verbatim from the current `src/routes/index.tsx` (read it fresh, don't retype from `PROJECT.md` or memory). Both values are also independently confirmed correct in `src/components/Header.tsx` and `src/routes/contato.tsx`.
**Warning signs:** Any `href` value that doesn't exact-match `https://www.linkedin.com/in/murilo-ortega` or `/cv/CV%20MURILO%20ORTEGA%202026.pdf`.

### Pitfall 2: Large Thumbnail Images on 5 Cards + Hero Photo, All Above/Near the Fold

**What goes wrong:** The existing project thumbnails intended for card images are large: `natrave.jpg` 2.2MB, `symplice.jpg` 1.8MB, `maxi.jpg` 2.6MB, `solid.jpg` 1.9MB, `kapyi.jpg` 0.83MB [VERIFIED: `ls -la` on each file in `public/assets/projects/thumbnails/`]. `solid-full.png` (used by the *current*, soon-to-be-replaced `projects` array entry for Solid+) is 8.2MB — do not reuse that path for the card image. Combined with the new hero photo (already optimized to <300KB per tier by Phase 1), stacking 5×~2MB card images just below the fold is a real page-weight risk, echoing `PITFALLS.md`'s "Performance Traps" table.
**Why it happens:** These thumbnails were sized for their own project-page hero use, not for a dense 5-card home grid.
**How to avoid:** Use `loading="lazy"` (already the `ProjectMedia` default for `<img>` — confirmed in `project-media.tsx`) for all 5 case-card images since they're below the fold; keep `loading="eager"`/`fetchPriority="high"` reserved for the hero photo only. Do not introduce a new image-optimization step (out of scope, no image pipeline allowed) — if the weight proves unacceptable during QA, that's a Phase 4 finding to route to tech debt, not something to silently "fix" with a new dependency in this phase.
**Warning signs:** Home page Lighthouse/PageSpeed score regresses noticeably after the 5 cards are added; `solid-full.png` (8.2MB) accidentally reused instead of `thumbnails/solid.jpg` (1.9MB).

### Pitfall 3: `HeroGallery` Removal Ambiguity

**What goes wrong:** The current hero's right column is `HeroGallery()` — a vertically-scrolling marquee of 9 project images (`galleryImages`/`galleryAlts` arrays, lines ~125-182 of `index.tsx`). HERO-02 requires the hero photo to be "em destaque" (prominent), which structurally means the photo replaces the gallery in the hero's visual real estate. But the project's non-negotiable constraint is that no existing content/asset may be deleted — only reorganized.
**Why it happens:** "Replace the gallery with the photo in the hero" can be misread as "delete the gallery," when the correct action is "move the gallery, don't delete it" or "repurpose its images elsewhere," per the `galleryImages` array's actual images being real project work already used verbatim in `/trabalho` and case pages.
**How to avoid:** The `HeroGallery()` component, `galleryImages`, and `galleryAlts` arrays can be removed from the hero's JSX render (the *position* changes) but the underlying image assets themselves are untouched (they're referenced elsewhere via `/trabalho` and project pages already) — this satisfies "no content deleted" at the asset level even though the *hero gallery UI pattern* itself goes away. If the planner wants to be maximally safe, the gallery component code can be left defined-but-unused in the file (dead code, matching how `projects`/`ProjectCard` already exist as dead code today) rather than deleted, though this adds to file bloat. Flag this decision explicitly in the plan rather than silently deleting ~60 lines of gallery code.
**Warning signs:** A diff that removes `HeroGallery`, `galleryImages`, `galleryAlts` with no note in the plan about why that's compliant with the non-deletion constraint.

### Pitfall 4: Case Card Copy Drifting Into Fabrication

**What goes wrong:** Per `PITFALLS.md` Pitfall 5 and CONTEXT.md's explicit repeated warning, the temptation when writing a "Resultado" line for Symplice/Maxi/Solid+ (which have no numeric metric) is to invent a plausible-sounding percentage or figure to match NaTrave's `2.250 seguidores` pattern.
**Why it happens:** A row of 5 cards where 1 has a hard number and 4 don't reads as visually/rhetorically inconsistent, creating pressure to "fill in" the gap.
**How to avoid:** Source every word of `problem`/`action`/`result` for Symplice, Maxi, Solid+ from the exact copy already published in `src/routes/symplice.tsx`, `maxi.tsx`, `solid.tsx` (their `BrandHeader` `description` props, confirmed content: Symplice = "simplicidade estratégica" positioning; Maxi = "instituição de ensino... excelência acadêmica"; Solid+ = "solidez, confiança e inovação para o mercado financeiro digital"). For Kapyi, source only from `kapyi.tsx`'s `AbordagemEstrategica` component and `BrandHeader` description, per D-02. A qualitative result line is an accepted, correct outcome for these 4 — not a placeholder to eventually replace with a number.
**Warning signs:** Any card's result line contains a number, percentage, or specific client-facing metric not traceable to a `grep` hit in that project's own route file.

### Pitfall 5: `HERO-04`'s "Ver Portfolio" Wording Drift

**What goes wrong:** The current hero already has a `<Link to="/trabalho">Ver Portfolio</Link>` — HERO-04 asks for "Ver Portfolio completo." A careless edit might leave the existing shorter label untouched while restyling everything else, technically under-delivering the requirement's exact wording intent.
**Why it happens:** Requirement wording and current code wording are subtly different ("Ver Portfolio" vs. "Ver Portfolio completo"); easy to treat the existing link as "already done" during a hierarchy-focused pass.
**How to avoid:** Update the label text to match HERO-04's intent (communicating "this leads to the full/complete portfolio, distinct from the 5 featured cases you're about to see"), not just the CSS class.
**Warning signs:** Plan verification checks CSS class change but not label copy change.

## Code Examples

### Sourced case content for the 4 non-NaTrave cases (verbatim from existing route files — do not paraphrase further)

```
Symplice (src/routes/symplice.tsx BrandHeader):
  phrase: "Clareza Digital"
  description: "Para marcas que operam na complexidade, a Symplice entrega
    simplicidade estratégica. Uma identidade visual limpa, direta e focada
    na experiência do usuário."
  niche: "Branding & Design System"

Maxi (src/routes/maxi.tsx BrandHeader):
  phrase: "Tradição que Evolui"
  description: "O Colégio Maxi é uma instituição de ensino com trajetória
    consolidada, focada em excelência acadêmica, desenvolvimento humano e
    aprovações em vestibulares."
  niche: "Educação & Performance"

Solid+ (src/routes/solid.tsx BrandHeader):
  phrase: "Estrutura Robusta"
  description: "Fintech Identity & Systems. Design que transmite solidez,
    confiança e inovação para o mercado financeiro digital."
  niche: "Fintech & Digital Systems"

Kapyi (src/routes/kapyi.tsx BrandHeader + AbordagemEstrategica):
  phrase: "Estética e Estratégia"
  description: "Fugindo de fórmulas prontas. Uma atuação de 2,5 anos unindo
    branding e direção criativa para posicionar marcas de forma premium no
    ambiente online."
  stats: "2.5 Anos" (Tempo de Atuação), "Branding Digital" (Foco Principal)
  niche: "Agência Criativa"
```

### Existing thumbnail paths, verified present on disk
```
NaTrave:  /assets/projects/thumbnails/natrave.jpg          (2.2MB)
Symplice: /assets/projects/thumbnails/symplice.jpg          (1.8MB)
Maxi:     /assets/projects/thumbnails/social/maxi.jpg        (2.6MB)
Solid+:   /assets/projects/thumbnails/solid.jpg              (1.9MB)
          (NOT /solid-full.png — that's 8.2MB, used only on the /solid
           page itself, do not reuse for the home card)
Kapyi:    /assets/projects/thumbnails/social/kapyi.jpg        (0.83MB)
```

### `nav-context.ts` already correctly wired — no change needed
```ts
// src/lib/nav-context.ts — confirmed present for all 5 confirmed cases:
"/natrave": projectContext([SOCIAL, ID_VISUAL, WEB]),
"/maxi": projectContext([SOCIAL, OOH]),
"/kapyi": projectContext([SOCIAL]),
"/symplice": projectContext([ID_VISUAL]),
"/solid": projectContext([ID_VISUAL]),
```
This confirms `ContextNav`'s "back to category" breadcrumb will work correctly for all 5 case pages without any change in this phase — one less integration risk than initially expected.

## State of the Art

| Old Approach (current `index.tsx`) | Corrected Approach (this phase) | When Changed | Impact |
|--------------------------------|----------------------------------|---------------|--------|
| Hero right column = scrolling `HeroGallery` of 9 mixed project images | Hero right column = single full-color portrait photo (Phase 1 asset) | This phase | Establishes person-first identity in the first viewport per HERO-02; gallery images remain accessible via `/trabalho` and project pages |
| Hero CTA row = `Ver Portfolio` / `Ver mais sobre mim` / `Baixar CV`, all visually equal `.btn-hero-primary`/`.btn-hero-secondary` mix with no recruiter-specific actions | LinkedIn + E-mail + CV as dominant primary cluster, "Ver Portfolio completo" secondary | This phase | Directly implements HERO-03/HERO-04 |
| `projects`/`ProjectCard` defined but never rendered in `HomePage` (confirmed dead code) | Activated as a 5-card "Case Studies" section between Brand Marquee and Positioning | This phase | Fills `ARCHITECTURE.md`'s identified "single highest-leverage build task" — the biggest content gap on the page today |

**Deprecated/outdated:** The current `projects` array's 6-item list (NaTrave, Solid+, Kmillion, Symplice, Evidive, Talk2Buy) does not match D-01's confirmed 5 (NaTrave, Symplice, Maxi, Solid+, Kapyi) — it must be redefined, not just filtered, since Maxi and Kapyi aren't in the current array at all and Kmillion/Evidive/Talk2Buy must be removed from this specific array (they remain fully accessible via `/trabalho`, satisfying CASE-03 — only this home-page featured-subset array changes).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | A light `mask-image` feather (Pattern 1) or a hard-edge contained card are both acceptable treatments, and the "dark canvas" framing from `01-HERO-PHOTO.md`/CONTEXT.md is overstated relative to actual `#f4f4f4` background values | Pitfall 0, Pattern 1 | If the user actually intends to give the hero section a true dark (`bg-foreground text-background`) background as part of this phase (not stated in CONTEXT.md, but plausible given `PROJECT.md`'s "dark mode" framing), the compositing math changes and a stronger vignette/mask may be warranted — this should be confirmed with the user or resolved explicitly in the UI-SPEC step (`ui_hint: yes` per ROADMAP), not assumed either way by this research |
| A2 | Option A vs. Option B CTA cluster layout (Pattern 3) — no single correct answer, presented as a discretion choice | Pattern 3 | If the planner picks one silently without flagging it, it ships as an unreviewed creative decision, same risk CONTEXT.md flags for headline copy |
| A3 | `HeroGallery`/`galleryImages` can be removed from the hero's rendered JSX (kept as unused dead code or fully deleted) without violating the "nothing may be deleted" constraint, since underlying image assets remain used elsewhere | Pitfall 3 | If the user interprets "no deletion" as "no code deletion, period," removing `HeroGallery()`'s JSX call requires explicit confirmation, not silent execution |
| A4 | The 8.2MB `solid-full.png` should never be used as a home-page card image (use `thumbnails/solid.jpg` at 1.9MB instead) | Pitfall 2, Code Examples | Low risk — this is a straightforward performance judgment, not a subjective call, but flagging as assumption since no explicit requirement states the file-size ceiling |

## Open Questions

1. **Should the hero section itself become a `bg-foreground text-background` (genuinely dark) band, matching the "Positioning" section's existing inversion pattern?**
   - What we know: The site's actual default background is light (`#f4f4f4`); "dark mode" as described in `PROJECT.md`/`CLAUDE.md` is achieved through localized section inversion, not a global theme.
   - What's unclear: Whether the user's mental model of "the hero should look dark" (implied by CONTEXT.md's inherited framing) means the hero section's background should be explicitly inverted this phase, or whether "dark mode, editorial" is meant at the sitewide-identity level and the hero staying light (matching its current, never-complained-about state) is fine.
   - Recommendation: Surface this explicitly at the UI-SPEC stage (`/gsd:ui-phase`, already flagged as `ui_hint: yes` for this phase) rather than the planner silently choosing a hero background color — this single decision determines which of Pattern 1's two mask-strength options (subtle feather vs. stronger vignette) is correct.

2. **Exact `sizes` attribute values and hero container width split (desktop/mobile).**
   - What we know: `01-HERO-PHOTO.md` §6 explicitly defers this to Phase 2's own layout work; three width tiers (480/960/1440) are ready.
   - What's unclear: What fraction of viewport width the photo occupies at each breakpoint — depends on the final hero grid split (currently `lg:grid-cols-2` in the existing hero).
   - Recommendation: Resolve during the UI-SPEC step; this research provides the markup shape but not the final `sizes` string.

3. **Grid layout for 5 case cards — 3+2, uniform 3-col with last row partial, or a "featured first card" asymmetric layout?**
   - What we know: `ARCHITECTURE.md` recommends 5 cards, 2-3 sentences each, scannable without scrolling excessively; no existing 5-item grid precedent exists elsewhere in the codebase to copy verbatim (the closest precedent, `/trabalho`, uses a different filterable-list pattern, not a fixed-5 grid).
   - What's unclear: Exact column count / responsive breakpoints for a 5-item grid (5 doesn't divide evenly into 2 or 3 columns without an intentional layout decision).
   - Recommendation: UI-SPEC step should resolve this; a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with the 5th card either spanning or sitting alone in its row is a reasonable default consistent with existing Tailwind grid usage patterns in `trabalho.tsx`/`MethodsSection`.

## Environment Availability

Skipped — this phase has no external tool/service/runtime dependencies beyond what's already installed and verified (`lucide-react` on disk, Tailwind CSS 4 build pipeline already working, all target project routes already exist and build). No new CLI tools, databases, or services are introduced.

## Security Domain

No `security_enforcement` key is set in `.planning/config.json` (absent = enabled per protocol), but this phase's surface area is a static marketing page with no forms, no user input, no authentication, and no new external data flow — most ASVS categories are not applicable.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth surface exists or is introduced |
| V3 Session Management | No | No sessions involved |
| V4 Access Control | No | No access-controlled resources |
| V5 Input Validation | No | No new user input; the only pre-existing `validateSearch` Zod patterns are on project routes, untouched by this phase |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Reverse-tabnabbing via `target="_blank"` on external CTA links (LinkedIn) without `rel="noopener noreferrer"` | Tampering (the opened tab could reach back via `window.opener` and redirect the origin tab to a phishing page) | Codebase already has an established, correct pattern for this — every existing `target="_blank"` link in the repo (`Header.tsx`, `contato.tsx`, `evidive.tsx`, all `metodos.*.tsx`) pairs it with `rel="noopener noreferrer"`. The new LinkedIn CTA in the hero must follow this exact pattern — verified as [VERIFIED: grep across `src/`] the sitewide convention, not optional |
| `mailto:` link exposing a plain-text email to scraping bots | Information Disclosure (low severity) | Already the accepted sitewide pattern (`contato.tsx` uses a bare `mailto:` link with no obfuscation) — this phase should stay consistent with that existing accepted risk level, not introduce new obfuscation infrastructure inconsistent with the rest of the site |

## Sources

### Primary (HIGH confidence — direct codebase inspection)
- `src/routes/index.tsx` — current hero, `projects`/`ProjectCard` dead code, `HeroGallery`, `MethodsSection`, CTA row, gallery arrays
- `src/styles.css` — `:root` color tokens, `.btn-hero-primary`/`.btn-hero-secondary`, `.hero-gallery` `mask-image` precedent, `.scroll-reveal`, `.project-card`
- `src/routes/__root.tsx` — confirmed no `dark` class ever applied to `<html>`
- `src/routes/sobre.tsx` — confirmed `grayscale opacity-30 md:opacity-50` treatment to explicitly NOT copy (per D-05)
- `src/routes/natrave.tsx`, `symplice.tsx`, `maxi.tsx`, `solid.tsx`, `kapyi.tsx` — sourced all `BrandHeader` `description`/`phrase`/`niche` copy used in case-content examples above
- `src/lib/nav-context.ts` — confirmed all 5 case routes already have `ROUTE_CONTEXT` entries
- `src/routes/trabalho.tsx` — confirmed all 11+ projects (including the 5 featured ones) already listed, satisfying CASE-03 with no change needed
- `src/components/project-media.tsx` — confirmed `loading="lazy"` default behavior for non-hero images
- `node_modules/lucide-react/dist/esm/icons/` — confirmed `linkedin.js`, `mail.js`, `download.js` present for installed version `0.575.0`
- `package.json` — confirmed no test runner, no new deps needed
- `.planning/config.json` — confirmed `nyquist_validation: false` (Validation Architecture section omitted), `ui_hint`/`ui_phase: true` (UI-SPEC step will resolve layout specifics), no `security_enforcement` override
- `.planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md` — hero asset spec, markup sketch, explicit "not decided" items
- `.planning/phases/02-.../02-CONTEXT.md` — locked/discretion/deferred scope
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` — phase requirement IDs and success criteria

### Secondary (MEDIUM confidence — project-level research, not re-verified externally this session)
- `.planning/research/STACK.md` — image delivery, CV delivery, OG image, Framer Motion accessibility patterns (Google/Schema.org sources cited within, HIGH confidence per that document)
- `.planning/research/ARCHITECTURE.md` — recommended home page section flow, content patterns, anti-patterns
- `.planning/research/PITFALLS.md` — all 12 project-level pitfalls, several directly informing this document's Pitfalls 1-5

### Tertiary
None — no new WebSearch/Context7 lookups were needed this session; every finding traces to a file already in this repository.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies, every claim verified against `node_modules`/`package.json`/existing usage
- Architecture: HIGH — all patterns are direct extensions of code already in `src/routes/index.tsx` and `src/styles.css`
- Pitfalls: HIGH for codebase-specific findings (color values, file sizes, dead-code inventory — all directly verified); MEDIUM for UX/conversion-pattern pitfalls inherited from project-level `PITFALLS.md` (that document's own confidence rating)

**Research date:** 2026-08-05
**Valid until:** Effectively indefinite for the codebase-specific findings (they won't change unless the codebase does); treat as valid through the end of this milestone (Phase 4 completion) — re-verify color tokens/file paths only if Phase 3 or another concurrent branch touches `src/styles.css` or `src/routes/index.tsx` before this phase executes.
