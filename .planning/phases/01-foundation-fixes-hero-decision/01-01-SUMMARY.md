---
phase: 01-foundation-fixes-hero-decision
plan: 01
subsystem: infra
tags: [seo, json-ld, links, static-assets, react, tanstack-start]

# Dependency graph
requires: []
provides:
  - "Feature branch feature/home-recruiter-redesign, descended from main, created for the whole 4-phase milestone"
  - "Recorded main baseline SHA for later phases to verify no source change reached main"
  - "Working LinkedIn links in Footer.tsx, contato.tsx, and Person JSON-LD (index.tsx)"
  - "Working 'Baixar CV' download link on the home page hero"
affects: [01-foundation-fixes-hero-decision, 02, 03, 04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "External social links remain inline string literals per array (no shared SOCIAL_LINKS constant introduced)"
    - "Static asset hrefs with spaces in the filename are percent-encoded (%20) rather than renaming the file"

key-files:
  created: []
  modified:
    - src/components/Footer.tsx
    - src/routes/contato.tsx
    - src/routes/index.tsx

key-decisions:
  - "D-01/D-02 (from 01-CONTEXT.md): correct LinkedIn URL is https://www.linkedin.com/in/murilo-ortega, fixed in all 3 occurrences, not just Footer"
  - "D-07/D-08 (from 01-CONTEXT.md): minimal-risk CV fix — percent-encode the href to the existing PDF filename, do not rename the physical file"
  - "Pending .planning/ doc drift (STATE.md, config.json, new 01-PATTERNS.md) was committed to main before branching, using PROJECT.md's explicit .planning/ exemption from the no-direct-to-main rule, to satisfy Task 1's clean-working-tree precondition"

patterns-established:
  - "sameAs JSON-LD entries and social link arrays are populated only with user-confirmed URLs (T-01-02 spoofing mitigation)"

requirements-completed: [FIX-01, FIX-02]

# Metrics
duration: ~5min
completed: 2026-08-05
---

# Phase 1 Plan 01: Foundation Link Fixes Summary

**Corrected the site's two broken recruiter-facing action links — LinkedIn URL (3 occurrences) and hero CV download href — on a new milestone-scoped feature branch, with zero visual or structural change.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-08-05T05:51:00Z (approx, per STATE.md pre-execution timestamp)
- **Completed:** 2026-08-05T05:54:32Z
- **Tasks:** 3 completed
- **Files modified:** 3 (Footer.tsx, contato.tsx, index.tsx)

## Accomplishments
- Created `feature/home-recruiter-redesign`, the single branch all 4 phases of this milestone will land on, descended cleanly from `main`
- Fixed the wrong LinkedIn URL (`https://linkedin.com/in/muriloortega` → `https://www.linkedin.com/in/murilo-ortega`) in all 3 source occurrences: Footer.tsx, contato.tsx, and the `Person` JSON-LD `sameAs` array in index.tsx
- Fixed the home page "Baixar CV" link, which 404'd against a nonexistent `/cv/curriculo.pdf`, to point at the real file `/cv/CV%20MURILO%20ORTEGA%202026.pdf`
- Preserved `target="_blank" rel="noopener noreferrer"` on every external social anchor (T-01-01 mitigation intact)
- Zero deletions, zero new dependencies, zero visual/layout change — diff is exactly 4 string-literal lines across 3 files

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the milestone feature branch off main** - branch-only, no commit (verified `BRANCH_OK`, `git log --oneline main..HEAD` empty at task end)
2. **Task 2: Correct the LinkedIn URL in all three source occurrences (FIX-02)** - `f541398` (fix)
3. **Task 3: Point the home page CV download at the real PDF (FIX-01)** - `91f8746` (fix)

**Pre-execution housekeeping commit (on `main`, before branching):** `bbf8382` (docs) — see Deviations below.

**Plan metadata:** commit hash recorded after this file is written (see final commit below)

## Files Created/Modified
- `src/components/Footer.tsx` - Footer social links row: corrected LinkedIn URL
- `src/routes/contato.tsx` - Contato page social links column: corrected LinkedIn URL
- `src/routes/index.tsx` - Person JSON-LD `sameAs` array corrected; hero "Baixar CV" anchor `href` corrected to the real, percent-encoded PDF path

## Decisions Made
- **Main baseline SHA:** `bbf8382b9b6776d89ac793c1fd4874dd81a9be8a` — recorded per Task 1 instructions. Plan `01-03-PLAN.md` should compare `git rev-parse main` against this value to confirm no source change landed on `main` during this milestone.
- **Branch:** `feature/home-recruiter-redesign`, created from and descended from `main`; milestone-scoped (Phases 1-4 all land here, single PR at the end of Phase 4).
- Followed D-01/D-02: fixed the LinkedIn URL everywhere it appears in `src/`, not just the Footer.
- Followed D-07/D-08: took the minimal-risk CV fix (percent-encoded href), did not rename the physical PDF on disk. This leaves a legitimate follow-up open for the user (see below).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Committed pending `.planning/` doc drift to `main` before branching**
- **Found during:** Task 1 (branch creation) — the plan's own precondition check ("confirm the working tree is clean... if it is not clean, stop and report") failed against the live repo state
- **Issue:** `.planning/STATE.md`, `.planning/config.json`, and a new `.planning/phases/01-foundation-fixes-hero-decision/01-PATTERNS.md` were uncommitted on `main` at execution start — leftover bookkeeping from the orchestrator's phase-start step (STATE.md flipped to `status: executing`, `config.json` gained `use_worktrees: false`, PATTERNS.md was newly written during planning but never committed). This was not source code, and not "uncommitted work" in the sense the plan's precondition was guarding against (it exists specifically to prevent branching over half-finished code changes).
- **Fix:** Committed these three files directly to `main` under PROJECT.md's explicit exemption ("Documentation under `.planning/` is the only category PROJECT.md exempts"), which cleared the working tree and unblocked Task 1's precondition. Commit `bbf8382`. Then proceeded to create the feature branch and capture the baseline SHA from that commit.
- **Files modified:** `.planning/STATE.md`, `.planning/config.json`, `.planning/phases/01-foundation-fixes-hero-decision/01-PATTERNS.md`
- **Verification:** `git status --porcelain` returned empty immediately after the commit and before `git checkout -b feature/home-recruiter-redesign`; `main` baseline SHA was captured from this exact commit, so later phases comparing `git rev-parse main` against the recorded baseline will see it correctly.
- **Committed in:** `bbf8382` (on `main`, pre-branch — not part of the feature branch's task commits)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary to satisfy the plan's own clean-tree precondition without discarding legitimate planning bookkeeping. No source code was touched by this commit, and it landed on `main` under an explicit PROJECT.md exemption for `.planning/` docs — consistent with the plan's own ground_truth note that ".planning/ docs moving the SHA of main is expected." No scope creep.

## Issues Encountered
None beyond the deviation above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

- Both FIX-01 and FIX-02 are done; a recruiter can now successfully open the LinkedIn profile and download the CV from the home page.
- **Open sub-decision left for the user:** the physical PDF `public/cv/CV MURILO ORTEGA 2026.pdf` was NOT renamed (D-07/D-08 minimal-risk default). If the user later wants a clean slug URL (e.g. `/cv/murilo-ortega-cv.pdf`), that is a one-line follow-up in a future phase, not a redo of this work.
- **Handoff note for Phase 2:** `.planning/research/STACK.md` recommends the CV CTA eventually offer BOTH a view-in-new-tab affordance (`target="_blank" rel="noopener"`) and a distinct download affordance. That CTA-hierarchy change belongs to HERO-03 / CONTACT-01 and was deliberately not done in this plan.
- End-to-end manual click-test (dev server, real browser, real download) is the human gate in `01-03-PLAN.md` per ROADMAP Phase 1 success criterion 1 — not performed in this plan by design.
- All work is on `feature/home-recruiter-redesign`; `main` HEAD is unchanged since the pre-branch housekeeping commit (`bbf8382`), confirmed by `git log --oneline main -1`.

## Self-Check: PASSED

All modified files (Footer.tsx, contato.tsx, index.tsx) and all commit hashes (bbf8382, f541398, 91f8746) verified present in the repository.

---
*Phase: 01-foundation-fixes-hero-decision*
*Completed: 2026-08-05*
