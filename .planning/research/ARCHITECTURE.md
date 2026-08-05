# Architecture Research

**Domain:** Recruiter-facing portfolio home page — information architecture (content structure, not code structure)
**Researched:** 2026-08-04
**Confidence:** MEDIUM-HIGH (site-specific findings HIGH — read directly from codebase; general IA/UX patterns MEDIUM — WebSearch-verified against multiple independent sources, no single-source claims)

**Scope note:** This document does NOT re-research component/file architecture (already covered in `.planning/codebase/ARCHITECTURE.md` and `STRUCTURE.md`). It covers **content/information architecture**: what goes on the home page, in what order, at what depth, and what links out to which existing page.

## Standard Architecture

### System Overview — Recommended Home Page Section Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. HERO  (0–1st viewport, ~6-10s recruiter scan window)             │
│     Identity headline + result headline + photo + primary CTA row    │
│     (LinkedIn / E-mail / CV) + secondary CTA row (Portfolio / Sobre) │
├─────────────────────────────────────────────────────────────────────┤
│  2. SOCIAL PROOF  (trust acceleration, lightweight)                  │
│     13 client logos + one-line framing (sectors/scale, not per-logo) │
├─────────────────────────────────────────────────────────────────────┤
│  3. CASE STUDIES  (proof of work — the load-bearing section)         │
│     5 cards: Problema → Ação → Resultado, 2–3 sentences each         │
│     → each card links to full project route (/natrave, /symplice…)  │
├─────────────────────────────────────────────────────────────────────┤
│  4. SKILLS STRIP  (hard + soft, condensed)                           │
│     Tag/pill list, no tool marquees, no descriptions                 │
│     → "Ver stack completo" links to /sobre                           │
├─────────────────────────────────────────────────────────────────────┤
│  5. METHODS / HOW I WORK  (competency framing, service framing 2nd)  │
│     Existing tab-preview pattern retained, copy reframed              │
│     → "Ver Mais" per method links to /metodos/<slug>                 │
├─────────────────────────────────────────────────────────────────────┤
│  6. FINAL CTA / CONTACT  (2nd action touchpoint, end-of-scroll)       │
│     LinkedIn / E-mail / CV primary, WhatsApp / Calendly secondary    │
│     → "Ver todos os canais" links to /contato                        │
├─────────────────────────────────────────────────────────────────────┤
│  [Footer — global chrome, unchanged, out of scope]                   │
└─────────────────────────────────────────────────────────────────────┘
```

This is a **promise → proof → action** structure (hero promises value, sections 2–5 prove it with escalating specificity, section 6 asks for the action) layered with **progressive disclosure** (each section shows the minimum needed to build the next belief, then links to the page that holds full depth).

### Section Responsibilities

| Section | Responsibility | Content Depth on Home | Full Depth Lives At |
|---------|----------------|------------------------|----------------------|
| Hero | Answer "who is this, what do they do, can I act now" in under 10s | 1 identity headline + 1 result headline + photo + CTA row | N/A (hero is the summary; CV/LinkedIn are the destinations) |
| Social Proof | Fast trust signal via recognizable/credible names | Logo marquee + 1 framing line (no per-logo case detail) | `/sobre` (Brand Board has 4 cases with description), `/trabalho` (full list) |
| Case Studies | Prove capability with concrete narrative, not just aesthetics | 5 cards × 2–3 sentences (problema/ação/resultado) + thumbnail | Each individual project route (`/natrave`, `/symplice`, `/maxi`, `/solid`, `/milgrows` or `/kapyi`) — confirmed to already contain multi-section narrative depth (5 `<h2>` content blocks in `natrave.tsx` alone) |
| Skills Strip | Reinforce claims made by the case studies with a scannable competency list | Tag list only — hard skills (branding, social media, direção de arte, presença digital) + soft skills (liderança criativa, gestão de projetos) | `/sobre` — already has full breakdown: Design & Direção de Arte tools marquee, Inteligência Artificial tools marquee, Gestão & Planejamento tools list |
| Methods/How I Work | Show process maturity — "this person has a repeatable method," which reads as employability, not just freelance pitch | Existing 6-button tab selector + 1 preview paragraph per method (already implemented in `MethodsSection` in `index.tsx:349`) | `/metodos/<slug>` — one full page per method already exists |
| Final CTA/Contact | Capture the recruiter who scrolled the whole page and is ready to act | LinkedIn, e-mail, CV as primary buttons (mirrors hero CTAs — repetition is intentional, see Anti-Patterns), WhatsApp/Calendly secondary | `/contato` — already has WhatsApp, Calendly, e-mail, and full social list |

## Recommended Home Page Structure (vs. Current)

```
CURRENT (src/routes/index.tsx, HomePage component, lines 255–347):
1. Hero                          — headline, gallery, 3 CTAs (Ver Portfolio / Ver mais sobre mim / Baixar CV [BROKEN LINK])
2. Brand Marquee                 — logos, no framing/context copy
3. "Positioning" block           — agency-pitch tone ("problema não é falta de ação... Marketing")
4. Methods (tabs)                — 6 methods, tab preview + "Ver Mais" → /metodos/<slug>
   [Case studies: `projects` array + `ProjectCard` component ARE DEFINED (lines 41–78, 199–241) but NEVER RENDERED — dead code today]
   [Skills: none on home]
   [Final contact block: none on home — contact only reachable via Footer/nav]

