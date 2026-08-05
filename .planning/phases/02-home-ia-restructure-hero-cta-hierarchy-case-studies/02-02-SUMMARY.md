---
phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
plan: 02
subsystem: home-hero
tags: [hero, cta-hierarchy, recruiter-conversion, ia-restructure]

# Dependency graph
requires:
  - phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
    provides: "02-COPY.md approved hero H1 line_1/line_2 strings"
  - phase: 01-foundation-fixes-hero-decision
    provides: "01-HERO-PHOTO.md exported responsive portrait assets (murilo-hero-{480,960,1440}.{jpg,avif})"
provides:
  - "Rebuilt hero section in src/routes/index.tsx — dual-line H1, responsive portrait, three-tier recruiter-first CTA cluster"
  - "02-HEROGALLERY-AUDIT.md proving all 9 retired HeroGallery images remain reachable via /trabalho"
affects: ["02-03"]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Three-tier CTA hierarchy (filled > outline > text-link) using only existing .btn-hero-primary/.btn-hero-secondary/.text-link classes, no new colors/classes"]

key-files:
  created: [".planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-HEROGALLERY-AUDIT.md"]
  modified: ["src/routes/index.tsx"]

key-decisions:
  - "Hero photo uses the existing .media-wrap bordered-card convention (no mask-image), per 02-UI-SPEC.md §1 — reuses zero-risk sitewide precedent instead of a new compositing technique"
  - "HeroGallery(), galleryImages, galleryAlts deleted from index.tsx outright (no commented-out remnant); reachability audit is the permanent record per UI-SPEC §5"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, ANTI-02, ANTI-04, ANTI-05]

# Metrics
duration: 20min
completed: 2026-08-05
---

# Phase 2 Plan 2: Hero Rebuild — Portrait, Dual Headline, Recruiter-First CTA Summary

**Rebuilt the home hero in `src/routes/index.tsx`: swapped the 9-image scrolling `HeroGallery` for an eager-loaded AVIF+JPEG responsive portrait, replaced the single-line agency headline with the approved two-line role+result H1, and restructured the CTA row into a three-tier hierarchy (filled LinkedIn > outline E-mail/CV > text-link "Ver Portfolio completo") — with zero WhatsApp, zero new animation, and a written audit proving no image became unreachable.**

## Performance

- **Duration:** ~20 min
- **Tasks:** 3 (all auto)
- **Files modified:** 2 (`src/routes/index.tsx`, `02-HEROGALLERY-AUDIT.md` created)

## Accomplishments

- Hero grid changed from `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0` to `grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16`; text column unchanged in DOM order, photo column now a bordered `.media-wrap` card instead of the full-bleed gallery
- Hero H1 now renders the exact two approved strings from `02-COPY.md` as two `<span className="block">` children — plain JSX text, no `dangerouslySetInnerHTML`
- Agency tagline paragraph ("Design que confronta o comum...") removed from the hero only; the byte-identical SEO `description` on line 15 is untouched (file-wide count still 1)
- Right hero column is now a `<picture>` with AVIF `<source>` + JPEG `<img>` fallback, both 480/960/1440 srcset tiers, `sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 85vw"`, `loading="eager"` + `fetchPriority="high"` + `width={960} height={1200}`
- Primary CTA cluster built: LinkedIn (filled, only `btn-hero-primary` in the hero) + E-mail + CV (outline `btn-hero-secondary`) in one row; "Ver Portfolio completo" demoted to `.text-link` below it — the word "completo" added per HERO-04
- Scroll parallax (`translateY(${scrollY * 0.1}px)`) preserved on the headline block and carried onto both new CTA blocks (3 occurrences total, verified)
- `HeroGallery()`, `galleryImages`, `galleryAlts` deleted from `index.tsx`; `02-HEROGALLERY-AUDIT.md` created first, proving all 9 gallery image paths are still rendered via `/trabalho` and each project's own route
- Verified via SSR dev-server output: hero H1, LinkedIn/E-mail/CV cluster with icons, "Ver Portfolio completo" link, and full `<picture>` srcset all render correctly server-side

## Task Commits

