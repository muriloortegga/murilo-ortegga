---
phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
verified: 2026-08-06T17:53:53Z
status: passed
score: 14/14 must-haves verified
overrides_applied: 0
---

# Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies Verification Report

**Phase Goal:** A recruiter landing on the home page immediately sees who Murilo is (role + top result), a visually unambiguous CTA hierarchy favoring LinkedIn/e-mail/CV, and real proof of delivered work via 5 featured case studies — without losing access to any other project.
**Verified:** 2026-08-06T17:53:53Z
**Status:** passed
**Re-verification:** No — initial verification (no prior `02-VERIFICATION.md` existed on disk)

## Note on Mode

`ROADMAP.md` marks this phase `Mode: mvp`, but the phase goal is not in canonical `As a [role], I want to [capability], so that [outcome].` form. Confirmed via `gsd-sdk query user-story.validate --story "<goal>" --pick valid` → `false`. Same informational mismatch already flagged and accepted in `01-VERIFICATION.md`. Standard goal-backward methodology (not MVP user-flow framing) was applied, matching the precedent set for this milestone.

## Process Note: Prior Interrupted Verification Attempt

A prior verification session was interrupted mid-way by an account spend-limit error before reaching "kill dev server and check lint." No stray dev server was found running on port 8080 at the start of this session (`lsof -i :8080` returned nothing). This verification was performed independently end-to-end — a fresh `npm run dev` instance was started for evidence-gathering and cleanly stopped (`lsof -i :8080` empty) after all checks completed. No conclusions from the interrupted session were carried forward or trusted.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 (SC-1) | Scanning the hero, a recruiter sees a real full-colour photo of Murilo plus a two-line headline (line 1 = role, line 2 = delivered result) | ✓ VERIFIED | SSR HTML shows `<picture>` with AVIF+JPEG srcset, `loading="eager" fetchPriority="high"`, no grayscale/opacity treatment; H1 renders `"Diretor de Arte & Designer de Marca"` / `"8 anos transformando marcas comuns em marcas com resultado real."` — matching `02-COPY.md`'s `status: approved` record character-for-character |
| 2 (SC-2) | LinkedIn/e-mail/CV form the dominant, first-seen CTA cluster; "Ver Portfolio completo" is secondary; no WhatsApp anywhere in the hero | ✓ VERIFIED | Hero-scoped `btn-hero-primary` count = 1 (LinkedIn only), `btn-hero-secondary` = 2 (E-mail, CV), `text-link` = 1 ("Ver Portfolio completo"); the 2 sitewide `wa.me` hits trace to `Header.tsx`/`Footer.tsx` chrome, outside the hero `<section>` (confirmed by direct inspection of surrounding SSR markup, not just grep count) |
| 3 (SC-3) | Scrolling past the hero, exactly 5 case studies (NaTrave, Symplice, Maxi, Solid+, Kapyi) each show a Problema→Ação→Resultado narrative with no click/hover needed | ✓ VERIFIED | `projects` array has exactly 5 entries in this order; SSR HTML contains 5× "Problema:", 5× "Ação:", 5× "Resultado:" as plain text (no `hidden`/`sr-only`/`<details>`) |
| 4 | Every P/A/R sentence traces to already-published copy on the project's own route; no fabricated metric; Kapyi's result has no digit | ✓ VERIFIED | Independently re-ran every source grep in `02-CASE-SOURCES.md` against the live route files (`natrave.tsx:69` `followers={2250}`, `symplice.tsx:25`, `maxi.tsx:44`, `solid.tsx:25`, `kapyi.tsx:43`/`:61`) — all matched. `grep -A4 'to: "/kapyi"' \| grep result: \| grep -c '[0-9]'` → 0 |
| 5 (SC-4) | Projects dropped from the home array (Kmillion, Evidive, Talk2Buy) remain listed on `/trabalho`, still linked from the hero | ✓ VERIFIED | `src/routes/trabalho.tsx` lists all 3 plus Milgrows; hero "Ver Portfolio completo" links to `/trabalho`; all 3 project routes return HTTP 200 |
| 6 (SC-5) | No generic greeting, no new heavy animation/video in the hero | ✓ VERIFIED | `grep -ci "olá, sou o murilo"` → 0; `grep -c "motion\."` → 0; no `framer-motion` import added; only pre-existing `anim-fade-in`/`scrollY`-transform carried over |
| 7 | Hero headline copy was user-approved before any hero JSX was edited | ✓ VERIFIED | `02-COPY.md` frontmatter `status: approved`, `approved_by: user`, `selected: draft-a`, committed at `804df2b` — before the hero-rebuild commits (`55966ee`, `20d273a`, `39bbd3a`) |
| 8 | Every image the retired `HeroGallery` referenced remains reachable from `/trabalho` | ✓ VERIFIED | `02-HEROGALLERY-AUDIT.md` lists 9/9 paths with grep-verified `trabalho.tsx` line numbers; independently re-ran the same greps — all matched; `public/` diff vs `main` shows 6 new files added, 0 deletions |
| 9 | The home page shows exactly 5 cases, not the full project list | ✓ VERIFIED | `grep -c 'to: "/'` on `src/routes/index.tsx` → 5; no `.slice`/`.filter`/`.sort` on `projects` |
| 10 | Murilo personally reviewed the rebuilt home page and gave an explicit verdict per ROADMAP success criterion | ✓ VERIFIED (see note below) | `02-UAT.md`, committed (`572c9ff`, `da0847a`), records a real automated pre-flight sweep plus a human reply ("Tudo aprovado") explicitly covering SC-1 through SC-5 with per-criterion notes referencing the specific sub-checks (squint test, claim spot-check, `/trabalho` reachability) the plan required to be confirmed, not silently assumed |
| 11 | The squint test confirms exactly one visually dominant CTA style in the hero | ✓ VERIFIED | Automated: hero-scoped `btn-hero-primary` = 1, `btn-hero-secondary` = 2 (deliberately same visual weight, subordinate to the filled button), `text-link` = 1 (lightest tier) — a strict 3-tier hierarchy by construction. Human: `02-UAT.md` SC-2 notes record the user explicitly confirming the squint test |
| 12 | No link that worked before the restructure is broken after it | ✓ VERIFIED | All 10 routes (`/trabalho /natrave /symplice /maxi /solid /kapyi /kmillion /evidive /talk2buy /sobre`) return HTTP 200; all 11 image asset URLs (6 hero + 5 card) return HTTP 200 |
| 13 | Non-deletion constraint honoured — no existing content/page/project/asset removed | ✓ VERIFIED | `git diff --stat main -- src/styles.css` empty; `git diff --stat main -- public/` shows only 6 new hero files added (0 deletions); no project route file deleted; `trabalho.tsx` unmodified |
| 14 | Any FAIL would have been written down as a routable gap, not silently patched | ✓ VERIFIED (N/A — no FAIL occurred) | `02-UAT.md` verdict is `pass`; `## Gaps` section is absent because no criterion failed; the plan's own acceptance criteria required a `## Gaps` section only on `gaps-found`, and none exists — consistent with the pass verdict |