RECOMMENDED:
1. Hero                          — reframed headline pair (employable identity + delivered result), photo, CTA row reordered (LinkedIn/E-mail/CV primary, Ver Portfolio/Sobre secondary), CV link fixed
2. Social Proof (Brand Marquee)  — same component, add 1-line framing copy above/below marquee
3. Case Studies (NEW — activate existing dead code, restructure to 5 cards with P→A→R copy)
4. Skills Strip (NEW — condensed hard+soft skills, link to /sobre)
5. Methods (existing MethodsSection, copy reframed from "sales pitch" to "how I work")
6. Final CTA/Contact (NEW — LinkedIn/E-mail/CV primary block before Footer)
```

### Structure Rationale

- **Case studies move from "doesn't exist" to position 3, before Methods:** Research consistently shows recruiters scan for proof-of-work signals immediately after (or interleaved with) trust signals, not after a services/positioning pitch. The current "Positioning" block (agency-sales language) sits where proof should be — it delays the load-bearing section past the point where a fast scanner has already formed a judgment.
- **Skills strip comes after cases, not before:** Claims (skills) are more credible once the recruiter has already seen 2–3 concrete results. Leading with a skills list without proof reads as a checklist, not evidence — the case studies "unlock" the credibility of the skills tags that follow. This also matches inverted-pyramid content practice: lead with the strongest concrete asset, not the abstract one.
- **Methods retained in its current tab-preview interaction pattern:** This is the one part of the current home page that is already a *correct* progressive-disclosure implementation — short preview text + explicit "Ver Mais" link to a full `/metodos/<slug>` page. Keep the mechanism, only reframe the copy tone (competency-first, "serviço contratável" second) and reposition it after Skills so it reads as "here's how I apply those skills" rather than "here's what you can buy."
- **Final CTA block is new and necessary:** Today, a recruiter who scrolls the entire home page has no contact block to act on without using global nav/footer — the funnel has no end-of-page conversion moment. Every reviewed landing-page pattern source recommends a primary CTA repeated after the proof sections, not only in the hero and only in global chrome.
- **Brand marquee keeps its position (2nd)** because it is already correctly placed as a lightweight, low-effort trust signal early in the scroll — the fix needed is framing copy/context, not repositioning.

## Content Patterns

### Pattern 1: Inverted Pyramid per Section

**What:** Each section leads with its single strongest/clearest sentence, then a maximum of 1–2 supporting sentences, then a link out. No section on the home page should require more than ~15 seconds to read completely.
**When to use:** Every home page section (hero copy, case card copy, method preview, skills framing line).
**Trade-offs:** Forces hard editorial choices about which client/case/skill is "the" lead example — but this is exactly what a recruiter-facing home page needs; a page that hedges by including everything defeats the "resumo estratégico" goal stated in `PROJECT.md`.

**Example (case card, matches existing `ProjectCard` shape in `index.tsx:199`):**
```tsx
{
  name: "NaTrave — O Ecossistema do Futebol Amador",
  problem: "Plataforma social sem identidade nem retenção de usuários.",
  action: "Direção de arte, sistema de conteúdo e social media completos.",
  result: "+40% engajamento em 3 meses.", // placeholder — real metric TBD by user
  to: "/natrave",
}
```

### Pattern 2: Repeated CTA at Decision Points

**What:** The same 3 primary actions (LinkedIn, e-mail, CV) appear at the top (hero) and again at the bottom (final CTA block), using consistent labels/icons both times, rather than inventing new CTA copy for the second instance.
**When to use:** Any single-page (no multi-step funnel) conversion page longer than ~3 viewports.
**Trade-offs:** Slight repetition, but multiple independent landing-page sources confirm repeated CTAs at each scroll-decision-point outperform a single CTA instance, especially since not every visitor reads to the end before deciding to act.

### Pattern 3: Summary-on-Home / Depth-on-Route (Progressive Disclosure via Routing, not Accordions)

**What:** Because this is a multi-page site with an already-complete deep-content layer (`/sobre`, `/trabalho`, `/metodos/*`, individual project routes), progressive disclosure here is implemented through **navigation** (link to a dedicated page) rather than UI-level disclosure widgets (accordions/tabs/modals) — except for the Methods tab selector, which is an appropriate UI-level disclosure because all 6 previews are lightweight and mutually exclusive by design.
**When to use:** Default to route-based disclosure (a link) whenever the fuller content already exists on its own page. Reserve UI-level disclosure (tabs/accordions) only for content that doesn't warrant its own route.
**Trade-offs:** Route-based disclosure costs a click/page load, but keeps the home page fast to scan and avoids duplicating full content in two places (a duplication risk explicitly flagged below in Anti-Patterns).

## Data Flow — What's Summarized on Home vs. What's Full Depth Elsewhere

```
[Home Page Section]              [Full Depth Already Exists At]         [Link Mechanism]
Hero identity/result claim   →   (no deeper page — hero IS the claim;   —
                                   CV PDF is the "proof document")
Social proof (logo + 1 line) →   /sobre (Brand Board, 4 cases w/ desc)  <Link to="/sobre">
                              →   /trabalho (full 11-project list,
                                   filterable by category)               <Link to="/trabalho">
Case card (5, P→A→R summary) →   Individual project route per card      <Link to={project.to}>
                                   (e.g. /natrave — already has 5+
                                   distinct content sections)
Skills tag list (condensed)  →   /sobre (Design tools marquee,          <Link to="/sobre">
                                   AI tools marquee, Management tools
                                   list — all fully built already)
Method preview (6 tabs)      →   /metodos/<slug> (dedicated page per    <Link to={`/metodos/${slug}`}>
                                   method, already exists)
Final CTA block               →   /contato (WhatsApp, Calendly, e-mail, <Link to="/contato">
                                   full social list — already exists)
```

### Key Data Flows

1. **No content duplication rule:** Every "summary" section on the home page must be a genuinely shorter/different edit of the destination page's content, not a copy-paste of the first paragraph. E.g., the skills strip should NOT re-list every tool from `/sobre`'s three marquees — it should distill them into 4–6 competency tags that make sense standalone.
2. **Case study depth asymmetry is intentional:** The individual project routes (`/natrave`, `/symplice`, etc.) already contain full narrative sections (confirmed via `grep` — `natrave.tsx` has 5 distinct `<h2>` content blocks). The home page case cards should never attempt to compress that into more than 2–3 sentences; the entire value of the card is "enough to justify a click," not "enough to replace the click."
3. **CV and LinkedIn are terminal nodes, not intermediate pages:** Unlike the other five sections, these two are meant to end the recruiter's journey (download/apply/message), not route them deeper into the site. They should be styled/positioned as unambiguous primary actions in both the hero and the final CTA block, distinct from the "Ver Mais" secondary links.

## Scanning-Depth Considerations (What a Recruiter Sees at Each Time Budget)

| Time Budget | What Must Be Fully Legible | Architecture Implication |
|-------------|------------------------------|---------------------------|
| 0–10s (first-viewport scan) | Role fit + one result claim + that contact is possible | Hero headline pair + visible CTA row must render above the fold with no scroll; logo marquee can peek in as a trust cue |
| 10–60s (scroll-skim) | Concrete proof (cases) + credibility markers (skills) | Case study cards need instantly parseable P→A→R structure — a recruiter skimming should get the "so what" from the bolded result line alone, without reading full sentences |
| 1–3 min (engaged read) | Process maturity (methods) + enough trust to click through | Methods tab section and final CTA block are for the recruiter who has decided to invest — this is where a second, more considered action (CV download, LinkedIn click) happens |
| 3 min+ (deep dive) | Full case narratives, full skill inventory, full contact options | Handled entirely by existing deep pages (`/sobre`, `/trabalho`, `/metodos/*`, project routes, `/contato`) — home page's job ends once it has successfully routed the recruiter to the right deep page |

### Scanning Priorities

1. **First bottleneck — broken/missing terminal CTAs:** The CV download link is currently broken (`/cv/curriculo.pdf` doesn't exist; real file is `public/cv/CV MURILO ORTEGA 2026.pdf`) and LinkedIn URL needs user confirmation. These are the two most damaging defects for a recruiter-facing page because they break the "action" step of promise → proof → action at the exact moment a convinced recruiter tries to act.
2. **Second bottleneck — case studies not rendered:** The `projects` array and `ProjectCard` component already exist in `index.tsx` but are dead code (never used in `HomePage`'s JSX return). This is the single highest-leverage build task: it fills the biggest content gap (no proof-of-work section exists on home today) using code that's already half-written.

## Anti-Patterns

### Anti-Pattern 1: Compressing Full Page Content Into the Home Page

**What people do:** Try to make the home page "complete" by pasting full bios, full tool lists, or full case narratives directly into the home sections.
**Why it's wrong:** Directly contradicts the stated goal in `PROJECT.md` — home as "resumo estratégico," full depth progressively revealed elsewhere. It also creates a maintenance burden (two places to update the same fact) and defeats the 6–10 second scan window recruiters actually use.
**Do this instead:** Every home section should be editorially cut to its shortest defensible version, with an explicit link to the existing deep page (see Data Flow table above) — never a duplicate copy of that page's content.

### Anti-Pattern 2: Logo Soup (Social Proof Without Context)

**What people do:** Show client logos with no framing copy, leaving the visitor to infer significance.
**Why it's wrong:** `PROJECT.md`'s own Active requirement explicitly flags this ("logo com contexto/resultado, não logo solto"). A bare logo marquee reads as filler, not proof, to a recruiter scanning for signal.
**Do this instead:** One short framing line above/below the marquee (e.g., scale, sector diversity, or a single aggregate stat) — not per-logo captions (13 logos is too many to annotate individually without breaking the scan pace), but enough context that the marquee reads as evidence rather than decoration.

### Anti-Pattern 3: Agency-Sales Framing Ahead of Employability Framing

**What people do:** Lead sections with client-acquisition language ("problema não é falta de ação," "atuo com empresas que...") before establishing individual professional competency.
**Why it's wrong:** The current "Positioning" section and Methods copy are written for a prospective paying client, not a recruiter evaluating a hire. A recruiter reading agency-pitch language has to mentally translate "this person sells branding services" into "this person has the skills my team needs" — that translation cost is exactly what `PROJECT.md` says this phase must remove (freelance/agency framing becomes secondary, not primary).
**Do this instead:** Reframe copy to competency-first, service-second — e.g., "Como eu trabalho" / "Meu processo" instead of "aqui construo a identidade que seu negócio precisa" — while keeping the exact same underlying method content and links to `/metodos/*` unchanged.

### Anti-Pattern 4: Single Conversion Moment

**What people do:** Put all CTAs only in the hero (or only in the global footer/nav), assuming a visitor who doesn't act immediately will scroll back up.
**Why it's wrong:** Contradicts the repeated-CTA pattern that multiple independent landing-page sources confirm outperforms a single CTA instance — and today's home page has this exact problem (no contact block after the last content section).
**Do this instead:** Repeat the same three primary actions (LinkedIn, e-mail, CV) in the hero and again in a dedicated final CTA block before the footer.

## Integration Points

### External Services (already integrated, home page references them)

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| LinkedIn | Plain `<a>` link, `https://linkedin.com/in/muriloortega` | Already correct in `Footer.tsx` and `contato.tsx` — needs user confirmation it's the right profile URL before promoting to primary CTA on home |
| E-mail | `mailto:contato@muriloortega.com` link | Already used in `contato.tsx`; not currently surfaced as a primary CTA on home |
| CV PDF | Static file download, `public/cv/` | Home page's `<a href="/cv/curriculo.pdf" download>` is broken — real file is `public/cv/CV MURILO ORTEGA 2026.pdf`; must fix path or rename/copy file to match |
| WhatsApp | `wa.me` deep link | Currently the only CTA type in `/sobre` and `/contato` final sections — per `PROJECT.md`, demote to secondary on home |
| Calendly | External booking link | Only used in `/contato` today; secondary-tier action, not required on home |

### Internal Boundaries (home ↔ existing deep pages)

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Home → `/sobre` | `<Link to="/sobre">` (TanStack Router) | Destination for "full skills/stack," "full bio/trajectory," Brand Board case detail |
| Home → `/trabalho` | `<Link to="/trabalho">` | Destination for "see all projects," filterable by category — already built and correct |
| Home → project routes | `<Link to={project.to}>` per case card | Reuse existing `to` field pattern already present in the (currently unused) `projects` array — no new routing needed, just render the existing component |
| Home → `/metodos/<slug>` | `<Link to={`/metodos/${slug}`}>` | Already implemented in `MethodsSection`; keep as-is, only touch copy |
| Home → `/contato` | `<Link to="/contato">` | Destination for full contact channel list (WhatsApp, Calendly, e-mail, social) beyond the three primary CTAs surfaced on home |

## Sources

- WebSearch: "portfolio homepage structure recruiters conversion hero above the fold case studies order" — recruiter 6–10s scan window, case study ordering by relevance not chronology, strongest project in position one, CTA placement after proof sections (MEDIUM confidence — multiple independent sources: uxdictionary.io, thecrit.co, blog.uxfol.io, launchnow.design)
- WebSearch: "progressive disclosure landing page information architecture UX best practices" — progressive disclosure as an information-architecture principle (not just UI widget pattern), Nielsen Norman Group origin, top-level info above the fold with detail revealed on scroll/navigation (MEDIUM-HIGH confidence — uxpin.com, logrocket.com, ixdf.org all describe consistent definition traceable to Nielsen Norman Group)
- WebSearch: "resume website landing page section order skills social proof CTA repeat conversion pattern" — promise → proof → action structural framework, repeated CTA pattern at scroll decision points, lightweight social proof placed early for trust acceleration (MEDIUM confidence — replo.app, involve.me, landingi.com; general landing-page-marketing sources, not portfolio-specific, applied here by analogy)
- Direct codebase inspection (HIGH confidence — read directly, not inferred): `src/routes/index.tsx` (current home page implementation, confirms case-study code exists but is unrendered), `src/routes/sobre.tsx` (confirms full skills/tools depth exists there), `src/routes/contato.tsx` (confirms full contact-channel depth exists there), `src/routes/trabalho.tsx` (confirms filterable full-project-list depth exists there), `src/routes/natrave.tsx` (confirms individual project routes have multi-section narrative depth)

---
*Architecture research for: recruiter-facing portfolio home page information architecture*
*Researched: 2026-08-04*
