# Roadmap: Portfólio Murilo Ortega — Reposicionamento para Recrutadores

## Overview

This roadmap covers a single scope: restructuring the home page (`src/routes/index.tsx`) of an existing, live portfolio site so that a recruiter, in a 6-10 second scan, understands who Murilo is, what he delivers, sees real proof of results, and can act (LinkedIn, e-mail, CV) — while the freelance/agency path stays reachable but secondary, and nothing existing is deleted. Work proceeds in four phases: fix the blocking infrastructure and resolve the hero-photo decision first, then rebuild the hero/CTA hierarchy and activate the currently-dead case-study code, then complete the funnel with skills, reframed methods, contextualized social proof, and a final contact block, and finally verify everything (responsive, SEO/meta, links, squint test) before merging the feature branch to `main`. All four phases ship on a single feature branch with one PR — per project constraint, there are no direct commits to `main` until the full restructure is verified complete, because every push to `main` auto-deploys to the live Lovable-hosted site.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation Fixes & Hero Decision** - Fix the broken CV link, confirm the LinkedIn URL, and resolve the hero photo asset before any hierarchy work is built on top of them.
- [ ] **Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies** - Rebuild the hero with dual headline + photo + recruiter-first CTA cluster, and activate 5 case studies with Problem→Ação→Resultado narrative.
- [ ] **Phase 3: Skills, Methods Reframe, Social Proof & Final CTA** - Add condensed skills, reframe methods as competency-first, contextualize the client-logo marquee, and add the missing final contact block.
- [ ] **Phase 4: QA — Responsive, SEO/Meta, Links, Squint Test, Merge** - Verify the fully restructured home page across viewports and metadata, confirm no links broke, then merge the feature branch to `main`.

## Phase Details

### Phase 1: Foundation Fixes & Hero Decision
**Goal**: The blocking infrastructure underneath every recruiter-facing CTA is fixed, and the hero photo asset question is resolved, so Phase 2's hierarchy work isn't built on top of a broken link, an unconfirmed URL, or an undecided asset.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FIX-01, FIX-02, FIX-03
**Success Criteria** (what must be TRUE):
  1. Clicking "Baixar CV" on the home page downloads the real file (`public/cv/CV MURILO ORTEGA 2026.pdf`) — verified by an actual manual click-test, not just a code review.
  2. The LinkedIn URL used on the home page (and anywhere else it appears) has been explicitly confirmed correct by Murilo, not assumed from the current `https://linkedin.com/in/muriloortega` value.
  3. A decision on the hero photo — a real photo sourced and ready to use, or an explicit fallback treatment consistent with the site's existing grayscale/desaturated aesthetic — is made and documented, ready to hand off to Phase 2's hero build.
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Feature branch + working recruiter action links: correct the LinkedIn URL in all 3 source occurrences and point the home page CV download at the real PDF (FIX-01, FIX-02)
- [ ] 01-02-PLAN.md — Export web-ready full-colour hero variants (480/960/1440 in AVIF+JPEG) from `hero-bg.jpg` and write the Phase 2 handoff decision record (FIX-03)
- [ ] 01-03-PLAN.md — End-to-end dev-server audit plus blocking human click-test of the CV download, the LinkedIn profile, and the hero crop (FIX-01, FIX-02, FIX-03)

### Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies
**Goal**: A recruiter landing on the home page immediately sees who Murilo is (role + top result), a visually unambiguous CTA hierarchy favoring LinkedIn/e-mail/CV, and real proof of delivered work via 5 featured case studies — without losing access to any other project.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, CASE-01, CASE-02, CASE-03, ANTI-02, ANTI-03, ANTI-04, ANTI-05
**Success Criteria** (what must be TRUE):
  1. Scanning the hero for 6-10 seconds, a recruiter sees a real photo of Murilo (not a grayscale background layer) plus a two-line headline: line 1 states his hireable role in standard market terminology, line 2 states a delivered result.
  2. In the hero, LinkedIn, e-mail, and CV form the visually dominant, first-seen CTA cluster; "Ver Portfolio completo" is present but visually secondary; WhatsApp is not the dominant or first CTA anywhere in the hero.
  3. Scrolling past the hero, a recruiter sees 5 featured case studies (NaTrave, Symplice, Maxi, Solid+, and Milgrows or Kapyi), each showing a Problema → Ação → Resultado narrative with a visible outcome — no click-through required to see the result.
  4. Every other project not featured on the home page remains fully reachable via a clear path to `/trabalho` — nothing disappears.
  5. The hero contains no generic unearned greeting ("Olá, sou o Murilo") and no new heavy animation or video was introduced.
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 02-01: TBD

