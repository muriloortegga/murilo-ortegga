# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-08-04)

**Core value:** Em poucos segundos de home page, um recrutador entende quem é Murilo, com o que ele trabalha, os resultados que já entregou, e consegue agir (LinkedIn, e-mail, CV) — sem que nada do conteúdo/projetos/páginas existentes seja perdido ou fique inacessível.
**Current focus:** Phase 1 — Foundation Fixes & Hero Decision

## Current Position

Phase: 1 of 4 (Foundation Fixes & Hero Decision)
Plan: Not yet planned
Status: Ready to plan
Last activity: 2026-08-05 — ROADMAP.md and STATE.md created; all 23 v1 requirements mapped across 4 phases

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: - min
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: -
- Trend: -

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Roadmap: Scope is `src/routes/index.tsx` only — no other route is touched this milestone.
- Roadmap: Coarse granularity (4 phases) — matches research-recommended structure, no compression or padding applied.
- Roadmap: Phase 4 (QA) carries no unique v1 requirements — it verifies Phases 1-3 and gates the merge to `main`.

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

Last session: 2026-08-05
Stopped at: ROADMAP.md and STATE.md written; REQUIREMENTS.md traceability updated. Ready for `/gsd:plan-phase 1`.
Resume file: None
