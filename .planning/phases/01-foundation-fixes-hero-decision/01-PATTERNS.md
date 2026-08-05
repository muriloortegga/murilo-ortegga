# Phase 1: Foundation Fixes & Hero Decision - Pattern Map

**Mapped:** 2026-08-05
**Files analyzed:** 6 (3 modified for LinkedIn/CV, 1 modified for SEO helper evaluation, 1 asset, 1 component evaluated for reuse)
**Analogs found:** 4 exact-in-place (self-referential fixes) / 1 no-analog (optimized `<picture>` delivery)

This is a small bug-fix/content-prep phase. There are no *new* files to scaffold — every "pattern" here is either (a) the exact current broken code the executor must locate and replace, or (b) the closest existing analog for a *new* capability (LCP-optimized hero image delivery) that doesn't exist anywhere in the codebase yet.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|--------------------|------|-----------|-----------------|----------------|
| `src/components/Footer.tsx` | component | request-response (static render) | itself (in-place string fix) | exact |
| `src/routes/contato.tsx` | route/component | request-response (static render) | itself + `src/components/Footer.tsx` (identical social-links array shape) | exact |
| `src/routes/index.tsx` (JSON-LD `sameAs`) | route (SEO/structured data) | request-response (SSR head) | itself (in-place string fix) | exact |
| `src/routes/index.tsx` (CV `<a href>`) | route (static asset link) | request-response (static render) | itself (in-place string fix) | exact |
| Hero photo delivery (`<picture>`/AVIF/WebP/JPEG, explicit dimensions) for `public/assets/about/photos/hero-bg.jpg` | component/markup (new capability) | file-I/O + streaming (image bytes) | `src/components/project-media.tsx` (role-match: polymorphic media renderer) + `src/routes/sobre.tsx:132-142` (current usage of that photo) + `src/routes/index.tsx:149-182` `HeroGallery` (closest existing LCP-conscious `<img>` usage: explicit `width`/`height`, `loading="eager"`, `fetchPriority="high"` on first item) | role-match, no exact `<picture>` analog exists |
| `src/lib/seo.ts` `routeSeo()` | utility (SEO head builder) | transform (input → meta/link objects) | itself — this is the file to read, not rewrite; `sameAs` for JSON-LD lives inline in `src/routes/index.tsx`, not inside `routeSeo()` | exact (reference only, no structural change expected) |

## Pattern Assignments

### `src/components/Footer.tsx` (component, request-response)

**Current broken code — full social links block** (lines 33-50):
```tsx
        <div className="flex items-center gap-6 md:gap-12">
          {[
            { name: "LinkedIn", url: "https://linkedin.com/in/muriloortega" },
            { name: "Instagram", url: "https://instagram.com/muriloortega" },
            { name: "Behance", url: "https://behance.net/muriloortega" },
            { name: "Upwork", url: "https://upwork.com" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-tight text-secondary hover:text-foreground transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
```

**Fix:** line 35, change:
```tsx
{ name: "LinkedIn", url: "https://linkedin.com/in/muriloortega" },
```
to:
```tsx
{ name: "LinkedIn", url: "https://www.linkedin.com/in/murilo-ortega" },
```
No other change needed — the `<a target="_blank" rel="noopener noreferrer">` wrapper pattern is already correct and must be preserved as-is.

---

### `src/routes/contato.tsx` (route, request-response)

**Current broken code — identical social links array, slightly different indentation** (lines 53-64):
```tsx
                    <div className="flex flex-col gap-3">
                       {[
                         { name: "LinkedIn", url: "https://linkedin.com/in/muriloortega" },
                         { name: "Instagram", url: "https://instagram.com/muriloortega" },
                         { name: "Behance", url: "https://behance.net/muriloortega" },
                         { name: "Upwork", url: "https://upwork.com" }
                       ].map(social => (
                         <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest flex items-center gap-2 group hover:text-secondary transition-all">
                           {social.name} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                         </a>
                       ))}
                    </div>
```

**Fix:** line 55, same string replacement as Footer.tsx:
```tsx
{ name: "LinkedIn", url: "https://www.linkedin.com/in/murilo-ortega" },
```

