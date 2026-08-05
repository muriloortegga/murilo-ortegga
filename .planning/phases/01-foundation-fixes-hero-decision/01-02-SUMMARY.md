---
phase: 01-foundation-fixes-hero-decision
plan: 02
subsystem: assets
tags: [images, ffmpeg, avif, lcp, hero-photo, static-assets]

# Dependency graph
requires: ["01-01"]
provides:
  - "Six web-ready, full-colour, EXIF-free hero portrait variants (480/960/1440 x AVIF/JPEG) under public/assets/home/hero/"
  - "01-HERO-PHOTO.md — the FIX-03 decision record and Phase 2 hero-build handoff spec"
affects: [01-foundation-fixes-hero-decision, 02]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Static image variants exported via preinstalled ffmpeg (libsvtav1 for AVIF, mjpeg for JPEG) rather than a new image-processing dependency"
    - "AVIF + JPEG two-tier delivery (no WebP tier) documented as a deliberate no-new-dependency decision"

key-files:
  created:
    - public/assets/home/hero/murilo-hero-480.avif
    - public/assets/home/hero/murilo-hero-480.jpg
    - public/assets/home/hero/murilo-hero-960.avif
    - public/assets/home/hero/murilo-hero-960.jpg
    - public/assets/home/hero/murilo-hero-1440.avif
    - public/assets/home/hero/murilo-hero-1440.jpg
    - .planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md
  modified: []

key-decisions:
  - "Crop y-offset 257 (crop=3376:4220:0:257) confirmed correct on visual inspection of the exported 960w JPEG — no adjustment needed, matches the planning-validated value"
  - "No WebP tier shipped — ffmpeg lacks a libwebp encoder and sips cannot write WebP on this machine; installing a package to produce it would violate PROJECT.md's fixed-stack constraint and STACK.md's no-new-image-library rule for this phase. AVIF+JPEG already bracket WebP's browser coverage."
  - "1200x630 Open Graph image is explicitly out of this plan's scope and flagged in 01-HERO-PHOTO.md as unowned by any current phase, for Phase 4 to pick up"

patterns-established:
  - "Full-colour foreground hero treatment (D-05) explicitly documented as distinct from the existing grayscale/low-opacity background treatment in src/routes/sobre.tsx — Phase 2 must not copy that class set"

requirements-completed: [FIX-03]

# Metrics
duration: ~10min
completed: 2026-08-05
---

# Phase 1 Plan 02: Hero Photo Prep & Decision Record Summary

**Exported the confirmed hero-bg.jpg source into six web-ready, full-colour, EXIF-stripped static variants (480x600/960x1200/1440x1800, AVIF+JPEG, all under 300KB) via ffmpeg, and wrote the FIX-03 decision/handoff document so Phase 2's hero build starts with zero open asset questions.**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-08-05 (this session)
- **Completed:** 2026-08-05
- **Tasks:** 2 completed
- **Files created:** 7 (6 image variants + 1 decision doc)

## Accomplishments

- Cropped `public/assets/about/photos/hero-bg.jpg` (3376x6000, 19.7MB, EXIF-present) using `crop=3376:4220:0:257` → 4:5 portrait, scaled with lanczos to 480x600, 960x1200 and 1440x1800
- Exported both JPEG (`-q:v 4`) and AVIF (`libsvtav1 -crf 32 -preset 6 -pix_fmt yuv420p10le`) at each width — six files total, largest 270,594 bytes, all under the 300KB cap
- Confirmed full colour (D-05): no grayscale/desaturation/opacity applied; `pix_fmt` is `yuvj444p`/`yuv420p10le` for every file, never a `gray` variant
- Confirmed EXIF stripped on every export (`grep -ac Exif` = 0) while the untouched source still carries it (`= 1`)
- Visually opened `murilo-hero-960.jpg` and confirmed correct framing: full headroom, complete face and shoulders, forearm tattoos, hands entering cleanly at the bottom edge — no crop adjustment needed
- Zero packages installed; `package.json`/`bun.lock` unchanged; zero files touched under `src/`; the 19.7MB source and its two siblings (`middle-bg.jpg`, `footer-bg.jpg`) remain byte-for-byte unmodified
- Wrote `.planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md`: source/selection rationale, full-colour treatment vs. the rejected `/sobre` grayscale pattern, the exact export spec with real on-disk byte sizes, the deliberate no-WebP-tier rationale, a Phase 2 `<picture>` markup sketch with the `HeroGallery` LCP attribute precedent (`loading="eager"`, `fetchPriority="high"`), explicit "not decided here" flags (`sizes`, container/layout), open items Phase 2 inherits (light photo on dark canvas, no foreground-portrait precedent), and the unowned 1200x630 OG image flagged for Phase 4

