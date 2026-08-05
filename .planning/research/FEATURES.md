# Feature Research

**Domain:** Personal portfolio home page for a creative professional (branding/social media/design/marketing), redesigned to convert remote-job recruiters as primary audience, freelance/agency clients as secondary
**Researched:** 2026-08-04
**Confidence:** MEDIUM-HIGH (recruiter-scanning and portfolio-structure findings are well corroborated across multiple sources; creative/social-media-specific nuance and remote-hiring signaling are inferred and lower confidence — see notes)

## Feature Landscape

### Table Stakes (Recruiters Expect These — Missing = Bounce or Can't Evaluate)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero with photo + dual headline (role/value prop + top result) | Recruiters scan in F/Z-pattern; top-left is the first and heaviest-weighted fixation point. A face humanizes and builds trust faster than a mood image; headline must state *what role you're hireable for* in industry-standard terms, not just a greeting | LOW | Already scoped in PROJECT.md Active. Headline must lead with value, not "Olá, sou o Murilo" — see Anti-Features |
| Primary contact cluster above the fold or in first screen: LinkedIn, email, CV download | 47% of recruiters spend 30s–1min on a candidate; if LinkedIn/email/CV aren't found in seconds they leave. Recruiters expect one place with everything, not a hunt across pages | LOW | Already scoped. CV link is currently broken (`/cv/curriculo.pdf` → real file `public/cv/CV MURILO ORTEGA 2026.pdf`) — must fix as part of this feature, not a separate task |
| Curated case studies (3–5, not a full list) with Problem → Action → Result narrative | Recruiters explicitly look for problem-solving evidence, not just visuals. Full project dumps overwhelm and dilute — "include every project" is a named top mistake in portfolio-mistake research | MEDIUM | Already scoped (5 cases: NaTrave, Symplice, Maxi, Solid+, +1). PAR/STAR structure (Situation/Problem → Action → Result) is the industry-standard case-study skeleton for design/marketing portfolios |
| Contextualized social proof (logos + what was delivered/result), not bare logo strip | Bare logo walls are decorative and don't answer "what did this person actually do for these brands." Recruiters want proof-of-work, not name-dropping | MEDIUM | Already scoped. Content risk: not all 13 logos may have a quantifiable metric available — some may need qualitative framing ("6-month brand retainer") instead of a %/number. Flag for content-sourcing phase |
| Skills section (hard + soft) surfaced on home, not only on `/sobre` | Recruiters scanning a home page in seconds need a fast skills read without a second page-load/navigation; soft skills matter more for creative/marketing roles that involve stakeholder collaboration | LOW-MEDIUM | Already scoped. Use tag/list or short grouped format — avoid skill-level graphs/percentage bars (see Anti-Features) |
| Visible navigation to deeper pages (`/sobre`, `/trabalho`, `/metodos`, `/contato`) | Recruiters who want more depth (full project list, full bio) need one click, not a search. Hidden/hamburger-only nav is a named mistake for professional portfolios | LOW | Nav already exists in codebase; verify it stays visible/obvious in the redesigned home, don't collapse it behind a hamburger on desktop |
| Mobile-responsive layout | 60%+ of recruiter portfolio reviews happen on mobile (between meetings, during commute); this is now a baseline expectation, not a differentiator | LOW | Tailwind 4 stack already responsive; verify hero/case cards/CTA cluster specifically, since these are the new/restructured elements |
| Fast-loading hero (no new heavy assets) | Recruiters bounce fast; a slow-loading first screen kills the 7-second scan window before it starts | LOW-MEDIUM | Constraint carries over from existing GIF-weight issue (out of scope to fix existing GIFs, but the redesign must not introduce a new heavy hero asset — hero photo should be optimized) |
| Grammar/spelling/visual polish, no placeholder or broken links | Recruiters read attention-to-detail in a portfolio as a proxy for attention-to-detail in work; typos/broken links are named as a top credibility killer | LOW | Directly relevant: broken CV link and unconfirmed LinkedIn URL are both flagged in PROJECT.md Context — both must be resolved as part of this phase |
| Industry-standard role terminology | Recruiters (and their internal ATS/keyword scanning habits) look for scannable, standard titles ("Social Media Designer," "Brand Designer," "Art Director") not invented titles ("Creative Wizard") | LOW | Pure copy decision, no engineering cost — apply to headline, nav labels, and skills section |

