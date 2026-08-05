# Pitfalls Research

**Domain:** Dual-audience portfolio home page redesign (recruiter-primary, freelance-client-secondary), non-destructive IA restructuring on an existing production site with dark/editorial aesthetic and Lovable auto-sync
**Researched:** 2026-08-04
**Confidence:** MEDIUM (UX/conversion patterns verified across multiple independent sources; project-specific risks derived directly from PROJECT.md constraints — HIGH confidence on those)

## Critical Pitfalls

### Pitfall 1: "Kitchen Sink Homepage" — Addition Without Subtraction

**What goes wrong:**
Because the project's non-negotiable constraint is "nothing existing may be deleted," the natural failure mode is to bolt every new recruiter-facing section (skills, hero headline, competency block) on top of the existing sales-oriented sections without demoting or compressing the latter. The home page grows longer and denser instead of gaining hierarchy. The result looks like two separate home pages stitched together — a recruiter has to scroll past agency-pitch content to find what they need, which defeats the entire purpose of the redesign.

**Why it happens:**
"Don't delete" gets misread as "don't touch order or prominence." Teams under a non-destructive constraint default to purely additive changes because reordering/demoting feels riskier than appending. It's also the path of least effort: new section goes at the top (for the new priority audience), old sections stay exactly as they were (for safety), nothing is edited down.

**How to avoid:**
Treat "no deletion" as a hosting-location rule, not a hierarchy rule. Every existing section stays reachable (same content, same or improved copy) but its *position, size, and visual weight* on the home page must change to reflect the new priority. Sales-oriented copy (orçamento, "contrate meu serviço") gets rewritten to competency-first framing and pushed lower/smaller; nothing is removed from the site, but the home page's job is to summarize and route, not to contain everything. If a section doesn't serve the recruiter-scan-in-10-seconds goal, it belongs further down the page or is compressed to a single line + link to the full page (`/sobre`, `/metodos`, `/trabalho`) rather than being fully rendered on the home.

**Warning signs:**
- Home page word count / scroll length grows significantly from the current version.
- New recruiter sections and old sales sections read in noticeably different voices back-to-back.
- No existing section had its heading, length, or position changed — only additions were made.

**Phase to address:**
Home IA & CTA hierarchy plan (the core restructuring work) — should be validated before any visual polish work starts.

---

### Pitfall 2: Middle-Ground Messaging That Resonates With Neither Audience

**What goes wrong:**
Trying to write one hero headline/value proposition that speaks to both "hire me as an employee" and "hire my studio for a project" often produces generic language ("Especialista em marca e comunicação") that is vague enough to avoid alienating either audience — and specific enough to compel neither. This is the single most common failure pattern in dual-audience conversion pages (recruitment platforms, portfolio sites, agency sites serving both B2B and hiring audiences) per UX/conversion research (MEDIUM confidence, cross-referenced across multiple sources).

**Why it happens:**
Writers instinctively hedge when they know two different readers will see the same sentence. The safe, broad claim feels like it "covers" both, but recruiters scan for role fit and outcome-language, while prospective clients scan for service/deliverable language — a hedge satisfies neither scan pattern.

**How to avoid:**
Use a primary/secondary headline structure instead of one blended sentence — this is already implied by the Active requirement ("headline dupla: profissional contratável + resultado entregue"). The *first* line addressed should be unambiguously recruiter-facing (role, seniority, remote-readiness, outcome), because that's the now-primary audience; a secondary line or sub-headline can carry the "also available for freelance/agency projects" framing without requiring the primary line to compromise. Never merge the two into a single generic sentence.

**Warning signs:**
- The hero headline could be read aloud to five people and none of them could say confidently "this person is looking for a job" or "this person is a hired vendor."
- The word "soluções" or "especialista em comunicação" (vague generalist phrasing) appears in the primary headline.

**Phase to address:**
Home IA & CTA hierarchy plan — specifically the hero copy sub-task.

---

### Pitfall 3: CTA Hierarchy Confusion (Recruiter vs. Freelance-Client Actions Competing)

