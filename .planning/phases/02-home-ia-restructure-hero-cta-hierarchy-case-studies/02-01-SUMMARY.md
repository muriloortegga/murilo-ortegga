---
phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
plan: 01
subsystem: content
tags: [copywriting, hero, ia-restructure, decision-record]

# Dependency graph
requires:
  - phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
    provides: "02-UI-SPEC.md Copywriting Contract (3 candidate hero headline draft pairs)"
provides:
  - "User-approved hero H1 headline copy (line_1 role, line_2 result) recorded in 02-COPY.md as single source of truth"
affects: ["02-02"]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Blocking human copy-approval checkpoint recorded as a standalone decision-record markdown file before any JSX is edited"]

key-files:
  created: [".planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-COPY.md"]
  modified: []

key-decisions:
  - "User selected Draft A (UI-SPEC recommended) as the hero headline: line_1 'Diretor de Arte & Designer de Marca', line_2 '8 anos transformando marcas comuns em marcas com resultado real.'"

patterns-established:
  - "Copy-approval gate pattern: draft, present as checkpoint:decision, record approved text verbatim in a dedicated file before any code task touches it"

requirements-completed: [HERO-01, ANTI-02]

# Metrics
duration: 8min
completed: 2026-08-05
---

# Phase 2 Plan 1: Hero Headline Copy Approval Summary

**User approved Draft A as the hero H1 copy — "Diretor de Arte & Designer de Marca" / "8 anos transformando marcas comuns em marcas com resultado real." — recorded verbatim in 02-COPY.md as the single source of truth for plan 02-02.**

## Performance

- **Duration:** 8 min
- **Tasks:** 3 (2 auto + 1 checkpoint:decision)
- **Files modified:** 1

## Accomplishments
- Staged all 3 UI-SPEC hero headline draft pairs verbatim in `02-COPY.md` for human review
- Presented the blocking copy-approval checkpoint; user selected `draft-a`
- Recorded the final approved strings in an `## Approved Copy` section, asserted HERO-01/ANTI-02 compliance, and retained rejected Drafts B and C on record

## Task Commits

1. **Task 1: Verify branch state and stage the draft record** - `f9f87b1` (docs)
2. **Task 2: checkpoint:decision** — user replied `draft-a` (no code commit; decision only)
3. **Task 3: Record the approved copy as the single source of truth** - `804df2b` (docs)

## Approved Hero Headline Copy (verbatim — for plan 02-02)

```
line_1: "Diretor de Arte & Designer de Marca"
line_2: "8 anos transformando marcas comuns em marcas com resultado real."
```

## Files Created/Modified
- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-COPY.md` - Hero headline decision record: 3 drafts presented, Draft A approved, HERO-01/ANTI-02 compliance asserted

## Decisions Made
- Draft A (UI-SPEC recommended) selected over Draft B (stronger metric proof but longer line 2, risk of 3-line wrap on 375px) and Draft C (middle option) — user chose the cleanest, shortest scan with no number to defend in the headline itself.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 02-02 can read `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-COPY.md` `## Approved Copy` section and paste `line_1`/`line_2` directly into the hero H1 JSX — no further copy invention needed.
- Zero source files were changed in this plan; zero commits landed on `main`.

---
*Phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies*
*Completed: 2026-08-05*

## Self-Check: PASSED

- FOUND: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-01-SUMMARY.md`
- FOUND commit: `f9f87b1` (Task 1)
- FOUND commit: `804df2b` (Task 3)
