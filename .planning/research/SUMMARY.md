# Project Research Summary

**Project:** Portfólio Murilo Ortega — Reposicionamento para Recrutadores
**Domain:** Brownfield personal portfolio home page restructuring — dual-audience (recruiter-primary, freelance/agency-secondary) conversion redesign, no stack changes, no deletions
**Researched:** 2026-08-04
**Confidence:** MEDIUM-HIGH

## Executive Summary

This is a content/information-architecture redesign of an existing production portfolio home page, not a greenfield build — the stack (React 19, TanStack Start SSR, Tailwind CSS 4, Framer Motion, Vite 7, Cloudflare Workers) is fixed, and every recommendation in the research works within capabilities the codebase already has (existing `routeSeo()` helper, an already-defined but unrendered `ProjectCard`/`projects` array, existing `useScrollReveal` hook, existing `MethodsSection`). The home page today is structured as an agency/freelancer sales landing page (WhatsApp-first CTAs, service-pitch copy, no case studies rendered, no final contact block); the redesign's job is to re-sequence and re-weight this same content — never delete it — so a recruiter can, within a 6–10 second scan, identify who Murilo is, what he delivers, proof of results, and a working path to act (LinkedIn, e-mail, CV), while the freelance/agency path remains fully reachable but visually and narratively secondary.

The recommended approach is a six-section home page flow — Hero → Social Proof (logos + context) → Case Studies (Problem→Action→Result, currently dead code) → Skills Strip → Methods/How I Work (competency-first reframe) → Final CTA/Contact block (currently missing entirely) — following a promise→proof→action structure with progressive disclosure implemented via routing (links to `/sobre`, `/trabalho`, `/metodos/*`, project routes) rather than new UI widgets. Two defects — a broken CV download link (`/cv/curriculo.pdf` vs. the real `public/cv/CV MURILO ORTEGA 2026.pdf`) and an unconfirmed LinkedIn URL — must be treated as blocking prerequisites of the CTA-hierarchy work, since the entire redesign is worthless if its most prominent new CTAs don't actually work.

The dominant risk is not technical but editorial: producing a "kitchen sink" home page that only adds new recruiter sections on top of old sales sections without demoting/reframing the latter (misreading "don't delete" as "don't reorder"), and writing hedged middle-ground copy that fails to convert either audience. A secondary but concrete risk is a missing hero photo (no professional portrait currently exists in the repo, only grayscale mood images) blocking the highest-priority, highest-trust-impact section. Mitigations are well-documented: strict visual/frequency hierarchy for CTAs (LinkedIn/e-mail/CV dominant, WhatsApp demoted but present), primary/secondary headline structure instead of one blended sentence, explicit resolution of the photo-asset dependency before hero layout work starts, and all restructuring shipped via feature branch (never direct commits to `main`, since pushes auto-sync to the live Lovable-hosted Cloudflare Workers deployment).

## Key Findings

### Recommended Stack

No new dependencies are needed anywhere in this phase. All patterns reuse existing capabilities: extend the existing `Person` JSON-LD (in `__root.tsx`/`index.tsx`) with `ProfilePage`/`mainEntity` fields rather than adding a duplicate schema block; add `CreativeWork` schema for the 5 featured case studies; deliver the hero photo as manually pre-exported static AVIF/WebP/JPEG files via native `<picture>` (no image-pipeline library); fix the CV link as a one-line path correction, ensuring the underlying PDF is tagged/accessible; set a 1200×630 OG image for social/LinkedIn share previews reusing the existing `routeSeo()` wiring; and use Framer Motion's built-in `useReducedMotion()` hook plus the existing `useScrollReveal` pattern for any new hero/section animation, restricted to opacity/transform only.

**Core technologies (all pre-existing, none new):**
- `routeSeo()` (`src/lib/seo.ts`) — extend with a `personSchema`/`profilePage` param rather than forking a second JSON-LD block
- Native `<picture>` + pre-exported AVIF/WebP/JPEG — deliver the new hero photo without a new image-processing dependency
- Framer Motion `useReducedMotion()` + existing `useScrollReveal` hook — accessible, jank-free hero/section animation using only what's already a dependency