## Task Commits

Each task was committed atomically:

1. **Task 1: Export web-ready, full-colour hero variants at three widths in AVIF and JPEG** — `3fdc0f1` (feat)
2. **Task 2: Write the FIX-03 decision record and Phase 2 handoff spec** — `37aff2a` (docs)

**Plan metadata:** commit hash recorded after this file is written (see final commit below)

## Files Created/Modified

- `public/assets/home/hero/murilo-hero-480.jpg` (29,209 bytes) / `.avif` (9,957 bytes) — 480x600
- `public/assets/home/hero/murilo-hero-960.jpg` (99,069 bytes) / `.avif` (30,558 bytes) — 960x1200
- `public/assets/home/hero/murilo-hero-1440.jpg` (270,594 bytes) / `.avif` (71,962 bytes) — 1440x1800
- `.planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md` — decision record + Phase 2 handoff

## Decisions Made

- **Crop y-offset:** 257 (final, unchanged from planning) — `crop=3376:4220:0:257`. Visually verified correct after export; no re-export needed.
- **WebP tier:** deliberately omitted. `ffmpeg` on this machine has no `libwebp` encoder, `sips` cannot write WebP, and installing a package to add one would violate PROJECT.md's fixed-stack constraint and STACK.md's explicit "no new image-processing library this phase" guidance. AVIF (Safari 16+/Chrome 85+/Firefox 93+) + JPEG (universal fallback) already bracket the coverage WebP would occupy. Full rationale recorded in `01-HERO-PHOTO.md` section 4.
- **Open Graph 1200x630 image:** confirmed out of scope for this plan (FIX-03 is the home hero, not social-share cards) and flagged in `01-HERO-PHOTO.md` section 8 as currently unowned by any phase — surfaced for Phase 4 to either scope in or explicitly defer to v2.

## Deviations from Plan

None — plan executed exactly as written. The planning-validated crop y-offset (257) held up on visual inspection with no adjustment needed, and all six exports landed at or below the planning-measured byte sizes.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- FIX-03 is complete: the confirmed hero photo exists as six web-ready, full-colour, EXIF-free static files, all under 300KB, at the three widths Phase 2 needs.
- `01-HERO-PHOTO.md` is the single reference Phase 2's hero build should read — it answers source, crop, colour treatment, dimensions, file paths, the LCP markup pattern to copy, and explicitly marks `sizes`/layout as Phase 2's own decisions.
- The source photo (`hero-bg.jpg`) and its siblings are untouched; `/sobre` is unaffected and was not touched by this plan.
- Zero dependencies added, zero `src/` changes — this plan stayed entirely in `public/assets/` and `.planning/`.
- Human sign-off on the crop and colour treatment is deliberately deferred to the checkpoint in `01-03-PLAN.md`, per ROADMAP Phase 1 success criterion 3 — not performed in this plan by design.
- Handoff flag for Phase 4 (not this milestone's immediate next step, but recorded so it isn't lost): the 1200x630 Open Graph image referenced by STACK.md and ROADMAP Phase 4 success criterion 4 has no owning phase yet.

## Self-Check: PASSED

All six image files and the decision doc verified present on disk; both commit hashes (`3fdc0f1`, `37aff2a`) verified present in `git log --oneline`.

---
*Phase: 01-foundation-fixes-hero-decision*
*Completed: 2026-08-05*
