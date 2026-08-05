---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: verifying
stopped_at: Completed 02-04-PLAN.md — Phase 2 verified and closed
last_updated: "2026-08-05T23:02:00.133Z"
last_activity: 2026-08-05
progress:
  total_phases: 4
  completed_phases: 2
  total_plans: 7
  completed_plans: 7
  percent: 50
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-08-04)

**Core value:** Em poucos segundos de home page, um recrutador entende quem é Murilo, com o que ele trabalha, os resultados que já entregou, e consegue agir (LinkedIn, e-mail, CV) — sem que nada do conteúdo/projetos/páginas existentes seja perdido ou fique inacessível.
**Current focus:** Phase 2 — home-ia-restructure-hero-cta-hierarchy-case-studies

## Current Position

Phase: 2 (home-ia-restructure-hero-cta-hierarchy-case-studies) — EXECUTING
Plan: 4 of 4
Status: Phase complete — ready for verification
Last activity: 2026-08-05

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**

- Total plans completed: 3
- Average duration: - min
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1 | 3 | - | - |

**Recent Trend:**

- Last 5 plans: -
- Trend: -

*Updated after each plan completion*
| Phase 01 P01 | 5min | 3 tasks | 3 files |
| Phase 01 P02 | 10min | 2 tasks | 7 files |
| Phase 01 P03 | 10min | 2 tasks | 1 files |
| Phase 02 P01 | 8min | 3 tasks | 1 files |
| Phase 02 P02 | 20min | 3 tasks | 2 files |
| Phase 02 P03 | 15min | 3 tasks | 2 files |
| Phase 02 P04 | 14min | 3 tasks | 1 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Roadmap: Scope is `src/routes/index.tsx` only — no other route is touched this milestone.
- Roadmap: Coarse granularity (4 phases) — matches research-recommended structure, no compression or padding applied.
- Roadmap: Phase 4 (QA) carries no unique v1 requirements — it verifies Phases 1-3 and gates the merge to `main`.
- [Phase 01-01]: Feature branch feature/home-recruiter-redesign created off main; baseline SHA bbf8382b9b6776d89ac793c1fd4874dd81a9be8a recorded for Phase 1-4 — Milestone ships on one branch/PR (Phases 1-4); baseline lets later plans verify no source change reached main
- [Phase 01-01]: LinkedIn URL corrected to https://www.linkedin.com/in/murilo-ortega in all 3 src/ occurrences; CV href corrected to /cv/CV%20MURILO%20ORTEGA%202026.pdf — FIX-01/FIX-02: both recruiter action links (LinkedIn, CV download) now resolve correctly
- [Phase 01-02]: Crop y-offset 257 (crop=3376:4220:0:257) confirmed correct on visual inspection - no adjustment needed
- [Phase 01-02]: No WebP tier shipped for hero images - ffmpeg lacks libwebp encoder, sips cannot write webp, and adding a package would violate the fixed-stack constraint; AVIF+JPEG already bracket the coverage
- [Phase 01-02]: 1200x630 Open Graph image flagged in 01-HERO-PHOTO.md as out of scope and currently unowned by any phase, for Phase 4 to pick up
- [Phase 01-03]: All 5 human checkpoint items passed on first try (CV download, LinkedIn x2, hero crop, no breakage) — no fix routed back to 01-01 or 01-02
- [Phase 01-03]: D-07 resolved: no preference on CV filename slug, keeps current percent-encoded path as-is
- [Phase 02]: Draft A (UI-SPEC recommended) selected as hero H1 copy: 'Diretor de Arte & Designer de Marca' / '8 anos transformando marcas comuns em marcas com resultado real.'
- [Phase 02-02]: Hero photo uses the existing .media-wrap bordered-card convention (no mask-image), per 02-UI-SPEC.md §1 — reuses zero-risk sitewide precedent instead of a new compositing technique
- [Phase 02-02]: HeroGallery(), galleryImages, galleryAlts deleted from index.tsx outright (no commented-out remnant); reachability audit is the permanent record per UI-SPEC §5
- [Phase 02-03]: 5th case is Kapyi (D-01), qualitative result line with zero fabricated numbers (D-02) — 2,5 anos figure kept only in the action line, sourced verbatim from kapyi.tsx:43
- [Phase 02-03]: NaTrave's 2.250 seguidores is the only numeric result across all 5 cards, traced to natrave.tsx:69 followers={2250}
- [Phase 02-03]: Kmillion, Evidive, Talk2Buy removed from the home projects array only — routes and /trabalho listing untouched, satisfying CASE-03
- [Phase 02-04]: User gave blanket approval ("Tudo aprovado") covering ROADMAP Phase 2 SC-1 through SC-5, explicitly confirming the squint test, case-claim honesty, and /trabalho reachability
- [Phase 02-04]: Phase 2 requirement IDs already flipped to Complete during 02-02/02-03 execution; this plan's UAT formally validates that status rather than re-performing the flip
- [Phase 02-04]: OG-image gap (1200x630 home Open Graph card, Phase 4 SC-4) remains unassigned to any phase, carried forward for Phase 3 planning

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 1 blocker: hero photo asset does not exist in the repo today (only grayscale mood images) — must be resolved (source/commission a photo, or agree explicit fallback) before Phase 2 hero work can start.
- Phase 3 risk: per-client/per-case metric data may not exist for all 13 logos or all 5 case studies — qualitative framing is an accepted fallback, needs a content-gathering pass with the user during planning.
- Standing constraint (all phases): every change ships on a feature branch with a PR — never a direct commit to `main` — because pushes to `main` auto-deploy to the live Lovable-hosted site. Confirm the Lovable panel's connected branch before the final Phase 4 merge.

## Deferred Items

Items acknowledged and carried forward from previous milestone close:

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 | CONTENT-01 (remote-readiness line), CONTENT-02 (AI/gestão stack teaser) | Deferred to v2 | Requirements definition |
| v2 | TECH-01 (case filter by skill/role), TECH-02 (video/motion case previews) | Deferred to v2 | Requirements definition |
| Tech debt | `/servicos/*` dead route in ContextNav; kmillion (91MB) and natrave (66MB) unoptimized GIFs | Out of scope, registered as separate tech debt | Requirements definition |

## Session Continuity

Last session: 2026-08-05T23:02:00.120Z
Stopped at: Completed 02-04-PLAN.md — Phase 2 verified and closed
Resume file: None