**Note:** This is a duplicated data structure (same shape as Footer.tsx's array, not a shared import). No refactor to a shared constant is in scope for this phase — CONTEXT.md's phase boundary is "fix, don't redesign." Fix both occurrences independently.

---

### `src/routes/index.tsx` — JSON-LD `sameAs` (route, SEO/structured data)

**Current broken code** (lines 17-37, full `head()` including the `Person` schema):
```tsx
export const Route = createFileRoute("/")({
  head: () => {
    const seo = routeSeo({
      path: "/",
      title: "Murilo Ortega — Design Estratégico e Identidade de Marca",
      description:
        "Design que confronta o comum e eleva o digital. Branding, conteúdo e presença digital conectados em um método infalível.",
    });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Murilo Ortega",
            jobTitle: "Design Estratégico & Identidade de Marca",
            url: "https://murilo-ortegga.lovable.app/",
            sameAs: [
              "https://linkedin.com/in/muriloortega",
              "https://instagram.com/muriloortega",
              "https://behance.net/muriloortega",
            ],
          }),
        },
      ],
    };
  },
  component: HomePage,
});
```

**Fix:** line 29, change:
```tsx
"https://linkedin.com/in/muriloortega",
```
to:
```tsx
"https://www.linkedin.com/in/murilo-ortega",
```

**Important:** This `sameAs` array is hand-built inline in `src/routes/index.tsx`, NOT generated by `src/lib/seo.ts`'s `routeSeo()` helper. `routeSeo()` only produces `meta`/`links` (canonical, OG, Twitter card) — it has no `sameAs`/JSON-LD concept at all (confirmed by reading the full 33-line file). Do not attempt to add a `sameAs` parameter to `routeSeo()` unless CONTEXT.md's scope is revisited; the fix is a plain string edit in `index.tsx`.

---

### `src/routes/index.tsx` — CV download link (route, static asset link)

**Current broken code** (lines 280-290, full hero CTA row for context):
```tsx
              <div className="mt-12 flex flex-wrap gap-4 anim-fade-in delay-500" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <Link to="/trabalho" className="btn btn-hero-primary">
                  Ver Portfolio
                </Link>
                <Link to="/sobre" className="btn btn-hero-secondary">
                  Ver mais sobre mim
                </Link>
                <a href="/cv/curriculo.pdf" download className="btn btn-hero-secondary">
                  Baixar CV
                </a>
              </div>
```

**Ground truth confirmed on disk:**
```
public/cv/.gitkeep
public/cv/CV MURILO ORTEGA 2026.pdf     <- the real file (note: spaces in filename)
```
There is no `curriculo.pdf` anywhere in `public/`. The link at line 287 is a 404.

**Fix (per CONTEXT.md D-07/D-08, default minimal-risk path):** line 287, change:
```tsx
<a href="/cv/curriculo.pdf" download className="btn btn-hero-secondary">
```
to (URL-encode the spaces):
```tsx
<a href="/cv/CV%20MURILO%20ORTEGA%202026.pdf" download className="btn btn-hero-secondary">
```
`download` attribute stays — no filename argument was passed to `download` originally, so browsers will save it using the served filename (with spaces, from the URL-decoded segment) unless the executor also adds `download="CV Murilo Ortega 2026.pdf"` for a cleaner save-as name. Optional refinement, not required.

**Alternate path (if executor/user decides to rename):** rename `public/cv/CV MURILO ORTEGA 2026.pdf` → e.g. `public/cv/murilo-ortega-cv-2026.pdf`, then use `href="/cv/murilo-ortega-cv-2026.pdf"`. Either path satisfies FIX — flagged in CONTEXT.md as open/discretionary, not locked.

---

### Hero photo delivery — `public/assets/about/photos/hero-bg.jpg` (asset prep + new markup)

**No exact analog exists in this codebase for `<picture>`/AVIF/WebP delivery.** Confirmed via repo-wide grep: zero `<picture>` elements, zero `.avif`/`.webp` files anywhere under `public/`. All existing image rendering is plain `<img>` (via `ProjectMedia` or inline JSX).

**Source file to prep** (confirmed on disk):
```
public/assets/about/photos/hero-bg.jpg   19.7 MB  (!!) — must be resized/compressed before hero use, current size is unusable for LCP
public/assets/about/photos/middle-bg.jpg 18.0 MB
public/assets/about/photos/footer-bg.jpg 26.0 MB
```
These are raw, full-resolution studio exports — none are web-optimized. Any hero use of `hero-bg.jpg` requires re-export (resize to actual display dimensions + compress + generate AVIF/WebP/JPEG variants) as a prerequisite, independent of markup pattern.

**Closest existing analog #1 — current (soon-to-be-superseded) usage pattern**, `src/routes/sobre.tsx` lines 132-142:
```tsx
        <div className="absolute top-0 right-0 w-full md:w-[45%] lg:w-[40%] h-full z-0">
          <ProjectMedia
            src="/assets/about/photos/hero-bg.jpg"
            alt="Murilo Ortega Portrait"
            className="w-full h-full object-cover grayscale opacity-30 md:opacity-50 object-[50%_25%] md:object-[50%_15%]"
          />
          {/* Gradient overlays to blend the image seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent hidden md:block" />
        </div>
```
This is the pattern D-05 explicitly says NOT to reuse for the new home hero — `grayscale opacity-30` is a background-layer treatment. Per CONTEXT.md D-05, the home hero must render this same source photo in full color, foreground-prominent, no grayscale/low-opacity. Do not copy the `grayscale opacity-*` classes; do not copy the "background layer behind text" compositing approach unless Phase 2's layout explicitly calls for it (this phase only preps the asset/decision, not the final layout — see phase boundary).

**Closest existing analog #2 — LCP-conscious `<img>` attributes**, `src/routes/index.tsx` `HeroGallery()`, lines 149-182 (first image in the loop only):
```tsx
function HeroGallery() {
  return (
    <div className="hero-gallery">
      <div className="hero-gallery-track">
        {galleryImages.map((img, i) => (
          <div key={i} className="hero-gallery-item">
            <img
              src={img}
              alt={galleryAlts[i] ?? "Peça de portfolio Murilo Ortega"}
              width={400}
              height={500}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="rounded-xl transition-all duration-700"
            />
          </div>
        ))}
```
This is the ONLY place in the codebase that already uses `loading="eager"` + `fetchPriority="high"` + explicit `width`/`height` — i.e., the existing LCP-hint pattern. If Phase 1 (or Phase 2) adds a hero `<img>`/`<picture>` for `hero-bg.jpg`, copy this attribute set (`width`, `height`, `loading="eager"`, `fetchPriority="high"`) rather than `ProjectMedia`'s default `loading="lazy"` (see below).

**Closest existing analog #3 — polymorphic media component**, `src/components/project-media.tsx` (full file, 102 lines) — role-match only, not data-flow match:
```tsx
export function ProjectMedia({ src, alt, className, isVisible = true, style, playGifOnHover = false }: ProjectMediaProps) {
  ...
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={cn("w-full h-full object-cover", className)}
      loading="lazy"
    />
  );
}
```
**Evaluation for reuse (per CONTEXT.md's explicit ask):** `ProjectMedia`'s plain-`<img>` fallback branch always sets `loading="lazy"` and has no `<picture>`/`srcset`/AVIF-WebP support, no `width`/`height`, no `fetchPriority` prop. This is the opposite of what an LCP-priority hero image needs (should be `loading="eager"`, `fetchPriority="high"`, sized to avoid CLS, ideally multi-format). **Recommendation for planner: do not reuse `ProjectMedia` for the hero image as-is.** Either (a) render a dedicated `<picture>` element directly in `src/routes/index.tsx` (or a new small hero-image component) following the `HeroGallery` attribute pattern above, or (b) extend `ProjectMedia` with new optional props (`priority?: boolean`, `sources?: {avif,webp}`) — the latter is a larger change than this phase's "prep only" boundary implies (D-06: "actual hero layout/placement is Phase 2 work"). Flag this choice for the planner; this phase's job per CONTEXT.md is asset prep + decision documentation, not final component wiring.

---

### `src/lib/seo.ts` `routeSeo()` (utility, reference only)

**Full current file** (33 lines) — read for context, not modified by this phase:
```ts
export interface RouteSeoInput {
  path: string; // e.g. "/sobre" (self-referencing)
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string; // absolute URL preferred
}

export function routeSeo({ path, title, description, type = "website", image }: RouteSeoInput) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: path }],
  };
}
```
No `sameAs`/JSON-LD logic lives here. Confirms the JSON-LD fix belongs entirely in `src/routes/index.tsx` (see above), not this file.

## Shared Patterns

### LinkedIn URL string (cross-cutting, 3 occurrences)
**Current wrong value (all 3 files):** `https://linkedin.com/in/muriloortega`
**Correct value (all 3 files):** `https://www.linkedin.com/in/murilo-ortega`
**Apply to:** `src/components/Footer.tsx:35`, `src/routes/contato.tsx:55`, `src/routes/index.tsx:29`
No shared constant/module currently holds this URL — it's duplicated inline in each file (consistent with this codebase's "no shared data module for small link sets" convention, per `src/lib/nav-context.ts` being the only shared-link-registry precedent and it's for internal nav, not social URLs). Fixing all 3 independently is correct and matches existing structure; introducing a shared `SOCIAL_LINKS` constant would be a scope expansion beyond "fix the URL."

### `target="_blank" rel="noopener noreferrer"` external link pattern
**Source:** `src/components/Footer.tsx:40-45`, `src/routes/contato.tsx:60`, and WhatsApp/Calendly links in both files (e.g. `src/routes/contato.tsx:37-42`)
**Apply to:** Any external link (LinkedIn fix must preserve this — do not drop `target`/`rel` when correcting the URL string).

### LCP image-hint attributes (`width`, `height`, `loading="eager"`, `fetchPriority="high"`)
**Source:** `src/routes/index.tsx:158-161` (`HeroGallery`, first image only)
**Apply to:** Any new hero `<img>`/`<picture>` markup built in this phase or Phase 2 for `hero-bg.jpg` — this is the only existing precedent in the codebase for prioritizing an above-the-fold image.

### `cn()` className composition
**Source:** `src/lib/utils.ts`, used throughout `src/components/project-media.tsx`
**Apply to:** Any new component/markup touching conditional classes (e.g. if a new hero-image wrapper component is created).

## No Analog Found

| File/Capability | Role | Data Flow | Reason |
|---|---|---|---|
| `<picture>` with AVIF/WebP/JPEG sources for hero image | component/markup | file-I/O + streaming | Zero `<picture>` elements and zero `.avif`/`.webp` assets exist anywhere in the codebase. Planner should use `.planning/research/STACK.md`'s LCP guidance directly (referenced in CONTEXT.md D-06) rather than an in-repo analog, combined with `HeroGallery`'s attribute pattern above for the eager/fetchPriority piece. |
| Image re-export/compression tooling (resize 19.7MB source → web-ready) | build/asset-prep step | file-I/O | No image-processing dependency (`sharp`, `vite-imagetools`, etc.) present in `package.json`. This is an out-of-repo step (external tool or manual export) the executor/user must perform before the asset lands in `public/`, not a code pattern to copy. |

## Metadata

**Analog search scope:** `src/components/`, `src/routes/`, `src/lib/`, `public/assets/about/photos/`, `public/cv/`, repo-wide grep for `linkedin.com`, `curriculo`, `hero-bg`, `<picture`, `.avif`/`.webp`
**Files scanned:** `src/components/Footer.tsx`, `src/routes/contato.tsx`, `src/routes/index.tsx` (full), `src/routes/sobre.tsx` (partial, hero + trajectory sections), `src/components/project-media.tsx` (full), `src/lib/seo.ts` (full), `package.json` (grep only), `src/styles.css` (grep only, `.btn-hero-*` class confirmation)
**Pattern extraction date:** 2026-08-05