**What goes wrong:**
The Active requirements specify LinkedIn + e-mail + CV as primary and WhatsApp/orçamento as secondary — but if both sets of CTAs are visually similar in size, color, and repetition frequency across the page, recruiters will be uncertain which action is "for them," and some will default to WhatsApp (the historically dominant CTA on this site) simply because it's the most familiar/visible pattern, sending recruiter traffic into a sales conversation flow that doesn't fit their intent (they don't want to "solicitar orçamento," they want to review fit and reach out professionally). This actively damages the recruiter's trust in the redesign's premise.

**Why it happens:**
Repeating the same CTA block (e.g., a floating WhatsApp button, or a footer CTA that hasn't been touched since the agency-first version) is an easy oversight when "no deletion" makes teams reluctant to reduce WhatsApp's visual footprint. Additionally, WhatsApp CTAs are often implemented as sticky/floating elements that persist across scroll regardless of section-level hierarchy changes — so even a well-ordered page can have a competing floating CTA undermining the intended hierarchy.

**How to avoid:**
Apply hierarchy through frequency, size, and position — not just order. LinkedIn/e-mail/CV should appear as the dominant, styled CTA in the hero and the final contact block; WhatsApp should appear once, smaller, and framed explicitly as the freelance/project-inquiry path (e.g., a labeled secondary link, not a repeated floating button). Any global/floating WhatsApp element (common in this codebase's prior agency-first design) must be audited — if it persists across the whole page independent of section, it silently overrides every hierarchy decision made in content. Ask: if a recruiter's eye lands anywhere on the page, is LinkedIn/e-mail/CV still the most prominent actionable element?

**Warning signs:**
- More than one CTA style/color reads as "primary" at first glance.
- A WhatsApp element is present in more than 2 places on the home page (e.g., floating button + hero + footer).
- The CV/LinkedIn CTA only appears once, at the very bottom, while WhatsApp appears earlier or more often.

**Phase to address:**
Home IA & CTA hierarchy plan. Verify with a 5-second squint test (blur the page, screenshot, ask "what should I click?") before considering this plan done.

---

### Pitfall 4: Shipping the New Hierarchy on Top of Broken Primary-CTA Infrastructure

**What goes wrong:**
The redesign's entire premise is "recruiter clicks LinkedIn/e-mail/CV, easily, in seconds." But per the project's own mapped findings, the CV download link currently points to a non-existent file (`/cv/curriculo.pdf` vs. the real `public/cv/CV MURILO ORTEGA 2026.pdf`), and the LinkedIn URL is unconfirmed. If the IA/hierarchy work ships without these being fixed and verified, the redesign elevates a broken action to the most prominent position on the page — actively worse than the current state, where CV wasn't the focal point and its brokenness was less consequential.

**Why it happens:**
Content/IA restructuring and "small bug fixes" get planned as separate, lower-priority tasks, and infrastructure fixes are easy to defer because they don't look like "the real work" of a redesign. But here the bug fix is a hard dependency of the redesign's own success criteria (Core Value: "consegue agir... sem que nada... seja perdido").

**How to avoid:**
Fix and manually verify (click-test, not just code-read) the CV download link and confirm the LinkedIn URL with the user *before or alongside* — never after — making them the primary CTA. Treat this as a blocking sub-task of the CTA hierarchy plan, not a separate "fix bugs" backlog item.

**Warning signs:**
- CV link and LinkedIn URL are listed as separate Active items rather than gated dependencies of the CTA-hierarchy work.
- No manual click-through test exists in the plan's done-criteria.

**Phase to address:**
Home IA & CTA hierarchy plan — first sub-task, before any visual/hierarchy work is considered complete.

---

### Pitfall 5: Case Studies as Gallery Instead of Business-Outcome Narrative

**What goes wrong:**
The current site's project pages/home likely lean toward "pretty final image" presentation (typical of agency/freelance portfolios optimized to impress prospective clients aesthetically). Recruiters — especially for Social Media, Branding, Marketing, and Design roles — scan case studies for measurable outcomes and process/thinking, not just visual polish. A gallery-style case study ("here's the logo, here's the campaign key visual") that never states the problem or the result reads as "portfolio piece" to a recruiter, not "evidence this person can do the job," even if the same case study fully satisfies a prospective client.

**Why it happens:**
Editorial/premium visual design naturally emphasizes large, clean imagery; captions and outcome text are often treated as secondary/optional because they can feel like they clutter the aesthetic. This is compounded by "the visual language must not change" — teams may over-index on preserving imagery-first layout and under-index on adding the problem→ação→resultado text layer the Active requirements already call for.

**How to avoid:**
The Active requirement (5 cases with narrative problema → ação → resultado) already targets this correctly — the pitfall is in execution: keep the outcome/impact line concise, quantified where possible (e.g., "aumento de X% em engajamento," "lançamento em N mercados"), and positioned so it's readable within the same 5-10 second scan as the visual, not hidden in a click-through-only detail. This serves both audiences: the outcome line proves capability to recruiters and proves ROI to prospective clients — it doesn't need two different versions.

**Warning signs:**
- Case study blurbs on the home describe *what was made* ("campanha para Instagram") without *what changed* (engagement, reach, conversion, brand recognition).
- The "resultado" is only available by clicking into the full project page, not visible in the home-page summary.

**Phase to address:**
Featured case studies plan (5-cases-on-home sub-task).

---

### Pitfall 6: Self-Contradicting Positioning — Vendor Language Undermines "Employable" Framing (and Vice Versa)

**What goes wrong:**
"Métodos/serviços" reframed as competências still risk carrying vendor-signaling language (pricing hints, "pacotes," "orçamento," "atendimento a clientes") near the top of the home page. To a recruiter, vendor/pricing language reads as "this person runs a business, is not looking for employment, and would need to be engaged as a contractor/vendor" — which can quietly disqualify a candidate even if the freelance layer is technically "secondary." Conversely, if the recruiter-first framing dominates too aggressively (e.g., "buscando oportunidades CLT/remoto" prominently in the hero), a prospective agency client scrolling the same page may conclude the studio isn't actively taking client work, undermining the secondary audience goal.

**Why it happens:**
The two audiences read the same signals differently, and the natural way to "serve both" is to keep both vocabularies present — but proximity and prominence matter more than presence. This is an extension of Pitfall 3 (CTA) applied to body copy rather than buttons.

**How to avoid:**
Keep employment-availability framing implicit and professional in the top of the page (skills, role fit, results) rather than declarative ("open to work" banners read as job-board language, not premium portfolio language, and would also clash with the editorial aesthetic constraint). Keep freelance/vendor framing explicit but demoted — a dedicated, clearly-labeled lower section or the final contact block, phrased as availability ("Disponível também para projetos sob demanda") rather than sales pitch. Never let pricing-adjacent language ("orçamento," "pacotes") appear above the fold.

**Warning signs:**
- The word "orçamento" or "atendimento" appears in the hero or above the first case study.
- No section anywhere on the page signals continued availability for freelance/agency work (fully erasing the secondary audience is also a failure mode).

**Phase to address:**
Home IA & CTA hierarchy plan + Métodos/competências reframing sub-task.

---

### Pitfall 7: Conversion Tactics That Clash With the Dark/Editorial Aesthetic Constraint

**What goes wrong:**
Standard "recruiter conversion" and "lead-gen" UX patterns (bright/high-contrast CTA buttons, urgency banners, sticky bars, chat widgets, "3 CTAs above the fold") are optimized for generic SaaS/marketing conversion and directly conflict with the explicit constraint that the visual language (dark mode, minimalist, premium, editorial) must not change. Importing these patterns wholesale to "improve conversion" would visually regress the site even while technically improving IA.

**Why it happens:**
Conversion-rate-optimization advice is mostly written for a generic audience and defaults to high-contrast, attention-grabbing visual tactics. Under deadline pressure, it's tempting to reach for those patterns directly rather than translating "conversion hierarchy" into the site's existing typographic/spatial design language.

**How to avoid:**
Express hierarchy through order, whitespace, type scale, and repetition — not new colors, badges, banners, or popups. E.g., the primary CTA can be established by being first, largest in type, and repeated at natural reading breakpoints (hero + final contact block) rather than by clashing color. Consult the `ui-ux-pro-max` skill (per project constraint) before introducing any new component, specifically to check it doesn't introduce a visual pattern foreign to the current design system.

**Warning signs:**
- A new component introduces a new color, gradient, or shadow style not present elsewhere on the site.
- Any sticky/floating element is added that wasn't already part of the design (e.g., a new sticky CTA bar).

**Phase to address:**
Home IA & CTA hierarchy plan — visual execution sub-task, cross-checked against existing design tokens.

---

### Pitfall 8: Missing Human Photo Becomes a Blocking Dependency Discovered Late

**What goes wrong:**
Per the project's own mapped findings, no clear portrait/headshot of Murilo exists in the repo — only grayscale, low-opacity mood/background images. The Active requirement calls for a hero with "presença visual (foto)." Trust research consistently shows a real human photo materially increases recruiter trust and click-through versus abstract/mood imagery, especially for a person-first professional (not an agency-anonymous brand). If photo sourcing is treated as a minor asset task rather than a dependency, it risks being discovered as a blocker mid-implementation (no suitable photo exists, or a new photo doesn't match the grayscale/desaturated mood aesthetic already established), stalling the hero — the single most important section of the redesign.

**Why it happens:**
Asset gaps are easy to overlook during IA/content planning because they feel like "just drop in an image" tasks. But sourcing (or commissioning) a new photo, then grading/treating it to match the existing desaturated editorial mood, is nontrivial and depends on the user providing source material.

**How to avoid:**
Surface the photo-sourcing decision explicitly and early (it's already flagged as "pending decision" in PROJECT.md) — resolve it before hero layout work begins, not during. If no usable photo exists in time, define a fallback (e.g., keep mood-image treatment but at higher visual prominence) rather than blocking the whole plan on asset creation.

**Warning signs:**
- Hero layout work begins without a confirmed photo asset or explicit fallback plan.
- A new photo is dropped in with different color treatment/lighting than the site's existing grayscale/low-opacity mood images, creating visual inconsistency.

**Phase to address:**
Home IA & CTA hierarchy plan — hero sub-task, first decision point.

---

### Pitfall 9: Mobile Scanability Lost to Editorial Density

**What goes wrong:**
Recruiters commonly review candidate portfolios on short time budgets (multiple independent sources cite roughly 7-30 seconds for initial screening, MEDIUM confidence — exact numbers vary by source/study, but directionally consistent) and frequently on mobile (e.g., clicking a LinkedIn profile link from their phone). An editorial, image-forward, generously-spaced dark design that reads beautifully on desktop can push the primary CTA, headline, and first case study below the fold on mobile if section padding/imagery isn't re-audited for the new information hierarchy.

**Why it happens:**
Visual/editorial redesigns are usually designed and reviewed on desktop first; mobile hierarchy is checked for "does it break" rather than "does the priority order survive the viewport."

**How to avoid:**
Explicitly test the mobile hero + first-screen content against the "what does a recruiter see in one screen, no scroll" bar — headline, one credibility signal, and a visible primary CTA should fit without scrolling on a standard mobile viewport, even within the editorial spacing system.

**Warning signs:**
- On mobile, the primary CTA (LinkedIn/e-mail/CV) requires more than one scroll to reach.
- Hero section height on mobile is dominated by decorative imagery with no visible text/CTA in the first viewport.

**Phase to address:**
Home IA & CTA hierarchy plan — responsive QA sub-task.

---

### Pitfall 10: SEO/Meta Regression From Copy Reprioritization

**What goes wrong:**
The site already has schema.org Person markup and presumably meta tags/titles tuned (even loosely) around the prior agency-first positioning, which may be driving existing organic search traffic relevant to the secondary freelance audience. Rewriting visible hero/headline copy to be recruiter-first, without separately reviewing `<title>`, meta description, and schema fields, can unintentionally shift what the page ranks for — silently reducing freelance-lead organic traffic as a side effect of a project whose explicit goal is to keep that audience "secondary but present," not eliminated.

**Why it happens:**
Meta/schema fields are easy to forget because they're invisible during normal design/dev review — nobody "sees" a regression there until search traffic or click-through data changes weeks later, by which point it's hard to attribute to this redesign.

**How to avoid:**
Audit and consciously decide on `<title>`, meta description, and schema.org Person fields as part of this phase rather than leaving them untouched by default or changing them incidentally. They don't need to match the new hero headline 1:1, but they should be a deliberate decision, not an oversight.

**Warning signs:**
- Meta title/description still contain pure agency-sales language after the redesign (mismatched with new positioning), or were changed without anyone reviewing SEO impact.

**Phase to address:**
Home IA & CTA hierarchy plan — final QA sub-task (low effort, easy to fold into existing review).

---

### Pitfall 11: Accidental Partial Ship via Lovable Auto-Sync

**What goes wrong:**
Per project constraints, every push to `main` auto-triggers a Cloudflare Workers rebuild synced to the Lovable-hosted deployment. If in-progress restructuring work (e.g., new hero committed but CTA hierarchy not yet fixed, or CV link fix not yet verified) lands on `main` before the plan is complete, the live production site — and its Lovable mirror — will briefly show a half-migrated home page (new recruiter framing with still-broken CV link, or reordered sections with orphaned styling) to real visitors, including recruiters who may be actively evaluating the candidate.

**Why it happens:**
Incremental commits are a normal, healthy dev practice, but this project's auto-sync-on-push setup removes the usual staging buffer between "committed" and "live." The project's own constraint document already flags this (structural changes must go via branch + PR, never direct commit to `main`), but it's easy to slip in a "quick fix" direct commit under time pressure.

**How to avoid:**
Do all home-page restructuring work on a feature branch; merge to `main` only when the full plan (hierarchy + CTA fixes + case studies + responsive QA) is done and reviewed. Before the final merge, confirm with the user which branch is connected in the Lovable panel, per the existing constraint.

**Warning signs:**
- Any direct commit to `main` touching `src/routes/index.tsx` mid-plan.
- The final PR is merged before the CV link fix and LinkedIn URL confirmation are verified.

**Phase to address:**
Applies across the entire phase — should be a standing rule referenced in every plan's done-criteria, not a one-time check.

---

### Pitfall 12: Reordering Breaks Assumed Anchors/Links From Other Pages

**What goes wrong:**
Other parts of the site (`Footer.tsx`, `ContextNav`, or other route files) may link to specific home-page sections via hash anchors or assume a specific DOM order/id for scroll-to behavior. Reordering or renaming sections on the home page as part of the IA restructuring can silently break these internal links even though no content was deleted — a subtle regression that satisfies the "don't delete" rule in letter but not in spirit (a recruiter following an internal link and landing on the wrong section, or a broken scroll, is effectively as bad as missing content).

**Why it happens:**
IA restructuring focuses on the home page in isolation; cross-page references into home-page anchors are easy to miss because they live in other files not touched by this phase.

**How to avoid:**
Before reordering, grep the codebase for any hash-based or anchor-based links pointing into `index.tsx` sections (e.g., `#skills`, `#cases`, `#contato`) from `ContextNav`, `Footer`, or other routes, and update them alongside the reorder.

**Warning signs:**
- Any `href="/#..."` or `scrollTo`/`scrollIntoView` reference to a home section id found in another file that wasn't updated when that section moved or was renamed.

**Phase to address:**
Home IA & CTA hierarchy plan — pre-implementation audit sub-task.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|--------------------|-----------------|------------------|
| Reuse existing mood/background images in hero instead of resolving the missing-portrait gap | Ships faster, no asset dependency | Weakens the single highest-trust signal (a real photo) for the now-primary recruiter audience | Only as an explicit, agreed fallback — not a silent default |
| Leave `/servicos/*` dead route and heavy GIFs untouched | Avoids scope creep into out-of-scope debt (per PROJECT.md) | Debt compounds if never tracked separately | Acceptable — already explicitly deferred in PROJECT.md as separate debt, as long as it's actually logged, not forgotten |
| Ship case study "resultado" lines as qualitative-only (no numbers) where hard metrics aren't available | Faster to write, avoids overstating unverifiable numbers | Weaker signal to recruiters who scan for quantified impact | Acceptable per-case when a metric genuinely doesn't exist — don't fabricate numbers to fill the pattern |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|------------------|-------------------|
| LinkedIn CTA | Using a generic `linkedin.com/in/...` link without confirming it's current/correct, and never testing it manually | Confirm URL with user (already flagged as pending in PROJECT.md) and manually click-test before making it the primary CTA |
| CV PDF | Referencing the file by an assumed/old path instead of the actual file in `public/cv/` | Fix the path, then verify via an actual download in a browser (not just reading the code) — file names with spaces/special characters (`CV MURILO ORTEGA 2026.pdf`) are a common source of URL-encoding bugs |
| WhatsApp click-to-chat | Leaving a floating/global WhatsApp CTA active across the whole page after demoting it in content | Audit for any global/floating WhatsApp component independent of section content; explicitly scope its visibility/prominence as part of the hierarchy change |
| Lovable auto-sync | Direct commits to `main` for "small" home-page tweaks during active restructuring | All home-page work on a feature branch; merge only when the full plan is complete and reviewed, per existing project constraint |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|-----------------|
| New hero portrait/photo added at high resolution without optimization | Slower LCP on the single most important above-the-fold element | Compress/serve appropriately sized image (same discipline already needed given known GIF-weight issues elsewhere in the codebase) | Immediately noticeable on mobile/slower connections — exactly the context many recruiters browse in |
| Case study section on home re-uses full project-page-weight assets (large images/GIFs) instead of lightweight summary versions | Home page load time increases even though "only" 5 cases were added | Use lightweight/cropped preview assets for home-page case summaries, link to full project pages for heavy media | Becomes a real problem once 5 image-heavy cases + hero portrait are all combined above the fold |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| Recruiter can't tell in the first screen whether this is a "candidate" or "agency" page | Recruiter bounces or misjudges fit before reaching real content | Recruiter-first headline + immediate credibility signal (photo, role, top-line result) in the first viewport |
| Two style of CTA both look "primary" | Recruiter clicks the wrong one (WhatsApp/orçamento) or hesitates and does nothing | One dominant CTA style, applied consistently to LinkedIn/e-mail/CV only |
| Case studies show final visuals with no stated outcome | Recruiter can't tell if the work was effective, only that it looks good | Every featured case includes a one-line quantified or qualitative outcome, visible without a click-through |
| Skills section duplicated verbatim from `/sobre` without editing for scan speed | Home page becomes a dense resume dump instead of a fast scan | Home skills section should be a condensed top-line summary (not the full `/sobre` list), with a link to `/sobre` for depth |

## "Looks Done But Isn't" Checklist

- [ ] **CV download CTA:** Often "done" in code but never manually click-tested in a browser — verify the actual file downloads, not just that the link exists.
- [ ] **LinkedIn CTA:** Often left pointing at an unconfirmed/possibly outdated URL — verify with the user it's the correct, current profile.
- [ ] **CTA hierarchy:** Often "done" visually on desktop but not re-checked for a floating/global WhatsApp element that silently overrides the intended hierarchy site-wide.
- [ ] **Case study outcomes:** Often present in the full project page but not surfaced in the home-page summary card — verify the outcome line is visible without a click.
- [ ] **Mobile first-viewport:** Often reviewed only on desktop — verify headline + primary CTA are visible without scrolling on a standard mobile viewport.
- [ ] **Internal anchor links:** Often untouched during reordering — grep `Footer.tsx`, `ContextNav`, and other routes for hash links into the home page and confirm they still resolve correctly.
- [ ] **Meta/schema tags:** Often left as-is by default — confirm `<title>`, meta description, and schema.org Person fields were a deliberate decision post-redesign, not an oversight.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|-----------------|------------------|
| Kitchen Sink Homepage (Pitfall 1) shipped | MEDIUM | Audit shipped page section-by-section against the recruiter-scan goal; demote/compress sections that don't serve it, without deleting — a follow-up plan, not a rewrite |
| CTA hierarchy confusion (Pitfall 3) shipped | LOW | Style/prominence fix only — no content restructuring needed, quick follow-up patch |
| Broken CV/LinkedIn CTA shipped as primary (Pitfall 4) | LOW | Immediate hotfix via feature branch + PR; highest priority fix given it's the core conversion action |
| SEO/meta regression discovered post-ship (Pitfall 10) | MEDIUM | Restore or rewrite meta/schema fields deliberately; monitor search console (if available) for recovery over following weeks |
| Accidental partial ship via Lovable auto-sync (Pitfall 11) | LOW–MEDIUM | Push a corrective commit immediately (auto-sync means recovery is also fast); worst case is temporary visibility of an incomplete page, not permanent data loss |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Plan/Sub-task | Verification |
|---------|----------------------------|----------------|
| Kitchen Sink Homepage | Home IA & CTA hierarchy plan | Home page length/section-weight reviewed against recruiter-scan goal; no section left untouched in tone/prominence |
| Middle-ground messaging | Hero copy sub-task | Headline reviewed by a third party who correctly identifies "job candidate" as the primary read |
| CTA hierarchy confusion | CTA hierarchy sub-task | Squint/blur test shows one dominant CTA; global WhatsApp element audited |
| Broken CTA infrastructure shipped | CV/LinkedIn fix sub-task (blocking) | Manual click-test of CV download and LinkedIn link before merge |
| Case studies as gallery | Featured case studies sub-task | Each of the 5 cases has a visible, non-click-required outcome line |
| Self-contradicting positioning | Métodos/competências reframing sub-task | No pricing/vendor language above the fold; freelance availability stated once, clearly, lower on the page |
| Aesthetic-clashing conversion tactics | Visual execution sub-task | No new colors/components introduced without `ui-ux-pro-max` skill review |
| Missing photo blocking hero | Hero decision sub-task (first, before layout) | Photo asset or explicit fallback confirmed before hero layout work begins |
| Mobile scanability lost | Responsive QA sub-task | Primary CTA + headline visible in first mobile viewport, no scroll |
| SEO/meta regression | Final QA sub-task | Meta title/description/schema reviewed and consciously updated or preserved |
| Accidental partial ship | Standing rule, all sub-tasks | No direct commits to `main`; branch confirmed in Lovable panel before final merge |
| Anchor links broken by reordering | Pre-implementation audit sub-task | Grep for hash/anchor references to home sections in other files, updated alongside reorder |

## Sources

- [Rudo — How to Design a Recruitment Website That Attracts Clients and Candidates](https://rudo.co.uk/insights/articles/recruitment-website-design-guide/) — MEDIUM confidence, directly on dual-audience recruitment site design
- [Millo — Landing Page Tactics Freelancers Can Use to Turn Portfolio Visitors Into Clients](https://millo.co/landing-page-tactics-freelancers-can-use-to-turn-portfolio-visitors-into-clients) — MEDIUM confidence, on single-dominant-CTA principle
- [The Ladders — You have 7.4 seconds to make an impression](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count) — MEDIUM confidence (widely cited but methodology-dated study), used directionally not as precise fact
- [UX Collective — Only 30 seconds to reject your portfolio](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674) — MEDIUM confidence, corroborates short recruiter scan windows
- [UX Dictionary — Optimizing Your Portfolio for Recruiter Scan-ability](https://uxdictionary.io/article/optimizing-your-portfolio-for-recruiter-scan-ability) — MEDIUM confidence
- [Creative Bloq — 8 common portfolio mistakes](https://www.creativebloq.com/features/8-common-portfolio-mistakes-and-how-to-fix-them) — MEDIUM confidence, on process/outcome vs. gallery presentation
- [Dribbble — 5 Design Portfolio Mistakes That'll Send Clients Running](https://dribbble.com/resources/portfolio-mistakes-send-clients-running) — MEDIUM confidence
- Project-specific pitfalls (broken CV link, unconfirmed LinkedIn URL, missing portrait, Lovable auto-sync, non-deletion constraint) — HIGH confidence, sourced directly from `.planning/PROJECT.md`

---
*Pitfalls research for: Dual-audience portfolio home redesign (recruiter-primary, freelance-secondary)*
*Researched: 2026-08-04*