### Differentiators (Competitive Advantage for This Specific Candidate)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Case studies framed around business/marketing KPIs, not just visual craft | Most creative-field portfolios are visual-only ("here are pretty logos"). A social-media/branding portfolio that shows engagement lift, campaign reach, retention, or conversion impact reads as "this person thinks like a marketer," which is exactly what Social Media/Marketing recruiters screen for | MEDIUM | Directly aligned with Core Value in PROJECT.md ("resultados que já entregou, via cases reais, não só imagens bonitas"). Requires real metrics per case — content-sourcing dependency |
| Methods/services reframed as "how I work" (competency/process) before "service you can hire" | Standard agency portfolios pitch services to buy. Reframing `/metodos` content as demonstrated professional process first (with the bookable-service angle as a secondary layer) reads as operating maturity to a recruiter evaluating a potential employee, not a vendor | MEDIUM | Already scoped as an Active requirement — this is a copy/hierarchy exercise, not new content |
| Resume-scan-optimized layout exploiting known F/Z-pattern fixations | Eye-tracking research on resume/portfolio scanning shows ~80% of attention concentrates in the top third and follows a predictable path. Deliberately placing headline (top-left), proof/logos (top-right or immediately below), then cases in that reading order measurably increases the odds the recruiter absorbs the pitch before they'd naturally bounce | MEDIUM | Layout/IA decision for whoever builds the redesign; not a new content requirement, a sequencing one |
| Explicit remote-readiness signal | Candidate is applying specifically to remote roles; most freelance/agency portfolios never address async collaboration, timezone overlap, or remote-tooling fluency, so stating it explicitly differentiates from portfolios that read as "local freelancer" by default | LOW | Light-touch: a short line near the hero or contact block (e.g. "Disponível para posições remotas, colaboração assíncrona"). Do not overbuild — a timezone widget or calendar-booking tool is out of scope/overkill for a portfolio home page |
| AI/management tool-stack teaser (link/pointer to `/sobre`) | 2026 hiring in creative/marketing roles increasingly screens for AI-fluency in workflow. This already exists on `/sobre` — a one-line teaser or icon row on home (not the full stack) signals modern practice without duplicating content | LOW | Should be a teaser, not a full section — the home page's job is triage, not exhaustive documentation |
| Single-scroll narrative arc structured as a "screening pass" | A home page that reads top-to-bottom as hero → proof → cases → skills → methods → contact mirrors how a recruiter would want to build a mental case for the candidate, reducing the need to jump between pages before deciding to reach out | MEDIUM | This is effectively the assembly of the other features above into one coherent sequence — the real "differentiator" is the information architecture, not any single section |