### Expected Features

Research confirms the Active requirements already scoped in PROJECT.md are exactly the correct table-stakes and differentiator set — nothing scoped is speculative, and nothing critical is missing from scope. See `.planning/research/FEATURES.md` for the full prioritization matrix.

**Must have (table stakes):**
- Hero: photo + dual headline (hireable role + top delivered result) — blocked on a photo asset that does not yet exist
- Primary CTA cluster (LinkedIn + e-mail + CV) with WhatsApp demoted to secondary — CV link and LinkedIn URL must be fixed/confirmed first
- Contextualized social proof (13 logos + result/context, not a bare logo strip)
- 5 curated case studies with Problem→Action→Result narrative (activates existing but currently unrendered `projects`/`ProjectCard` code)
- Hard + soft skills strip on home (condensed, not duplicated from `/sobre`)
- A final CTA/contact block before the footer (does not exist today — currently no post-scroll conversion moment)

**Should have (competitive differentiators):**
- Case studies framed around business/marketing KPIs, not just visual craft
- Methods/services reframed as "how I work" (competency-first, service-second)
- Explicit but light-touch remote-readiness signal
- Single coherent top-to-bottom scroll narrative acting as a "screening pass" for the recruiter

**Defer (v2+):**
- Interactive case-study filtering by skill/role
- Video/motion case-study previews (also risks repeating the existing GIF-weight performance debt)
- JSON Resume / machine-readable resume endpoint
- CMS-driven content management (site is intentionally hardcoded by design)

### Architecture Approach

This is content/information architecture, not code architecture — the recommended pattern is a promise→proof→action structure with progressive disclosure implemented via routing rather than accordions/modals: each home section shows the minimum needed to build the next belief, then links out to the existing deep page that already holds full depth (`/sobre`, `/trabalho`, `/metodos/<slug>`, individual project routes, `/contato`). No new pages or routes are needed — the deep-content layer already exists in full for every section.

**Major components (all content re-sequencing, not new build):**
1. Hero — reframed dual headline (identity + result), photo, reordered CTA row (LinkedIn/e-mail/CV primary, Ver Portfolio/Sobre secondary) — CV link fixed
2. Case Studies (new render of existing dead code) — 5 cards with P→A→R copy, positioned before Methods, replacing the current agency-pitch "Positioning" block
3. Skills Strip (new) — condensed hard+soft tags, positioned after case studies so claims are pre-validated by proof, linking to `/sobre`
4. Methods/How I Work (existing `MethodsSection`, retained mechanism) — copy reframed competency-first, repositioned after Skills
5. Final CTA/Contact block (new) — repeats LinkedIn/e-mail/CV as primary, WhatsApp/Calendly secondary, closing the funnel that currently has no end-of-page conversion moment

### Critical Pitfalls

