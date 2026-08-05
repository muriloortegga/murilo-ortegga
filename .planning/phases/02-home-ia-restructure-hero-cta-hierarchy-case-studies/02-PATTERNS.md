# Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies - Pattern Map

**Mapped:** 2026-08-05
**Files analyzed:** 2 (1 primary edit target, 1 supporting stylesheet edit target)
**Analogs found:** 2 / 2 — this phase is a same-file, self-referential restructure. The best "analog" for almost every new piece of JSX is a different section of the exact same file (`src/routes/index.tsx`) or a sibling rule block in the exact same stylesheet (`src/styles.css`). No cross-codebase component search was needed because RESEARCH.md and UI-SPEC.md already resolved every open question with concrete code.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|---------------|
| `src/routes/index.tsx` — hero `<section>` JSX (headline, photo, CTA cluster) | route/component (page section) | request-response (SSR'd static markup, no data fetch) | Same file — current hero JSX (lines 256–305) + `.hero-gallery`'s `loading="eager"`/`fetchPriority="high"` precedent (lines 149–182) | exact (self-file, literal precedent for eager-loading pattern) |
| `src/routes/index.tsx` — `projects` array (extend w/ `problem`/`action`/`result`, reduce to 5) | data (module-level const) | CRUD-like (static content authoring, not runtime CRUD) | Same file — current `projects` array (lines 41–78) | exact (adapt in place, do not replace shape) |
| `src/routes/index.tsx` — `ProjectCard()` component (`<figcaption>` restructure) | component (private route-local) | request-response (renders static props, client-only `IntersectionObserver` reveal) | Same file — current `ProjectCard` (lines 199–241) | exact (adapt in place) |
| `src/routes/index.tsx` — new "Case Studies" `<section>` wrapping `ProjectCard × 5` | component (new section inside `HomePage`) | request-response | Same file — "Brand Marquee" / "Positioning" `<section>` blocks (lines 307–331) for section-wrapper convention (`site-section`, `site-container`, `scroll-reveal` on headings) | role-match |
| `src/routes/index.tsx` — `HeroGallery()`, `galleryImages`, `galleryAlts` (removal from render, per UI-SPEC §5) | component + data (deletion target) | n/a | Same file — the code being removed, lines 125–182, 293–301 | exact (this IS the file being edited, not an analog) |
| `src/styles.css` — no new class required (per UI-SPEC §1, hero photo reuses `.media-wrap`/`border-border/5` convention verbatim) | config/styling | n/a | `src/styles.css` — existing `.project-card .media-wrap` rule (lines 367–370) and the inline Tailwind `media-wrap aspect-[4/3] rounded-2xl overflow-hidden border border-border/5` usage already in `ProjectCard` (index.tsx line 223) | exact — UI-SPEC explicitly rejected adding a new `mask-image` class; **no `styles.css` edit is required for the hero photo treatment** |

**Scope note:** Per RESEARCH.md and UI-SPEC.md, this phase touches only `src/routes/index.tsx`. No new files, no new npm packages, and (per UI-SPEC's final layout decision) no new CSS rules — every visual treatment reuses an existing class verbatim (`.btn`, `.btn-hero-primary`, `.btn-hero-secondary`, `.text-link`, `.scroll-reveal`, `.anim-fade-in`, `.media-wrap`, `.project-card` conventions). `src/routes/natrave.tsx`, `symplice.tsx`, `maxi.tsx`, `solid.tsx`, `kapyi.tsx` are **read-only content sources** for the P→A→R copy — they are not modified.

---

## Pattern Assignments

### `src/routes/index.tsx` — Hero section JSX (headline + CTA cluster + photo)

**Analog:** same file, current hero block, `src/routes/index.tsx` lines 256–305 (this is the exact code being replaced — read it fresh, don't retype from memory, per RESEARCH.md Pitfall 1).

**Current imports** (lines 1–7, extend, don't replace):
```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";
import { DraggableMarquee } from "@/components/draggable-marquee";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { routeSeo } from "@/lib/seo";
```
**Required addition:** `Linkedin, Mail, Download` to the `lucide-react` import (UI-SPEC §3 confirms these are installed and used nowhere else yet in this file — `ArrowRight`/`ChevronRight` stay, note `ChevronRight` is currently imported but appears unused in the visible JSX, do not remove it as part of this phase's scope unless verified dead elsewhere).

**Current hero JSX — exact code to replace** (lines 256–305):
```tsx
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-0 lg:pb-0 overflow-hidden relative">
        <div className="site-container w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[80vh]">
            {/* Left side: Copy */}
            <div className="lg:pr-20 py-12 lg:py-0 relative z-10">
              <div
                style={{ 
                  transform: `translateY(${scrollY * 0.1}px)`,
                  opacity: Math.max(1 - scrollY * 0.003, 0),
                  filter: `blur(${scrollY > 20 ? Math.min((scrollY - 20) * 0.04, 12) : 0}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease-out'
                }}
              >
                <h1 className="anim-fade-in text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tighter ">
                  Trabalho para transformar <br />
                  marcas comuns em marcas <br />
                  com <span className="text-secondary font-medium italic">impacto real</span>
                </h1>
                <p className="mt-8 text-base md:text-xl text-secondary leading-relaxed max-w-[600px] anim-fade-in delay-250 font-medium">
                  Design que confronta o comum e eleva o digital. Branding, conteúdo e presença digital conectados em um método infalível.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4 anim-fade-in delay-500" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <Link to="/trabalho" className="btn btn-hero-primary">
                  Ver Portfolio
                </Link>
                <Link to="/sobre" className="btn btn-hero-secondary">
                  Ver mais sobre mim
                </Link>
                <a href="/cv/CV%20MURILO%20ORTEGA%202026.pdf" download className="btn btn-hero-secondary">
                  Baixar CV
                </a>
              </div>
            </div>

            {/* Right side: Gallery */}
            <div 
              className="relative h-[60vh] lg:h-screen w-full lg:w-[120%] lg:ml-8 overflow-hidden anim-fade-in delay-250 border-l border-border/10"
              style={{ 
                transform: `translateY(${scrollY * -0.05}px)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <HeroGallery />
            </div>
          </div>
        </div>
      </section>
```
**Note on `scrollY`-driven inline `style` transforms:** These are the established "dynamic value that can't be a static Tailwind class" pattern (per `CLAUDE.md` Styling Conventions). Keep the parallax/blur-on-scroll treatment on the retained text column — it is not called out for removal by CONTEXT.md/RESEARCH.md/UI-SPEC.md, only the gallery and CTA row structure change. Do not invent a new scroll-driven effect for the photo column beyond what's already declared.

**Target JSX — replace with (per UI-SPEC §1–3, exact code):**
```tsx
{/* Right side: Photo */}
<div className="media-wrap aspect-[4/5] rounded-2xl overflow-hidden border border-border/5 max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
  <picture>
    <source
      type="image/avif"
      srcSet="
        /assets/home/hero/murilo-hero-480.avif 480w,
        /assets/home/hero/murilo-hero-960.avif 960w,
        /assets/home/hero/murilo-hero-1440.avif 1440w
      "
      sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 85vw"
    />
    <img
      src="/assets/home/hero/murilo-hero-960.jpg"
      srcSet="
        /assets/home/hero/murilo-hero-480.jpg 480w,
        /assets/home/hero/murilo-hero-960.jpg 960w,
        /assets/home/hero/murilo-hero-1440.jpg 1440w
      "
      sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 85vw"
      alt="Murilo Ortega"
      width={960}
      height={1200}
      loading="eager"
      fetchPriority="high"
      className="w-full h-full object-cover"
    />
  </picture>
</div>
```
Grid wrapper changes from `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0` to `grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center` (UI-SPEC §2) — text column stays first in DOM order, photo column second, no mobile reordering.

**CTA cluster — target JSX (verbatim from UI-SPEC §3, three-tier hierarchy):**
```tsx
<div className="mt-12 flex flex-wrap gap-4 anim-fade-in delay-500">
  <a href="https://www.linkedin.com/in/murilo-ortega" target="_blank" rel="noopener noreferrer" className="btn btn-hero-primary gap-2 text-xs">
    <Linkedin size={16} /> Conectar no LinkedIn
  </a>
  <a href="mailto:contato@muriloortega.com" className="btn btn-hero-secondary gap-2 text-xs">
    <Mail size={16} /> Enviar E-mail
  </a>
  <a href="/cv/CV%20MURILO%20ORTEGA%202026.pdf" download className="btn btn-hero-secondary gap-2 text-xs">
    <Download size={16} /> Baixar CV
  </a>
</div>
<div className="mt-8 anim-fade-in delay-500">
  <Link to="/trabalho" className="text-link">
    Ver Portfolio completo
  </Link>
</div>
```
**Critical — copy these values verbatim, do not retype:**
- LinkedIn: `https://www.linkedin.com/in/murilo-ortega` (Phase 1-corrected, also present in `src/components/Header.tsx` and `src/routes/contato.tsx` — cross-check if in doubt)
- CV: `/cv/CV%20MURILO%20ORTEGA%202026.pdf`
- Every `target="_blank"` external link in this codebase pairs with `rel="noopener noreferrer"` — this is a hard sitewide convention (RESEARCH.md Security Domain), not optional for the new LinkedIn link.

**Headline — target structure (2-line H1, per UI-SPEC Typography + Copywriting Contract, copy UNCONFIRMED — present drafts before shipping):**
```tsx
<h1 className="anim-fade-in font-bold leading-[1.05] tracking-tighter">
  <span className="block" style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)" }}>
    {/* Line 1 — role, Draft A: */}Diretor de Arte & Designer de Marca
  </span>
  <span className="block text-secondary font-medium italic mt-2" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)" }}>
    {/* Line 2 — result, paired w/ Draft A: */}8 anos transformando marcas comuns em marcas com resultado real.
  </span>
</h1>
```
The existing hero descriptive `<p>` ("Design que confronta o comum...") is removed per UI-SPEC §6 — its message is absorbed by the new H1 line 2. This is copy rewrite, not content deletion (does not conflict with the non-deletion constraint, which governs projects/pages/assets).

---

### `src/routes/index.tsx` — `projects` array (extend shape, reduce to 5 confirmed cases)

**Analog:** same file, current `projects` array, lines 41–78.

**Current shape (4 fields):**
```tsx
const projects = [
  {
    name: "NaTrave App - O Ecossistema do Futebol Amador",
    category: "Social Media · 2024",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
  },
  // ... 5 more entries (Solid+, Kmillion, Symplice, Evidive, Talk2Buy)
];
```

**Target shape (extend with `problem`/`action`/`result`, reorder to D-01 list, reduce to 5):**
```tsx
const projects = [
  {
    name: "NaTrave — O Ecossistema do Futebol Amador",
    category: "Branding & UX/UI · 2024",
    image: "/assets/projects/thumbnails/natrave.jpg",
    to: "/natrave",
    problem: "Plataforma social sem identidade nem retenção de usuários.",
    action: "Direção de arte, sistema de conteúdo e social media completos.",
    result: "2.250 seguidores conquistados organicamente.",
    // ^ sourced verbatim from src/routes/natrave.tsx PerformanceHero followers={2250} (line 69) — real metric, do not alter
  },
  {
    name: "Symplice — Facilitando o Complexo",
    category: "Naming & ID Visual · 2024",
    image: "/assets/projects/thumbnails/symplice.jpg",
    to: "/symplice",
    problem: "Marca operando em complexidade sem clareza de comunicação.",
    action: "Identidade visual limpa, direta, focada em experiência do usuário.",
    result: "Simplicidade estratégica sustentada em todo o sistema de marca.",
    // ^ condensed from src/routes/symplice.tsx BrandHeader description (line ~22-26) — qualitative, no metric exists, do not invent one
  },
  {
    name: "Colégio Maxi — Tradição que Evolui",
    category: "Social Media & OOH · 2024",
    image: "/assets/projects/thumbnails/social/maxi.jpg",
    to: "/maxi",
    problem: "Instituição de ensino tradicional precisando reforçar autoridade digital.",
    action: "Social media e OOH alinhados à trajetória de excelência acadêmica.",
    result: "Performance institucional sustentada para aprovações em vestibulares.",
    // ^ condensed from src/routes/maxi.tsx BrandHeader description (line ~41+) — qualitative, no metric exists
  },
  {
    name: "Solid+ — Fintech Identity & Systems",
    category: "Direção & ID Visual · 2024",
    image: "/assets/projects/thumbnails/solid.jpg", // NOT /solid-full.png (8.2MB, wrong asset per Pitfall 2)
    to: "/solid",
    problem: "Fintech precisando de solidez e confiança visual no mercado internacional.",
    action: "Direção de identidade visual e sistemas de design robustos.",
    result: "Design que transmite solidez, confiança e inovação para o mercado financeiro digital.",
    // ^ condensed from src/routes/solid.tsx BrandHeader description (line ~22+) — qualitative, no metric exists
  },
  {
    name: "Kapyi — Direção Criativa & Branding",
    category: "Direção Criativa & Branding · Agência",
    image: "/assets/projects/thumbnails/social/kapyi.jpg",
    to: "/kapyi",
    problem: "Marcas de nichos distintos (engenharia, educação, clínicas, tech) sem posicionamento premium consistente.",
    action: "2,5 anos de liderança criativa unindo branding e direção de campanhas.",
    result: "Posicionamento premium sustentado para marcas de nichos distintos.",
    // ^ sourced ONLY from src/routes/kapyi.tsx BrandHeader description (line 43) + AbordagemEstrategica —
    //   D-02 explicit: no quantifiable metric exists for Kapyi, qualitative result line is the CORRECT
    //   final state, not a placeholder. Never add a number here.
  },
];
```
**Kmillion, Evidive, Talk2Buy removed from this array only** — they remain fully accessible via `/trabalho` (`src/routes/trabalho.tsx`, unmodified), satisfying CASE-03. This is array-scoped removal, not content/page deletion.

---

### `src/routes/index.tsx` — `ProjectCard()` component (`<figcaption>` restructure)

**Analog:** same file, current `ProjectCard`, lines 199–241 (component signature, `IntersectionObserver` reveal wiring, and `media-wrap`/`ProjectMedia` usage are unchanged — only the `<figcaption>` internals change).

**Current `<figcaption>` (lines 231–237) — being replaced:**
```tsx
<figcaption className="mt-6 flex justify-between items-start">
  <div>
    <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1 block">{project.category}</span>
    <span className="font-bold text-lg leading-tight block tracking-tight">{project.name}</span>
  </div>
  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
</figcaption>
```

**Target `<figcaption>` (from RESEARCH.md Pattern 2, P→A→R visible without click — CASE-02):**
```tsx
<figcaption className="mt-6">
  <div className="flex justify-between items-start">
    <div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-1 block">{project.category}</span>
      <span className="font-bold text-lg leading-tight block tracking-tight mb-3">{project.name}</span>
    </div>
    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
  </div>
  <dl className="text-sm text-secondary space-y-1">
    <div><dt className="inline font-bold text-foreground">Problema: </dt><dd className="inline">{project.problem}</dd></div>
    <div><dt className="inline font-bold text-foreground">Ação: </dt><dd className="inline">{project.action}</dd></div>
    <div><dt className="inline font-bold text-foreground">Resultado: </dt><dd className="inline">{project.result}</dd></div>
  </dl>
</figcaption>
```
The rest of `ProjectCard` (function signature, `isVisible` state, `cardRef` `IntersectionObserver`, `Link to={project.to}`, `<figure className="scroll-reveal project-card relative">`, `media-wrap aspect-[4/3] rounded-2xl overflow-hidden border border-border/5`, `<ProjectMedia>`) is unchanged — this is a targeted internal edit, not a rewrite, per RESEARCH.md's explicit anti-pattern warning ("Rewriting `ProjectCard` from scratch").

**Note on `figcaption` typography values (per `.project-card figcaption` CSS, `src/styles.css` lines 386–393):** The `font-bold text-lg` name styling is a Tailwind override sitting on top of the CSS class's own `font-size: 1.2rem; font-weight: 500` — this dual-declaration already exists in the current code (Tailwind wins via cascade order) and is not something this phase needs to reconcile; UI-SPEC explicitly grandfathers this as unchanged.

---

### `src/routes/index.tsx` — New "Case Studies" section wrapper

**Analog:** same file, "Brand Marquee" section (lines 307–317) and "Positioning" section (lines 319–331) — both show the established `<section className="site-section ...">` + `site-container` + `scroll-reveal` heading convention used for every content block on this page.

**Pattern to copy (structure only, not the Positioning section's dark inversion — UI-SPEC §1 confirms the Case Studies section stays on the default light `#f4f4f4` background, same as "Methods" section below it):**
```tsx
{/* Brand Marquee */}
<section className="py-24 overflow-hidden border-t border-border/5">
  <div className="site-container mb-12">
    <h2 className="text-xl md:text-2xl font-bold tracking-tighter scroll-reveal">Marcas que já trabalhei</h2>
  </div>
  <DraggableMarquee ... />
</section>

{/* Methods (background/border precedent to copy for Case Studies) */}
<section className="site-section border-t border-border relative z-10 bg-background">
  <div className="site-container">
    <div className="mb-16">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-4xl scroll-reveal">
        ...
      </h2>
    </div>
    <MethodsSection />
  </div>
</section>
```

**Target — new Case Studies section (insert between Brand Marquee and Positioning, per RESEARCH.md's architecture diagram and UI-SPEC §4 grid decision):**
```tsx
{/* Case Studies */}
<section className="site-section border-t border-border relative z-10 bg-background">
  <div className="site-container">
    <div className="mb-16">
      <span className="tag-mono scroll-reveal mb-4 inline-block">Prova de Trabalho</span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] max-w-4xl scroll-reveal">
        Resultados que já entreguei
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {projects.map((project, i) => (
        <ProjectCard key={project.to} project={project} index={i} />
      ))}
    </div>
  </div>
</section>
```
Copy `.tag-mono` from `src/styles.css` lines 252–261 exactly as-is (`"PROVA DE TRABALHO"` eyebrow, per UI-SPEC Copywriting Contract — Locked). Card order must exactly match `projects` array order (NaTrave, Symplice, Maxi, Solid+, Kapyi) — no re-sorting in the `.map()`.

---

## Shared Patterns

### Eager-loading precedent for above-the-fold images
**Source:** `src/routes/index.tsx`, `HeroGallery()` first image, lines 159–161:
```tsx
loading={i === 0 ? "eager" : "lazy"}
fetchPriority={i === 0 ? "high" : "auto"}
```
**Apply to:** The new hero `<picture>`/`<img>` (`loading="eager"` + `fetchPriority="high"`, unconditional since it's the only above-the-fold image now). **Do not** apply eager/high-priority to any of the 5 case-card images — those use `ProjectMedia`'s existing `loading="lazy"` default (confirmed in `src/components/project-media.tsx`), per RESEARCH.md Pitfall 2 (page-weight risk from 5×~2MB thumbnails).

### Button hierarchy via existing `.btn`/`.btn-hero-*` classes — no new colors
**Source:** `src/styles.css` lines 287–304 (`.btn` base) + 543–587 (`.btn-hero-primary`/`.btn-hero-secondary`).
```css
.btn-hero-primary {
  background-color: var(--foreground);
  color: var(--background);
  padding: 1.125rem 2.25rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 0.8125rem;
  border: 1px solid var(--foreground);
  text-transform: uppercase;
  border-radius: 4px;
}
.btn-hero-secondary {
  background-color: transparent;
  color: var(--foreground);
  /* same padding/border/typography, outline instead of filled */
}
```
**Apply to:** All hero CTA `<a>`/`<Link>` elements. Hierarchy is filled (`.btn-hero-primary`, LinkedIn only) > outline (`.btn-hero-secondary`, E-mail + CV) > `.text-link` (Ver Portfolio completo) — three tiers, zero new classes, per UI-SPEC §3 and RESEARCH.md's explicit anti-pattern warning against a new accent color "to make LinkedIn pop more."

### `.text-link` for the lowest-tier CTA
**Source:** `src/styles.css` lines 451–464:
```css
.text-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
  text-transform: uppercase;
  border-bottom: 0.1rem solid currentColor;
  padding-bottom: 0.2rem;
  transition: opacity var(--bd-time-transition-250) var(--ease-out);
}
.text-link:hover { opacity: 0.4; }
```
**Apply to:** "Ver Portfolio completo" link (UI-SPEC §3) — this is a class that already exists in `styles.css` but is not yet used anywhere in `index.tsx`; confirm it renders as expected once applied since this is its first use in this specific file.

### `rel="noopener noreferrer"` on every `target="_blank"` link
**Source:** Sitewide convention, verified present on every existing external link (`src/components/Header.tsx`, `src/routes/contato.tsx`, `src/routes/evidive.tsx`, all `metodos.*.tsx` routes) — RESEARCH.md Security Domain, direct grep-verified.
**Apply to:** The new LinkedIn `<a target="_blank">` in the hero CTA cluster — non-negotiable, matches existing pattern exactly, do not omit.

### `scroll-reveal` + `anim-fade-in delay-*` for new sections
**Source:** `src/styles.css` lines 424–434 (`.scroll-reveal`/`.scroll-reveal.is-visible`) + `@theme` `--animate-fade-in` (line 35) + existing usage throughout `index.tsx` (`anim-fade-in delay-250`, `anim-fade-in delay-500`).
**Apply to:** The new Case Studies section heading/eyebrow (`scroll-reveal`, matches every other `<h2>` on this page) and the CTA cluster/secondary link rows (`anim-fade-in delay-500`, unchanged from current code — the delay values are not being altered, only the content of what's inside them). Do not introduce a new Framer Motion `motion.div` sequence — ANTI-05 explicitly forbids new heavy hero animation, and `useScrollReveal` (already wired at `HomePage`'s top, line 244: `const revealRef = useScrollReveal<HTMLDivElement>()`) is the single sitewide reveal mechanism.

---

## No Analog Found

None. Every piece of this phase's scope has either a literal same-file precedent or an already-resolved concrete code block in UI-SPEC.md/RESEARCH.md. No cross-codebase search for an external analog was necessary or appropriate — this phase is explicitly "wiring and restructuring, not new engineering" (RESEARCH.md Summary).

## Metadata

**Analog search scope:** `src/routes/index.tsx` (full file, 398 lines, single Read), `src/styles.css` (targeted reads: lines 1–60 for `:root`/`@theme` tokens, 240–480 for buttons/cards/text-link, 495–588 for hero-gallery/btn-hero-*), `src/routes/kapyi.tsx` (lines 1–70, `BrandHeader`/content source), `src/routes/natrave.tsx`/`symplice.tsx`/`maxi.tsx`/`solid.tsx` (grepped for `BrandHeader`/`followers`/`PerformanceHero` line locations only — full copy already verbatim-quoted in `02-RESEARCH.md` Code Examples, not re-extracted here to avoid duplicate reads).
**Files scanned:** 7 (2 primary edit targets, 5 read-only content sources)
**Pattern extraction date:** 2026-08-05
