---
phase: 01-foundation-fixes-hero-decision
plan: 03
subsystem: infra
tags: [verification, e2e, human-checkpoint, links, hero-photo]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Corrected LinkedIn URL and working CV download href"
  - phase: 01-02
    provides: "Six web-ready full-colour hero portrait variants and the FIX-03 decision record"
provides:
  - "Human-verified evidence that FIX-01, FIX-02 and FIX-03 all work in a real browser against a live dev server"
  - "Closed ROADMAP Phase 1 success criteria 1, 2 and 3"
  - "Recorded D-07 answer: no preference on CV filename — stays as-is"
affects: [02, 03, 04]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created:
    - .planning/phases/01-foundation-fixes-hero-decision/01-03-SUMMARY.md
  modified: []

key-decisions:
  - "D-07 resolved: user expressed no preference on renaming the CV file to a clean slug URL — the physical filename and percent-encoded href stay exactly as fixed in 01-01 (no follow-up work created)"
  - "Hero crop and full-colour treatment (FIX-03, from 01-02) approved as-is by the user with no adjustment requested"

patterns-established: []

requirements-completed: [FIX-01, FIX-02, FIX-03]

# Metrics
duration: ~10min
completed: 2026-08-05
---

# Phase 1 Plan 03: End-to-End Audit & Human Verification Summary

**Live dev-server audit (E2E_AUDIT_OK, all real HTTP assertions passing) followed by a blocking human click-test in a real browser — user confirmed the CV download, both LinkedIn links, and the hero crop all work correctly, closing ROADMAP Phase 1 success criteria 1, 2 and 3.**

## Performance

- **Duration:** ~10 min across two sessions (Task 1 automated audit + Task 2 human checkpoint, resumed by a fresh continuation agent)
- **Started:** 2026-08-05 (Task 1)
- **Completed:** 2026-08-05 (Task 2 checkpoint resolved)
- **Tasks:** 2 completed
- **Files modified:** 0 source files (verification-only plan); 1 file created (this summary)

## Accomplishments

- Ran a live end-to-end audit against the `vite dev` server on port 8080 and got `E2E_AUDIT_OK`, with every assertion passing on real values:
  - `GET /cv/CV%20MURILO%20ORTEGA%202026.pdf` → 200, `application/pdf`, 349,280 bytes
  - `GET /cv/curriculo.pdf` → not 200 (confirms the old dead path stays dead)
  - All six hero variants (`murilo-hero-{480,960,1440}.{jpg,avif}`) → 200
  - HTML of `/` contains `www.linkedin.com/in/murilo-ortega` (2 occurrences: footer + JSON-LD `sameAs`) and the CV href
  - HTML of `/contato` contains `www.linkedin.com/in/murilo-ortega` (2 occurrences)
  - `/` and `/contato` both return 200
  - Working tree clean for `package.json`, `bun.lock`, `public/cv/`, `public/assets/about/photos/`
- Confirmed, before closing the checkpoint, that `main` still resolves to the recorded baseline SHA `bbf8382b9b6776d89ac793c1fd4874dd81a9be8a` and that the current branch is still `feature/home-recruiter-redesign` — no source change reached the live-deploy branch during this plan
- Collected the user's real-browser verification for all 5 checkpoint items (see below) — every item passed, no failure routed back to 01-01 or 01-02
- Recorded the D-07 CV-filename decision as "no preference"
- Stopped the dev server (PID 37862, listening on `:8080`) that had been left running for the manual test

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the end-to-end audit against a live dev server** — verification-only, no file changes; audit printed `E2E_AUDIT_OK` (see prior checkpoint return for the full command output)
2. **Task 2: Human verification of the CV download, the LinkedIn profile, and the hero crop** — verification-only, no file changes; resolved via user's real-browser test report

**Plan metadata:** commit hash recorded after this file is written (see final commit below)

## Files Created/Modified

- `.planning/phases/01-foundation-fixes-hero-decision/01-03-SUMMARY.md` — this summary, the artifact required by the plan's `must_haves.artifacts` entry

No source files were modified by this plan — it is verification-only, as specified in the plan's frontmatter (`files_modified: []`).

## Decisions Made

- **D-07 (CV filename):** User was asked whether they want a clean slug URL (`/cv/murilo-ortega-cv-2026.pdf`) instead of the current percent-encoded `/cv/CV%20MURILO%20ORTEGA%202026.pdf`. **User's answer: no preference expressed.** Per the plan's own instruction ("If you do not care, it stays as-is"), the CV filename and href remain exactly as fixed in 01-01 — no follow-up work created.
- **Hero crop/colour (FIX-03) approval:** User opened the exported 1440w hero JPEG and approved the crop and full-colour treatment as-is. No re-export, no y-offset adjustment requested.

## User's Verbatim Checkpoint Outcomes

The user personally tested all 5 checkpoint items in a real browser against the running dev server:

1. **CV download** — ok (correct PDF downloaded)
2. **LinkedIn from home page footer** — ok (own profile loaded)
3. **LinkedIn from /contato** — ok (own profile loaded)
4. **Hero photo crop and colour** — ok (approved as-is, no adjustment requested)
5. **Nothing broke** — ok ("tudo ok")

All 5 items passed. No item required routing back to 01-01 or 01-02 for a fix/re-export.

## Deviations from Plan

None — plan executed exactly as written. Task 1's automated audit passed on the first run with no fixes needed; Task 2's checkpoint resolved with a full pass on all 5 items and no crop adjustment requested, so no re-export or re-verification cycle was triggered.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

**ROADMAP Phase 1 success criteria — all 3 closed:**

1. **Criterion 1 (CV download click-test):** CLOSED. The user personally clicked "Baixar CV" in a real browser against the live dev server and confirmed the correct PDF (`CV MURILO ORTEGA 2026.pdf`, ~349 KB) downloaded and opened correctly. This satisfies the roadmap's explicit requirement for "an actual manual click-test, not just a code review."
2. **Criterion 2 (LinkedIn URL confirmed correct):** CLOSED. The user personally clicked the LinkedIn link from both the home page footer and `/contato` and confirmed their own profile (`https://www.linkedin.com/in/murilo-ortega`) loaded correctly in both cases.
3. **Criterion 3 (hero photo decision made and documented):** CLOSED. The user personally viewed the exported hero portrait (full colour, 4:5 crop) and approved it as-is, with `01-HERO-PHOTO.md` (from 01-02) standing as the written decision record and Phase 2 handoff spec.

**Phase 1 is complete.** All three requirements (FIX-01, FIX-02, FIX-03) are verified with real human evidence, not just code review or automated assertions. `main` is confirmed untouched throughout (baseline SHA `bbf8382b9b6776d89ac793c1fd4874dd81a9be8a` unchanged), so the live site is unaffected. **Phase 2 is unblocked** with no unverified assumption underneath it — the hero photo assets, the CV download path, and the LinkedIn URL are all proven working in a real browser, not just present in a diff.

One deferred item carried forward for future phases (not blocking): the 1200×630 Open Graph image, flagged in `01-HERO-PHOTO.md` as currently unowned by any phase — Phase 2, 3, or 4 should pick it up before Phase 4's QA criterion 4 (OG image preview check) is attempted.

## Self-Check: PASSED

This plan is verification-only with no source files created or modified. The one artifact this plan produces — this summary file — is being written now and will be verified present immediately after via the self-check step below.

---
*Phase: 01-foundation-fixes-hero-decision*
*Completed: 2026-08-05*