1. **"Kitchen Sink Homepage"** — additive-only changes that leave old sales sections at full size/prominence next to new recruiter sections. Avoid by treating "no deletion" as a hosting-location rule, not a hierarchy rule: every existing section stays reachable, but position/size/weight must change.
2. **Middle-ground messaging that resonates with neither audience** — a single blended headline sentence ("Especialista em marca e comunicação") satisfies neither recruiter nor client scan pattern. Avoid via primary/secondary headline structure, recruiter-facing line first.
3. **Shipping the new CTA hierarchy on top of still-broken CV/LinkedIn infrastructure** — elevating a broken action to the most prominent position is worse than the current state. Fix and manually click-test CV download and confirm LinkedIn URL as a blocking sub-task, not a separate backlog item.
4. **CTA hierarchy confusion / competing "primary" styles** — especially a persistent floating/global WhatsApp element that silently overrides content-level hierarchy decisions. Verify with a squint/blur test; audit for any global WhatsApp component independent of section content.
5. **Accidental partial ship via Lovable auto-sync** — every push to `main` auto-deploys; incomplete restructuring landing on `main` mid-plan briefly shows a half-migrated page to real recruiters. All work must happen on a feature branch, merged only when the full plan (hierarchy + CTA fixes + case studies + responsive QA) is complete.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation Fixes & Hero Decision
**Rationale:** The CV link and LinkedIn URL are hard blocking dependencies of every downstream CTA-hierarchy decision, and the missing hero photo is the blocking dependency of the single highest-priority section (per PITFALLS.md Pitfall 4 and Pitfall 8, and FEATURES.md dependency graph). Resolving these first prevents building the redesign's hierarchy on top of broken infrastructure or an undecided asset.
**Delivers:** Working CV download (verified by manual click-test), confirmed LinkedIn URL, resolved hero photo asset (or explicit fallback plan), extended `Person`/`ProfilePage` schema groundwork.
**Addresses:** Table-stakes items "Fixed CV download link," "Confirmed LinkedIn URL," "Hero photo" dependency (FEATURES.md).
**Avoids:** Pitfall 4 (broken primary-CTA infrastructure shipped as prominent), Pitfall 8 (missing photo discovered late as a blocker).

### Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies
**Rationale:** This is the core restructuring work: reframe the hero (dual headline), reorder/re-weight CTAs (LinkedIn/e-mail/CV dominant, WhatsApp demoted), and activate the existing-but-unrendered case-study code with Problem→Action→Result copy. Architecture research shows case studies need to move to position 3 (before Methods), replacing the current agency-pitch "Positioning" block — this is the single highest-leverage change since it fills the biggest content gap on today's page.
**Delivers:** Reframed hero section, visually unambiguous CTA hierarchy, 5 rendered case-study cards with quantified/qualitative outcome lines visible without a click-through.
**Uses:** Existing `projects` array + `ProjectCard` component (STACK.md/ARCHITECTURE.md — dead code to activate), Framer Motion `useReducedMotion()` for hero animation, `useScrollReveal` for case cards.
**Implements:** Sections 1–3 of the recommended six-section flow (ARCHITECTURE.md).

### Phase 3: Skills, Methods Reframe, Social Proof Context & Final CTA
**Rationale:** These sections depend on the hierarchy decisions from Phase 2 (skills should read as validated by the case studies already shown; methods reframing extends the same competency-first vs. vendor-language principle established for the hero) and complete the funnel with a final contact block that doesn't exist today.
**Delivers:** Condensed skills strip (linking to `/sobre`), competency-first reframed Methods copy (existing `MethodsSection`, copy-only change), framing line added to the brand-logo marquee, new final CTA/contact block before the footer.
**Addresses:** "Skills section on home," "Methods reframed competency-first," "Final contact block," "Contextualized social proof" (FEATURES.md table stakes/differentiators).
**Avoids:** Pitfall 6 (self-contradicting vendor vs. employable language), Pitfall 5 (case studies read as gallery not outcome — enforced again here since skills should reinforce, not duplicate, case-study claims).

