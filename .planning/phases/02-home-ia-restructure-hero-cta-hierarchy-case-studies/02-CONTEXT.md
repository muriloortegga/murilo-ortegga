# Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies - Context

**Gathered:** 2026-08-05
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase rebuilds the home page hero (dual headline + full-color photo + recruiter-first CTA cluster) and activates the 5 featured case studies with Problema→Ação→Resultado narratives. It does NOT touch skills, methods reframing, social proof context, or the final contact block — those are Phase 3. It does NOT touch any other page (`/sobre`, `/trabalho`, `/metodos`, `/contato`, individual project pages) — those stay as-is, only linked from the home.

</domain>

<decisions>
## Implementation Decisions

### 5th Featured Case
- **D-01:** The 5th case is **Kapyi** (agência criativa, 2,5 anos, liderança criativa/branding), not Milgrows. User chose this explicitly despite Milgrows having a ready quantifiable metric (+11.000 seguidores) — Kapyi better represents senior/leadership-level experience relevant to the recruiter audience.
- **D-02:** Kapyi has no quantifiable metric on record. Per user's explicit choice, use a **qualitative result line**, sourced only from what already exists on `src/routes/kapyi.tsx` (2.5 anos de liderança criativa, posicionamento premium sustentado para marcas de nichos distintos — engenharia, educação, clínicas, tech). Do NOT invent a number or fabricate a metric for Kapyi under any circumstance.
- **Final 5 cases, confirmed:** NaTrave (Branding & UX/UI), Symplice (Naming & ID Visual), Maxi (Social Media & OOH), Solid+ (Direção & ID Visual, mercado internacional), Kapyi (Direção Criativa & Branding, agência).

### Claude's Discretion
- **Hero headline copy (HERO-01):** User did not discuss this now (declined when offered). Draft 2-3 headline options during planning/execution — line 1 states hireable role in standard market terminology (e.g. "Branding & Social Media Designer" / "Diretor de Arte & Social Media" — avoid invented titles per research ANTI-features), line 2 states a delivered result. Present drafts to the user at the plan-review or execution checkpoint rather than shipping unreviewed marketing copy silently — this is subjective/creative territory, not a pure implementation detail.
- **Photo-on-dark-canvas compositing (open item from `01-HERO-PHOTO.md` §7):** User did not discuss this now. `01-HERO-PHOTO.md` names three options (feathered/gradient mask, hard-edge card, cutout/matte) without pre-judging. Planner/executor should pick a treatment consistent with the site's "dark mode, editorial, minimalist, premium" aesthetic (PROJECT.md constraint) — a gradient/mask blend is the safer default to avoid a jarring white rectangle on a dark page, but this is not locked; flag the choice in the plan for visibility rather than deciding silently.
- **Case narrative content for the other 4 cases (NaTrave, Symplice, Maxi, Solid+):** User did not re-discuss this (research had flagged content-sourcing as the single biggest risk in the project, but the user only chose to resolve the 5th-case decision this round). Per the code scout below, real content already exists and must be used as-is, condensed — NEVER fabricate a metric, client name, or outcome not already published on that project's own page:
  - NaTrave: quantifiable metric available — `followers={2250}` engagement/growth stat in `src/routes/natrave.tsx`.
  - Milgrows had `followers={11000}` but is NOT one of the 5 (not selected — see D-01).
  - Symplice, Maxi, Solid+: no follower/growth metric found in a quick scout of their route files — their existing copy centers on brand positioning/delivery ("simplicidade estratégica", "alto desempenho institucional", "solidez e confiança para fintech"). Use qualitative framing for these three, condensed from their existing page copy (same PROOF-02 fallback pattern applied to Kapyi).
- **`sizes` attribute and hero container/layout dimensions:** Explicitly left open by `01-HERO-PHOTO.md` §6 — this phase's own UI-SPEC (via `/gsd:ui-phase`) should resolve it, not this discussion.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project-level
- `.planning/PROJECT.md` — full project context and non-negotiable constraints
- `.planning/REQUIREMENTS.md` — HERO-01..04, CASE-01..03, ANTI-02/03/04/05 are this phase's requirements
- `.planning/ROADMAP.md` — Phase 2 goal and success criteria