### Anti-Features (Seem Reasonable, Actively Hurt Recruiter Conversion)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| Skill-level graphs/percentage bars ("Photoshop 90%, Illustrator 85%") | Feels like a fast, visual way to communicate proficiency | Undermines positioning by visually foregrounding weaknesses next to strengths, and the numbers are inherently arbitrary/unverifiable — recruiters read them as noise, not signal | Grouped skill tags/lists (hard skills, soft skills, tools) with proof living in the case studies, not in a self-rated bar |
| Generic personal-greeting hero copy ("Olá, eu sou o Murilo") with no value stated | Feels warm/personal, humanizes the candidate | Wastes the highest-value screen real estate (first fixation point) on information the recruiter doesn't need yet; delays the "what does this person do and is it relevant to my role" answer | Lead with the professional value prop + result in the headline; save warmth for photo + tone of voice, not headline copy |
| Full project list replicated on home (all 11 case pages) | Feels thorough — "why hide work?" | Directly contradicts curated-case-study best practice; overwhelms the scan window and dilutes the 5 strongest stories the candidate wants surfaced | Keep 5 curated cases on home with clear "ver todos os projetos" link to `/trabalho` for recruiters who want depth |
| WhatsApp/orçamento styled as the dominant or first CTA | It's the current site's default pattern and technically "works" | Signals "hire me for a project" (agency framing) over "hire me for a role" (employment framing) to the primary new audience — actively works against the repositioning goal stated in PROJECT.md | Keep WhatsApp CTA visually present but subordinate (smaller weight, later position, secondary color/button style) to LinkedIn/email/CV — see Dual-Audience CTA Guidance below |
| Contact form as the primary/only contact mechanism | Feels safer/more controlled than exposing email directly | Recruiters skimming in seconds prefer a direct, frictionless channel (mailto:, LinkedIn message) over filling a form and waiting for a reply — forms are for lead-qualification funnels, not recruiter outreach | Direct LinkedIn + mailto + CV download as primary; a contact form (if kept at all) belongs to the freelance/agency secondary path, not the recruiter path |
| Hamburger-only navigation on desktop | Clean, minimal, on-trend | Adds a click/discovery cost for a recruiter who wants to jump to `/sobre` or `/trabalho`; named explicitly as a portfolio mistake in research | Keep primary nav items visible/legible on desktop; hamburger (if used) reserved for mobile viewport only |
| Hobbies/personal-interest content, humor, or attempted personality copy on home | Feels differentiating, "shows personality" | Recruiters are evaluating professional capability under time pressure; humor risks landing wrong with an unknown reader, and hobby content reads as amateurish filler when the goal is a fast professional read | Save personality/voice for tone of the case-study writing and visual design language, not dedicated "fun facts" content blocks |
| Overemphasizing age or downplaying/hiding location (São Paulo) | Concern that non-hub geography or experience-length reads as a liability for remote-hiring recruiters | Age mentions invite bias and add nothing; hiding location can look evasive. Neither serves the recruiter's actual question, which is timezone/collaboration fit | Frame location neutrally and remote-forward: "São Paulo (GMT-3) — disponível para times remotos" rather than omitting it or over-explaining it |
| New heavy hero animation/video background introduced during this redesign | Motion feels premium, matches "editorial" aesthetic goal | Adds load-time risk on the exact screen where the 7-second scan window is most punishing, and risks reading as "agency landing page flash" rather than "professional profile" to a recruiter | Keep Framer Motion use restrained on hero (subtle fade/entrance only); reserve richer motion for case-study transitions deeper in the page where the recruiter has already opted in |

## Dual-Audience CTA Guidance (Freelance/Agency as Secondary, Not Hidden)

The constraint is that WhatsApp/orçamento CTAs must remain reachable — the freelance/agency business line stays real and active — but must not compete visually or narratively with the recruiter path. Patterns to apply, based on the research above:

- **Visual hierarchy, not removal.** Primary CTA cluster (LinkedIn, email, CV) gets the dominant button style/position in the hero and the final contact block. WhatsApp gets a secondary button style (outline/ghost, smaller, or grouped under a "Precisa de um projeto sob demanda?" microcopy label) in the same block, not a separate hidden page.
- **Sequence, not concealment.** Recruiter-path CTAs appear first (hero, and again first in the closing contact block); freelance-path CTA appears after, framed as an alternative for a different kind of visitor rather than the default action.
- **Framing language does the work.** "Métodos/serviços" section leads with competency/process language for the recruiter read; a single closing line or secondary CTA ("Disponível também para projetos avulsos via Eme Creative Hub") carries the freelance path without needing its own dedicated section on home.
- **No dead ends either direction.** Both paths must resolve to a real action (LinkedIn/email/CV vs. WhatsApp) — the goal is weighting, not gatekeeping, consistent with PROJECT.md's non-negotiable "no existing content gets excluded."

## Feature Dependencies

```
Hero photo + dual headline
    └──requires──> Professional photo asset (does not currently exist in repo — pending user decision, BLOCKING)

CV download CTA
    └──requires──> Corrected file path (real asset exists: public/cv/CV MURILO ORTEGA 2026.pdf — LOW effort fix)

LinkedIn CTA
    └──requires──> User confirmation of correct LinkedIn URL (currently unverified, not technically broken)

Contextualized social proof (logos + result)
    └──requires──> Per-client result/metric copy sourcing (may not exist for all 13 logos — content risk)

5 featured case studies (PAR narrative)
    └──requires──> Final selection confirmed (NaTrave, Symplice, Maxi, Solid+, +1 of Milgrows/Kapyi)
    └──requires──> Metric/result data per case for the "Result" beat (same dependency as social proof)

Skills section on home
    └──enhances──> Case studies (skills claimed should be visibly demonstrated in the cases shown)
    └──requires──> Condensed extraction from existing /sobre content (not a full copy)

Methods/services reframed as competency-first
    └──requires──> Copy rewrite of existing /metodos summaries (content exists, hierarchy/framing changes)

Dual-audience CTA weighting
    └──conflicts (softly)──> WhatsApp-first pattern from current production site (must be actively de-prioritized, not just left as-is)
```