### Phase 3: Skills, Methods Reframe, Social Proof & Final CTA
**Goal**: A recruiter who has already seen proof (case studies) sees skills that validate that proof, methods framed as professional competency first, client logos with context instead of bare marks, and a final contact block that closes the funnel with the same recruiter-first hierarchy established in Phase 2.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: PROOF-01, PROOF-02, SKILL-01, SKILL-02, METHOD-01, CONTACT-01, CONTACT-02, CONTACT-03, ANTI-01
**Success Criteria** (what must be TRUE):
  1. The home page shows a condensed hard-skills + soft-skills strip (not a full duplicate of `/sobre`'s content) with no percentage or proficiency bars anywhere.
  2. The 13-logo client marquee pairs each logo with a line of context/result, or an accepted qualitative framing where no metric exists — no logo appears bare and unexplained.
  3. The 6 methods appear on the home page framed primarily as professional competencies ("how I work"), with "serviço contratável" language present but visually and narratively secondary — the underlying method content is unchanged, only copy and hierarchy differ.
  4. Before the footer, a final contact block exists (new — doesn't exist today) with LinkedIn, e-mail, and CV as the primary action and WhatsApp/orçamento visually subordinate but present, not hidden or removed.
  5. Wherever a CTA appears on the home page — hero, methods, final contact block — the same recruiter-primary / freelance-secondary hierarchy is applied consistently; no single component reverts to a WhatsApp-first pattern.
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 03-01: TBD

### Phase 4: QA — Responsive, SEO/Meta, Links, Squint Test, Merge
**Goal**: The fully restructured home page is verified end-to-end — mobile hierarchy, metadata/schema accuracy, internal link integrity, and visual CTA dominance — and merged to `main` as a single complete change, never a partial/broken intermediate state.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: None (verification of Phases 1-3; no new v1 requirements introduced)
**Success Criteria** (what must be TRUE):
  1. On a mobile viewport (~375px width), the headline and primary CTA cluster are visible without scrolling, and a squint/blur test shows exactly one visually dominant CTA style on the page.
  2. The home page `<title>`, meta description, and Person/ProfilePage schema accurately reflect the new recruiter-first content — no leftover copy referencing the old agency-only framing.
  3. Every internal link affected by section reordering (Footer, ContextNav, in-page anchors, links to `/sobre`, `/trabalho`, `/metodos/*`, and individual project routes) resolves correctly — zero broken links introduced by the restructure.
  4. The Open Graph image (1200×630) for the home page renders correctly in a link-preview tool (e.g., LinkedIn's post inspector).
  5. All changes exist on a single feature branch with an open PR against `main`; the PR is merged only after this full checklist passes and the Lovable-connected branch setting has been confirmed by the user.
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

> **Open asset gap (raised during Phase 1 planning):** Success criterion 4 above requires a 1200×630 Open Graph image for the home page. No phase currently owns *creating* that asset — Phase 1 scope is FIX-01/02/03 only, and its hero exports are 4:5 portraits, not 1.91:1 OG cards. Assign OG-image production to Phase 2 or Phase 3 before Phase 4 starts, or Phase 4 will block on a missing asset.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation Fixes & Hero Decision | 1/3 | In Progress|  |
| 2. Home IA Restructure — Hero, CTA Hierarchy, Case Studies | 0/TBD | Not started | - |
| 3. Skills, Methods Reframe, Social Proof & Final CTA | 0/TBD | Not started | - |
| 4. QA — Responsive, SEO/Meta, Links, Squint Test, Merge | 0/TBD | Not started | - |