1. **Task 1: Rebuild hero grid, two-line H1, and hero portrait column** - `55966ee` (feat)
2. **Task 2: Build the three-tier recruiter-first CTA cluster** - `20d273a` (feat)
3. **Task 3: Retire HeroGallery code and publish the image-reachability audit** - `39bbd3a` (feat)

## Hero Copy As Shipped (verbatim, from 02-COPY.md)

```
line_1: "Diretor de Arte & Designer de Marca"
line_2: "8 anos transformando marcas comuns em marcas com resultado real."
```

## CTA Label + Href Pairs As Shipped

| Tier | Label | Href | Style |
|------|-------|------|-------|
| Primary (filled) | Conectar no LinkedIn | `https://www.linkedin.com/in/murilo-ortega` (`target="_blank" rel="noopener noreferrer"`) | `btn btn-hero-primary gap-2 text-xs` |
| Secondary (outline) | Enviar E-mail | `mailto:contato@muriloortega.com` | `btn btn-hero-secondary gap-2 text-xs` |
| Secondary (outline) | Baixar CV | `/cv/CV%20MURILO%20ORTEGA%202026.pdf` (`download`) | `btn btn-hero-secondary gap-2 text-xs` |
| Tertiary (text-link) | Ver Portfolio completo | `/trabalho` (`Link to`) | `text-link` |

## Files Created/Modified

- `src/routes/index.tsx` - Hero `<section>` rebuilt (grid, H1, CTA cluster, photo column); `HeroGallery()`/`galleryImages`/`galleryAlts` removed; `lucide-react` import extended with `Linkedin, Mail, Download`
- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-HEROGALLERY-AUDIT.md` - Reachability audit: 9/9 retired gallery image paths verified still rendered via `/trabalho` + own project routes; `src/styles.css` and `public/` confirmed untouched

## Decisions Made

- Followed `02-UI-SPEC.md` §1's bordered-card photo treatment (no `mask-image`) over `01-HERO-PHOTO.md`'s open "light-on-dark" question — resolved because the hero background stays light per UI-SPEC §1, eliminating the color-clash problem the mask would have solved.
- Deleted the gallery code outright rather than commenting it out, per UI-SPEC §5 — the audit file is the intended permanent record, not an in-code comment.

## Deviations from Plan

None — plan executed exactly as written. Task 1 and Task 2's target JSX overlapped in the same CTA `<div>` region (the plan's own PATTERNS.md target JSX for Task 1's headline replacement sits directly above Task 2's CTA cluster in the same left column); to keep each task's commit atomic and scoped to its own acceptance criteria, Task 1's CTA row was left as the original three-link row during Task 1's commit, then replaced with the three-tier cluster in Task 2's commit — the net result after both tasks matches the plan's target JSX exactly, and both tasks' automated verification blocks passed independently at their respective commits.

## Issues Encountered

None. `npm run lint` reported 5 pre-existing errors (unrelated files: `draggable-marquee.tsx`, `project-media.tsx`, `social-media-case.tsx`; and 2 pre-existing `any`-typed `ProjectCard` params in `index.tsx` that shifted line numbers from 199/201 to 140/142 solely because the gallery code above them was deleted) — none are new errors introduced by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The hero is complete, shippable, and visually verified via SSR dev-server output (H1, CTA cluster, portrait `<picture>` all render correctly). Plan `02-03` can proceed to build the case-studies section without any further hero dependency.
- `02-HEROGALLERY-AUDIT.md` is available at `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-HEROGALLERY-AUDIT.md` for reference — confirms non-deletion constraint compliance for this plan's scope.
- `src/styles.css` and `public/` are unmodified; `src/routes/trabalho.tsx` is unmodified — all 9 gallery images remain fully reachable exactly as before this plan.

---
*Phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies*
*Completed: 2026-08-05*

## Self-Check: PASSED

- FOUND: `src/routes/index.tsx`
- FOUND: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-HEROGALLERY-AUDIT.md`
- FOUND: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-02-SUMMARY.md`
- FOUND commit: `55966ee` (Task 1)
- FOUND commit: `20d273a` (Task 2)
- FOUND commit: `39bbd3a` (Task 3)