### Phase 4: QA — Responsive, SEO/Meta, Anchor Links, Squint Test
**Rationale:** Multiple pitfalls are specifically "looks done but isn't" categories that only surface under deliberate verification (PITFALLS.md's dedicated checklist) — mobile-viewport hierarchy, SEO/meta regression, and internal anchor links broken by section reordering are all easy to miss during normal build/review and costly to discover post-ship.
**Delivers:** Verified mobile first-viewport (headline + primary CTA visible without scroll), deliberately reviewed `<title>`/meta description/schema fields, confirmed internal anchor links (`Footer.tsx`, `ContextNav`, other routes) still resolve after reordering, OG image (1200×630) live and tested via a link-preview tool, squint/blur test confirming one dominant CTA, merge-ready feature branch with confirmed Lovable branch panel setting before final merge.

### Phase Ordering Rationale

- **Blocking dependencies come first:** CV link, LinkedIn URL, and hero photo are named as blocking prerequisites across STACK.md, FEATURES.md, and PITFALLS.md independently — building hierarchy/layout on top of them unresolved is explicitly flagged as a top pitfall (Pitfall 4, Pitfall 8), so Phase 1 exists specifically to remove that risk before any visual work begins.
- **Case studies before skills/methods, per architecture research:** ARCHITECTURE.md's "credibility unlocks claims" rationale (skills strip is more credible once cases have already demonstrated proof) drives the Phase 2 → Phase 3 split — hero/CTA/cases form one cohesive "make the page work" phase, while skills/methods/social-proof-context/final-CTA form a "complete the funnel" phase that depends on the former's hierarchy decisions being settled.
- **QA is its own phase, not folded into the last content phase:** PITFALLS.md's "Looks Done But Isn't" checklist and the standing Lovable auto-sync rule apply across the whole restructuring effort, not to any single section — treating QA as Phase 4 ensures mobile, SEO, and anchor-link regressions are checked against the *complete* re-sequenced page, not checked incrementally and then invalidated by later reordering.
- **All phases ship on a feature branch, merged to `main` only at the end of Phase 4** — per Pitfall 11 (accidental partial ship via Lovable auto-sync), this is a standing rule across every phase, not a phase-specific task.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Hero photo decision):** If no usable photo exists at planning time, the fallback treatment (matching the site's existing grayscale/desaturated mood aesthetic) may need a short design-research pass — STACK.md and PITFALLS.md both flag this as content-dependent, not fully resolvable from research alone.
- **Phase 3 (Case study / social proof metric sourcing):** FEATURES.md flags per-client result/metric copy as the single biggest content-risk item in the whole project (may not exist for all 13 logos or all 5 cases) — this is a content-sourcing task, likely needing a research/validation pass with the user rather than being resolvable in code.

Phases with standard patterns (skip research-phase):
- **Phase 2 (Hero/CTA/case-study restructure):** Patterns are well-documented across STACK.md, ARCHITECTURE.md, and FEATURES.md with consistent, corroborated sources (schema.org, OG image conventions, F/Z-pattern scanning, PAR/STAR case-study structure) — implementation is a known quantity.
- **Phase 4 (QA):** Standard web-performance/accessibility/SEO verification practices, all well-established and already partially documented in the codebase's existing conventions (`routeSeo()`, sitemap, existing schema).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Site-specific findings read directly from codebase (HIGH); external patterns (schema.org conventions, OG image sizing, image-delivery best practice) verified against official docs and multiple independent sources (MEDIUM-HIGH); a few points (Cloudflare Image Transformations availability, "hero photo increases recruiter trust" specific claim) are explicitly flagged LOW-MEDIUM/unverified |
| Features | MEDIUM-HIGH | Recruiter-scanning and portfolio-structure findings well corroborated across multiple sources (Ladders eye-tracking study is HIGH-confidence primary research); creative/social-media-specific nuance and remote-hiring signaling are inferred, lower confidence |
| Architecture | MEDIUM-HIGH | Site-specific findings (current home structure, dead code, existing deep pages) read directly from codebase — HIGH confidence; general IA/UX sequencing patterns (promise→proof→action, progressive disclosure) are MEDIUM, cross-referenced across independent sources but applied to this domain by analogy from general landing-page research, not portfolio-specific studies |
| Pitfalls | MEDIUM (project-specific pitfalls HIGH) | UX/conversion pitfall patterns (kitchen-sink homepage, middle-ground messaging, CTA competition) are MEDIUM — cross-referenced across multiple sources but no single authoritative study; project-specific risks (broken CV link, unconfirmed LinkedIn, missing photo, Lovable auto-sync, non-deletion constraint) are HIGH — sourced directly from PROJECT.md's own mapped findings |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Hero photo asset:** Does not exist in the repo today (only grayscale mood images). This is a hard content dependency outside the scope of research — must be resolved with the user (source/commission a photo, or agree an explicit fallback) before Phase 1 hero work can complete. Flagged consistently across STACK.md, FEATURES.md, and PITFALLS.md.
- **Per-case and per-logo metric/result data:** FEATURES.md identifies this as the largest content-sourcing risk in the project — not all 13 client logos or all 5 case studies may have quantifiable metrics available. Needs a content-gathering pass with the user; qualitative framing is an acceptable fallback per case, but should not be silently defaulted to everywhere.
- **LinkedIn URL confirmation:** Currently unverified (not technically broken, but not confirmed as the correct/current profile) — a quick confirmation task, not a research gap, but must not be skipped since it becomes a primary CTA.
- **Cloudflare Image Transformations availability:** Unverified whether the account/plan includes this platform feature — correctly scoped out of this phase's requirements (manual static-asset export is the recommended path instead), but worth a quick check if a future phase wants to reduce manual image-export overhead.
- **International vs. Brazilian-Portuguese audience assumption:** STACK.md flags that if the recruiter audience is confirmed to be primarily English-reading rather than Portuguese-reading, this would affect `lang` attribute, OG `locale`, and copy — currently assumed Portuguese-first based on existing site content, should be explicitly confirmed rather than assumed during roadmap/requirements definition.

## Sources

### Primary (HIGH confidence)
- [Google Search Central — ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page) — official documentation, verified schema properties
- [Schema.org — CreativeWork](https://schema.org/CreativeWork) — official schema reference
- [The Ladders — 6/7.4-second resume eye-tracking study](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count) and [HR Dive coverage](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/) — primary eye-tracking research, corroborated by multiple secondary sources
- Direct codebase inspection: `src/routes/index.tsx`, `src/routes/sobre.tsx`, `src/routes/contato.tsx`, `src/routes/trabalho.tsx`, `src/routes/natrave.tsx`, `src/lib/seo.ts`, `src/routes/__root.tsx`, `.planning/PROJECT.md`, `.planning/codebase/STACK.md`, `.planning/codebase/ARCHITECTURE.md` — ground truth for current implementation, not externally re-verified per milestone instructions

### Secondary (MEDIUM confidence)
- [Webflow — 23 portfolio website examples, best practices](https://webflow.com/blog/design-portfolio-examples)
- [Dribbble Resources — What Design Recruiters Look For In Your UI/UX Portfolio](https://dribbble.com/resources/design-recruiter-portfolio-tips)
- [Matt Olpinski — 12 Things You Should Remove From Your Portfolio Website](https://mattolpinski.com/articles/fix-your-portfolio/)
- [Carl Wheatley (Medium) — Structuring Design Case Studies Using the STAR Method](https://carlwheatley.medium.com/structuring-your-product-design-case-studies-using-the-star-method-34eaae5c2de0)
- WebSearch: "portfolio homepage structure recruiters conversion hero above the fold case studies order" (uxdictionary.io, thecrit.co, blog.uxfol.io, launchnow.design)
- WebSearch: "progressive disclosure landing page information architecture UX best practices" (uxpin.com, logrocket.com, ixdf.org — traceable to Nielsen Norman Group)
- [Rudo — How to Design a Recruitment Website That Attracts Clients and Candidates](https://rudo.co.uk/insights/articles/recruitment-website-design-guide/)
- [UX Collective — Only 30 seconds to reject your portfolio](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674)
- WebSearch: "Open Graph image LinkedIn preview portfolio site best practices dimensions" (ogpreview.app, krumzi.com, featureimg.com — consistent 1200×630 convention)

### Tertiary (LOW confidence)
- [Fueler — Top Online Portfolio Platforms Recruiters Prefer](https://fueler.io/blog/top-online-portfolio-platforms-recruiters-in-the-us-prefer) — vendor content, directional signal only
- WebSearch: "Cloudflare Workers image optimization responsive images React Vite portfolio LCP" — confirms platform capability exists but plan/tier availability unverified for this project
- "Hero photo increases recruiter trust" specific claim — sourced from UX-portfolio industry blogs, not a controlled study, needs validation via user's own observation post-launch

---
*Research completed: 2026-08-04*
*Ready for roadmap: yes*