### Phase 1 handoff (hard dependency)
- `.planning/phases/01-foundation-fixes-hero-decision/01-HERO-PHOTO.md` — **MANDATORY.** The complete FIX-03 decision record: source photo, crop, full-color treatment, 6 exported file paths (`public/assets/home/hero/murilo-hero-{480,960,1440}.{jpg,avif}`), the `<picture>` markup sketch with `loading="eager"` + `fetchPriority="high"`, the explicit instruction NOT to use `ProjectMedia` for this image, and the open items (photo-on-dark-canvas treatment, `sizes` attribute) listed above.
- `.planning/phases/01-foundation-fixes-hero-decision/01-01-SUMMARY.md`, `01-02-SUMMARY.md`, `01-03-SUMMARY.md` — what Phase 1 actually shipped (corrected LinkedIn URL `https://www.linkedin.com/in/murilo-ortega`, corrected CV href `/cv/CV%20MURILO%20ORTEGA%202026.pdf`, hero photo assets ready)

### Research
- `.planning/research/SUMMARY.md`, `ARCHITECTURE.md`, `FEATURES.md`, `PITFALLS.md`, `STACK.md` — recommended 6-section flow, anti-features (no skill bars, no generic greeting, no full project dump, WhatsApp never dominant, no new heavy hero animation), Person/ProfilePage + CreativeWork schema patterns

### Codebase map
- `.planning/codebase/ARCHITECTURE.md` — confirms the `projects` array + `ProjectCard` component in `src/routes/index.tsx` exist but are currently **dead code** (never rendered) — this is the activation target for CASE-01/02/03
- `.planning/codebase/CONVENTIONS.md` — naming, `cn()` usage, component patterns to follow

### Existing case-page content (source of truth for case narratives — read directly, do not paraphrase from memory)
- `src/routes/natrave.tsx` — has a quantifiable metric (`followers={2250}`)
- `src/routes/symplice.tsx`, `src/routes/maxi.tsx`, `src/routes/solid.tsx` — qualitative positioning copy, no follower metric found
- `src/routes/kapyi.tsx` — the confirmed 5th case; qualitative only per D-02, `AbordagemEstrategica` component has the 3-pillar framing (Estratégia, Identidade, Consistência) usable as source material

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/routes/index.tsx` — `projects` array (currently includes NaTrave, Solid+, Kmillion, Symplice, Evidive, Talk2Buy — will need to be redefined to the 5 confirmed cases) and `ProjectCard` component already exist but are unused in `HomePage`'s JSX — activate/adapt rather than build from scratch
- `HeroGallery()` in `src/routes/index.tsx` (~lines 149-165) — only existing precedent for `loading="eager"` + `fetchPriority="high"` on an above-the-fold image

### Established Patterns
- `useScrollReveal` hook — existing scroll-triggered animation pattern, likely reusable for case cards
- `cn()` helper — standard conditional class composition

### Integration Points
- Home page CTA row currently has 3 links (`/trabalho`, `/sobre`, CV download) — HERO-03/04 restructure this into the recruiter-first cluster (LinkedIn + email + CV primary, "Ver Portfolio" secondary)
- Case cards link out to individual project routes (`/natrave`, `/symplice`, `/maxi`, `/solid`, `/kapyi`) which already exist and are untouched by this phase

</code_context>

<specifics>
## Specific Ideas

None beyond the 5th-case decision — user declined to go deeper into headline copy, full case-content sourcing, or the dark-canvas photo treatment in this round.

</specifics>

<deferred>
## Deferred Ideas

- Exact hero headline copy — not decided, see Claude's Discretion above; should be presented back to user for approval, not shipped silently.
- Photo-on-dark-canvas compositing choice — not decided, see Claude's Discretion above.
- Full case-content sourcing/writing pass for NaTrave, Symplice, Maxi, Solid+ — user did not walk through each case's exact copy line-by-line; Claude's Discretion default is to condense only from what's already published on each project's own page, never invent.

### Reviewed Todos (not folded)
None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-Home IA Restructure — Hero, CTA Hierarchy, Case Studies*
*Context gathered: 2026-08-05*
