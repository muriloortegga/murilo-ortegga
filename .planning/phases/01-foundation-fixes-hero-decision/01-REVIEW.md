---
phase: 01-foundation-fixes-hero-decision
reviewed: 2026-08-05T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - src/components/Footer.tsx
  - src/routes/contato.tsx
  - src/routes/index.tsx
findings:
  critical: 0
  warning: 3
  info: 1
  total: 4
status: issues_found
---

# Phase 1: Code Review Report

**Reviewed:** 2026-08-05T00:00:00Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Scope: the two-fix diff from plan `01-01` — (1) correcting the wrong LinkedIn URL (`https://linkedin.com/in/muriloortega` → `https://www.linkedin.com/in/murilo-ortega`) in `Footer.tsx`, `contato.tsx`, and the `Person` JSON-LD `sameAs` array in `index.tsx`; (2) repointing the home page "Baixar CV" anchor from a 404'ing path to the real, percent-encoded PDF path.

Both fixes were verified against the on-disk state: `grep -rn "linkedin.com/in/muriloortega" src/` returns zero hits, `grep -rn "https://www.linkedin.com/in/murilo-ortega" src/` returns exactly the 3 expected hits, `grep -rn "curriculo.pdf" src/` returns zero hits, and `public/cv/CV MURILO ORTEGA 2026.pdf` exists on disk with a filename that byte-for-byte matches the decoded href (`CV%20MURILO%20ORTEGA%202026.pdf` → `CV MURILO ORTEGA 2026.pdf`, 3 spaces, 3 `%20`s, matching case). The `target="_blank" rel="noopener noreferrer"` pair was preserved on every external social anchor touched. No new files, deletions, or unrelated line changes were introduced. This part of the diff is correctly implemented and was additionally confirmed by a human click-test per `01-03-SUMMARY.md`.

The findings below are not about correctness of the two intended fixes — they are gaps and residual risks either directly adjacent to this fix's problem class (broken/generic recruiter-facing external links) or introduced by relying on `vite dev` as the sole verification environment for a production-Workers-served static asset. None are blocking; they are flagged because they sit squarely in the same "make every recruiter-facing action link actually work" territory this phase claims to close.

## Warnings

### WR-01: CV download fix was verified only against `vite dev`, not the actual Cloudflare Workers production runtime

**File:** `src/routes/index.tsx:287`
**Issue:** The fix (`href="/cv/CV%20MURILO%20ORTEGA%202026.pdf"`) was validated exclusively via `vite dev` (both the automated E2E audit in `01-03-PLAN.md` Task 1 and the human click-test in Task 2 ran against the local dev server on port 8080). Per this project's own documented architecture (`CLAUDE.md` "Platform Requirements": *"Cloudflare's `workerd` runtime is NOT used in dev — the Cloudflare plugin is skipped for `vite dev`, so local dev runs on Node/Vite's own server, not a Workers-accurate environment"*), Vite's built-in static file server and Cloudflare Workers' asset-serving path (via `@cloudflare/vite-plugin` / Workers Assets) are two different implementations. A same-origin percent-encoded href with literal spaces in the target filename (`%20` × 3) is exactly the kind of edge case where URL-decoding/path-matching behavior can diverge between a dev-only Node static server and the production Workers asset resolver. There is no `wrangler.jsonc` `assets` binding declared in this repo to inspect, and no CI/build-preview step exercised the fix against a Workers-accurate target before it was declared done.
**Fix:** Before merging to `main` (where a push auto-deploys per `CLAUDE.md`), run `vite build && vite preview` (or an actual `wrangler dev`/deployed preview) and re-do the CV download click-test against that Workers-representative build, not just `vite dev`. If it fails there, the low-risk mitigation already flagged as deferred in the plan (D-07: rename the physical file to a space-free slug, e.g. `murilo-ortega-cv-2026.pdf`) removes the encoding edge case entirely.

### WR-02: Upwork link is a generic homepage URL, not a working profile link, in both files this phase touched

**File:** `src/components/Footer.tsx:38`, `src/routes/contato.tsx:58`
**Issue:** `{ name: "Upwork", url: "https://upwork.com" }` appears verbatim in both the footer social row and the `/contato` social column. This is the exact same failure class this phase's FIX-02 was written to eliminate for LinkedIn — a labeled external-identity link that does not resolve to the person it claims to represent, just without a 404. A recruiter clicking "Upwork" from either the footer or the contact page lands on Upwork's generic marketing homepage, not Murilo's profile — a dead end that contradicts this phase's own stated goal ("every recruiter-facing action link on the site into a working state"). This is pre-existing (not touched by the diff under review) and therefore not a regression introduced by this phase, but it was in scope for review as unfinished business in the exact same arrays this phase edited two lines above/below.
**Fix:** Replace `https://upwork.com` with the real Upwork profile URL in both `Footer.tsx:38` and `contato.tsx:58`, the same way `https://www.linkedin.com/in/murilo-ortega` was just corrected two lines away in each file.

### WR-03: Social link arrays remain duplicated with no single source of truth, and this phase's own fix had to be applied in 3 separate places by hand

**File:** `src/components/Footer.tsx:34-39`, `src/routes/contato.tsx:54-59`, `src/routes/index.tsx:28-32`
**Issue:** The identical `{ name, url }` array (LinkedIn/Instagram/Behance/Upwork) is hand-duplicated in `Footer.tsx` and `contato.tsx`, and a third, overlapping subset is hand-duplicated again in `index.tsx`'s JSON-LD `sameAs` array. This is a documented, accepted convention per `01-PATTERNS.md`/`CLAUDE.md` ("inline duplication is this codebase's existing convention for small link sets"), and the plan explicitly scoped extraction to a shared constant as out-of-scope for this fix — so this is not a defect introduced here. It is flagged because this phase is direct, first-hand proof of the risk the convention accepts: the wrong LinkedIn URL had to be independently fixed in 3 different files in the same commit, and WR-02 shows a second broken link (Upwork) that exists identically in 2 of those 3 places and was missed by this exact fix. Every future URL correction for any of these links carries the same multi-file, easy-to-partially-miss risk.
**Fix:** Out of scope for this phase per the plan's explicit constraint — no action required here. Recommend flagging a `SOCIAL_LINKS` shared-constant extraction (`src/lib/social-links.ts` or similar) as a follow-up in a later phase's backlog, given this phase produced concrete evidence of the duplication cost.

## Info

### IN-01: `Person.sameAs` JSON-LD omits Upwork while the footer/contato social arrays include it

**File:** `src/routes/index.tsx:28-32`
**Issue:** `sameAs` lists LinkedIn, Instagram, and Behance (3 entries) but not Upwork, while `Footer.tsx`/`contato.tsx` list all 4 including Upwork. This asymmetry predates this phase and may be intentional (structured-data `sameAs` is meant for identity-verification-grade profile links, and an unclaimed/generic Upwork homepage arguably shouldn't be asserted as an identity claim per the threat model's own T-01-02 spoofing concern) — noted for completeness, not asserted as a defect.
**Fix:** No action required unless/until WR-02 is fixed with a real Upwork profile URL, at which point revisit whether it belongs in `sameAs` too.

---

_Reviewed: 2026-08-05T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