### Dependency Notes

- **Hero photo is the single blocking dependency for the highest-priority table-stakes feature.** No photo asset currently exists in the repo (only grayscale mood/background images). This should be resolved first, before layout work depending on it proceeds.
- **Metric/result data is a shared dependency** across social proof and all 5 case studies — sourcing this content (even qualitatively where hard numbers aren't available) is the single biggest content-risk item for this phase, larger than any engineering task.
- **Skills-on-home enhances rather than duplicates `/sobre`** — the dependency is "extract and condense," not "rebuild." Treat as a content/copy task, not new information architecture.
- **Dual-audience CTA weighting conflicts with the current production default** (WhatsApp-forward), so it needs to be treated as an explicit redesign decision applied consistently everywhere a CTA appears on home (hero, methods section, closing contact block), not a one-off change in a single component.

## MVP Definition

### Launch With (v1)

This maps directly to the Active requirements already scoped in PROJECT.md — research confirms all of these are table stakes or directly-requested differentiators, none are speculative additions.

- [ ] Hero: photo + dual headline (hireable role + top result) — table stakes, blocked on photo asset
- [ ] Primary CTA cluster (LinkedIn + email + CV) with WhatsApp secondary — table stakes + differentiator (dual-audience weighting)
- [ ] Contextualized social proof (13 logos + result/context) — table stakes
- [ ] 5 featured cases with Problem → Action → Result narrative — table stakes
- [ ] Hard + soft skills section on home — table stakes
- [ ] Methods/services reframed as competency-first, service-second — differentiator, already scoped
- [ ] Final contact block (LinkedIn/email/CV primary, WhatsApp secondary) — table stakes
- [ ] Fixed CV download link — table stakes (credibility/attention-to-detail)
- [ ] Confirmed LinkedIn URL — table stakes

### Add After Validation (v1.x)

- [ ] Explicit remote-readiness line/microcopy — low-cost differentiator, can be layered onto hero or contact block once core structure is validated
- [ ] AI/management tool-stack teaser linking to `/sobre` — low-cost differentiator, non-blocking
- [ ] Layout tuning based on real recruiter/user feedback (F-pattern placement refinement) — needs the v1 structure live first to observe actual scan behavior

### Future Consideration (v2+)

- [ ] Interactive filtering of case studies by skill/role type (e.g. "show me Social Media work only") — adds engineering complexity (state/filtering logic) not justified until there's a larger case library on home or evidence recruiters want to filter
- [ ] Video/motion case-study previews — higher production and performance cost, and risks the "heavy asset" pitfall already flagged as debt (GIFs); defer until existing asset-weight issue is addressed
- [ ] CMS-driven content management for cases/skills/proof — the whole site is intentionally hardcoded per current architecture; only worth revisiting if content update frequency increases significantly

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|----------------------|----------|
| Hero photo + dual headline | HIGH | MEDIUM (blocked on asset) | P1 |
| Primary CTA cluster w/ CV fix | HIGH | LOW | P1 |
| Contextualized social proof | HIGH | MEDIUM (content sourcing) | P1 |
| 5 featured cases (PAR narrative) | HIGH | HIGH (content sourcing + layout) | P1 |
| Skills section on home | MEDIUM | LOW | P1 |
| Methods reframed competency-first | MEDIUM | MEDIUM (copy rewrite) | P1 |
| Final contact block | HIGH | LOW | P1 |
| Dual-audience CTA weighting (WhatsApp secondary) | HIGH | LOW | P1 |
| Remote-readiness microcopy | MEDIUM | LOW | P2 |
| AI/tool-stack teaser | LOW-MEDIUM | LOW | P2 |
| Interactive case filtering | LOW (at current content volume) | MEDIUM | P3 |
| Video/motion case previews | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for this phase (matches PROJECT.md Active scope)
- P2: Should have, low-cost additions once P1 structure is stable
- P3: Defer — not justified at current content volume or given existing asset-weight debt

## Competitor Feature Analysis

No individual named competitor portfolios were deep-dived in this research pass (out of scope for this question); instead, patterns below are synthesized from cross-source research on recruiter-facing portfolios and resume-style candidate profiles generally (Webflow, Dribbble, Indeed, ADPList, standout-cv, Ladders eye-tracking study).

| Pattern | How it's commonly done | Our approach |
|---------|------------------------|--------------|
| Resume-style "everything in one place" pages (e.g. Fueler-style proof-of-work portfolios) | Single page bundles resume, links, and project proof so recruiters never leave | Home page already positioned this way per PROJECT.md Core Value — this research confirms the pattern is correct, not a novel risk |
| LinkedIn "featured" section pattern | Pin best work + resume + portfolio link at the top of the profile for fast scanning | Mirrors the hero + primary CTA cluster requirement — validates leading with CTA cluster near the top rather than burying it after full case studies |
| Design-portfolio case study structure (STAR/PAR) | Situation/Problem → Action → Result, used across UX/product/marketing portfolio guidance | Directly matches the Active requirement for 5 cases with problem→ação→resultado — no gap found |
| "12 things to remove" style portfolio-hygiene guidance (Olpinski et al.) | Strip hobbies, skill-graphs, humor, fictional titles, hamburger-only nav | Directly informs the Anti-Features table above |

## Sources

- [Webflow — 23 portfolio website examples, best practices](https://webflow.com/blog/design-portfolio-examples) — MEDIUM confidence, general best-practice roundup
- [The Interview Guys — How to Make a Portfolio Website That Gets You Hired](https://blog.theinterviewguys.com/how-to-make-a-portfolio-website-that-gets-you-hired/) — MEDIUM confidence
- [Dribbble Resources — What Design Recruiters Look For In Your UI/UX Portfolio](https://dribbble.com/resources/design-recruiter-portfolio-tips) — MEDIUM confidence, design-recruiter specific
- [ADPList — What do recruiters/hiring managers look for in a design portfolio?](https://adplist.org/neighborhood/question/6c05abfc-0d46-4b1c-b54a-68ca203f5e25) — MEDIUM confidence, practitioner community source
- [Squarespace — 4 things recruiters look for in a design portfolio](https://www.squarespace.com/press-coverage/2014/8/6/4-things-recruiters-look-for-in-a-design-portfolio) — MEDIUM confidence (older but consistent with newer sources)
- [The Ladders — 6/7.4-second resume eye-tracking study](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count) and [HR Dive coverage](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/) — HIGH confidence, primary eye-tracking research, corroborated by multiple secondary sources (ResumeHeatMap, Standout-CV)
- [ResumeHeatMap — 6 Fixation Points Recruiters Hit](https://resumeheatmap.com/eye-tracking-study) — MEDIUM confidence, synthesizes eye-tracking data
- [Matt Olpinski — 12 Things You Should Remove From Your Portfolio Website](https://mattolpinski.com/articles/fix-your-portfolio/) — MEDIUM confidence, single practitioner source but internally consistent with cross-source patterns (skill graphs, hobbies, humor, hamburger nav all corroborated elsewhere)
- [Carl Wheatley (Medium) — Structuring Design Case Studies Using the STAR Method](https://carlwheatley.medium.com/structuring-your-product-design-case-studies-using-the-star-method-34eaae5c2de0) — MEDIUM confidence
- [Fueler — Top Online Portfolio Platforms Recruiters Prefer](https://fueler.io/blog/top-online-portfolio-platforms-recruiters-in-the-us-prefer) — LOW-MEDIUM confidence, vendor content but relevant proof-of-work trend signal
- Project-internal source: `.planning/PROJECT.md` (existing scoped Active requirements, cross-checked against this research rather than duplicated)

---
*Feature research for: personal portfolio home page, recruiter-facing (creative/marketing roles), secondary freelance/agency positioning*
*Researched: 2026-08-04*