**Score:** 14/14 truths verified

### Note on Truth #10 (human sign-off form)

The plan's own acceptance criteria asked for "an explicit PASS or FAIL for each of SC-1 through SC-5." The user's actual reply was a single blanket phrase, "Tudo aprovado" ("everything approved"), rather than 5 discrete `SC-N PASS` lines. The executor's Task 3 write-up expanded that blanket reply into 5 rows, each with a note tying it back to the specific things the review script asked the user to confirm (squint test, claim honesty, reachability). This is weaker evidence than Phase 1's per-item checklist (`01-03-SUMMARY.md`, which recorded 5 independently-worded outcomes) but it is still a real, git-committed human response — not fabricated, not silently assumed — and it explicitly addresses every sub-check the plan called out as mandatory. Treated as sufficient; flagged here for visibility rather than downgraded to a gap.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `.planning/phases/.../02-COPY.md` | User-approved hero headline record | ✓ VERIFIED | `status: approved`, `line_1`/`line_2` present, matches shipped H1 exactly |
| `src/routes/index.tsx` (hero) | Rebuilt hero — dual H1, responsive portrait, 3-tier CTA | ✓ VERIFIED | All markup present and SSR-confirmed; `npx tsc --noEmit` exits 0 |
| `.planning/phases/.../02-HEROGALLERY-AUDIT.md` | Reachability audit for 9 retired gallery images | ✓ VERIFIED | 9/9 rows, independently re-verified against `trabalho.tsx` |
| `src/routes/index.tsx` (cases) | 5-entry `projects` array + P/A/R figcaption + Case Studies section | ✓ VERIFIED | Exactly 5 entries, `<dl>` P/A/R block unconditionally rendered, section between Brand Marquee and Positioning |
| `.planning/phases/.../02-CASE-SOURCES.md` | Provenance table for every P/A/R sentence | ✓ VERIFIED | 15 rows, all source greps independently re-run and matched |
| `.planning/phases/.../02-UAT.md` | Automated pre-flight + human verdict per SC | ✓ VERIFIED | `status: complete`, `verdict: pass`, all 15 automated checks independently re-run and matched |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `02-COPY.md` approved copy | hero `<h1>` | verbatim JSX text children | WIRED | Strings match character-for-character, including accents and trailing period |
| Hero LinkedIn anchor | `https://www.linkedin.com/in/murilo-ortega` | `target="_blank" rel="noopener noreferrer"` | WIRED | Present in SSR HTML with both attributes |
| `projects` array entries | `/natrave /symplice /maxi /solid /kapyi` | `<Link to={project.to}>` in `ProjectCard` | WIRED | All 5 hrefs present in SSR HTML, all 5 routes return 200 |
| Hero "Ver Portfolio completo" | `/trabalho` | `<Link to="/trabalho">` | WIRED | Present, `/trabalho` returns 200 and lists Kmillion/Evidive/Talk2Buy/Milgrows |
| Case card copy | source project route files | condensed sentences | WIRED | Every sentence traced to a live grep hit in the named source file |

