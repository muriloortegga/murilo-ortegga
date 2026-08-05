---
phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
plan: 03
subsystem: home-case-studies
tags: [case-studies, proof-of-work, ia-restructure, recruiter-conversion]

# Dependency graph
requires:
  - phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
    provides: "02-02's rebuilt hero (src/routes/index.tsx hero section, unrelated to this plan's changes)"
provides:
  - "Activated 5-entry projects array with problem/action/result fields in src/routes/index.tsx"
  - "ProjectCard figcaption restructured into a visible Problema/Ação/Resultado <dl>"
  - "Rendered Case Studies section between Brand Marquee and Positioning"
  - "02-CASE-SOURCES.md — full copy provenance table + CASE-03 reachability proof + post-render verification"
affects: ["02-04"]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Dead-code activation: projects array + ProjectCard component already existed unused; this plan wired them into HomePage's JSX rather than building new components"]

key-files:
  created: [".planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-CASE-SOURCES.md"]
  modified: ["src/routes/index.tsx"]

key-decisions:
  - "5th case is Kapyi (D-01), qualitative result line with zero fabricated numbers (D-02) — 2,5 anos figure kept only in the action line, sourced verbatim from kapyi.tsx:43"
  - "NaTrave's 2.250 seguidores is the only numeric result across all 5 cards, traced to natrave.tsx:69 followers={2250}"
  - "Kmillion, Evidive, Talk2Buy removed from the home projects array only — routes and /trabalho listing untouched, satisfying CASE-03/the non-deletion constraint"

requirements-completed: [CASE-01, CASE-02, CASE-03, ANTI-03]

# Metrics
duration: 15min
completed: 2026-08-05
---

# Phase 2 Plan 3: Case Studies Activation — 5 Featured Cases with P→A→R Narrative Summary

**Activated the previously-dead `projects` array and `ProjectCard` component in `src/routes/index.tsx`: redefined the array to the 5 D-01-confirmed cases (NaTrave, Symplice, Maxi, Solid+, Kapyi) with sourced `problem`/`action`/`result` fields, restructured `ProjectCard`'s `<figcaption>` into a visible Problema→Ação→Resultado `<dl>`, and rendered a new "Case Studies" section between Brand Marquee and Positioning — with zero fabricated metrics and full copy provenance recorded in `02-CASE-SOURCES.md`.**

## Performance

- **Duration:** ~15 min
- **Tasks:** 3 (all auto)
- **Files modified:** 2 (`src/routes/index.tsx`, `02-CASE-SOURCES.md` created)

## Accomplishments

- `projects` array redefined from 6 entries (NaTrave, Solid+, Kmillion, Symplice, Evidive, Talk2Buy) to exactly 5, in D-01 order (NaTrave, Symplice, Maxi, Solid+, Kapyi), each carrying `name`, `category`, `image`, `to`, `problem`, `action`, `result`
- Every P/A/R sentence condensed and verified against its live source file (`natrave.tsx`, `symplice.tsx`, `maxi.tsx`, `solid.tsx`, `kapyi.tsx`) — no invented client, metric, or outcome
- `ProjectCard`'s `<figcaption>` restructured: header row (category, name, hover arrow) unchanged; new `<dl>` with three inline `<dt>`/`<dd>` pairs (`Problema:` / `Ação:` / `Resultado:`) renders as plain unconditional text — no `hidden`, `sr-only`, `<details>`, or hover-reveal wrapper (CASE-02)
- New "Case Studies" `<section>` inserted between Brand Marquee and Positioning: eyebrow "Prova de Trabalho" + heading "Resultados que já entreguei" + `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16` rendering `projects.map` in array order, no re-sorting/filtering/slicing
- Case Studies section stays on the default light `bg-background` — verified NOT inverted (`awk`-scoped grep for `bg-foreground text-background` inside the section returns 0)
- Verified via SSR dev-server curl output: `grep -ao "Resultado:" | wc -l` → 5 (all 5 outcomes present in server-rendered HTML with zero client-side interaction required), eyebrow renders once, all 5 case `href`s present
- `src/routes/trabalho.tsx`, `src/styles.css`, and `public/` all confirmed untouched (`git status --porcelain`/`git diff --stat` empty) — Kmillion, Evidive, Talk2Buy remain fully listed on `/trabalho` and their route files were not touched

## Task Commits

