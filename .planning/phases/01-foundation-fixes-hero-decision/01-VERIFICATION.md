---
phase: 01-foundation-fixes-hero-decision
verified: 2026-08-05T07:00:00Z
status: passed
score: 15/15 must-haves verified
overrides_applied: 0
---

# Phase 1: Foundation Fixes & Hero Decision — Verification Report

**Phase Goal:** The blocking infrastructure underneath every recruiter-facing CTA is fixed, and the hero photo asset question is resolved, so Phase 2's hierarchy work isn't built on top of a broken link, an unconfirmed URL, or an undecided asset.
**Verified:** 2026-08-05T07:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Note on Mode

ROADMAP.md marks this phase `Mode: mvp`, but the phase goal is a blocking-infrastructure statement, not a user-story-formatted goal ("As a [role], I want to [capability], so that [outcome]."). Confirmed via `gsd-sdk query user-story.validate` → `valid: false`. This is a legitimate mismatch worth flagging for `/gsd mvp-phase` cleanup, but the phase is fundamentally a three-bug-fix + one-asset-decision phase, not a feature slice with a user flow — standard goal-backward verification (not the MVP user-flow framing) is the correct methodology here, and was applied. This is informational, not a blocker.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All work happens on `feature/home-recruiter-redesign`, never `main` | VERIFIED | `git rev-parse --abbrev-ref HEAD` → `feature/home-recruiter-redesign`; `git rev-parse main` → `bbf8382b9b6776d89ac793c1fd4874dd81a9be8a`, matching the recorded baseline; `git diff --stat main -- package.json bun.lock package-lock.json` empty |
| 2 | Every LinkedIn link points to `https://www.linkedin.com/in/murilo-ortega` | VERIFIED | `grep -rn 'linkedin.com/in/muriloortega' src/` → 0 hits; `grep -rn 'https://www.linkedin.com/in/murilo-ortega' src/` → exactly 3 hits (Footer.tsx:35, contato.tsx:55, index.tsx:29) |
| 3 | Home page "Baixar CV" resolves to the real PDF on disk | VERIFIED | `src/routes/index.tsx:287` → `href="/cv/CV%20MURILO%20ORTEGA%202026.pdf"`; `public/cv/CV MURILO ORTEGA 2026.pdf` exists, 349,280 bytes; `grep -c curriculo.pdf src/routes/index.tsx` → 0 |
| 4 | Person JSON-LD `sameAs` asserts only the verified LinkedIn URL | VERIFIED | `src/routes/index.tsx:29` sameAs array first entry is the corrected URL |
| 5 | No existing file/asset/page/link deleted | VERIFIED | `git status --porcelain` clean; `git diff --stat main` shows only additions plus the 4 targeted single-line edits; source photos untouched (`git log -- hero-bg.jpg` shows only the initial commit) |
| 6 | A web-optimized, full-colour hero portrait exists at 3 widths x 2 formats | VERIFIED | `ls public/assets/home/hero/` → 6 files; `ffprobe` confirms `480x600`/`960x1200`/`1440x1800` for both `.jpg` and `.avif`; pix_fmt `yuvj444p`/`yuv420p10le` (never `gray`) |
| 7 | Every exported variant is small enough to serve as LCP element | VERIFIED | Largest file 270,594 bytes (1440.jpg), all under the 300KB cap; total set ~511KB vs 19.7MB source |
| 8 | 19.7MB source unchanged and `/sobre` still renders from it | VERIFIED | `git status --porcelain public/assets/about/photos/` empty; `src/routes/sobre.tsx:135` still references `/assets/about/photos/hero-bg.jpg` |
| 9 | Phase 2 can wire the hero without a single new asset decision | VERIFIED | `01-HERO-PHOTO.md` documents source, selection, treatment, exact crop/encode spec, all 6 real file sizes, WebP rationale, `<picture>` sketch with `loading="eager"`/`fetchPriority="high"`, explicitly marks `sizes`/layout as Phase 2 decisions, flags the unowned OG image |
| 10 | No camera EXIF ships to the public web | VERIFIED | `LC_ALL=C grep -ac Exif` on `murilo-hero-960.jpg` → 0; same check on source `hero-bg.jpg` → 1 (source legitimately still carries it, pre-existing and out of this phase's scope) |
| 11 | Murilo personally clicked "Baixar CV" and the real PDF arrived | VERIFIED | `01-03-SUMMARY.md` records per-item human checkpoint outcome: "1. CV download — ok (correct PDF downloaded)", not a blanket approval |
| 12 | Murilo personally clicked a LinkedIn link and his profile loaded | VERIFIED | Same summary: "2. LinkedIn from home page footer — ok", "3. LinkedIn from /contato — ok" |
| 13 | Murilo personally approved the hero crop and full-colour treatment | VERIFIED | Same summary: "4. Hero photo crop and colour — ok (approved as-is, no adjustment requested)" |
| 14 | Home page and contact page render without errors after the fixes | VERIFIED | E2E audit: `/` and `/contato` both 200; human item 5: "tudo ok"; local `tsc --noEmit` produces zero errors on the current tree |
| 15 | Phase 2 is unblocked with no unverified assumption underneath it | VERIFIED | All three ROADMAP Phase 1 success criteria closed with real (not just diff-level) evidence; `01-HERO-PHOTO.md` hands off a fully specified asset spec |

**Score:** 15/15 truths verified

### ROADMAP Success Criteria Cross-Check

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | CV download verified by actual manual click-test | VERIFIED | Human checkpoint in `01-03-SUMMARY.md`, item 1 |
| 2 | LinkedIn URL explicitly confirmed by Murilo | VERIFIED | Human checkpoint items 2-3; D-01 in `01-CONTEXT.md` |
| 3 | Hero photo decision made and documented | VERIFIED | `01-HERO-PHOTO.md` + human checkpoint item 4 |

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/Footer.tsx` | Corrected LinkedIn URL, `rel="noopener noreferrer"` preserved | VERIFIED | Line 35 has correct URL; `grep -c 'rel="noopener noreferrer"'` → 2 |
| `src/routes/contato.tsx` | Corrected LinkedIn URL, security attrs preserved | VERIFIED | Line 55 has correct URL; `grep -c` → 3 |
| `src/routes/index.tsx` | Corrected `sameAs` + corrected CV href | VERIFIED | Line 29 (sameAs), line 287 (CV href) both correct |
| `public/assets/home/hero/murilo-hero-960.jpg` | Baseline JPEG, 960x1200 | VERIFIED | Exists, 99,069 bytes, `960,1200,yuvj444p` |
| `public/assets/home/hero/murilo-hero-960.avif` | Primary AVIF, 960x1200 | VERIFIED | Exists, 30,558 bytes, `960,1200,yuv420p10le` |
| `.planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md` | FIX-03 decision + handoff spec | VERIFIED | Exists, contains all required sections (source, treatment, export spec, WebP rationale, handoff sketch, open items, OG gap) |
| `.planning/phases/01-foundation-fixes-hero-decision/01-03-SUMMARY.md` | Recorded human verification evidence | VERIFIED | Exists, contains per-item verbatim outcomes for all 5 checkpoint items plus D-07 answer |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `src/routes/index.tsx` | `public/cv/CV MURILO ORTEGA 2026.pdf` | static asset href, percent-encoded | WIRED | File exists at exact decoded path; human-confirmed download in real browser via `vite dev` |
| `src/routes/index.tsx` | `https://www.linkedin.com/in/murilo-ortega` | Person JSON-LD `sameAs` | WIRED | URL present in `head()`; not independently network-verified by this verifier (LinkedIn blocks automated probes), but human-confirmed via real click in `01-03-SUMMARY.md` |
| `public/assets/home/hero/*` | `public/assets/about/photos/hero-bg.jpg` | ffmpeg crop+scale re-encode, source preserved | WIRED | Source untouched (`git status --porcelain` empty for that path), 6 derived files present with correct dims/EXIF-stripped |
| `.planning/.../01-HERO-PHOTO.md` | Phase 2 hero build (HERO-02) | documented `<picture>`/srcset spec | WIRED | Spec present with exact paths, LCP attributes, and explicit "not decided" flags so Phase 2 has no open questions |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|--------------|--------|----------|
| FIX-01 | 01-01, 01-03 | CV download link points to real file, manually tested | SATISFIED | Href correct, file exists, human click-test passed |
| FIX-02 | 01-01, 01-03 | LinkedIn URL confirmed correct by user | SATISFIED | 3/3 occurrences corrected, human click-test passed |
| FIX-03 | 01-02, 01-03 | Hero photo asset resolved before Phase 2 layout work | SATISFIED | 6 variants exported, decision record written, human-approved crop/colour |

No orphaned requirements: `.planning/REQUIREMENTS.md` maps FIX-01/02/03 to Phase 1 only, all three appear in plan frontmatter `requirements:` fields, and all three are marked `Complete` in the traceability table (lines 89-91).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | None found in the phase's modified files (`Footer.tsx`, `contato.tsx`, `index.tsx`) | — | `grep -n -E "TBD\|FIXME\|XXX\|TODO\|HACK\|PLACEHOLDER"` returned zero matches in all three |

Two pre-existing, out-of-scope items were surfaced by `01-REVIEW.md` and independently confirmed present on disk:

- **WR-01 (warning, not blocking):** The CV download and LinkedIn fixes were verified only against `vite dev`, which per this project's own `CLAUDE.md` does NOT use the Cloudflare Workers runtime locally. A percent-encoded href with literal spaces (`%20` x3) is exactly the class of path that can diverge between Vite's dev static server and the production Workers asset resolver. This is a real residual risk for the eventual `main` merge, but it is not a Phase 1 blocker: ROADMAP Phase 1 success criterion 1 only requires "an actual manual click-test, not just a code review" (satisfied), and Phase 4's own success criterion 3 ("every internal link... resolves correctly — zero broken links introduced") plus its "merge only after full checklist passes" gate (criterion 5) is the natural place to re-verify this against a Workers-representative build before the milestone merges to `main`. Recommend Phase 4 explicitly includes a production-build (`vite build && wrangler dev`/preview) click-test of the CV download, not just a static-analysis link check.
- **WR-02/WR-03 (info, pre-existing, correctly out of scope):** The Upwork link (`https://upwork.com`, a generic homepage, not a profile) and the un-deduplicated social-link arrays are both pre-existing conditions the plan explicitly scoped out ("do NOT ... extract the two duplicated social arrays into a shared constant"). Confirmed on disk: `Upwork` entries in `Footer.tsx`/`contato.tsx` are unchanged by this phase's diff. Not a Phase 1 gap.

### Human Verification Required

None. The blocking human-verify checkpoint required by ROADMAP Phase 1 success criterion 1 ("an actual manual click-test, not just a code review") was already executed as `01-03-PLAN.md` Task 2 and closed with per-item, non-blanket outcomes recorded in `01-03-SUMMARY.md`. This verifier treats that recorded checkpoint — not the SUMMARY narrative around it — as the evidence, because it is the structured output of a `checkpoint:human-verify` gate with `workflow.auto_advance: false`, not a self-graded claim.

### Gaps Summary

No gaps found. All 15 derived truths verified against the live codebase (not just SUMMARY claims): grep counts match exactly, file sizes and dimensions match exactly, EXIF stripping confirmed, git history confirms no deletions and no `main` contamination, and the one blocking human checkpoint was executed with specific per-item evidence rather than a blanket approval. The single residual risk (WR-01, dev-server-only verification vs. Workers-runtime production parity) is real but correctly scoped to Phase 4's pre-merge QA gate, not this phase's success criteria.

---

_Verified: 2026-08-05T07:00:00Z_
_Verifier: Claude (gsd-verifier)_