### Data-Flow Trace (Level 4)

Not applicable in the conventional sense — this is a static-content site with no data-fetching layer (per `CLAUDE.md`'s architecture notes: "No database or ORM. All page content... is hardcoded as inline TS objects/arrays"). The `projects` array is a module-level constant consumed directly by `projects.map()` in the Case Studies section; no intermediate state/fetch layer exists to go hollow. Verified the constant itself carries real, sourced values (see Truth #4) rather than empty/placeholder data.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript compiles | `npx tsc --noEmit` | exit 0 | ✓ PASS |
| Lint baseline unchanged | `npm run lint` | 5 errors, 1 warning — identical to documented pre-phase baseline (`draggable-marquee.tsx`, `project-media.tsx`, `social-media-case.tsx`, `router.tsx`, 2 pre-existing `any` in `index.tsx`) | ✓ PASS |
| Home page SSR renders hero | `curl localhost:8080/` → count `murilo-hero` | 7 occurrences | ✓ PASS |
| 5 case outcomes in SSR HTML | `curl localhost:8080/` → count `Resultado:` | 5 | ✓ PASS |
| Hero gallery retired | `curl localhost:8080/` → count `hero-gallery-track` | 0 | ✓ PASS |
| No greeting | `curl localhost:8080/` → count `olá, sou o murilo` (ci) | 0 | ✓ PASS |
| All 6 hero asset URLs live | `curl -o /dev/null -w "%{http_code}"` ×6 | 200 ×6 | ✓ PASS |
| All 5 card image URLs live | same, ×5 | 200 ×5 | ✓ PASS |
| All 10 routes live | same, ×10 | 200 ×10 | ✓ PASS |

### Probe Execution

No `scripts/*/tests/probe-*.sh` files exist in this repository and none were declared in the PLAN/SUMMARY files for this phase. Step 7c: SKIPPED (no runnable probes declared or found).

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|--------------|-------------|--------------|--------|----------|
| HERO-01 | 02-01, 02-02 | Dual-line hero headline: role + delivered result | SATISFIED | H1 renders both approved lines verbatim |
| HERO-02 | 02-02 | Full-colour foreground photo, not grayscale background layer | SATISFIED | `<picture>` with eager AVIF/JPEG, no opacity/grayscale filter |
| HERO-03 | 02-02 | Primary CTA cluster — LinkedIn + e-mail + CV, dominant hierarchy | SATISFIED | 1 filled + 2 outline buttons, hero-scoped counts confirmed |
| HERO-04 | 02-02 | Secondary CTA — "Ver Portfolio completo" retains `/trabalho` access | SATISFIED | Text-link present, links to `/trabalho`, route returns 200 |
| CASE-01 | 02-03 | 5 cases with Problema→Ação→Resultado narrative | SATISFIED | 5 entries in confirmed order, all P/A/R fields populated |
| CASE-02 | 02-03 | Result visible without click | SATISFIED | `<dl>` unconditionally rendered, no hover/expand gating |
| CASE-03 | 02-03 | Non-featured projects remain accessible via `/trabalho` | SATISFIED | Kmillion/Evidive/Talk2Buy/Milgrows all present on `/trabalho`, all return 200 |
| ANTI-02 | 02-01, 02-02 | No generic unearned greeting in hero | SATISFIED | 0 matches for greeting patterns |
| ANTI-03 | 02-03 | Home does not replicate the full project list | SATISFIED | Exactly 5 entries, not 9 |
| ANTI-04 | 02-02 | WhatsApp not dominant/first CTA in hero | SATISFIED | 0 WhatsApp references inside the hero-scoped markup |
| ANTI-05 | 02-02, 02-03 | No new heavy animation/video introduced | SATISFIED | 0 Framer Motion usage added; only pre-existing `anim-fade-in`/parallax carried over |

No orphaned requirements: all 11 IDs mapped to Phase 2 in `.planning/REQUIREMENTS.md`'s Traceability table appear in at least one plan's `requirements:` frontmatter field, and all are independently confirmed implemented above (not just checkbox-trusted).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/routes/index.tsx` | 149, 151 | `project: any`, `node: any` (pre-existing, unchanged by this phase's edits to signature) | ℹ️ Info | Flagged in `02-REVIEW.md` WR-02; type safety gap on the newly-added `problem`/`action`/`result` fields, but does not affect runtime correctness — verified render output is correct |
| `src/routes/index.tsx` | 151-164 | `ProjectCard`'s inline `cardRef` recreates an `IntersectionObserver` on every re-render, never disconnected unless intersection fires | ⚠️ Warning | Documented in `02-REVIEW.md` WR-01. Real resource-management bug, not a Phase 2 goal blocker — the 5 P/A/R blocks render correctly and unconditionally regardless of this observer's lifecycle. Recommend a follow-up cleanup task, does not gate this phase |
| `src/routes/index.tsx` | 175 | Dead `project.gif` branch (no `gif:` field exists on any of the 5 objects) | ℹ️ Info | Documented in `02-REVIEW.md` IN-02. Vestigial, always evaluates to `project.image`, no visible effect |
| `src/styles.css` | 503-541 | `.hero-gallery*` rules now orphaned (retired component no longer references them) | ℹ️ Info | Documented in `02-REVIEW.md` IN-03. Explicitly out of scope for this phase per the plan; does not affect any rendered output |

No `TBD`/`FIXME`/`XXX` debt markers found in `src/routes/index.tsx` (re-confirmed independently via `grep -n "TBD\|FIXME\|XXX"` → 0 matches). `02-REVIEW.md` (`fdb67d2`) records 0 critical findings, 2 warnings, 5 info — none of which block the phase goal; both warnings pre-date this phase's structural changes and are pre-existing robustness gaps in a component this phase modified, not new breakage this phase introduced.

### Human Verification Required

None required beyond what was already executed and recorded. The blocking `checkpoint:human-verify` required by ROADMAP Phase 2 was already run as `02-04-PLAN.md` Task 2 and closed with a git-committed verdict in `02-UAT.md` (see Truth #10's note above for the one caveat on verdict granularity — treated as sufficient, not as an open item).

### Gaps Summary

No gaps found. All 14 derived truths verified against the live codebase, independently of SUMMARY.md narrative: every grep count in every plan's acceptance criteria was independently re-run against the current file state and matched; every case-copy provenance claim was independently re-traced to its source file and matched; every asset and route URL was independently curl-tested and returned 200; the non-deletion constraint was independently confirmed via `git diff --stat main` (public/ shows only additions, styles.css untouched, no route file deleted); the human UAT checkpoint exists as a real git-committed artifact, not a self-graded claim. `npx tsc --noEmit` and `npm run lint` were independently re-run in this session and match the documented baseline exactly.

---

_Verified: 2026-08-06T17:53:53Z_
_Verifier: Claude (gsd-verifier)_