1. **Task 1: Source the case copy and redefine the projects array to the confirmed 5** - `ca56e71` (feat)
2. **Task 2: Restructure ProjectCard's figcaption into a visible P→A→R block** - `f914d50` (feat)
3. **Task 3: Render the Case Studies section and verify /trabalho reachability** - `ea44ab8` (feat)

## The 5 Shipped Case Entries (exact P/A/R sentences)

| Case | Problema | Ação | Resultado |
|------|----------|------|-----------|
| NaTrave | Plataforma social sem identidade nem retenção de usuários. | Direção de arte, sistema de conteúdo e social media completos. | 2.250 seguidores conquistados organicamente. |
| Symplice | Marca operando em complexidade sem clareza de comunicação. | Identidade visual limpa, direta, focada em experiência do usuário. | Simplicidade estratégica sustentada em todo o sistema de marca. |
| Maxi | Instituição de ensino tradicional precisando reforçar autoridade digital. | Social media e OOH alinhados à trajetória de excelência acadêmica. | Performance institucional sustentada para aprovações em vestibulares. |
| Solid+ | Fintech precisando de solidez e confiança visual no mercado internacional. | Direção de identidade visual e sistemas de design robustos. | Design que transmite solidez, confiança e inovação para o mercado financeiro digital. |
| Kapyi | Marcas de nichos distintos (engenharia, educação, clínicas, tech) sem posicionamento premium consistente. | 2,5 anos de liderança criativa unindo branding e direção de campanhas. | Posicionamento premium sustentado para marcas de nichos distintos. |

**D-02 verification:** Kapyi's `result` line contains zero digits (`grep -A4 'to: "/kapyi"' src/routes/index.tsx | grep 'result:' | grep -c '[0-9]'` → `0`). Only NaTrave's `result:` line contains a digit sequence, and it is `2.250`.

## SSR Verification (curl against `npm run dev`, port 8080)

- `curl -s http://localhost:8080/ | grep -ao "Resultado:" | wc -l` → **5**
- `curl -s http://localhost:8080/ | grep -ao "Prova de Trabalho" | wc -l` → **1**
- All 5 case `href`s (`/natrave`, `/symplice`, `/maxi`, `/solid`, `/kapyi`) present in the rendered HTML

## Files Created/Modified

- `src/routes/index.tsx` — `projects` array redefined to 5 entries with P/A/R fields; `ProjectCard` `<figcaption>` restructured into a `<dl>`-based P→A→R block; new Case Studies `<section>` inserted between Brand Marquee and Positioning
- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-CASE-SOURCES.md` — 15-row P/A/R provenance table (every sentence traced to a `Source file:line` with a verified grep hit), CASE-03 reachability table for Kmillion/Evidive/Talk2Buy, and a Post-render verification section recording the SSR curl checks

## Decisions Made

- Followed 02-PATTERNS.md's target JSX verbatim for the array, figcaption, and section structure — no deviation from the plan's exact code blocks was needed.
- Left `ProjectCard`'s pre-existing `any`-typed params (`project: any, index: number`) untouched — out of scope per the plan's explicit instruction not to rewrite the component signature; these are the same pre-existing lint findings noted in 02-02-SUMMARY.md, unchanged by this plan.

## Deviations from Plan

None — plan executed exactly as written. All three tasks' automated verification blocks passed on the first attempt with no auto-fixes required.

## Issues Encountered

None. `npm run lint` reported the same 6 pre-existing problems (5 errors, 1 warning) as the pre-task baseline captured before Task 2 — zero new errors introduced by this plan.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- The home page now delivers both halves of Phase 2's goal: identity + CTA hierarchy (02-02) and proof via 5 real case studies (02-03). Plan `02-04` (human-review checkpoint) can proceed to visually verify both halves together.
- `02-CASE-SOURCES.md` is available at `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-CASE-SOURCES.md` for the `02-04` human reviewer to spot-check any P/A/R claim against its source file:line.
- `src/routes/trabalho.tsx`, `src/styles.css`, and `public/` are unmodified; all 3 dropped projects (Kmillion, Evidive, Talk2Buy) remain fully reachable via `/trabalho`.

---
*Phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies*
*Completed: 2026-08-05*

## Self-Check: PASSED

- FOUND: `src/routes/index.tsx`
- FOUND: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-CASE-SOURCES.md`
- FOUND: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-03-SUMMARY.md`
- FOUND commit: `ca56e71` (Task 1)
- FOUND commit: `f914d50` (Task 2)
- FOUND commit: `ea44ab8` (Task 3)
