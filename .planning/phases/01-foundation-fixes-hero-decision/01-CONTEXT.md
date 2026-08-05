# Phase 1: Foundation Fixes & Hero Decision - Context

**Gathered:** 2026-08-05
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase fixes the three blocking infrastructure/content items that every downstream CTA-hierarchy and hero-layout decision (Phase 2+) depends on: the broken CV download link, the unconfirmed LinkedIn URL, and the hero photo decision. No layout, hierarchy, or visual redesign work happens in this phase — that's Phase 2. This phase only unblocks it.

</domain>

<decisions>
## Implementation Decisions

### LinkedIn URL
- **D-01:** Correct URL is `https://www.linkedin.com/in/murilo-ortega` (with hyphen). Current code has `https://linkedin.com/in/muriloortega` (no hyphen, no `www.`) in `src/components/Footer.tsx` and `src/routes/contato.tsx` — both are wrong and must be corrected to the confirmed URL.
- **D-02:** Also check `src/routes/index.tsx`'s JSON-LD `sameAs` array (currently lists `https://linkedin.com/in/muriloortega`) and any other occurrence — grep the whole repo for `linkedin.com/in/muriloortega` and fix every instance, not just Footer/contato.

### Hero Photo
- **D-03:** The three images at `public/assets/about/photos/` (`hero-bg.jpg`, `middle-bg.jpg`, `footer-bg.jpg`) are real, high-resolution studio/lifestyle photos of Murilo — NOT placeholder/stock images. This is not an asset-sourcing problem, it's a treatment problem: today they're used as a background layer at low opacity + grayscale (see `src/routes/sobre.tsx:135`), which is wrong for a "presença visual em destaque" (HERO-02).
- **D-04:** Selected photo for the new home hero: `hero-bg.jpg` (close studio portrait, direct eye contact, neutral light background) — chosen over `middle-bg.jpg` (full-body seated, more editorial/distant) and `footer-bg.jpg` (candid working shot, good secondary/supporting image but not the lead).
- **D-05:** Treatment: full color, NOT grayscale/desaturated. The grayscale+low-opacity treatment in `/sobre` was designed for a background-layer role; a foreground hero portrait should read in full color to communicate energy/confidence, per user decision.
- **D-06:** This phase's job is to confirm/document this decision and prep the asset (e.g., export/crop as needed per `.planning/research/STACK.md`'s LCP guidance — proper `<picture>` with AVIF/WebP/JPEG, explicit dimensions). The actual hero layout/placement is Phase 2 work.

### CV Link
- **D-07:** User explicitly deferred the "keep exact filename vs. rename to a clean slug" sub-decision — put on standby, do not decide in this discussion.
- **D-08:** Claude's Discretion (see below) applies: default to the lowest-risk fix unless the user weighs in again before/during planning.

### Claude's Discretion
- **CV filename decision (deferred by user):** Default to the minimal-risk fix — correct the home page's `/cv/curriculo.pdf` href to point to the real, existing file (`public/cv/CV MURILO ORTEGA 2026.pdf`, URL-encoded), without renaming the physical file. Renaming is a nice-to-have (cleaner URL, no spaces) but was explicitly not decided — if the planner or executor renames the file for URL hygiene, that's an acceptable interpretation too, but the existing file must not become unreachable and no content is lost either way. Flag this as an open item to revisit with the user if the planner sees a strong reason to rename.
- **Hero photo cropping/export specifics** (exact crop ratio, whether to also lightly retouch/color-grade) are left to planning — the source photo and full-color treatment are locked, pixel-level export decisions are not.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level
- `.planning/PROJECT.md` — full project context, constraints, non-negotiable rules (no deletions, branch+PR, Lovable sync, dark/editorial aesthetic)
- `.planning/REQUIREMENTS.md` — FIX-01, FIX-02, FIX-03 are this phase's requirements
- `.planning/ROADMAP.md` — Phase 1 goal and success criteria (lines 22-31)

### Research
- `.planning/research/SUMMARY.md` — executive summary, phase ordering rationale (blocking dependencies first)
- `.planning/research/STACK.md` — hero photo as likely LCP element; `<picture>` + AVIF/WebP/JPEG delivery pattern, no new dependencies needed; `Person`/`ProfilePage` JSON-LD extension pattern (relevant for LinkedIn `sameAs` fix)
- `.planning/research/PITFALLS.md` — Pitfall 3/4 (shipping new CTA hierarchy on top of still-broken CV/LinkedIn infra), Pitfall 8 (missing photo discovered late) — both directly addressed by this phase

### Codebase map
- `.planning/codebase/ARCHITECTURE.md` — confirms `projects`/`ProjectCard` dead code in `src/routes/index.tsx` (relevant context for Phase 2, not this phase, but useful background)
- `.planning/codebase/CONCERNS.md` — documents the exact broken link (`/cv/curriculo.pdf`) and other pre-existing bugs out of this phase's scope (`/servicos/*` routes, heavy GIFs)

### Files with the LinkedIn URL bug (found via this discussion, confirm via grep at execution time)
- `src/components/Footer.tsx` — `https://linkedin.com/in/muriloortega` (wrong, needs `https://www.linkedin.com/in/murilo-ortega`)
- `src/routes/contato.tsx` — same wrong URL
- `src/routes/index.tsx` — JSON-LD `sameAs` array, same wrong URL

### File with the CV link bug
- `src/routes/index.tsx:287` — `href="/cv/curriculo.pdf"` should resolve to `public/cv/CV MURILO ORTEGA 2026.pdf`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `public/assets/about/photos/hero-bg.jpg` — the confirmed hero photo source, already in the repo, no new upload needed
- `src/lib/seo.ts`'s `routeSeo()` helper — where the `Person` JSON-LD `sameAs` array lives; extend/fix here rather than forking a new schema block

### Established Patterns
- `src/components/project-media.tsx`'s `ProjectMedia` component is the existing pattern for rendering optimized media — check if it fits the new hero photo or if a dedicated `<picture>` element is more appropriate given LCP priority

### Integration Points
- LinkedIn URL appears in at least 3 files (Footer, contato, index JSON-LD) — fix must be applied consistently everywhere, not just one component
- CV link is currently only referenced in `src/routes/index.tsx`'s hero CTA row

</code_context>

<specifics>
## Specific Ideas

- User confirmed via direct inspection of the actual photo files (not assumptions) that `hero-bg.jpg` is the right hero photo — a close, direct-eye-contact studio portrait on a neutral light background.
- Treatment must move away from the current `/sobre` grayscale+low-opacity background-layer pattern — this phase documents that decision so Phase 2 doesn't reinvent it.

</specifics>

<deferred>
## Deferred Ideas

- **CV filename/URL hygiene decision** — user put this on standby. Not lost; flagged as Claude's Discretion above with a safe default, and open for the user to weigh in again before Phase 1 execution if they want to specify a preference.
- Route bug `/servicos/*` → `/metodos/*` in `ContextNav` — confirmed out of scope for this phase (and this whole project) per PROJECT.md Out of Scope; not re-raised here.

### Reviewed Todos (not folded)
None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Foundation Fixes & Hero Decision*
*Context gathered: 2026-08-05*
